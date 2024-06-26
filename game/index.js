const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

const mapImage = new Image();
mapImage.src ='./assets/img/index/map.png';

const collisionsMap = [];
const entriesmap = [];
var movementSpeed = 4;

for (let i=0; i<entries.length; i+=90){
    entriesmap.push(entries.slice(i,i+90));
}

const Bondaries = [];
const Entries = [];

let offset = {
    x:-3150,
    y:-1700
}

entriesmap.forEach((row, i) => {
    row.forEach((symbol, j)=>{
        if (symbol ===7)Bondaries.push(new Bondary({
            position:{
                x: j*Bondary.width + offset.x,
                y: i*Bondary.height + offset.y
            }
        }));
        if (symbol ===1)Entries.push(new Entry({
            position:{
                x: j*Entry.width + offset.x,
                y: i*Entry.height + offset.y
            },
            color:"green",
            destination:"about me"
        })
        );
        if (symbol ===2)Entries.push(new Entry({
            position:{
                x: j*Entry.width + offset.x,
                y: i*Entry.height + offset.y
            },
            color:"pink",
            destination:"projects"
        })
        );
        if (symbol ===3)Entries.push(new Entry({
            position:{
                x: j*Entry.width + offset.x,
                y: i*Entry.height + offset.y
            },
            color:"white",
            destination:"formation"
        })
        );
        if (symbol ===4)Entries.push(new Entry({
            position:{
                x: j*Entry.width + offset.x,
                y: i*Entry.height + offset.y
            },
            color:"black",
            destination:"resume"
        })
        );
        if (symbol ===5)Entries.push(new Entry({
            position:{
                x: j*Entry.width + offset.x,
                y: i*Entry.height + offset.y
            },
            color:"blue",
            destination:"my skills"
        })
        );
        if (symbol ===6)Entries.push(new Entry({
            position:{
                x: j*Entry.width + offset.x,
                y: i*Entry.height + offset.y
            },
            color:"yellow",
            destination:"contact me"
        })
        );
    })
})

const foregroundImage = new Image();
foregroundImage.src ='./assets/img/index/foregroundObjects.png';



const brakeImage = new Image();
brakeImage.src ='./assets/img/brake.png';

const playerDownImage = new Image();
playerDownImage.src = './assets/img/playerDown.png';

const playerUpImage = new Image();
playerUpImage.src = './assets/img/playerUp.png';

const playerLeftImage = new Image();
playerLeftImage.src = './assets/img/playerLeft.png';

const playerRightImage = new Image();
playerRightImage.src = './assets/img/playerRight.png';

const keybindsImage = new Image();
keybindsImage.src = './assets/img/keybind.png';

mapImage.onload =()=>{
    offset.x=-0,
    offset.y=-0
    console.log("coucou", offset.x)
    ctx.drawImage(
        mapImage,
        -3150,
        -1700
        );

    ctx.drawImage(
        playerImage,
        0,
        0,
        playerImage.width/4,
        playerImage.height,
        canvas.width/2-playerImage.width/8,
        canvas.height/2-playerImage.height/2,
        playerImage.width/4,
        playerImage.height
        );
}

const player = new Sprite({
    position :{
        x:canvas.width/2-192/8,
        y:canvas.height/2-68/2
    },
    image: playerDownImage,
    frames:{
        max:4
    },
    sprites:{
        up:playerUpImage,
        down:playerDownImage,
        left:playerLeftImage,
        right:playerRightImage
    }
})

const background = new Sprite({
    position : {
    x: offset.x,
    y: offset.y
    },
    image: mapImage
})

const foreground = new Sprite({
    position : {
    x: offset.x,
    y: offset.y
    },
    image: foregroundImage
})

const brake = new Sprite({
    position : {
        x : canvas.width/2 - keybindsImage/2,
        y : canvas.height/2 - keybindsImage/2
    },
    image : keybindsImage
})

const keys ={
    up: {
        pressed: false
    },
    left : {
        pressed: false
    },
    down : {
        pressed: false
    },
    right : {
        pressed: false
    }
}


const movable = [background,foreground, ...Bondaries, ...Entries]

function rectangularCollision({rectangle1,rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height -40 &&
        rectangle1.position.y + movementSpeed + rectangle2.height >= rectangle2.position.y
    )
}

let isBlocked = false;

function animate(){
    window.requestAnimationFrame(animate);
    if(!isBlocked){
        background.draw();
        Bondaries.forEach(bondary =>{
            bondary.draw();
        })
        Entries.forEach(entry =>{
            entry.draw();
        })
        player.draw();
        foreground.draw();
        let moving = true;
        player.moving = false;
        if(keys.up.pressed && lastKey ==='up'){
            player.moving = true;
            player.image = player.sprites.up;
            for(let i = 0; i<Bondaries.length; i++){
                const bondary =Bondaries[i];
                if(
                    rectangularCollision({
                    rectangle1:player,
                    rectangle2:{...bondary, position :{
                        x: bondary.position.x,
                        y: bondary.position.y +movementSpeed
                    }}
                    })
                    )
                    {
                    
                    moving = false;
                    break;
                }
            }
            for(let i = 0; i<Entries.length; i++){
                const entry =Entries[i];
                if(
                    rectangularCollision({
                    rectangle1:player,
                    rectangle2:{...entry, position :{
                        x: entry.position.x,
                        y: entry.position.y +movementSpeed
                    }}
                    })
                    )
                    {
                    redirection(entry);
                    moving = false;
                    break;
                }
            }
            if(moving)movable.forEach(movable => {movable.position.y +=movementSpeed});
        
        }

        else if(keys.down.pressed && lastKey ==='down'){
            player.moving = true;
            player.image = player.sprites.down;
            for(let i = 0; i<Bondaries.length; i++){
                const bondary =Bondaries[i];
                if(
                    rectangularCollision({
                    rectangle1:player,
                    rectangle2:{...bondary, position :{
                        x: bondary.position.x,
                        y: bondary.position.y -movementSpeed
                    }}
                    })
                    )
                    {
                    
                    moving = false;
                    break;
                }
            }
            for(let i = 0; i<Entries.length; i++){
                const entry =Entries[i];
                if(
                    rectangularCollision({
                    rectangle1:player,
                    rectangle2:{...entry, position :{
                        x: entry.position.x,
                        y: entry.position.y -movementSpeed
                    }}
                    })
                    )
                    {
                    redirection(entry);
                    moving = false;
                    break;
                }
            }
            if(moving)
            movable.forEach(movable => {movable.position.y -=movementSpeed});
        }

        else if(keys.right.pressed && lastKey ==='right'){
            player.moving = true;
            player.image = player.sprites.right;
            for(let i = 0; i<Bondaries.length; i++){
                const bondary =Bondaries[i];
                if(
                    rectangularCollision({
                    rectangle1:player,
                    rectangle2:{...bondary, position :{
                        x: bondary.position.x-movementSpeed,
                        y: bondary.position.y 
                    }}
                    })
                    )
                    {
                    
                    moving = false;
                    break;
                }
            }
            for(let i = 0; i<Entries.length; i++){
                const entry =Entries[i];
                if(
                    rectangularCollision({
                    rectangle1:player,
                    rectangle2:{...entry, position :{
                        x: entry.position.x-movementSpeed,
                        y: entry.position.y 
                    }}
                    })
                    )
                    {
                    redirection(entry);
                    moving = false;
                    break;
                }
            }
            if(moving)
            movable.forEach(movable => {movable.position.x -=movementSpeed});
        }

        else if(keys.left.pressed && lastKey ==='left'){
            player.moving = true;
            player.image = player.sprites.left;
            for(let i = 0; i<Bondaries.length; i++){
                const bondary =Bondaries[i];
                if(
                    rectangularCollision({
                    rectangle1:player,
                    rectangle2:{...bondary, position :{
                        x: bondary.position.x+ movementSpeed,
                        y: bondary.position.y
                    }}
                    })
                    )
                    {
                    
                    moving = false;
                    break;
                }
            }
            for(let i = 0; i<Entries.length; i++){
                const entry =Entries[i];
                if(
                    rectangularCollision({
                    rectangle1:player,
                    rectangle2:{...entry, position :{
                        x: entry.position.x+movementSpeed,
                        y: entry.position.y 
                    }}
                    })
                    )
                    {
                    redirection(entry);
                    moving = false;
                    break;
                }
            }
            if(moving)
            movable.forEach(movable => {movable.position.x +=movementSpeed});
        }
    }
}

function redirection(entry){
    if(entry.color=="green"){
        document.location.href="aboutme.html";
    }
    if(entry.color=="white"){
        document.location.href="formation.html";
    }
    if(entry.color=="black"){
        document.location.href="resume.html";
    }
    if(entry.color=="yellow"){
        document.location.href="contact.html";
    }
    if(entry.color=="blue"){
        document.location.href="skills.html";
    }
    if(entry.color=="pink"){
        document.location.href="project.html";
    }
}

if(!isBlocked)animate();

let lastKey ='';

window.addEventListener('keydown',(e)=>{
    switch(e.key){
        case 'z':
            keys.up.pressed = true;
            lastKey = 'up';
            break;
        case 'q':
            keys.left.pressed = true;
            lastKey = 'left';
            break;
        case 's':
            keys.down.pressed = true;
            lastKey = 'down';
            break;
        case 'd':
            keys.right.pressed = true;
            lastKey = 'right';
            break;
        case 'ArrowUp':
            keys.up.pressed = true;
            lastKey = 'up';
            break;
        case 'ArrowLeft':
            keys.left.pressed = true;
            lastKey = 'left';
            break;
        case 'ArrowDown':
            keys.down.pressed = true;
            lastKey = 'down';
            break;
        case 'ArrowRight':
            keys.right.pressed = true;
            lastKey = 'right';
            break;
        case 'Control':
            movementSpeed = 8;
            console.log("speed");
            break;
        case 'Escape':
            document.location.href="../index.html";
            break;
    }
});

window.addEventListener('keyup',(e)=>{
    switch(e.key){
        case 'z':
            keys.up.pressed = false;
            break;
        case 'q':
            keys.left.pressed = false;
            break;
        case 's':
            keys.down.pressed = false;
            break;
        case 'd':
            keys.right.pressed = false;
            break;
        case 'ArrowUp':
            keys.up.pressed = false;
            break;
        case 'ArrowLeft':
            keys.left.pressed = false;
            break;
        case 'ArrowDown':
            keys.down.pressed = false;
            break;
        case 'ArrowRight':
            keys.right.pressed = false;
            break;
        case 'Control':
            movementSpeed = 4;
            console.log("no speed");
            break;
    }
});
