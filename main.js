class GameEngine{

    constructor() {    
        this.Engine = Matter.Engine;
        this.Render = Matter.Render;
        this.Runner = Matter.Runner;
        this.Composites = Matter.Composites;
        this.Common = Matter.Common;
        this.World = Matter.World;
        this.controller = new EGZOController();
        
        this.engine = this.Engine.create(),
        this.world = this.engine.world;

        this.render = this.Render.create({
            element: document.body,
            engine: this.engine,
            options: {
                width: 800,
                height: 600,
                background: '#0f0f13',
                showAngleIndicator: false,
                wireframes: false
            }
        });
    

        this.MainLoop();
    }

    MainLoop(){
        this.Render.run(this.render);

        // create runner
        this.runner = this.Runner.create();
        this.Runner.run(this.runner, this.engine);

        var obj = new GameObject(300,250,64,64,'cat.png',true);

        this.World.add(this.world, obj.sprite);
    }



}

var Game = new GameEngine();