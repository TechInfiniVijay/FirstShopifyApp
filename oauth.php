<?php

	session_start();

	require __DIR__.'/vendor/autoload.php';
	use phpish\shopify;

	require __DIR__.'/conf.php';
		
	# Guard: http://docs.shopify.com/api/authentication/oauth#verification
	$test = shopify\is_valid_request($_GET, SHOPIFY_APP_SHARED_SECRET) or die('Invalid Request! Request or redirect did not come from Shopify');
	
	# Step 2: http://docs.shopify.com/api/authentication/oauth#asking-for-permission
	// if (!isset($_GET['code']))
	// {	
		$permission_url = shopify\authorization_url($_GET['shop'], SHOPIFY_APP_API_KEY, array('read_content', 'write_content', 'read_themes', 'write_themes', 'read_script_tags', 'write_script_tags','read_products','read_customers','write_customers','write_products','read_products','read_orders','write_orders','read_inventory','write_inventory','write_price_rules','read_price_rules','read_discounts','write_discounts','write_shipping'));
		// echo "<br>permission_url : ".$permission_url;
		// die("<script> top.location.href='$permission_url'</script>");
		  header('Location: '.$permission_url);
		  
	// }
?>