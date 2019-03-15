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
    wireframes: false,
    hasBounds: true
}
});

var Body = Matter.Body;
var boxA = Bodies.circle(400, 200, 80);
var posx = 0;
var ground = Bodies.rectangle(window.innerWidth/2, window.innerHeight - 30, window.innerWidth, 60, { isStatic: true });
World.add(engine.world, boxA);
World.add(engine.world, ground);

Matter.Events.on(this.engine, 'beforeTick', function() {
     
        // apply zoom
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext("2d");
        ctx.translate(window.innerWidth/2, window.innerHeight/2);
        ctx.scale(this.zoom, this.zoom);
        ctx.translate(-window.innerWidth/2, -window.innerHeight/2);  

    // center view at player 
    Matter.Bounds.shift(render.bounds,
    {
        x: boxA.position.x - window.innerWidth / 2,
        y: boxA.position.y - window.innerHeight / 2
    });

}.bind(this));

controller.onvalue = function(value)
{
    var valueDiff = value - currentValue;
    currentValue = value;

    var rotationValue = valueDiff/3.141

    Matter.Composite.rotate( engine.world, rotationValue, {x: window.innerWidth/2, y: window.innerHeight/2});
};


// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
