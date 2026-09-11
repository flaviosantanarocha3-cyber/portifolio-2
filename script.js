/* ============================================================
   SCROLL SUAVE ENTRE SEÇÕES
   - Primário: jQuery (animate + scrollTop)
   - Fallback: JavaScript nativo (window.scrollTo) caso o
     jQuery não carregue por qualquer motivo
   - Desconta a altura do menu fixo para não cobrir o título
   - Fecha o menu hambúrguer no mobile após o clique
   ============================================================ */

(function () {

    var DURACAO_SCROLL = 800; // duração da animação em ms

    // altura do menu fixo no topo
    function alturaMenu() {
        var menu = document.querySelector('.menu');
        return menu ? menu.offsetHeight : 0;
    }

    // elemento de destino a partir do href ("#sobre" -> <section id="sobre">)
    function obterAlvo(href) {
        if (!href || href.length <= 1) {
            return null; // ignora href="#" vazio
        }
        try {
            return document.querySelector(href);
        } catch (erro) {
            return null;
        }
    }

    // fecha o menu mobile, se estiver aberto
    function fecharMenuMobile() {
        var menuLista = document.querySelector('.menu-lista');
        if (menuLista) {
            menuLista.classList.remove('active');
        }
    }

    // trata o clique em qualquer link de âncora
    function aoClicarLink(event) {
        var alvo = obterAlvo(this.getAttribute('href'));
        if (!alvo) {
            return; // deixa o comportamento padrão para links normais
        }
        event.preventDefault();

        if (window.jQuery) {
            // ---------- caminho jQuery ----------
            jQuery('html, body').stop().animate({
                scrollTop: jQuery(alvo).offset().top - alturaMenu()
            }, DURACAO_SCROLL);
        } else {
            // ---------- fallback nativo ----------
            var topo = alvo.getBoundingClientRect().top + window.pageYOffset - alturaMenu();
            window.scrollTo({ top: topo, behavior: 'smooth' });
        }

        fecharMenuMobile();
    }

    function ativarScroll() {
        var links = document.querySelectorAll('a[href^="#"]');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', aoClicarLink);
        }
        console.log('[portfolio] scroll suave ativo (' +
            (window.jQuery ? 'jQuery ' + jQuery.fn.jquery : 'fallback nativo') + ')');
    }

    // garante que o DOM está pronto, com ou sem jQuery
    if (window.jQuery) {
        jQuery(document).ready(ativarScroll);
    } else {
        document.addEventListener('DOMContentLoaded', ativarScroll);
    }

})();
