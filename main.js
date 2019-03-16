
class GameEngine{

    constructor() {    
        this.Engine = Matter.Engine;
        this.Render = Matter.Render;
        this.Runner = Matter.Runner;
        this.Composites = Matter.Composites;
        this.Composite = Matter.Composite;
        this.Common = Matter.Common;
        this.Body = Matter.Body;
        this.Bodies = Matter.Bodies;
        this.Bounds = Matter.Bounds;
        this.Events = Matter.Events;
        this.World = Matter.World;
        this.controller = new EGZOController();

        this.currentValue = 0.0;

        this.levelDimension = {
            x: 2000, y: 2000};
        
        this.engine = this.Engine.create();
        this.world = this.engine.world;
        this.zoom = 0.5;
        this.player = null;
        

        this.render = this.Render.create({
            element: document.body,
            engine: this.engine,
            options: {
                width: this.levelDimension.x,
                height: this.levelDimension.y,
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

        var playerStart = {x: 0.1*this.levelDimension.x, y: 0.1*this.levelDimension.y};
        this.player = new GameObject(playerStart.x, playerStart.y, 0.025*this.levelDimension.x,'cat.png',false);


        this.World.add(this.world, this.player.sprite);


        var points = [
            {x: 0.05, y: 0.2},
            {x: 0.1, y: 0.35},
            {x: 0.5, y: 0.4},
            {x: 0.7, y: 0.3}];

        for(var a = 0; a < points.length; a++)
        {
            points[a].x = points[a].x*this.levelDimension.x;
            points[a].y = points[a].y*this.levelDimension.y; 
        }

        var platformWidth = 0.025*this.levelDimension.x;

        var test = new Terrain(points[0], points[1], points[2], points[3],0.02,platformWidth);
        this.World.add(this.world, test.sprite);

        
        var points = [
            {x: 0.15, y: 0.4},
            {x: 0.2, y: 1},
            {x: 0.6, y: 0.8},
            {x: 1, y: 0.3}];

        for(var a = 0; a < points.length; a++)
        {
            points[a].x = points[a].x*this.levelDimension.x;
            points[a].y = points[a].y*this.levelDimension.y; 
        }

        var test = new Terrain(points[0], points[1], points[2], points[3],0.02,platformWidth);
        this.World.add(this.world, test.sprite);


        this.Render.run(this.render);
        this.Engine.run(this.engine);

        this.Events.on(this.engine, 'beforeTick', function() {
        
            // apply zoom
            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext("2d");
            ctx.translate(window.innerWidth/2, window.innerWidth/2);
            ctx.scale(this.zoom, this.zoom);
            ctx.translate(-window.innerWidth/2, -window.innerWidth/2); 

            if(this.player.sprite.position.x < 0 || this.player.sprite.position.x > this.levelDimension.x || this.player.sprite.position.y > this.levelDimension.y)
            {
                // this.player.sprite.position.x =  0.1*this.levelDimension.x;
                // this.player.sprite.position.y = 0.1*this.levelDimension.y;
                // this.Body.setStatic(this.player.sprite, true);


            }
        
        // center view at player 
        this.Bounds.shift(this.render.bounds,
        {
            x: this.player.sprite.position.x - window.innerWidth/2,
            y: this.player.sprite.position.y - window.innerHeight/2
        });
        
        }.bind(this));
    }


}

var Game = new GameEngine();


Game.controller.onvalue = function(value)
{
    var valueDiff = value - Game.currentValue;
    Game.currentValue = value;

    var rotationValue = valueDiff*1.57

    Game.Composite.rotate( Game.world, rotationValue, {x: Game.levelDimension.x/2, y: Game.levelDimension.y/2});
    console.log(Game.player.sprite.position)
};