import * as Matter from 'matter-js';
import {Terrain} from './terrain';
import {GameObject} from './gameObject';
import {EGZOController} from 'EGZOController';


 class  GameEngine {
    Engine: typeof Matter.Engine;
    Render: typeof Matter.Render;
    MenuStart: boolean;
    sound: any;
    runner: Matter.Runner;
    Composites: typeof Matter.Composites;
    Composite: typeof Matter.Composite;
    //Common: any;
    Body: typeof Matter.Body;
    Bounds: typeof Matter.Bounds;
    Bodies: typeof Matter.Bodies;
    Events: typeof Matter.Events;
    World: typeof Matter.World;
    controller: any;
    currentValue: number;
    levelDimension: { x: number; y: number; };
    engine: Matter.Engine;
    world: Matter.World;
    zoom: number;
    player!: GameObject;
    friend!: GameObject;
    endPoint!: Matter.Body;//??
    catFollows: boolean;
    mouse: null;
    currentLevel: number;
    render: Matter.Render;
    obj: any;
   
    

    constructor() {
        this.Engine = Matter.Engine;
        this.Render = Matter.Render;
        this.runner = Matter.Runner.create();
        this.Composites = Matter.Composites;
        this.Composite = Matter.Composite;
       // this.Common = Matter.Common;
        this.Body = Matter.Body;
        this.Bodies = Matter.Bodies;
        this.Bounds = Matter.Bounds;
        this.Events = Matter.Events;
        this.MenuStart = true;
        this.World = Matter.World;
        this.controller = new EGZOController();

        this.currentValue = 0.0;

        this.levelDimension = {
            x: 2000, y: 2000
        };

        this.engine = this.Engine.create();
        this.world = this.engine.world;
        this.zoom = 1.0;
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

        this.sound = new Audio('./msc/Carefree.mp3');
        var promise = this.sound.play();
        if (promise !== null){
            promise.catch(() => { console.log("NI MA MUZYCZKI"); })
        }
        console.log("START")
        this.MainLoop();

    }

     tmp():any {

            if (this.player.sprite) {

                this.Body.applyForce(this.player.sprite, { x: 0, y: 0 }, { x: this.currentValue / 1000.0, y: 0 });
                this.player.sprite.torque = this.currentValue;
            }

    
            if (this.player.sprite.position.x < -1000 ||
                this.player.sprite.position.x > 3000 ||
                this.player.sprite.position.y < -1000 ||
                this.player.sprite.position.y > 3000 ||
                this.friend.sprite.position.x < -1000 ||
                this.friend.sprite.position.x > 3000 ||
                this.friend.sprite.position.y < -1000 ||
                this.friend.sprite.position.y > 3000) {
                this.Composite.remove(this.world, this.friend.sprite)
                this.Composite.remove(this.world, this.player.sprite)

                var playerStart = { x: this.obj[this.currentLevel]["startPos"].x * this.levelDimension.x, y: this.obj[this.currentLevel]["startPos"].y * this.levelDimension.y };
                var friendStart = { x: this.obj[this.currentLevel]["friendPos"].x * this.levelDimension.x, y: this.obj[this.currentLevel]["friendPos"].y * this.levelDimension.y };
                this.player = new GameObject(playerStart.x, playerStart.y, 0.025 * this.levelDimension.x, 'cat.png', false);

                this.friend = new GameObject(friendStart.x, friendStart.y, 0.015 * this.levelDimension.x, 'catChild.png', false);
                Matter.Sleeping.set(this.friend.sprite, true);
                this.friend.sprite.density = 25.0 / 9.0;

                this.friend.sprite.mass = 25.0 / 9.0;
                this.friend.sprite.inverseMass = 9.0 / 25.0;
                this.currentValue = 0.0;

                this.World.add(this.world, this.player.sprite);
                this.World.add(this.world, this.friend.sprite);
                this.catFollows = false;
            }

            var distanceBetweenCats = Math.sqrt(Math.pow(this.player.sprite.position.x - this.friend.sprite.position.x, 2) +
                Math.pow(this.player.sprite.position.y - this.friend.sprite.position.y, 2));

            if (distanceBetweenCats < 150) {
                this.catFollows = true;
                Matter.Sleeping.set(this.friend.sprite, false);
            }

            var lateralDistanceBetweenCats = Math.min(Math.max(this.player.sprite.position.x - this.friend.sprite.position.x, -200.0), 200.0);

            if (Math.abs(lateralDistanceBetweenCats) < 100) {
                lateralDistanceBetweenCats = 0.0;
            }
            if (this.catFollows == true) {

                this.Body.applyForce(this.friend.sprite, { x: 0, y: 0 }, { x: lateralDistanceBetweenCats / 50000.0, y: 0 });
                this.friend.sprite.torque = lateralDistanceBetweenCats / (2000.0);
                console.log(lateralDistanceBetweenCats);
            }

            var distanceToEndPoint = Math.sqrt(Math.pow(this.player.sprite.position.x - this.endPoint.position.x, 2) +
                Math.pow(this.player.sprite.position.y - this.endPoint.position.y, 2));

            if (distanceToEndPoint < 200 && distanceBetweenCats < 200 && this.catFollows) {

                this.Composite.clear(this.world, false);

                this.currentLevel += 1;
                if (this.currentLevel == this.obj["levelCount"]) {
                    this.currentLevel = 0;
                }
                this.catFollows = false;

                this.currentValue = 0.0
                var playerStart = { x: this.obj[this.currentLevel]["startPos"].x * this.levelDimension.x, y: this.obj[this.currentLevel]["startPos"].y * this.levelDimension.y };
                var friendStart = { x: this.obj[this.currentLevel]["friendPos"].x * this.levelDimension.x, y: this.obj[this.currentLevel]["friendPos"].y * this.levelDimension.y };
                var endPointLocation = { x: this.obj[this.currentLevel]["finish"].x * this.levelDimension.x, y: this.obj[this.currentLevel]["finish"].y * this.levelDimension.y };
                this.player = new GameObject(playerStart.x, playerStart.y, 0.025 * this.levelDimension.x, 'cat.png', false);

                this.friend = new GameObject(friendStart.x, friendStart.y, 0.015 * this.levelDimension.x, 'catChild.png', false);
                Matter.Sleeping.set(this.friend.sprite, true);
                this.friend.sprite.density = 25.0 / 9.0;
                this.friend.sprite.mass = 25.0 / 9.0;
                this.friend.sprite.inverseMass = 9.0 / 25.0;
                this.endPoint = this.Bodies.circle(endPointLocation.x, endPointLocation.y, 0.01 * this.levelDimension.x, {
                    isStatic: true,
                    render: {
                        strokeStyle: '#ffffff',
                        sprite: {
                            texture: './img/end.png',
                            xScale: 1,
                        yScale: 1.0
                        }
                    },
                });

                this.World.add(this.world, this.endPoint);
                this.World.add(this.world, this.player.sprite);
                this.World.add(this.world, this.friend.sprite);


                var platformWidth = 0.025 * this.levelDimension.x;

                // var text = '{"0":{"size":3},"1":{"p1x":0.05,"p1y":0.2,"p2x":0.1,"p2y":0.35,"p3x":0.4,"p3y":0.4,"p4x":0.5,"p4y":0.3},"2":{ "p1x":0.3,"p1y":0.5,"p2x":0.5,"p2y":0.6,"p3x":0.7,"p3y":0.6,"p4x":1,"p4y":0.3},"3":{"p1x":0.0,"p1y":0.6,"p2x":0.2,"p2y":1,"p3x":0.5,"p3y":1,"p4x":1,"p4y":0.5}}';
                //var obj = JSON.parse(text);
                for (var jsonTable = 1; jsonTable < this.obj[this.currentLevel][0].size + 1; jsonTable++) {

                    var points:number[][] = [
                        [this.obj[this.currentLevel][jsonTable].p1x, this.obj[this.currentLevel][jsonTable].p1y ],
                        [  this.obj[this.currentLevel][jsonTable].p2x,  this.obj[this.currentLevel][jsonTable].p2y ],
                        [ this.obj[this.currentLevel][jsonTable].p3x,  this.obj[this.currentLevel][jsonTable].p3y ],
                        [  this.obj[this.currentLevel][jsonTable].p4x,  this.obj[this.currentLevel][jsonTable].p4y ]];

                    for (var a = 0; a < points.length; a++) {
                        points[a][0] = points[a][0] * this.levelDimension.x;
                        points[a][1] = points[a][1] * this.levelDimension.y;
                    }

                    var test = new Terrain(points[0], points[1], points[2], points[3], 0.05, platformWidth, 'grass.png');
                    this.World.add(this.world, test.sprite);

                }

                this.MenuStart = false;
            }


            // center view at player 
            this.Bounds.shift(this.render.bounds,
                {
                    x: this.player.sprite.position.x - window.innerWidth / 2,
                    y: this.player.sprite.position.y - window.innerHeight / 2
                });

        }
    


    MainLoop() {

        // create runner
        if (this.MenuStart == false) {

            this.currentValue = 0;
            this.obj = require('../src/Data.json');
            this.runner = Matter.Runner.create();
            Matter.Runner.run(this.runner, this.engine);
            var playerStart = { x: this.obj[this.currentLevel]["startPos"].x * this.levelDimension.x, y: this.obj[this.currentLevel]["startPos"].y * this.levelDimension.y };
            var friendStart = { x: this.obj[this.currentLevel]["friendPos"].x * this.levelDimension.x, y: this.obj[this.currentLevel]["friendPos"].y * this.levelDimension.y };
            var endPointLocation = { x: this.obj[this.currentLevel]["finish"].x * this.levelDimension.x, y: this.obj[this.currentLevel]["finish"].y * this.levelDimension.y };
            this.player = new GameObject(playerStart.x, playerStart.y, 0.025 * this.levelDimension.x, 'cat.png', false);

            this.friend = new GameObject(friendStart.x, friendStart.y, 0.015 * this.levelDimension.x, 'catChild.png', false);
            Matter.Sleeping.set(this.friend.sprite, true);
            this.friend.sprite.density = 25.0 / 9.0;
            this.friend.sprite.mass = 25.0 / 9.0;
            this.friend.sprite.inverseMass = 9.0 / 25.0;
            this.endPoint = this.Bodies.circle(endPointLocation.x, endPointLocation.y, 0.01 * this.levelDimension.x, {
                isStatic: true,
                render: {
                    strokeStyle: '#ffffff',
                    sprite: {
                        texture: './img/end.png',
                        xScale: 1,
                    yScale: 1.0
                    }
                },
            });

            this.World.add(this.world, this.endPoint);
            this.World.add(this.world, this.player.sprite);
            this.World.add(this.world, this.friend.sprite);


            var platformWidth = 0.025 * this.levelDimension.x;

            for (var jsonTable = 1; jsonTable < this.obj[this.currentLevel][0].size + 1; jsonTable++) {

                var points:number[][] = [
                    [ this.obj[this.currentLevel][jsonTable].p1x ,  this.obj[this.currentLevel][jsonTable].p1y ],
                    [  this.obj[this.currentLevel][jsonTable].p2x,  this.obj[this.currentLevel][jsonTable].p2y ],
                    [  this.obj[this.currentLevel][jsonTable].p3x,  this.obj[this.currentLevel][jsonTable].p3y ],
                    [  this.obj[this.currentLevel][jsonTable].p4x,  this.obj[this.currentLevel][jsonTable].p4y ]];

                for (var a = 0; a < points.length; a++) {
                    points[a][0] = points[a][0] * this.levelDimension.x;
                    points[a][1] = points[a][1] * this.levelDimension.y;
                }

                var test = new Terrain(points[0], points[1], points[2], points[3], 0.05, platformWidth, '');
                this.World.add(this.world, test.sprite);
                var test = new Terrain(points[0], points[1], points[2], points[3], 0.05, platformWidth, 'grass.png');
                this.World.add(this.world, test.sprite);


            }

            this.Events.on(this.engine, 'beforeTick', () =>this.tmp());
        }
        this.Render.run(this.render);
        this.Engine.run(this.engine);
    }


}

var Game = new GameEngine();


Game.controller.onvalue = function (value:number) {
    var valueDiff = value - Game.currentValue;
    Game.currentValue = value;
};


var canvas=<HTMLCanvasElement>document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context=<CanvasRenderingContext2D>canvas.getContext('2d');
var image=new Image();
image.src="img/manu.png";
image.onload=function(){
context.drawImage(image,0,0,canvas.width,canvas.height);
};

function getMousePos(canvas:HTMLCanvasElement, event:any) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function isInside(pos:any, rect:any){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

var rect = {
    x:250,
    y:350,
    width:200,
    height:100
};

canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
 


        Game.sound = new Audio('msc/Magic Scout - Nothern Glade.mp3'); 

      Game.sound.currentTime = 0;
      Game.sound.play();
      Game.MenuStart=false;
      canvas.style.display = 'none';
      Game.MainLoop();
}, false);