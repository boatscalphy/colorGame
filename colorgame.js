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

var squares = document.querySelectorAll(".square")
var rgbText = document.querySelector("h1")
var colorList = assignSquare();

rngSquares(squares, colorList)
rgbText.innerText = colorList[randomInt(6)]
