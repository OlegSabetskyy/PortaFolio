<?php
    function connect($credentials): object {
        $conn = null;

        try {
            $conn = new mysqli($credentials["host"], $credentials["user"], $credentials["passwd"], $credentials["db"]);
            $conn -> set_charset("utf8");
        }catch(mysqli_sql_exception $error) {
            error_log("failed to connect to db, reason: $error");
            return new stdClass();
        }

        return $conn;
    }

    function disconnect($conn): void {
        if($conn) 
            $conn -> close();
    }

    function select($conn, $id): array {
        $results = null;
        $stmt = null;
        
        $stmt = $conn -> prepare("select * from table where id=?");
        $stmt -> bind_param("i", $id);
        $stmt -> execute();
        $results = $stmt -> get_result();
        if(!$results -> num_rows)
            return []; // not found

        return $results -> fetch_assoc();
    }

    function select_all($conn, $attribute): array {
        $results = null;
        $stmt = null;
        
        $stmt = $conn -> prepare("select * from table where attribute=?");
        $stmt -> bind_param("s", $attribute);
        $stmt -> execute();
        $results = $stmt -> get_result();
        if(!$results -> num_rows)
            return []; // not found

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    function insert($conn, $value): bool{
        $result = null;
        $stmt = null;

        $stmt = $conn -> prepare("insert into table (column) values (?)");
        $stmt -> bind_param("s", $value);
        $stmt -> execute();

        return $stmt -> get_result();
    }

    function update($conn, $column, $id) {
        $result = null;
        $stmt = null;

        $stmt = $conn -> prepare("update table set column = ? where id = ?");
        $stmt -> bind_param("ss", $column, $id);
        $stmt -> execute();

        return $stmt -> get_result();
    }

    function delete($conn, $id) {
        $result = null;

        $stmt = $conn -> prepare("delete from table where id = ?");
        $stmt -> bind_param("s", $id);
        $stmt -> execute();

        return $stmt -> get_result();
    }

?>