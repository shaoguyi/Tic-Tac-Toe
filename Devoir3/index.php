<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" href="style2.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="script.js" defer></script>
</head>
<body>
    <div id="playerSetup">
        <input type="text" id="playerXName" placeholder="Player X Name">
        <input type="text" id="playerOName" placeholder="Player O Name">
        <button id="startGame">Start Game</button>
    </div>
    <div id="gameArea" style="display:none;">
        <p id="turnDisplay">Turn: X</p>
        <div id="board" class="board">
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
        </div>
        <div class="winning-message" id="winningMessage">
            <div data-winning-message-text></div>
            <button id="restartButton">Play Again!</button>
        </div>
    </div>
    <div id="leaderboard">
        <h3>Leaderboard</h3>
        <div id="leaderboardContent">No games played yet.</div>
    </div>
</body>
</html>
