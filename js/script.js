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
