let user;
let userObj;
let promise;
let statusCode;
const messageContainer = document.querySelector(".msg-container");
//entrada do usuário


function nomeAceito(promise) {
    setInterval(conection, 3700);
    atualizarChat();
    setInterval(atualizarChat, 2500);
}
function nomeNaoAceito(erro) {
    user = prompt("Qual seu nome de usuário?");
    userObj = { name: user }
    promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userObj);
    promise.catch(nomeNaoAceito);
    promise.then(nomeAceito);
}
function conection() {
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", userObj);
}
function atualizarChat() {
    promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(preencherNaTela);
}
function preencherNaTela(resposta) {
    messageContainer.innerHTML = "";
    console.log(resposta.data);
    let mensagensPermitidas = resposta.data.filter(filtrarReservadas);
    console.log(mensagensPermitidas);
    for (let i = 0; i < mensagensPermitidas.length; i++) {
        let message = `<div class="msg ${mensagensPermitidas[i].type}">(${mensagensPermitidas[i].time}) <strong>${mensagensPermitidas[i].from}</strong> para <strong>${mensagensPermitidas[i].to}</strong>: ${mensagensPermitidas[i].text}</div>`;
        messageContainer.innerHTML += message;
    }
    document.querySelector(".msg:last-child").scrollIntoView();
}

function filtrarReservadas(array){
    if((array.type==="private_message") && !(array.to===user)){
        return false;
    }
    return true;
}

function enviarMsg() {
    let mensagem = document.querySelector("input").value;
    document.querySelector("input").value = "";
    console.log("este é seu value"+ document.querySelector("input").value);
    let msgObj = {
        from: user,
        to: "Todos",
        text: mensagem,
        type: "message"
    }
    let deuCerto = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", msgObj);
    deuCerto.then(atualizarChat);
    deuCerto.catch(window.location.reload);
}

user = prompt("Qual seu nome de usuário?");
userObj = { name: user }
promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userObj);

promise.then(nomeAceito);
promise.catch(nomeNaoAceito);






