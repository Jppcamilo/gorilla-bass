let vidaGorila = 100;
let humanos = Array(100).fill(true);
let ataquesFeitos = 0;

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

function atacar() {
  const humanosVivos = humanos.filter(h => h).length;
  if (humanosVivos === 0) return;

  const alvo = humanos.findIndex(h => h);
  if (alvo >= 0) {
    humanos[alvo] = false;
    ataquesFeitos++;
    log(`Gorila atacou e eliminou um humano!`);
    animarAtaque();
  }
  atualizarStatus();
}

function defender() {
  log('Gorila se defendeu e reduziu o dano do próximo ataque.');
}

function curar() {
  vidaGorila = Math.min(vidaGorila + 10, 100);
  log('Gorila se curou em 10 pontos!');
  atualizarStatus();
}

function animarAtaque() {
  const gorila = document.getElementById('gorila');
  gorila.style.transform = 'scale(1.2)';
  setTimeout(() => {
    gorila.style.transform = 'scale(1)';
  }, 200);
}
