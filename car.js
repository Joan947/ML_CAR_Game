class Car{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.03;
        this.angle = 0;
        this.damaged = false;
        this.roadBorders = [];
        this.sensor = new Sensor(this);
        this.controls = new Controls();
        
    }
    // remember that y axis is positive downwards
    update(roadBorders){
       if(!this.damaged){
        this.#move();
       this.roadBorders=roadBorders.map(road=>road);
       this.polygon = this.#createPolygon();
       this.damaged = this.#assessDamage(roadBorders);
       }
       
       this.sensor.update(roadBorders);
    }
    #assessDamage(roadBorders){
        for(let i=0; i<roadBorders.length; i++){
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true;
            }
        }
        return false;
    }

    #createPolygon(){
        const points = [];
        const radius = Math.hypot(this.width,this.height)/2;
        const alpha = Math.atan2(this.width,this.height);
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*radius,
            y:this.y-Math.cos(this.angle-alpha)*radius
        });
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*radius,
            y:this.y-Math.cos(this.angle+alpha)*radius
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*radius,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*radius
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*radius,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*radius
        });
        return points;
    }
    #move(){
        if(this.controls.forward){
            this.speed += this.acceleration;
        }
        if(this.controls.reverse){
            this.speed -= this.acceleration;
        }
        if(this.speed > this.maxSpeed){
            this.speed = this. maxSpeed;
        }
        if(this.speed < -this.maxSpeed/2){
            this.speed = -this. maxSpeed/2;
        }
        if(this.speed > 0){
            this.speed -= this.friction;
        }
        if(this.speed < 0){
            this.speed += this.friction;
        }
        if(Math.abs(this.speed)< this.friction){
            this.speed = 0;
        }
        if(this.speed != 0){
            const flip = this.speed>0?1 :-1;
            if(this.controls.left){
                this.angle+=0.03*flip;
            }
            if(this.controls.right){
                this.angle-=0.03*flip;
            }
        }
       
        this.x -= Math.sin(this.angle)*this.speed ;
        this.y -= Math.cos(this.angle)*this.speed ;
    }
    draw(context){
        // this draws a rect 
        // context.save();
        // context.translate(this.x, this.y);
        // context.rotate(-this.angle);
        // context.beginPath();
        // context.rect(
        //     -this.width/2,
        //     -this.height/2,
        //     this.width,
        //     this.height
        // );
        // context.fill();
        // context.restore();
        if (this.damaged){
            context.fillStyle = "red";
            context.font = "48px bold Arial";
            context.fillText("GAME OVER",this.x+30, this.y-30);
        }
        else{
            context.fillStyle = "black";
        }

        //this draws a polygon that will enable us to know the front
        // and back sides of the object

        context.beginPath();
        context.moveTo(this.polygon[0].x, this.polygon[0].y);
        for(let i =0 ; i<this.polygon.length;i++){
            context.lineTo(this.polygon[i].x,this.polygon[i].y);
        }
        //out of lane detection
        for(let i =0 ; i<this.polygon.length;i++){
            if(this.polygon[i].x + 15< this.roadBorders[0][0].x
                || this.polygon[i].x + 15< this.roadBorders[0][1].x
                || this.polygon[i].x - 15> this.roadBorders[1][0].x
                || this.polygon[i].x - 15> this.roadBorders[1][1].x){
                context.fillStyle = "red";
            context.font = "48px bold Arial";
            context.fillText("OUT OF LANE",this.x+25, this.y-70);
            }
        }
        
        context.fill();
        this.sensor.draw(context);  
          
        ;
    }
}

//  export default Car;