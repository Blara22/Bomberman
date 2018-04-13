class Entity {
	//Constructor de la clase, 
	// es lo mismo que poner function constructor ()
	constructor (image, x, y, w, h, crop = undefined){
		this.sprite = new Sprite(image)
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.dx = 0
		this.dy = 0
		this.crop = crop
	}

	move(){
		this.x += this.dx
		this.y += this.dy
	}

	draw(){
		this.sprite.draw(this.x,this.y,this.w,this.h,this.crop)
	}

	set speedX (dx){
		this.dx = dx
	}

	get speedX(){
		return this.dx
	}

	set speedY(dy){
		this.dy = dy
	}

	get speedY(){
		return this.dy
	}

}