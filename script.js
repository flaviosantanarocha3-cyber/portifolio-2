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


    // funcao  scroll 
    function ativarScroll() {
        let links = document.querySelectorAll('a[href^="#"]');
        for (let i = 0; i < links.length; i++) {
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

// Instância do ScrollReveal (chame apenas uma vez no arquivo)
const sr = ScrollReveal();

// 1. Hero: Surge de cima para baixo com leve aumento de tamanho (Zoom)
sr.reveal('.secao-hero', {
    origin: 'left',
    distance: '10%',
    duration: 2000,
    easing: 'ease-in-out',
    opacity: 0.5, // Começa levemente visível (20%) em vez de totalmente invisível


    reset: true
});

// 2. Sobre: Desliza suavemente da esquerda para a direita
sr.reveal('.sobre', {
    origin: 'bottom',
    distance: '10%',
    duration: 2000,
    easing: 'ease-in-out',
    delay: 200,
    opacity: 0.2,
    reset: true
});

// 3. Habilidades / Tech Stack: Surgem do fundo com efeito cascata (intervalo entre itens)
sr.reveal('.secao-tecnologias-processo', {
    origin: 'left',
    distance: '10%',
    duration: 2000,
    easing: 'ease-in-out',
    opacity: 0.2,
    reset: true
});

// 4. Projetos: Desliza da direita para a esquerda com leve rotação 3D
sr.reveal('.secao-projetos', {
    origin: 'bottom',
    distance: '15%',
    duration: 2000,
    easing: 'ease-in-out',
    delay: 200,
    opacity: 0.3,
    rotate: { x: 0, y: 20, z: 0 },
    opacity: 0.4,
    reset: false
});

// 5. Experiência / Trajetória: Surge do centro apenas com alteração de escala (Sem deslocamento)
sr.reveal('.cta', {
    duration: 1000,
    scale: 0.85,
    distance: '0px',
    opacity: 0.4,
    reset: false
});

// 6. Contato: Surge de baixo com delay (atraso) proposital
sr.reveal('.contato', {
    origin: 'left',
    distance: '10%',
    duration: 2000,
    opacity: 0.4,
    easing: 'ease-in-out',
    reset: false
});
