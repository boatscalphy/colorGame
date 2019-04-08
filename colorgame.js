// Function to generate a random integer
function randomInt(max) {
    return Math.floor(Math.random() * (max));
}

// Assigning a unique color to all the squares in the game
function rngSquares(square, colors) {

    for (i=0; i < square.length; i++) {
        square[i].style.backgroundColor=colors[i]
    }
}

// Function to generate a random RGB color
function generateColor() {
    var red = String(randomInt(255));
    var green = String(randomInt(255));
    var blue = String(randomInt(255));
    return "rgb(" + red + ", " + green + ", " + blue + ")"
}

//Function to create 6 random RGB colors to assign to squares in rngSquares function
function assignSquare() {
    var arr = [];

    // Add rgb value to array until there are 6 unique colors in array
    while (arr.length !== 6) {
        var color = generateColor();

        // Check to make sure rgb value is unique
        if (!arr.includes(color)) {
            arr.push(color);
        }
    }

    return arr;
}

//Squares in game have a class of sqare. Using this variable to store them for use in rngSquares/ event listening.
var squares = document.querySelectorAll(".square")

//Will use .innerText method to modify the h1 to display the rgb Color that needs to be selected
var rgbText = document.querySelector("h1")
var colorList = assignSquare();

//Variable that we will use to display incorrect or correct status after selection
var resp = document.querySelector(".checker")

//Randomly assigning colors to squares on board.
rngSquares(squares, colorList)

//Choosing a random square's rgb value for the game.
rgbText.innerText = colorList[randomInt(6)]

var banner = document.querySelector(".banner")

//Adding event listeners for each square
for (i=0; i < squares.length; i++) {
    squares[i].addEventListener("click",function(){

        //if the selected square is the correct RGB value display Corect! and Reset the board with a new set of colors
        if (this.style.backgroundColor.toUpperCase() === rgbText.innerText) {
            resp.innerText = "Correct!";

            setTimeout(function(){
                resp.innerText = null;
            }, 750)

            colorList = assignSquare();
            banner.style.backgroundColor = rgbText.innerText;
            rngSquares(squares, colorList);
            rgbText.innerText = colorList[randomInt(6)];

        }

        //if the selected square does not match the RGB text in the banner - notify the user that that was an incorrect selection and hide the square.
        else {
            this.style.backgroundColor = "rgb(50, 50, 50)";
            resp.innerText = "Wrong!";

            setTimeout(function(){
                resp.innerText = null;
            }, 750);

        }

    })
}