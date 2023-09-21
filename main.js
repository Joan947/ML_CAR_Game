canvas = document.getElementById("myCanvas");

canvas.width = 800;

//draw car with canvas context
const context = canvas.getContext("2d");
const road = new Road(canvas.width/2,canvas.width/3);
const tCars= 21;
const N= 1000;
const keyCar= new Car(road.getLaneCenter(0), 100, 30, 50, "KEYS",3,"white");
const aiCars = generateCars(N);
let bestCar = aiCars[0];
if(localStorage.getItem("bestBrain")){
    // bestCar.brain = JSON.parse(
    //         localStorage.getItem("bestBrain")
    //     );
    for(let i=0; i<aiCars.length;i++){
        aiCars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain")
        );
        
        if(i!=0){
            NeuralNetwork.mutate(aiCars[i].brain,0.2)
        }
    }
    
}    
const traffic = [
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY",2.5,getRandomcolor()),
    new Car(road.getLaneCenter(1), -200, 30, 50, "DUMMY",2.5,getRandomcolor()),
    new Car(road.getLaneCenter(2), -350, 30, 50, "DUMMY",2.5,getRandomcolor()),
    new Car(road.getLaneCenter(3), -300, 30, 50, "DUMMY",2.5, getRandomcolor()),
    new Car(road.getLaneCenter(0), -450, 30, 50, "DUMMY",3, getRandomcolor()),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY",2.5, getRandomcolor()),
    new Car(road.getLaneCenter(2), -550, 30, 50, "DUMMY",3, getRandomcolor()),
    new Car(road.getLaneCenter(3), -600, 30, 50, "DUMMY",2.5, getRandomcolor()),
    new Car(road.getLaneCenter(0), -650, 30, 50, "DUMMY",3, getRandomcolor()),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY",3, getRandomcolor()),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY",3.5, getRandomcolor()),
    new Car(road.getLaneCenter(3), -780, 30, 50, "DUMMY",3, getRandomcolor()),
    new Car(road.getLaneCenter(0), -800, 30, 50, "DUMMY",3.5, getRandomcolor()),
    new Car(road.getLaneCenter(1), -900, 30, 50, "DUMMY",3, getRandomcolor()),
    new Car(road.getLaneCenter(2), -900, 30, 50, "DUMMY",3.5, getRandomcolor()),
    new Car(road.getLaneCenter(3), -980, 30, 50, "DUMMY",3.5, getRandomcolor()),
    new Car(road.getLaneCenter(0), -1000, 30, 50, "DUMMY",3.8, getRandomcolor())
];
animateAI();
// game();

// generate N-number of cars to speed up training of neural network
function generateCars(N){
    const aiCars = [];
    for(let i=0; i<N; i++){
        aiCars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
    return aiCars;
}
function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}
function discard(){
    localStorage.removeItem("bestBrain");
}
// function game(){
//     let button = document.getElementById("game");
//     button.addEventListener("click", event=>{
//        if(event.button.onClick()){
//         window.location.reload();
//         animate();
//        }
//         else{
//             animateAI();
//         }
//     });

//     //window.location.reload();
    
// }

// updates movements of the car and draws it along its axis
// function animate(){
//     for(let i=0; i<traffic.length; i++){
//         traffic[i].update(road.borders,[]);
//     }
//     for(let i=0; i<aiCars.length;i++){
//         aiCars[i].update(road.borders,traffic);
//     }
//     keyCar.update(road.borders,traffic);
//     //fitness function
//     bestCar= aiCars.find(
//         c=>c.y==Math.min(
//             ...aiCars.map(c=>c.y)
//         )
//     );
//     canvas.height = window.innerHeight;
//     //create the moving road effect using translate
//     context.save();
//     context.translate(0,-keyCar.y+canvas.height*0.75);//for manual control car
//     road.draw(context);
//     for(let i=0; i<traffic.length; i++){
//         traffic[i].draw(context, "green");
//     }
//     context.globalAlpha = 0.2;
//     for(let i=0; i<aiCars.length;i++){
//         aiCars[i].draw(context, "blue");
//     }

//     context.globalAlpha = 1;
//     bestCar.draw(context, "pink",true);
//     keyCar.draw(context, "red",true);
    
//     context.restore();
//     requestAnimationFrame(animate);
// }

function animateAI(){
    for(let i=0; i<traffic.length; i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0; i<aiCars.length;i++){
        aiCars[i].update(road.borders,traffic);
    }
   
    //fitness function
    bestCar= aiCars.find(
        c=>c.y==Math.min(
            ...aiCars.map(c=>c.y)
        )
    );
    canvas.height = window.innerHeight;
    //create the moving road effect using translate
    context.save();
    context.translate(0,-bestCar.y+canvas.height*0.75);//for ai control car
    
    road.draw(context);
    for(let i=0; i<traffic.length; i++){
        traffic[i].draw(context);
    }
    context.globalAlpha = 0.2;
    for(let i=0; i<aiCars.length;i++){
        aiCars[i].draw(context);
    }

    context.globalAlpha = 1;
    bestCar.draw(context,true);
    
    context.restore();
    requestAnimationFrame(animateAI);
}