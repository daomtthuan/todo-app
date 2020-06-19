<?php

require_once __DIR__ . '/../../utils/database.php';

if (isset($_POST['id'])) {
  $id = $_POST['id'];

  if (preg_match('/[a-z0-9]{32}/', $id)) {
    echo json_encode(execute('call delete_work(?)', 's', $id));
    die;
  }
}

header('HTTP/1.1 400 Bad Request');