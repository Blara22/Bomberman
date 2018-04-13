class Sprite{
	constructor(image){
		this.image=image
	}

	draw(x,y,w,h,crop){
		if(typeof crop !== 'undefined')
		//Se pone this de nuevo porque si no creería que es una
		//variable que recibe por parámetro.
			image(this.image,x,y,w,h,crop.x,crop.y,crop.w,crop.h)
		else
			image(this.image,x,y,w,h)
	}
}