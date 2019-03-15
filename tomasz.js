var controller = new EGZOController();



var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
element: document.body,
engine: engine,
options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false
}
});

var Body = Matter.Body;
var boxA = Bodies.rectangle(400, 200, 80, 80);


var table=[Bodies.rectangle(600, 100, 100, 20, { isStatic: true,angle:-40 })];

for(var a=0;a<10;a++)
{
    table.push(Bodies.rectangle(600, 100+a*20, 100, 20, { isStatic: true,angle:-40 }))
}

var tmptable=[];



//P1, P2, P3 (x, y)
//P = P1*(t-1)^2+P2*t*(t-1)+P3*t*t
//P' = 2*P1*t -2*P1 + 2*P2*t - P2 + 2*P3*t
//V(x, y)
//length = sqrt(V.x*V.x + V.y*V.y)
//V.x/length
//V.y/length
//

var beginPoint = P(0)
for(var a = 0; a <=1.0; a += 0.1)
{

}

 //var wall1 =Bodies.rectangle(400, 350, 100, 20, { isStatic: true,angle:-40 });
//=Bodies.trapezoid(280, 160, 20, 80, 0.33, {
//     angle: -1.57,
//     isStatic: true
// });
// Bodies.polygon(400,350,5,19);
//
//Bodies.rectangle(400, 350, 720, 20, { isStatic: true });

var posx = 0;
controller.onvalue = function(value)
{

    if(value > 0.5){
        posx++;

    }else if (value < -0.5){
        posx--;
    }

    //Body.translate( boxA, {x: posx, y: 0});
    Body.rotate(boxA,(posx*2*3.14)/360);
};

Matter.Events.on(engine, 'collisionStart', function(event) {
    let a = event.pairs.boxA;
    let b = event.pairs.bodyB;

    // check bodies, do whatever...
});

var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA,ground,table[0]]);


// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
