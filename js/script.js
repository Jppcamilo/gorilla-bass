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
  }

  