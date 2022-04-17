let user;
let userObj;
let promise;
let statusCode;
const messageContainer = document.querySelector(".msg-container");
//entrada do usuário


function nomeAceito(promise) {
    console.log("beleza");
    setInterval(conection, 3700);
    atualizarChat();
    setInterval(atualizarChat, 2500);
}
function nomeNaoAceito(erro) {
    console.log("koee");
    user = prompt("Qual seu nome de usuário?");
    userObj = { name: user }
    promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userObj);
    promise.catch(nomeNaoAceito);
    promise.then(nomeAceito);
}
function conection() {
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", userObj);
    console.log("online");
}
function atualizarChat() {
    promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(preencherNaTela);
}
function preencherNaTela(resposta) {
    messageContainer.innerHTML = "";
    for (let i = 0; i < resposta.data.length; i++) {
        let message = `<div class="msg ${resposta.data[i].type}">(${resposta.data[i].time}) <strong>${resposta.data[i].from}</strong> para <strong>${resposta.data[i].to}</strong>: ${resposta.data[i].text}</div>`;
        messageContainer.innerHTML += message;
    }
    document.querySelector(".msg:last-child").scrollIntoView();
}

user = prompt("Qual seu nome de usuário?");
userObj = { name: user }
promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userObj);

promise.then(nomeAceito);
promise.catch(nomeNaoAceito);






