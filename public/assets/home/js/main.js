AOS.init({
    duration: 800,
    easing: 'slide'
});

(function($) {

    "use strict";

    var fullHeight = function() {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function() {
            $('.js-fullheight').css('height', $(window).height());
            console.log("Ingresando");
        });

    };
    fullHeight();

    var carousel = function() {
        $('.carousel-data').owlCarousel({
            margin: 30,
            responsiveClass: true,
            loop: true,
            autoplay: false,
            autoplayTimeout: 10200,
            nav: true,
            dots: false,
            smartSpeed: 1000,
            navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
            responsive: {
                0: {
                    items: 1,
                },
                400: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                700: {
                    items: 3,
                },
                1000: {
                    items: 4,

                }
            }
        });
    };
    carousel();

    var carousels = function() {
        $('.str-protfolio-info').owlCarousel({
            margin: 30,
            responsiveClass: true,
            nav: true,
            dots: false,
            loop: true,
            center: true,
            autoplay: false,
            navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1,
                },
                400: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                700: {
                    items: 1,
                },
                1000: {
                    items: 2,

                }
            },
        });
    };
    carousels();

    var carousel_aut = function() {
        $('.str-team-slide-aut').owlCarousel({
            margin: 30,
            responsiveClass: true,
            nav: true,
            dots: false,
            loop: true,
            autoplay: false,
            navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1,
                },
                400: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                700: {
                    items: 3,
                },
                1000: {
                    items: 4,

                }
            },
        })
    };
    carousel_aut();

    // magnific popup
    $('.image-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
        },
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
        }
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });

    /*------------------------------------
    03. jQuery MeanMenu
    -------------------------------------- */
    $('.main-menu nav').meanmenu({
        meanScreenWidth: "991",
        meanMenuContainer: '.mobile-menu'
    }); 

    /*-------------------------------------
    04. MagnificPopup
    --------------------------------------- */
    $('.video-popup').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        zoom: {
            enabled: true,
        }
    });

})(jQuery);

addEventListener('DOMContentLoaded', () =>{
    const contadores = document.querySelectorAll('.contador_cantidad')
    const velocidad = 100;

    const animarContadores = () => {
        for(const contador of contadores) {
            const actualizar_contador = () => {
                let cantidad_maxima = +contador.dataset.cantidadTotal,
                valor_actual = +contador.innerText,
                incremento = cantidad_maxima / velocidad

                if(valor_actual < cantidad_maxima){
                   contador.innerText = Math.ceil(valor_actual + incremento)
                   setTimeout(actualizar_contador, 5)
                } else{
                    contador.innerText = cantidad_maxima
                }
            }
            actualizar_contador()
        }
    }

    const mostrarContadores = elementos => {
       elementos.forEach(elemento => {
            if(elemento.isIntersecting){
               elemento.target.classList.add('animar')
               elemento.target.classList.remove('ocultar')
               setTimeout(animarContadores, 300)
            }
        });
    }

    const observer = new IntersectionObserver(mostrarContadores, {
        threshold: 0.75
    })

    const elementosHTML = document.querySelectorAll('.contador') 
    elementosHTML.forEach(elementoHTML => {
        observer.observe(elementoHTML)
    })

   new universalParallax().init({
       speed: 8.0
   });

})