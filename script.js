/* ============================================================
   SCROLL SUAVE ENTRE SEÇÕES (jQuery)
   - Intercepta cliques nos links de âncora (href="#secao")
   - Faz a rolagem animada descontando a altura do menu fixo
   - Fecha o menu hambúrguer no mobile após o clique
   ============================================================ */
$(document).ready(function () {

    var DURACAO_SCROLL = 800; // duração da animação em ms

    $('a[href^="#"]').on('click', function (event) {
        var destino = $(this).attr('href');

        // ignora links vazios tipo href="#"
        if (destino.length <= 1) {
            return;
        }

        var $alvo = $(destino);

        if ($alvo.length) {
            event.preventDefault();

            // desconta a altura do menu fixo para não cobrir o título da seção
            var alturaMenu = $('.menu').outerHeight() || 0;

            $('html, body').stop().animate({
                scrollTop: $alvo.offset().top - alturaMenu
            }, DURACAO_SCROLL);

            // fecha o menu mobile, se estiver aberto
            $('.menu-lista').removeClass('active');
        }
    });

});
