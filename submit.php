<?php
// Database configuration
$host = 'localhost'; // or your database host
$db = 'quizperpy'; // your database name
$user = 'root'; // your database username
$pass = ''; // your database password

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);
$answers = $data['answers'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO answers (answer) VALUES (?)");

foreach ($answers as $answer) {
    $stmt->bind_param("s", $answer);
    $stmt->execute();
}

$stmt->close();
$conn->close();

// Respond back
echo json_encode(["message" => "Answers submitted successfully!"]);
?>
