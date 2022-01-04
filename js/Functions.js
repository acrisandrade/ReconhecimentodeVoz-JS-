var engine = {
    "cores": ['green','purple','pink','red','yellow','orange','grey','black'],
    "hexadecimais":{
      'green':'#02EF00',
      'purple':'#790093',
      'pink': '#F02A7E',
      'red':'#E90808',
      'yellow':'#E7D703',
      'orange':'#F16529',
      'grey':'#EBEBEB',
      'black':'#141414',
    },
    //contador de moedas
    "moedas":0
}

const audioMoeda = new Audio('audio/moeda.mp3')
const audioErrou = new Audio('audio/errou.mp3')
function SortearCor(){
   var IndexcorSorteada = Math.floor(Math.random() * engine.cores.length);
   var legendaCorDaCaixa = document.getElementById('cor-na-caixa');
   var NomeCorSorteada = engine.cores[IndexcorSorteada];

   legendaCorDaCaixa.innerText = NomeCorSorteada.toUpperCase();

   return engine.hexadecimais[NomeCorSorteada]
}

function AplicarCorNaCaixa(nomeDaCor){
    var CorDaCaixa = document.getElementById('cor-atual');

    CorDaCaixa.style.backgroundColor = nomeDaCor;
    CorDaCaixa.style.backgroundImage = "url('/img/caixa-fechada.png')"
    CorDaCaixa.style.backgroundSize = "100%";
}

function AtualizaPontuacao(valor){
    var pontuacao = document.getElementById('pontuacao-atual');
    engine.moedas += valor;
if(valor < 0){
    audioErrou.play();
}else{
    audioMoeda.play();
}
    pontuacao.innerText = engine.moedas;
}

AplicarCorNaCaixa(SortearCor())

//Criando API de reconhecimento de voz

var btnGravador = document.getElementById("btn-responder");
var transcricaoAudio = "";
var respostaCorreta = "";


if(window.SpeechRecognition || window.webkitSpeechRecognition){
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var gravador = new SpeechAPI();
    gravador.continuos = false;
    gravador.lang = "en-US";

    gravador.onstart = function(){
        btnGravador.innerText = "Estou Ouvindo";
        btnGravador.style.backgroundColor = "white";
        btnGravador.style.color = "black";
      }
    
      gravador.onend = function(){
        btnGravador.innerText = "Responder";
        btnGravador.style.backgroundColor = "transparent";
        btnGravador.style.color = "white";
      }
    
      gravador.onresult = function(event){
        transcricaoAudio = event.results[0][0].transcript.toUpperCase();
        respostaCorreta = document.getElementById('cor-na-caixa').innerText.toUpperCase();

        
        if(transcricaoAudio === respostaCorreta){
            AtualizaPontuacao (1);

        }else{
            AtualizaPontuacao(-1);
        }
        AplicarCorNaCaixa(SortearCor());
    }
    
}else{
    alert('Ops, seu navegador nao possui Suporte!')
}

btnGravador.addEventListener('click',function(e){
    gravador.start();

})