//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches


$(".scroll-button-bottom").click(function() {
    scrollerdiv = $(".scrollingdiv:visible");
    offset = scrollerdiv.scrollTop() + 200;
    scrollerdiv.animate({ scrollTop: offset }, 300);
});

$(".scrollingdiv").on("scroll", function() {
    if ($(this).scrollTop() + $(this).innerHeight() >= $(this).prop('scrollHeight') - 1) {
        $(".scroll-button-bottom").hide();
        $(this).nextAll(".action-button").css("display", "inline-block");
    }
});

$("#confirmbutton").click(function() {

    $("#msform").validate({
        errorClass: 'invalid',
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.insertAfter(element.next('span').children());
        },
        highlight: function(element) {
            $(element).next('span').show();
        },
        unhighlight: function(element) {
            $(element).next('span').hide();
        }
    });
    if ((!$('#msform').valid())) {
        return true;
    }
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;

            scrollerdiv = $(".scrollingdiv:visible");
            if (scrollerdiv.nextAll('.action-button').css('display') == 'none') {
                if (scrollerdiv.prop('scrollHeight') == scrollerdiv.prop('clientHeight')) {
                    scrollerdiv.nextAll(".action-button").fadeIn(200, function() {
                        scrollerdiv.nextAll(".action-button").css("display", "inline-block");
                    });
                } else {
                    scrollerdiv.nextAll(".scroll-button-bottom").fadeIn(200, function() {
                        scrollerdiv.nextAll(".scroll-button-bottom").css("display", "block");
                    });
                }
            }


        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$("#fillbutton").click(function() {

    $(".profile-header").css("display", "none");
    $(".progressline").css("display", "block");


    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;

            scrollerdiv = $(".scrollingdiv:visible");
            if (scrollerdiv.nextAll('.action-button').css('display') == 'none') {
                if (scrollerdiv.prop('scrollHeight') == scrollerdiv.prop('clientHeight')) {
                    scrollerdiv.nextAll(".action-button").fadeIn(200, function() {
                        scrollerdiv.nextAll(".action-button").css("display", "inline-block");
                    });
                } else {
                    scrollerdiv.nextAll(".scroll-button-bottom").fadeIn(200, function() {
                        scrollerdiv.nextAll(".scroll-button-bottom").css("display", "block");
                    });
                }
            }


        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$("#firstnext").click(function() {

    $("#msform").validate({
        errorClass: 'invalid',
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.insertAfter(element.next('span').children());
        },
        highlight: function(element) {
            $(element).next('span').show();
        },
        unhighlight: function(element) {
            $(element).next('span').hide();
        }
    });
    if ((!$('#msform').valid())) {
        return true;
    }
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq(1).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;

            scrollerdiv = $(".scrollingdiv:visible");
            if (scrollerdiv.nextAll('.action-button').css('display') == 'none') {
                if (scrollerdiv.prop('scrollHeight') == scrollerdiv.prop('clientHeight')) {
                    scrollerdiv.nextAll(".action-button").fadeIn(200, function() {
                        scrollerdiv.nextAll(".action-button").css("display", "inline-block");
                    });
                } else {
                    scrollerdiv.nextAll(".scroll-button-bottom").fadeIn(200, function() {
                        scrollerdiv.nextAll(".scroll-button-bottom").css("display", "block");
                    });
                }
            }


        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$("#secondnext").click(function() {

    $("#msform").validate({
        errorClass: 'invalid',
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.insertAfter(element.next('span').children());
        },
        highlight: function(element) {
            $(element).next('span').show();
        },
        unhighlight: function(element) {
            $(element).next('span').hide();
        }
    });
    if ((!$('#msform').valid())) {
        return true;
    }
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq(2).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;

            scrollerdiv = $(".scrollingdiv:visible");
            if (scrollerdiv.nextAll('.action-button').css('display') == 'none') {
                if (scrollerdiv.prop('scrollHeight') == scrollerdiv.prop('clientHeight')) {
                    scrollerdiv.nextAll(".action-button").fadeIn(200, function() {
                        scrollerdiv.nextAll(".action-button").css("display", "inline-block");
                    });
                } else {
                    scrollerdiv.nextAll(".scroll-button-bottom").fadeIn(200, function() {
                        scrollerdiv.nextAll(".scroll-button-bottom").css("display", "block");
                    });
                }
            }


        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$("#firstprevious").click(function() {

    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq(1).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({ 'left': left });
            previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$("#thirdnext").click(function() {

    $("#msform").validate({
        errorClass: 'invalid',
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.insertAfter(element.next('span').children());
        },
        highlight: function(element) {
            $(element).next('span').show();
        },
        unhighlight: function(element) {
            $(element).next('span').hide();
        }
    });
    if ((!$('#msform').valid())) {
        return true;
    }
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq(3).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;

            scrollerdiv = $(".scrollingdiv:visible");
            if (scrollerdiv.nextAll('.action-button').css('display') == 'none') {
                if (scrollerdiv.prop('scrollHeight') == scrollerdiv.prop('clientHeight')) {
                    scrollerdiv.nextAll(".action-button").fadeIn(200, function() {
                        scrollerdiv.nextAll(".action-button").css("display", "inline-block");
                    });
                } else {
                    scrollerdiv.nextAll(".scroll-button-bottom").fadeIn(200, function() {
                        scrollerdiv.nextAll(".scroll-button-bottom").css("display", "block");
                    });
                }
            }


        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$("#secondprevious").click(function() {

    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq(2).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({ 'left': left });
            previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$("#forthnext").click(function() {

    $("#msform").validate({
        errorClass: 'invalid',
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.insertAfter(element.next('span').children());
        },
        highlight: function(element) {
            $(element).next('span').show();
        },
        unhighlight: function(element) {
            $(element).next('span').hide();
        }
    });
    if ((!$('#msform').valid())) {
        return true;
    }
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq(4).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;

            scrollerdiv = $(".scrollingdiv:visible");
            if (scrollerdiv.nextAll('.action-button').css('display') == 'none') {
                if (scrollerdiv.prop('scrollHeight') == scrollerdiv.prop('clientHeight')) {
                    scrollerdiv.nextAll(".action-button").fadeIn(200, function() {
                        scrollerdiv.nextAll(".action-button").css("display", "inline-block");
                    });
                } else {
                    scrollerdiv.nextAll(".scroll-button-bottom").fadeIn(200, function() {
                        scrollerdiv.nextAll(".scroll-button-bottom").css("display", "block");
                    });
                }
            }


        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$("#thirdprevious").click(function() {

    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq(3).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({ 'left': left });
            previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$("#fifthnext").click(function() {

    $("#msform").validate({
        errorClass: 'invalid',
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.insertAfter(element.next('span').children());
        },
        highlight: function(element) {
            $(element).next('span').show();
        },
        unhighlight: function(element) {
            $(element).next('span').hide();
        }
    });
    if ((!$('#msform').valid())) {
        return true;
    }
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq(5).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;

            scrollerdiv = $(".scrollingdiv:visible");
            if (scrollerdiv.nextAll('.action-button').css('display') == 'none') {
                if (scrollerdiv.prop('scrollHeight') == scrollerdiv.prop('clientHeight')) {
                    scrollerdiv.nextAll(".action-button").fadeIn(200, function() {
                        scrollerdiv.nextAll(".action-button").css("display", "inline-block");
                    });
                } else {
                    scrollerdiv.nextAll(".scroll-button-bottom").fadeIn(200, function() {
                        scrollerdiv.nextAll(".scroll-button-bottom").css("display", "block");
                    });
                }
            }


        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$("#forthprevious").click(function() {

    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq(4).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({ 'left': left });
            previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$("#sixthnext").click(function() {

    $("#msform").validate({
        errorClass: 'invalid',
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.insertAfter(element.next('span').children());
        },
        highlight: function(element) {
            $(element).next('span').show();
        },
        unhighlight: function(element) {
            $(element).next('span').hide();
        }
    });
    if ((!$('#msform').valid())) {
        return true;
    }
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq(6).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;

            scrollerdiv = $(".scrollingdiv:visible");
            if (scrollerdiv.nextAll('.action-button').css('display') == 'none') {
                if (scrollerdiv.prop('scrollHeight') == scrollerdiv.prop('clientHeight')) {
                    scrollerdiv.nextAll(".action-button").fadeIn(200, function() {
                        scrollerdiv.nextAll(".action-button").css("display", "inline-block");
                    });
                } else {
                    scrollerdiv.nextAll(".scroll-button-bottom").fadeIn(200, function() {
                        scrollerdiv.nextAll(".scroll-button-bottom").css("display", "block");
                    });
                }
            }


        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$("#fifthprevious").click(function() {

    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq(5).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({ 'left': left });
            previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$("#seventhnext").click(function() {

    $("#msform").validate({
        errorClass: 'invalid',
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.insertAfter(element.next('span').children());
        },
        highlight: function(element) {
            $(element).next('span').show();
        },
        unhighlight: function(element) {
            $(element).next('span').hide();
        }
    });
    if ((!$('#msform').valid())) {
        return true;
    }
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq(7).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;

            scrollerdiv = $(".scrollingdiv:visible");
            if (scrollerdiv.nextAll('.action-button').css('display') == 'none') {
                if (scrollerdiv.prop('scrollHeight') == scrollerdiv.prop('clientHeight')) {
                    scrollerdiv.nextAll(".action-button").fadeIn(200, function() {
                        scrollerdiv.nextAll(".action-button").css("display", "inline-block");
                    });
                } else {
                    scrollerdiv.nextAll(".scroll-button-bottom").fadeIn(200, function() {
                        scrollerdiv.nextAll(".scroll-button-bottom").css("display", "block");
                    });
                }
            }


        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$("#sixthprevious").click(function() {

    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq(6).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({ 'left': left });
            previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$("#seventhprevious").click(function() {

    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq(7).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({ 'left': left });
            previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        },
        duration: 600,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});