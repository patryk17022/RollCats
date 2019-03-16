
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
        this.MenuStart=true;
        this.World = Matter.World;
        this.sound;
        this.controller = new EGZOController();

        this.currentValue = 0.0;

        this.levelDimension = {
            x: 2000, y: 2000};
        
        this.engine = this.Engine.create();
        this.world = this.engine.world;
        this.zoom = 0.5;
        this.player = null;
        this.friend = null;
        this.catFollows = false;
        this.mouse = null;
        

        this.render = this.Render.create({
            element: document.body,
            engine: this.engine,
            options: {
                width: this.levelDimension.x,
                height: this.levelDimension.y,
                showAngleIndicator: false,
                wireframes: false,
                hasBounds: true,
                background: 'rgb(176,213,230)'
            }
        });
        
         this.sound= new Audio('msc/Carefree.mp3');
      this.sound.play();
        this.MainLoop();
       
    }



    MainLoop(){

        // create runner
        if(this.MenuStart==false)
        {
        this.runner = this.Runner.create();
        this.Runner.run(this.runner, this.engine);
        this.engine.timing.timeScale = 0.3;
        var playerStart = {x: 0.1*this.levelDimension.x, y: 0.1*this.levelDimension.y};
        var friendStart = {x: 0.915*this.levelDimension.x, y: 0.365*this.levelDimension.y};
        this.player = new GameObject(playerStart.x, playerStart.y, 0.025*this.levelDimension.x,'cat.png',false);

        this.friend = new GameObject(friendStart.x, friendStart.y, 0.015*this.levelDimension.x,'catChild.png',false);
        

        this.World.add(this.world, this.player.sprite);
        this.World.add(this.world, this.friend.sprite);




        // var text = '{"0":{"size":3},"1":{"p1x":0.05,"p1y":0.2,"p2x":0.1,"p2y":0.35,"p3x":0.4,"p3y":0.4,"p4x":0.5,"p4y":0.3},"2":{ "p1x":0.3,"p1y":0.5,"p2x":0.5,"p2y":0.6,"p3x":0.7,"p3y":0.6,"p4x":1,"p4y":0.3},"3":{"p1x":0.0,"p1y":0.6,"p2x":0.2,"p2y":1,"p3x":0.5,"p3y":1,"p4x":1,"p4y":0.5}}';
        //var obj = JSON.parse(text);
        var obj = JSON.parse(data);
        for(var jsonTable=1;jsonTable<obj[0].size+1;jsonTable++)
        {
        
        var points = [
            {x: obj[jsonTable].p1x, y: obj[jsonTable].p1y},
            {x: obj[jsonTable].p2x, y: obj[jsonTable].p2y},
            {x: obj[jsonTable].p3x, y: obj[jsonTable].p3y},
            {x: obj[jsonTable].p4x, y: obj[jsonTable].p4y}];

        for(var a = 0; a < points.length; a++)
        {
            points[a].x = points[a].x*this.levelDimension.x;
            points[a].y = points[a].y*this.levelDimension.y; 
        }

        var platformWidth = 0.025*this.levelDimension.x;

        var test = new Terrain(points[0], points[1], points[2], points[3],0.02,platformWidth, 'grass.png');
        this.World.add(this.world, test.sprite);
    }
       
        // var points = [
        //     {x: 0.3, y: 0.5},
        //     {x: 0.5, y: 0.6},
        //     {x: 0.7, y: 0.6},
        //     {x: 1, y: 0.3}];

        // for(var a = 0; a < points.length; a++)
        // {
        //     points[a].x = points[a].x*this.levelDimension.x;
        //     points[a].y = points[a].y*this.levelDimension.y; 
        // }

        // var test = new Terrain(points[0], points[1], points[2], points[3],0.02,platformWidth,'grass.png');
        // this.World.add(this.world, test.sprite);


        // var points = [
        //     {x: 0.0, y: 0.6},
        //     {x: 0.2, y: 1.0},
        //     {x: 0.5, y: 1.0},
        //     {x: 1, y: 0.5}];

        // for(var a = 0; a < points.length; a++)
        // {
        //     points[a].x = points[a].x*this.levelDimension.x;
        //     points[a].y = points[a].y*this.levelDimension.y; 
        // }

        // var test = new Terrain(points[0], points[1], points[2], points[3],0.02,platformWidth, 'grass.png');
        // this.World.add(this.world, test.sprite);
        
        this.Events.on(this.engine, 'beforeTick', function() {

            

            // apply zoom
            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext("2d");
            ctx.translate(window.innerWidth/2, window.innerWidth/2);
            ctx.scale(this.zoom, this.zoom);
            ctx.translate(-window.innerWidth/2, -window.innerWidth/2); 

            var distanceBetweenCats = Math.sqrt(Math.pow(this.player.sprite.position.x - this.friend.sprite.position.x, 2) + 
            Math.pow(this.player.sprite.position.y - this.friend.sprite.position.y, 2));

            if(distanceBetweenCats < 100)
            {
                this.catFollows = true;
            }
            else if(!this.catFollows)
            {
                    var gravity = this.engine.world.gravity;

                this.Body.applyForce(this.friend.sprite, {
                    x: 0,
                    y: 0
                }, {
                    x: -gravity.x * gravity.scale * this.friend.sprite.mass,
                    y: -gravity.y * gravity.scale * this.friend.sprite.mass
                });

                this.Body.setAngularVelocity(this.friend.sprite, 0);
            }
        
        // center view at player 
        this.Bounds.shift(this.render.bounds,
        {
            x: this.player.sprite.position.x - window.innerWidth/2,
            y: this.player.sprite.position.y - window.innerHeight/2
        });
        
        }.bind(this));
    }
    this.Render.run(this.render);
    this.Engine.run(this.engine);
}


}

var Game = new GameEngine();


Game.controller.onvalue = function(value)
{
    var valueDiff = value - Game.currentValue;
    Game.currentValue = value;

    if((value>=0.05 || value<=-0.05) && Game.MenuStart!=false)
    {
        Game.sound.pause();
        Game.sound = new Audio('msc/Magic Scout - Nothern Glade.mp3'); 
        Game.sound.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        Game.sound.play();
        Game.MenuStart=false;
        Game.MainLoop();
    }

    var rotationValue = valueDiff*1.57

    Game.Composite.rotate( Game.world, rotationValue, {x: Game.levelDimension.x/2, y: Game.levelDimension.y/2});
};