(function ($) {

     // Setup variables
    $window = $(window);
    $slide = $('.homeSlide');
    $body = $('body');
    
    //FadeIn all sections   
    $body.imagesLoaded( function() {
        setTimeout(function() {
              
              // Resize sections
              adjustWindow();
              
              // Fade in sections
              $body.removeClass('loading').addClass('loaded');
              
        }, 800);
    });

    function adjustWindow(){

        // Get window size
        winH = $window.height();
        winW = $window.width();

        // Keep minimum height 550
        if(winH <= 550) {
            winH = 550;
        }

        // Init Skrollr for 768 and up
        if( winW >= 768) {

            // Init Skrollr
            var s = skrollr.init({
                forceHeight: false,
                smoothScrolling:true,
                smoothScrollingDuration:1000
            });
            skrollr.menu.init(s,{
                animate:true,
                easing:'sqrt',
                scale:3,
                duration:function(currentTop,targetTop){
                    return 1000;
                }
            });

            // Resize our slides
            $slide.height(winH);

            s.refresh($('.homeSlide'));

        } else {

            // Init Skrollr
            var s = skrollr.init();
            s.destroy();
        }
    
        // Check for touch
        if(Modernizr.touch) {

            // Init Skrollr
            var s = skrollr.init();
            s.destroy();
        }

    }

    $('#slide-1').first().addClass('active-sec');

    $('html').bind('mousewheel DOMMouseScroll', function(e){
        e.preventDefault();
        var active = $('section.active-sec');
        var delta = e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ? 1 : -1;
        if (delta < 0) {
             next = active.next();
             if (next.length) {
               var timer = setTimeout(function () {
                $('body, html').animate({
                     scrollTop: next.offset().top
                }, {easing: "swing"}, 200);                    
                next.addClass('active-sec')
                            .siblings().removeClass('active-sec');
                        clearTimeout(timer);
                    }, 300);
                }
            } else {
             prev = active.prev();
             if (prev.length) {
               var timer = setTimeout(function () {
                   $('body, html').animate({
                       scrollTop: prev.offset().top
                   }, {easing: "swing"}, 200);
                        prev.addClass('active-sec')
                            .siblings().removeClass('active-sec');                    
                        clearTimeout(timer);
                    }, 300);
                }
            }
    });

})(jQuery);
