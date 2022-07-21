const shop = document.querySelector('#ShopValue').value
const token = document.querySelector('#tokenValue').value



// Get Data Model Form
$(document).delegate("[data-target='#shopifyCrud']", "click", function () {
    var productId = $(this).attr('data-id');
    // Ajax config
    $.ajax({
        type: "GET",
        url: `main.php?oauth_token=${token}&shop=${shop}`,
        dataType: "json",
        data: { productId: productId },
        success: function (response) {
            // console.log(response)
            // response = JSON.parse(response);
            $("#editForm [name=\"id\"]").val(response.id);
            $("#editForm [name=\"title\"]").val(response.title);
            $("#editForm [name=\"desc\"]").text(response.body_html);
        }
    });
});

function resetForm(selector) {
    $(selector)[0].reset();
}


// Update Product
$("#updateBtn").on("click", function () {
    var $this = $(this);
    var $caption = $this.html();
    var form = "#editForm";
    var formData = $(form).serializeArray();


    $.ajax({
        type: "POST",
        url: `main.php?oauth_token=${token}&shop=${shop}`,
        data: formData,
        beforeSend: function () {
            $this.attr('disabled', true).html("Processing...");
        },
        success: function (response) {
            $this.attr('disabled', false).html($caption);
            resetForm(form);
            $('#shopifyCrud').modal('toggle');

            window.location.reload();
        }, error: function (errorThrown) {
            console.log(errorThrown);
            alert("There is an error with AJAX!");
        }
    });
});
// Update Product End

// Options
$('#addOptions').click(function () {
    if ($(this).is(':checked')) {
        $('#addProductOptions').show();
    } else {
        $('#addProductOptions').hide();
        resetFormVal()
    }
});

$("#addRow1").click(function () {
    var html = '';
    html += '<div class="row mb-2" id="inputRow1">';
    html += '<div class="col-lg-10 col-sm-10 col-md-10">';
    html += '<input type="text" name="optionValue[]" class="form-control mb-2 optionValue">';
    html += '</div>';
    html += '<div class="col-lg-2 col-sm-2 col-md-2">'
    html += '<a href="javascript:void(0)" class="btn btn-danger" id="removeRow1"><i class="fa fa-trash"></i></a>'
    html += '</div>'
    html += '</div>';

    $('#optionAddValue').append(html);
});
$(document).on('click', '#removeRow1', function () {
    $(this).closest('#inputRow1').remove();
});

$(document).on('click', '#optionTypeRemove', function () {
    $('#addProductOptions').hide();
    $("#addOptions").prop("checked", false);
    resetFormVal()
});

function resetFormVal() {
    $('#optionType').val(null);
    $('.optionValue').val(null);
}