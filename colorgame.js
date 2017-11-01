var numSquares = 6;
var colors = [];
var pickedColor;

//------------------------------------------------------
// Elements on the page
//------------------------------------------------------

//squares array
var squares = document.querySelectorAll(".square");

//color display in the title
var colorDisplay = document.getElementById("colorDisplay");

//message to show "Try Again" or "Correct!"
var messageDisplay = document.querySelector("#message");

//the title
var h1 = document.querySelector("h1");

//"Play again?" button
var resetButton = document.querySelector("#reset");

//selector of easy game
var easyBtn = document.querySelector("#easyBtn");

//selector of hard game
var hardBtn = document.querySelector("#hardBtn");

//two "Easy" and "Hard" buttons
var modeButtons = document.querySelectorAll(".mode");

//------------------------------------------------------
//                MAIN
//------------------------------------------------------

init();

function init() {

	//Draw the game.

	reset();

	//Add event listeners to Mode buttons.
	//When clicked, Mode buttons reset the game.

	for (var i=0; i<modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			this.textContent === "Hard" ? numSquares = 6: numSquares = 3;

			reset();
		});
	}

	for (var i=0; i < squares.length; i++) {

		// Add event listeners to squares.
		// They will compare the clicked color to the picked color.
		// If identical, then all squares and the h1 background
		// are painted in the picked color.
		// A suggestion "Play Again?" appears.

		squares[i].addEventListener("click", function() {
			
			var clickedColor = this.style.backgroundColor;
			
			if (clickedColor === String(pickedColor)) {

				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;

			} else {

				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}

	// Add event listener to Play Again button.

	resetButton.addEventListener("click", function() {
		reset();
	});

}


//------------------------------------------------------
// Functions
//------------------------------------------------------

function changeColors(color) {
	//loop through all the squares
	for (var i=0; i < squares.length; i++) {
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	var arr = [];

	//add num random colors to array
	for (var i=0; i<num; i++) {
		arr.push(randomColor());
	}
	return arr;
}

function randomColor() {
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);

	return ("rgb(" + r + ", " + g + ", " + b + ")");
}

function reset() {
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
	for (var i=0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
		 	squares[i].style.backgroundColor = colors[i];
		 } else {
			//when the array of colors ends, (and there are 
			//only 3 colors), the color[3], color[4] and color[5])
			//become "false". Brilliant!
			squares[i].style.display = "none";
		}
	}
}