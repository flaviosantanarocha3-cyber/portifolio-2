/* ==========================================================================
   SCRIPT PRINCIPAL — PORTFÓLIO FLÁVIO SANTANA
   --------------------------------------------------------------------------
   JavaScript puro (Vanilla JS), modular e sem dependências externas.
   Responsável por:
   1. Menu mobile (hambúrguer) e estado do cabeçalho ao rolar
   2. Rolagem suave entre seções (descontando o menu fixo)
   3. Destaque do link ativo no menu (scroll spy)
   4. Animações de revelação ao rolar (IntersectionObserver)
   5. Botão "voltar ao topo"
   6. Envio do formulário de contato (Formspree via fetch)
   7. Ano dinâmico no rodapé
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------
     REFERÊNCIAS AOS ELEMENTOS DO DOM
     ------------------------------------------------------------------ */
  const raiz = document.documentElement;
  const menu = document.querySelector('.menu');
  const botaoHamburguer = document.getElementById('btn-hamburguer');
  const menuLista = document.getElementById('menu-lista');
  const linksMenu = document.querySelectorAll('.menu-link');
  const secoes = document.querySelectorAll('main section[id]');
  const elementosRevelar = document.querySelectorAll('[data-revelar]');
  const botaoTopo = document.getElementById('botao-topo');
  const formulario = document.getElementById('formulario-contato');
  const feedback = document.getElementById('formulario-feedback');
  const anoAtual = document.getElementById('ano-atual');

  /* Ativa a folha de estilo que depende de JavaScript
     (as animações de revelação só escondem o conteúdo com JS ativo) */
  raiz.classList.add('js');

  /* ------------------------------------------------------------------
     UTILITÁRIOS
     ------------------------------------------------------------------ */

  // Altura atual do menu fixo (usada como deslocamento na rolagem)
  function alturaMenu() {
    return menu ? menu.offsetHeight : 0;
  }

  // Encontra o elemento de destino de um link de âncora
  function obterAlvo(href) {
    if (!href || href.length <= 1) {
      return null;
    }
    try {
      return document.querySelector(href);
    } catch (erro) {
      return null;
    }
  }

  /* ------------------------------------------------------------------
     1. MENU MOBILE (HAMBÚRGUER)
     ------------------------------------------------------------------ */

  function alternarMenu() {
    const estaAberto = menu.classList.toggle('menu-aberto');
    botaoHamburguer.setAttribute('aria-expanded', String(estaAberto));
    botaoHamburguer.setAttribute('aria-label', estaAberto ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = estaAberto ? 'hidden' : '';
  }

  function fecharMenu() {
    if (!menu.classList.contains('menu-aberto')) {
      return;
    }
    menu.classList.remove('menu-aberto');
    botaoHamburguer.setAttribute('aria-expanded', 'false');
    botaoHamburguer.setAttribute('aria-label', 'Abrir menu');
    document.body.style.overflow = '';
  }

  function configurarMenuMobile() {
    botaoHamburguer.addEventListener('click', alternarMenu);

    // Fecha ao pressionar a tecla Escape
    document.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape') {
        fecharMenu();
      }
    });

    // Fecha ao clicar fora do painel
    document.addEventListener('click', (evento) => {
      const clicouFora = !menuLista.contains(evento.target) &&
        !botaoHamburguer.contains(evento.target);
      if (clicouFora) {
        fecharMenu();
      }
    });
  }

  /* ------------------------------------------------------------------
     2. ESTADO DO CABEÇALHO AO ROLAR (sombra / compacto)
     ------------------------------------------------------------------ */

  function atualizarMenuRolagem() {
    menu.classList.toggle('menu-rolado', window.scrollY > 12);
  }

  /* ------------------------------------------------------------------
     3. ROLAGEM SUAVE ENTRE SEÇÕES
     ------------------------------------------------------------------ */

  function rolarAteAlvo(alvo) {
    const topo = alvo.getBoundingClientRect().top + window.scrollY - alturaMenu() - 8;
    window.scrollTo({ top: Math.max(topo, 0), behavior: 'smooth' });
  }

  function configurarRolagemSuave() {
    const linksAncora = document.querySelectorAll('a[href^="#"]');
    linksAncora.forEach((link) => {
      link.addEventListener('click', (evento) => {
        const alvo = obterAlvo(link.getAttribute('href'));
        if (!alvo) {
          return;
        }
        evento.preventDefault();
        rolarAteAlvo(alvo);
        fecharMenu();
      });
    });
  }

  /* ------------------------------------------------------------------
     4. SCROLL SPY — DESTACAR LINK ATIVO
     ------------------------------------------------------------------ */

  function configurarScrollSpy() {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) {
          return;
        }
        const id = entrada.target.getAttribute('id');
        linksMenu.forEach((link) => {
          const estaAtivo = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('ativo', estaAtivo);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    secoes.forEach((secao) => observador.observe(secao));
  }

  /* ------------------------------------------------------------------
     5. ANIMAÇÕES DE REVELAÇÃO AO ROLAR
     ------------------------------------------------------------------ */

  function configurarRevelacao() {
    if (!('IntersectionObserver' in window)) {
      elementosRevelar.forEach((elemento) => elemento.classList.add('revelado'));
      return;
    }

    const observador = new IntersectionObserver((entradas, observadorAtual) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) {
          return;
        }
        entrada.target.classList.add('revelado');
        observadorAtual.unobserve(entrada.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elementosRevelar.forEach((elemento) => observador.observe(elemento));
  }

  /* ------------------------------------------------------------------
     6. BOTÃO VOLTAR AO TOPO
     ------------------------------------------------------------------ */

  function configurarBotaoTopo() {
    if (!botaoTopo) {
      return;
    }

    function atualizarVisibilidade() {
      botaoTopo.classList.toggle('visivel', window.scrollY > 620);
    }

    botaoTopo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', atualizarVisibilidade, { passive: true });
    atualizarVisibilidade();
  }

  /* ------------------------------------------------------------------
     7. FORMULÁRIO DE CONTATO (FORMSPREE VIA FETCH)
     ------------------------------------------------------------------ */

  function mostrarFeedback(mensagem, tipo) {
    if (!feedback) {
      return;
    }
    feedback.textContent = mensagem;
    feedback.className = 'formulario-feedback visivel ' + tipo;
  }

  function configurarFormulario() {
    if (!formulario) {
      return;
    }

    formulario.addEventListener('submit', async (evento) => {
      evento.preventDefault();

      if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
      }

      const botao = formulario.querySelector('.botao-form');
      const textoBotao = botao.querySelector('.botao-form-texto');

      botao.disabled = true;
      textoBotao.textContent = 'Enviando...';
      feedback.className = 'formulario-feedback';

      try {
        const resposta = await fetch(formulario.action, {
          method: 'POST',
          body: new FormData(formulario),
          headers: { Accept: 'application/json' }
        });

        if (!resposta.ok) {
          throw new Error('Falha no envio');
        }

        mostrarFeedback('Mensagem enviada com sucesso! Em breve entrarei em contato.', 'sucesso');
        formulario.reset();
      } catch (erro) {
        mostrarFeedback(
          'Não foi possível enviar a mensagem. Tente novamente ou envie um e-mail direto.',
          'erro'
        );
      } finally {
        botao.disabled = false;
        textoBotao.textContent = 'Enviar Mensagem';
      }
    });
  }

  /* ------------------------------------------------------------------
     8. ANO DINÂMICO NO RODAPÉ
     ------------------------------------------------------------------ */

  function configurarAnoAtual() {
    if (anoAtual) {
      anoAtual.textContent = String(new Date().getFullYear());
    }
  }

  /* ------------------------------------------------------------------
     INICIALIZAÇÃO
     ------------------------------------------------------------------ */

  function iniciar() {
    configurarMenuMobile();
    configurarRolagemSuave();
    configurarScrollSpy();
    configurarRevelacao();
    configurarBotaoTopo();
    configurarFormulario();
    configurarAnoAtual();

    window.addEventListener('scroll', atualizarMenuRolagem, { passive: true });
    atualizarMenuRolagem();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
