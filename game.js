var colors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$("body").keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});
$(".btn").click(function(){
    //Selecting color of button clicked by the user:
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    //Applying and playing sound to button clicked by user;
    playSound(userChosenColor);

    //Applying Animation to user click
    animatePress(userChosenColor);

    //Checking Correctness Of Answer:
    checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        //If Answer is correct
        //console.log("Success!");

        //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if(userClickedPattern.length === gamePattern.length){

            //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        //if answer is wrong!
        //console.log("Wrong Answer!");

        //Playing sound of wrong answer:
        playSound("wrong");

        //Applying Animation Of Wrong Answer:
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        //Saying user to start over again:
        $("h1").text("Game Over, Press Any Key to Restart");

        //Restarting the game
        startOver();
    }
}
function nextSequence(){
    userClickedPattern = [];
    //Choosing a random number:
    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber*4);

    //Choosing a random color from the array with help of random number:
    var randomColorChosen = colors[randomNumber];

    gamePattern.push(randomColorChosen);

    //Applying FadeIn and Fadeout animation with help of jQuery id selector: 
    $("#"+randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);

    //Applying and playing the sound of the particular color chosen:
    playSound(randomColorChosen);
    $("h1").text("Level "+level);
    level = level+1;
}
function animatePress(userColor){
    $("."+userColor).addClass("pressed");
    setTimeout(function(){
        $("."+userColor).removeClass("pressed");
    },100);
}

function playSound(name){
    
    var aud = new Audio("sounds/"+name+".mp3");
    aud.play();
}
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}