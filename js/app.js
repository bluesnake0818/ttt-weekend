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
// when reset is complete, render() is invoked.
// I need to explore whether I need to invoke render() in init(). The program works fine without invoking it here.
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
	
	// set inital turn to X's turn ('X'=1, 'O'=-1)
	turn = 1 

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
	render()
}


// render function won't do anything the first time the page loads before a user performs an action since the board array since nothing has been passed as parameters.
function render(string, value) {
	// Use the index of the iteration to access the square in the squares array (array[i]) that corresponds with the current cell being iterated over in the board array
	// Style that square however you wish dependant on the value contained in the current cell being iterated over (-1, 1, or null)
	for(let i=0;i<boardArray.length;i++) {
		if(boardArray[i].id === string) {
			boardArray[i].value = value
			if(value === 1) {
				boardArray[i].textContent = "X"
			} else if (value === -1) {
				boardArray[i].textContent = "O"
			}
		}
	}
	
	// Check if there's a winner. If there's a winner, getWinner() function will assign a corresponding number to isWinner.
	getWinner()
	
	// If there's a winner or a tie, end the game and show corresponding message. 
	// If game is still ungoing (isWinner === null), invoke getTurn() to update whose turn to play it is.
	if (isWinner === null) {
		getTurn()
	} else if (isWinner === 'T') {
		winnerBoard.textContent = `It's a cat's game. No player can have 3 marks in a row.`
	} else {
		if (isWinner === 1) {
			winnerBoard.textContent = `Player X Wins. 3 X's in a row (straigth line or diagonal).`
			winnerBoard.className = "win"
		} else if (isWinner === -1) {
			winnerBoard.textContent = `Player O Wins. 3 O's in a row (straigth line or diagonal).`
			winnerBoard.className = "win"
		}
	}
	

	// if there's a winner or if the game is a tie, display the result
	// remove hidden properties for replay button
	// turnBoard will become hidden
	if(isWinner !== null) {
		winnerBoard.removeAttribute("hidden")		
		replayBtn.removeAttribute("hidden")
		turnBoard.setAttribute("hidden", true)
	}

	// console.log(winnerBoard.textContent)
}


function getTurn () {
	if (turn === 1) {
		turnBoard.textContent = `X's turn.`
		} else {
		turnBoard.textContent = `O's turn.`
		}
}


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
}


// when user clicks on one of the 9 squares, this function is invoked.
// This function changes the value of the target and change the display with X or O
// Change the turn after every play

// function handleClick(event)	{
// 	console.log(`event.target.id: ${event.target.id}`)
// 	if()

// }


function handleClick(event) { 

	if (event.target.value === null && isWinner === null) {
		if (turn === 1) {
			event.target.value = 1

		} else if (turn === -1) {
			event.target.value = -1
		}
		turn = turn * -1
		// console.log(event.target.value)
		// console.log(event.target.id)
		console.log(`event.id is: ${event.id}`)
		console.log(`event.target.id: ${event.target.id}`)
		render(event.target.id, event.target.value)
	}
}

function chooseShape (evt) {
	if(evt.target.textContent === 'X'){
		turn = 1
	} else if (evt.target.textContent === 'O') {
		turn = -1
	}

	// update who's turnBoard
	getTurn()
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
23. 쓸데없는 else if 정리
24. bootstrap link 없애면 board 안 사라지는 문제 해결하기
25. different color for the win message when there's a winner or a tie
26. color of the squares resets once replay is pressed
27. Display an empty tic-tac-toe board when the page is initially displayed.
// 28. turn is reversed
// 29.turn/ winner message가 이상해짐 
// 30. 이상한때 Tie가 나오고 게임이 멈춘다. 
31. more difficult way of getting winning combos
*/

