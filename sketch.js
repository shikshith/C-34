var hypnoticBall;
var database,position;
var hypnoticBallPosition;
/*create the realtime database in google firebase,register the data base,get the connection string(CDN)
copy the conection string and past it before the link tag in index.html
copy  <script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js"></script> and paste on the next lineand change app to data base
<script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-database.js"></script>
*/
function setup(){
    //create the database and save it 
    database=firebase.database()
    createCanvas(500,500);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";
    //ref is used to reffer to a location in the data base
     hypnoticBallPosition=database.ref('ball/position');
     //on is a listner which keeps listning to the changes in the value of the refered position,if any change in value, calls the read position function
     // if any problem in reading the position, calls show error function     
     hypnoticBallPosition.on("value",readPosition,showError)
}

function draw(){
    background("white");
    //to draw the ball or write to the database only when we have the position of the ball
    if(position !== undefined){
        if(keyDown("a")){
            writePosition(-1,0);
        }
        else if(keyDown("d")){
            writePosition(1,0);
        }
        else if(keyDown("w")){
            writePosition(0,-1);
        }
        else if(keyDown("s")){
            writePosition(0,+1);
        }
        drawSprites();
    }
    
}
//write the new position of the ball to the data base
function writePosition(x,y){
    database.ref('ball/position').set({
     'x':position.x+x,
     'y':position.y+y
    })

}
//read the position of the ball from the data base
function readPosition(data){
    // val extracts the value from the data 
    position=data.val()
    hypnoticBall.x=position.x;
    hypnoticBall.y=position.y;
}
//shows the error if problem in reading the value
function showError( ){
    console.log("error in reading the position");
}
