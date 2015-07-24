<?php

$filename = 'items.json';
$file = file_get_contents($filename);
$items = json_decode($file, true);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)) {
    $_POST = json_decode(file_get_contents('php://input'), true);
}

// GET get
if (array_key_exists('method', $_GET) && $_GET['method'] == 'get') {
    echo json_encode($items);
}
// POST add
else if (array_key_exists('method', $_POST) && $_POST['method'] == 'add') {
    if (array_key_exists('item', $_POST)) {
        $newItem = $_POST['item'];
        $newItem['id'] = $items[count($items) - 1]['id'] + 1;
        $items[] = $newItem;
        file_put_contents($filename, json_encode($items));
        echo '{ "success": true }';
    }
    else {
        echo '{ "error": "No item to add" }';
    }
}
// POST update
else if (array_key_exists('method', $_POST) && $_POST['method'] == 'update') {
    if (array_key_exists('item', $_POST)) {
        $updateItem = $_POST['item'];
        $updated = false;
        for ($i = 0; $i < count($items); $i++) {
            $item = $items[$i];
            if ($item['id'] == $updateItem['id']) {
                $items[$i] = $updateItem;
                $updated = true;
                break;
            }
        }
        if ($updated == true) {
            file_put_contents($filename, json_encode($items));
            echo '{ "success": true }';
        }
        else {
            echo '{ "error": "Item not found" }';
        }
    }
    else {
        echo '{ "error": "No item to update" }';
    }
}
// POST delete
else if (array_key_exists('method', $_POST) && $_POST['method'] == 'delete') {
    if (array_key_exists('item', $_POST)) {
        $deleteItem = $_POST['item'];
        $deleted = false;
        for ($i = 0; $i < count($items); $i++) {
            $item = $items[$i];
            if ($item['id'] == $deleteItem['id']) {
                array_splice($items, $i, 1);
                $deleted = true;
                break;
            }
        }
        if ($deleted == true) {
            file_put_contents($filename, json_encode($items));
            echo '{ "success": true }';
        }
        else {
            echo '{ "error": "Item not found" }';
        }
    }
    else {
        echo '{ "error": "No item to delete" }';
    }
}
// Invalid method
else {
    echo '{ "error": "Invalid method or endpoint" }';
}

?>
