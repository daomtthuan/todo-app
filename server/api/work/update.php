<?php

require_once __DIR__ . '/../../utils/database.php';

if (isset($_POST['id'], $_POST['name'], $_POST['content'])) {
  $id      = $_POST['id'];
  $name    = $_POST['name'];
  $content = $_POST['content'];
  $status  = $_POST['status'];

  if (preg_match('/[a-z0-9]{32}/', $id) && preg_match('/.{1,100}/', $name) && preg_match('/.{1,100}/', $content) && preg_match('/[01]{1}/', $status)) {
    echo json_encode(execute('call update_work(?, ?, ?, ?)', 'sssi', $id, $name, $content, $status));
    die;
  }
}

header('HTTP/1.1 400 Bad Request');