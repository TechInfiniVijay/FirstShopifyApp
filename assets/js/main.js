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

var varDivCount = '';

function makeDiv(id = null, classes = null, nameData, selectorBox, placeholder = 'Size') {
    var div = '';
    div += "<div id='optionBox" + id + "' class='optionBox'>"
    div += "<div class='form-group'>";
    div += "<label for=''>Option Name :</label>";
    div += "<div class='row mb-2'>";
    div += "<div class='col-lg-10 col-sm-10 col-md-10'>";
    div += "<input type='text' name='optionType" + id + "[]' id='optionType" + id + "' class='form-control optionType' data-class='' list='optionList" + id + "' placeholder=" + placeholder + ">";
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
    div += "<input type='text' name='optionValue" + id + "[]' data-append='false' data-val='" + nameData + "'  class='form-control mb-2 char optionValue" + classes + "'>";
    div += `<p id="error" data-append="false"></p>`;
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


    $(document).on('click', '#addNewoptionbtn', function () {
        varDivCount = $('.optionBox').length
        // c(varDivCount)
        if (varDivCount >= 3) {
            $('#addNewoptionbtn').hide();
        }
    })


    $(document).on('click', '.removeDiv' + classes, function (e) {
        var divbox = $(this).attr('data-id');
        if (varDivCount >= 2) {
            $('#addNewoptionbtn').show();
        }
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

let nameRow = '';
$(document).on('change', '.optionType', function () {
    nameRow = $(this).val();
    this.setAttribute('data-class', nameRow)
})


// Options
$('#addOptions').click(function () {
    if ($(this).is(':checked')) {
        $('#addProductOptions').show();
        $('#addNewoptionbtn').show();
        var select = '#addProductOptions';
        makeDiv(0, 0, nameRow, select);
    } else {
        $('#addProductOptions').hide();
        $('#addNewoptionbtn').hide();
        $(".optionBox").remove();
        $(".variantBox").remove();
        resetFormVal()
    }
});

var classes = 1;
var id = 1;
var placeholder = '';
$('#addNewOptions').on('click', function () {
    var selectNew = '#addProductOptions';
    console.log(varDivCount)
    if (varDivCount == 2) {
        placeholder = "Color"
    } else if (varDivCount == 3) {
        placeholder = "Material"
    } else {
        placeholder = "Style"
    }
    makeDiv((id++), (classes++), nameRow, selectNew, placeholder);
})

function variationBox(ids = null, classes = null, value, nameattr, selector) {
    var variationBox = '';

    variationBox += `<div class="variantBox ${nameattr}${classes}" id="variantBox${ids}" data-id="variantBox${ids}">
                            <div class="row">
                                <div class="col-sm-4 col-md-4 col-lg-4 form-group variantImage">
                                        <input type="file" name="variantImg[]" class="img-fluid form-control dropify">
                                </div>
                                <div class="col-sm-4 col-md-4 col-lg-4 form-group">
                                    <input type="text" name="${nameattr}[]" value="${value}" class="form-control ${nameattr}" data-val="${nameattr}" id="">
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

$(document).on('keyup', '.char', function (e) {

    var current = $(this).val();
    const prev = this.getAttribute('data-append');
    var selectVar = '#variants';

    var currentVal = '';
    $(this).each(function () {
        currentVal = $(this).val();
    });

    if (current.length === 1 && prev !== "true") {
        const selectP = document.getElementById("error");
        const prevError = selectP.getAttribute('data-append');

        if (nameRow !== '' && prevError !== "true") {
            if (current.length === 1) {
                this.setAttribute('data-append', true)
            }
            variationBox((idss++), (classess++), currentVal, nameRow, selectVar)
            // var getVal = document.querySelector(`.${nameRow}`);
            // var currentVal1 = getVal.setAttribute('data-val', currentVal)
            // var count = $(`.${nameRow}${(classess++)}`).length;
            // c(count)
        } else {
            selectP.setAttribute('data-append', true)
            $('#error').append(`<span class="text-danger errorSpan">Please Select Option Type First.</span>`);
        }
    }
    else if (current.length === 0 && prev === true && prevError === true) {
        $('.errorSpan').remove();
    } else {
        // 
    }
});
