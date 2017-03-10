/**
 * Created by pawan on 7/2/17.
 */

let moveAudio, newNumberAudio, moveFalseAudio, biggestNum;

function initGame() {
    arr = [];
    // var no =1;
    for (var i = 0; i < 4; i++) {
        arr.push([]);
        for (var j = 0; j < 4; j++) {
            arr[i].push(0);
            // no++;
        }
    }
    biggestNum = Math.max(addRandomNo(),addRandomNo());

    document.addEventListener('keydown', move);

    let backgroundAudio = document.getElementById('backgroundAudio');
    console.log(backgroundAudio);
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.8;
    backgroundAudio.play();

    moveAudio = document.getElementById('moveAudio');
    moveFalseAudio = document.getElementById('moveFalseAudio');
    newNumberAudio = document.getElementById('newNumberAudio');
}

function addRandomNo() {

    var rand_arr = [];

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (arr[i][j] == 0) {
                rand_arr.push({x: i, y: j});
            }
        }
    }

    var index = Math.floor(Math.random() * rand_arr.length);

    var rp = rand_arr[index];

    arr[rp.x][rp.y] = getRandomNo();
    return arr[rp.x][rp.y];
}

function getRandomNo() {
    var r = Math.random();
    if (r > 0.2) {
        return 2;
    }
    else {
        return 4;
    }
}

function move(e) {
    moveAudio.pause();
    moveAudio.currentTime = 0;
    moveFalseAudio.pause();
    moveFalseAudio.currentTime = 0;
    newNumberAudio.pause();
    newNumberAudio.currentTime = 0;

    let moved = false, newNumber = false;

    //move left
    if (e.key == "ArrowLeft") {
        for (var i = 0; i < arr.length; i++) {          //Row traversing
            var count = 0;
            let combined = false;
            for (var j = 0; j < arr.length; j++) {      //column traversing
                if (arr[i][j] != 0) {
                    if (!combined && count != 0 && arr[i][j] == arr[i][count - 1]) {
                        arr[i][count - 1] *= 2;
                        if(arr[i][count-1] > biggestNum){
                            biggestNum = arr[i][count-1];
                            newNumber = true;
                        }
                        arr[i][j] = 0;
                        combined = true;
                        moved = true;
                    }
                    else {
                        arr[i][count] = arr[i][j];
                        if (j != count) {
                            arr[i][j] = 0;
                            moved = true;
                        }
                        combined = false;
                        count++;
                    }
                }
            }
        }
    }


    //move right
    if (e.key == "ArrowRight") {
        for (var i = 0; i < arr.length; i++) {                //Row traversing
            var count = arr.length - 1;
            let combined = false;
            for (var j = arr.length - 1; j >= 0; j--) {       //column traversing
                if (arr[i][j] != 0) {
                    if (!combined && count != arr.length - 1 && arr[i][j] == arr[i][count + 1]) {
                        arr[i][count + 1] *= 2;
                        if(arr[i][count+1] > biggestNum){
                            biggestNum = arr[i][count+1];
                            newNumber = true;
                        }
                        arr[i][j] = 0;
                        combined = true;
                        moved = true;
                    }
                    else {
                        arr[i][count] = arr[i][j];
                        if (j != count) {
                            arr[i][j] = 0;
                            moved = true;
                        }
                        combined = false;
                        count--;
                    }
                }
            }
        }
    }

    //move up
    if (e.key == "ArrowUp") {
        for (var i = 0; i < arr.length; i++) {      //column traversing
            var count = 0;
            let combined = false;
            for (var j = 0; j < arr.length; j++) {      //Row traversing
                if (arr[j][i] != 0) {
                    if (!combined && count != 0 && arr[j][i] == arr[count - 1][i]) {
                        arr[count - 1][i] *= 2;
                        if(arr[count-1][i] > biggestNum){
                            biggestNum = arr[count-1][i];
                            newNumber = true;
                        }
                        arr[j][i] = 0;
                        combined = true;
                        moved = true;
                    }
                    else {
                        arr[count][i] = arr[j][i];
                        if (j != count) {
                            arr[j][i] = 0;
                            moved = true;
                        }
                        combined = false;
                        count++;
                    }
                }
            }
        }
    }

    //move down
    if (e.key == "ArrowDown") {
        for (var i = 0; i < arr.length; i++) {      //column traversing
            var count = arr.length - 1;
            let combined = false;
            for (var j = arr.length - 1; j >= 0; j--) {      //Row traversing
                if (arr[j][i] != 0) {
                    if (!combined && count != arr.length - 1 && arr[j][i] == arr[count + 1][i]) {
                        arr[count + 1][i] *= 2;
                        if(arr[count+1][i] > biggestNum){
                            biggestNum = arr[count+1][i];
                            newNumber = true;
                        }
                        arr[j][i] = 0;
                        combined = true;
                        moved = true;
                    }
                    else {
                        arr[count][i] = arr[j][i];
                        if (j != count) {
                            arr[j][i] = 0;
                            moved = true;
                        }
                        combined = false;
                        count--;
                    }
                }
            }
        }
    }

    if(newNumber){
        newNumberAudio.play();
    }
    else if(e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "ArrowUp" || e.key == "ArrowDown"){
        moveAudio.play();
    }
    else{
        moveFalseAudio.play();
    }

    if(moved){
        addRandomNo();
        render();
    }
}

function render() {

    var tiles = document.getElementsByClassName('tile');
    for (var i = 0; i < tiles.length; i++) {
        var x = parseInt(i / 4);
        var y = i % 4;
        if (arr[x][y] != 0) {
            tiles[i].innerHTML = arr[x][y];
        }
        else {
            tiles[i].innerHTML = ".";
        }
    }

    setColors();
}

function setColors() {
    var tiles = document.getElementsByClassName('tile')

    for (var j = 0; j < tiles.length; j++) {

        var x = parseInt(j / 4);
        var y = parseInt(j % 4);
        var i = arr[x][y];

        tiles[j].className = 'tile';
        if (i == 0) {

        }
        else if (i % 2048 == 0) {
            if (i > 2048) {
                tiles[j].className += ' bigger';
            }
            else {
                tiles[j].className += ' twoZeroFourEight';
            }
        }
        else if (i % 1024 == 0) {
            tiles[j].className += ' oneZeroTwoFour';
        }
        else if (i % 512 == 0) {
            tiles[j].className += ' fiveOneTwo';
        }
        else if (i % 256 == 0) {
            tiles[j].className += ' twoFiveSix';
        }
        else if (i % 128 == 0) {
            tiles[j].className += ' oneTwoEight';
        }
        else if (i % 64 == 0) {
            tiles[j].className += ' sixFour'
        }
        else if (i % 32 == 0) {
            tiles[j].className += ' threeTwo'
        }
        else if (i % 16 == 0) {
            tiles[j].className += ' oneSix'
        }
        else if (i % 8 == 0) {
            tiles[j].className += ' eight'
        }
        else if (i % 4 == 0) {
            tiles[j].className += ' four'
        }
        else if (i % 2 == 0) {
            tiles[j].className += ' two'
        }
    }

}

initGame();
render();