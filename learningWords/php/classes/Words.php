<?php

require_once __DIR__ . '/Database.php';

class Words implements JsonSerializable {
    
    public static function getWords(): array {
        try {
            $conn = Database::getConnection();

            $statement = $conn->prepare("
                SELECT * FROM words
            ");
            $statement->execute();

            $words = $statement->fetchAll(PDO::FETCH_ASSOC);
            return $words ?: [];
        } catch (PDOException $e) {
            error_log("Error fetching wordsl " . $e->getMessage());
            return [];
        }
    }

    public int $id;
    public string $name;
    public string $translation;

    public function __construct(array $row){
        $this->id = intval($row['id']);
        $this->name = $row['name'];
        $this->translation = $row['translation'];
    }

    public function jsonSerialize(): array {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "translation" => $this->translation
        ];
    }
}