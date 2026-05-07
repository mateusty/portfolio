const root = document.documentElement;
const main = document.querySelector('main');
const introducao = ['Hola!', 'Bonjour!', 'Ciao!', 'Nǐ hǎo!', 'こんにちは!', 'Olá!', false]


function toggleLightMode() {
    let rs = getComputedStyle(root);
    const isDark = rs.getPropertyValue('--shade-1').trim() === '#141414';

    if( isDark ) {
        root.style.setProperty('--shade-1', '#d6d6d6')
        root.style.setProperty('--shade-2', '#979797')
        root.style.setProperty('--shade-3', '#444444')
        root.style.setProperty('--shade-4', '#141414')
    }
    else {
        root.style.setProperty('--shade-1', '#141414')
        root.style.setProperty('--shade-2', '#444444')
        root.style.setProperty('--shade-3', '#979797')
        root.style.setProperty('--shade-4', '#d6d6d6')
    }
}

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
        const intercessao = el.isIntersecting; 
        if (intercessao && el.target.classList.contains('slow')) {
            el.target.classList.add('showSlow');
        }
        else if (intercessao && el.target.classList.contains('medium')) {
            el.target.classList.add('showMedium');
        }
        else if (intercessao && el.target.classList.contains('fast')) {
            el.target.classList.add('showFast');
        }
        else {
            el.target.classList.remove('showSlow');
            el.target.classList.remove('showMedium');
            el.target.classList.remove('showFast');
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
    if (e.repeat) return;
    if(e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.key === "ArrowLeft" ? scrollporSecao(false) : scrollporSecao(true);
    }
})

window.addEventListener('DOMContentLoaded', e => {
    setTimeout(i => {
        introducao.forEach((intr, index) => {
            setTimeout(e => {
                if(!intr) {
                    document.getElementsByClassName('introducao')[0].classList.add('fade')
                    main.classList.remove('introducao-main')
                } else {
                    document.getElementById('ola').innerText = `👋 ${intr}`
                }
            }, index * 250)
        })
    }, 500)
    
})