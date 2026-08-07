const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

let obstaculos = [];
let temporizadorSpawn = 0;
const INTERVALO_SPAWN = 120;
let jogoAtivo = true;
let score = 0;

function resetGame() {
  obstaculos = [];
  temporizadorSpawn = 0;
  score = 0;
  jogoAtivo = true;
  alien.x = 100;
  alien.y = 200;
  alien.velocidadeY = 0;
}

function gameLoop() {
  if (jogoAtivo) {
    atualizarCenario();
    desenharCenario(ctx);
    atualizarFisicaDoAlien();
    desenharAlien(ctx);
    gerarObstaculo();
    gerenciarObstaculos(ctx);
    checarColisoes();
    desenharScore();
    requestAnimationFrame(gameLoop);
  } else {
    desenharGameOver();
  }
}

function gerarObstaculo() {
  temporizadorSpawn++;

  if (temporizadorSpawn >= INTERVALO_SPAWN) {
    const larguraLaser = 60;
    const espacoEntreLasers = 160;
    const alturaTopo = Math.random() * (300 - 50) + 50;
    const yBase = alturaTopo + espacoEntreLasers;

    obstaculos.push({
      x: canvas.width,
      yBase: yBase,
      alturaTopo: alturaTopo,
      alturaBase: canvas.height - yBase,
      largura: larguraLaser,
      velocidade: 4,
      passou: false,
    });

    temporizadorSpawn = 0;
  }
}

function gerenciarObstaculos(ctx) {
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    const obs = obstaculos[i];
    obs.x -= obs.velocidade;

    ctx.fillStyle = "#ff0088";
    ctx.fillRect(obs.x, 0, obs.largura, obs.alturaTopo);

    ctx.fillStyle = "#00ffff";
    ctx.fillRect(obs.x, obs.yBase, obs.largura, obs.alturaBase);

    if (!obs.passou && obs.x + obs.largura < alien.x) {
      obs.passou = true;
      score += 1;
    }

    if (obs.x + obs.largura < 0) {
      obstaculos.splice(i, 1);
    }
  }
}

function checarColisoes() {
  if (alien.y + alien.altura > canvas.height || alien.y < 0) {
    jogoAtivo = false;
    return;
  }

  for (const obs of obstaculos) {
    const colisaoHorizontal =
      alien.x < obs.x + obs.largura && alien.x + alien.largura > obs.x;
    const colisaoVertical =
      alien.y < obs.alturaTopo || alien.y + alien.altura > obs.yBase;

    if (colisaoHorizontal && colisaoVertical) {
      jogoAtivo = false;
      break;
    }
  }
}

function desenharScore() {
  ctx.fillStyle = "#ffea00";
  ctx.font = "30px 'Courier New', monospace";
  ctx.fillText(`SCORE: ${score}`, 20, 40);
}

function desenharGameOver() {
  ctx.fillStyle = "rgba(15, 0, 31, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff0088";
  ctx.font = "48px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("ABDUZIDO!", canvas.width / 2, canvas.height / 2 - 20);

  ctx.fillStyle = "#00ffff";
  ctx.font = "20px sans-serif";
  ctx.fillText(
    "Pressione Enter ou clique para tentar novamente",
    canvas.width / 2,
    canvas.height / 2 + 25,
  );
}

window.addEventListener("keydown", (event) => {
  if (!jogoAtivo && (event.code === "Enter" || event.code === "KeyR")) {
    resetGame();
    gameLoop();
  }
});

window.addEventListener("mousedown", () => {
  if (!jogoAtivo) {
    resetGame();
    gameLoop();
  }
});

window.addEventListener("load", () => {
  resetGame();
  gameLoop();
});
