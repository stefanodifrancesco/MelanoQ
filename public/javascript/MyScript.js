$(document).ready(function () {

    $('.datepicker').datepicker({
        format: 'dd-M-yyyy',
        autoclose: true
    });

    /*var myMap = new google.maps.Map(document.getElementById("myMap"), {
        center: {lat: 37.5, lng: -120},
        zoom: 6
    });*/

    var ListaResidency = [];

    $("#fieldsetCodeNumber #DatabaseCodeCountry").on("change", function (evt) {
        if ($(this).val() != "No Choosed") {
            $("#DatabaseCodeCenter").empty().append("<option value=\"No Choosed\" selected>Select Center ...</option>");
            nation_val = $(this).val();
            $.getJSON('Centers.json', function (result) {
                $.each(result, function (index, value) {
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

    $("#DatabaseCodeCountry,#DatabaseCodeCenter,#DatabaseCodeType").on("change", function (evt) {
        currentCodeCountry = $("#DatabaseCodeCountry").val();
        currentDatabaseCode = $("#DatabaseCodeCenter").val();
        currentDatabaseCodeType = $("#DatabaseCodeType").val();

        console.log("Hello World");
        console.log("country : " + currentCodeCountry +
            "\n" + "database : " + currentDatabaseCode +
            "\n" + "type : " + currentDatabaseCodeType);

        if (currentCodeCountry != "No Choosed" && currentDatabaseCode != "No Choosed" && currentDatabaseCodeType != "No Choosed") {
            object_JSON = {
                "sort": [{
                    "timestamp": {
                        "order": "desc"
                    }
                }],
                "query": {
                    "bool": {
                        "must": [{
                            "term": {
                                "code_country": currentCodeCountry
                            }
                        },
                            {
                                "term": {
                                    "code_center": currentDatabaseCode
                                }
                            },
                            {
                                "term": {
                                    "code_type": currentDatabaseCodeType
                                }
                            }
                        ]
                    }
                },
                "size": 1
            };
            send_Ajax_Data('http://localhost:9200/melano_questionnaires/_search', object_JSON, currentCodeCountry, currentDatabaseCode, currentDatabaseCodeType);
        }
    });

    $("#skin-tan").on("change", function (evt) {
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

    $("#id_eyes_color").on("change", function (evt) {
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

    $("#id_hair_color").on("change", function (evt) {
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

    $("#id_Nevi").on("change", function (evt) {
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

    $("#id_Nevi").on("change", function (evt) {
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

    $("#id_UltravioletExposure").on("change", function (evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#fieldsetUltravioletExposure").find(".hidden-control").removeClass("hidden-control").addClass("show-control");
            $(this).parents("#fieldsetUltravioletExposure").find("input[type=text]").prop("required", true);
        }
        if ($(this).val() == "No") {
            $(this).parents("#fieldsetUltravioletExposure").find(".show-control").addClass("hidden-control").removeClass("show-control");
            $(this).parents("#fieldsetUltravioletExposure").find("input:text").prop("required", false);
        }
    });

    $("#id_RecreationalExposure").on("change", function (evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#fieldsetRecreationalExposure").find(".hidden-control").removeClass("hidden-control").addClass("show-control");
            $(this).parents("#fieldsetRecreationalExposure").find("input[type=text]").prop("required", true);
        }
        if ($(this).val() == "No") {
            $(this).parents("#fieldsetRecreationalExposure").find(".show-control").addClass("hidden-control").removeClass("show-control");
            $(this).parents("#fieldsetRecreationalExposure").find("input:text").prop("required", false);
        }
    });
    $("#id_Sunburns_less18,#id_Sunburns_Yes_greater18,#id_Sunburns_last5").on("change", function (evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTableRow").find(".hidden-control .special_on_div_table").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents(".divTableRow").find(".show-control .special_on_div_table").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#id_Sunlamp").on("change", function (evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#fieldsetSunlamps").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents("#fieldsetSunlamps").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents("#fieldsetSunlamps").find(".show-control input[type=number]").prop("required", false);
            $(this).parents("#fieldsetSunlamps").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#id_Smoking").on("change", function (evt) {
        if ($(this).val() == "Former" || $(this).val() == "Current") {
            $(this).parents("#fieldsetSmoking").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents("#fieldsetSmoking").find("#id_Smoke_quantity").prop("required", true);
            $(this).parents("#fieldsetSmoking").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() == "Never") {
            $(this).parents("#fieldsetSmoking").find(".show-control input[type=number]").prop("required", false);
            $(this).parents("#fieldsetSmoking").find("#id_Smoke_quantity").prop("required", false);
            $(this).parents("#fieldsetSmoking").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#id_Vitamin").on("change", function (evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#fieldsetVitamin").find(".hidden-control").removeClass("hidden-control").addClass("show-control");
        }
        if ($(this).val() == "No") {
            $(this).parents("#fieldsetRecreationalExposure").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#selectQuestions").on("change", function (evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#fieldsetSectionBEval").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents("#fieldsetSectionBEval").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() == "No") {
            $(this).parents("#fieldsetSectionBEval").find(".show-control input[type=number]").prop("required", false);
            $(this).parents("#fieldsetSectionBEval").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#selectMediumSizedCN,#selectLargeSizedCN,#selectGiantSizedCN").on("change", function (evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTableRow").find(".hidden-control input[type=text]").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents(".divTableRow").find(".show-control input[type=text]").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#selectBlueNevi").on("change", function (evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTableRow").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents(".divTableRow").find(".show-control input[type=number]").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#selectActinicKeratoses").on("change", function (evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#fieldsetActinicKeratoses").find(".hidden-control #selectActinicKeratosesSite").prop("required", true);
            $(this).parents("#fieldsetActinicKeratoses").find(".hidden-control #selectActinicKeratosesDistribution").prop("required", true);
            $(this).parents("#fieldsetActinicKeratoses").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents("#fieldsetActinicKeratoses").find(".show-control #selectActinicKeratosesSite").prop("required", false).val("NoChoosed");
            $(this).parents("#fieldsetActinicKeratoses").find(".show-control #selectActinicKeratosesDistribution").prop("required", false).val("NoChoosed");
            $(this).parents("#fieldsetActinicKeratoses").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#selectBCC,#selectSCC,#selectSCCSite").on("change", function (evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTable").find(".hidden-control input").prop("required", true);
            $(this).parents(".divTable").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents(".divTable").find(".show-control input").prop("required", false);
            $(this).parents(".divTable").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    function Initialize() {
        DDL_Other('Ethnicity', 'inputEthnicity');
        DDL_Other('Melanoma', 'inputMelanoma');
        DDL_from_JSON('History', 'siccodes.json');
        //$("#ICD10_Search_Toggle").click();
    };

    function Create_Datepicker(tag_ID, tag_Append) {
        var date_input = $("<input type=text id='" + tag_ID + "' class='form-control datepicker auto-width'>");
        $(date_input).datepicker({
            format: 'dd-M-yyyy',
            autoclose: true
        });
        $("#" + tag_Append).find(".div_date").append($("<div class='form-group'>").append(date_input));
    };

    function DDL_from_JSON(tag_ID_DDL, url) {
        var dropdown = $("#" + tag_ID_DDL).html("<option value='NoChoosed'>Select Sic Group ...</option>");
        var history_list = [];

        $.getJSON('SicRanges.json', function (data) {
            $.each(data, function (key, entry) {
                dropdown.append($('<option></option>').attr('value', entry.SIC_Range_Start + '*' + entry.SIC_Range_End).text(entry.Group_Title));
            });
        });
        $("#" + tag_ID_DDL).on("change", function (data) {
            $("#dropSIC,#history_date_start,#history_date_end").remove();
            var valore = $("#" + tag_ID_DDL).val();
            if (valore != "NoChoosed") {
                var dropdown2 = $("<select id='dropSIC' class='form-control'>").html("<option value='NoChoosed'>Select Sic Code ...</option>");
                dropdown2.on("change", function () {
                    $("#history_date_start,#history_date_end").remove();
                    $(this).parents("fieldset").find(".div_date").empty();
                    if ($(dropdown2).val() != "NoChoosed") {
                        var date_input_start = $("<input type=text id='history_date_start' class='form-control datepicker auto-width'>");
                        $(date_input_start).datepicker({
                            format: 'dd-M-yyyy',
                            autoclose: true
                        }).on("changeDate", function (evt) {
                            var date_input_end = $("<input type=text id='history_date_end' class='form-control datepicker auto-width'>");
                            $(date_input_end).datepicker({
                                format: 'dd-M-yyyy',
                                autoclose: true
                            }).on("changeDate", function (evt) {
                                var history_row = {};
                                history_row.SIC_Group = $("#fieldHistory").find("#History option:selected").text();
                                history_row.SIC_Code = $("#fieldHistory").find("#dropSIC option:selected").text();
                                history_row.start_date = $("#fieldHistory").find("#history_date_start").val();
                                history_row.end_date = $(this).val();
                                history_list.push(history_row);
                                // create_Table_Delete(history_list,"json-table-wrapper-history","fieldHistory");
                                $("#json-table-wrapper-history").createTable(history_list);
                                $("#History").val("NoChoosed");
                                $("#dropSIC,#history_date_start,#history_date_end,.div_date span").remove();
                            });
                            $("#fieldHistory").find(".div_date").append($("<div class=''><span>Date end</span>").append(date_input_end));
                        });
                        $("#fieldHistory").find(".div_date").append($("<div class=''><span>Date start </span>").append(date_input_start));
                    }
                });
                $("#fieldHistory").find(".dynamic_ddl").append(dropdown2);
                var start = parseInt(valore.split('*')[0]);
                var end = parseInt(valore.split('*')[1]);
                console.log(start);
                console.log(end);
                $.getJSON(url, function (data) {
                    $.each(data, function (key, entry) {
                        var Sic_Code = parseInt(entry.SIC_Code);
                        if (Sic_Code < end && Sic_Code > start) {
                            dropdown2.append($('<option></option>').attr('value', entry.SIC_Code).text(entry.Industry_Title));
                        }
                    });
                });
            }
        });
    };

    function DDL_Other(tag_ID, tag_Class,) {
        $("#" + tag_ID).on("change", function () {
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
        $.getJSON(my_url, function (data) {
            $.each(data, function (key, entry) {
                dropdown.append($('<option></option>').attr('value', entry.abbreviation).text(entry.name));
            })
        });
    }

    $('input.mutually_check').click(function () {
        checkedState = $(this).prop('checked');
        $(this).parents('.form-group').find(".mutually_check:checked").each(function () {
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

    var ListaICD10 = [];
    var ICD10_options_by_code = {
        url: "icd10_codes.json",
        getValue: function (element) {
            return element.code;
        },
        template: {
            type: "description",
            fields: {
                description: "desc"
            }
        },
        list: {
            maxNumberOfElements: 5,
            match: {
                enabled: true
            },
            sort: {
                enabled: true
            },
            onClickEvent: function (element) {
                var code = $("#ICD10Code").val();
                var description = $(".selected .eac-item span").text();
                $("#ICD10Code").val($("#ICD10Code").val() + " " + description);
                ListaICD10.push({"code": code, "desc": description});
                // create_Table_Delete(ListaICD10,"json_medical_history","fieldsetHistoryMedicalDiagnosis");
                $("#json_medical_history").createTable(ListaICD10);
            },
            onChooseEvent: function (element) {

            }
        },
        theme: "square"
    };

    $("#ICD10Code").easyAutocomplete(ICD10_options_by_code);
    $("#ICD10Code").on("focus", function (element) {
        $(this).val("");
    });

    var List_Medications = [];
    $("#save_med").on("click", function (evt) {
        var medication_start_date = $(".med-start-date").val();
        var medication_end_date = $(".med-end-date").val();
        if (medication_start_date != "" && medication_end_date != "") {
            Medication = {};
            Medication.start_date = medication_start_date;
            Medication.end_date = medication_end_date;
            List_Medications.push(Medication);
            $("#Medication-Number").val(List_Medications.length + 1);
            $(".med-start-date,.med-end-date").val("");
            $("#json-medications").createTable(List_Medications);
        } else {
            evt.preventDefault();
            alert("Please Insert date-start and/or date-end fields");
        }
    });

    $("#submit").on('click', function (e) {
        e.preventDefault();
        var serJson = $("#msform").serializeJSON();

        history_list.forEach(occupation => {
            delete occupation.Action;
        });
        serJson.SIC_list = history_list;

        ListaICD10.forEach(diagnoses => {
            delete diagnoses.Action;
        });
        serJson.diagnoses = ListaICD10;

        $.ajax({
            url: '/stepform', // url where to submit the request
            type: "POST", // type of action POST || GET
            dataType: 'json', // data type
            data: serJson, // post data || get data
            success: function (result) {
                // you can see the result from the console
                // tab of the developer tools
                console.log(result);
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })

        Initialize();
    });

    function create_Table_Delete(lista_JSON, div_id, field_id) {
        var delete_btn = "<input style=\"width:100%;\" class=\"btn btn-primary btn-delete\" type=\"button\" value=\"Delete\">";

        $.each(lista_JSON, function (index, element) {
            element.Action = delete_btn;
        });
        var local_field_id = "#" + field_id;
        var local_div_id = "#" + div_id;
        //var div_table = $("<div id='json_history_div' class='table form-group'>");
        $(local_field_id).find(local_div_id).empty();
        //$("#fieldHistory").append(div_table);
        $(local_div_id).createTable(lista_JSON);
        $(local_div_id).find(".btn-delete").on("click", function (evt) {
            var deleted_item_index = $(this).parents("tr").find(".jsl").text();
            $(this).parents("tr").remove();
            var element_to_Delete = (parseInt(deleted_item_index) - 1);
            lista_JSON.splice(element_to_Delete, 1);
            console.log(lista_JSON);
            $(local_div_id).empty();
            if (lista_JSON.length > 0) {
                create_Table_Delete(lista_JSON, div_id, field_id);
            }
        });
    };

    function send_Ajax_Data(custom_URL, object_JSON, currentCodeCountry, currentDatabaseCode, currentDatabaseCodeType) {
        $.ajax({
            type: "POST",
            url: custom_URL,
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify(object_JSON),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                myHandle(data, currentCodeCountry, currentDatabaseCode, currentDatabaseCodeType);
            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
    };

    function zeroPad(num, places) {
        return String(num).padStart(places, '0')
    };

    function myHandle(data, currentCodeCountry, currentDatabaseCode, currentDatabaseCodeType) {

        if (data.hits.hits.length == 0) {
            $("#codeNumber").val(currentCodeCountry + currentDatabaseCode + currentDatabaseCodeType + "0001");
        } else {
            number = parseInt(data.hits.hits[0]._source.code_number.substr(5, 8)) + 1;
            $("#codeNumber").val(currentCodeCountry + currentDatabaseCode + currentDatabaseCodeType + zeroPad(number, 4));
        }
    };
