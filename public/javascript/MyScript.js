$(document).ready(function() {

    $('.datepicker').datepicker({
        format: 'dd-M-yyyy',
        autoclose: true
    });

    // Hides the required warning after date changed
    $('.datepicker').on("change", function(evt) {
        $(this).next().css('display', 'none');
    });

    /*var myMap = new google.maps.Map(document.getElementById("myMap"), {
        center: {lat: 37.5, lng: -120},
        zoom: 6
    });*/

    var ListaResidency = [];

    var Lat = 0;
    var Lon = 0;

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
                    console.log(data);
                    var result = data.resourceSets[0];
                    if (result) {
                        if (result.estimatedTotal > 0) {
                            response($.map(result.resources, function(item) {

                                Lat = item.point.coordinates[0];
                                Lon = item.point.coordinates[1];

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
                "<input class='new_datepicker form-control start_date' type='text' required='required' data-rule-required='true' data-msg-required='Required field'>" +
                "<span class='error1'>" +
                "<i class='error-log fa fa-exclamation-triangle'></i>" +
                "</div>" +
                "</div>" +
                "<div class='divTableCell NoDivTableBorder'>" +
                "<div class='residency_datepicker form-group'>" +
                "<label>To:</label>" +
                "<input class='new_datepicker form-control end_date' type='text' required='required' data-rule-required='true' data-msg-required='Required field'>" +
                "<span class='error1'>" +
                "<i class='error-log fa fa-exclamation-triangle'></i>" +
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
                    residency.coordinates = Lat + "," + Lon;
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

    $("#fieldsetUltravioletExposure #id_UltravioletExposure").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#fieldsetUltravioletExposure").find(".hidden-control").removeClass("hidden-control").addClass("show-control");
            $(this).parents("#fieldsetUltravioletExposure").find("input[type=text]").prop("required", true);
        }
        if ($(this).val() == "No") {
            $(this).parents("#fieldsetUltravioletExposure").find(".show-control").addClass("hidden-control").removeClass("show-control");
            $(this).parents("#fieldsetUltravioletExposure").find("input[type=text]").prop("required", false).val("");
            $(this).parents("#fieldsetUltravioletExposure").find("input[type=number]").val("");
        }
    });

    $("#fieldsetRecreationalExposure #id_RecreationalExposure").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#fieldsetRecreationalExposure").find(".hidden-control").removeClass("hidden-control").addClass("show-control");
            $(this).parents("#fieldsetRecreationalExposure").find("input[type=text]").prop("required", true);
        }
        if ($(this).val() == "No") {
            $(this).parents("#fieldsetRecreationalExposure").find(".show-control").addClass("hidden-control").removeClass("show-control");
            $(this).parents("#fieldsetRecreationalExposure").find("input:text").prop("required", false).val("");
            $(this).parents("#fieldsetRecreationalExposure").find("input[type=number]").val("");
        }
    });

    $("#fieldsetSevereSunburns #id_Sunburns_less18,#id_Sunburns_Yes_greater18,#id_Sunburns_last5").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTableRow").find("div.hidden-control").prop("required", true);
            console.log($(this).parents(".divTableRow").find("div.hidden-control"));
            $(this).parents(".divTableRow").find("div.hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() == "No" || $(this).val() == "NotKnow") {
            $(this).parents(".divTableRow").find(".show-control input").val("");
            $(this).parents(".divTableRow").find(".show-control .special_on_div_table").prop("required", false);
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#fieldsetSunlamps #id_Sunlamp").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#fieldsetSunlamps").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents("#fieldsetSunlamps").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() == "No" || $(this).val() == "NoChoosed") {
            $(this).parents("#fieldsetSunlamps").find(".show-control input[type=number]").prop("required", false).val("");
            $(this).parents("#fieldsetSunlamps").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#fieldsetSmoking #id_Smoking").on("change", function(evt) {
        if ($(this).val() == "Former" || $(this).val() == "Current") {
            $(this).parents("#fieldsetSmoking").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents("#fieldsetSmoking").find("#id_Smoke_quantity").prop("required", true);
            $(this).parents("#fieldsetSmoking").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() == "Never" || $(this).val() == "NoChoosed") {
            $(this).parents("#fieldsetSmoking").find(".show-control input[type=number]").prop("required", false).val("");
            $(this).parents("#fieldsetSmoking").find("#id_Smoke_quantity").prop("required", false).val("");
            $(this).parents("#fieldsetSmoking").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#fieldsetVitamin #id_Vitamin").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#fieldsetVitamin").find(".hidden-control select").prop("required", true);
            $(this).parents("#fieldsetVitamin").find(".hidden-control").removeClass("hidden-control").addClass("show-control");
        }
        if ($(this).val() == "No" || $(this).val() == "NoChoosed") {
            $(this).parents("#fieldsetVitamin").find(".show-control select").prop("required", false).val("NoChoosed");
            $(this).parents("#fieldsetVitamin").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#fieldsetSectionBEval .selectQuestions").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#fieldsetSectionBEval").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents("#fieldsetSectionBEval").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() == "No" || $(this).val() == "NoChoosed") {
            $(this).parents("#fieldsetSectionBEval").find(".show-control input[type=number]").prop("required", false).val("");
            $(this).parents("#fieldsetSectionBEval").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#fieldsetCongenitalNevi #selectMediumSizedCN,#fieldsetCongenitalNevi #selectLargeSizedCN,#fieldsetCongenitalNevi #selectGiantSizedCN").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTableRow").find(".hidden-control input[type=text]").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() == "No" || $(this).val() == "NoChoosed") {
            $(this).parents(".divTableRow").find(".show-control input[type=text]").prop("required", false).val("");
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#fieldsetBlueNevi #selectBlueNevi").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTableRow").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents(".divTableRow").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() != "Yes") {
            $(this).parents(".divTableRow").find(".show-control input[type=number]").prop("required", false).val("");
            $(this).parents(".divTableRow").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    $("#fieldsetActinicKeratoses #selectActinicKeratoses").on("change", function(evt) {
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

    $("#fieldsetKSC_BCC_SCC #selectBCC,#fieldsetKSC_BCC_SCC #selectSCC,#fieldsetKSC_BCC_SCC #selectSCCSite").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents(".divTable").find(".hidden-control input").prop("required", true);
            $(this).parents(".divTable").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() == "No" || $(this).val() == "NoChoosed") {
            $(this).parents(".divTable").find(".show-control input").prop("required", false).val("");
            $(this).parents(".divTable").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    });

    /*$('input.mutually_check').click(function() {
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
    */

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

    List_Family_History_3Degree = [];

    $("#FamilyHistoryUpTo3Degree #relative").on("change", function(evt) {
        $("#FamilyHistoryUpTo3Degree .divTableRow input").attr("style", "width:100%;");
        if ($(this).val() != "NoChoosed" || $(this).val() != "No" || $(this).val() != "Not know") {
            $("#FamilyHistoryUpTo3Degree").find(".hidden-modal-control").removeClass("hidden").addClass("show");
            if ($(this).val() == "Other") {
                $("#FamilyHistoryUpTo3Degree .specify").parents(".divTableRow").removeClass("hidden").addClass("show");
                $("#FamilyHistoryUpTo3Degree .divTableRow").css("text-align", "left");
            }
        }
        if ($(this).val() == "NoChoosed" || $(this).val() == "No" || $(this).val() == "Not know") {
            $("#FamilyHistoryUpTo3Degree").find(".show").removeClass("show").addClass("hidden");
            $("#FamilyHistoryUpTo3Degree .specify").val("");
            $("#FamilyHistoryUpTo3Degree #selectMelanomaType,#FamilyHistoryUpTo3Degree #selectRelativeSide,#FamilyHistoryUpTo3Degree #selectRelativeDegree").val("NoChoosed");
            $("#FamilyHistoryUpTo3Degree .hidden-modal-control input[type=number]").val("");
            $("#FamilyHistoryUpTo3Degree .divTableRow").css("text-align", "center");
        }
    });

    $("#FamilyHistoryUpTo3Degree .save").on("click", function(evt) {
        var Relative = {};
        var presence = $("#FamilyHistoryUpTo3Degree #relative").val();
        Relative.presence = presence;
        Relative.melanoma = $("#FamilyHistoryUpTo3Degree #selectMelanomaType").val();
        Relative.side = $("#FamilyHistoryUpTo3Degree #selectRelativeSide").val();
        Relative.degree = $("#FamilyHistoryUpTo3Degree #selectRelativeDegree").val();
        Relative.diagnosis_age = $("#FamilyHistoryUpTo3Degree .diagnosis-age").val();
        if (presence == "Other") {
            Relative.presence = $("#FamilyHistoryUpTo3Degree .specify").val();
        }
        List_Family_History_3Degree.push(Relative);
        $(".json-relative-table").createTable(List_Family_History_3Degree);
        Reset_Values("#FamilyHistoryUpTo3Degree");
    });

    $("#FamilyHistoryUpTo3Degree .cancel,.close").on("click", function(evt) {
        Reset_Values("#FamilyHistoryUpTo3Degree");
    });

    $("#FamilyHistoryOtherUpTo3Degree .add-Other-Relative").on("click", function(evt) {

    });

    List_Family_History_Other_3Degree = [];

    $("#FamilyHistoryOtherUpTo3Degree .save").on("click", function(evt) {
        var Relative = {};
        Relative.cancer_type = $("#FamilyHistoryOtherUpTo3Degree #selectOtherCancerType").val();
        Relative.side = $("#FamilyHistoryOtherUpTo3Degree #selectOtherRelativeSide").val();
        Relative.degree = $("#FamilyHistoryOtherUpTo3Degree #selectOtherRelativeDegree").val();
        Relative.pedigree = $("#FamilyHistoryOtherUpTo3Degree #pedigree").val();

        List_Family_History_Other_3Degree.push(Relative);
        console.log(List_Family_History_Other_3Degree);
        $(".json-other-relative-tables").createTable(List_Family_History_Other_3Degree);
        Reset_Values("#FamilyHistoryOtherUpTo3Degree");
    });

    $("#FamilyHistoryOtherUpTo3Degree .cancel,.close").on("click", function(evt) {
        Reset_Values("#FamilyHistoryOtherUpTo3Degree");
    });

    $("#fieldsetSectionCEval .selectQuestions").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $(this).parents("#fieldsetSectionCEval").find(".hidden-control input[type=number]").prop("required", true);
            $(this).parents("#fieldsetSectionCEval").find(".hidden-control").addClass("show-control").removeClass("hidden-control");
        }
        if ($(this).val() == "No") {
            $(this).parents("#fieldsetSectionCEval").find(".show-control input[type=number]").prop("required", false).val("");
            $(this).parents("#fieldsetSectionCEval").find(".show-control").addClass("hidden-control").removeClass("show-control");
        }
    }); /*Da ricontrollare su select after yes*/

    /****** Checkboxes for enabling melanoma characteristics inputs ******/
    $('#firstMelanomaCheckbox').click(function() {
        if ($('#firstMelanomaCheckbox').is(':checked')) {
            $('#firstMelanomaCharacteristics').css('pointer-events', 'all').css('opacity', '1');
            $('#firstMelanomaCharacteristics :input').attr('disabled', false);
        } else {
            $('#firstMelanomaCharacteristics').css('pointer-events', 'none').css('opacity', '0.2');
            $('#firstMelanomaCharacteristics :input').attr('disabled', true);
        }
    });

    $('#secondMelanomaCheckbox').click(function() {
        if ($('#secondMelanomaCheckbox').is(':checked')) {
            $('#secondMelanomaCharacteristics').css('pointer-events', 'all').css('opacity', '1');
            $('#secondMelanomaCharacteristics :input').attr('disabled', false);
        } else {
            $('#secondMelanomaCharacteristics').css('pointer-events', 'none').css('opacity', '0.2');
            $('#secondMelanomaCharacteristics :input').attr('disabled', true);
        }
    });

    $('#thirdMelanomaCheckbox').click(function() {
        if ($('#thirdMelanomaCheckbox').is(':checked')) {
            $('#thirdMelanomaCharacteristics').css('pointer-events', 'all').css('opacity', '1');
            $('#thirdMelanomaCharacteristics :input').attr('disabled', false);
        } else {
            $('#thirdMelanomaCharacteristics').css('pointer-events', 'none').css('opacity', '0.2');
            $('#thirdMelanomaCharacteristics :input').attr('disabled', true);
        }
    });
    /****** Checkboxes for enabling melanoma characteristics inputs ******/


    /****** Melanoma charcteristics selects changes ******/
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

    $("#firstTumorKnown").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $('#firstKnownSite').removeClass("hidden");
            $('#firstBreslowFieldset').removeClass("hidden");
            $('#firstHistopatologicFieldset').removeClass("hidden");
            $('#firstAJCCfieldset').removeClass("hidden");
        } else {
            $('#firstKnownSite').addClass("hidden");
            $('#firstBreslowFieldset').addClass("hidden");
            $('#firstHistopatologicFieldset').addClass("hidden");
            $('#firstAJCCfieldset').addClass("hidden");
        }
    });

    $("#secondTumorKnown").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $('#secondKnownSite').removeClass("hidden");
            $('#secondBreslowFieldset').removeClass("hidden");
            $('#secondHistopatologicFieldset').removeClass("hidden");
            $('#secondAJCCfieldset').removeClass("hidden");
        } else {
            $('#secondKnownSite').addClass("hidden");
            $('#secondBreslowFieldset').addClass("hidden");
            $('#secondHistopatologicFieldset').addClass("hidden");
            $('#secondAJCCfieldset').addClass("hidden");
        }
    });

    $("#thirdTumorKnown").on("change", function(evt) {
        if ($(this).val() == "Yes") {
            $('#thirdKnownSite').removeClass("hidden");
            $('#thirdBreslowFieldset').removeClass("hidden");
            $('#thirdHistopatologicFieldset').removeClass("hidden");
            $('#thirdAJCCfieldset').removeClass("hidden");
        } else {
            $('#thirdKnownSite').addClass("hidden");
            $('#thirdBreslowFieldset').addClass("hidden");
            $('#thirdHistopatologicFieldset').addClass("hidden");
            $('#thirdAJCCfieldset').addClass("hidden");
        }
    });
    /****** Melanoma charcteristics selects changes ******/

    $("#submit").on('click', function(e) {
        e.preventDefault();
        var serJson = $("#msform").serializeJSON();
        console.log(ListaResidency);
        serJson.demographic.residency_list = ListaResidency;

        history_list.forEach(occupation => {
            delete occupation.Action;
        });
        serJson.demographic.SIC_list = history_list;

        ListaICD10.forEach(diagnoses => {
            delete diagnoses.Action;
        });
        serJson.medical_history.diagnoses = ListaICD10;

        serJson.medical_history.medication_list = List_Medications;

        serJson.medical_history.BCC.sites = List_BCC_Sites;

        serJson.medical_history.SSC.sites = List_SCC_Invasive_Sites;

        serJson.medical_history.SSC_in_situ.sites = List_SCC_InSitu_Sites;

        serJson.medical_history.neoplasias = List_Additional_Neoplasias;

        serJson.family_history.relatives_with_melanoma = List_Family_History_3Degree;

        serJson.family_history.relatives_with_other_cancers = List_Family_History_Other_3Degree;

        console.log(serJson);

        $.ajax({
            url: '/stepform', // url where to submit the request
            type: "POST", // type of action POST || GET
            data: serJson, // post data || get data
            success: function(result) {
                // you can see the result from the console
                // tab of the developer tools
                console.log("success");
                document.write(result);
            },
            error: function(xhr, resp, text) {
                console.log("error");
                console.log(xhr, resp, text);
            }
        })


    });

    /****** Initially disables all melanoma characteristics inputs ******/
    $('#firstMelanomaCharacteristics :input').attr('disabled', true);

    $('#secondMelanomaCharacteristics :input').attr('disabled', true);

    $('#thirdMelanomaCharacteristics :input').attr('disabled', true);
    /****** Initially disables all melanoma characteristics inputs ******/




    Initialize();
});
/*Fine Doucment Ready*/

function Initialize() {
    DDL_Other('ethnicity_input', 'inputEthnicity');
    DDL_Other('Melanoma', 'inputMelanoma');
    DDL_from_JSON('History', 'siccodes.json');
    DDL_American_Cancer("#NonCutaneous_Select", []);
    DDL_American_Cancer("#selectOtherCancerType", ["Neuroblastoma ", "Melanoma Skin Cancer"]);
    Modal_Draggable();

    /****** Trigger change on all input of type select ******/

    $("[name='general[melanoma_type]']").trigger('change');

    /****** Trigger change on all input of type select ******/
};

function Reset_Values(tag_fieldset) {
    $(tag_fieldset + " " + "input").val("");
    $(tag_fieldset + " " + "select").val("NoChoosed");
    $(tag_fieldset + " " + "textarea").val("");
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

function DDL_American_Cancer(tag_select_id, filter) {
    $.getJSON('american_cancer_json.json', function(result) {
        // $.each(result, function (index, value) {
        //     // $(tag_select_id).append("<option value='" + value.Type + "'>" + value.Type + "</option>");
        //     var Finded = false;
        //     $.each(filter,function(Filter_index,Filter_value) {
        //
        //     });
        // });
        var FindIndex = [];
        $.each(filter, function(F_index, F_value) {
            $.each(result, function(index, value) {
                if (value.Type.trim() == F_value.trim()) {
                    FindIndex.push(index);
                }
            });
        });
        var Filtered_Result = [];
        $.each(FindIndex, function(index, value) {
            result.splice(value, 1);
        });
        $.each(result, function(index, value) {
            $(tag_select_id).append("<option value='" + value.Type + "'>" + value.Type + "</option>");
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

var history_list = [];

function DDL_from_JSON(tag_ID_DDL, url) {
    var dropdown = $("#" + tag_ID_DDL).html("<option value='NoChoosed'>Select Sic Group ...</option>");


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