const canvas = document.getElementeById("gameCanvas")
const ctx = canvas.getContext("2d")

let obstaculos = []
let temporizadorSpawn = 0
const INTERVALO_SPAWN = 120

/* Lógica/loop geral do jogo */
function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if(jogoAtivo){
        atualizarCenario()
        desenharCenario(ctx)
        atualizarFisicaDoAlien()
        desenharAlien()
        gerarObstaculo()
        gerenciarObstaculos(ctx)
        checarColisoes()
        desenharscore()

        requestAnimationFrame(gameLoop)
    } else{
        desenharGameOver()
    }
}

function gerarObstaculo(){
    temporizadorSpawn++

    if(temporizadorSpawn >= INTERVALO_SPAWN){
        let larguraLaser = 60
        let espacoEntreLasers = 150
        let alturaTopo = Math.random() * (300 - 50) + 50
        let yBase = alturaTopo + espacoEntreLasers

        obstaculos.push({
            x: 800,
            yTopo: 0,
            alturaTopo: alturaTopo,
            yBase: yBase,
            alturaBase: canvas.height - yBase,
            largura: larguraLaser,
            velocidade: 4,
            passou: false
        })

        temporizadorSpawn = 0
    }
}

function gerenciarObstaculos(ctx){
    for( let i = obstaculos.length -1; i>= 0; i--){
        let obs = obstaculos[i]

        obs.x -= obs.velocidade

        ctx.fillStyle = "#FF0088"
        ctx.fillRect(
            obs.x,
            obs.yBase,
            obs.largura,
            obs.alturaTopo
        )
        ctx.fillStyle = "#00FFFF"
        ctx.fillRect(
            obs.x,
            obs.yBase,
            obs.largura,
            obs.alturaBase
        )

        if(obs.x + obs.largura < 0){
            obstaculos.splice(i, 1)
        }
    }
}

function checarColisoes(){
    /* Colisão com o "teto" e com o "chão" */
    if (alien.y + alien.altura > canvas.height || alien.y < 0){
        jogoAtivo = false
    }
     
    /* Colisão com os lasers */
    for( let obs of obstaculos){
        if(alien.x < obs.x + obs.largura && alien.x + alien.largura > obs.x){

            if(alien.y < obs.alturaTopo || alien.y + alien.altura > obs.yBase){
                jogoAtivo=false
            } 
        }
    }
}

function desenharScore(){
    ctx.fillStyle = "#FFEA00"
    ctx.font = "30px 'Courier New', monospace"
    ctx.fillText(`SCORE: ${score}`, 20, 40)
}

function desenharGameOver(){
    ctx.fillstyle = "rgba(15, 0, 31, 0.8)"
    ctx.fillRect(0,0,ncanvas.width, canvas.height)
    ctx.fillStyle = "#FF0088"
    ctx.font = "50px sans-serif"
    ctx.textAling = "center"
    ctx.fillText("ABDUZIDO!", canvas.width / 2, canvas.height / 2 - 20)
    ctx.fillStyle = "#00FFFF"
    ctx.font = "20px sans-serif"
    ctx.fillText("Pressione F5 para tentar escapar de novo", canvas.width / 2, canvas.height / 2 +30)
}

window.onload = () =>{
    gameLoopLoop()
}