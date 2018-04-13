class Bomberman extends Entity{
	constructor(image,x,y,w,h,crops){
		super(image,x,y,w,h,crops[Bomberman.FRONT])
		//console.log(crops[Bomberman.FRONT])
		this.crops = crops
		this.px = 1
		this.py = 1
		this.x1 = 1
		this.y1 = 1
		this.immune = false
		this.immuneTime = 0
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

		//console.log("X: "+ this.px + ", " + this.py)
		//console.log("Y: "+ x + ", " + y)
		if(this.px === x && this.py === y)
			return true
		else
			return false
	}

	exit(){
		if(map[this.py][this.px] === 4){
			return true
		}
		else return false
	}

	move(dir){
		this.direction(dir)

		//console.log("X: "+ this.x)
		//console.log("Y: "+ this.y)
		//console.log("Px: "+ this.px)
		//console.log("Py: "+ this.py)

		if(this.canWalk(dir)){
			switch (dir){
				case Bomberman.LEFT:
						this.x-=2
				break
				case Bomberman.FRONT:
					this.y += 2
				break
				case Bomberman.RIGHT: 
						this.x += 2
				break
				case Bomberman.BACK:
					this.y -=2
				break
			}
		}
	}

	canWalk(dir){
		this.updatePos(dir)
		let x2 = (this.px*64)
		let y2 = (this.py*64)
		
		if(map[this.py][this.px]===0 ){
			if(dir === Bomberman.LEFT)
				return true
			else if(dir === Bomberman.RIGHT ){
				if(this.x<=x2){
					return true
				}
				else if(this.x>=x2 && (map[this.py][this.px+1] === 0 
					|| map[this.py][this.px+1] === 4)){
					return true
				}
				else{
					return false
				}
			}
			else if(dir === Bomberman.FRONT ){
				if(this.y+64<= y2){
					return true
				}else if((this.y+64)>=y2 && (map[this.py+1][this.px] === 0
					|| map[this.py+1][this.px] === 4)){
					return true
				}else{
					return false
				}
			}
			else if(dir === Bomberman.BACK){
				if(this.y+128>=this.y2-64){
					return true
				}else if(this.y+64>=y2-64 && (map[this.py-1][this.px] === 0
					|| map[this.py-1][this.px] === 4)){
					return true
				}else
					return false
			}
			else
				return false
		}
	}

	updatePos(dir){

		if(dir === Bomberman.LEFT || dir === Bomberman.RIGHT){
			this.getPosXMove(dir)
		}
		if(dir === Bomberman.FRONT || dir === Bomberman.BACK){
			this.getPosYMove(dir)
		}
	}

	getPosXMove(dir){
		this.px = Math.floor(this.x/64)
		if(dir === Bomberman.RIGHT && this.x+32>=this.px*64+64)
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

	getXBomb(){
		return this.px
	}

	getYBomb(){		
		return this.py
	}
}






