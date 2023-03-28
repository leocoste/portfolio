class Sprite{
    constructor({position,velocity, image, frames = {max : 1}, sprites}){
        this.position = position;
        this.image = image;
        this.frames = {...frames, val:0, elapsed:0};

        this.image.onload = () =>{
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
        this.moving = false;
        this.sprites = sprites;
    }

    draw(){
        ctx.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/ this.frames.max,
            this.image.height
            );
        if (!this.moving) return

        if(this.frames.max >1) {
            this.frames.elapsed++
        }

        if(this.frames.elapsed %10 === 0){
            if(this.frames.val < this.frames.max - 1)this.frames.val++;
            else this.frames.val = 0;
            
        }
        
    }
}

class Bondary{
    static width = 60;
    static height = 60;
    constructor({position}){
        this.position = position;
        this.width = 60;
        this.height = 60;
    }

    draw(){
        ctx.fillStyle = 'rgba(255,0,0,0)';
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}

class Bondaryroom{
    static width = 48;
    static height = 48;
    constructor({position}){
        this.position = position;
        this.width = 48;
        this.height = 48;
    }

    draw(){
        ctx.fillStyle = 'rgba(255,0,0,0)';
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}

class Entry{
    static width = 60;
    static height = 60;
    constructor({position, color, destination}){
        this.position = position;
        this.width = 60;
        this.height = 60;
        this.color = color;
        this.destination = destination;
    }

    draw(){
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}

class Entryroom{
    static width = 48;
    static height = 48;
    constructor({position, color, destination}){
        this.position = position;
        this.width = 48;
        this.height = 48;
        this.color = color;
        this.destination = destination;
    }

    draw(){
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}