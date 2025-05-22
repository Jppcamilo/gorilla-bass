let vidaGorila = 100;
let humanos = Array(100).fill(true);
let ataquesFeitos = 0;
let cooldown = false;
let cooldownCura = false;


const humanosContainer = document.getElementById('humanos');

function desenharHumanos() {
  humanosContainer.innerHTML = '';  

  humanos.forEach((vivo, index) => {
    const img = document.createElement('img');
    img.src = '../assets/humanos.png';  
    img.alt = `Humano ${index + 1}`;
    img.classList.add('humano');
    if (!vivo) {
      img.classList.add('morto');  
    }
    humanosContainer.appendChild(img);
  });
}

function atualizarStatus() {
  document.getElementById('vidaGorila').textContent = vidaGorila;
  document.getElementById('humanosRestantes').textContent = humanos.filter(h => h).length;
  document.getElementById('ataquesFeitos').textContent = ataquesFeitos;

  desenharHumanos();  
}



if(localStorage.getItem('vidaGorila')) {
  vidaGorila = parseInt(localStorage.getItem('vidaGorila'));
  humanos = JSON.parse(localStorage.getItem('humanos'));
  ataquesFeitos = parseInt(localStorage.getItem('ataquesFeitos'));
}

function atualizarStatus() {
  document.getElementById('vida-gorila').textContent = vidaGorila;
  document.getElementById('humanos-restantes').textContent = humanos.filter(h => h).length;
  document.getElementById('ataques-feitos').textContent = ataquesFeitos;


  const divHumanos = document.getElementById('humanos');
  divHumanos.innerHTML = '';
  humanos.forEach((vivo, i) => {
    const h = document.createElement('div');
    h.className = 'humano' + (vivo ? '' : ' derrotado');
    divHumanos.appendChild(h);
  });

  salvarEstado();
  verificarFimDeJogo();
}

function salvarEstado() {
  localStorage.setItem('vidaGorila', vidaGorila);
  localStorage.setItem('humanos', JSON.stringify(humanos));
  localStorage.setItem('ataquesFeitos', ataquesFeitos);
}

const somAtaque = new Audio('../assets/Som de soco.mp3');

function atacar() {
  if (cooldown) {
    log('O gorila está cansado! Espere um pouco...');
    return;
  }

  const humanosVivos = humanos.filter(h => h).length;
  if (humanosVivos === 0) return;

  const alvo = humanos.findIndex(h => h);
  if (alvo >= 0) {
    humanos[alvo] = false;
    ataquesFeitos++;
    log(`Gorila atacou e eliminou um humano!`);
    
    somAtaque.play();  // ✅ Aqui toca o som

    animarAtaque();
  }
  atualizarStatus();

  cooldown = true;
  document.querySelector('button[onclick="atacar()"]').disabled = true;

  setTimeout(() => {
    cooldown = false;
    document.querySelector('button[onclick="atacar()"]').disabled = false;
    log('O gorila está pronto para atacar novamente!');
  }, 100);
}

function curar() {
  if (cooldownCura) {
    log('O gorila ainda está se recuperando! Espere um pouco...');
    return;
  }

  vidaGorila = Math.min(vidaGorila + 10, 100);
  log('Gorila se curou em 10 pontos!');
  atualizarStatus();

  // Ativa cooldown
  cooldownCura = true;
  document.querySelector('button[onclick="curar()"]').disabled = true;

  setTimeout(() => {
    cooldownCura = false;
    document.querySelector('button[onclick="curar()"]').disabled = false;
    log('O gorila pode se curar novamente!');
  }, 3000); // 3 segundos de cooldown
}

function animarAtaque() {
  const gorila = document.getElementById('gorila');
  gorila.style.transform = 'scale(1.2)';
  setTimeout(() => {
    gorila.style.transform = 'scale(1)';
  }, 200);
}

function log(msg) {
  const logDiv = document.getElementById('log');
  logDiv.innerHTML += `<p>${msg}</p>`;
  logDiv.scrollTop = logDiv.scrollHeight;
}

setInterval(() => {
  if (humanos.filter(h => h).length > 0) {
    const dano = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    vidaGorila -= dano;
    log(`Humanos atacaram causando ${dano} de dano!`);
    atualizarStatus();
  }
}, 3000);

function verificarFimDeJogo() {
  if (vidaGorila <= 0) {
    log('Gorila foi derrotado!');
    alert('Fim de jogo! O gorila perdeu.');
    resetar();
  } else if (humanos.filter(h => h).length === 0) {
    log('Todos os humanos foram derrotados!');
    alert('Parabéns! O gorila venceu!');
    resetar();
  }
}

function resetar() {
  vidaGorila = 100;
  humanos = Array(100).fill(true);
  ataquesFeitos = 0;
  localStorage.clear();
  atualizarStatus();
}

atualizarStatus();