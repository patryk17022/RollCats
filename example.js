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
engine: engine
});

var Body = Matter.Body;
var boxA = Bodies.rectangle(400, 200, 80, 80,{ isStatic: true });
var posx = 0;
controller.onvalue = function(value)
{

    if(value > 0.5){
        posx++;

    }else if (value < -0.5){
        posx--;
    }

  //  Body.translate( boxA, {x: posx, y: 0});
    Body.rotate(boxA,posx*2*3.14/360);
};

var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA,ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
