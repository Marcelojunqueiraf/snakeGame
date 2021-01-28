const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext('2d')

//Desenhar quadrado
var px = 2;
var py = 0;
var vx = 1;
var vy = 0;
var growthFlag = false;

class Node{
    constructor(x, y){
        this.x = x 
        this.y = y
    }
}

class Cobra{
    constructor(x, y){
        this.x = x
        this.y = y
        this.vx = 1
        this.vy = 0
        this.growthFlag = false
        this.nodes = []
        this.direction = 2
        this.nodes.push(new Node(x, y))
        this.nodes.push(new Node(x, y))
        this.fruit = new Node(25,20)
    }
    grow(){
        this.growthFlag=true
        var s = document.getElementById("score")
        s.innerText = `Score: ${this.nodes.length*50+50}`
    }
    draw(){
        for(var i=0; i<this.nodes.length; i++){
            drawSquare(this.nodes[i], "green")
        }
            drawSquare(this.fruit, "red")
    }
    die(){
        alert("You Died. Score: "+String(this.nodes.length*50))
        location.reload()
    }
    Action(){
        var o = this.nodes[this.nodes.length-1]
        var n = new Node(o.x+this.vx, o.y+this.vy)

        if(n.x>29){
            n.x=0
        }    
        if(n.y>29){
            n.y=0
        }
        if(n.x<0){
            n.x=29
        }   
        if(n.y<0){
            n.y=29
        }
        //check for colisions   
        for(var i=0; i<this.nodes.length-1; i++){
            if(this.nodes[i].x==n.x && this.nodes[i].y==n.y){
                this.die()
                this.nodes.shift()
            }
        }
        if(this.fruit.x==n.x && this.fruit.y==n.y){
                this.grow()
                this.fruit = new Node(randomInt(1, 29), randomInt(1, 29))
        }
        this.x = n.x
        this.y = n.y

        this.nodes.push(n)
        if(this.growthFlag){
            this.growthFlag=false
        }else{
            this.nodes.shift()
        }

    }
    Up(){
        if(this.direction!=1){
            this.direction = 0
            this.vx=0
            this.vy=-1
        }
    }
    Down(){
        if(this.direction!=0){
            this.direction = 1
            this.vx=0
            this.vy=1
        }
    }
    Left(){
        if(this.direction!=2){
            this.direction = 3
            this.vx=-1
            this.vy=0
        }
    }
    Right(){
        if(this.direction!=3){
            this.direction = 2
            this.vx=1
            this.vy=0
        }
    }

}

var cobra = new Cobra(10, 10)



function drawAll(){
    ctx.clearRect(0,0, 300,300);
    cobra.draw()
}

function drawSquare(o, color){
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.5;
    ctx.fillRect(o.x*10, o.y*10, 10,10);
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min +1) ) + min;
}


function Gameloop(){
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
      
        switch (event.key) {
            case "ArrowDown":
                cobra.Down()
                // code for "down arrow" key press.
                break;
            case "ArrowUp":
                cobra.Up()
                // code for "up arrow" key press.
                break;
            case "ArrowLeft":
                cobra.Left()
                // code for "left arrow" key press.
                break;
            case "ArrowRight":
                cobra.Right()
                break;
            case "p":
                cobra.grow()
            default:
                return; // Quit when this doesn't handle the key event.
        }
      
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);
    cobra.Action();
    drawAll()

}
setInterval(Gameloop, 100)
