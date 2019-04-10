// Function to generate a random integer exclusive of the max specified
function randomInt(max) {
    return Math.floor(Math.random() * (max));
}

// Assigning a unique color to all the squares in the game
function rngSquares(square, colors) {

    for (i=0; i < square.length; i++) {
        square[i].style.backgroundColor = colors[i]
    }
}

// Function to generate a random RGB color
function generateColor() {
    var red = String(randomInt(256));
    var green = String(randomInt(256));
    var blue = String(randomInt(256));

    //Making sure we do not randomly generate the same color as the board.
    if (red === 50 && green === 50 && blue === 50) {
        generateColor();
    }
    
    else { 
        return "rgb(" + red + ", " + green + ", " + blue + ")"
    }
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

//Creating a variablbe to indicate what the current game mode is - default is HARD.
var gameMode = "HARD"
//Squares in game have a class of sqare. Using this variable to store them for use in rngSquares/ event listening.
var squares = document.querySelectorAll(".square")

//Will use .innerText method to modify the h1 to display the rgb Color that needs to be selected
var rgbText = document.querySelector(".colorSelector")
var colorList = assignSquare();

//Variable that we will use to display incorrect or correct status after selection
var resp = document.querySelector(".checker")

//Randomly assigning colors to squares on board.
rngSquares(squares, colorList)

//Choosing a random square's rgb value for the game.
rgbText.innerText = colorList[randomInt(6)]

//Variable to store the banner properties which will be used to access background color (.sytle.backgroundColor)
var banner = document.querySelector(".banner")

//Creating an event listener to generate a new list of colors for tiles when clicked on.
document.querySelector(".newcolors").addEventListener("click",function(){
    banner.style.backgroundColor = "rgb(78, 119, 206)"
    colorList = assignSquare();
    rngSquares(squares, colorList);
    rgbText.innerText = colorList[randomInt(6)];
})

//Adding event listeners for each square
for (i=0; i < squares.length; i++) {
    squares[i].addEventListener("click",function(){
        
        //Only allow selection of tiles if they are not the same color as the background
        if (this.style.backgroundColor.toUpperCase() !== "RGB(50, 50, 50)") {
            //if the selected square is the correct RGB value display Corect! and Reset the board with a new set of colors
            if (this.style.backgroundColor.toUpperCase() === rgbText.innerText) {
                resp.innerText = "Correct!";
    
                setTimeout(function(){
                    resp.innerText = null;
                }, 1750)
                
                banner.style.backgroundColor = rgbText.innerText;

                if (gameMode === "EASY") {
                    colorList = assignSquare()
                    rngSquares(squares, colorList)
                    rgbText.innerText = colorList[randomInt(3)]
                    for (j=3; j < squares.length; j++) {
                        squares[j].style.backgroundColor = "RGB(50, 50, 50)"
                    }
                }

                else {
                    colorList = assignSquare();
                    banner.style.backgroundColor = rgbText.innerText;
                    rngSquares(squares, colorList);
                    rgbText.innerText = colorList[randomInt(6)];
                }
           
            }
                
            //if the selected square does not match the RGB text in the banner - notify the user that that was an incorrect selection and hide the square.
            else {
                this.style.backgroundColor = "rgb(50, 50, 50)";
                resp.innerText = "Wrong!";
    
                setTimeout(function(){
                    resp.innerText = null;
                }, 1750);
    
            }
            
        }
    })
        
}

//Creating Event Listeners for the difficulty button
var difficulty = document.querySelectorAll(".difficulty")

for (i=0; i < difficulty.length; i++) {

    difficulty[i].addEventListener("click",function(){
        //Display 3 tiles for Easy mode
        if (this.innerText === "EASY") {
            gameMode = "EASY"
            difficulty[0].classList.add("active")
            difficulty[1].classList.remove("active")        
            colorList = assignSquare()
            rngSquares(squares, colorList)
            rgbText.innerText = colorList[randomInt(3)]
            for (j=3; j < squares.length; j++) {
                squares[j].style.backgroundColor = "RGB(50, 50, 50)"
            }
        }

        //Display all 6 tiles for hard mode
        else {
            gameMode = "HARD"
            difficulty[1].classList.add("active")
            difficulty[0].classList.remove("active")      
            colorList = assignSquare()
            rngSquares(squares, colorList)
            rgbText.innerText = colorList[randomInt(6)]
        }
            
    })

}


