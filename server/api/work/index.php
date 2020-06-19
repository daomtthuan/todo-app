<?php

require_once __DIR__ . '/../../utils/database.php';

echo json_encode(execute('call select_work()'));