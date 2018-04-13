class Bomb extends Entity{

	constructor(image,x,y,w,h,x1,y1,crops){
		super(image,x,y,w,h,crops[Bomb.FIRST])
		this.x1 = x1
		this.y1 = y1
		this.time = 0
		this.crops = crops
		this.destroy = []
	}

	static get FIRST(){
		return 0
	}

	static get SECOND(){
		return 1
	}

	static get THIRD(){
		return 2
	}

	loadExplosion(){
		if(this.time === 10 || this.time === 40){
			this.crop = this.crops[Bomb.SECOND]
		}
		if(this.time === 20 || this.time === 50){
			this.crop = this.crops[Bomb.THIRD]
		}

		if(this.time === 30){
			this.crop = this.crops[Bomb.FIRST]
		}
	}

	explosion(){
		if(map[this.y1][this.x1-1]!==2){
			this.destroy.push(1)
		}else 
			this.destroy.push(0)

		if(map[this.y1-1][this.x1]!==2){
			this.destroy.push(1)
		}else 
			this.destroy.push(0)

		if(map[this.y1][this.x1+1]!==2){
			this.destroy.push(1)
		}else
			this.destroy.push(0)

		if(map[this.y1+1][this.x1]!==2){
			this.destroy.push(1)
		}else
			this.destroy.push(0)

		console.log(this.destroy)
	}

}
