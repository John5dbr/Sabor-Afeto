import {BotaoDeUmFundo, BordaGiravel} from '../códigoFonte/webComponents.js';
customElements.define('botao-001', BotaoDeUmFundo);
customElements.define('borda-giravel', BordaGiravel);

window.addEventListener('DOMContentLoaded', () => {
    let receita = JSON.parse(localStorage.getItem('receita'));
    let descricao = JSON.parse(localStorage.getItem('descricao'));
    let paraApresentacao = {
        nome: receita.strMeal,
        dific: descricao[0],
        quantDeIngr: descricao[1]
    };

    let nome = document.getElementById('nome');
    nome.innerText = `${paraApresentacao.nome}`;
    let dific = document.getElementById('dific');
    dific.innerText = `Difficulty: ${paraApresentacao.dific}`;
    let quantDeIngr = document.getElementById('quantDeIngr');
    quantDeIngr.innerText = `Quantity of ingredients: ${paraApresentacao.quantDeIngr}`;

    console.log(receita)

    let template = document.createElement('aside');
    template.classList.add('ingredientes__cadaUm');
    template.innerHTML = `
        <p class="ingredientes__cadaUm__nome"></p>
        <p class="ingredientes__cadaUm__medida"></p>
    `;

    let ingredientes = [];
    let medidaDosIngr = [];

    let sessaoParaIngredientes = document.getElementById('ingred');
    let englobador = document.createDocumentFragment();

    ingredientes.push(receita.strIngredient1);
    ingredientes.push(receita.strIngredient2);
    ingredientes.push(receita.strIngredient3);
    ingredientes.push(receita.strIngredient4);
    ingredientes.push(receita.strIngredient5);
    ingredientes.push(receita.strIngredient6);
    ingredientes.push(receita.strIngredient7);
    ingredientes.push(receita.strIngredient8);
    ingredientes.push(receita.strIngredient9);
    ingredientes.push(receita.strIngredient10);
    ingredientes.push(receita.strIngredient11);
    ingredientes.push(receita.strIngredient12);
    ingredientes.push(receita.strIngredient13);
    ingredientes.push(receita.strIngredient14);
    ingredientes.push(receita.strIngredient15);
    ingredientes.push(receita.strIngredient16);
    ingredientes.push(receita.strIngredient17);
    ingredientes.push(receita.strIngredient18);
    ingredientes.push(receita.strIngredient19);
    ingredientes.push(receita.strIngredient20);

    medidaDosIngr.push(receita.strMeasure1);
    medidaDosIngr.push(receita.strMeasure2);
    medidaDosIngr.push(receita.strMeasure3);
    medidaDosIngr.push(receita.strMeasure4);
    medidaDosIngr.push(receita.strMeasure5);
    medidaDosIngr.push(receita.strMeasure6);
    medidaDosIngr.push(receita.strMeasure7);
    medidaDosIngr.push(receita.strMeasure8);
    medidaDosIngr.push(receita.strMeasure9);
    medidaDosIngr.push(receita.strMeasure10);
    medidaDosIngr.push(receita.strMeasure11);
    medidaDosIngr.push(receita.strMeasure12);
    medidaDosIngr.push(receita.strMeasure13);
    medidaDosIngr.push(receita.strMeasure14);
    medidaDosIngr.push(receita.strMeasure15);
    medidaDosIngr.push(receita.strMeasure16);
    medidaDosIngr.push(receita.strMeasure17);
    medidaDosIngr.push(receita.strMeasure18);
    medidaDosIngr.push(receita.strMeasure19);
    medidaDosIngr.push(receita.strMeasure20);


    ingredientes.forEach((el, ind) => {
        if (el === '' || el === null) {
            return;
        } else {
            let umIngrediente = template.cloneNode(true);
            let nome = umIngrediente.querySelector('.ingredientes__cadaUm__nome');
            nome.innerText = `${el}`; 
            let medida = umIngrediente.querySelector('.ingredientes__cadaUm__medida');
            medida.innerText = `${medidaDosIngr[ind]}`;
            englobador.append(umIngrediente);
        }   
    });

    sessaoParaIngredientes.append(englobador);

    function construirIframe(respDaAPI) {
        let sessaoTutorial = document.getElementById('iframe');
        if (respDaAPI === false) {
            sessaoTutorial.classList.add('main__tutorial__iframe--error');
            sessaoTutorial.classList.remove('main__tutorial__iframe');
            sessaoTutorial.innerText = `Error 404 on Tutorial - Not Found :(`;
        } else {
            sessaoTutorial.innerHTML = `${respDaAPI}`;
            let iframe = sessaoTutorial.querySelectorAll('iframe')[0];
            iframe.width = '455';
            iframe.height = '255';
        }
    };
    async function conseguindoLinkDeIncorporacao() {    
        let urlParaIframe = receita.strYoutube;
        try {
            let respAPI = await fetch(`http://noembed.com/embed?url=${urlParaIframe}`); 
            if (respAPI.ok) {
                let respAPIemJSON = await respAPI.json();
                let htmlDoIframe = respAPIemJSON.html;
                construirIframe(htmlDoIframe);
            } else {
                throw new Error();
            }
        } catch(e) {
            construirIframe(false);
            console.error(`Erro na requisição - ${e}`);
        };

    }; conseguindoLinkDeIncorporacao();

    let sessaoInstrucao = document.getElementById('sessaoInstrucao');
    let instrucoes = document.createElement('p')
    instrucoes.innerText = `${receita.strInstructions}`;
    sessaoInstrucao.append(instrucoes)

    async function definirImagens(pesquisa) {

        let img1 = document.getElementById('img1');
        let img2 = document.getElementById('img2');
        let img3 = document.getElementById('img3');

        let chaveDeAcesso = 'f9qtqUUDQ_zHOZMcPnIMIqpQ8FUT70iLI4Ge3HnNDso';
        let url = `https://api.unsplash.com/search/photos?page=1&query=${pesquisa}&client_id=${chaveDeAcesso}`;

        let urlParaImgs = [];

        try {
            let respAPI = await fetch(url);

            if (respAPI.ok) {
                let respAPIemJSON = await respAPI.json();
                urlParaImgs.push(respAPIemJSON.results[0].urls.full);
                urlParaImgs.push(respAPIemJSON.results[1].urls.full);
                urlParaImgs.push(respAPIemJSON.results[2].urls.full);
            }
        } catch(e) {
            console.error(`Erro na requisição | ${e}`);
        };

        img1.style.background = `white url('${urlParaImgs[0]}') no-repeat center center / cover`;
        img2.style.background = `white url('${receita.strMealThumb}') no-repeat center center / cover`;
        img3.style.background = `white url('${urlParaImgs[2]}') no-repeat center center / cover`;

    }; definirImagens(paraApresentacao.nome);

    let sessaoDeImagens = document.getElementById('imgs');
    let imgs = [...document.getElementById('imgs').children];
    let posicoes = ['', imgs[0], imgs[1], imgs[2], ''];

    function definirEstilizacaoDasImg() {
        posicoes.forEach((el, ind) => {
            if (ind === 0 && el != '') {
                el.removeAttribute('class');
                el.classList.add('posicao0')
            } else if (ind === 1 && el != '') {
                el.removeAttribute('class');
                el.classList.add('posicao1')
            } else if (ind === 2 && el != '') {
                el.removeAttribute('class');
                el.classList.add('posicao2')
            } else if (ind === 3 && el != '') {
                el.removeAttribute('class');
                el.classList.add('posicao3')
            } else if (ind === 4 && el != '') {
                el.removeAttribute('class');
                el.classList.add('posicao4')
            }
        });
    };

    if (window.innerWidth >= 1100) { 
        sessaoDeImagens.style.transform = `translateX(0%) translateY(0%)`; 
        posicoes = ['', imgs[0], imgs[1], imgs[2], ''];
        definirEstilizacaoDasImg();

        let translateX = 0;

        let btnMoverParaEsquerda = document.getElementById('moverImgParaEsquerda');
        btnMoverParaEsquerda.addEventListener('click', moverImgParaEsquerda);
        function moverImgParaEsquerda() {
        
            let primeiroEl = posicoes.findIndex(el => el != '' );
            let segundoEl = primeiroEl + 1;
            let terceiroEl = segundoEl + 1;
            
            if (posicoes[0] == '' && posicoes[1] == '') {
                return;
            } else {
                let novasPosicoes = posicoes.map((el, ind) => {
                    if (ind === terceiroEl + 1) { 
                        return posicoes[terceiroEl];
                    } else if (ind === segundoEl + 1) {
                        return posicoes[segundoEl]; 
                    } else if (ind === primeiroEl + 1) {
                        return posicoes[primeiroEl];
                    } else {
                        return '';
                    }
                });
                posicoes = novasPosicoes;
            }
            

            translateX += 33.6
            sessaoDeImagens.style.transform = `translateX(${translateX}%)`;
            definirEstilizacaoDasImg();

        };

        let btnMoverParaDireita = document.getElementById('moverImgParaDireita');
        btnMoverParaDireita.addEventListener('click', moverImgParaDireita);
        function moverImgParaDireita() {

            let primeiroEl = posicoes.findIndex(el => el != '' );
            let segundoEl = primeiroEl + 1;
            let terceiroEl = segundoEl + 1;
            
            if (posicoes[3] == '' && posicoes[4] == '') {
                return;
            } else {
                let novasPosicoes = posicoes.map((el, ind) => {
                    if (ind === primeiroEl - 1) {
                        return posicoes[primeiroEl];
                    } else if (ind === segundoEl - 1) {
                        return posicoes[segundoEl]; 
                    } else if (ind === terceiroEl - 1) { 
                        return posicoes[terceiroEl];
                    } else {
                        return '';
                    }
                });
                posicoes = novasPosicoes;
            }

            translateX -= 33.6
            sessaoDeImagens.style.transform = `translateX(${translateX}%)`;
            definirEstilizacaoDasImg();

        };
    } else {  
        sessaoDeImagens.style.transform = `translateX(0%) translateY(0%)`; 
        posicoes = ['', imgs[0], imgs[1], imgs[2], ''];
        definirEstilizacaoDasImg();

        let translateY = 0;

        let btnMoverParaEsquerda = document.getElementById('moverImgParaEsquerda');
        btnMoverParaEsquerda.addEventListener('click', moverImgParaEsquerda);
        function moverImgParaEsquerda() {

            let primeiroEl = posicoes.findIndex(el => el != '' );
            let segundoEl = primeiroEl + 1;
            let terceiroEl = segundoEl + 1;
            
            if (posicoes[0] == '' && posicoes[1] == '') {
                return;
            } else {
                let novasPosicoes = posicoes.map((el, ind) => {
                    if (ind === terceiroEl + 1) { 
                        return posicoes[terceiroEl];
                    } else if (ind === segundoEl + 1) {
                        return posicoes[segundoEl]; 
                    } else if (ind === primeiroEl + 1) {
                        return posicoes[primeiroEl];
                    } else {
                        return '';
                    }
                });
                posicoes = novasPosicoes;
            }
            

            translateY += 33.6
            sessaoDeImagens.style.transform = `translateY(${translateY}%)`;
            definirEstilizacaoDasImg();

        };

        let btnMoverParaDireita = document.getElementById('moverImgParaDireita');
        btnMoverParaDireita.addEventListener('click', moverImgParaDireita);
        function moverImgParaDireita() {

            let primeiroEl = posicoes.findIndex(el => el != '' );
            let segundoEl = primeiroEl + 1;
            let terceiroEl = segundoEl + 1;
            
            if (posicoes[3] == '' && posicoes[4] == '') {
                return;
            } else {
                let novasPosicoes = posicoes.map((el, ind) => {
                    if (ind === primeiroEl - 1) {
                        return posicoes[primeiroEl];
                    } else if (ind === segundoEl - 1) {
                        return posicoes[segundoEl]; 
                    } else if (ind === terceiroEl - 1) { 
                        return posicoes[terceiroEl];
                    } else {
                        return '';
                    }
                });
                posicoes = novasPosicoes;
            }

            translateY -= 33.6
            sessaoDeImagens.style.transform = `translateY(${translateY}%)`;

            definirEstilizacaoDasImg();

        };
    };
});

window.addEventListener('resize', aplicandoResponsividade);
function aplicandoResponsividade() {
    let sessaoDeImagens = document.getElementById('imgs');
    let imgs = [...document.getElementById('imgs').children];
    let posicoes = ['', imgs[0], imgs[1], imgs[2], ''];

    function definirEstilizacaoDasImg() {
        posicoes.forEach((el, ind) => {
            if (ind === 0 && el != '') {
                el.removeAttribute('class');
                el.classList.add('posicao0')
            } else if (ind === 1 && el != '') {
                el.removeAttribute('class');
                el.classList.add('posicao1')
            } else if (ind === 2 && el != '') {
                el.removeAttribute('class');
                el.classList.add('posicao2')
            } else if (ind === 3 && el != '') {
                el.removeAttribute('class');
                el.classList.add('posicao3')
            } else if (ind === 4 && el != '') {
                el.removeAttribute('class');
                el.classList.add('posicao4')
            }
        });
    };

    if (window.innerWidth >= 1100) { 
        sessaoDeImagens.style.transform = `translateX(0%) translateY(0%)`; 
        posicoes = ['', imgs[0], imgs[1], imgs[2], ''];
        definirEstilizacaoDasImg();

        let translateX = 0;

        let btnMoverParaEsquerda = document.getElementById('moverImgParaEsquerda');
        btnMoverParaEsquerda.addEventListener('click', moverImgParaEsquerda);
        function moverImgParaEsquerda() {
        
            let primeiroEl = posicoes.findIndex(el => el != '' );
            let segundoEl = primeiroEl + 1;
            let terceiroEl = segundoEl + 1;
            
            if (posicoes[0] == '' && posicoes[1] == '') {
                return;
            } else {
                let novasPosicoes = posicoes.map((el, ind) => {
                    if (ind === terceiroEl + 1) { 
                        return posicoes[terceiroEl];
                    } else if (ind === segundoEl + 1) {
                        return posicoes[segundoEl]; 
                    } else if (ind === primeiroEl + 1) {
                        return posicoes[primeiroEl];
                    } else {
                        return '';
                    }
                });
                posicoes = novasPosicoes;
            }
            

            translateX += 33.6
            sessaoDeImagens.style.transform = `translateX(${translateX}%)`;
            definirEstilizacaoDasImg();

        };

        let btnMoverParaDireita = document.getElementById('moverImgParaDireita');
        btnMoverParaDireita.addEventListener('click', moverImgParaDireita);
        function moverImgParaDireita() {

            let primeiroEl = posicoes.findIndex(el => el != '' );
            let segundoEl = primeiroEl + 1;
            let terceiroEl = segundoEl + 1;
            
            if (posicoes[3] == '' && posicoes[4] == '') {
                return;
            } else {
                let novasPosicoes = posicoes.map((el, ind) => {
                    if (ind === primeiroEl - 1) {
                        return posicoes[primeiroEl];
                    } else if (ind === segundoEl - 1) {
                        return posicoes[segundoEl]; 
                    } else if (ind === terceiroEl - 1) { 
                        return posicoes[terceiroEl];
                    } else {
                        return '';
                    }
                });
                posicoes = novasPosicoes;
            }

            translateX -= 33.6
            sessaoDeImagens.style.transform = `translateX(${translateX}%)`;
            definirEstilizacaoDasImg();

        };
    } else {  
        sessaoDeImagens.style.transform = `translateX(0%) translateY(0%)`; 
        posicoes = ['', imgs[0], imgs[1], imgs[2], ''];
        definirEstilizacaoDasImg();

        let translateY = 0;

        let btnMoverParaEsquerda = document.getElementById('moverImgParaEsquerda');
        btnMoverParaEsquerda.addEventListener('click', moverImgParaEsquerda);
        function moverImgParaEsquerda() {

            let primeiroEl = posicoes.findIndex(el => el != '' );
            let segundoEl = primeiroEl + 1;
            let terceiroEl = segundoEl + 1;
            
            if (posicoes[0] == '' && posicoes[1] == '') {
                return;
            } else {
                let novasPosicoes = posicoes.map((el, ind) => {
                    if (ind === terceiroEl + 1) { 
                        return posicoes[terceiroEl];
                    } else if (ind === segundoEl + 1) {
                        return posicoes[segundoEl]; 
                    } else if (ind === primeiroEl + 1) {
                        return posicoes[primeiroEl];
                    } else {
                        return '';
                    }
                });
                posicoes = novasPosicoes;
            }
            

            translateY += 33.6
            sessaoDeImagens.style.transform = `translateY(${translateY}%)`;
            definirEstilizacaoDasImg();

        };

        let btnMoverParaDireita = document.getElementById('moverImgParaDireita');
        btnMoverParaDireita.addEventListener('click', moverImgParaDireita);
        function moverImgParaDireita() {

            let primeiroEl = posicoes.findIndex(el => el != '' );
            let segundoEl = primeiroEl + 1;
            let terceiroEl = segundoEl + 1;
            
            if (posicoes[3] == '' && posicoes[4] == '') {
                return;
            } else {
                let novasPosicoes = posicoes.map((el, ind) => {
                    if (ind === primeiroEl - 1) {
                        return posicoes[primeiroEl];
                    } else if (ind === segundoEl - 1) {
                        return posicoes[segundoEl]; 
                    } else if (ind === terceiroEl - 1) { 
                        return posicoes[terceiroEl];
                    } else {
                        return '';
                    }
                });
                posicoes = novasPosicoes;
            }

            translateY -= 33.6
            sessaoDeImagens.style.transform = `translateY(${translateY}%)`;

            definirEstilizacaoDasImg();

        };
    };
};

let btnRetornar = document.getElementById('btnRetornar');
btnRetornar.addEventListener('click', () => { location.replace('../páginaInicial/index.html'); });
