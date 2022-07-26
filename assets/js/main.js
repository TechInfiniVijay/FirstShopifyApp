"use strict"

const shop = document.querySelector('#ShopValue').value
const token = document.querySelector('#tokenValue').value

function a(data) {
    alert(data)
}
function c(data) {
    console.log(data)
}

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

function resetFormVal() {
    $('#optionType').val(null);
    $('.optionValue').val(null);
}

// Options
$('#addOptions').click(function () {
    if ($(this).is(':checked')) {
        $('#addProductOptions').show();
        $('#addNewoptionbtn').show();
        var select = '#addProductOptions';
        makeDiv(0, 0, select);
    } else {
        $('#addProductOptions').hide();
        $('#addNewoptionbtn').hide();
        $(".optionBox").remove();
        $(".variantBox").remove();
        resetFormVal()
    }
});

function makeDiv(id = null, classes = null, selectorBox) {
    var div = '';
    div += "<div id='optionBox" + id + "' class='optionBox'>"
    div += "<div class='form-group'>";
    div += "<label for=''>Option Name :</label>";
    div += "<div class='row mb-2'>";
    div += "<div class='col-lg-10 col-sm-10 col-md-10'>";
    div += "<input type='text' name='optionType" + id + "[]' id='optionType" + id + "' class='form-control optionType' list='optionList" + id + "' placeholder='Size'>";
    div += "<div class='errorType'></div>";
    div += "</div>";
    div += "<div class='col-lg-2 col-sm-2 col-md-2'>";
    div += "<a href='javascript:void(0)' class='btn btn-danger removeDiv" + classes + "' data-id='optionBox" + id + "' id='optionTypeRemove" + id + "'><i class='fa fa-trash'></i></a>";
    div += "</div>";
    div += "<datalist id='optionList" + id + "' class='dataOptions' name='optionList'>";
    div += "<option value='Size'>";
    div += "<option value='Color'>";
    div += "<option value='Material'>";
    div += "<option value='Style'>";
    div += "</datalist>";
    div += "</div>";
    div += "<div id='optionAddValue" + id + "'>";
    div += "<label for=''>Option Value :</label>";
    div += "<div class='row mb-2'>";
    div += "<div class='col-lg-10 col-sm-10 col-md-10'>";
    div += "<input type='text' name='optionValue" + id + "[]' data-append='false'  class='form-control mb-2 char optionValue" + classes + "'>";
    div += "</div>";
    div += "<div class='col-lg-2 col-sm-2 col-md-2'>";
    div += "<a href='javascript:void(0)' class='btn btn-primary' id='addRow" + id + "'><i class='fa fa-plus'></i></a>";
    div += "</div>";
    div += "</div>";
    div += "</div>";
    div += "</div>";
    div += "</div>";
    $("" + selectorBox + "").append(div);

    $("#addRow" + id).click(function () {
        var html = '';
        html += '<div class="row mb-2 inputRow' + classes + '">';
        html += '<div class="col-lg-10 col-sm-10 col-md-10">';
        html += '<input type="text" name="optionValue' + id + '[]" data-val="" class="form-control mb-2 char optionValue' + classes + '">';
        html += '</div>';
        html += '<div class="col-lg-2 col-sm-2 col-md-2">'
        html += '<a href="javascript:void(0)" class="btn btn-danger removeRow' + classes + '"><i class="fa fa-trash"></i></a>'
        html += '</div>'
        html += '</div>';

        $('#optionAddValue' + id).append(html);
    });

    $(document).on('click', '.removeRow' + classes, function () {
        $(this).closest('.inputRow' + classes).remove();
    });


    $(document).on('click', '.removeDiv' + classes, function (e) {
        var divbox = $(this).attr('data-id');
        if (divbox === 'optionBox0') {
            $('#addProductOptions').hide();
            $("#optionBox0").remove();
            $(".optionBox").remove();
            $('#addNewoptionbtn').hide();
            $(".variantBox").remove();
            $("#addOptions").prop("checked", false);
            resetFormVal();
        } else {
            $("#" + divbox + "").remove();
        }
    })

}

// $(document).on('input', '.optionType', function () {
//     let optionTypeValidate = $(this).val()
//     if (optionTypeValidate === 'Style' && optionTypeValidate === 'Size' && optionTypeValidate === 'Color' && optionTypeValidate === 'Material') {
//         $('.errorType').append("<span class='text-danger'>This Type Already Used.</span>");
//     }
// });

var classes = 1;
var id = 1;
$('#addNewOptions').on('click', function () {
    var selectNew = '#addProductOptions';
    makeDiv((id++), (classes++), selectNew);
})

// $(document).on('keyup', '.char', function () {
//     $(this).data('val', $(this).val());
// });
function variationBox(ids = null, classes = null, value = null, nameattr, selector) {
    var variationBox = '';
    variationBox += `<div class="variantBox" id="variantBox${ids}" data-id="variantBox${ids}">
                            <div class="row">
                                <div class="col-sm-4 col-md-4 col-lg-4 form-group variantImage">
                                        <input type="file" name="variantImg[]" class="img-fluid form-control dropify">
                                </div>
                                <div class="col-sm-4 col-md-4 col-lg-4 form-group">
                                    <input type="text" name="${nameattr}[]" value="${value}" class="form-control" id="">
                                </div>
                                <div class="col-sm-4 col-md-4 col-lg-4 form-group">
                                    <input type="text" name="price[]" class="form-control" id=""
                                        placeholder="Price">
                                </div>
                            </div>
                        </div>`;
    $("" + selector + "").append(variationBox);
    $('.dropify').dropify()
}
var idss = 1;
var classess = 1;

let nameRow = '';
$(document).on('change', '.optionType', function () {
    nameRow = $(this).val();
})

$(document).on('keyup', '.char', function (e) {
    var current = $(this).val();
    const prev = this.getAttribute('data-append');
    var selectVar = '#variants';

    var currentVal = '';
    $(this).each(function () {
        currentVal = $(this).val();
    });
    var currentVal1 = $(`input[name=${nameRow}]`).val(currentVal);
    c(currentVal1)
    if (current.length === 1 && prev !== "true") {
        this.setAttribute('data-append', true)
        this.setAttribute('data-div', `variantBox${idss++}`)

        variationBox((idss++), (classess++), currentVal1, nameRow, selectVar)
    }
    //  else if (current.length === 0 && prev === "true") {
    //     const dataDiv = $(this).data('div')
    //     c(dataDiv)
    //     $('.variantBox').remove();
    // } else {
    //     // 
    // }
})