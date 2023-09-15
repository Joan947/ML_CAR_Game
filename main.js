canvas = document.getElementById("myCanvas");

canvas.width = window.innerWidth-400;

//draw car with canvas context
const context = canvas.getContext("2d");
//used this canvas.width*0.9 to bring the road inwards
const road = new Road(canvas.width/2,canvas.width/3);
const N= 100;
const cars = generateCars(N);
let bestCar = cars[0];
if(localStorage.getItem("bestBrain")){
    bestCar.brain = JSON.parse(
        localStorage.getItem("bestBrain")
     );
}    
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY",2)
];

animate();

// generate N-number of cars to speed up training of neural network
function generateCars(N){
    const cars = [];
    for(let i=0; i<=N; i++){
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
    return cars;
}
function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}
function discard(){
    localStorage.removeItem("bestBrain");
}
// updates movements of the car and draws it along its axis
function animate(){
    for(let i=0; i<traffic.length; i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0; i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    bestCar= cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        )
    );
    canvas.height = window.innerHeight;
    //create the moving road effect using translate
    context.save();
    context.translate(0,-bestCar.y+canvas.height*0.75);
    road.draw(context);
    for(let i=0; i<traffic.length; i++){
        traffic[i].draw(context, "green");
    }
    context.globalAlpha = 0.2;
    for(let i=0; i<cars.length;i++){
        cars[i].draw(context, "blue");
    }

    context.globalAlpha = 1;
    bestCar.draw(context, "pink",true)
    context.restore();
    requestAnimationFrame(animate);
}