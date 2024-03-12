$(document).ready(function() {
    const startButton = $('#startGame');
    startButton.on('click', setupGame);
    loadLeaderboard();
});

let playerXName = '';
let playerOName = '';
let circleTurn;

const board = $('#board');
const cellElements = $('[data-cell]');
const winningMessageElement = $('#winningMessage');
const restartButton = $('#restartButton');
const winningMessageTextElement = $('[data-winning-message-text]');
const turnDisplay = $('#turnDisplay');
const leaderboardContent = $('#leaderboardContent');

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function setupGame() {
    playerXName = $('#playerXName').val() || 'Player X';
    playerOName = $('#playerOName').val() || 'Player O';
    $('#playerSetup').hide();
    $('#gameArea').show();
    startGame();
}

function startGame() {
    circleTurn = false;
    cellElements.removeClass('x circle');
    cellElements.off('click').on('click', handleClick);
    setBoardHoverClass();
    winningMessageElement.removeClass('show');
    turnDisplay.text(`Turn: ${playerXName}`);
}

function handleClick() {
    const cell = $(this);
    const currentClass = circleTurn ? 'circle' : 'x';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.text('Draw!');
    } else {
        winningMessageTextElement.text(`${circleTurn ? playerOName : playerXName} Wins!`);
        updateLeaderboard(circleTurn ? playerOName : playerXName);
    }
    winningMessageElement.addClass('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return $(cell).hasClass('x') || $(cell).hasClass('circle');
    });
}

function placeMark(cell, currentClass) {
    cell.addClass(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
    turnDisplay.text(`Turn: ${circleTurn ? playerOName : playerXName}`);
}

function setBoardHoverClass() {
    board.removeClass('x circle');
    if (circleTurn) {
        board.addClass('circle');
    } else {
        board.addClass('x');
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return $(cellElements[index]).hasClass(currentClass);
        });
    });
}

restartButton.on('click', () => {
    $('#playerSetup').show();
    $('#gameArea').hide();
    loadLeaderboard();
});

function updateLeaderboard(winner) {
    $.ajax({
        url: 'API.php',
        method: 'GET',
        data: {
            action: 'save',
            winner: winner
        },
        dataType: 'json',
        success: function(data) {
            if (data.success) {
                loadLeaderboard();
            } else {
                console.error(data.message);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error updating leaderboard:', error);
        }
    });
}

function loadLeaderboard() {
    $.ajax({
        url: 'API.php',
        method: 'GET',
        data: {
            action: 'get'
        },
        dataType: 'json',
        success: function(data) {
            if (data.success) {
                displayLeaderboard(data.leaderboard);
            } else {
                console.error('Error loading leaderboard:', data.message);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error loading leaderboard:', error);
        }
    });
}

function displayLeaderboard(leaderboard) {
    leaderboardContent.empty();
    if (Object.keys(leaderboard).length === 0) {
        leaderboardContent.text('No games played yet.');
    } else {
        let html = '<ul>';
        let count = 0;
        for (const [player, wins] of Object.entries(leaderboard)) {
            if (count < 10) {
                html += `<li>${player}: ${wins} wins</li>`;
                count++;
            } else {
                break;
            }
        }
        html += '</ul>';
        leaderboardContent.html(html);
    }
}
