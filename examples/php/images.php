<?php

$imgArray = array_slice(scandir('../img'), 2);

$imgFullPathArray = array();

foreach($imgArray AS $img){
    $imgFullPathArray[] = 'img/' . $img;
}

echo json_encode($imgFullPathArray);

