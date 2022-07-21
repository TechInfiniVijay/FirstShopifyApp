<?php
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 0);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
require 'vendor/autoload.php';
use phpish\shopify;
require 'conf.php';

if(!empty($_GET[PRFX.'shop'])){
  $shop = $_GET[PRFX.'shop'];
} else{
  $shop = $_REQUEST[PRFX.'shop'];
}
$shop = $_REQUEST['shop'];

if(!empty($_GET[PRFX.'oauth_token'])){
  $oauth_token = $_REQUEST[PRFX.'oauth_token'];
}  else{
  $config_table_name = CONFIG_TABLE;

$sql = "SELECT * FROM $config_table_name WHERE shop ='$shop' ";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
      $oauth_token =  $row['oauth_token'];
    }
  } else {
  
    die("Error : No access token found");
  }
}

$shopify = shopify\client($shop, SHOPIFY_APP_API_KEY , $oauth_token);
?>

