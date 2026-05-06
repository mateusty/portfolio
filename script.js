const main = document.querySelector('main');
const introducao = ['Hello', 'こんにちは', 'Hola', 'Bonjour', 'Ciao', 'Nǐ hǎo', 'Olá', false]

function scrollporSecao(prox) {
    const larguraSecao = prox ? window.innerWidth : -window.innerWidth;
    main.scrollBy({ left: larguraSecao, behavior: "smooth"})
}

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

const observerShow = new IntersectionObserver((entries) => {
    entries.forEach(el => {
        if (el.isIntersecting) {
            el.target.classList.add('show');
        }
        else {
            el.target.classList.remove('show');
        }
    });
}, { threshold: 0.2 });


sections.forEach(s => observer.observe(s));
document.querySelectorAll('.autoShow').forEach(el => observerShow.observe(el));

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

window.addEventListener('DOMContentLoaded', e => {
    introducao.forEach((intr, index) => {
        setTimeout(e => {
            if(!intr) {
                document.getElementsByClassName('introducao')[0].classList.add('fade')
            } else {
                document.getElementById('ola').innerText = `👋 ${intr}`
            }
        }, index * 300)
    })
})