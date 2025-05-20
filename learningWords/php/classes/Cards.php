<?php

require_once __DIR__ . '/Database.php';

class Cards implements JsonSerializable {

    public static function getCards(): array {
        try {
            $conn = Database::getConnection();

            $statement = $conn->prepare("
                SELECT * FROM cards
            ");
            $statement->execute();
            $cards = $statement->fetchAll(PDO::FETCH_ASSOC);
            return $cards ?: [];
        } catch (PDOException $e) {
            error_log("Error fetching cards: " . $e->getMessage());
            return [];
        }
    }

    public static function addCard(string $name): bool {
        try {
            $conn = Database::getConnection();

            $statement = $conn->prepare("
                INSERT INTO card (name)
                VALUES (:name)
            ");
            $statement->bindValue(":name", $name);
            $statement->execute();

            return true;
        } catch (PDOException $e) {
            error_log("Error adding card: " . $e->getMessage());
            return false;
        }
    }

    public int $id;
    public string $name;

    public function __construct(array $row){
        $this->id = intval($row['id']);
        $this->name = $row['name'];
    }

    public function jsonSerialize(): array {
        return [
            "id" => $this->id,
            "name" => $this->name,
        ];
    }
}