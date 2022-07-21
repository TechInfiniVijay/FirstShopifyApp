<?php
header("Access-Control-Allow-Origin: *");
// header("Content-Security-Policy: frame-ancestors *");
// header("Content-Security-Policy:  default-src *");
// header("Content-Security-Policy:  style-src *");
// header("Content-Security-Policy:  script-src 'self'");
// header("Content-Security-Policy:  blob:; object-src *");

if(!defined('SHOPIFY_APP_API_KEY')){
	define('SHOPIFY_APP_API_KEY', '11b698fa55704bfc60c7073a6c1377d2');
}
if(!defined('SHOPIFY_APP_SHARED_SECRET')){
	define('SHOPIFY_APP_SHARED_SECRET', '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');
}
// SHOPIFY_SITE_URL = your App main directory Url
if(!defined('SHOPIFY_SITE_URL')){
	// define('SHOPIFY_SITE_URL', 'https://0ee6-2401-4900-1b2a-a1cc-2c2e-1d3a-b076-bc9.ngrok.io/donation-app/');
	define('SHOPIFY_SITE_URL', 'https://appsworld2.xyz/deviago/ship_with_discount/');
}


// PRFX = prefix for variables accordingly app name

if(!defined('PRFX')){
	define('PRFX', '');
}
// tables
if(!defined('CONFIG_TABLE')){
	define('CONFIG_TABLE', 'shopify_ship_with_discount');
}

// DATABASE CONNECTION STRING
define('SHOPIFY_DB_HOST', 'localhost');
define('SHOPIFY_DB_USER', 'appsbooy_shpfyusr5687');
define('SHOPIFY_DB_PASS', '}?uhF#pA}8UC');
define('SHOPIFY_DB_NAME', 'appsbooy_shpfystapp02547');

// Create connection
$conn = mysqli_connect(SHOPIFY_DB_HOST, SHOPIFY_DB_USER, SHOPIFY_DB_PASS, SHOPIFY_DB_NAME);
// $conn = mysqli_connect('localhost', 'appsbooy_shpfyusr5687', '}?uhF#pA}8UC', 'appsbooy_shpfystapp02547');
// Check connection
if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
}
?>