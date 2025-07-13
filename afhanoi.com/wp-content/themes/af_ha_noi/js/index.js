(function($) {
    window.onload = function() {
        $(document).ready(function() {
            menuMobile();
            backToTop();
            activityHover();
            // activitySlider();
            duplicateSlides();
            showQuestion();
            submitDoctor();
            datePicker();
            // SliderNav();
            if ($(window).width() < 992) {
                $(".menu-mobile").css("display", "block");
            }
            $(".time-picker").hunterTimePicker();
        });
    };
})(jQuery);


function menuMobile() {
    if (
        $(".bar__mb").length ||
        $(".menu-mobile").length ||
        $(".overlay").length
    ) {
        $(".bar__mb").click(function() {
            $(this).toggleClass("active");
            $(".overlay").addClass("overlay-active");
            $(".menu-mobile").addClass("menu-mobile-active");
            $("body").addClass("hidden");
        });
        $(".overlay").click(function() {
            $(".overlay").removeClass("overlay-active");
            $(".menu-mobile").removeClass("menu-mobile-active");
            $("body").removeClass("hidden");
            $(".bar__mb").removeClass("active");
        });
        $(".menu-mobile-close").click(function() {
            $(".overlay").removeClass("overlay-active");
            $(".menu-mobile").removeClass("menu-mobile-active");
        });
    }

    $(".menu-mobile ul li.menu-item-has-children>ul").before(
        '<span class="li-plus"></span>'
    );
    $(
        ".menu-mobile ul li.current-menu-parent.menu-item-has-children .li-plus"
    ).addClass("clicked");

    if ($(".li-plus").length) {
        $(".li-plus").click(function(e) {
            if ($(this).hasClass("clicked")) {
                $(this).removeClass("clicked").next("ul").slideUp(500);
            } else if ($(this).not(".clicked")) {
                $(".menu-mobile ul li > ul").slideUp(500);
                $(".li-plus").removeClass("clicked");
                $(this).addClass("clicked").next("ul").slideDown(500);
            } else if ($(this).parents().siblings("a").hasClass("clicked")) {
                $(".clicked").slideDown();
                $(".menu-mobile ul li > ul").slideUp(500);

                $(this).addClass("clicked").next("ul").slideDown(500);
            } else {
                $("#nav li a").removeClass("clicked").next("ul").slideUp(500);

                $(this).addClass("clicked").next("ul").slideDown(500);
            }
        });
    }
    if ($(window).width() <= 991) {
        $(".btn-popup").click(function() {
            $(".overlay").trigger("click");
        });
    }
}

function backToTop() {
    var $backToTop = $(".back-to-top");
    $backToTop.hide();

    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 200) {
            $backToTop.fadeIn();
        } else {
            $backToTop.fadeOut();
        }
    });

    $backToTop.on("click", function(e) {
        $("html, body").animate({ scrollTop: 0 }, 50);
    });
}

function activityHover() {
    $(document).on("mouseover", ".activity-item", function() {
        $(this).addClass("show");
        $(this).find(".activity-bottom").show(300);
    });
    $(document).on("mouseleave", ".activity-item", function() {
        $(this).find(".activity-bottom").hide(300);
        $(this).removeClass("show");
    });
}

function activitySlider() {
    var $carousel = $(".home__activity-slider").flickity({
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        contain: true,
        cellAlign: "left",
    });
    $(".button-group").on("click", ".button", function() {
        $(".button-group .button").removeClass("is-selected");
        $(this).addClass("is-selected");
        var index = $(this).index();
        $carousel.flickity("select", index);
    });
}

function duplicateSlides(cellSelector) {
    var $slides = $(cellSelector).clone();
    $slides.addClass("show-if-flickity-enabled");
    $(cellSelector).last().after($slides);
}

duplicateSlides(".home__activity .activity-item");

function showQuestion() {
    $(".question-title").click(function() {
        $(this).toggleClass("rotate");
        $(this).siblings(".question-desc").slideToggle();
    });

    $(".question-item:first-child .question-title").addClass("rotate");
}

//  Date picker
function datePicker() {
    jQuery.datepicker.regional["vi"] = {
        closeText: "Đóng",
        prevText: "&#x3c;Trước",
        nextText: "Tiếp&#x3e;",
        currentText: "Hôm nay",
        monthNames: [
            "Tháng Một",
            "Tháng Hai",
            "Tháng Ba",
            "Tháng Tư",
            "Tháng Năm",
            "Tháng Sáu",
            "Tháng Bảy",
            "Tháng Tám",
            "Tháng Chín",
            "Tháng Mười",
            "Tháng Mười Một",
            "Tháng Mười Hai",
        ],
        monthNamesShort: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ],
        dayNames: [
            "bs_date_1",
            "bs_date_2",
            "bs_date_3",
            "bs_date_4",
            "bs_date_5",
            "bs_date_6",
            "bs_date_7",
        ],
        dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: "",
    };
    jQuery.datepicker.setDefaults($.datepicker.regional["vi"]);

    var link = $('#urlAjax').val();
    $(".t-datepicker").datepicker({
        dateFormat: "dd/mm/yy",
        showButtonPanel: true,
        minDate: new Date(),
        maxDate: "+30d",
        onSelect: function(dateText, inst) {
            var date = $(this).datepicker("getDate");
            var date_day = $(this).val();
            var day_check = $.datepicker.formatDate("DD", date);
            var id_bac_si = $("#check_bac_si option:checked").val();
            if (!id_bac_si) {
                id_bac_si = $("#bs_single").val();
            }
            $(".gnws-book-loading").removeClass("d-none");
            jQuery.ajax({
                type: "POST",
                url: link,
                data: {
                    action: "get_time_book",
                    day_check: day_check,
                    id_bac_si: id_bac_si,
                    date_day: date_day,
                },
                success: function(response) {
                    jQuery(".gnws-time_book").html(response);
                    $(".gnws-book-loading").addClass("d-none");
                    $('.time-picker').prop("disabled", false);
                },
            });
        },
    });
}

$(document).ready(function() {
    // Custom
    var stickyToggle = function(sticky, stickyWrapper, scrollElement) {
        var stickyHeight = sticky.outerHeight();
        var stickyTop = stickyWrapper.offset().top;
        if (scrollElement.scrollTop() >= stickyTop) {
            stickyWrapper.height(stickyHeight);
            sticky.addClass("is-sticky");
        } else {
            sticky.removeClass("is-sticky");
            stickyWrapper.height("auto");
        }
    };
    // Find all data-toggle="sticky-onscroll" elements
    $('[data-toggle="sticky-onscroll"]').each(function() {
        var sticky = $(this);
        var stickyWrapper = $("<div>").addClass("sticky-wrapper");
        // insert hidden element to maintain actual top offset on page
        sticky.before(stickyWrapper);
        sticky.addClass("sticky");
        // Scroll & resize events
        $(window).on("scroll.sticky-onscroll resize.sticky-onscroll", function() {
            stickyToggle(sticky, stickyWrapper, $(this));
        });
        // On page load
        stickyToggle(sticky, stickyWrapper, $(window));
    });
});
//  Chọn dịch vụ khám
// $("#check_dich_vu").on("change", function() {
//     var id_dich_vu = $("#check_dich_vu option:checked").val();
//     $(".gnws-book-loading").removeClass("d-none");
//     var link = $('#urlAjax').val();

//     jQuery.ajax({
//         type: "POST",
//         url: link,
//         data: { action: "get_bac_si", id_dich_vu: id_dich_vu },
//         success: function(response) {
//             jQuery("#check_bac_si").html(response);
//             $("#check_bac_si").prop("disabled", false);
//             $(".gnws-book-loading").addClass("d-none");
//         },
//     });
// });
// Chọn bác sĩ
// $("#check_bac_si").on("change", function() {
//     var id_bac_si = $("#check_bac_si option:checked").val();
//     $(".gnws-book-loading").removeClass("d-none");
//     var link = $('#urlAjax').val();
//     $('.t-datepicker').val('');
//     jQuery.ajax({
//         type: "POST",
//         url: link,
//         data: { action: "get_date_book", id_bac_si: id_bac_si },
//         success: function(response) {
//             jQuery(".gnws-date_book").html(response);
//             $(".gnws-book-loading").addClass("d-none");
//         },
//     });
// });
// $("#form-bs1").on("show.bs.modal", function(e) {
//     var id_bac_si = $("#bs_single").val();
//     $(".gnws-book-loading").removeClass("d-none");
//     var link = $('#urlAjax').val();
//     jQuery.ajax({
//         type: "POST",
//         url: link,
//         data: { action: "get_date_book", id_bac_si: id_bac_si },
//         success: function(response) {
//             jQuery(".gnws-date_book").html(response);
//             $(".gnws-book-loading").addClass("d-none");
//         },
//     });
// });
//
$(".t-datepicker").on('change', function() {
    var day = $('.t-datepicker').val();
    $('.gnws-book-loading').removeClass('d-none');
    jQuery.ajax({
        type: "POST",
        url: link,
        data: { "action": "get_time_book", 'day': day },
        success: function(response) {
            jQuery('.gnws-time_book').html(response);
            $('.gnws-book-loading').addClass('d-none');
        }
    });
});

//
$(".form-subscribe").on("submit", function(e) {
    e.preventDefault();
    $form = $(this);
    $form.find('[type="submit"]').find(".loading").removeClass("d-none");
    $form.find(".gnws-input").removeClass("gnws-alert-danger");

    var link = $('#urlAjax').val();
    $.ajax({
        type: "POST",
        url: link,
        data: $form.serialize(),
        success: function(data, textStatus, jqXHR) {
            $form.find('[type="submit"]').find(".loading").addClass("d-none");
            if (data.status == true) {
                Swal.fire("", data.message, "success");
                $form.find(".gnws-input").val("");
            } else {
                $(".gnws-input").each(function() {
                    if ($(this).val() == '') {
                        $(this).addClass("gnws-alert-danger");
                    }
                });
                Swal.fire("", data.message, "error");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        },
    });
});

function submitDoctor() {
    if (localStorage.getItem("popState") != "shown") {
        $("#main-content").removeClass("d-none");
    } else {
        $("#doctor-text").removeClass("d-none");
    }

    $("#form-info").on("submit", function(e) {
        e.preventDefault();
        $form = $(this);
        $form.find('[type="submit"]').find(".loading").removeClass("d-none");
        $form.find(".gnws-input").removeClass("gnws-alert-danger");
        var link = $('#urlAjax').val();
        $.ajax({
            type: "POST",
            url: link,
            data: $form.serialize(),
            success: function(data, textStatus, jqXHR) {
                $form.find('[type="submit"]').find(".loading").addClass("d-none");
                if (data.status == true) {
                    Swal.fire("", data.message, "success");
                    $form.find(".gnws-input").val("");
                    $("#doctor-text").removeClass("d-none");
                    $("#main-content").addClass("d-none");
                    localStorage.setItem("popState", "shown");
                } else {
                    $(".gnws-input").each(function() {
                        if ($(this).val() == '') {
                            $(this).addClass("gnws-alert-danger");
                        }
                    });
                    Swal.fire("", data.message, "error");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            },
        });
    });
}

//
$(".form-book_bs").on("submit", function(e) {
    e.preventDefault();
    $form = $(this);
    $form.find(".gnws-book-loading").removeClass("d-none");
    $form.find(".gnws-input").removeClass("gnws-alert-danger");
    var link = $('#urlAjax').val();
    $.ajax({
        type: "POST",
        url: link,
        data: $form.serialize(),
        success: function(data, textStatus, jqXHR) {
            if (data.status == true) {
                Swal.fire("", data.message, "success");
                $form.find(".gnws-input").val("");
                $(".gnws-book-loading").addClass("d-none");
                $form.find(".gnws-book-loading").addClass("d-none");
            } else {
                $(".gnws-input").each(function() {
                    if ($(this).val() == '') {
                        $(this).addClass("gnws-alert-danger");
                    }
                });
                Swal.fire("", data.message, "error");
                $form.find(".gnws-book-loading").addClass("d-none");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        },
    });
});

(function($) {
    $.hunterTimePicker = function(box, options) {
        var box = $(box);

        var template = $(
            '<div class="Hunter-time-picker" id="Hunter_time_picker"><div class="Hunter-wrap"><ul class="Hunter-wrap" id="Hunter_time_wrap"></ul></div></div>'
        );

        var time_wrap = $("#Hunter_time_wrap", template);

        $(document).click(function() {
            template.remove();
        });

        box.click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            $(".Hunter-time-picker").remove();
            var _this = $(this);
            var offset = _this.offset();
            var top = offset.top + _this.outerHeight() + 15;
            template.css({
                left: offset.left,
                top: top,
            });
            buildTimePicker();
            $("body").append(template);

            $(".Hunter-time-picker").click(function(event) {
                event.preventDefault();
                event.stopPropagation();
            });
        });

        function buildTimePicker() {
            buildHourTpl();
            hourEvent();
            minuteEvent();
            cleanBtnEvent();
        }

        function buildHourTpl() {
            var hour_html = "<p>Giờ</p>";
            for (var i = 0; i < dates.hour.length; i++) {
                var temp = box.val().split(":")[0];
                if (dates.hour[i] == temp) {
                    hour_html +=
                        '<li class="Hunter-hour active" data-hour="' +
                        dates.hour[i] +
                        '"><ul class="Hunter-minute-wrap"></ul><div class="Hunter-hour-name">' +
                        dates.hour[i] +
                        "</div></li>";
                } else {
                    hour_html +=
                        '<li class="Hunter-hour" data-hour="' +
                        dates.hour[i] +
                        '"><ul class="Hunter-minute-wrap"></ul><div class="Hunter-hour-name">' +
                        dates.hour[i] +
                        "</div></li>";
                }
            }

            hour_html +=
                '<li class="Hunter-clean"><input type="button" class="Hunter-clean-btn" id="Hunter_clean_btn" value="Trống"></li>';

            time_wrap.html(hour_html);
        }

        function buildMinuteTpl(cur_time) {
            var poi = cur_time.position();
            var minute_html = "<p>Phút</p>";
            var temp = box.val().split(":")[1];
            var id_bac_si = $("#check_bac_si option:checked").val();
            if (!id_bac_si) {
                id_bac_si = $("#bs_single").val();
            }
            var date,day_check,date_day,hour_cur;
            if ($('.form-bs1').hasClass('show')) {
                date = $(".form-bs1 .t-datepicker").datepicker("getDate");
                day_check = $.datepicker.formatDate("DD", date);
                date_day = $(".form-bs1 .t-datepicker").val();
                hour_cur = $(".form-bs1 .time-picker").val();
            } else {
                date = $(".form-bs2 .t-datepicker").datepicker("getDate");
                day_check = $.datepicker.formatDate("DD", date);
                date_day = $(".form-bs2 .t-datepicker").val();
                hour_cur = $(".form-bs2 .time-picker").val();
            }
            hour_cur_2 = hour_cur.substring(0, 2);
            $('.time-picker').val('');
            var link = $('#urlAjax').val();
            if (id_bac_si != "") {
                jQuery.ajax({
                    type: "POST",
                    url: link,
                    data: {
                        action: "get_minutes_book",
                        day_check: day_check,
                        hour_cur_2: hour_cur_2,
                        id_bac_si: id_bac_si,
                        date_day: date_day
                    },
                    success: function(response) {
                        jQuery(".gnws-time_book").html(response);
                        $(".gnws-book-loading").addClass("d-none");
                        for (var j = 0; j < dates.minute.length; j++) {
                            if (dates.minute[j] == temp) {
                                minute_html +=
                                    '<li class="Hunter-minute active" data-minute="' +
                                    dates.minute[j] +
                                    '">' +
                                    dates.minute[j] +
                                    "</li>";
                            } else {
                                minute_html +=
                                    '<li class="Hunter-minute" data-minute="' +
                                    dates.minute[j] +
                                    '">' +
                                    dates.minute[j] +
                                    "</li>";
                            }
                        }
                        cur_time
                            .find(".Hunter-minute-wrap")
                            .html(minute_html)
                            .css("left", "-" + (poi.left - 37) + "px")
                            .show();
                    },
                });
            } else {
                for (var j = 0; j < dates.minute.length; j++) {
                    if (dates.minute[j] == temp) {
                        minute_html +=
                            '<li class="Hunter-minute active" data-minute="' +
                            dates.minute[j] +
                            '">' +
                            dates.minute[j] +
                            "</li>";
                    } else {
                        minute_html +=
                            '<li class="Hunter-minute" data-minute="' +
                            dates.minute[j] +
                            '">' +
                            dates.minute[j] +
                            "</li>";
                    }
                }
                cur_time
                    .find(".Hunter-minute-wrap")
                    .html(minute_html)
                    .css("left", "-" + (poi.left - 37) + "px")
                    .show();
            }
        }

        function hourEvent() {
            time_wrap.on("click", ".Hunter-hour", function(event) {
                event.preventDefault();
                event.stopPropagation();
                var _this = $(this);

                time_wrap.find(".Hunter-hour").removeClass("active");
                time_wrap.find(".Hunter-hour-name").removeClass("active");
                time_wrap.find(".Hunter-minute-wrap").hide().children().remove();

                _this.addClass("active");
                _this.find(".Hunter-hour").addClass("active");

                var hourValue = _this.data("hour");
                var temp = box.val().split(":");
                if (temp.length > 1) {
                    box.val(hourValue + ":" + temp[1]);
                } else {
                    box.val(hourValue + ":00");
                }
                buildMinuteTpl(_this);

                if (options.callback) options.callback(box);

                return false;
            });
        }

        function minuteEvent() {
            time_wrap.on("click", ".Hunter-minute", function(event) {
                event.preventDefault();
                event.stopPropagation();
                var _this = $(this);
                var this_hour = $(this).closest('#Hunter_time_wrap').find('.Hunter-hour.active').data("hour");
                var minuteValue = _this.data("minute");
                var temp = this_hour + ":" + minuteValue;
                box.val(temp);
                template.remove();

                if (options.callback) options.callback(box);

                return false;
            });
        }

        function cleanBtnEvent() {
            time_wrap.on("click", "#Hunter_clean_btn", function(event) {
                event.preventDefault();
                event.stopPropagation();

                box.val("");
                template.remove();
                if (options.callback) options.callback(box);
                return false;
            });
        }
    };

    $.fn.extend({
        hunterTimePicker: function(options) {
            options = $.extend({}, options);
            this.each(function() {
                new $.hunterTimePicker(this, options);
            });
            return this;
        },
    });
})(jQuery);

$(".gnws-nav-item_time").on("shown.bs.tab", function(event) {
    $(".gnws-week-item").flickity("resize");
});

function SliderNav() {
    if ($(window).width() < 767) {
        $(".header__nav-secondary ul").flickity({
            contain: true,
            prevNextButtons: false,
            pageDots: false,
            wrapAround: true,
            autoPlay: 3000,
            watchCSS: true
        });

        $(".header__nav-secondary ul li").flickity("resize");
    }
}


$('[data-fancybox="gallery-image"]').fancybox({
    margin: [44, 0, 22, 0],
    thumbs: {
        autoStart: true,
        axis: 'x'
    }
})