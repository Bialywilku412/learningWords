<?php

class Database {
    private static ?PDO $conn = null;

    // Private constructor to prevent direct instantiation
    private function __construct() {}

    // Method to get the database connection (Singleton pattern)
    public static function getConnection(): PDO {
        if (self::$conn === null) {
            // Database credentials
            $servername = 'localhost';      // Your database host
            $username = 'root';             // Your database username
            $password = '';                 // Your database password
            $dbname = 'learning_words';     // Your database name

            try {
                // Create a new PDO connection
                self::$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
                self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                // Log the error and exit if the connection fails
                error_log("Connection failed: " . $e->getMessage());
                exit('Database connection failed');
            }
        }
        return self::$conn;
    }
}