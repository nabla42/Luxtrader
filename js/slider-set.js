$(document).ready(function () {
    $('.container__dinamic_lots').slick({
        appendArrows: $('.container__dinamic_lots-btn'),
        prevArrow: $('.btn-next-lot__prev-btn'),
        nextArrow: $('.btn-next-lot__next-btn'),
        slidesToShow: 3,
        infinite: false,
        // variableWidth: true,
        responsive:[
            {
                breakpoint: 768,
                settings: {slidesToShow: 2}
            },
            {
                breakpoint: 480,
                settings: {slidesToShow: 1}
            }
        ]
    });
    $('.quotes').slick({
        appendArrows: $('.horizontal-decor__img_border'),
        draggable: false,
        prevArrow: null,
        nextArrow: $('.btn-update'),
        fade: true,
        slidesToShow: 1,
        speed: 1000
    });
});
