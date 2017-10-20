$(document).ready(function() {
    $('select[name="school"]').change(function (e) {
        var tgt = $(e.target);
        if (tgt.val() === "-1") {
            $("#schoolSpecification").removeClass("hidden");
        } else {
            $("#schoolSpecification").addClass("hidden");
        }
    });
});
