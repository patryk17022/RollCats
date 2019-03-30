
import Matter from "matter-js";

export class GameObject {
    public sprite: Matter.Body;

    constructor(x:number, y:number, size:number, texture:String, isStaticObject:boolean) {
         this.sprite = Matter.Bodies.circle(x, y, size
            , {
            render: {
                strokeStyle: '#ffffff',
                sprite: {
                    texture: './img/' + texture,
                    xScale: 1,
                yScale: 1.0
                }
            },
            isStatic: isStaticObject
        }
        );
        this.sprite.frictionAir = 0.2;
        this.sprite.frictionStatic = 0;
        this.sprite.friction = 0.5;
        this.sprite.mass = 1.0;
        this.sprite.inverseMass = 1.0 / 1.0;

    }
}
