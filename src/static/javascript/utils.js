$(document).ready(function() {
    $('select[data-target]').each(function () {
        var sel = $(this);
        sel.change(function (e) {
            if (sel.val() === "-1") {
                $(sel.attr('data-target')).removeClass('hidden')
                    .prop("required", true);
            } else {
                $(sel.attr('data-target')).addClass('hidden')
                    .val("")
                    .prop("required", false);
            }
        });
    });

    $('input[type="checkbox"][data-target]').each(function () {
        var cb = $(this);
        cb.change(function (e) {
            if (cb.prop("checked")) {
                $(cb.attr('data-target')).removeClass('hidden')
                    .prop("required", true);
            } else {
                $(cb.attr('data-target')).addClass('hidden')
                    .val("")
                    .prop("required", false);
            }
        });
    });
});
