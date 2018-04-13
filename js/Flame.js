class Flame extends Entity{

	constructor(image,x,y,w,h,crops){
		super(image,x,y,w,h,crops[0])
		this.time = 0
		this.destroy = []
		this.crops = crops
	}

	draw(){
		if(this.time === 10 || this.time === 50){
			this.crop = this.crops[1]
		}
		if(this.time === 20){
			this.crop = this.crops[2]
		}
		if(this.time === 30){
			this.crop = this.crops[3]
		}
		if(this.time === 40){
			this.crop = this.crops[4]
		}

		super.draw()
	}
}