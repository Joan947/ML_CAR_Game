class Road{
    constructor(x, width, laneCount =3){
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;
        // left side and right side of the road
        this.left = x-width/2;
        this.right = x+width/2;
        // want the road to go upwards and downwards infinitely but with a large value
        const infinity = 100000;
        this.top = infinity;
        this.bottom = -infinity;

        const topLeft = {x:this.left,y:this.top};
        const bottomLeft = {x:this.left,y:this.bottom};
        const topRight = {x:this.right, y:this.top};
        const bottomRight = {x:this.right, y:this.bottom};
        this.borders = [
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];

    }
    getLaneCenter(laneIndex){
        //assume the lanes are arrays of lists with index of 1st lane as 0
        const laneWidth = this.width/this.laneCount;
        //to make sure that the car will stay in within the lane
        // even if the laneindex is given a bigger number, find the
        // min of the index and the count -1
        return this.left + laneWidth/2 + Math.min(laneIndex,this.laneCount-1)*laneWidth;
    }
    draw(context){

        context.moveTo(this.borders[0][0].x-15,this.borders[0][0].y);
        context.lineTo(this.borders[0][1].x-15,this.borders[0][1].y);
        context.lineTo(this.borders[1][1].x+15,this.borders[1][1].y);
        context.lineTo(this.borders[1][0].x+15,this.borders[1][0].y);
        context.closePath();
        context.fillStyle = "#2d2d2d";
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = "white";
        
        for(let i=1; i<=this.laneCount-1;i++){
            const x = lerp(
                this.left,
                this.right,
                i/this.laneCount
            );
            //add dashes to middle lines
            context.setLineDash([20,20]);
            context.beginPath();
            context.moveTo(x, this.top);
            context.lineTo(x, this.bottom);
            context.stroke();
        }
        context.setLineDash([]);
        this.borders.forEach(border => {
            context.beginPath();
            context.moveTo(border[0].x, border[0].y);
            context.lineTo(border[1].x, border[1].y);
            context.stroke();
            
        });
        
       
        //context.lineTo(topLeft.x,topLeft.y);
        //context.fill();
        
    }
}
