scoreleftWrist=0;
song1_status="";
song2_status="";
song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;


function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function modelLoaded(){
    console.log('poseNet Is initialized');

}

function gotposes(results){
    if(results.length > 0)
   {
    console.log(results);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX= "+leftWristX+"leftWristY= "+leftWristY);
    scoreleftWrist=results[0].pose.keypoints[9].score;
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX= "+rightWristX+"rightWristY= "+rightWristY);
   }
}

function draw() {
    image(video,0,0,600,500); 
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    
    fill("#FF0000");
  stroke("#FF0000");
  if(scoreleftWrist >0.2)
  {
    circle(leftWristX,leftWristY,20);
    song1.stop();
    if(song2_status==false){
        song2.play();
        document.getElementById("song").innerHTML="playing-peterpan";
        
    }
  }
}

