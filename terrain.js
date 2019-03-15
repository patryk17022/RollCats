
class Terrain{
    constructor(p0,p1,p2,p3,accuracy,width){

     /*   var accuracy = 0.02,
        p0 = {x: 10, y: 10}, 
        p1 = {x: 50, y: 100},
        p2 = {x: 150, y: 200},
        p3 = {x: 200, y: 75},
        width = 15;*/
    
    var vert2 =  [{x : p0.x , y :  p0.y}];
        var vert =  [{x : p0.x , y :  p0.y}];
     
        for (var i=0; i<1; i+=accuracy){
        var p = this.bezier(i, p0, p1, p2, p3);
        vert.push( {x : p.x , y :  p.y});
        }

        for (var i=1/accuracy; i>0; i-=1){
            vert.push({x: vert[i].x, y: vert[i].y-width});
        }
  

    this.sprite = Matter.Bodies.fromVertices(200,200, vert , {isStatic : true} );
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
  
}