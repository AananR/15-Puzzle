
/*
This function will initialize the game board for us
*/
function init_gameBoard() {


	// Here we are setting up the tiles 
	var tileOrder = shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);


	
	var i = 0;

	var rows = document.getElementById('gameBoard').getElementsByTagName('tr');
	for(r = 0; r < rows.length; ++r) {
		
		var tiles = rows[r].getElementsByTagName('td');
		for(t = 0; t < tiles.length; ++t) {
			tiles[t].className = 'tile_' + tileOrder[i++];
			tiles[t].onclick = clickTile;
		}
	}
	controlsEnabled = true;
}


/*
This function will intiate when a user clicks on the title
*/
function clickTile() {


	if(!controlsEnabled) return;

	// here we are trying to figure out what column it is
	var tile_adjacent = this.parentNode.getElementsByTagName('td');




		var col = 0;
		while(this !== tile_adjacent[col] && col < tile_adjacent.length) ++col;

	
	// here we are trying to figure out what row it is
	var curr_Row = this.parentNode;
var row_adjacent = curr_Row.parentNode.getElementsByTagName('tr');
var row = 0;
	while(curr_Row !== row_adjacent[row] && row < row_adjacent.length) ++row;

	// here we are trying to determine if there is a empty spot 
	

			// checking row under
			if(row < 3 && getTitle(row+1,col).className == 'tile_0') 
				switchTiles(this, getTitle(row+1,col));

			// checking the slot to the right
			else if(col < 3 && getTitle(row,col+1).className == 'tile_0') 
				switchTiles(this, getTitle(row,col+1));

			// checking the other row over
			else if(row > 0 && getTitle(row-1,col).className == 'tile_0') 
				switchTiles(this, getTitle(row-1,col));

			// checking the slot to the left
			else if(col > 0 && getTitle(row,col-1).className == 'tile_0') 
				switchTiles(this, getTitle(row,col-1));
			else

				
				//here we are throwing an alert if the user chooses an illegal move
				alert('Illegal move! This move cannot be done, please proceed to click a title that is adjacent to the empty spot');


		/*
		here we are determine if the game has finished and if true then is the user would like to play again
		*/
		if(gameFinished()) {
		if(confirm('Congrats on the win! Care to try again?'))
			init_gameBoard();
		else
			controlsEnabled = false;
	}
}




/*
This function will shuffle the array for us 
*/

function shuffle(t) {
	for(i = 0; i < t.length; ++i) {
			var swap = parseInt(Math.random() * 1000) % t.length;
			var temp = t[swap];
		t[swap] = t[i];
		t[i] = temp;
	}

	return t;
}



/*
This function will switch the classes between two tiles
*/
function switchTiles(a, b) {
	var tmp = a.className;
	a.className = b.className;
		b.className = tmp;
}



/*
This function is my "getter" function
*/
function getTitle(row, col) {
	return document	.getElementById('gameBoard')
					.getElementsByTagName('tr')[row]
					.getElementsByTagName('td')[col];
}


var controlsEnabled = false;


/*
This function will determine if the game has completed
*/
function gameFinished() {
	var i = 1;

	var rows = document.getElementById('puzzle').getElementsByTagName('tr');
	for(r = 0; r < rows.length; ++r) {

		var tiles = rows[r].getElementsByTagName('td');
		for(t = 0; t < tiles.length; ++t) {

			if(tiles[t].className != 'tile_' + (i++ % 16))
				return false;
		}
	}

	return true;
}



init_gameBoard();