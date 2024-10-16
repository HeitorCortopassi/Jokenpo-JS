//DECLARAR CONSTANTES + VARIÁVEIS
const TESOURA = 'tesoura', PAPEL = 'papel', PEDRA = 'pedra';
//ARRAY PARA JOGADA ALEATÓRIA DO COMPUTADOR
const mov = ['tesoura', 'papel', 'pedra'];
//ELEMENTOS
const options = document.querySelector('.options');
const msg = document.getElementById('msg');
const userImg = document.querySelector('.user img');
const computadorImg = document.querySelector('.computer img')
//PLACAR
const vitoriaSpan = document.getElementById('v');
const empateSpan = document.getElementById('e');
const derrotaSpan = document.getElementById('d');
//BOTÃO P/ ADICIONAR NOME
const nameBtn = document.getElementById('nameBtn');
const nameInput = document.getElementById('nameInput');
const nameDisplay = document.querySelector('.user p');
//BOTÃO DE RESET
const resetBtn = document.getElementById('resetBtn');

//ARMAZENAR AS ESCOLHAS DO USUÁRIO E DO COMPUTADOR
let userMove = "", computadorMove = "";
//CONTADOR PLACAR
let vitorias = 0;
let empates = 0;
let derrotas = 0;

//EVENTO DE RESET
resetBtn.addEventListener('click', () => {
    vitorias = 0;
    empates = 0;
    derrotas = 0;
    //RESETAR O VALOR DO PLACAR
    vitoriaSpan.textContent = `V: ${vitorias} |`;
    empateSpan.textContent = `E: ${empates} |`;
    derrotaSpan.textContent = `D: ${derrotas}`;
    // LIMPAR A MENSAGEM
    msg.innerHTML = ""; 
    // RESETAR AS IMAGENS
    userImg.src = 'assets/imgs/pedra.png'; 
    computadorImg.src = 'assets/imgs/pedra.png';
});

//EVENTO PARA APLICAR O NOME DO USUÁRIO AO CLICAR NO BOTÃO
nameBtn.addEventListener('click', () => {
    const userName = nameInput.value.trim();
    if (userName) {
        nameDisplay.textContent = userName;
    } else {
        nameDisplay.textContent = 'Usuário'; //SE NÃO ADICIONAR NENHUM NOME, SERÁ DEFINIDO COMO "USUÁRIO"
    }
    nameInput.value = ''; //LIMPAR O CAMPO 
    nameInput.placeholder = 'Altere seu nome'; //ALTERA O PLACEHOLDER
});

//RETORNA UMA DAS 3 OPÇÕES ALEATÓRIAMENTE DO ARRAY MOV[TESOURA, PAPEL, PEDRA]
function getRandomMove() {
    return mov[Math.floor(Math.random() * 3)]
}

console.log(getRandomMove());//TESTE

//EVENTO DE CLIQUE NAS OPÇÕES DE ESCOLHA
options.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if (!id) return; /*Ao clicar na beirada da imagem retornava undefined no userMove
     e a imagem do usuário sumia, por tanto, foi necessário adicionar isto.
     No caso, se o id não existir, não faz nada, apenas retorna. */
    
    computadorMove = getRandomMove(); //DEFINE A JOGADA ALEATÓRIA DO COMPUTADOR
    userMove = id; //DEFINE A JOGADA DO USUÁRIO BASEADO NO ID DA IMAGEM CLICADA

    options.style.pointerEvents = "none"; //IMPEDE O USUÁRIO DE CLICAR NOVAMENTE
    console.log(userMove, computadorMove);

    //ALTERAÇÃO DE IMAGENS E REMOÇÃO DAS ANIMAÇÕES
    userImg.src = `assets/imgs/${userMove}.png`;
    userImg.classList.remove('animation1');

    computadorImg.src = `assets/imgs/${computadorMove}.png`;
    computadorImg.classList.remove('animation2');

    //CHAMAR A FUNÇÃO DE VERIFICAR O VENCEDOR
    checkWinner();
});

//VERIFICAR O VENCEDOR
function checkWinner(){
    //LÓGICA + ALTERAÇÕES DE PLACAR E CSS
    if(userMove == computadorMove) {
        msg.innerHTML = "EMPATE!";
        msg.style.color = "var(--gray)"
        empates++;
        empateSpan.textContent = `E: ${empates} |`;
    } else if((userMove == TESOURA && computadorMove == PAPEL) ||
        (userMove == PAPEL && computadorMove == PEDRA) ||
        (userMove == PEDRA && computadorMove == TESOURA)
    ) {
        msg.innerHTML = "VOCÊ GANHOU!";
        msg.style.color = "var(--green)"
        vitorias++;
        vitoriaSpan.textContent = `V: ${vitorias} |`;
    } else {
        msg.innerHTML = "VOCÊ PERDEU!";
        msg.style.color = "var(--red)"
        derrotas++;
        derrotaSpan.textContent = `D: ${derrotas}`;
    }

    //CHAMAR FUNÇÃO PRA RECOMEÇAR A RODADA
    restart();
}

//RECOMEÇAR A RODADA
function restart(){
    setTimeout(() => {
        computadorMove = getRandomMove();
        msg.innerHTML = "";
        userImg.src = 'assets/imgs/pedra.png';
        userImg.classList.add('animation1');
        computadorImg.src = 'assets/imgs/pedra.png';
        computadorImg.classList.add('animation2');
        options.style.pointerEvents = "";
    }, 2000); //REINICIAR O JOGO APÓS 2 SEGUNDOS RESETANDO OS DADOS PADRÕES
}
