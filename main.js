canvas = document.getElementById("myCanvas");

canvas.width = 800;

//draw car with canvas context
const context = canvas.getContext("2d");
const road = new Road(canvas.width/2,canvas.width/3);
const N= 1;
const keyCar= new Car(road.getLaneCenter(0), 100, 30, 50, "KEYS",1.5,"pink");
localStorage.setItem("bestBrain", '{"levels":[{"inputs":[1,0,1,1,1],"outputs":[1,0,0,0,0,1],"bias":[-0.2530994698653006,0.1853274436090177,-0.09415925047976152,-0.16511449404420994,-0.17389910305592884,0.12503909971047833],"weights":[[0.029489114787519546,-0.00000626705369482887,-0.2253528427909262,-0.1118618801430892,-0.15501053391420436,0.016915664629885252],[-0.13001353645025035,-0.15162456553005366,-0.01210261085254347,0.08549620811411901,-0.14185989030767407,0.064332519823379],[-0.07016014855477834,0.2052787322656042,-0.3071566269102372,-0.044329720648997824,0.0859038085479914,0.11478523736412388],[-0.07985313900784258,-0.13178792367721467,0.11267108173040674,-0.021369053909761824,0.068070740892563,0.17169077600431],[0.10894625742768398,0.00833678654437876,0.14654682335003474,-0.263511058168195,-0.1773044994088836,-0.08641563448959896]]},{"inputs":[null,null,null,null,null,null],"outputs":[null,null,null,null],"bias":[0.1117322628555857,0.22763701968412528,-0.07504757075488046,-0.06463273463583616],"weights":[[0.08841670403525526,0.36838685973441293,0.011451046461649714,-0.14491746784801868,-0.26126053276841954,0.055733213408496574],[0.03748030439232644,-0.020046687262647897,-0.15271647662073914,0.1707789124553548,-0.37064056886007435,0.05775038975450301],[-0.10065902528052302,-0.20175644073521076,0.14298733347677006,-0.11309709510415843,-0.11295875017505777,-0.09480325615631612],[0.03001836173485225,0.04815572706842318,-0.004537735370918208,-0.17045969211764234,0.029660268868785037,0.05621467602213913],[0.030604742383080582,0.07227588717206702,0.22032519029294412,0.1530457493508126,0.07010959852216946,0.06185346802812601],[0.2886181218094512,-0.5511879744462888,-0.06912201587924698,0.047060829347570755,0.011763409896065606,-0.17820162597913042]]}]}');


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
    console.log(bestCar.brain);
    console.log(JSON.stringify(bestCar.brain));
    
}    

//4 lanes
const traffic = [
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY",2.5,getRandomcolor()),
    new Car(road.getLaneCenter(1), -200, 30, 50, "DUMMY",2.5,getRandomcolor()),
    new Car(road.getLaneCenter(2), -350, 30, 50, "DUMMY",2.5,getRandomcolor()),
    new Car(road.getLaneCenter(3), -300, 30, 50, "DUMMY",2.5, getRandomcolor()),
    new Car(road.getLaneCenter(0), -450, 30, 50, "DUMMY",2.6, getRandomcolor()),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY",2.6, getRandomcolor()),
    new Car(road.getLaneCenter(2), -550, 30, 50, "DUMMY",2.85, getRandomcolor()),
    new Car(road.getLaneCenter(3), -600, 30, 50, "DUMMY",2.5, getRandomcolor()),
    new Car(road.getLaneCenter(0), -650, 30, 50, "DUMMY",2.65, getRandomcolor()),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY",2.6, getRandomcolor()),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY",2.88, getRandomcolor()),
    new Car(road.getLaneCenter(3), -780, 30, 50, "DUMMY",2.65, getRandomcolor()),
    new Car(road.getLaneCenter(0), -800, 30, 50, "DUMMY",2.7, getRandomcolor()),
    new Car(road.getLaneCenter(1), -910, 30, 50, "DUMMY",2.68, getRandomcolor()),
    new Car(road.getLaneCenter(2), -900, 30, 50, "DUMMY",2.9, getRandomcolor()),
    new Car(road.getLaneCenter(3), -930, 30, 50, "DUMMY",2.78, getRandomcolor()),
    new Car(road.getLaneCenter(0), -970, 30, 50, "DUMMY",2.7, getRandomcolor()),
    new Car(road.getLaneCenter(1), -1000, 30, 50, "DUMMY",2.75, getRandomcolor()),
    new Car(road.getLaneCenter(2), -1100, 30, 50, "DUMMY",2.9, getRandomcolor()),
    new Car(road.getLaneCenter(3), -1010, 30, 50, "DUMMY",2.8, getRandomcolor()),
    new Car(road.getLaneCenter(0), -1070, 30, 50, "DUMMY",2.75, getRandomcolor()),
    new Car(road.getLaneCenter(1), -1090, 30, 50, "DUMMY",2.8, getRandomcolor()),
    new Car(road.getLaneCenter(2), -1065, 30, 50, "DUMMY",2.95, getRandomcolor()),
    new Car(road.getLaneCenter(3), -1080, 30, 50, "DUMMY",2.9, getRandomcolor())
];
//animate();
animateAI();

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


// updates movements of the car and draws it along its axis
// function animate(){
//     for(let i=0; i<traffic.length; i++){
//         traffic[i].update(road.borders,[]);
//     }
//     for(let i=0; i<aiCars.length;i++){
//         aiCars[i].update(road.borders,traffic);
//     }

//     keyCar.update(road.borders,traffic);
//     keyCar.update(road.borders,aiCars);
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
//         traffic[i].draw(context);
//     }
//     context.globalAlpha = 0.2;
//     for(let i=0; i<aiCars.length;i++){
//         aiCars[i].draw(context);
//     }

//     context.globalAlpha = 1;
//     bestCar.draw(context,true);
//     keyCar.draw(context,true);
    
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