 //Global Variables
            var canvas = document.getElementById('grid');        //the black window
            var canvasElement = canvas.getContext('2d');         //using the black window as 2d plane coordinate system
            var angleForWriting = 180; 
            var i=1;

    //Moving hands of the clock
            setInterval(function(){
                var time = new Date();
                var hours = time.getHours();
                var minutes = time.getMinutes();
                var seconds = time.getSeconds();
                printHands(hours , minutes , seconds);
            },1000);
            
    //Re-printing the clock afte interval of 1000ms
            function printHands(hours , minutes , seconds){
                drawRect('black',0,0,canvas.width,canvas.height);
                drawCircle('black',canvas.width/2,canvas.height/2,190,0,Math.PI*2,'stroke', 10 ,true);
                drawCircle('white',canvas.width/2,canvas.height/2,190,0,2*Math.PI,'fill',true);

    //Printing Numbers on the clock
                for(i=12;i>0;i--){
                    writeContent('black','20px Arial',i,170*Math.sin(angleForWriting*Math.PI/180),170*Math.cos(angleForWriting*Math.PI/180));
                    angleForWriting+=30;
                }

    //Saving the upper part so that seconds hand and other hands can be printed on their new place 
    //and then again restoring the canvas using restore()
                canvasElement.save();
                
    //calculating actual minutes and actual hours after every second
                var actMin = minutes+seconds/60;
                var actHou = (hours%12)+minutes/60+seconds/3600;

    //Drawing hands of the clock at interval of 1000ms
                drawRectHands('black',165*Math.cos(Math.PI*(seconds/30-1/2)),165*Math.sin(Math.PI*(seconds/30-1/2)),5);
                drawRectHands('black',145*Math.cos(Math.PI*(actMin/30-1/2)),145*Math.sin(Math.PI*(actMin/30-1/2)),10);
                drawRectHands('black',110*Math.cos(Math.PI*(actHou/30)),110*Math.sin(Math.PI*(actHou/30)),13);
                
    //Restoring the other part that has been changed
                canvasElement.restore();
                drawCircle('black',canvas.width/2,canvas.height/2,15,0,2*Math.PI,'fill', 0 ,true);
                drawCircle('white',canvas.width/2,canvas.height/2,10,0,2*Math.PI,'stroke', 2 ,true);
            }

    //Writing on canvas
            function writeContent(color , features , title , xcoord , ycoord){
                canvasElement.fillStyle = color;
                canvasElement.font = features;
                canvasElement.fillText(title , canvas.width/2+xcoord-7 , canvas.height/2+ycoord+7);
            }

    //Drawing rectangle
            function drawRect(color , topx , topy , width , height){
                canvasElement.fillStyle = color;
                canvasElement.fillRect(topx , topy , width , height);
            }

    //Drawing circle
            function drawCircle(color , centrex , centrey , radius , initang , finalang , style , width , condition){
                canvasElement.beginPath();
                canvasElement.arc(centrex , centrey , radius , initang , finalang , condition);
                if(style == 'fill'){
                    canvasElement.fillStyle = color;
                    canvasElement.fill();
                }
                else{
                    canvasElement.strokeStyle = color;
                    canvasElement.strokeWidth = width;
                    canvasElement.stroke();
                }
            }
        
    //Drawing hands
            function drawRectHands(color , xcoord , ycoord , width){
                canvasElement.beginPath();
                canvasElement.moveTo(canvas.width/2,canvas.height/2);
                canvasElement.lineTo(canvas.width/2+xcoord,canvas.height/2+ycoord);
                canvasElement.strokeStyle = color;
                canvasElement.lineWidth = width;
                canvasElement.lineCap = 'round';
                canvasElement.stroke();
            }
