import Matter from "matter-js";

export class Terrain{
    sprite: Matter.Body;
    constructor(p0:number[],p1:number[],p2:number[],p3:number[],accuracy:number,width:number,texture:string){

    var vert2 =  [{x : p0[0] , y :  p0[1]}];
        //var vert =  [{x : p0[0] , y :  p0[1]}];
        var vert =  new Array();

        for (var i=0; i<=1; i+=accuracy){
        var p = this.bezier(i, p0, p1, p2, p3);
        vert.push( {x : p.x , y :  p.y});

        }

        var j = 1;
        var n = 1.0/accuracy;
        for (var i=n-1; i>0; i-=1){
 
            vert.push({x:vert[i].x,y:vert[i].y-width} );
            
        }
  
     
        if(texture)
        this.sprite = Matter.Bodies.fromVertices(vert[1/(accuracy*2)].x,vert[1/(accuracy*2)].y, vert , 
        {
            isStatic: true,
            render: {
                sprite: {
                    texture: './img/' + texture,
                    xScale: 2,
                    yScale: 2.0
                }
            }
        }
    );
        // {
        //     isStatic : true,
        //     render: {
        //         strokeStyle: '#ffffff',
        //         sprite: {
        //             texture: './img/' + texture,
        //             yScale: 2.0
        //         }
        //     }
        //     } 
        //     );
            
        else
        this.sprite = Matter.Bodies.fromVertices(vert[1/(accuracy*2)].x,vert[1/(accuracy*2)].y, vert , {
            render: {
                fillStyle: `yellow`
      
                
            },
            isStatic : true} );

    }
    bezier = function(t:number, p0:number[],p1:number[],p2:number[],p3:number[]){
        var cX = 3 * (p1[0] - p0[0]),
            bX = 3 * (p2[0] - p1[0]) - cX,
            aX = p3[0] - p0[0] - cX - bX;
      
        var cY = 3 * (p1[1] - p0[1]),
            bY = 3 * (p2[1] - p1[1]) - cY,
            aY = p3[1] - p0[1] - cY - bY;
      
        var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0[0];
        var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0[1];
      
        return {x: x, y: y};
      }

    bezierNormal = function(t:number, p0:number[],p1:number[],p2:number[],p3:number[]){
        var cX = 3*(p1[0]-p0[0]),
            bX = 6*(p2[0]-p1[0]),
            aX = 3*(p3[0]-p2[0]);
        var cY = 3*(p1[1]-p0[1]),
            bY = 6*(p2[1]-p1[1]),
            aY = 3*(p3[1]-p2[1]);
        var x = (1-t)*(1-t)*(cX)+t*(1-t)*bX+t*t*aX;
        var y = (1-t)*(1-t)*(cY)+t*(1-t)*bY+t*t*aY;
    
        var length = Math.sqrt(x*x+y*y);

        var xnorm = x/length;
        var ynorm = y/length;

        return {x : -ynorm, y : xnorm};
    }
  
}