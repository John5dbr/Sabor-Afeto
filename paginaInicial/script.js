import {BotaoDeUmFundo} from "../codigoFonte/webComponents.js";
customElements.define('botao-001', BotaoDeUmFundo);

let idDaAnimacao;
let rotacao = 0;
let icone = document.querySelector('.IconeDeCarregamento');
function aplicarAnimacao() { 
    rotacao += 30;
    icone.style.transform = `rotate(${rotacao}deg)`;

    idDaAnimacao = requestAnimationFrame(aplicarAnimacao);
};

function limitarTamanhoDeTexto(text) {
    if (text.length >= 17) {
        return `${text.slice(0, 17)}...`;
    } else {    
        return text;
    }
};

function definirDescricao(receita) {       

    let contadorDeDificuldade = 0;

    let ingred = Object.entries(receita).filter((el, ind) => { if (ind >= 9 && ind <= 28) { return el } });
    ingred.forEach(el => {
        if (el[1] != '') {
            contadorDeDificuldade++
        }
    });

    if (contadorDeDificuldade <= 7) {
        return ['Easy', contadorDeDificuldade];
    } else if (contadorDeDificuldade <= 15) {
        return ['Medium', contadorDeDificuldade];
    } else if (contadorDeDificuldade <= 20) {
        return ['Hard', contadorDeDificuldade];
    }
};

function limparSessaoDeReceitas() {
    let items = [...sessaoParaReceitas.children];
    items.forEach(el => el.remove())
};

let API;

let quantDeElementosParaMostrar = 9;
let quantDeReceitas = document.getElementById('numeroDeItens');

quantDeReceitas.addEventListener('change', () => {
    const quantDefinida = quantDeReceitas.value - 1;
    if (quantDefinida <= 0) {
        quantDeReceitas.classList.add('main__pesquisar__numDeItems--erro');
        quantDeElementosParaMostrar = 4
    } else {
        quantDeReceitas.classList.remove('main__pesquisar__numDeItems--erro');
        quantDeElementosParaMostrar = quantDefinida;
        gerarCard(API);
    };
});

let template = document.createElement('article');
template.classList.add('main__resultado__card');
template.innerHTML = `
    <article class="card__img"></article>
    <p class="card__nome"></p>
    <p class="card__descricao"></p>
    <button class="card__btn" data-id="oi">See recipe</button>
`;

function gerarCard(respDaAPI) {
    if (respDaAPI.meals === null) {
        sessaoParaReceitas.innerText = 'ERROR 404 - Not Found :(';
    } else {
        sessaoParaReceitas.innerText = '';

        let englobador = document.createDocumentFragment();

        respDaAPI.meals.forEach((el, ind) => {
            if (ind <= quantDeElementosParaMostrar) {
                let card = template.cloneNode(true);

                let descricao = definirDescricao(el);

                card.querySelector('.card__img').style.background = `url('${el.strMealThumb}') no-repeat center center / cover`;
                card.querySelector('.card__nome').innerHTML = `${limitarTamanhoDeTexto(el.strMeal)}`;
                card.querySelector('.card__descricao').innerHTML = `Difficulty: ${descricao[0]} <br> Quant. of ingredients: ${descricao[1]}`;
                card.querySelector('.card__btn').dataset.id = el.idMeal;

                englobador.append(card)
            };
        });

        limparSessaoDeReceitas();
        sessaoParaReceitas.append(englobador);
    }
};

let sessaoParaReceitas = document.getElementById('sessaoParaReceitas');

let botaoParaPesquisar = document.getElementById('botaoParaPesquisar');
botaoParaPesquisar.addEventListener('click', pesquisarReceita)
async function pesquisarReceita() {
    icone.classList.toggle('pesquisando');
    requestAnimationFrame(aplicarAnimacao);

    let receitaPesquisada = document.getElementById('pesquisar').value;
    
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${receitaPesquisada}`;

    try {
        let respAPI = await fetch(url);

        if (respAPI.ok) {
            let respAPIemJSON = await respAPI.json();
            API = respAPIemJSON;
            gerarCard(respAPIemJSON);
        } else {
            throw new Error();
        }
    } catch {
        console.error('Erro na requisição');
    } finally {
        cancelAnimationFrame(idDaAnimacao);
        icone.classList.toggle('pesquisando');
        rotacao = 0;
    }
}
document.getElementById('pesquisar').addEventListener('keydown', (event) => { if (event.key === 'Enter') { pesquisarReceita(); }; });

let botaoSearch = document.getElementById('botaoSearch');
botaoSearch.addEventListener('click', () => { 
    document.getElementById('pesquisar').focus();
}); 

sessaoParaReceitas.addEventListener('click', verReceita) 
function verReceita(event) {
    event.stopPropagation();
    const elClicado = event.target;  
  
    if (elClicado.classList.contains('card__btn')) { 
        let ident = elClicado.dataset.id;
        let receitaTransferida = API.meals.find(el => el.idMeal == ident);
        localStorage.setItem('receita', JSON.stringify(receitaTransferida));
        localStorage.setItem('descricao', JSON.stringify(definirDescricao(receitaTransferida)));
        location.replace('../paginaParaReceitas/index.html');
    }
};
