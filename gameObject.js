
class GameObject{
    constructor(x,y,sizex,sizey,texture,isStaticObject){
    this.sprite = Matter.Bodies.rectangle(x, y, sizex, sizey, {
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
