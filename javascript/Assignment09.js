/*
	91.461 Assignment 9: Implementing a Bit of Scrabble with Drag-and-Drop
    Khyteang Lim, Student, UMass Lowell Computer Science, khy_lim@student.uml.edu
    updated by KL on December 9, 2015 at 11:28 PM
     
    This is a game of scrabble.
    This is the javascript file for assignment 09 (implementing a bit of Scrabble)

    File: Assignment09.js
    http://weblab.cs.uml.edu/~klim/Assignment09.html
*/

$(document).ready(function() {

	//number of tiles
	var numTiles = 0;
	//an array of all the letter tile
	var letterTile = [];
	//the tiles in the player's hand
	var playerHand = [];
	//the tiles that the player has played on the board but has not submit
	var tileOnBoard = [];
	//the tiles that already submitted onto the board
	var tileToStore = [];
	//the score that the player has right now, includes non-submitted word
	var playerScore = 0;
	//a map that contains each letter and its value
	var letterTable = {};
	//starting position
	var startPos;
	//starting left pos for each player's tiles
	var playerHandTilesPosLeft = {};
	//starting top pos for each player's tiles	
	var playerHandTilesPosTop = {};
	//stored player store
	var storedScore = 0 ;
	//mulitplier
	var multiplier = 1;
	//value of each word
	var wordValue = 0 ;
	//value of the word tiles
	var wordTileValue = 0;
	//Map of remaining tiles
	var tileRemaining = {};
	//a string that contains the word on the board
	var wordOnBoard = "";

	/*generate random tile*/
	var getRandTile = function(){
		//error check to see if there are any more tiles left
		if ( letterTile.length == 0 ){
			alert("error");
		} else {	
			numTiles--;
			var index = Math.floor(Math.random() * letterTile.length);		
			return index;
		}
	}

	/*newHand helper*/
	var newHandHelper = function(randLetterTile){
		playerHand.push(randLetterTile);
	}

	/*deleteHand helper*/
	var deleteHandHelper = function(index, arrayToDeleteFrom){
		arrayToDeleteFrom.splice(index, 1);
	}

	/*Print out the 7 tiles from the rack onto console [For error checking]*/
	var displayHand = function(){
		for ( var x = 0 ; x < playerHand.length ; x++ ) {
			console.log(playerHand[x]);
		}
	}

	/*Delete the current 7 tiles on the rack*/
	var deleteHand = function(){
		for ( var temp = 0 ; temp < 7 ; temp++ ){
			deleteHandHelper(0, playerHand);
		}	
	}

	/*Create 7 new tiles onto the rack*/
	var newHand = function(){
		for ( var temp = 0 ; temp < 7 ; temp++ ){
			var index = getRandTile();
			newHandHelper(letterTile[index]);
			letterTile.splice(index, 1);
		}
	}

	/*Display playerScore in console [For error checking]*/
	var displayScore = function(){
		console.log(playerScore);
	}

	/*Create the whole scrabble board*/
	var createScrabbleTable = function(){

		var scrabbleBoard;
		var rowTemp;
		var rowGreaterThanSeven = false;

		scrabbleBoard = "<table id=scrabbleBoardTable>";
		//Creating each row
		for ( var row = 0 ; row < 15 ; row++ ) {
			scrabbleBoard += "<tr id=row" + row + ">";
			for ( var col = 0 ; col < 15 ; col++ ) {
				rowTemp = row;
				if (row > 6){
					rowGreaterThanSeven = true;
					rowTemp = row;
					row = 14 - row;
				}
				//Creating each cell
				switch(row) {
					case 0:
						switch(col) {
							case 0:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable tripleWord'></td>";	
								break;
							case 3:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleLetter'></td>";
								break;
							case 7:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable tripleWord'></td>";
								break;
							case 11:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleLetter'></td>";
								break;
							case 14:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable tripleWord'></td>";
								break;
							default:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable normalTile'></td>";
								break;
						}
						break;
					case 1:
						switch(col) {
							case 1:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleWord'></td>";	
								break;
							case 5:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable tripleLetter'></td>";
								break;
							case 9:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable tripleLetter'></td>";
								break;
							case 13:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleWord'></td>";
								break;
							default:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable normalTile'></td>";
								break;
						}
						break;
					case 2:
						switch(col) {
							case 2:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleWord'></td>";	
								break;
							case 6:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleLetter'></td>";
								break;
							case 8:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleLetter'></td>";
								break;
							case 12:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleWord'></td>";
								break;
							default:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable normalTile'></td>";
								break;
						}
						break;
					case 3:
						switch(col) {
							case 0:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleLetter'></td>";
								break;
							case 3:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleWord'></td>";	
								break;
							case 7:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleLetter'></td>";
								break;
							case 11:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleWord'></td>";
								break;
							case 14:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleLetter'></td>";
								break;
							default:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable normalTile'></td>";
								break;
						}
						break;
					case 4:
						switch(col) {
							case 4:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleWord'></td>";	
								break;
							case 10:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleWord'></td>";
								break;
							default:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable normalTile'></td>";
								break;	
						}
						break;
					case 5:
						switch(col) {
							case 1:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable tripleLetter'></td>";
								break;
							case 5:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable tripleLetter'></td>";	
								break;
							case 9:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable tripleLetter'></td>";
								break;
							case 13:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable tripleLetter'></td>";
								break;
							default:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable normalTile'></td>";
								break;
						}
						break;
					case 6:
						switch(col) {
							case 2:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleLetter'></td>";
								break;
							case 6:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleLetter'></td>";	
								break;
							case 8:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleLetter'></td>";
								break;
							case 12:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleLetter'></td>";
								break;
							default:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable normalTile'></td>";
								break;
						}
						break;
					case 7:
						switch(col) {
							case 0:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable tripleWord'></td>";
								break;
							case 3:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleLetter'></td>";	
								break;
							case 7:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable middleStarTile'></td>";	
								break;
							case 11:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable doubleLetter'></td>";
								break;
							case 14:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable tripleWord'></td>";
								break;
							default:
								scrabbleBoard += "<td id=row" + rowTemp + "col" + col + " class='ui-droppable normalTile'></td>";
								break;
						}
						break;
					default:
						break;
				}
				if ( rowGreaterThanSeven ) {
					row = rowTemp;
				}
			}
			scrabbleBoard += "</tr>";
		}
		scrabbleBoard += "</table>";
		$('#scrabbleBoard').html(scrabbleBoard);
	}

	/*generate the 7 new tiles for player and add to the rack*/
	var createTiles = function(){
		var allNewTiles;
		var individualTiles = "" ;
		var pos = $('#rack').position();
		var leftPos, rightPos;

		//creating each tiles
		for ( var x = 0 ; x < playerHand.length ; x++ ) {

			tileRemaining[playerHand[x]]--;
			$('#letter'+playerHand[x]).html(playerHand[x] + ": " + tileRemaining[playerHand[x]]);

			individualTiles = "<img id='tile" + x +"' class='"  + playerHand[x] + " tilePiece draggable ui-draggable ui-draggable-handle' src='images/scrabble/ScrabbleTiles/" + playerHand[x] + ".jpg'> ";  
			leftPos = pos.left + 22 + (52 * x);
			topPos = pos.top + 30;
			playerHandTilesPosLeft["tile"+x] = leftPos;
			playerHandTilesPosTop["tile"+x] = topPos;
				
			$('#scrabbleTiles').append(individualTiles);
			$('#tile'+x).css("left", leftPos).css("top", topPos).css("position", "absolute");
			//implementing draggable for each tile
			$('#tile'+x).draggable({
				appendTo: scrabbleBoardTable,
				revert: 'invalid',
				start: function(ev, ui) {
	        	// Save original position. (used for swapping tiles)
	        		startPos = ui.helper.position();
	        		var letterOfTile = (ui.helper)[0].className.split(" ", 1);
	        		if ( ($('#'+(ui.helper)[0].id).parent())[0].id !== "scrabbleTiles" ){
	        			var valueOfTile = (($('#'+(ui.helper)[0].id).parent())[0]).className.split(" ", 2)[1];
			        	updateScore(valueOfTile,"sub", letterTable[letterOfTile]);	
			        }
	      		},
	      		stop: function(ev, ui) {
			        // If an invalid event is found, this will return the draggable object to its
			        // default "invalid" option. From this Stackoverflow post (also used in the droppable part.)
			        $(this).draggable('option','revert','invalid');
			        console.log(($('#'+(ui.helper)[0].id).parent())[0].id);
			        var letterOfTile = (ui.helper)[0].className.split(" ", 1);
			        if ( ($('#'+(ui.helper)[0].id).parent())[0].id === "scrabbleTiles" ){
			        	wordOnBoard = wordOnBoard.replace((ui.helper)[0].className.split(" ", 1), "");
			        	$('#wordOnBoard').html("Word: " + wordOnBoard);
			        } else {
			        	wordOnBoard += (ui.helper)[0].className.split(" ", 1);
			        	$('#wordOnBoard').html("Word: " + wordOnBoard);
			      		var valueOfTile = (($('#'+(ui.helper)[0].id).parent())[0]).className.split(" ", 2)[1];
			        	updateScore(valueOfTile, "add", letterTable[letterOfTile]);  
			    	}
			    },

				containment: '#gameArea',
				snap: ".ui-droppable",
				snapMode: 'inner',
				cursor: "move",
				cursorAt: { top: 25, left: 25 }
			});
		}
		
	}

	//return the amount of bonus to multiply the word with
	var getTripleDoubleWord = function() {
		return multiplier;
	}

	//set the amount of bonus to multiply the word with
	var setTripleDoubleWord = function( multi ) {
		multiplier = multi;
	}

	/*init the array with all the number of tiles*/
	var init = function(){

		var tileChar;
		var tile;
		var remainingTileTable;
		var numOfLetterRead = 0;
		var remainingTileTableRow1 = "<tr id='remainingTableRow1'>";
		var remainingTileTableRow2 = "<tr id='remainingTableRow2'>";
		var remainingTileTableRow3 = "<tr id='remainingTableRow3'>";
		
		//putting each letter into array and set up remaining table
		for (var i = 0; i < Object.keys( ScrabbleTiles ).length  + 1; i++){
			
			if ( i < Object.keys( ScrabbleTiles ).length - 1 ){
				tileChar = String.fromCharCode( 65 + i );
				letterTable[tileChar] = ScrabbleTiles[tileChar].value;
			} else if ( i < Object.keys( ScrabbleTiles ).length ) {
				tileChar = "_";
			} else {
				tileChar = "Total";
			}
			if ( tileChar != "Total" ){
				for ( var x = 0 ; x < ScrabbleTiles[tileChar]["original-distribution"]; x++ ){
					letterTile[numTiles] = tileChar;
					numTiles++;
				}			
				var individualRowCol = "<td id='letter" + tileChar + "'>" + tileChar + ": " + ScrabbleTiles[tileChar]["original-distribution"] + "</td>";
				tileRemaining[tileChar] = ScrabbleTiles[tileChar]["number-remaining"];
				if ( numOfLetterRead < 9 ) {
					remainingTileTableRow1+=individualRowCol;
				} else if ( numOfLetterRead >= 9 && numOfLetterRead < 18 ) {
					remainingTileTableRow2+=individualRowCol;
				} else {
					remainingTileTableRow3+=individualRowCol;
				}
			}
			numOfLetterRead++;
		}
		remainingTileTableRow1 += "</tr>";
		remainingTileTableRow2 += "</tr>";
		remainingTileTableRow3 += "</tr>";
		$('#remainingTileTable').append(remainingTileTableRow1);
		$('#remainingTileTable').append(remainingTileTableRow2);
		$('#remainingTileTable').append(remainingTileTableRow3);
		$('#scoreBoard').html("Score: " + playerScore);
		$('#wordOnBoard').html("Word: " + wordOnBoard);
	}
	
	/*update the player's score based on the tiles*/
	var updateScore = function(tileValue, operator, tileScore) {

		var tile;
	
		//check for multiplier
		if (tileValue === "doubleLetter"){
			tile = 2;
		} else if (tileValue === "tripleLetter"){
			tile = 3;
		} else {
			tile = 1;
		}

		if ( operator === "sub" ){
			if ( tileValue.indexOf("Letter") !== -1 ){
				wordTileValue-=(tile * tileScore);
			} else if ( tileValue.indexOf("Word") !== -1 ){
				wordTileValue-=tileScore;
				if ( tileValue === "tripleWord" ){
					setTripleDoubleWord(getTripleDoubleWord()/3);
				} else {
					setTripleDoubleWord(getTripleDoubleWord()/2);
				}
			} else {
				wordTileValue-=tileScore;
			}
			wordValue = wordTileValue * getTripleDoubleWord();
		} else if( operator === "add" ){
			if ( tileValue.indexOf("Letter") !== -1 ){
				wordTileValue += tileScore * tile;
			} else if ( tileValue.indexOf("Word") !== -1 ){
				wordTileValue += tileScore;
				if ( tileValue === "tripleWord" ){
					setTripleDoubleWord(getTripleDoubleWord() * 3);
				} else {
					setTripleDoubleWord(getTripleDoubleWord() * 2);
				}
				console.log("HEREEEEEE " + getTripleDoubleWord());
			} else {
				wordTileValue += tileScore;
			}
			wordValue = wordTileValue * getTripleDoubleWord();
		} else {
		}
		//update score
		$('#scoreBoard').html("Score: " + (storedScore + wordValue));

	}

	/*event listener for the click on reset button to delete current tiles and get new one*/
	document.getElementById("resetBtn").addEventListener("click", function(){
    	for ( var i = 0 ; i < playerHand.length ; i++ ) {
    		$('#tile'+i).remove();    		
    	}
    	$('#scoreBoard').html("Score: " + storedScore);
    	deleteHand();
    	newHand();
		createTiles();
		setTripleDoubleWord(1);
		wordValue = 0; 
		wordTileValue = 0;
		wordOnBoard = "";
		$('#wordOnBoard').html("Word: " + wordOnBoard);
	});

	/*event listener for the click on submit button to submit the words on the scrabble board*/
	document.getElementById("submitBtn").addEventListener("click", function(){
		var countOfTileOnBoard = 0;
		for ( var i = 0 ; i < 7 ; i++ ) {
			if ( ($('#tile'+i).parent())[0].id !== "scrabbleTiles" ) {
				//console.log("Parent: " + ($('#tile'+i).parent()));
				($('#tile'+i).parent()).droppable("disable");
				$('#tile'+i).draggable("disable");
				playerHand.splice(i-countOfTileOnBoard, 1);
				countOfTileOnBoard++;
				tileToStore.push(($('#tile'+i).parent())[0].id + "store");
				($('#tile'+i))[0].id = ($('#tile'+i).parent())[0].id + "store";
				//console.log(($('#tile'+i))[0].id);
			} else {
				tileRemaining[playerHand[i-countOfTileOnBoard]]++;
				//console.log(playerHand[i-countOfTileOnBoard]);
				$('#tile'+i).remove();
			}
		}
		var oldPlayerHandLength = playerHand.length;

		console.log(oldPlayerHandLength);
		//console.log("Playerhand size " + playerHand.length);
		for ( var i = 0 ; i < 7 - oldPlayerHandLength ; i++ ){
			//console.log("In here");
			var temp = getRandTile();
			newHandHelper(letterTile[temp]);
			letterTile.splice(temp, 1);
		}
		storedScore += wordValue;
		createTiles();
		setTripleDoubleWord(1);
		wordValue = 0; 
		wordTileValue = 0;
		//console.log(playerHand.length);
		wordOnBoard = "";
		$('#wordOnBoard').html("Word: " + wordOnBoard);		
	});

	/*event listener for the click on reset board button to reset scrabble board and score*/
	document.getElementById("resetBoardBtn").addEventListener("click", function(){
		
		wordOnBoard = "";
		$('#wordOnBoard').html("Word: " + wordOnBoard);

		for ( var temp = 0 ; temp < tileToStore.length ; temp++ ){
			$('#'+tileToStore[temp]).remove();
			console.log(tileToStore[temp].substring(0, tileToStore[temp].length - 5));
			var parentId = tileToStore[temp].substring(0, tileToStore[temp].length - 5);
			$('#'+parentId).droppable("enable");
		}
		for ( var i = 0 ; i < playerHand.length ; i++ ) {
    		$('#tile'+i).remove();
    	}
		tileToStore.splice(0, tileToStore.length);

		wordValue = 0;
		wordTileValue = 0;
		storedScore = 0;
		deleteHand();
		letterTile.splice(0, letterTile.length);
		numTiles = 0;
		for (var i = 0; i < Object.keys( ScrabbleTiles ).length  + 1; i++){
			if ( i < Object.keys( ScrabbleTiles ).length - 1 ){
				tileChar = String.fromCharCode( 65 + i );
				letterTable[tileChar] = ScrabbleTiles[tileChar].value;
			} else if ( i < Object.keys( ScrabbleTiles ).length ) {
				tileChar = "_";
			} else {
				tileChar = "Total";
			}
			if ( tileChar != "Total" ){
				for ( var x = 0 ; x < ScrabbleTiles[tileChar]["original-distribution"]; x++ ){
					letterTile[numTiles] = tileChar;
					numTiles++;
				}			
				tileRemaining[tileChar] = ScrabbleTiles[tileChar]["number-remaining"];
			}
			$('#letter'+tileChar).html(tileChar + ": " + tileRemaining[tileChar]);
		}
		console.log("LetterTile " + letterTile.length);
    	newHand();
		createTiles();
		setTripleDoubleWord(1);
		$('#scoreBoard').html("Score: " + storedScore);
	});

	//set up each droppable
	$(function() {
		//set up the rack droppable
		$('#rackTiles').droppable({
			accept: ".ui-draggable",
			appendTo: "body",
			drop: function( event, ui ){
				var tileLetter = (((($(ui)[0]).draggable)[0]).className).split(" ", 1);
				$('#scrabbleTiles').append($(ui.draggable));
				ui.draggable.css("top", playerHandTilesPosTop[ui.draggable[0].id]);
				ui.draggable.css("left", playerHandTilesPosLeft[ui.draggable[0].id]);
				ui.draggable.css("position", "absolute");
				updateScore("sub", letterTable[tileLetter]);
			}
		});

		//set up each scrabble board cell droppable
		$('td table tbody tr td').droppable({
			accept: ".ui-draggable",
			appendTo: "body",
			drop: function( event, ui ) {
				var tileLetter = (((($(ui)[0]).draggable)[0]).className).split(" ", 1);
				if( $(this).children().length != 0 ) {	 										
 					$(this).children().css("top", playerHandTilesPosTop[$(this).children().first()[0].id]);
 					$(this).children().css("left", playerHandTilesPosLeft[$(this).children().first()[0].id]);
 					$(this).children().css("position", "absolute") ;
 					updateScore(($(this).context.className).split(" ", 2)[1], "sub", letterTable[($(this).children().first()[0].className).split(" ", 1)]);
 					$('#scrabbleTiles').append($(this).children());
 					$(this).append($(ui.draggable));
					ui.draggable.css("top", $(this).css("top"));
	      			ui.draggable.css("left", $(this).css("left"));
	 				ui.draggable.css("position", "relative");
 				} else {
					$(this).append($(ui.draggable));
					ui.draggable.css("top", $(this).css("top"));
	      			ui.draggable.css("left", $(this).css("left"));
	 				ui.draggable.css("position", "relative");
				}				
			}
		});
	});
	
	//START THE GAME!!
	createScrabbleTable();
	init();
	newHand();
	createTiles();
});