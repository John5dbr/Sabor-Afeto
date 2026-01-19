export class BotaoDeUmFundo extends HTMLElement {
    constructor() {
        super()

        let shadowDOM = this.attachShadow({ mode: 'open' });

        let html = document.createElement('span');
        html.innerHTML = `
            <style> 

                .art {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    font: normal bold 1em var(--fontePrincipal);
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.31);
                    border-radius: 5px;
                    overflow: hidden;

                    position: relative;
                }
                .art__Fundo {
                    position: absolute;
                    z-index: -1;

                    transform: translateY(100%);

                    width: 100%;
                    height: 100%;

                    transition: all 0.25s ease-in-out 0s;
                }
                .art:hover {
                    color: white;
                }
                .art:hover > .art__Fundo {
                    transform: translateY(0%);
                }  
            </style>

            <article class="art">
                <div class="art__Fundo"></div>
                <slot name="text"></slot>
            </article>

        `;

        shadowDOM.append(html);
    };

    static get observedAttributes() {
        return ['cor-de-fundo', 'cor-de-borda', 'largura', 'altura'];
    }

    attributeChangedCallback(atributo, valorAntigo, valorNovo) {
        let fundoDoBotao = this.shadowRoot.querySelector('.art__Fundo');
        let botao = this.shadowRoot.querySelector('.art');

        if (atributo === 'cor-de-fundo') {
            fundoDoBotao.style.background = `${valorNovo}`;
        } else if (atributo === 'cor-de-borda') {
            botao.style.border = `2px solid ${valorNovo}`
        } else if (atributo === 'largura') {
            botao.style.width = `${valorNovo}px`
        } else if (atributo === 'altura') {
            botao.style.height = `${valorNovo}px`
        };
    };

};

export class BordaGiravel extends HTMLElement {
    constructor() {
        super();

        let shadowDOM = this.attachShadow({ mode: 'open' });
        
        let html = document.createElement('div');
        html.innerHTML = `
            <style>
                .cantoSuperiorEsquerdo {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    transform: rotate(0deg);
                }
                .cantoSuperiorDireito {
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    transform: rotate(90deg);
                }
                .cantoInferiorEsquerdo {
                    position: absolute;
                    bottom: 0px;
                    left: 0px;
                    transform: rotate(270deg);
                }                
                .cantoInferiorDireito {
                    position: absolute;
                    bottom: 0px;
                    right: 0px;
                    transform: rotate(180deg);
                }
            </style>
            <img id="img" class="" src="../códigoFonte/recursos/bordaGiravel.png" alt="Fala baixo nengue">
        `;

        shadowDOM.append(html);
    };

    static get observedAttributes() {
        return ['posicao', 'altura', 'largura'];
    };

    attributeChangedCallback(atributo, valorAntigo, valorNovo) {
        let img = this.shadowRoot.querySelector('#img');
        if (atributo === 'posicao') {
            if (valorNovo == 'cantoSuperiorEsquerdo') {
                img.classList.add('cantoSuperiorEsquerdo');
                img.classList.remove('cantoSuperiorDireito');
                img.classList.remove('cantoInferiorEsquerdo');
                img.classList.remove('cantoInferiorDireito');
            } else if (valorNovo == 'cantoSuperiorDireito') {
                img.classList.add('cantoSuperiorDireito');
                img.classList.remove('cantoSuperiorEsquerdo');
                img.classList.remove('cantoInferiorEsquerdo');
                img.classList.remove('cantoInferiorDireito');
            } else if (valorNovo == 'cantoInferiorEsquerdo') {
                img.classList.add('cantoInferiorEsquerdo');
                img.classList.remove('cantoSuperiorDireito');
                img.classList.remove('cantoSuperiorEsquerdo');
                img.classList.remove('cantoInferiorDireito');
            } else if (valorNovo == 'cantoInferiorDireito') {
                img.classList.add('cantoInferiorDireito');
                img.classList.remove('cantoSuperiorDireito');
                img.classList.remove('cantoInferiorEsquerdo');
                img.classList.remove('cantoSuperiorEsquerdo');
            }
        }
        if (atributo === 'altura') {
            img.style.height = `${valorNovo}`;
        }
        if (atributo === 'largura') {
            img.style.width = `${valorNovo}`;
        }
    };

};