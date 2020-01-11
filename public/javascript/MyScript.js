$(document).ready(function() {

    $('.datepicker').datepicker({
        format: 'dd-M-yyyy',
        autoclose: true
    });

    /*var myMap = new google.maps.Map(document.getElementById("myMap"), {
        center: {lat: 37.5, lng: -120},
        zoom: 6
    });*/

    var ListaResidency = [];

    $("#searchBox").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: "http://dev.virtualearth.net/REST/v1/Locations",
                dataType: "jsonp",
                data: {
                    key: "AiS8UkCUaZ33Y2biW1TO8QRGofSb2uRi4Ycz7KOM7mJrkz25Rc3amVFlmdQTajAK",
                    q: request.term
                },
                jsonp: "jsonp",
                success: function(data) {
                    console.log(data)
                    var result = data.resourceSets[0];
                    if (result) {
                        if (result.estimatedTotal > 0) {
                            response($.map(result.resources, function(item) {
                                return {
                                    data: item,
                                    label: item.name + ' (' + item.address.countryRegion + ')',
                                    value: item.name
                                }
                            }));
                        }
                    }
                }
            });
        },
        minLength: 1,
        change: function(event, ui) {
            if (!ui.item)
                $("#searchBox").val('');

        },
        select: function(event, ui) {
            $(".residency_date_class").append("<span>Test</span>");
            $(".residency_date_class").html(
                "<div class='divTable'>" +
                "<div class='divTableBody'>" +
                "<div class='divTableRow'>" +
                "<div class='divTableCell NoDivTableBorder'>" +
                "<div class='residency_datepicker form-group'>" +
                "<label>From:</label>" +
                "<input class='new_datepicker form-control start_date' type='text' required>" +
                "</div>" +
                "</div>" +
                "<div class='divTableCell NoDivTableBorder'>" +
                "<div class='residency_datepicker form-group'>" +
                "<label>To:</label>" +
                "<input class='new_datepicker form-control end_date' type='text' required>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>");
            $(".new_datepicker").datepicker({
                format: 'dd-M-yyyy',
                autoclose: true
            }).on("changeDate", function(evt) {
                start_date = $(".start_date").val();
                end_date = $(".end_date").val();
                if (start_date != '' && end_date != '') {
                    residency = {};
                    residency.start_date = start_date;
                    residency.end_date = end_date;
                    residency.address = $("#searchBox").val();
                    ListaResidency.push(residency);
                    $(".json_residency").createTable(ListaResidency);
                }
            });
        }
    });

    $("#searchBox").on("focus", function(evt) {
        $("#fieldResidency").append($("#ui-id-1"));
        $("#ui-id-1").css("position", "relative").css("top", "auto").css("left", "auto");
    })

    $("#fieldsetCodeNumber #DatabaseCodeCountry").on("change", function(evt) {
        if ($(this).val() != "") {
            $("#DatabaseCodeCenter").prop("disabled", false);
            nation_val = $(this).val();
            $.getJSON('Centers.json', function(result) {
                $.each(result, function(index, value) {
                    if (value.codeNation == nation_val) {
                        $("#DatabaseCodeCenter").append("<option value='" + value.codeCenter + "'>" + value.Country + "</option>");
                    }
                });
            });
            $("DatabaseCodeCenter").val("");
        }
        if ($(this).val() == "") {
            $("#DatabaseCodeCenter").prop("disabled", true);
            $("#DatabaseCodeCenter").val("");
        }
    });

    $("#DatabaseCodeCountry,#DatabaseCodeCenter,#DatabaseCodeType").on("change", function(evt) {
        currentCodeCountry = $("#DatabaseCodeCountry").val();
        currentDatabaseCode = $("#DatabaseCodeCenter").val();
        currentDatabaseCodeType = $("#DatabaseCodeType").val();

        if (currentCodeCountry != "" && currentDatabaseCode != "" && currentDatabaseCodeType != "") {
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
            $(this).parents("#fieldsetUltravioletExposure").find(".hidden-control").removeClass("hidden-control").addClass("show-control");
            $(this).parents("#fieldsetUltravioletExposure").find("input[type=text]").prop("required", true);
        }
        if ($(this).val() == "No") {
            $(this).parents("#fieldsetUltravioletExposure").find(".show-control").addClass("hidden-control").removeClass("show-control");
            $(this).parents("#fieldsetUltravioletExposure").find("input:text").prop("required", false);
        }
    });

    $("#id_RecreationalExposure").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#fieldsetRecreationalExposure").find(".hidden-control").removeClass("hidden-control").addClass("show-control");
            $(this).parents("#fieldsetRecreationalExposure").find("input[type=text]").prop("required", true);
        }
        if ($(this).val() == "No") {
            $(this).parents("#fieldsetRecreationalExposure").find(".show-control").addClass("hidden-control").removeClass("show-control");
            $(this).parents("#fieldsetRecreationalExposure").find("input:text").prop("required", false);
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
            $(this).parents("#fieldsetSunlamps").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents("#fieldsetSunlamps").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents("#fieldsetSunlamps").find(".show-control input[type=number]").prop("required", false);
            $(this).parents("#fieldsetSunlamps").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#id_Smoking").on("change", function(evt) {
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

    $("#id_Vitamin").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#fieldsetVitamin").find(".hidden-control").removeClass("hidden-control").addClass("show-control");
        }
        if ($(this).val() == "No") {
            $(this).parents("#fieldsetRecreationalExposure").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#selectQuestions").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#fieldsetSectionBEval").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents("#fieldsetSectionBEval").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() == "No") {
            $(this).parents("#fieldsetSectionBEval").find(".show-control input[type=number]").prop("required", false);
            $(this).parents("#fieldsetSectionBEval").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

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

    $("#selectBCC,#selectSCC,#selectSCCSite").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTable").find(".hidden-control input").prop("required", true);
            $(this).parents(".divTable").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents(".divTable").find(".show-control input").prop("required", false);
            $(this).parents(".divTable").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

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

    var ListaICD10 = [];
    var ICD10_options_by_code = {
        url: "icd10_codes.json",
        getValue: function(element) {
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
            onClickEvent: function(element) {
                var code = $("#ICD10Code").val();
                var description = $(".selected .eac-item span").text();
                $("#ICD10Code").val($("#ICD10Code").val() + " " + description);
                ListaICD10.push({ "code": code, "desc": description });
                // create_Table_Delete(ListaICD10,"json_medical_history","fieldsetHistoryMedicalDiagnosis");
                $("#json_medical_history").createTable(ListaICD10);
            },
            onChooseEvent: function(element) {

            }
        },
        theme: "square"
    };

    $("#ICD10Code").easyAutocomplete(ICD10_options_by_code);
    $("#ICD10Code").on("focus", function(element) {
        $(this).val("");
    });

    var List_Medications = [];

    $("#Insert-Med").on("click", function(evt) {
        $("#MedicationDateModal .span-modal-title").text("Medications");
        // $("#DateModal .modal-body th:first").remove();
        // $("#DateModal .modal-body .medication-number").remove();
        $("#Medication-Number").val(List_Medications.length + 1);
    });

    $("#save_med").on("click", function(evt) {
        var medication_start_date = $(".med-start-date").val();
        var medication_end_date = $(".med-end-date").val();
        if (medication_start_date != "" && medication_end_date != "") {
            Medication = {};
            Medication.start_date = medication_start_date;
            Medication.end_date = medication_end_date;
            List_Medications.push(Medication);
            $(".med-start-date,.med-end-date").val("");
            $("#json-medications").createTable(List_Medications);
        } else {
            evt.preventDefault();
            alert("<div><p><span style='color:red;'>Please Insert date-start and/or date-end fields</span></p></div>");
        }
    });

    $("#fieldsetPregnancy_History #Pregnant_Yes,#Pregnant_No").on("click", function(evt) {
        if ($(this).attr("id") == "Pregnant_Yes") {
            $("#fieldsetPregnancy_History .Pregnancy_Stats").removeClass("hide-transition").addClass("show-transition");
        }
        if ($(this).attr("id") == "Pregnant_No") {
            $("#fieldsetPregnancy_History .Pregnancy_Stats").addClass("hide-transition").removeClass("show-transition");
        }
    });

    $("#fieldsetPregnancy_History #Pregnancy_Before input").on("click", function(evt) {
        if ($(this).attr("id") == "Before_Yes") {
            $("#Pregnancy_Before").find(".hide-transition").removeClass("hide-transition").addClass("show-transition");
        }
        if ($(this).attr("id") == "Before_No") {
            $("#Pregnancy_Before").find(".show-transition").addClass("hide-transition").removeClass("show-transition");
        }
    });

    $("#fieldsetPregnancy_History #Pregnancy_After input").on("click", function(evt) {
        if ($(this).attr("id") == "After_Yes") {
            $("#Pregnancy_After").find(".hide-transition").removeClass("hide-transition").addClass("show-transition");
        }
        if ($(this).attr("id") == "After_No") {
            $("#Pregnancy_After").find(".show-transition").addClass("hide-transition").removeClass("show-transition");
        }
    });
    /*Fine Commit*/
    List_BCC_Sites = [];
    List_SCC_Invasive_Sites = [];
    List_SCC_InSitu_Sites = [];
    List_To_Delete = []

    $("#Insert-BCC_Sites,#Insert-SCC_Invasive_Sites,#Insert-SCC_InSitu_Sites").on("click", function(evt) {
        switch ($(this).attr("id")) {
            case "Insert-BCC_Sites":
                $("#Sites_Modal span.modal-title").text("BCC Site(s)");
                $("#Sites_Modal input").prop("checked", false);
                $("#Sites_Modal .modal-caller").text("BCC");
                $("#Sites_Modal .th-image img").attr("src", "icons/human-body-cyan.png");
                if (List_BCC_Sites.length != 0) {
                    $.each(List_BCC_Sites, function(key, value) {
                        var to_check = $.grep($("#Sites_Modal .tg input").parent(), function(G_key, G_value) {
                            return ($(G_key).text().trim() == value.Site);
                        });
                        $(to_check).find("input").prop("checked", true);
                    });
                }
                break;
            case "Insert-SCC_Invasive_Sites":
                $("#Sites_Modal span.modal-title").text("SCC Invasive Site(s)");
                $("#Sites_Modal input").prop("checked", false);
                $("#Sites_Modal .modal-caller").text("SCC_Invasive");
                $("#Sites_Modal .th-image img").attr("src", "icons/human-body-purple.png");
                if (List_SCC_Invasive_Sites.lenght != 0) {
                    $.each(List_SCC_Invasive_Sites, function(key, value) {
                        var to_check = $.grep($("#Sites_Modal .tg input").parent(), function(G_key, G_value) {
                            return ($(G_key).text().trim() == value.Site);
                        });
                        $(to_check).find("input").prop("checked", true);
                    });
                }
                break;
            case "Insert-SCC_InSitu_Sites":
                $("#Sites_Modal span.modal-title").text("SCC in situ Site(s)");
                $("#Sites_Modal input").prop("checked", false);
                $("#Sites_Modal .modal-caller").text("SCC_InSitu");
                $("#Sites_Modal .th-image img").attr("src", "icons/human-body-grey.png");
                if (List_SCC_InSitu_Sites.length != 0) {
                    $.each(List_SCC_InSitu_Sites, function(key, value) {
                        var to_check = $.grep($("#Sites_Modal .tg input").parent(), function(G_key, G_value) {
                            return ($(G_key).text().trim() == value.Site);
                        });
                        $(to_check).find("input").prop("checked", true);
                    });
                }
                break;
        }
    });

    $("#Sites_Modal .tg input").on("click", function(evt) {
        var Caller = $("#Sites_Modal .modal-caller").text();
        var Checked = $(this);
        var temp_Array = [];
        $("#Sites_Modal .modal-checked").text($(this).parent().text());

        if (Caller == "BCC") {
            temp_Array = List_BCC_Sites;
        }
        if (Caller == "SCC_Invasive") {
            temp_Array = List_SCC_Invasive_Sites;
        }
        if (Caller == "SCC_InSitu") {
            temp_Array = List_SCC_InSitu_Sites;
        }

        if ($(this).prop("checked") == true) {
            $("#SimpleDateModal .diagnosis-date").val("");
            $("#SimpleDateModal").addClass("hyper-modal").modal("show");
            $("#SimpleDateModal .span-modal-title").text("Insert diagnosis date for ");
            $("#SimpleDateModal .span-modal-title-for").text($(Checked).parent().text());

            if (Caller == "SCC_InSitu") {
                $("#SimpleDateModal .hidden").removeClass("hidden").addClass("show");
                $("#SimpleDateModal .number-control").val(1);
            } else {
                $("#SimpleDateModal .show").removeClass("show").addClass("hidden");
            }

            var Site = {};
            Site.Type = Caller;
            Site.Site = $(Checked).parent().text();
            temp_Array.push(Site);
        }
        if ($(this).prop("checked") == false) {
            var label_remove = $(this).parents(".TEST2").find(".table-personal-label").text();
            var filteredObj = 90;
            $.each(temp_Array, function(index, item) {
                if (item.Site === label_remove.trim()) {
                    filteredObj = index;
                }
            });
            console.log("FILTERED OBJ", filteredObj);
            temp_Array.splice(filteredObj, 1);
        }
    });

    $("#Sites_Modal #save_sites").on("click", function(evt) {
        var Caller = $("#Sites_Modal .modal-caller").text();
        var temp_Array = [];
        var classTableToReload = "";
        switch (Caller) {
            case "BCC":
                temp_Array = List_BCC_Sites;
                classTableToReload = ".BCC_Sites_Json_Table";
                break;
            case "SCC_Invasive":
                temp_Array = List_SCC_Invasive_Sites;
                classTableToReload = ".SCC_Invasive_Sites_Json_Table";
                break;
            case "SCC_InSitu":
                temp_Array = List_SCC_InSitu_Sites;
                classTableToReload = ".SCC_InSitu_Sites_Json_Table";
                break;
        }
        if (temp_Array.length != 0) {
            $(classTableToReload).createTable(temp_Array);
        } else {
            $(classTableToReload).empty();
        }
    });

    $("#Sites_Modal #cancel_sites,#Sites_Modal .close").on("click", function(evt) {
        console.log("BBC list", List_BCC_Sites);
        //$("#HistoryBCC_Modal input").prop("checked",false);
        // $("#Sites_Modal .tg input").off("click");
    });

    $("#SimpleDateModal #save_simple").on("click", function(evt) {
        evt.preventDefault();

        console.log("Evento:", evt.target);
        console.log($._data($(this).get(0), "events"));

        var Caller = $("#Sites_Modal .modal-caller").text();
        var Checked = $("#Sites_Modal .modal-checked").text().trim();

        if (Caller == "BCC") {
            var Site = find_checked_object(List_BCC_Sites, Checked);
            Site.Diagnosis_date = $("#SimpleDateModal .diagnosis-date").val();
        }
        if (Caller == "SCC_Invasive") {
            var Site = find_checked_object(List_SCC_Invasive_Sites, Checked);
            Site.Diagnosis_date = $("#SimpleDateModal .diagnosis-date").val();
        }
        if (Caller == "SCC_InSitu") {
            var Site = find_checked_object(List_SCC_InSitu_Sites, Checked);
            Site.Diagnosis_date = $("#SimpleDateModal .diagnosis-date").val();
            Site.Number = $("#SimpleDateModal .number-control").val();
        }
    });

    $("#SimpleDateModal .close,.btn-danger").on("click", function(evt) {
        evt.preventDefault();
        var Checked = $("#Sites_Modal .modal-checked").text().trim();
        var TO_Uncheck = $.grep($("#Sites_Modal .tg input"), function(G_key, G_value) {
            if ($(G_key).parent().text() == Checked) {
                console.log($(G_key).parent().text());
                return G_key;
            }
        });
        $("#SimpleDateModal").toggle().removeClass("hyper-modal");
        // $(TO_Uncheck).prop("checked",false);
        $(TO_Uncheck).click();
    });

    $("#Additional_Neoplasia .year-datepicker").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years"
    });

    List_Additional_Neoplasias = [];

    $("#Additional_Neoplasia .save").on("click", function(evt) {
        var SelectAddNeoplasia = $("#Additional_Neoplasia #NonCutaneous_Select").val();
        var NonCutaneousAge = $("#Additional_Neoplasia .NonCutaneous-diagnosis-age").val();
        var YearNonCutaneous = $("#Additional_Neoplasia .year-datepicker").val();
        var AdditionalNeoplasia = {};
        if (SelectAddNeoplasia != "No Choosed" && NonCutaneousAge != "" && YearNonCutaneous != "") {
            AdditionalNeoplasia.Name = SelectAddNeoplasia;
            AdditionalNeoplasia.Age_of_diagnosis = NonCutaneousAge;
            AdditionalNeoplasia.Year_of_diagnosis = YearNonCutaneous;
            List_Additional_Neoplasias.push(AdditionalNeoplasia);
            $(".json-non-cutaneous-additional-neoplasia").createTable(List_Additional_Neoplasias);
            $("#Additional_Neoplasia #NonCutaneous_Select").val("No Choosed");
            $("#Additional_Neoplasia .NonCutaneous-diagnosis-age").val(1);
            $("#Additional_Neoplasia .year-datepicker").val("");
        } else {
            alert("<span class='' style='color:red;'>Please insert all fields</span>");
        }
    });

    $("#Additional_Neoplasia .cancel .close").on("click", function(evt) {
        $("#Additional_Neoplasia #NonCutaneous_Select").val("No Choosed");
        $("#Additional_Neoplasia .NonCutaneous-diagnosis-age").val(1);
        $("#Additional_Neoplasia .year-datepicker").val("");
    });

    $('#secondMelanomaCheckbox').click(function() {
        if ($('#secondMelanomaCheckbox').is(':checked')) {
            $('#secondMelanomaCharacteristics').css('pointer-events', 'all').css('opacity', '1');
            $('#secondMelanomaCharacteristics :input').attr('disabled', false);
            $('#secondMelanomaCharacteristics :select').attr('disabled', false);
        } else {
            $('#secondMelanomaCharacteristics').css('pointer-events', 'none').css('opacity', '0.2');
            $('#secondMelanomaCharacteristics :input').attr('disabled', true);
            $('#secondMelanomaCharacteristics :select').attr('disabled', true);
        }
    });

    $('#thirdMelanomaCheckbox').click(function() {
        if ($('#thirdMelanomaCheckbox').is(':checked')) {
            $('#thirdMelanomaCharacteristics').css('pointer-events', 'all').css('opacity', '1');
            $('#thirdMelanomaCharacteristics :input').attr('disabled', false);
            $('#thirdMelanomaCharacteristics :select').attr('disabled', false);
        } else {
            $('#thirdMelanomaCharacteristics').css('pointer-events', 'none').css('opacity', '0.2');
            $('#thirdMelanomaCharacteristics :input').attr('disabled', true);
            $('#thirdMelanomaCharacteristics :select').attr('disabled', true);
        }
    });

    $("#firstSelectLesion").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTableRow").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents(".divTableRow").find(".show-control input[type=number]").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $('.datepicker').on("change", function(evt) {
        $(this).next().css('display', 'none');
    });

    $("#secondSelectLesion").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTableRow").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents(".divTableRow").find(".show-control input[type=number]").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#thirdSelectLesion").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTableRow").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents(".divTableRow").find(".show-control input[type=number]").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#firstMelanomaDetection").on("change", function(evt) {
        if ($(this).val() == "Other") {
            $(this).parents(".divTableRow").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Other") {
            $(this).parents(".divTableRow").find(".show-control input[type=number]").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#secondMelanomaDetection").on("change", function(evt) {
        if ($(this).val() == "Other") {
            $(this).parents(".divTableRow").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Other") {
            $(this).parents(".divTableRow").find(".show-control input[type=number]").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#thirdMelanomaDetection").on("change", function(evt) {
        if ($(this).val() == "Other") {
            $(this).parents(".divTableRow").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Other") {
            $(this).parents(".divTableRow").find(".show-control input[type=number]").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#firstSelectSNL").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTableRow").find(".hidden-control select").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents(".divTableRow").find(".show-control select").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#secondSelectSNL").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTableRow").find(".hidden-control select").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents(".divTableRow").find(".show-control select").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#thirdSelectSNL").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTableRow").find(".hidden-control select").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents(".divTableRow").find(".show-control select").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#firstMelanomaRegression").on("change", function(evt) {
        if ($(this).val() == "present") {
            $(this).parents(".divTableRow").find(".hidden-control select").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "present") {
            $(this).parents(".divTableRow").find(".show-control select").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#secondMelanomaRegression").on("change", function(evt) {
        if ($(this).val() == "present") {
            $(this).parents(".divTableRow").find(".hidden-control select").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "present") {
            $(this).parents(".divTableRow").find(".show-control select").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#thirdMelanomaRegression").on("change", function(evt) {
        if ($(this).val() == "present") {
            $(this).parents(".divTableRow").find(".hidden-control select").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "present") {
            $(this).parents(".divTableRow").find(".show-control select").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#firstMelanomaNevus").on("change", function(evt) {
        if ($(this).val() == "present") {
            $(this).parents(".divTableRow").find(".hidden-control select").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "present") {
            $(this).parents(".divTableRow").find(".show-control select").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#secondMelanomaNevus").on("change", function(evt) {
        if ($(this).val() == "present") {
            $(this).parents(".divTableRow").find(".hidden-control select").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "present") {
            $(this).parents(".divTableRow").find(".show-control select").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#thirdMelanomaNevus").on("change", function(evt) {
        if ($(this).val() == "present") {
            $(this).parents(".divTableRow").find(".hidden-control select").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "present") {
            $(this).parents(".divTableRow").find(".show-control select").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#submit").on('click', function(e) {
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
            success: function(result) {
                // you can see the result from the console
                // tab of the developer tools
                console.log(result);
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })


    });

    $('#firstMelanomaCharacteristics :input').attr('disabled', true);
    $('#firstMelanomaCharacteristics :select').attr('disabled', true);

    $('#secondMelanomaCharacteristics :input').attr('disabled', true);
    $('#secondMelanomaCharacteristics :select').attr('disabled', true);

    $('#thirdMelanomaCharacteristics :input').attr('disabled', true);
    $('#thirdMelanomaCharacteristics :select').attr('disabled', true);

    Initialize();
});
/*Fine Doucment Ready*/

function Initialize() {
    DDL_Other('ethnicity_input', 'inputEthnicity');
    DDL_Other('Melanoma', 'inputMelanoma');
    DDL_from_JSON('History', 'siccodes.json');
    DDL_American_Cancer();
    Modal_Draggable();
};

function find_checked_object(temp_Array, obj) {
    console.log("TEMP ARRAY in find checked = ", temp_Array, "\nOBJ = ", obj);
    var finded = temp_Array.find(function(item, i) {
        if (item.Site === obj.trim()) {
            return item;
        }
    });
    return finded;
};

function DDL_American_Cancer() {
    $.getJSON('american_cancer_json.json', function(result) {
        $.each(result, function(index, value) {
            $("#NonCutaneous_Select").append("<option value='" + value.Type + "'>" + value.Type + "</option>");
        });
    });
};

function Modal_Draggable() {
    $(".modal-dialog").draggable();
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

    $.getJSON('SicRanges.json', function(data) {
        $.each(data, function(key, entry) {
            dropdown.append($('<option></option>').attr('value', entry.SIC_Range_Start + '*' + entry.SIC_Range_End).text(entry.Group_Title));
        });
    });
    $("#" + tag_ID_DDL).on("change", function(data) {
        $("#dropSIC,#history_date_start,#history_date_end").remove();
        var valore = $("#" + tag_ID_DDL).val();
        if (valore != "NoChoosed") {
            var dropdown2 = $("<select id='dropSIC' class='form-control'>").html("<option value='NoChoosed'>Select Sic Code ...</option>");
            dropdown2.on("change", function() {
                $("#history_date_start,#history_date_end").remove();
                $(this).parents("fieldset").find(".div_date").empty();
                if ($(dropdown2).val() != "NoChoosed") {
                    var date_input_start = $("<input type=text id='history_date_start' class='form-control datepicker auto-width'>");
                    $(date_input_start).datepicker({
                        format: 'dd-M-yyyy',
                        autoclose: true
                    }).on("changeDate", function(evt) {
                        var date_input_end = $("<input type=text id='history_date_end' class='form-control datepicker auto-width'>");
                        $(date_input_end).datepicker({
                            format: 'dd-M-yyyy',
                            autoclose: true
                        }).on("changeDate", function(evt) {
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

function DDL_Other(tag_ID, tag_Class) {
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
};

function create_Table_Delete(lista_JSON, div_id, field_id) {
    var delete_btn = "<input style=\"width:100%;\" class=\"btn btn-primary btn-delete\" type=\"button\" value=\"Delete\">";

    $.each(lista_JSON, function(index, element) {
        element.Action = delete_btn;
    });
    var local_field_id = "#" + field_id;
    var local_div_id = "#" + div_id;
    //var div_table = $("<div id='json_history_div' class='table form-group'>");
    $(local_field_id).find(local_div_id).empty();
    //$("#fieldHistory").append(div_table);
    $(local_div_id).createTable(lista_JSON);
    $(local_div_id).find(".btn-delete").on("click", function(evt) {
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
        success: function(data) {
            myHandle(data, currentCodeCountry, currentDatabaseCode, currentDatabaseCodeType);
        },
        failure: function(errMsg) {
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