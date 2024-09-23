<?php
header('Content-Type: application/json');

// Database configuration
$host = 'localhost'; 
$db = 'quizperpy'; 
$user = 'root'; 
$pass = ''; 

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);
$answers = $data['answers'] ?? [];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO answers (answer) VALUES (?)");

if ($stmt === false) {
    die(json_encode(["message" => "Prepare failed: " . $conn->error]));
}

// Execute the prepared statement
foreach ($answers as $answer) {
    $stmt->bind_param("s", $answer);
    $stmt->execute();
}

$stmt->close();
$conn->close();

// Respond back
echo json_encode(["message" => "Answers submitted successfully!"]);
?>
