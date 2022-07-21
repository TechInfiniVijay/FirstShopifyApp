<?php
// session_start();

ini_set('display_errors', 0);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

require __DIR__.'/vendor/autoload.php';
use phpish\shopify;
require __DIR__.'/conf.php';

$shop = !empty($_GET['shop']) ? $_GET['shop'] : "";

if(!empty($shop) && !empty($_GET['code'])){

  # Step 3: http://docs.shopify.com/api/authentication/oauth#confirming-installation
  //get permanent access token
	$access_token = shopify\access_token($_GET['shop'], SHOPIFY_APP_API_KEY, SHOPIFY_APP_SHARED_SECRET, $_GET['code']);

  // //save the shop name to the current session
  // $_SESSION[PRFX.'shop']        = $shop;
  $_SESSION[PRFX.'oauth_token'] = $access_token;

  //Create config table

	$config_table_name = CONFIG_TABLE;
	$create_table_sql ="CREATE TABLE IF NOT EXISTS ".$config_table_name." (
		id INT NOT NULL AUTO_INCREMENT,
		PRIMARY KEY(id),
		shop varchar(255),
		store_id varchar(255),
		store_email varchar(255),
		store_owner varchar(255),
		install_date varchar(255),
		oauth_token varchar(255),
		title_status varchar(255),
		header_title varchar(255),
		status varchar(122) NOT NULL DEFAULT 0
	)";

if (mysqli_query($conn, $create_table_sql)) {
    // echo "Table MyGuests created successfully";
} else {
	echo "Error creating table: " . mysqli_error($conn);
}

$title_stt = '0';
$heading_title = 'Special Ofer : Buy a set and pay less with free shipping';

$shopify = shopify\client($shop, SHOPIFY_APP_API_KEY , $access_token);


$shopDetails = $shopify('GET /admin/api/2020-04/shop.json');


$store_id = $shopDetails['id'];
$store_email = $shopDetails['email'];
$store_owner = $shopDetails['name'];
$status  = 'installed';
$install_date = date("Y-m-d");

// print_r($shopDetails);

$sql = "SELECT * FROM $config_table_name WHERE shop ='$shop'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) <= 0) {
 	$sql = "INSERT INTO $config_table_name VALUES ('','$shop','$store_id','$store_email','$store_owner','$install_date','$access_token','$title_stt','$heading_title','$status')";
} else {
	$sql = "UPDATE  $config_table_name SET oauth_token = '$access_token',status = '$status' WHERE shop ='$shop' ";
}
mysqli_query($conn, $sql);
}
//app path
$current_script_name = explode("/",$_SERVER['SCRIPT_NAME']);
if (($key = array_search(end($current_script_name), $current_script_name)) !== false) {
    unset($current_script_name[$key]);
}
$app_path = implode("/", $current_script_name);

$admin_url = "https://$shop/admin/apps/".SHOPIFY_APP_API_KEY.$app_path."/dashboard.php?".PRFX."oauth_token=".$access_token."&".PRFX."shop=".$shop;
die("<script> top.location.href='$admin_url'</script>");

