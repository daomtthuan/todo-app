<?php
function execute(string $query, string $type = null, ...$vars) {
  $connection = @new \mysqli('127.0.0.1', 'root', '', 'todo_app', '3306');

  if ($connection->connect_error) {
    header('HTTP/1.1 500 Internal Server Error');
    die('Connect database failed');
  } else {
    $statement = $connection->prepare($query);
    if (!is_null($type)) {
      $statement->bind_param($type, ...$vars);
    }
    if ($statement->execute()) {
      $result = $statement->get_result();
      $data   = [];
      while ($row = $result->fetch_assoc()) {
        $data[] = $row;
      }
      $connection->close();
      return $data;
    } else {
      $connection->close();
      header('HTTP/1.1 500 Internal Server Error');
      die('Execute query failed');
    }
  }
}