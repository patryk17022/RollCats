var controller = new EGZOController();



var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies;

var currentValue=0.0;

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
var boxA = Bodies.circle(400, 200, 80);
var posx = 0;
var ground = Bodies.rectangle(window.innerWidth/2, window.innerHeight - 30, window.innerWidth, 60, { isStatic: true });
World.add(engine.world, ground);
controller.onvalue = function(value)
{
    var valueDiff = value - currentValue;
    currentValue = value;

    var rotationValue = valueDiff/3.141

    Matter.Composite.rotate( engine.world, rotationValue, {x: window.innerWidth/2, y: window.innerHeight/2});
};

// add all of the bodies to the world
World.add(engine.world, [boxA,ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
