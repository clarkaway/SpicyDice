/**
 * Created with IntelliJ IDEA.
 * User: clarkhardaway
 * Date: 4/1/14
 * Time: 3:33 PM
 */

//Game state
var playerTurn = 1;
var hasWon = false;
var rollResults;

$(document).ready(function () {

    //Create array of dice imgs
    var dieImages = new Array(6);
    var diceimgsrc = new Array(6);
    rollResults = new Array(6);

    //Instantiate Players
    var player1 = {};
    var player2 = {};

    //Set Players Scores
    player1.score = player2.score  = 0;
    for(var i = 1; i <= 2; i++){
        $('#player'+i+'score').attr("value","0");
    }

    for (var i = 0; i < dieImages.length; i++){
        var temp = $("#die"+(i+1));
        dieImages[i] = temp;
        diceimgsrc[i] = temp.attr('src');
        console.log(""+diceimgsrc[i]);
    }


    $('#roll').click(function(){

        //Iterate through array to change class
        for(var j = toFreeze; j < dieImages.length; j++){
            changeClass(dieImages[j], diceimgsrc[j]);
        }
        setTimeout(function(){
            for(var j = toFreeze; j < dieImages.length; j++){
                var temp = Math.floor(Math.random() * 6);
                changeClass(dieImages[j],
                    diceimgsrc[temp]);
                rollResults[j] = temp + 1;
            }
            console.log(rollResults);
            }, 1000);
    });

    //Instructions pop-up
    $('#howto').click(function(){
        new Messi('Spicy Dice is a fun game for up to 2 people!<br/>' +
            'Click the \"ROLL\" button to roll the dice<br/>' +
            'If at any point you do not score points on a roll your turn is over and you must pass the dice to the next player<br/>' +
            'Select the dice you want to score, you <b>must</b> score to continue rolling<br/>' +
            'If you do score points click the \"SCORE\" button to lock in your points, those dice are now not rollable unless you score points on the remaining dice<br/>' +
            'After you score your points you may \"PASS\" the dice to the next player, or keep rolling<br/>' +
            'If you have scored points on all six dice over the course of your turn you get to start again with all six dice and continue to build up your points!<br/>' +
            'If you pass your dice, the next player can either roll the remaining dice you have passed or start fresh with all six dice<br/>' +
            'If the player chooses to roll the remaining dice and scores on any of those dice that player will get all of the points the previous player just scored<br/>' +
            'However, if that player rolls the dice and does not score any points they must pass the dice immediately<br/>' +
            'Whichever player reaches 10,000 points first is the winner.<br/><br/>' +
            'HAVE FUN!',
            {title: 'How To Play', modal: true, center: true,
            titleClass: 'warning'});
    });

    //Determine which dice are selected and score them
    $('#scoreDice').click(function(){

        if(playerTurn == 1){
            player1.score += scoreDice(rollResults, dieImages);
            $('#player1score').val(player1.score);
        } else {
            player2.score += scoreDice(rollResults, dieImages);
            $('#player2score').val(player2.score);
        }
        console.log("after splice "+rollResults);
        displayNoDice(dieImages);
        rollResults.splice(0,toFreeze);

    });

    $('#pass').click(function(){
        changePlayer(dieImages);
    });

});

function handleSelect(img){
    //Change color of border
    if ($(img).hasClass('diceSelected')){
        $(img).removeClass('diceSelected');
    } else {
        $(img).addClass('diceSelected');
    }
}

function changeClass(img, imgsrc){
    $(img).removeAttr('src').end();
    if($(img).hasClass('diceanimation')){
        $(img).removeClass('diceanimation');
        $(img).attr("src", imgsrc);
        console.log("img src is " + imgsrc);
    } else {
        $(img).addClass('diceanimation');
    }
}

function displayDice(dieImages){
    for (var i = 0;i < dieImages.length;i++){
        $(dieImages[i]).removeClass('diceNoDisplay');
    }
}

function displayNoDice (dieImages){
    for (var i = 0;i < toFreeze;i++){
        $(dieImages[i]).addClass('diceNoDisplay');
    }
}

function changePlayer(dieImages){
    toFreeze = 0;
    displayDice(dieImages);
    if(playerTurn == 1){
        playerTurn = 2;
    } else {
        playerTurn = 1;
    }
    new Messi('It\'s Player '+playerTurn +'\'s turn!',{autoclose:800, title:'NEXT!', titleClass:'info'});
}