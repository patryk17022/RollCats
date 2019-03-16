
class GameObject{
    constructor(x,y,size,texture,isStaticObject){
    this.sprite = Matter.Bodies.circle(x, y, size, {
        render: {
            strokeStyle: '#ffffff',
            sprite: {
                texture: './img/'+texture
            }
        },
         isStatic: isStaticObject 
    });
}
}
