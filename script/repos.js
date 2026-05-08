async function getRepos() {
    try {
        const res = await fetch('https://api.github.com/users/mateusty/repos')
        const repos = await res.json();

        return repos;
    } catch (error) {
        console.log('Erro: ' + error);
    }
}

async function loadRepoCards() {
    let repos = await getRepos();
    const cardContainer = document.querySelector('.card-container')
    
    repos = repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 4);
    console.log(repos);

    repos.forEach( (repo, index) => {
        const card = document.createElement('div');
        card.classList.add('autoShow')
        card.classList.add('medium')
        card.classList.add('card');
        card.classList.add('repo');
        card.id = `${index + 1}`

        if(repo.name === repo.owner.login) {
            card.innerHTML = `<div><a href="${repo.html_url}" class="card-github-icon"></a><h3>${repo.name}</h3></div><p style="display: block">Repositório para o Readme.md do perfil github</p>`
        }
        else {
            card.innerHTML = `<div><a href="${repo.html_url}" class="card-github-icon"></a><h3>${repo.name}</h3></div><p style="display: block">${repo.description || 'Este repositório não contém descrição!'}</p>`
        }

        cardContainer.appendChild(card);
    })
}

loadRepoCards();