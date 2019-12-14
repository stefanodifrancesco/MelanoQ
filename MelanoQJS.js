
     $('input.mutually_check').click(function () {
        checkedState = $(this).attr('checked');
            $(this).parent('.form-group').children('input.mutually_check:checked').each(function () {
                $(this).prop('checked', false);
            });
        $(this).prop('checked', checkedState);
    });
