let numeroSecreto;
const input = document.querySelector('input');
const nomeDoJogo = 'Jogo do Número Secreto';
const instrucaoInicial = 'Escolha um número entre 1 e 10.';
const msgNumeroEscolhidoNaoAceito = 'O número não pode ser menor que 1 ou maior que 10. Escolha um numero entre 1 e 10';
const btnNovoJogo = document.querySelector('#reiniciar');
const btnChutarNumero = document.querySelector('#btn-chutar');

let qtdTentativas;
let rodada;

//Gera um número aleatório
function gerarNumeroSecreto() {
    return parseInt(Math.random() * 10 + 1)
}

function limpaCampoNumero() {
    input.value = '';
}

function exibirTextoNaTela(tag, texto)  {
    let campo = document.querySelector(tag);
    campo.innerText = texto;
}

//Exibe o título principal e a instrução para começar o jogo
function telaInicial() {
    exibirTextoNaTela('h1', nomeDoJogo);
    exibirTextoNaTela('p', instrucaoInicial);
    limpaCampoNumero();
    
    numeroSecreto = gerarNumeroSecreto();
    qtdTentativas = 0;
    rodada = 0;
} 

// Apresenta mensagem com titulo acertou e a descrição de quantas tentivas foram necessárias para o acerto.
function telaResultado(numeroTentativas) { 
    const txtTentativas = numeroTentativas > 1 ? 'tentativas' : 'tentativa';
    const mensagemAcerto = `Você descobriu o número secreto com ${qtdTentativas} ${txtTentativas}`;
    exibirTextoNaTela('h1', 'Acertou!');
    exibirTextoNaTela('p', mensagemAcerto);
} 

function habilitarDesabilitarBotoes(resultado, tentativas){
    if (resultado == true || tentativas == 5) {
        btnNovoJogo.removeAttribute('disabled');
        btnChutarNumero.setAttribute('disabled', true)
    } else {
        btnChutarNumero.removeAttribute('disabled');
        btnNovoJogo.setAttribute('disabled', true);
    }
}

function msgTentativasRestantes(qtdTentativas){
    return 'Restam ' + (5 - qtdTentativas) + ' tentativa(s)'
}

function verificarChute() { //Verifica se o número escolhido é igual ao número secreto
    rodada++
    const numeroEscolhido = input.value;
    const resultado = numeroEscolhido == numeroSecreto;
    
    if ((numeroEscolhido < 1) || (numeroEscolhido > 10)) {
        limpaCampoNumero()
        exibirTextoNaTela('p', msgNumeroEscolhidoNaoAceito)
    } else {
        qtdTentativas++

        if (resultado == true) {
            telaResultado(qtdTentativas);
            habilitarDesabilitarBotoes(resultado);
        } else {
            limpaCampoNumero()

            if (qtdTentativas == 5) {
                exibirTextoNaTela('h1', 'Game Over');
                exibirTextoNaTela('p', 'Não há mais tentativas' );
                habilitarDesabilitarBotoes(resultado, qtdTentativas)
            } else {
                if (numeroEscolhido > numeroSecreto) {
                    exibirTextoNaTela('p', 'Número Secreto é menor. ' +  msgTentativasRestantes(qtdTentativas));
                } else {
                    exibirTextoNaTela('p', 'Número Secreto é maior. ' +  msgTentativasRestantes(qtdTentativas));
                }
            }
            
        }
  
    }
/** console.log para testes
 
    console.log('rodada '+ rodada)
    console.log('qtd tentativas ' + qtdTentativas)
    console.log('numero escolhido ' + numeroEscolhido)
    console.log('numero secreto ' + numeroSecreto)
    console.log( 'teste lógico ' + resultado);
    console.log('') 
*/
}

function iniciarNovoJogo() {
    resultado = false;
    habilitarDesabilitarBotoes(resultado);
    telaInicial()
}

/*** Iniciando o jogo ***/
telaInicial()