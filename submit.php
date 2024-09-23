<?php
// Set header to return JSON response
header('Content-Type: application/json');

// Database configuration
$host = 'localhost'; 
$db = 'quizperpy'; 
$user = 'root'; 
$pass = ''; 

// Create database connection
$conn = new mysqli($host, $user, $pass, $db);

// Check if connection to the database is successful
if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

// Get JSON input from the request body
$data = json_decode(file_get_contents('php://input'), true);

// Ensure 'answers' array exists in the received data
$answers = $data['answers'] ?? [];

if (empty($answers)) {
    die(json_encode(["message" => "No answers provided"]));
}

// Prepare SQL query to insert answers into the database
$stmt = $conn->prepare("INSERT INTO answers (answer) VALUES (?)");

// Check if statement preparation was successful
if ($stmt === false) {
    die(json_encode(["message" => "Prepare failed: " . $conn->error]));
}

// Loop through the answers and execute the insert statement for each
foreach ($answers as $answer) {
    $stmt->bind_param("s", $answer);
    $stmt->execute();
}

// Close the prepared statement and database connection
$stmt->close();
$conn->close();

// Send back a JSON response confirming success
echo json_encode(["message" => "Answers submitted successfully!"]);
?>
