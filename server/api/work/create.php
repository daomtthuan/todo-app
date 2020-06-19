<?php

require_once __DIR__ . '/../../utils/database.php';

if (isset($_POST['name'], $_POST['content'])) {
  $name    = $_POST['name'];
  $content = $_POST['content'];

  if (preg_match('/.{1,100}/', $name) && preg_match('/.{1,100}/', $content)) {
    echo json_encode(execute('call create_work(?, ?)', 'ss', $name, $content));
    die;
  }
}

header('HTTP/1.1 400 Bad Request');