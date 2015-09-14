/**
 * Created with IntelliJ IDEA.
 * User: clarkhardaway
 * Date: 4/15/14
 * Time: 3:15 PM
 * To change this template use File | Settings | File Templates.
 */

//FIX GLOBAL VARIABLES
var toFreeze = 0;
function scoreDice(scores, dieImages){
    var tempScores = scores;
    toFreeze = 0;
    var totalScore = 0;
    var loopCount = 0;

    //TURN INTO WHILE LOOP ONCE EVERYTHING IS CHECKED
    while (scoreCounter != 0) {
        var scoreCounter = 0;
        console.log("tempScores beginning "+tempScores);
        tempScores.sort(compareNumbers());
        loopCount++;

        //Check for 6 dice straight
        if (tempScores.length == 6) {

            var scoresBool = new Array(tempScores.length);
            for(var i = 0; i < tempScores.length - 1; i++){
                scoresBool[i] = (tempScores[i + 1] - tempScores[i]) == 1;
            }
            if($.inArray(false,scoresBool) == -1){
                totalScore += 1500;
                scoreCounter += 1500;
                tempScores.splice(0,tempScores.length);
                toFreeze += tempScores.length;
            }
        }

        //Check for sets
        for(var i = tempScores.length;i>2;i--){
            totalScore += checkOK(tempScores,i);
            scoreCounter += checkOK(tempScores,i);
        }
        console.log("tempScores = "+ tempScores);

        //Handle any single scorers
        totalScore += scoreSingles(tempScores);
        scoreCounter += scoreSingles(tempScores);
        console.log("tempScores end = "+ tempScores)


    }
    if(loopCount == 1 && totalScore == 0){
        new Messi('You didn\'t score any points',{autoclose:600, title:'All dice have been scored', titleClass:'error'});
        changePlayer(dieImages);
    } else {
        new Messi('You scored some points!',{autoclose:600, title:'All dice have been scored', titleClass:'success'});
    }
    console.log("score = "+ totalScore);
    console.log("freezing " + toFreeze);

    return totalScore;
}

function scoreSingles(array){
    var runningScore = 0;
    while($.inArray(1,array) != -1){
        tempScores.splice(($.inArray(1,array)),1);
        toFreeze++;
        runningScore += 100;
    }
    while($.inArray(5,array) != -1){
        tempScores.splice(($.inArray(5,array)),1);
        toFreeze++;
        runningScore += 50;
    }
    return runningScore;
}

function compareNumbers(a, b){
    return a - b;
}

function spliceDice(toSplice,max){
    console.log("toSplice = "+toSplice + ", max = "+max );
    for(var n = max;n>0;n--){
        console.log("n index "+n+", current index = "+ toSplice[n]);
        tempScores.splice((toSplice[n-1]),1);
        toFreeze++;
        console.log("currentTemp "+tempScores);
    }
}

function checkOK(array, max){
    for(var i = 0;i < (array.length - max)+1;i++){
        for (var k = 1;k<=6;k++) {
            var checkBool = new Array(max);
            var toSplice = new Array(max);
            for (var j = 0; j < max; j++) {
                checkBool[j] = array[j+i] == k;
                toSplice[j] = j+i;
            }
            if ($.inArray(false, checkBool) == -1) {
                if(max == 6){
                    spliceDice(toSplice,max);
                    return 3000;
                }
                else if(max == 5){
                    spliceDice(toSplice,max);
                    return 2000;
                }
                else if(max == 4){
                    spliceDice(toSplice,max);
                    return 1000;
                }
                else if (max == 3){
                    if(k == 1){
                        spliceDice(toSplice,max);
                        return 700;
                    } else {
                        spliceDice(toSplice,max);
                        return k * 100;
                    }
                }
            }
        }
    }
    return 0;
}

