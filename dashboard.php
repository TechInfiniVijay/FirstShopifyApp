<?php
$page="dashboard";
include 'header.php';
$products = $shopify("GET /admin/api/2022-01/products.json");
?>
<!doctype html>
<html lang="en">

<head>
    <title>Shopify Application Crud</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/css/main.css">
</head>

<body>
    <input type="hidden" value="<?php echo $shop ?>" id="ShopValue">
    <input type="hidden" value="<?php echo $oauth_token ?>" id="tokenValue">
    <div class="container-fluid mt-2 mb-2">
        <div class="main">
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="form-group">
                        <input type="text" name="search" class="form-control" id="search" placeholder="Filter Product"
                            id="filtertxt" onkeyup="filterProduct()">
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="form-group">
                        <button type="button" class="btn btn-success float-right" data-toggle="modal"
                            data-target="#shopifyAdd"><i class="fa fa-plus"></i> Add</button>
                    </div>
                </div>
            </div>
            <table class="table table-stripe table-hover" id="productTable">
                <thead>
                    <tr>
                        <th>Product Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    foreach($products as $product){
                    ?>
                    <tr>

                        <td><?= $product['title']; ?></td>
                        <td><?= wordwrap($product['body_html'],30,"<br>"); ?></td>
                        <td><span class="badge badge-success"><?= $product['status']; ?></span></td>
                        <td>
                            <a href="#" class="btn btn-primary" data-id="<?= $product['id']; ?>" data-toggle="modal"
                                data-target="#shopifyCrud"><i class="fa fa-pencil-square-o"></i></a>
                            <a href="#" class="btn btn-danger" onclick="deleteProduct(this)"
                                data-id="<?= $product['id']; ?>"><i class="fa fa-trash-o"></i></a>
                        </td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Add Model Form Start-->
    <div class="modal fade" id="shopifyAdd" tabindex="-1" role="dialog" aria-labelledby="shopifyAddLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="shopifyAddLabel">Add New Product</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addForm">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Title :</label>
                            <input type="text" name="title" class="form-control" id="title">
                        </div>

                        <div class="form-group">
                            <label for="">Status : </label>
                            <select class="form-control" name="status" id="status">
                                <option selected disabled>Choose Status</option>
                                <option value="active">Active</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Description :</label>
                            <textarea class="form-control" name="desc" id="desc"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" name="addProduct" class="btn btn-primary" id="addProductBtn">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Add Model End -->

    <!-- Edit Model Form Start-->
    <div class="modal fade" id="shopifyCrud" tabindex="-1" role="dialog" aria-labelledby="shopifyCrudLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="shopifyCrudLabel">Product Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="editForm">
                        <input type="hidden" name="id" title="id">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Title :</label>
                            <input type="text" name="title" class="form-control" id="title">
                        </div>

                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Description :</label>
                            <textarea class="form-control" name="desc" id="desc"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" name="save" class="btn btn-primary" id="updateBtn">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Edit Model End -->

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="./assets/js/main.js"></script>
    <script>
    var shop1 = document.querySelector('#ShopValue').value
    var token1 = document.querySelector('#tokenValue').value
    // Add Product
    $("#addProductBtn").on("click", function() {
        var $this = $(this);
        var $caption = $this.html();
        var form = "#addForm";
        var formData = $(form).serializeArray();
        $.ajax({
            type: "POST",
            url: `main.php?oauth_token=${token1}&shop=${shop1}`,
            data: formData,
            beforeSend: function() {
                $this.attr('disabled', true).html("Processing...");
            },
            success: function(response) {
                $this.attr('disabled', false).html($caption);
                resetForm(form);
                $('#shopifyAdd').modal('toggle');
                console.log(response)
                // window.location.reload();
                var response1 = JSON.parse(response)
                $('#productTable tbody').prepend("<tr><td>" + response1.title + "</td><td>" +
                    response1.body_html + "</td><td><span class='badge badge-success'>" +
                    response1.status +
                    "</span></td><td><a href='#' class='btn btn-primary' data-id='" + response1
                    .id +
                    "' data-toggle='modal' data-target='#shopifyCrud'><i class='fa fa-pencil-square-o'></i></a><a href='#' class='btn btn-danger' onclick='deleteProduct(this)' data-id='" +
                    response1.id + "'><i class='fa fa-trash-o'></i></a></td></tr>");
            },
            error: function(errorThrown) {
                console.log(errorThrown);
                alert("There is an error with AJAX!");
            }
        });
    });
    // Add Product End

    // Delete Product
    function deleteProduct(e) {
        let pid = e.getAttribute('data-id');
        var $ele = e.closest('tr');
        $.ajax({
            type: "DEL",
            url: `main.php?oauth_token=${token1}&shop=${shop1}`,
            data: {
                deleteId: pid,
                oauth_token: token1,
                shop: shop1
            },
            success: function(result) {
                alert("Product Successfully Delete.")
                // console.log(result)
                $ele.remove();
                // window.location.reload();
            },
            error: function(errorThrown) {
                console.log(errorThrown);
                alert("There is an error with AJAX!");
            }
        });
    }
    // Delete Product End 

    // Filter Product
    function filterProduct() {
        var input, filter, table, tr, td, i, txtValue;
        input = $("#filtertxt").val();
        filter = input.toUpperCase();
        table = document.getElementById("productTable");
        tr = table.getElementsByTagName("tbody tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    // Filter Product End
    </script>
</body>

</html>