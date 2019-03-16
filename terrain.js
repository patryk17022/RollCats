
class Terrain{
    constructor(p0,p1,p2,p3,accuracy,width,texture){

    var vert2 =  [{x : p0.x , y :  p0.y}];
        var vert =  [{x : p0.x , y :  p0.y}];
     
        for (var i=0; i<1; i+=accuracy){
        var p = this.bezier(i, p0, p1, p2, p3);
        vert.push( {x : p.x , y :  p.y});
        }

        var j = 1;
        var n = 1.0/accuracy;
        console.log(n)
        for (var i=n; i>0; i-=1){

            vert.push({x: vert[i].x, y: vert[i].y-width});
        }
  

    this.sprite = Matter.Bodies.fromVertices(vert[1/(accuracy*2)].x,vert[1/(accuracy*2)].y, vert , {
        render: {
            strokeStyle: '#ffffff',
            sprite: {
                texture: './img/' + texture
            }
        },
        isStatic : true} );

    }
    bezier = function(t, p0, p1, p2, p3){
        var cX = 3 * (p1.x - p0.x),
            bX = 3 * (p2.x - p1.x) - cX,
            aX = p3.x - p0.x - cX - bX;
      
        var cY = 3 * (p1.y - p0.y),
            bY = 3 * (p2.y - p1.y) - cY,
            aY = p3.y - p0.y - cY - bY;
      
        var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
        var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;
      
        return {x: x, y: y};
      }

    bezierNormal = function(t, p0, p1, p2, p3){
        var cX = 3*(p1.x-p0.x),
            bX = 6*(p2.x-p1.x),
            aX = 3*(p3.x-p2.x);
        var cY = 3*(p1.y-p0.y),
            bY = 6*(p2.y-p1.y),
            aY = 3*(p3.y-p2.y);
        var x = (1-t)*(1-t)*(cX)+t*(1-t)*bX+t*t*aX;
        var y = (1-t)*(1-t)*(cY)+t*(1-t)*bY+t*t*aY;
    
        var length = Math.sqrt(x*x+y*y);

        var xnorm = x/length;
        var ynorm = y/length;

        return {x : -ynorm, y : xnorm};
    }
  
}