<?php
$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action === 'get') {
    $leaderboardFile = 'leaderboard.json';

    if (!file_exists($leaderboardFile)) {
        echo json_encode(['success' => false, 'message' => 'Leaderboard file not found.']);
        exit;
    }

    $leaderboardData = file_get_contents($leaderboardFile);
    $leaderboard = $leaderboardData ? json_decode($leaderboardData, true) : [];

    arsort($leaderboard);
    $leaderboard = array_slice($leaderboard, 0, 10, true);
    echo json_encode(['success' => true, 'leaderboard' => $leaderboard]);
} elseif ($action === 'save') {
    $winner = isset($_GET['winner']) ? $_GET['winner'] : '';

    if (empty($winner)) {
        echo json_encode(['success' => false, 'message' => "Winner's name not provided."]);
        exit;
    }

    $leaderboardFile = 'leaderboard.json';

    if (!file_exists($leaderboardFile)) {
        file_put_contents($leaderboardFile, json_encode([]));
    }

    $leaderboardData = file_get_contents($leaderboardFile);
    $leaderboard = $leaderboardData ? json_decode($leaderboardData, true) : [];

    if (isset($leaderboard[$winner])) {
        $leaderboard[$winner]++;
    } else {
        $leaderboard[$winner] = 1;
    }

    file_put_contents($leaderboardFile, json_encode($leaderboard));

    echo json_encode(['success' => true, 'message' => "Wins for $winner updated."]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid action.']);
}
?>
