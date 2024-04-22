const form = document.getElementById("formBanco");
const display = document.getElementById("displayResult");
let saldo = 0;
let agencia = "";
let conta = "";

form.addEventListener("submit", event => {
    event.preventDefault();

    agencia = document.getElementById("agenciaInput").value;
    conta = document.getElementById("contaInput").value;
    const operacao = document.getElementById("selecionarOperacao").value;

    switch(operacao){
        case "consultar":
            consultarSaldo();
            break;
        case "depositar":
            depositar();
            break;
        case "sacar":
            sacar();
            break;
        default:
            break;    
    }
});

function criarCartao(agencia, conta, saldo) {
    const cartao = document.createElement('div');
    cartao.classList.add('cartao');

    const agenciaElement = document.createElement('p');
    agenciaElement.textContent = `Agência: ${agencia}`;

    const contaElement = document.createElement('p');
    contaElement.textContent = `Conta: ${conta}`;

    const saldoElement = document.createElement('p');
    saldoElement.textContent = `Saldo: R$${saldo.toFixed(2)}`;

    cartao.appendChild(agenciaElement);
    cartao.appendChild(contaElement);
    cartao.appendChild(saldoElement);

    return cartao;
}

function consultarSaldo(){
    const agencia = document.getElementById('agenciaInput').value;
    const conta = document.getElementById('contaInput').value;
    
    const cartaoExistente = document.querySelector('.cartao');
    if (cartaoExistente) {
        cartaoExistente.remove();
    }

    const novoCartao = criarCartao(agencia, conta, saldo);
    display.appendChild(novoCartao);
}


function depositar(){
    const valorDepositado = parseFloat(
        prompt("Informe o valor para depósito: ")
    );
    if(valorDepositado >= 0){
        saldo += valorDepositado;
        consultarSaldo();
    } else {
        alert("O valor de depósito deve ser maior que zero!");
    }
}

function sacar(){
    const valorSaque = parseFloat(
        prompt("Informe o valor para saque: ")
    );
    if(valorSaque > saldo){
        alert("Saldo insuficiente para realizar o saque.");
    } else {
        saldo -= valorSaque;
        consultarSaldo();
    }
}
