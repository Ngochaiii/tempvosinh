function resize_img(freme, int) {
    var width_iframe = $(freme).width();
    $(window).resize(function(){
        var height_iframe = width_iframe/int;
        $(freme).css({
            'height': height_iframe,
        });
    }).resize();
}


