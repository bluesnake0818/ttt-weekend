/*-------------------------------- Constants --------------------------------*/
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
let boardArray, turn, isWinner




/*------------------------ Cached Element References ------------------------*/
// const sq = document.querySelector(".sq")
const messageEl = document.querySelector("#message")
const replayBtn = document.querySelector("#replay-button")
const winnerBoard = document.querySelector("#winner")
const turnBoard = document.querySelector("#turn")
const playBoard = document.querySelector(".board")
const buttons = document.querySelector(".buttons")

/*----------------------------- Event Listeners -----------------------------*/
playBoard.addEventListener("click", addShape)
replayBtn.addEventListener("click", init)
buttons.addEventListener("click", pickTurn)


/*-------------------------------- Functions --------------------------------*/
init()

function init() {
	// map each square to the corresponding places in boardArray = [sq0, sq1, sq2, sq3, sq4, sq5, sq6, sq7, sq8] 
	boardArray = [sq0,sq1,sq2,sq3,sq4,sq5,sq6,sq7,sq8]

	// map each square value to null 
	// reset each shape in the square
	boardArray.forEach(element => {
		element.value = null
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

	// reset playboard color
	playBoard.setAttribute("hidden", true)

	// hide whose turn it is and who the winner prior to user's first move
	turnBoard.setAttribute("hidden", true)
	winnerBoard.setAttribute("hidden", true)
  
	// hide replay button
	replayBtn.setAttribute("hidden", true)

	// show pick mark button
	buttons.removeAttribute("hidden")

	// render output
	render()
}

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
	// check whether the game is a tie
	isTie()
	//

	
	if (isWinner !== null) {
		getTurn()
	} else if (isWinner === 'T') {
		winnerBoard.textContent = `It's a cat's game. No player can have 3 marks in a row.`
	} else {
		if (isWinner === 1) {
			winnerBoard.textContent = `Player X Wins. 3 X's in a row.`
		} else if (isWinner === -1) {
			winnerBoard.textContent = `Player O Wins. 3 O's in a row.`
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

// Check whether the game is a Tie. When there's only 0 or 1 move left and there's no winner, it's a tie. 
function isTie () {
		// You can figure out how many moves are left in the game by checking how many squares are still null. 
		let countNull = 0
		for(let i=0; i<boardArray.length;i++) {
			if(boardArray[i].value === null) {
				countNull++
			}
		}

		if(countNull < 1) {
		// If it's a tie, update isWinner. 
			isWinner = 'T'
		}
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
			} 
		}
	}

	// if(isWinner !== 1 || isWinner !== -1) {
	// 	const filteredArray = boardArray.filter(function(square){
	// 		return square.value === null
	// 	})	

	// 	if (filteredArray.length < 1) {
	// 		isWinner = 'T'		
	// 	} else
		
	// }
}



// when user clicks on one of the 9 squares, this function is invoked.
// This function changes the value of the target and change the display with X or O
// Change the turn after every play
function addShape(event) { 
	if (event.target.value === null && isWinner === null) {
		if (turn === 1) {
			event.target.value = 1

		} else if (turn === -1) {
			event.target.value = -1
		}
		turn = turn * -1
		// console.log(event.target.value)
		// console.log(event.target.id)
		render(event.target.id, event.target.value)
	}
}

function pickTurn (evt) {
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
17. win logic in animation or graphic => color them
18. condense win logic function
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
29.turn/ winner message가 이상해짐 
30. 이상한때 Tie가 나오고 게임이 멈춘다. 
31. more difficult way of getting winning combos
*/

