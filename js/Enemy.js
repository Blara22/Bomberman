class Enemy extends Entity{

	constructor(image,x,y,w,h,crops,dir,lives){
		super(image,x,y,w,h,crops[Enemy.FRONT])
		//console.log(crops[Enemy.FRONT])
		this.crops = crops
		this.px = 1
		this.py = 1
		this.x1 = 1
		this.y1 = 1
		this.dir = dir
		this.speed(dir)
		this.lives = lives
	}

	static get LEFT(){
		return 0
	}

	static get FRONT(){
		return 1
	}

	static get RIGHT(){
		return 2
	}

	static get BACK(){
		return 3
	}

	catchFire(x,y){
		//console.log(this.px + ", " + this.py)
		//console.log(x + ", " + y)

		if(this.px === x && this.py === y){
			this.lives--
			return true
		}
		else
			return false
	}

	speed(dir){
		if(dir === Enemy.LEFT )
			this.speedX = -1
		else if(dir === Enemy.RIGHT)
			this.speedX = 1
		else if(dir === Enemy.FRONT) 
			this.speedY = 1
		else if(dir === Enemy.BACK)
			this.speedY = -1
	}

	move(){
		this.direction(this.dir)
		this.updatePos(this.dir)

		/*console.log("X: "+ this.x)
		console.log("Y: "+ this.y)
		console.log("Px: "+ this.px)
		console.log("Py: "+ this.py)*/

		if(!this.canWalk(this.dir)){
			//console.log("No camina")
			switch (this.dir){
				case Enemy.LEFT:
					this.dir = Enemy.RIGHT
					this.speedX*=-1
				break
				case Enemy.FRONT:
					this.dir = Enemy.BACK
					this.speedY*=-1
				break
				case Enemy.RIGHT: 
					this.dir = Enemy.LEFT
					this.speedX*=-1
				break
				case Enemy.BACK:
					this.dir = Enemy.FRONT
					this.speedY*=-1
				break
			}
		}		
	}

	canWalk(dir){
		this.updatePos(dir)
		let x2 = (this.px*64)
		let y2 = (this.py*64)
		
		if(map[this.py][this.px]===0){
			if(dir === Enemy.LEFT)
				return true
			else if(dir === Enemy.RIGHT ){
				if(this.x<=x2){
					//console.log("Primer caso")
					return true
				}
				else if(this.x>=x2 && map[this.py][this.px+1] === 0){
					//console.log("Segundo caso")
					return true
				}
				else{
					//console.log("Tercer caso")
					return false
				}
			}
			else if(dir === Enemy.FRONT ){
				if(this.y+64<= y2){
					//console.log("Primer caso")
					return true
				}else if((this.y+64)>=y2 && map[this.py+1][this.px] === 0){
					//console.log("Segundo caso")
					return true
				}else{
					//console.log("Tercer caso")
					return false
				}
			}
			else if(dir === Enemy.BACK){
				if(this.y+128>=this.y2-64){
					return true
				}else if(this.y+64>=y2-64 && map[this.py-1][this.px] === 0){
					return true
				}else
					return false
			}
			else
				return false
		}
	}

	updatePos(dir){
		this.getPosXMove(dir)
		this.getPosYMove(dir)
	}

	getPosXMove(dir){
		this.px = Math.floor(this.x/64)
		if(dir === Enemy.RIGHT && this.x+32>=this.px*64+64)
			this.px++

	}

	getPosYMove(dir){
		this.py = Math.floor((this.y)/64) +1
		if(this.y+50>=this.py*64)
			this.py++
	}

	direction(dir){
		this.crop = this.crops[dir]
	}

}