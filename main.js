var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

canvas.width = window.innerWidth - 100
canvas.height = window.innerHeight - 100

// 공룡 object
var dino_img = new Image()
dino_img.src = './dino.png'

var dino = { // 등장 캐릭터의 속성부터 object 자료에 정리해두면 편리
    x : 10,
    y : 200,
    width : 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'transparent'
        ctx.fillRect(this.x, this.y, this.width, this.height)
        // dino_img.addEventListener('load', e => {
        //     console.log('load image')
        // })
        console.log('draw')
        ctx.drawImage(dino_img, this.x, this.y, this.width, this.height)
    }
}

// 공룡 애니메이션 효과
dino.x += 1

// 공룡 호출
// dino.draw()

var cactus_img = new Image()
cactus_img.src = './cactus.png'

// 장애물 object
class Cactus {
    constructor() {
        this.x = 500
        this.y = 200
        this.width = 50
        this.height = 50
    }
    draw() {
        // ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(cactus_img, this.x, this.y, this.width, this.height)
    }
}

// 장애물 호출
var cactus = new Cactus()
cactus.draw()


var timer = 0
var manyCactus = [] // 장애물을 array 에 집어넣음
var jumpTimer = 0
var animation

function everyframe() {
    animation = requestAnimationFrame(everyframe)
    timer++

    ctx.clearRect(0,0, canvas.width, canvas.height)

    if (timer % 200 === 0){ // 120프레임마다 장애물 생성
    var cactus = new Cactus()
    manyCactus.push(cactus)
    }

    manyCactus.forEach((a, i, o) => {
        // x 좌표가 0 미만이면 array 에서 제거
        if (a.x < 0) {
            o.splice(i, 1)
        }
        a.x -= 2.5 // 장애물이 오는 속도

        attack(dino, a) // 충돌 체크는 여기서 (dino vs cactus 충돌체크)

        a.draw() // array 에 있던거 다 draw() 해주세요.
    })

    if (jumping == true) { // 점프중
        dino.y -= 4 // 1초에 y축으로 3만큼 올라감
        jumpTimer += 3 // 1초에 3프레임
    }
    if (jumping == false) { // 점프중이 아님
        if (dino.y < 200) { // y 축 200 프레임 미만일 때
            dino.y += 4 // y 축으로 3 이동
        }
    }
    if (jumpTimer > 100) {
        jumping = false
        jumpTimer = 0
    }
    dino.draw()
}

everyframe()

// 충돌 확인
function attack(dino, cactus) {
    var xDiff = cactus.x - (dino.x + dino.width)
    var yDiff = cactus.y - (dino.y + dino.height)
    if (xDiff < 0 && yDiff < 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        cancelAnimationFrame(animation)
    }
}

var jumping = false
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        jumping = true
    }
})