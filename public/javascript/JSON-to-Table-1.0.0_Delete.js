(function ($) {

    $.fn.createTable = function (data, options) {

        var element = this;
        var settings = $.extend({}, $.fn.createTable.defaults, options);
        var selector;

        if (element[0].className !== undefined) {
            var split = element[0].className.split(' ');
            selector = '.' + split.join('.') + ' ';
        } else if (element[0].id !== undefined) {
            selector = '#' + element[0].id + ' ';
        }

        var table = '<table class="json-to-table">';

        table += '<thead><th class="jsl"></th>';
        table += $.fn.createTable.parseTableData(data, true,element);
        table += '</thead>';
        table += '<tbody>';
        table += $.fn.createTable.parseTableData(data, false,element);
        table += '</tbody>';
        table += '</table>';

        element.html(table);

        return function () {

            $(selector + '.json-to-table').css({
                borderCollapse: 'collapse',
                width: '100%',
                border: settings.borderWidth + ' ' + settings.borderStyle + ' ' + settings.borderColor,
                fontFamily: settings.fontFamily
            });

            $(selector + '.jsl').css({
                minWidth: '18px',
                width: '18px',
                padding: '0 10px 0 10px',
                verticalAlign: 'middle'
            });

            $(selector + '.json-to-table thead th:not(:first-child), .json-to-table tbody td:not(:first-child)').css({
                width: (100 / $.fn.createTable.getHighestColumnCount(data).max) + '%'
            });

            $(selector + '.json-to-table thead th, .json-to-table tbody td').css({
                border: settings.borderWidth + ' ' + settings.borderStyle + ' ' + settings.borderColor
            });

            $(selector + '.json-to-table thead th').css({
                backgroundColor: settings.thBg,
                color: settings.thColor,
                height: settings.thHeight,
                fontFamily: settings.thFontFamily,
                fontSize: settings.thFontSize,
                textTransform: settings.thTextTransform
            });

            $(selector + '.json-to-table tbody td').css({
                backgroundColor: settings.trBg,
                color: settings.trColor,
                paddingLeft: settings.tdPaddingLeft,
                paddingRight: settings.tdPaddingRight,
                height: settings.trHeight,
                fontSize: settings.trFontSize,
                fontFamily: settings.trFontFamily
            });

        }();
    };

    $.fn.createTable.getHighestColumnCount = function (data) {

        var count = 0, temp = 0, column = {max: 0, when: 0};

        for (var i = 0; i < data.length; i++) {
            count = $.fn.getObjectLength(data[i]);
            if (temp <= count) {
                temp = count;
                column.max = count;
                column.when = i;
            }
        }
        return column;
    };

    $.fn.createTable.parseTableData = function (data, thead,element) {

        var row = '';

        for (var i = 0; i < data.length; i++) {
            if (thead === false) row += '<tr><td class="jsl">' + (i + 1) + '</td>';
            $.each(data[i], function (key, value) {
                var obj_length = Object.keys(data[i]).length;
                if (thead === true) {
                    if (i === $.fn.createTable.getHighestColumnCount(data).when) {
                        row += '<th>' + $.fn.humanize(key) + '</th>';
                    }
                    if (Object.keys(data[i]).indexOf(key) == obj_length - 1 && i == data.length - 1) {
                        row += '<th>Action</th>';
                    }
                }
                if (thead === false) {
                    row += '<td>' + value + '</td>';
                    if (Object.keys(data[i]).indexOf(key) == obj_length - 1) {
                        var delete_btn = "<input style=\"width:100%;\" class=\"btn btn-primary btn-delete\" type=\"button\" value=\"Delete\">";
                        $(element).on("click",".btn-delete",function (evt) {
                            evt.stopImmediatePropagation();
                            // console.log("DELETED",$(this).parents("tr").find(".jsl").text());
                            var deleted_item_index = $(this).parents("tr").find(".jsl").text();
                            $(this).parents("tr").remove();
                            var element_to_Delete  = (parseInt(deleted_item_index) - 1);
                            data.splice(element_to_Delete,1);
                            td_numbers = $(element).find("td.jsl");
                            for (j = 0; j < data.length; j++) {
                                var current_element = $(td_numbers).get(j);
                                $(current_element).text(j + 1);
                            }
                            if(data.length == 0) {
                                $(element).remove();
                            }
                        });
                        row += '<td>' + delete_btn + '</td></tr>';
                    }
                }
            });

             if (thead === false) row += '</tr>';
        }
        return row;
    };

    $.fn.getObjectLength = function (object) {

        var length = 0;

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                ++length;
            }
        }

        return length;
    };

    $.fn.humanize = function (text) {

        var string = text.split('_');

        for (i = 0; i < string.length; i++) {
            string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
        }

        return string.join(' ');
    };

    $.fn.createTable.defaults = {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#DDDDDD',
        fontFamily: 'Verdana, Helvetica, Arial, FreeSans, sans-serif',

        thBg: '#F3F3F3',
        thColor: '#0E0E0E',
        thHeight: '30px',
        thFontFamily: 'Verdana, Helvetica, Arial, FreeSans, sans-serif',
        thFontSize: '14px',
        thTextTransform: 'capitalize',

        trBg: '#FFFFFF',
        trColor: '#0E0E0E',
        trHeight: '25px',
        trFontFamily: 'Verdana, Helvetica, Arial, FreeSans, sans-serif',
        trFontSize: '13px',

        tdPaddingLeft: '10px',
        tdPaddingRight: '10px'
    }

}(jQuery));