canvas = document.getElementById("myCanvas");

canvas.width = 200;

//draw car with canvas context
const context = canvas.getContext("2d");
//used this canvas.width*0.9 to bring the road inwards
const road = new Road(canvas.width/2,canvas.width*0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);

animate();
// updates movements of the car and draws it alongits axis
function animate(){
    car.update(roadBorders);
    canvas.height = window.innerHeight;
    //create the moving road effect using translate
    context.save();
    context.translate(0,-car.y+canvas.height*0.75);
    road.draw(context);
    car.draw(context);
    context.restore();
    requestAnimationFrame(animate);
}