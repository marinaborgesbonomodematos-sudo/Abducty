const alien = {
  x: 100,
  y: 200,
  largura: 50,
  altura: 50,
  velocidadeY: 0,
  gravidade: 0.45,
  impulso: -8.2,
  sprite: new Image(),
  carregada: false,
};

alien.sprite.src = "/assets/imagens/player/alien.png";
alien.sprite.onload = () => {
  alien.carregada = true;
};
alien.sprite.onerror = () => {
  alien.carregada = false;
};

function atualizarFisicaDoAlien() {
  alien.velocidadeY += alien.gravidade;
  alien.y += alien.velocidadeY;

  if (alien.y + alien.altura > canvas.height) {
    alien.y = canvas.height - alien.altura;
    alien.velocidadeY = 0;
    if (jogoAtivo) {
      jogoAtivo = false;
    }
  }

  if (alien.y < 0) {
    alien.y = 0;
    alien.velocidadeY = 0;
  }
}

function pularAlien() {
  if (alien.y <= 0) {
    return;
  }
  alien.velocidadeY = alien.impulso;
}

function desenharAlien(ctx) {
  if (alien.carregada && alien.sprite.complete) {
    ctx.drawImage(alien.sprite, alien.x, alien.y, alien.largura, alien.altura);
  } else {
    ctx.fillStyle = "#6a0dad";
    ctx.fillRect(alien.x, alien.y, alien.largura, alien.altura);
  }
}

window.addEventListener("mousedown", () => {
  if (jogoAtivo) {
    pularAlien();
  }
});

window.addEventListener("keydown", (event) => {
  if (
    event.code === "Space" ||
    event.code === "ArrowUp" ||
    event.code === "KeyW"
  ) {
    event.preventDefault();
    if (jogoAtivo) {
      pularAlien();
    }
  }
});
