/*-------------------------------- Constants --------------------------------*/
// created 8 arrays of winning combination in an array called winCombo 
// accessed by getWinner()
const winCombo = 
[
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
]

/*---------------------------- Variables (state) ----------------------------*/
// created variables that will be initialized as the program loads, and will be updated with user intereactions.
// These are called "state variables"
// boardArray keeps the square div tags inside so the code can update the data and visual of each of the 9 squares based on user activity.
// turn keeps track of whose turn it is to play
// isWinner gets updated when there's a winner or if the game is a tie. If null, it means the game is still in progress.
let boardArray, turn, isWinner


/*------------------------ Cached Element References ------------------------*/
// These are "selector" variables.
// Each time the program wants to update the status of a component in View, we use these variables to do so.

const messageEl = document.querySelector("#message")
const replayBtn = document.querySelector("#replay-button")
const winnerBoard = document.querySelector("#winner")
const turnBoard = document.querySelector("#turn")
const playBoard = document.querySelector(".board")
const buttons = document.querySelector(".buttons")

/*----------------------------- Event Listeners -----------------------------*/
// These are event listners that receives a user action and perform a pre-specified action (function) to a specific "selector" variables, or more simply, a specific area in the "view."
playBoard.addEventListener("click", handleClick)
replayBtn.addEventListener("click", init)
buttons.addEventListener("click", chooseShape)


/*-------------------------------- Functions --------------------------------*/
// when page loads, you initialize all the variables, so the page is "clean"
init()

// initalize function resets everything (or assign blank values if first time) on the page and every variable behind the scene. 
// when reset is complete, render() is invoked. But i commented it out since the program works fine without invoking it here. 
function init() {
	// map each square to the corresponding places in boardArray = [sq0, sq1, sq2, sq3, sq4, sq5, sq6, sq7, sq8] 
	boardArray = [sq0,sq1,sq2,sq3,sq4,sq5,sq6,sq7,sq8]
	// map each square value to null 
	// reset each shape and color in the square
	boardArray.forEach(element => {
		element.value = null
		element.className = ""
		element.innerHTML = ""
	})

	// console.log(boardArray[0])
	// Update message
	messageEl.textContent = "Welcome to the game of Tic-Tac-Toe"
	
	// set inital turn to null.
	// Will be assigned a value by chooseShape().
	turn = null 

	// set isWinner to null (1, -1, T, null)
	isWinner = null 

	// hide the play board initially and show the board only when a mark is selected
	playBoard.setAttribute("hidden", true)

	// hide whose turn it is and who the winner prior to user's first move
	turnBoard.setAttribute("hidden", true)
	winnerBoard.setAttribute("hidden", true)
  
	// hide replay button
	replayBtn.setAttribute("hidden", true)

	// show pick mark button
	buttons.removeAttribute("hidden")

	//winner board name is reset (color returns to normal from blue)
	winnerBoard.className = ""

	// render output
	// render()
}

// Render() function is not required to be invoked because the only state variable that needs to be rendered at first is handled by chooseShape() function I think. I'm not sure if it's good architecture though.
// Render() function is invoked when user clicks a square (handleClick() --> get Winner())
// When invoked, it updates the div area of each square that is not null with correspoding shape (1=x, -1=o)
// checks if there's a winner or tie, and renders a congratutory message or a tie message. 
// if there's no winner or tie yet, display whose turn it is by invoking displayTurn() function.
function render() {
	// Use the index of the iteration to access the square in the squares array (array[i]) that corresponds with the current cell being iterated over in the board array
	// Style that square however you wish dependant on the value contained in the current cell being iterated over (-1, 1, or null)
	for(let i=0;i<boardArray.length;i++) {
		if(boardArray[i].id !== null) {
			if(boardArray[i].value === 1) {
				boardArray[i].textContent = "X"
			} else if (boardArray[i].value === -1) {
				boardArray[i].textContent = "O"
			}
		}
	}
	
	// If game is still ungoing (isWinner === null), invoke dispalyTurn() to update whose turn to play it is.
	// If there's a winner or a tie, end the game and show corresponding message. 
	if (isWinner === null) {
		dispalyTurn()
	} else if (isWinner === 'T') {
		winnerBoard.textContent = `It's a cat's game. No player possesses 3 marks in a row.`
	} else {
		if (isWinner === 1) {
			winnerBoard.textContent = `Player X Wins. 3 X's in a row (straigth line or diagonal).`
			winnerBoard.className = "win"
		} else if (isWinner === -1) {
			winnerBoard.textContent = `Player O Wins. 3 O's in a row (straigth line or diagonal).`
			winnerBoard.className = "win"
		}
	}
	


	// remove hidden properties for replay button
	// turnBoard will become hidden
	if(isWinner !== null) {
		winnerBoard.removeAttribute("hidden")		
		replayBtn.removeAttribute("hidden")
		turnBoard.setAttribute("hidden", true)
	}

}

// invoked by render() and chooseShape() at first. assigns whose turn it is.
function dispalyTurn () {
	if (turn === 1) {
		turnBoard.textContent = `X's turn.`
		} else {
		turnBoard.textContent = `O's turn.`
		}
}

// invoked by handleClick().
// check if there's a winner using the winCombo array. 
// Update isWinner variable if there's a winner, and change the CSS of the color of 3 letters that compose a winning formula.
// if there's no winner, check for a tie
// render() with newly updated state variables. 
function getWinner () {
	for (let i=0;i<winCombo.length;i++)
	{
		let sum = 0
		for(let j=0;j<winCombo[i].length;j++){
			sum = sum + boardArray[winCombo[i][j]].value

			if(Math.abs(sum) === 3){
				isWinner = boardArray[winCombo[i][0]].value 
				for(let k=0;k<winCombo[i].length;k++) {
					boardArray[winCombo[i][k]].className = "win"
				}
			} 
		}
	}

	// Check for a Tie
	let countNull = 0
	for(let i=0; i<boardArray.length;i++) {
		if(boardArray[i].value === null) {
			countNull++
		}
	}

	// If it's a tie, update isWinner. 
	if(countNull < 1) {
		isWinner = 'T'
	}

	render()
}


// when user clicks on one of the 9 squares, this function is invoked.
// This function changes the value of a clicked square's value to the shape that belongs to whomever that chose it in his/her turn.
// Then change the turn.
// invoke getWinner()

function handleClick(event)	{
	for(let i=0; i<boardArray.length; i++) {
		if (boardArray[i].id === event.target.id && isWinner === null) {
				boardArray[i].value = turn
				turn = turn * -1
		}
 }	
	getWinner()
}

// this function is used at the very beginning to determine which shape the user wants to play with.
// Your turn is determined here. 
function chooseShape (evt) {
	if(evt.target.textContent === 'X'){
		turn = 1
	} else if (evt.target.textContent === 'O') {
		turn = -1
	}

	// update whose turn it is with new turn state variable.
	dispalyTurn()
	// hide mark buttons if a mark has been selected. 
	buttons.setAttribute("hidden", true)
	// show play board if a mark has been selected. 
	playBoard.removeAttribute("hidden")
	// remove hidden properties for turnBoard
	turnBoard.removeAttribute("hidden")
}



/* user stories
// 1. user should see an empty tic-tac-toe board when the page at first
// 2. user can click on one of the nine cells to make a move
// 3. user's click each turn will be displayed on each square, alternate between O and X
// 4. User cannot play a cell marked with an X or O already. 
// 5. user can click a reset button and it will clear the cotents of the board. 
// 6. User should see whose turn it is in X or O
// 7. User should see a win logic and a winning message when the game is over
// 8. User should see a logic for a tie, and see a message. 
// 9. 유저는 처음 플레이 때 X로할건지 O로할건지  정할수 있다. (Turn = -1 or Turn = 1)
// 10. 한번 누른 곳은 다시 못 누른다. 
// 11a. 처음에 'turn'을 디스플레이에서 사라지게
// 11b. 마지막에 'turn'을 디스플레이에서 사라지게
// 12. 처음 누를때 한번 더 눌러야 shape이 나온다. 
// 13. Resetting innerHTML should be done in one place
14. CSS
// 15. sq 0-8 in one go
16. win logic abbreivated
// 17. win logic in animation or graphic => color them
// 18. condense win logic function
// 19. condense declaration of "sq" variables
20. Write a ternary function
21. other stuff in instructions
22. comments pseudo-code
23. eliminate unecessary else if's
24. bootstrap link 없애면 board 안 사라지는 문제 해결하기
25. different color for the win message when there's a winner or a tie
26. color of the squares resets once replay is pressed
27. Display an empty tic-tac-toe board when the page is initially displayed.
// 28. turn is reversed
// 29.turn/ winner message가 이상해짐 
// 30. 이상한때 Tie가 나오고 게임이 멈춘다. 
31. more difficult way of getting winning combos
*/

