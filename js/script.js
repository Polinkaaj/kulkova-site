$(document).ready(function () {
    $('a[href^="#"').on('click', function () {

        let href = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(href).offset().top
        });
        return false;
    });

    //gallery
    $(function () {
        $('.minimized').click(function (event) {
            var i_path = $(this).attr('src');
            $('body').append('<div id="overlay"></div><div id="magnify"><img src="' + i_path + '"><div id="close-popup"><i></i></div></div>');
            $('#magnify').css({
                left: ($(document).width() - $('#magnify').outerWidth()) / 2,
                top: ($(window).height() - $('#magnify').outerHeight()) / 2
            });
            $('#overlay, #magnify').fadeIn('fast');
        });

        $('body').on('click', '#close-popup, #overlay', function (event) {
            event.preventDefault();
            $('#overlay, #magnify').fadeOut('fast', function () {
                $('#close-popup, #magnify, #overlay').remove();
            });
        });
    });

});
var submitted = false;

function burgerMenu(selector) {
    let menu = $(selector);
    let button = menu.find('.burger-menu_button', '.burger-menu_lines');
    let links = menu.find('.burger-menu_link');
    let overlay = menu.find('.burger-menu_overlay');

    button.on('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    links.on('click', () => toggleMenu());
    overlay.on('click', () => toggleMenu());

    function toggleMenu() {
        menu.toggleClass('burger-menu_active');

        if (menu.hasClass('burger-menu_active')) {
            $('body').css('overlow', 'hidden');
        } else {
            $('body').css('overlow', 'visible');
        }
    }
}

burgerMenu('.burger-menu');

let step = 4; // Размер этих самых порций. Чтобы легко можно было поменять.
let prod = document.querySelectorAll('.gallery');

for (let i = 0; i < prod.length; i++) {
    let product = prod[i];
    let images = product.querySelectorAll('.minimized');
    for (let j = 0; j < step; j++) {//Для начала перебираем - показываем первые step пунктов.
        // Но только если такие существуют
        if (images[j]) { images[j].classList.add('visi') }
    }

    let more = product.querySelector('.more');
    more.addEventListener('click', function () {
        let visi = product.querySelectorAll('.visi');
        let next = visi[visi.length - 1].nextElementSibling;
        // Достали следующий элемент ПОСЛЕДНЕГО элемента visi. 
        //Предполагается, что никогда не будет добавлено полностью пустых ul.
        let it = 0;
        while (it < step) {
            if (next) {
                next.classList.add('visi');
                next = next.nextElementSibling;
                it++;
            } else {
                break; // Если следующего элемента не оказалось - выключаем цикл.
            }
        }
    });
}