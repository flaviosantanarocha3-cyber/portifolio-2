/* ============================================================
   SCROLL SUAVE ENTRE SEÇÕES
   - Primário: jQuery (animate + scrollTop)
   - Fallback: JavaScript nativo (window.scrollTo) caso o
     jQuery não carregue por qualquer motivo
   - Desconta a altura do menu fixo para não cobrir o título
   - Fecha o menu hambúrguer no mobile após o clique
   ============================================================ */

(function () {
    let DURACAO_SCROLL = 800; // Duração da animação em ms

    // Altura do menu fixo no topo
    function alturaMenu() {
        let menu = document.querySelector('.menu');
        return menu ? menu.offsetHeight : 0;
    }

    // Elemento de destino a partir do href
    function obterAlvo(href) {
        if (!href || href.length <= 1) {
            return null; // Ignores href="#" vazio
        }
        try {
            return document.querySelector(href);
        } catch (erro) {
            return null;
        }
    }

    // Fecha o menu mobile se estiver aberto
    function fecharMenuMobile() {
        let menuLista = document.querySelector('.menu-lista');
        if (menuLista) {
            menuLista.classList.remove('active');
        }
    }

    // Trata o clique em qualquer link de âncora
    function aoClicarLink(event) {
        let alvo = obterAlvo(this.getAttribute('href'));
        if (!alvo) {
            return;
        }
        event.preventDefault();

        if (window.jQuery) {
            jQuery('html, body').stop().animate({
                scrollTop: jQuery(alvo).offset().top - alturaMenu()
            }, DURACAO_SCROLL);
        } else {
            let topo = alvo.getBoundingClientRect().top + window.pageYOffset - alturaMenu();
            window.scrollTo({ top: topo, behavior: 'smooth' });
        }

        fecharMenuMobile();
    }

    // Ativa o ouvinte de eventos de scroll
    function ativarScroll() {
        let links = document.querySelectorAll('a[href^="#"]');
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener('click', aoClicarLink);
        }
        console.log('[portfolio] scroll suave ativo (' +
            (window.jQuery ? 'jQuery ' + jQuery.fn.jquery : 'fallback nativo') + ')');
    }

    // Inicialização do Scroll
    if (window.jQuery) {
        jQuery(document).ready(ativarScroll);
    } else {
        document.addEventListener('DOMContentLoaded', ativarScroll);
    }
})();

// ==========================================
// CONFIGURAÇÃO DO SCROLLREVEAL
// ==========================================
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal();

    // 1. Hero
    sr.reveal('.secao-hero', {
        origin: 'left',
        distance: '10%',
        duration: 1500,
        easing: 'ease-in-out',
        opacity: 0.5,
        reset: false
    });

    // 2. Sobre
    sr.reveal('.sobre', {
        origin: 'bottom',
        distance: '10%',
        duration: 1500,
        easing: 'ease-in-out',
        delay: 200,
        opacity: 0.2,
        reset: false
    });

    // 3. Habilidades / Processo
    sr.reveal('.secao-tecnologias-processo', {
        origin: 'left',
        distance: '10%',
        duration: 1500,
        easing: 'ease-in-out',
        opacity: 0.2,
        reset: false
    });

    // 4. Projetos
    sr.reveal('.secao-projetos', {
        origin: 'bottom',
        distance: '15%',
        duration: 1500,
        easing: 'ease-in-out',
        delay: 200,
        rotate: { x: 0, y: 20, z: 0 },
        opacity: 0.4,
        reset: false
    });

    // 5. CTA
    sr.reveal('.cta', {
        duration: 1000,
        scale: 0.85,
        distance: '0px',
        opacity: 0.4,
        reset: false
    });

    // 6. Contato
    sr.reveal('.contato', {
        origin: 'left',
        distance: '10%',
        duration: 1500,
        opacity: 0.4,
        easing: 'ease-in-out',
        reset: false
    });
}