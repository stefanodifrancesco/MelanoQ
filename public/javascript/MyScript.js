$(document).ready(function() {

    Initialize();

    $('.datepicker').datepicker({
        format: 'dd-MM-yyyy',
        autoclose: true
    });

    $("#skin-tan").on("change", function(evt) {
        var img = $(this).parents("#fieldSkin_tan").find("#skin-tan-img");
        if ($(this).val() == "NoChoosed") {
            $(img).parent().addClass("hidden-control");
        }
        if ($(this).val() == "No tan") {
            $(img).attr("src", "img/Skin-Tan/No_Tan_1.png").attr("alt", "No Tan");
            $(img).parent().removeClass("hidden-control");
        }
        if ($(this).val() == "Tans lightly") {
            $(img).attr("src", "img/Skin-Tan/Light_Tan_1.png").attr("alt", "Light Tan");
            $(img).parent().removeClass("hidden-control");
        }
        if ($(this).val() == "Tans moderately") {
            $(img).attr("src", "img/Skin-Tan/Moderate_Tan_1.png").attr("alt", "Moderate Tan");
            $(img).parent().removeClass("hidden-control");
        }
        if ($(this).val() == "Tans deeply") {
            $(img).attr("src", "img/Skin-Tan/Deep_Tan_1.png").attr("alt", "Deep Tan");
            $(img).parent().removeClass("hidden-control");
        }
    });

    $("#id_eyes_color").on("change", function(evt) {
        var img = $(this).parents("#fieldsetEye").find("#eye-img");
        if ($(this).val() == "NoChoosed") {
            $(img).parent().addClass("hidden-control");
        }
        if ($(this).val() == "Light") {
            $(img).attr("src", "img/Color-Eye/Light_eyes.png").attr("alt", "category of light color of eyes");
            $(img).parent().removeClass("hidden-control");
        }
        if ($(this).val() == "Medium") {
            $(img).attr("src", "img/Color-Eye/Medium_eyes.png").attr("alt", "category of medium color of eyes");
            $(img).parent().removeClass("hidden-control");
        }
        if ($(this).val() == "Dark") {
            $(img).attr("src", "img/Color-Eye/Dark_eyes.png").attr("alt", "category of dark color of eyes");
            $(img).parent().removeClass("hidden-control");
        }
    });

    $("#id_hair_color").on("change", function(evt) {
        var img = $(this).parents("#fieldsetHair").find("#hair-img");
        if ($(this).val() == "NoChoosed") {
            $(img).parent().addClass("hidden-control");
        }
        if ($(this).val() == "Red") {
            $(img).attr("src", "img/Color-hair/Red_hair.png").attr("alt", "category of red hair color");
            $(img).parent().removeClass("hidden-control");
        }
        if ($(this).val() == "Blonde") {
            $(img).attr("src", "img/Color-hair/Blonde_hair.png").attr("alt", "category of blonde hair color");
            $(img).parent().removeClass("hidden-control");
        }
        if ($(this).val() == "Light brown") {
            $(img).attr("src", "img/Color-hair/Light_brown_hair.png").attr("alt", "category of light brown hair color");
            $(img).parent().removeClass("hidden-control");
        }
        if ($(this).val() == "Dark brown") {
            $(img).attr("src", "img/Color-hair/Dark_brown_hair.png").attr("alt", "category of dark brown hair color");
            $(img).parent().removeClass("hidden-control");
        }
        if ($(this).val() == "Black") {
            $(img).attr("src", "img/Color-hair/Dark_hair.png").attr("alt", "category of dark hair color");
            $(img).parent().removeClass("hidden-control");
        }
    });

    $("#id_Nevi").on("change", function(evt) {
        var img = $(this).parents("#fieldsetNevi").find("#Nevi-img");
        if ($(this).val() == "NoChoosed") {
            $(img).parent().addClass("hidden-control");
        }
        if ($(this).val() == "None") {
            $(img).attr("src", "img/Nevi/No_Nevi.png").attr("alt", "no Nevi");
            $(img).parent().removeClass("hidden-control");
        }
        if ($(this).val() == "Few") {
            $(img).attr("src", "img/Nevi/Few_Nevi.png").attr("alt", "few Nevi");
            $(img).parent().removeClass("hidden-control");
        }
        if ($(this).val() == "Some") {
            $(img).attr("src", "img/Nevi/Some_Nevi.png").attr("alt", "some Nevi");
            $(img).parent().removeClass("hidden-control");
        }
        if ($(this).val() == "Many") {
            $(img).attr("src", "img/Nevi/Many_Nevi.png").attr("alt", "many Nevi");
            $(img).parent().removeClass("hidden-control");
        }
    });

    $("#id_Nevi").on("change", function(evt) {
        var img = $(this).parents("#fieldsetNevi").find("#Nevi-img");
        if ($(this).val() == "NoChoosed") {
            $(img).parent().addClass("hidden-control");
        }
        if ($(this).val() == "None") {
            $(img).attr("src", "img/Nevi/None_Nevi.png").attr("alt", "no Nevi");
            $(img).parent().removeClass("hidden-control");
        }
        if ($(this).val() == "Few") {
            $(img).attr("src", "img/Nevi/Few_Nevi.png").attr("alt", "few Nevi");
            $(img).parent().removeClass("hidden-control");
        }
        if ($(this).val() == "Some") {
            $(img).attr("src", "img/Nevi/Some_Nevi.png").attr("alt", "some Nevi");
            $(img).parent().removeClass("hidden-control");
        }
        if ($(this).val() == "Many") {
            $(img).attr("src", "img/Nevi/Many_Nevi.png").attr("alt", "many Nevi");
            $(img).parent().removeClass("hidden-control");
        }
    });

    $("#id_UltravioletExposure").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).next().removeClass("hidden-control").addClass("show-control");
            $(this).next().find("input[type=text]").prop("required", true);
        }
        if ($(this).val() == "No") {
            $(this).next().addClass("hidden-control").removeClass("show-control");
            $(this).next().find("input:text").prop("required", false);
        }
    });

    $("#id_RecreationalExposure").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).next().removeClass("hidden-control").addClass("show-control");
            $(this).next().prop("required", true);
        }
        if ($(this).val() == "No") {
            $(this).next().addClass("hidden-control").removeClass("show-control");
            $(this).next().prop("required", false);
        }
    });

    $("#id_Sunburns_less18,#id_Sunburns_Yes_greater18,#id_Sunburns_last5").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTableRow").find(".hidden-control .special_on_div_table").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents(".divTableRow").find(".show-control .special_on_div_table").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#id_Sunlamp").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).next().addClass("show-control").removeClass("hidden-control");
            $(this).next().next().addClass("show-control").removeClass("hidden-control");
            $(this).next().next().next().addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).next().addClass("hidden-control").removeClass("show-control");
            $(this).next().next().addClass("hidden-control").removeClass("show-control");
            $(this).next().next().next().addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#id_Smoking").on("change", function(evt) {
        if ($(this).val() == "Former" || $(this).val() == "Current") {
            $(this).next().addClass("show-control").removeClass("hidden-control");
            $(this).next().next().addClass("show-control").removeClass("hidden-control");
            $(this).next().next().next().addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() == "Never") {
            $(this).next().addClass("hidden-control").removeClass("show-control");
            $(this).next().next().addClass("hidden-control").removeClass("show-control");
            $(this).next().next().next().addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#id_Vitamin").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).next().removeClass("hidden-control").addClass("show-control");
        }
        if ($(this).val() == "No") {
            $(this).next().addClass("hidden-control").removeClass("show-control");
        }
    });

    // $("#selectQuestions").on("change", function(evt) {
    //     if ($(this).val() == "Yes") {
    //         $(this).parents("#fieldsetSectionBEval").find(".hidden-control input[type=number]").prop("required", true);
    //         $(this).parents("#fieldsetSectionBEval").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
    //     }
    //     if ($(this).val() == "No") {
    //         $(this).parents("#fieldsetSectionBEval").find(".show-control input[type=number]").prop("required", false);
    //         $(this).parents("#fieldsetSectionBEval").find(".show-control").addClass("hidden-control").removeClass("show-control");
    //     }
    // });

    $("#selectMediumSizedCN,#selectLargeSizedCN,#selectGiantSizedCN").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTableRow").find(".hidden-control input[type=text]").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents(".divTableRow").find(".show-control input[type=text]").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#selectBlueNevi").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTableRow").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents(".divTableRow").find(".show-control input[type=number]").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#selectActinicKeratoses").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#divTableBody").find(".hidden-control #selectActinicKeratosesSite").prop("required", true);
            $(this).parents("#divTableBody").find(".hidden-control #selectActinicKeratosesDistribution").prop("required", true);
            $(this).parents("#divTableBody").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents("#divTableBody").find(".show-control #selectActinicKeratosesSite").prop("required", false).val("NoChoosed");
            $(this).parents("#divTableBody").find(".show-control #selectActinicKeratosesDistribution").prop("required", false).val("NoChoosed");
            $(this).parents("#divTableBody").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });


    function Initialize() {
        DDL_Other('Ethnicity', 'inputEthnicity');
        DDL_Other('Melanoma', 'inputMelanoma');
        DDL_from_JSON('History', 'siccodes.json');
    };

    function Create_Datepicker(tag_ID, tag_Append) {
        var date_input = $("<input type=text id='" + tag_ID + "' class='form-control datepicker auto-width'>");
        $(date_input).datepicker({
            format: 'dd-MM-yyyy',
            autoclose: true
        });
        $("#" + tag_Append).find(".div_date").append($("<div class='form-group'>").append(date_input));
    };

    function DDL_from_JSON(tag_ID_DDL, url) {
        var dropdown = $("#" + tag_ID_DDL).html("<option value='NoChoosed'>Select Sic Gruop ...</option>");
        /*var dropdown2 = $("<select id='dropSIC' class='form-control'>").html("<option value='NoChoosed'>Select Sic Code ...</option>");
        dropdown2.on("change", function () {
            $(this).parents("fieldset").find(".div_date").empty();
            if ($(dropdown2).val() != "NoChoosed") {
                var date_input_start = $("<input type=text id='history_date_start' class='form-control datepicker auto-width'>");
                $(date_input_start).datepicker({
                    format: 'dd-MM-yyyy',
                    autoclose: true
                }).on("changeDate",function(evt){
                    var date_input_end = $("<input type=text id='history_date_end' class='form-control datepicker auto-width'>");
                    $(date_input_end).datepicker({
                        format: 'dd-MM-yyyy',
                        autoclose: true
                    }).on("changeDate",function(evt){
                        var history_row = {};
                        history_row.SIC_Group = $("#fieldHistory").find("#History option:selected").text();
                        history_row.SIC_Code = $("#fieldHistory").find("#dropSIC option:selected").text();
                        history_row.Start_Date = $("#fieldHistory").find("#history_date_start").val();
                        history_row.End_Date = $(this).val();
                        var delete_btn = $("<input class=\"btn btn-primary\" type=\"button\" value=\"Delete\">");
                        $(delete_btn).on("click",function (evt) {
                           $(this).parents(".table").remove();
                            $("#History").val("NoChoosed").trigger("change");
                        });
                        var div_table = $("<div class='table form-group'>");
                        $("#fieldHistory").append(div_table);
                        $(div_table).createTable([history_row]);
                        $("#fieldHistory").find(".table").last().append(delete_btn);
                    });
                    $("#fieldHistory").find(".div_date").append($("<div class='form-group'>").append(date_input_end));
                });
                $("#fieldHistory").find(".div_date").append($("<div class='form-group'>").append(date_input_start));
            }
        });*/
        $.getJSON('SicRanges.json', function(data) {
            $.each(data, function(key, entry) {
                dropdown.append($('<option></option>').attr('value', entry.SIC_Range_Start + '*' + entry.SIC_Range_End).text(entry.Group_Title));
            });
        });
        $("#" + tag_ID_DDL).on("change", function(data) {
            $("#dropSIC").empty();
            var valore = $("#" + tag_ID_DDL).val();
            if (valore == "NoChoosed") {
                $("#dropSIC").remove();
                $("#history_date_start,#history_date_end").remove();
            }
            if (valore != "NoChoosed") {
                var dropdown2 = $("<select id='dropSIC' class='form-control'>").html("<option value='NoChoosed'>Select Sic Code ...</option>");
                dropdown2.on("change", function() {
                    $(this).parents("fieldset").find(".div_date").empty();
                    if ($(dropdown2).val() != "NoChoosed") {
                        var date_input_start = $("<input type=text id='history_date_start' class='form-control datepicker auto-width'>");
                        $(date_input_start).datepicker({
                            format: 'dd-MM-yyyy',
                            autoclose: true
                        }).on("changeDate", function(evt) {
                            var date_input_end = $("<input type=text id='history_date_end' class='form-control datepicker auto-width'>");
                            $(date_input_end).datepicker({
                                format: 'dd-MM-yyyy',
                                autoclose: true
                            }).on("changeDate", function(evt) {
                                var history_row = {};
                                history_row.SIC_Group = $("#fieldHistory").find("#History option:selected").text();
                                history_row.SIC_Code = $("#fieldHistory").find("#dropSIC option:selected").text();
                                history_row.Start_Date = $("#fieldHistory").find("#history_date_start").val();
                                history_row.End_Date = $(this).val();
                                var delete_btn = $("<input class=\"btn btn-primary\" type=\"button\" value=\"Delete\">");
                                $(delete_btn).on("click", function(evt) {
                                    $(this).parents(".table").remove();
                                    $("#History").val("NoChoosed").trigger("change");
                                });
                                var div_table = $("<div class='table form-group'>");
                                $("#fieldHistory").append(div_table);
                                $(div_table).createTable([history_row]);
                                $("#fieldHistory").find(".table").last().append(delete_btn);
                            });
                            $("#fieldHistory").find(".div_date").append($("<div class='form-group'>").append(date_input_end));
                        });
                        $("#fieldHistory").find(".div_date").append($("<div class='form-group'>").append(date_input_start));
                    }
                });
                $("#fieldHistory").find(".dynamic_ddl").append(dropdown2);
                var start = parseInt(valore.split('*')[0]);
                var end = parseInt(valore.split('*')[1]);
                console.log(start);
                console.log(end);
                $.getJSON(url, function(data) {
                    $.each(data, function(key, entry) {
                        var Sic_Code = parseInt(entry.SIC_Code);
                        if (Sic_Code < end && Sic_Code > start) {
                            dropdown2.append($('<option></option>').attr('value', entry.SIC_Code).text(entry.Industry_Title));
                        }
                    });
                });
            }
        });
    };

    function DDL_Other(tag_ID, tag_Class, ) {
        $("#" + tag_ID).on("change", function() {
            if ($(this).val() == "Other") {
                $("." + tag_Class).removeClass("hidden-control").addClass("form-control");
            } else {
                $("." + tag_Class).addClass("hidden-control").removeClass("form-control");
                $("." + tag_Class).val("");
            }
        });
    };

    function DropDownDynamic(Json_Url, classDropDown, titleDropDown) {
        let dropdown = $('.' + classDropDown);
        dropdown.empty();
        dropdown.append('<option selected="true" disabled>titleDropDown</option>');
        dropdown.prop('selectedIndex', 0);
        //const url = 'https://api.myjson.com/bins/7xq2x';
        my_url = Json_Url;
        // Populate dropdown with list of provinces
        $.getJSON(my_url, function(data) {
            $.each(data, function(key, entry) {
                dropdown.append($('<option></option>').attr('value', entry.abbreviation).text(entry.name));
            })
        });
    }

    $('input.mutually_check').click(function() {
        checkedState = $(this).prop('checked');
        $(this).parents('.form-group').find(".mutually_check:checked").each(function() {
            $(this).prop('checked', false);
        });
        $(this).prop('checked', checkedState);
        if ($(this).is("input:checkbox")) {
            if ($(this).attr("name") == "entry.Other") {
                $("#hidden_type_of_melanoma").removeClass("hidden-control").addClass("form-control").focus();
            }
            if ($(this).attr("name") != "entry.Other") {
                $("#hidden_type_of_melanoma").removeClass("form-control").addClass("hidden-control");
                $("#hidden_type_of_melanoma").val("");
            }
        }
    });

    $("#fieldsetCodeNumber #DatabaseCodeCountry").on("change", function(evt) {
        if ($(this).val() != "No Choosed") {
            $("#DatabaseCodeCenter").empty().append("<option value=\"No Choosed\" selected>Select Center ...</option>");
            nation_val = $(this).val();
            $.getJSON('Centers.json', function(result) {
                $.each(result, function(index, value) {
                    if (value.Nation == nation_val) {
                        $("#DatabaseCodeCenter").append("<option value='" + value.Country + "'>" + value.Country + "</option>");
                    }
                });
            });
            $("DatabaseCodeCenter").val("No Choosed");
            $("#fieldsetCodeNumber .hidden-control").removeClass("hidden-control").addClass("show-control");
        }
        if ($(this).val() == "No Choosed") {
            $("#fieldsetCodeNumber .show-control").removeClass("show-control").addClass("hidden-control");
            $("#DatabaseCodeCenter").empty();
        }
    });

    $("#DatabaseCodeCountry,#DatabaseCodeCenter,#DatabaseCodeType").on("change", function(evt) {
        currentCodeCountry = $("#DatabaseCodeCountry").val();
        currentDatabaseCode = $("#DatabaseCodeCenter").val();
        currentDatabaseCodeType = $("#DatabaseCodeType").val();

        console.log("Hello World");
        console.log("country : " + currentCodeCountry +
            "\n" + "database : " + currentDatabaseCode +
            "\n" + "type : " + currentDatabaseCodeType);

        if (currentCodeCountry != "No Choosed" && currentDatabaseCode != "No Choosed" && currentDatabaseCodeType != "No Choosed") {
            object_JSON = {
                "query": {
                    "bool": {
                        "must": [{
                                "term": {
                                    "codeCountry": currentCodeCountry
                                }
                            },
                            {
                                "term": {
                                    "codeCenter": currentDatabaseCode
                                }
                            },
                            {
                                "term": {
                                    "codeType": currentDatabaseCodeType
                                }
                            }
                        ]
                    }
                }
            };
            var test = send_Ajax_Data('http://localhost:9200/melano_questionnaires/_search', object_JSON, myHandle);
            console.log(test);
            $("#codeNumber").val(send_Ajax_Data('http://localhost:9200/melano_questionnaires/_search', object_JSON, myHandle));
        }
    });

    /*$('#bootstrapForm').submit(function (event) {
        event.preventDefault();
        var extraData = {};
        {
             Parsing input date id=700770343
            var dateField = $("#700770343_date").val();
            var timeField = $("#700770343_time").val();
            let d = new Date(dateField);
            if (!isNaN(d.getTime())) {
                extraData["entry.700770343_year"] = d.getFullYear();
                extraData["entry.700770343_month"] = d.getMonth() + 1;
                extraData["entry.700770343_day"] = d.getUTCDate();
            }
            if (timeField && timeField.split(':').length >= 2) {
                let values = timeField.split(':');
                extraData["entry.700770343_hour"] = values[0];
                extraData["entry.700770343_minute"] = values[1];
            }
        }
        {
            Parsing input date id=1969236884
            var dateField = $("#1969236884_date").val();
            var timeField = $("#1969236884_time").val();
            let d = new Date(dateField);
            if (!isNaN(d.getTime())) {
                extraData["entry.1969236884_year"] = d.getFullYear();
                extraData["entry.1969236884_month"] = d.getMonth() + 1;
                extraData["entry.1969236884_day"] = d.getUTCDate();
            }
            if (timeField && timeField.split(':').length >= 2) {
                let values = timeField.split(':');
                extraData["entry.1969236884_hour"] = values[0];
                extraData["entry.1969236884_minute"] = values[1];
            }
        }
        {
            Parsing input date id=2126036184
            var dateField2 = $("#2126036184_date").val();
            var timeField2 = $("#2126036184_time").val();
            let d = new Date(dateField2);
            if (!isNaN(d.getTime())) {
                extraData["entry.2126036184_year"] = d.getFullYear();
                extraData["entry.2126036184_month"] = d.getMonth() + 1;
                extraData["entry.2126036184_day"] = d.getUTCDate();
            }
            if (timeField2 && timeField2.split(':').length >= 2) {
                let values = timeField2.split(':');
                extraData["entry.2126036184_hour"] = values[0];
                extraData["entry.2126036184_minute"] = values[1];
            }
        }
        $('#bootstrapForm').ajaxSubmit({
            data: extraData,
            dataType: 'jsonp',  // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
            error: function () {
                // Submit of form should be successful but JSONP callback will fail because Google Forms
                // does not support it, so this is handled as a failure.
                alert('Form Submitted. Thanks.');
                // You can also redirect the user to a custom thank-you page:
                // window.location = 'http://www.mydomain.com/thankyoupage.html'
            }
        });
    });*/

    // $("#submit").on('click', function(e) {
    //     e.preventDefault();
    //     var serJson = $("#msform").serialize();
    //     serJson.append(history_list);
    //     console.log(serJson);
    //     console.log("inside submit")
    //         // send ajax
    //         // $.ajax({
    //         //     url: '/stepform', // url where to submit the request
    //         //     type: "POST", // type of action POST || GET
    //         //     dataType: 'json', // data type
    //         //     data: serJson, // post data || get data
    //         //     success: function(result) {
    //         //         // you can see the result from the console
    //         //         // tab of the developer tools
    //         //         console.log(result);
    //         //     },
    //         //     error: function(xhr, resp, text) {
    //         //         console.log(xhr, resp, text);
    //         //     }
    //         // })
    // });
});

function send_Ajax_Data(custom_URL, object_JSON, handleDATA) {
    $.ajax({
        type: "POST",
        url: custom_URL,
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(object_JSON),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            handleDATA(data);
        },
        failure: function(errMsg) {
            console.log(errMsg);
        }
    });
};

function zeroPad(num, places) {
    return String(num).padStart(places, '0')
};

function myHandle(data) {
    if (data.hits.hits.length == 0) {
        $("#codeNumber").val("0001");
    } else {
        number = parseInt(data.hits.hits._source.codeNumber) + 1;
        return zeroPad(number, 4);
    }
};

var listTEST = [{ "a": 1, "b": 2 }, { "c": 1, "d": 2 }]