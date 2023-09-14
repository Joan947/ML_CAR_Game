canvas = document.getElementById("myCanvas");

canvas.width = window.innerWidth;

//draw car with canvas context
const context = canvas.getContext("2d");
//used this canvas.width*0.9 to bring the road inwards
const road = new Road(canvas.width/2,canvas.width/4);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY",2)
];
animate();
// updates movements of the car and draws it alongits axis
function animate(){
    for(let i=0; i<traffic.length; i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic);
    canvas.height = window.innerHeight;
    //create the moving road effect using translate
    context.save();
    context.translate(0,-car.y+canvas.height*0.75);
    road.draw(context);
    for(let i=0; i<traffic.length; i++){
        traffic[i].draw(context, "green");
    }
    car.draw(context, "pink");
    context.restore();
    requestAnimationFrame(animate);
}