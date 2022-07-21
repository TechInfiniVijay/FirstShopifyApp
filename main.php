<?php
$page="main";
include 'header.php';
// ini_set("display_errors",1);

// Add New Product code
if($_REQUEST['title'] && $_REQUEST['desc'] && $_REQUEST['status']){
  $title = $_REQUEST['title'];
  $description = $_REQUEST['desc'];
  $status = $_REQUEST['status'];
  $arr = array(
    "product"=>array(
      'id'=>$product_id,
      'title'=>$title,
      'body_html'=>$description,
      'status'=> $status,
    )
  );
  $productAdd = $shopify("POST /admin/api/2022-01/products.json",array(),$arr);
//  echo "Product Successfully Add.";
echo json_encode($productAdd);

}
// Add New Product code End

// Delete Product Code
if(isset($_REQUEST['deleteId']) && isset($_REQUEST['oauth_token']) && isset($_REQUEST['shop'])){
    $id= $_REQUEST['deleteId'];
    // print_r($id);
    $delproduct = $shopify("DEL /admin/api/2022-01/products/".$id.".json");
    if($delproduct){
      echo "Data was deleted successfully";
    }else{
        $msg= "Error: " . $delproduct;
      echo $msg;
    }
}
// Delete Product Code End


// Get Single Product code
if(isset($_REQUEST['productId'])){
  $getpid = $_REQUEST['productId'];

  $getProduct = $shopify("GET /admin/api/2022-01/products/".$getpid.".json");
  echo json_encode($getProduct);
}
// Get Single Product code End

// Update Product code
if($_REQUEST['id'] && $_REQUEST['title'] && $_REQUEST['desc']){
  $product_id = $_REQUEST['id'];
  $title = $_REQUEST['title'];
  $description = $_REQUEST['desc'];
  $arr = array(
    "product"=>array(
      'id'=>$product_id,
      'title'=>$title,
      'body_html'=>$description
    )
   
  );
  $product = $shopify("PUT /admin/api/2022-07/products/".$product_id.".json",array(),$arr);
 echo "Product Successfully Update.";
  
}
// Update Product code End

?>