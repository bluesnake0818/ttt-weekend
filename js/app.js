/*-------------------------------- Constants --------------------------------*/


/*---------------------------- Variables (state) ----------------------------*/
let squaresArray, turn, isWinner




/*------------------------ Cached Element References ------------------------*/
const sq = document.querySelector(".sq")
// const form = document.querySelector("form")
const messageEl = document.querySelector("#message")
const replayBtn = document.querySelector("#replay-button")
const winnerBoard = document.querySelector("#winner")
const turnBoard = document.querySelector("#turn")
const sq0 = document.querySelector("#sq0")
const sq1 = document.querySelector("#sq1")
const sq2 = document.querySelector("#sq2")
const sq3 = document.querySelector("#sq3")
const sq4 = document.querySelector("#sq4")
const sq5 = document.querySelector("#sq5")
const sq6 = document.querySelector("#sq6")
const sq7 = document.querySelector("#sq7")
const sq8 = document.querySelector("#sq8")



/*----------------------------- Event Listeners -----------------------------*/
replayBtn.addEventListener("click", init)

// form.addEventListener("click", function(evt) {
// 	turn = evt.target.value 
// })


sq0.addEventListener("click", addShape)
sq1.addEventListener("click", addShape) 
sq2.addEventListener("click", addShape)
sq3.addEventListener("click", addShape) 
sq4.addEventListener("click", addShape)
sq5.addEventListener("click", addShape) 
sq6.addEventListener("click", addShape)
sq7.addEventListener("click", addShape) 
sq8.addEventListener("click", addShape)



/*-------------------------------- Functions --------------------------------*/
init()

function init() {
	// map each square value to null 
	sq0.value = null
	sq1.value = null
	sq2.value = null
	sq3.value = null
	sq4.value = null
	sq5.value = null
	sq6.value = null
	sq7.value = null
	sq8.value = null

	// reset each shape in the square
	sq0.innerHTML = ""
	sq1.innerHTML = ""
	sq2.innerHTML = ""
	sq3.innerHTML = ""
	sq4.innerHTML = ""
	sq5.innerHTML = ""
	sq6.innerHTML = ""
	sq7.innerHTML = ""
	sq8.innerHTML = ""


	
	// map each square to the corresponding places in squaresArray = [sq0, sq1, sq2, sq3, sq4, sq5, sq6, sq7, sq8] 
	squaresArray = [sq0,sq1,sq2,sq3,sq4,sq5,sq6,sq7,sq8]
	
	// Update message
	messageEl.textContent = "Welcome to the game of Tic-Tac-Toe"
	
	// set inital turn to X's turn (X=1, O=-1 )
	turn = 1 

	// set isWinner to null (1, -1, T)
	isWinner = null 

	// hide whose turn it is and who the winner prior to user's first move
	turnBoard.setAttribute("hidden", true)
	winnerBoard.setAttribute("hidden", true)
  
	// hide replay button
	replayBtn.setAttribute("hidden", true)

	// render output
	render()
}

function render(){
	
	// assign each square to a corresponding shape based on the player value
	for (let i=0;i<squaresArray.length;i++) {
		if(squaresArray[i].value === 1) {
			squaresArray[i].innerHTML = 'X'
		} else if (squaresArray[i].value === -1){
			squaresArray[i].innerHTML = 'O'
		} 
	}
  renderIsWinner()
}


function renderIsWinner() {

	// Check if there's a winner. If there's a winner, getWinner() function will assign a corresponding number to isWinner.
	getWinner()


	
	// If a winner has been determined, a correspoding message will be updated. 
	if (isWinner === 1) {
		
		winnerBoard.textContent = `Player X Wins`
	} else if (isWinner === -1) {
		winnerBoard.textContent = `Player O Wins`
	} else { // if there's no winner, check whether the game is a tie.
		isTie()
	}

	// if there's a winner or if the game is a tie, display the result
	if(isWinner !== null) {
		winnerBoard.removeAttribute("hidden")
	}

	console.log(winnerBoard.textContent)
}

// Check whether the game is a Tie. When there's only 0 or 1 move left and there's no winner, it's a tie. 
function isTie () {
		// You can figure out how many moves are left in the game by checking how many squares are still null. 
		let countNull = 0
		for(let i=0; i<squaresArray.length;i++) {
			if(squaresArray[i].value === null) {
				countNull++
			}
		}

		if(countNull < 1) {
		// If it's a tie, update a corresponding message. 
			winnerBoard.textContent = `It's a cat's game. You are tied.`
		} else { 
		// if it's not a tie, update whose turn it is.
			getTurn()
		}
}

function getTurn () {
	if (turn === 1) {
		turnBoard.textContent = `X's turn.`
		} else {
		turnBoard.textContent = `O's turn.`
		}
		// remove hidden properties for turnBoard
		turnBoard.removeAttribute("hidden")

		// remove hidden properties for replay button
		replayBtn.removeAttribute("hidden")
}


function getWinner () {
	// X Wins
	if(sq0.value === 1 && sq1.value === 1 && sq2.value === 1) {
		isWinner = 1
	}
	if(sq3.value === 1 && sq4.value === 1 && sq5.value === 1) {
		isWinner = 1
	}
	if(sq6.value === 1 && sq7.value === 1 && sq8.value === 1) {
		isWinner = 1
	}
	if(sq0.value === 1 && sq3.value === 1 && sq6.value === 1) {
		isWinner = 1
	}
	if(sq1.value === 1 && sq4.value === 1 && sq7.value === 1) {
		isWinner = 1
	}
	if(sq2.value === 1 && sq5.value === 1 && sq8.value === 1) {
		isWinner = 1
	}
	if(sq0.value === 1 && sq4.value === 1 && sq8.value === 1) {
		isWinner = 1
	}
	if(sq2.value === 1 && sq4.value === 1 && sq6.value === 1) {
		isWinner = 1
	}

	// O Wins
	if(sq0.value === -1 && sq1.value === -1 && sq2.value === -1) {
		isWinner = -1
	}
	if(sq3.value === -1 && sq4.value === -1 && sq5.value === -1) {
		isWinner = -1
	}
	if(sq6.value === -1 && sq7.value === -1 && sq8.value === -1) {
		isWinner = -1
	}
	if(sq0.value === -1 && sq3.value === -1 && sq6.value === -1) {
		isWinner = -1
	}
	if(sq1.value === -1 && sq4.value === -1 && sq7.value === -1) {
		isWinner = -1
	}
	if(sq2.value === -1 && sq5.value === -1 && sq8.value === -1) {
		isWinner = -1
	}
	if(sq0.value === -1 && sq4.value === -1 && sq8.value === -1) {
		isWinner = -1
	}
	if(sq2.value === -1 && sq4.value === -1 && sq6.value === -1) {
		isWinner = -1
	}
	/* Winning combos
	Horizontal
	1. 0-1-2
	2. 3-4-5
	3. 6-7-8

	Vertical
	1. 0-3-6
	2. 1-4-7
	3. 2-5-8

	Diagonal
	1. 0-4-8
	2. 2-4-6
	*/
} 


function addShape(event) { 
	if (event.target.value === null && isWinner === null) {
		if (turn === 1) {
			event.target.value = 1
			event.target.innerHTML = 'X'
		} else if (turn === -1) {
			event.target.value = -1
			event.target.innerHTML = 'O'
		}
		turn = turn * -1
		console.log(event.target.value)
		renderIsWinner()
	}
}




// function renderIsWinner() {
// 	if (isWinner !== null) {
// 		winnerBoard.removeAttribute("hidden")
// 			if (isWinner === 'T')
// 			{
// 				winnerBoard.textContent = `You are at a tie`
// 			} else if (isWinner === 1) {
// 				winnerBoard.textContent = `X wins`
// 			} else if (isWinner === -1) {
// 				winnerBoard.textContent = `O wins`
// 			}
// 	} else {
// 		if (turn === 1) {
// 			turnBoard.textContent = `X's turn.`
// 		} else {
// 			turnBoard.textContent = `O's turn.`
// 		}
// 	}
// }









/* user stories
1. user should see an empty tic-tac-toe board when the page at first
2. user can click on one of the nine cells to make a move
3. user's click each turn will be displayed on each square, alternate between O and X
4. User cannot play a cell marked with an X or O already. 
5. user can click a reset button and it will clear the cotents of the board. 
6. User should see whose turn it is in X or O
7. User should see a win logic and a winning message when the game is over
8. User should see a logic for a tie, and see a message. 
9. 유저는 처음 플레이 때 X로할건지 O로할건지  정할수 있다. (Turn = -1 or Turn = 1)
10. 한번 누른 곳은 다시 못 누른다. 
11. 처음이랑 마지막에 'turn'을 디스플레이에서 사라지게
12. 처음 누를때 한번 더 눌러야 shape이 나온다. 
*/