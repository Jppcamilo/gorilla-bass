let vidaGorila = 100;
let humanos = Array(100).fill(true);
let ataquesFeitos = 0;
let cooldown = false;
let cooldownCura = false;

const somAtaque = new Audio('../assets/somDeSoco.mp3'); // ✅ Evite espaço no nome
somAtaque.volume = 0.5;

const humanosContainer = document.getElementById('humanos');




function desenharHumanos() {
    humanosContainer.innerHTML = '';

    humanos.forEach((vivo, index) => {
        const img = document.createElement('img');
        img.src = '../assets/humano.png';
        img.alt = `Humano ${index + 1}`;
        img.classList.add('humano');
        if (!vivo) {
            img.classList.add('morto');
        }
        humanosContainer.appendChild(img);
    });
}



function atualizarStatus() {
    document.getElementById('vida-gorila').textContent = vidaGorila;
    document.getElementById('humanos-restantes').textContent = humanos.filter(h => h).length;
    document.getElementById('ataques-feitos').textContent = ataquesFeitos;

    desenharHumanos();
    salvarEstado();
    verificarFimDeJogo();
}



function salvarEstado() {
    localStorage.setItem('vidaGorila', vidaGorila);
    localStorage.setItem('humanos', JSON.stringify(humanos));
    localStorage.setItem('ataquesFeitos', ataquesFeitos);
}



if (localStorage.getItem('vidaGorila')) {
    vidaGorila = parseInt(localStorage.getItem('vidaGorila'));
    humanos = JSON.parse(localStorage.getItem('humanos'));
    ataquesFeitos = parseInt(localStorage.getItem('ataquesFeitos'));
}



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
        somAtaque.play();
        animarAtaque();
    }

    atualizarStatus();

    cooldown = true;
    document.querySelector('button[onclick="atacar()"]').disabled = true;

    setTimeout(() => {
        cooldown = false;
        document.querySelector('button[onclick="atacar()"]').disabled = false;
        log('O gorila está pronto para atacar novamente!');
    }, 2000);
}



function curar() {
if (cooldownCura) {
        log('O gorila ainda está se recuperando! Espere um pouco...');
        return;
    }

    const cura = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
    vidaGorila = Math.min(vidaGorila + cura, 100);
    log(`Gorila se curou em ${cura} pontos!`);
    atualizarStatus();

    cooldownCura = true;
    document.querySelector('button[onclick="curar()"]').disabled = true;

    setTimeout(() => {
        cooldownCura = false;
        document.querySelector('button[onclick="curar()"]').disabled = false;
        log('O gorila pode se curar novamente!');
    }, 4000);
}



function defender() {
    log('O gorila se defendeu, reduzindo o próximo dano pela metade!');

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

// Inicialização
atualizarStatus();