
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
        this.zoom = 1.0;
        this.player = null;
        this.friend = null;
        this.endPoint = null;
        this.catFollows = false;
        this.mouse = null;
        this.currentLevel = 0;
        

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
            
        this.obj = JSON.parse(data);
        this.runner = this.Runner.create();
        this.Runner.run(this.runner, this.engine);
        this.engine.timing.timeScale = 0.3;
        var playerStart = {x: this.obj[this.currentLevel]["startPos"].x*this.levelDimension.x, y: this.obj[this.currentLevel]["startPos"].y*this.levelDimension.y};
        var friendStart = {x: this.obj[this.currentLevel]["friendPos"].x*this.levelDimension.x, y: this.obj[this.currentLevel]["friendPos"].y*this.levelDimension.y};
        var endPointLocation = {x: this.obj[this.currentLevel]["finish"].x*this.levelDimension.x, y: this.obj[this.currentLevel]["finish"].y*this.levelDimension.y};
        this.player = new GameObject(playerStart.x, playerStart.y, 0.025*this.levelDimension.x,'cat.png',false);

        this.friend = new GameObject(friendStart.x, friendStart.y, 0.015*this.levelDimension.x,'catChild.png',false);
        this.endPoint = this.Bodies.circle(endPointLocation.x, endPointLocation.y, 0.01*this.levelDimension.x,{
             isStatic: true 
        });

        this.World.add(this.world, this.endPoint);
        this.World.add(this.world, this.player.sprite);
        this.World.add(this.world, this.friend.sprite);


        var platformWidth = 0.025*this.levelDimension.x;

        // var text = '{"0":{"size":3},"1":{"p1x":0.05,"p1y":0.2,"p2x":0.1,"p2y":0.35,"p3x":0.4,"p3y":0.4,"p4x":0.5,"p4y":0.3},"2":{ "p1x":0.3,"p1y":0.5,"p2x":0.5,"p2y":0.6,"p3x":0.7,"p3y":0.6,"p4x":1,"p4y":0.3},"3":{"p1x":0.0,"p1y":0.6,"p2x":0.2,"p2y":1,"p3x":0.5,"p3y":1,"p4x":1,"p4y":0.5}}';
        //var obj = JSON.parse(text);
        for(var jsonTable=1;jsonTable<this.obj[this.currentLevel][0].size+1;jsonTable++)
        {
        
        var points = [
            {x: this.obj[this.currentLevel][jsonTable].p1x, y: this.obj[this.currentLevel][jsonTable].p1y},
            {x: this.obj[this.currentLevel][jsonTable].p2x, y: this.obj[this.currentLevel][jsonTable].p2y},
            {x: this.obj[this.currentLevel][jsonTable].p3x, y: this.obj[this.currentLevel][jsonTable].p3y},
            {x: this.obj[this.currentLevel][jsonTable].p4x, y: this.obj[this.currentLevel][jsonTable].p4y}];

        for(var a = 0; a < points.length; a++)
        {
            points[a].x = points[a].x*this.levelDimension.x;
            points[a].y = points[a].y*this.levelDimension.y; 
        }

        var test = new Terrain(points[0], points[1], points[2], points[3],0.05,platformWidth,'grass.png');
        this.World.add(this.world, test.sprite);


    }
        
        this.Events.on(this.engine, 'beforeTick', function() {

            if(this.player.sprite.position.x < -1000 || 
                this.player.sprite.position.x > 3000 ||
                this.player.sprite.position.y < -1000 ||
                this.player.sprite.position.y > 3000  ||
                this.friend.sprite.position.x < -1000 || 
                this.friend.sprite.position.x > 3000 ||
                this.friend.sprite.position.y < -1000 ||
                this.friend.sprite.position.y > 3000 )
                {
                    this.Composite.remove(this.world, this.friend.sprite)
                    this.Composite.remove(this.world, this.player.sprite)

                    var playerStart = {x: this.obj[this.currentLevel]["startPos"].x*this.levelDimension.x, y: this.obj[this.currentLevel]["startPos"].y*this.levelDimension.y};
                    var friendStart = {x: this.obj[this.currentLevel]["friendPos"].x*this.levelDimension.x, y: this.obj[this.currentLevel]["friendPos"].y*this.levelDimension.y};
                    this.player = new GameObject(playerStart.x, playerStart.y, 0.025*this.levelDimension.x,'cat.png',false);

                    this.friend = new GameObject(friendStart.x, friendStart.y, 0.015*this.levelDimension.x,'catChild.png',false);
                    
                    
                     var rotationValue = this.currentValue*1.57;
                     this.Composite.rotate( Game.world, rotationValue, {x: Game.levelDimension.x/2, y: Game.levelDimension.y/2});

                     this.currentValue = 0.0;

                     this.World.add(this.world, this.player.sprite);
                    this.World.add(this.world, this.friend.sprite);
                    // this.Body.setPosition(this.player.sprite, {x: 0.1*this.levelDimension.x, y: 0.1*this.levelDimension.y})
                    // this.Body.setPosition(this.friend.sprite, {x: 0.15*this.levelDimension.x, y: 0.1*this.levelDimension.y})
                    this.catFollows = false;
                    // this.Body.setAngularVelocity(this.player.sprite, 0);
                    // this.Body.setAngularVelocity(this.friend.sprite, 0);
                    // this.Body.setVelocity(this.player.sprite, {x: 0, y: 0});
                    // this.Body.setVelocity(this.friend.sprite, {x: 0, y: 0});
                }

            // apply zoom
            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext("2d");
            ctx.translate(window.innerWidth/2, window.innerWidth/2);
            ctx.scale(this.zoom, this.zoom);
            ctx.translate(-window.innerWidth/2, -window.innerWidth/2); 

            var distanceBetweenCats = Math.sqrt(Math.pow(this.player.sprite.position.x - this.friend.sprite.position.x, 2) + 
            Math.pow(this.player.sprite.position.y - this.friend.sprite.position.y, 2));

            if(distanceBetweenCats < 150)
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

            
            var distanceToEndPoint = Math.sqrt(Math.pow(this.player.sprite.position.x - this.endPoint.position.x, 2) + 
            Math.pow(this.player.sprite.position.y - this.endPoint.position.y, 2));

            if(distanceToEndPoint < 200 && distanceBetweenCats < 200 && this.catFollows)
            {
                
                this.Composite.clear(this.world, false);
                this.currentLevel += 1;
                this.catFollows=false;

                var rotationValue = this.currentValue*1.57;
                this.Composite.rotate( Game.world, rotationValue, {x: Game.levelDimension.x/2, y: Game.levelDimension.y/2});

                this.currentValue=0.0
                var playerStart = {x: this.obj[this.currentLevel]["startPos"].x*this.levelDimension.x, y: this.obj[this.currentLevel]["startPos"].y*this.levelDimension.y};
                var friendStart = {x: this.obj[this.currentLevel]["friendPos"].x*this.levelDimension.x, y: this.obj[this.currentLevel]["friendPos"].y*this.levelDimension.y};
                var endPointLocation = {x: this.obj[this.currentLevel]["finish"].x*this.levelDimension.x, y: this.obj[this.currentLevel]["finish"].y*this.levelDimension.y};
                this.player = new GameObject(playerStart.x, playerStart.y, 0.025*this.levelDimension.x,'cat.png',false);

                this.friend = new GameObject(friendStart.x, friendStart.y, 0.015*this.levelDimension.x,'catChild.png',false);
                this.endPoint = this.Bodies.circle(endPointLocation.x, endPointLocation.y, 0.01*this.levelDimension.x,{
                    isStatic: true 
                });

                this.World.add(this.world, this.endPoint);
                this.World.add(this.world, this.player.sprite);
                this.World.add(this.world, this.friend.sprite);


                var platformWidth = 0.025*this.levelDimension.x;

                // var text = '{"0":{"size":3},"1":{"p1x":0.05,"p1y":0.2,"p2x":0.1,"p2y":0.35,"p3x":0.4,"p3y":0.4,"p4x":0.5,"p4y":0.3},"2":{ "p1x":0.3,"p1y":0.5,"p2x":0.5,"p2y":0.6,"p3x":0.7,"p3y":0.6,"p4x":1,"p4y":0.3},"3":{"p1x":0.0,"p1y":0.6,"p2x":0.2,"p2y":1,"p3x":0.5,"p3y":1,"p4x":1,"p4y":0.5}}';
                //var obj = JSON.parse(text);
                for(var jsonTable=1;jsonTable<this.obj[this.currentLevel][0].size+1;jsonTable++)
                {
                
                var points = [
                    {x: this.obj[this.currentLevel][jsonTable].p1x, y: this.obj[this.currentLevel][jsonTable].p1y},
                    {x: this.obj[this.currentLevel][jsonTable].p2x, y: this.obj[this.currentLevel][jsonTable].p2y},
                    {x: this.obj[this.currentLevel][jsonTable].p3x, y: this.obj[this.currentLevel][jsonTable].p3y},
                    {x: this.obj[this.currentLevel][jsonTable].p4x, y: this.obj[this.currentLevel][jsonTable].p4y}];

                for(var a = 0; a < points.length; a++)
                {
                    points[a].x = points[a].x*this.levelDimension.x;
                    points[a].y = points[a].y*this.levelDimension.y; 
                }

                var test = new Terrain(points[0], points[1], points[2], points[3],0.05,platformWidth,'grass.png');
                this.World.add(this.world, test.sprite);

                }

                Game.MenuStart=false;
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

    var rotationValue = valueDiff*1.57;

    Game.Composite.rotate( Game.world, rotationValue, {x: Game.levelDimension.x/2, y: Game.levelDimension.y/2});
};