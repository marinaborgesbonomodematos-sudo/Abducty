const cenario = {
  camada1: {
    imagem: new Image(),
    x: 0,
    velocidadeRelativa: 0.2,
    carregada: false,
  },
  camada2: {
    imagem: new Image(),
    x: 0,
    velocidadeRelativa: 0.5,
    carregada: false,
  },
  camada3: {
    imagem: new Image(),
    x: 0,
    velocidadeRelativa: 1.0,
    carregada: false,
  },
  velocidadeBase: 3,
};

function carregarCamada(camada, src) {
  camada.imagem.src = src;
  camada.imagem.onload = () => {
    camada.carregada = true;
  };
  camada.imagem.onerror = () => {
    camada.carregada = false;
  };
}

carregarCamada(cenario.camada1, "/assets/imagens/backgorund/bg_layer1.png");
carregarCamada(cenario.camada2, "/assets/imagens/backgorund/bg_layer2.png");
carregarCamada(cenario.camada3, "/assets/imagens/backgorund/bg_layer3.png");

function atualizarCenario() {
  cenario.camada1.x -=
    cenario.velocidadeBase * cenario.camada1.velocidadeRelativa;
  cenario.camada2.x -=
    cenario.velocidadeBase * cenario.camada2.velocidadeRelativa;
  cenario.camada3.x -=
    cenario.velocidadeBase * cenario.camada3.velocidadeRelativa;

  if (cenario.camada1.x <= -canvas.width) cenario.camada1.x = 0;
  if (cenario.camada2.x <= -canvas.width) cenario.camada2.x = 0;
  if (cenario.camada3.x <= -canvas.width) cenario.camada3.x = 0;
}

function desenharCenario(ctx) {
  const gradiente = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradiente.addColorStop(0, "#1a0033");
  gradiente.addColorStop(1, "#4b0082");
  ctx.fillStyle = gradiente;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  desenharCamada(ctx, cenario.camada1);
  desenharCamada(ctx, cenario.camada2);
  desenharCamada(ctx, cenario.camada3);
}

function desenharCamada(ctx, camada) {
  if (camada.carregada && camada.imagem.complete) {
    ctx.drawImage(camada.imagem, camada.x, 0, canvas.width, canvas.height);
    ctx.drawImage(
      camada.imagem,
      camada.x + canvas.width,
      0,
      canvas.width,
      canvas.height,
    );
  } else {
    ctx.fillStyle = "rgba(255,255,255,0.07)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
