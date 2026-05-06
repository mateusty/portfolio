const main = document.querySelector('main');

function scrollporSecao(prox) {
    const larguraSecao = prox ? window.innerWidth : -window.innerWidth;
    main.scrollBy({ left: larguraSecao, behavior: "smooth"})
}

// const container = document.querySelector('main');
window.addEventListener('wheel', e => {
    e.preventDefault();
    e.deltaY > 0 ? scrollporSecao(true) : scrollporSecao(false);
}, { passive: false })

window.addEventListener('keydown', e => {
    if(e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.key === "ArrowLeft" ? scrollporSecao(false) : scrollporSecao(true);
    }
})

const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        const index = Array.from(sections).indexOf(entry.target);
        links.forEach(link => link.classList.remove('ativo'));
        links[index].classList.add('ativo');
    }
    });
}, { threshold: 0.5 });

sections.forEach(s => observer.observe(s));