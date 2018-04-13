let tiles, bomberman, entities = [], enemiesArr = [], lives = 3
let full, empty, level = 1, map, timeOut = 0, lose, win
let map1 = [
	[2,2,2,2,2,2,2,2,2,2,2,2,2],
	[2,0,0,1,0,1,0,0,0,1,1,0,2],
	[2,0,2,0,2,1,2,1,2,0,2,0,2],
	[2,1,1,1,0,1,0,0,0,1,1,0,2],
	[2,0,2,0,2,0,2,1,2,0,2,1,2],
	[2,0,0,1,0,0,0,1,0,1,0,0,2],
	[2,1,2,0,2,1,2,0,2,0,2,1,2],
	[2,1,0,1,1,0,0,0,0,1,1,0,2],
	[2,0,2,0,2,1,2,1,2,0,2,0,2],
	[2,0,1,1,0,0,0,1,0,0,1,1,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2]
]

let map2 = [
	[2,2,2,2,2,2,2,2,2,2,2,2,2],
	[2,0,0,1,0,0,1,0,0,1,0,1,2],
	[2,0,2,1,2,1,2,1,2,1,2,0,2],
	[2,1,0,0,1,1,1,0,1,1,0,1,2],
	[2,1,2,1,2,0,2,0,2,0,2,0,2],
	[2,0,1,1,0,1,0,1,1,0,1,1,2],
	[2,0,2,0,2,0,2,1,2,1,2,0,2],
	[2,0,1,1,1,1,0,0,1,1,0,1,2],
	[2,1,2,0,2,1,2,1,2,1,2,0,2],
	[2,1,0,1,1,0,1,1,1,0,1,1,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2]
]

let crops = []

function preload(){
	tiles = loadImage("img/tileSprites.png")
	flames = loadImage("img/flame.png")
	bombs = loadImage("img/bomb.png")
	man = loadImage("img/bomber.png")
	boss = loadImage("img/bomber2.png")
	enemies = loadImage("img/enemy.png")
	full = loadImage("img/Full_Heart.png")
	empty = loadImage("img/emptyHeart.png")
	fin = loadImage("img/gameOver.png")
	winner = loadImage("img/win.png")
	lvl1 = loadSound('sound/map.mp3');
	lvl1.setLoop(true)
	bossLvl =  loadSound('sound/boss.mp3');
	bossLvl.setLoop(true)
	fuse =  loadSound('sound/dot.WAV');
	boom =  loadSound('sound/bomb.wav');
}

function setup() {
	createCanvas(832, 704)
	let side = 64
	for(let i=0;i<4;i++){
		crops.push({x: i*side, y: 0, w: side, h: side})
	}
	map = map1
	lvl1.play()
	exit()
	createBomberman()
	createEnemies()
}

function draw() {
	board()
	drawHearts()
	
	entities.forEach((entity) => {
		entity.draw()
		if(entity instanceof Bomb){
			entity.time++
			entity.loadExplosion()
			if(entity.time>90){
				entity.explosion()
				explode(entity.destroy,entity.x1,entity.y1)
				let index = entities.indexOf(entity)
				entities.splice(index,1)
			}
		}
		if(entity instanceof Flame){
			entity.time++
			if(entity.time>60){
				let index = entities.indexOf(entity)
				entities.splice(index,1)
			}
		}
	})

	enemiesArr.forEach((entity) => {
		entity.move(entity.dir)
		entity.draw()
		if(bomberman.immuneTime>0){
			bomberman.immuneTime--
		}else if(bomberman.immuneTime===0){
			bomberman.immune = false
		}

		if(bomberman.catchFire(entity.px,entity.py) 
			&& bomberman.immune !== true){
			lives--
			bomberman.immune = true
			bomberman.immuneTime = 180
			//console.log(lives)
		}
	})

	if(keyIsDown(LEFT_ARROW)){
		bomberman.move(Bomberman.LEFT)
	}else
	if(keyIsDown(RIGHT_ARROW)){
		bomberman.move(Bomberman.RIGHT)
	}else
	if(keyIsDown(UP_ARROW)){
		bomberman.move(Bomberman.BACK)
	}else
	if(keyIsDown(DOWN_ARROW)){
		bomberman.move(Bomberman.FRONT)
	}

	if(lives === 0){
		lose = true
		gameOver()
	}
	if(bomberman.exit()){
		if(level === 2){
			win = true
			gameOver()
		}else{
			level=2
			newLevel(level)
		}
	}
}

const exit = function(){
	let ex = false
	while(!ex){
		let y = Math.floor((Math.random() * 12));
		let x = Math.floor((Math.random() * 10));
		if(map[x][y]===1){
			ex = true
			map[x][y] = 3
		}
	}
	console.log(map)
}

const board = function(){
	let x=0, y=0, side = 64, index

	for(let i=0;i<11;i++){
		for(let j=0;j<13;j++){
			index = map[i][j]
			if(index === 3)
				index = 1
			else if(index === 4)
				index = 3
			image(tiles,x,y,side,side,crops[index].x,crops[index].y,crops[index].w,crops[index].h)
			x+=64
		}
		x=0
		y+=64
	}
}

const drawHearts = function(){
	let x=-20
	for(i=lives;i>0;i--){
		image(full,x+=40,10,40,40)
	}
	n=3-lives
	for(i=n;i>0;i--){
		image(empty,x+=40,10,40,40)
	}
}

const newLevel = function(level){
	map = map2
	exit()
	board()
	lvl1.stop()
	bossLvl.play()
	entities = []
	enemiesArr = []
	createBomberman()
	createEnemies()
	lives = 3
}

const gameOver = function(){
	if(lose){
		image(fin,100,150,width-200,height-250)
		noLoop()
	}
	if(win){
		image(winner,100,150,width-200,height-250)
		noLoop()
	}
}

const createBomberman = function(){
	let w = 64
	let h = 128
	let x = 0
	let y = 0

	let crops = []
	for(let i=0;i<4;i++){
		crops.push({x: x, y: y, w: w, h: h})
		x+=64
	}
	
	bomberman = new Bomberman(man,64,0,w,h,crops)
	entities.push(bomberman)
}

const createEnemies = function(){
	let w = 64
	let h = 128
	let x = 0
	let y = 0

	let crops = []
	for(let i=0;i<4;i++){
		crops.push({x: x, y: y, w: w, h: h})
		x+=64
	}
	if(level === 1){
		enemy = new Enemy(enemies,4*64,64*4,w,h,crops,Enemy.RIGHT,1)
		enemiesArr.push(enemy)
		enemy = new Enemy(enemies,64*7,64*5,w,h,crops,Enemy.FRONT,1)
		enemiesArr.push(enemy)
		enemy = new Enemy(enemies,64*11,0,w,h,crops,Enemy.FRONT,1)
		enemiesArr.push(enemy)
	}else if(level === 2){
		enemy = new Enemy(enemies,64,64*4,w,h,crops,Enemy.FRONT,1)
		enemiesArr.push(enemy)
		enemy = new Enemy(enemies,64*7,64*6,w,h,crops,Enemy.RIGHT,1)
		enemiesArr.push(enemy)
		enemy = new Enemy(enemies,64*9,64*4,w,h,crops,Enemy.FRONT,1)
		enemiesArr.push(enemy)
		enemy = new Enemy(boss,64*7,64*2,w,h,crops,Enemy.FRONT,3)
		enemiesArr.push(enemy)
	}
}

const explode = function(destroy,x1,y1){
	let x = x1, y = y1, index

	for(i=0;i<4;i++){
		if(destroy[i]===1){
			switch(i){
				case 0: 
					x = x1-1
					y = y1
				break
				case 1:
					x = x1
					y = y1-1
				break
				case 2:
					y = y1
					x = x1+1
				break
				case 3:
					x = x1
					y = y1+1
				break
			}
			createFlame(x,y)
			for(let i=0;i<enemiesArr.length;i++){
				if(enemiesArr[i].catchFire(x,y)
					&& enemiesArr[i].lives === 0)
					index = i
			}
			if(bomberman.catchFire(x,y)){
				lives--
				//console.log(lives)
			}
			if(map[y][x]===3)
				map[y][x]=4
			else if(map[y][x]!==4)
				map[y][x] = 0
		}
	}
	createFlame(x1,y1)
	if(bomberman.catchFire(x1,y1)){
		lives--
	}
	for(let i=0;i<enemiesArr.length;i++){
		if(enemiesArr[i].catchFire(x1,y1) 
			&& enemiesArr[i].lives === 0)
			index = i
	}
	if(index!==undefined)
		enemiesArr.splice(index,1)
	//console.log(map)
}

function keyPressed(){
	if (keyCode === 32) {
		createBomb()
	}
}

const createBomb = function(){
	let x = bomberman.getXBomb()
	let y = bomberman.getYBomb()

	let crops = []

	crops.push({x: 0, y: 0, w: 48, h: 48})
	crops.push({x: 48, y: 0, w: 48, h: 48})
	crops.push({x: 96, y: 0, w: 48, h: 48})


	bomb = new Bomb(bombs,x*64+8,y*64+8,48,48,x,y,crops)
	entities.push(bomb)
	fuse.play()
}

const createFlame = function(x,y){
	let crops = []

	crops.push({x: 0, y: 0, w: 48, h: 48})
	crops.push({x: 48, y: 0, w: 48, h: 48})
	crops.push({x: 96, y: 0, w: 48, h: 48})
	crops.push({x: 144, y: 0, w: 48, h: 48})
	crops.push({x: 192, y: 0, w: 48, h: 48})

	flame = new Flame(flames,x*64+8,y*64+8,48,48,crops)
	entities.push(flame)
	boom.play()
}


























