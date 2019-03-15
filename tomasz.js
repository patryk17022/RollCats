var controller = new EGZOController();

class Position {
    constructor(wysokosc, szerokosc) {
      this.x=wysokosc;
      this.y=szerokosc;
    }
  }

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

function bezier(p1, p2,p3,a)
{
    var Px=p1.x*(1-a)*(1-a)+p2.x*a*(1-a)+2*p3.x*a;
var Py=p1.y*(1-a)*(1-a)+p2.y*a*(1-a)+2*p3.y*a;
    return new Position(Px,Py);
}

var Body = Matter.Body;
var boxA = Bodies.rectangle(400, 200, 80, 80);

var p1= new Position(200,100);
var p2 = new Position(400,400);
var p3 = new Position(500,100);
//new Position(500,100),new Position(600,0),new Position(700,100)
var p4= new Position(0,300);
var p5= new Position(300,0);
var p6= new Position(700,300);
var bezierTable=[p1,p2,p3,new Position(500,100),new Position(600,0),new Position(700,100)];

var tmpTable=[p1,p2];



var table=[Bodies.rectangle(p1.x,p1.y, 100, 20, { isStatic: true,angle:-40 })];

// for(var a=0;a<10;a++)
// {
//     table.push(Bodies.rectangle(600, 100+a*20, 100, 20, { isStatic: true,angle:-40 }))
// }





//P1, P2, P3 (x, y)
//P = P1*(t-1)^2+P2*t*(t-1)+P3*t*t
//P' = 2*P1*t -2*P1 + 2*P2*t - P2 + 2*P3*t
//V(x, y)
//length = sqrt(V.x*V.x + V.y*V.y)
//V.x/length
//V.y/length
//
var Px=0;
var Py=0;

var Ppx=0;
var Ppy=0;
var len;

var Vx;
var Vy;

var circleTab=[];
//var beginPoint = P(0)
for(var b=0;b<bezierTable.length/3+1;b+=2)
for(var a = 0; a <=1.0; a += 0.1)
{
// Px=p1.x*(1-a)*(1-a)+p2.x*a*(1-a)+2*p3.x*a;
// Py=p1.y*(1-a)*(1-a)+p2.y*a*(1-a)+2*p3.y*a;
// Ppx=2*p1.x*a-2*p1.x+2*p2.x*a-p2.x+2*p3.x*a;
// Ppy=2*p1.y*a-2*p1.y+2*p2.y*a-p2.y+2*p3.y*a;
// len=Math.sqrt(Ppx*Ppx+Ppy*Ppy);
//circleTab.push(Bodies.circle(Px,Py,10, { isStatic: true}));
var tmpPos=bezier(bezierTable[b],bezierTable[b+1],bezierTable[b+2],a);
circleTab.push(Bodies.circle(tmpPos.x,tmpPos.y,10, { isStatic: true}));
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
for(var a=0;a<circleTab.length;a++)World.add(engine.world, [circleTab[a]]);


// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
