/*
 *
 * Cinema Expandido Web
 * Pixel Array (19/mar/18)
 * Kaori Hayama
 * 
 *
 * URL
 https://kao-w.github.io/pixelarray_tarea2/
 */


/*
 *****************************************
 *****************************************
 * VARIABLES
 *****************************************
 *****************************************
 */

var video;

/*
 *****************************************
 *****************************************
 * LIFE CYCLE METHODS
 *****************************************
 *****************************************
 */
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  createCanvas(displayWidth, displayHeight);
  initializeVideo();
}


function draw() {
  background(0);
  drawVideo5();
  
  noStroke();
}

/*
 *****************************************
 *****************************************
 * VIDEO METHODS
 *****************************************
 *****************************************
 */
 
 function initializeVideo(){
   video= createVideo("assets/videos/video1.mp4");
   video.loop();
   video.hide();
 }
 
 function drawVideo(){ 
   var correctionX = (windowWidth/2 - video.width/2);
   var correctionY = (windowHeight/2 - video.height/2);
   
   video.loadPixels();
   
   for(var y=0; y<video.height; y++){
    for(var x=0; x<video.width;x++){
      var index = (x+(y*video.width))*4;
      
      video.pixels[index] = 111; //aqui tengo los rojos
      video.pixels[index + 1] = video.pixels[index + 2]; //aqui tengo los verdes
      video.pixels[index + 2] = video.pixels[index ]; //aqui tengo los azules
      video.pixels[index + 3] = video.pixels[index + 3]; //aqui tengo el alpha
    }
   }
   
   
   video.updatePixels();
   
   image(video,correctionX,correctionY);
   
   
 }
 
 function drawVideo5(){ 
   var correctionX = (windowWidth/2 - video.width/2);
   var correctionY = (windowHeight/2 - video.height/2);
   
   video.loadPixels();
   
   var stepSize= 10;
   
   
    for(var y=0; y<video.height; y++){
    for(var x=0; x<video.width;x++){
      var index = (x+(y*video.width))*4;

      
      video.pixels[index] = 111; //aqui tengo los rojos
      video.pixels[index + 1] = video.pixels[index + 2]; //aqui tengo los verdes
      video.pixels[index + 2] = video.pixels[index + 5]; //aqui tengo los azules
      video.pixels[index + 3] = video.pixels[index + 3]; //aqui tengo el alpha
    }
   }

   
   for(var y=0; y<video.height; y+=stepSize){
    for(var x=0; x<video.width;x+= stepSize){
      
      var index = (x+(y*video.width))*4;
      var darkness= (255-video.pixels[index])/255;
      var radio = 0;
      var sca= 0.08;
      var sca2= 6.08;
      var aaa= noise(x*sca+frameCount,y*sca+frameCount);
      var bbb= noise(x*sca2+frameCount*-1,y*sca2+frameCount*-1);
      var distancia = dist(mouseY-correctionY, mouseX-correctionX, y, x)
      
      if(distancia<150){
        radio = int(map(distancia*2,0,350,20,5*darkness));
         fill(video.pixels[index+2],video.pixels[index+2*radio],video.pixels[index+1]);
         ellipse(x+correctionX,y+correctionY,radio*aaa,radio*aaa);
         
         
      }
      
      else{
        radio=3;
        fill(video.pixels[index+3],video.pixels[index+2],video.pixels[index+1]);
        
        rect(x+correctionX,y+correctionY,bbb*3,bbb*3);

        
      }
     
      
      //ellipse(x+correctionX,y+correctionY,radio,radio);
    }
   }
   //video.updatePixels();
   //image(video,correctionX,correctionY);
 }
 

 
 