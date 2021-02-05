const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext('2d')

//A 2 dimensions point
class Node{
    constructor(x, y){
        this.x = x 
        this.y = y
    }
}

//Defines all snake's properties and methods
class Cobra{
    constructor(x, y){
        this.x = x
        this.y = y
        this.vx = 1
        this.vy = 0
        this.growthFlag = false
        //Node array (The snake is made of many small squares)
        this.nodes = []
        //Initial condition (2 nodes facing right)
        this.direction = 2
        this.nDirection = 2
        this.nodes.push(new Node(x, y))
        this.nodes.push(new Node(x, y))
        //Each fruit is a node
        this.fruit = new Node(25,20)
    }

    //Sets the growth flag to true and adds score
    grow(){
        this.growthFlag=true
        var s = document.getElementById("score")
        s.innerText = `Score: ${this.nodes.length*50+50}`
    }

    //Draws all nodes, including the fruits
    draw(){
        for(var i=0; i<this.nodes.length; i++){
            drawSquare(this.nodes[i], "green")
        }
            drawSquare(this.fruit, "red")
    }

    //Alerts that the player lost and informs the acomplished score
    die(){
        location.reload()
        alert("You Died. Score: "+String(this.nodes.length*50))
        
    }

    //Runs once every frame. Controls and calls all other cobra methods and properties
    Action(){
        //Change veocity depending on new position
        switch(this.nDirection){
            case 0:
                this.vx=0
                this.vy=-1
                break;
            case 1:
                this.vx=0
                this.vy=1
                break;
            case 2:
                this.vx=1
                this.vy=0
                break;
            case 3:
                this.vx=-1
                this.vy=0
                break;
        }
        this.direction=this.nDirection //new direction becomes old direction
        var o = this.nodes[this.nodes.length-1]//o = last node (snake head)
        //Change position depending on velocity
        var n = new Node(o.x+this.vx, o.y+this.vy)
        //Check for borders
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
        //Add n to the node array and remove the last element (The actual movement)
        this.nodes.push(n)
        if(this.growthFlag){
            this.growthFlag=false
        }else{
            this.nodes.shift()
        }
    }
    //Changing nDirection
    Up(){
        if(this.direction!=1){
            this.nDirection = 0
        }
    }
    Down(){
        if(this.direction!=0){
            this.nDirection = 1
        }
    }
    Left(){
        if(this.direction!=2){
            this.nDirection = 3
        }
    }
    Right(){
        if(this.direction!=3){
            this.nDirection = 2
        }
    }
}

var cobra = new Cobra(10, 10)//Instantiate the snake(Object of type Cobra)

//Clean background and call Cobra drawing function
function drawAll(){
    ctx.clearRect(0,0, 300,300);
    cobra.draw()
}

//General function to draw a square of a certain a position and color
function drawSquare(o, color){
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.5;
    ctx.fillRect(o.x*10, o.y*10, 10, 10);
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min +1) ) + min;
}


function Gameloop(){
    //Get User Input
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
    cobra.Action();//Calls cobra's every frame routine
    drawAll()//Calls the drawing routine
}
setInterval(Gameloop, 100)//Loops every 100 ms