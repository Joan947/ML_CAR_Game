class Sensor{
    constructor(car){
        this.car =car;
        this.rayCount = 15;
        this.rayLength = 100;
        this.raySpread = Math.PI/4;
        this.rays= [];
        this.update();
        
    }

    update(){
       this.#castRays();
    }
    #castRays(){
        this.rays = [];
        for(let i = 0; i<this.rayCount; i++){
            const rayAngle = lerp(
                this.raySpread/2,
                -this.raySpread/2,
                this.rayCount == 1? 0.5:i/(this.rayCount-1)   // this is because i cannot be equal to the rayCount
            )+this.car.angle;
                // find start and end points
            const start = {x:this.car.x, y:this.car.y};

            const end = { x:this.car.x-
                            Math.sin(rayAngle) * this.rayLength,
                          y:this.car.y-
                          Math.cos(rayAngle) * this.rayLength
                        };
            this.rays.push([start, end]);   //similar to the border concept for roads            
        };
       // console.log(this.rays);
    }
    draw(context){
         for(let i = 0; i<this.rayCount; i++){
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "yellow";
            context.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
                );
            context.lineTo(
                this.rays[i][1].x,
                this.rays[i][1].y
               );   
            context.stroke();                
        }

    }
}