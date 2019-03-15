class GameEngine{

    constructor() {    
        this.Engine = Matter.Engine;
        this.Render = Matter.Render;
        this.Runner = Matter.Runner;
        this.Composites = Matter.Composites;
        this.Composite = Matter.Composite;
        this.Common = Matter.Common;
        this.Bodies = Matter.Bodies;
        this.Bounds = Matter.Bounds;
        this.Events = Matter.Events;
        this.World = Matter.World;
        this.controller = new EGZOController();

        this.currentValue = 0.0;
        
        this.engine = this.Engine.create();
        this.world = this.engine.world;

        this.render = this.Render.create({
            element: document.body,
            engine: this.engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: '#0f0f13',
                showAngleIndicator: false,
                wireframes: false,
                hasBounds: true
            }
        });
    

        this.MainLoop();
    }

    MainLoop(){

        // create runner
        this.runner = this.Runner.create();
        this.Runner.run(this.runner, this.engine);
        
        var obj = new GameObject(300,250,64,64,'cat.png',true);

        var boxA = this.Bodies.circle(400, 200, 80);

        
        var ground = this.Bodies.rectangle(window.innerWidth/2, window.innerHeight - 30, window.innerWidth, 60, { isStatic: true });
        
        this.World.add(this.world, boxA);
        this.World.add(this.world, ground);

        this.Events.on(this.engine, 'beforeTick', function() {
        
                // apply zoom
                var canvas = document.getElementById('canvas');
                var ctx = canvas.getContext("2d");
                ctx.translate(window.innerWidth/2, window.innerHeight/2);
                ctx.scale(this.zoom, this.zoom);
                ctx.translate(-window.innerWidth/2, -window.innerHeight/2);  
        
            // center view at player 
            this.Bounds.shift(this.render.bounds,
            {
                x: boxA.position.x - window.innerWidth / 2,
                y: boxA.position.y - window.innerHeight / 2
            });
        
        }.bind(this));

        
        var test = new Terrain({x: 10, y: 10},{x: 50, y: 100},{x: 150, y: 200},{x: 200, y: 75},0.02,25);
        this.World.add(this.world, test.sprite);


        this.Render.run(this.render);
        this.Engine.run(this.engine);



    }

    

    


}

var Game = new GameEngine();

Game.controller.onvalue = function(value)
{
    var valueDiff = value - Game.currentValue;
    Game.currentValue = value;

    var rotationValue = valueDiff/3.141

    Game.Composite.rotate( Game.world, rotationValue, {x: window.innerWidth/2, y: window.innerHeight/2});

};