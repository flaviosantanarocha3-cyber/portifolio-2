gsap.registerPlugin(ScrollTrigger);

const tlHero = gsap.timeline({

    defaults: { duration: 1, ease: "power2.out" }
});

tlHero.from([

    ".hero-nome-pequeno",
    ".hero-titulo-roxo",
    ".hero-titulo-branco",
    ".hero-descricao",
    ".hero-botao"

], {

    opacity: 0,
    y: 60,
    stagger: .16

})

    .from(".hero-imagem", {

        opacity: 0,
        y: 100,


    }, "-=0.7");

// Pega todas as seções da página
const secoes = gsap.utils.toArray("section");

// .slice(1) ignora a primeira seção (Hero) e pega apenas a partir da segunda
secoes.slice(1).forEach((secao) => {

  // Anima o conteúdo da seção quando ela entra na tela
  const elementosAnimar = secao.querySelectorAll("h2, .projeto-card, .skill-item, .processo-item, .contato-item, .campo-form");

  if (elementosAnimar.length > 0) {
    gsap.from(elementosAnimar, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: secao,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }

});



