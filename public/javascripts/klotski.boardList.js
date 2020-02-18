//====================================================
// Klotski (華容道) : generate board list info
//
// include: hashmap.js, klotski.share.js
//          klotski.board.fayaa.js, 
//          klotski.board.unblock2.js, 
//          klotski.board.wayout.js,
//          klotski.board.Mine.js 
//
// 08/21/2013 - add alias name of classic
//
// 08/05/2013 - add support edit mode
//
// 05/21/2013 - Created by Simon Hung
//====================================================

var initBoardUserDefined = []; //for store user-defined board (saved from edit mode)
var userDefinedTableId;

var gBoardTableList = [ 
	[initBoardFayaa, 'Fayaa'], 
];

var gClassicList = { 
	tableId:0, 
	list: [ //level list: the array index = level - 1,
		1 
	]
};

var boardAliasName = [ //08/21/2013 add support alias name of classic
  //[ tableId, level, aliasNameString ] //level: 1 -
	[ ], //指揮若定
	
];	
	
function getClassicInfo()
{
	return { id:gClassicList.tableId, list:gClassicList.list};
}

function getUserInfo()
{
	return { id:userDefinedTableId, size:initBoardUserDefined.length};
}

//=======================================================================================

var	boardHash = new hashMap(); //hash maps

function boardFlip(boardString)
{
	var srcBoard = boardString.split("");
	var flipBoard = [];
	
	for(var y = 0; y < G_BOARD_Y; y++) {
		for(var x = 0; x < G_BOARD_X; x++) {
			flipBoard[gRowMajorToIndex(G_BOARD_X-x-1, y)] = srcBoard[gRowMajorToIndex(x, y)];
		}
	}
	return flipBoard.join("");
}



function genBoardList()
{
	var totalBoards = okBoards = wrongBoards = 0;
	var dupBoards;
	var boardList = [];

	for(var id = 0; id < gBoardTableList.length; id++) {  
		dupBoards = 0;
		for(var boardItem = 0; boardItem < gBoardTableList[id][0].length; boardItem++) {
			var boardInfo = gBoardTableList[id][0][boardItem];
			boardInfo.level = boardItem+1; //add level element to init board, level = 1 - N
			totalBoards++;

			if(addBoardInfo2Hash(boardInfo, id)) {
				if( boardInfo.mini <= 0) { 
					//skip 'no solution' or 'step = 0' 
					wrongBoards++	
				} else {
					boardList[okBoards++] = {tableId:id, level:boardInfo.level};
				}	
			} else {
				dupBoards++;
			}			
		}
		gBoardTableList[id][2] = dupBoards;		
	}
	debug(boardHash.size() + " " + boardHash.avage());
	for(var id = 0; id < gBoardTableList.length; id++) {
		var boardInfo = gBoardTableList[id][0];
		debug(gBoardTableList[id][1] + ": total level = " + boardInfo.length + ", dupicate boards = " + gBoardTableList[id][2] );
		
	}
	debug("Total boards = " + totalBoards + " good boards = " + okBoards + " wrong boards = " + wrongBoards );
	
	boardList.sort(function(a,b) {
		//---------------------------------------------
		// for different browser with stabilize order
		// check order 1. steps, 2. tableId, 3. level
		//---------------------------------------------
		var rc = gBoardTableList[a.tableId][0][a.level-1].mini - gBoardTableList[b.tableId][0][b.level-1].mini;
		if(rc == 0) {
			rc = a.tableId - b.tableId;
			if(rc == 0) rc = a.level - b.level;
		}
		return rc;
	});

	//// add user-defined board after gBoardTableList[] ////////////////
	gBoardTableList.push([initBoardUserDefined, "user-defined"]);
	userDefinedTableId = gBoardTableList.length - 1;
	
	totalBoards = 0;
	dupBoards = 0;
	wrongBoards = 0;
	for(var boardItem = 0; boardItem < initBoardUserDefined.length; boardItem++) {
		var boardInfo = initBoardUserDefined[boardItem];
		boardInfo.level = boardItem+1; //add level element to init board, level = 1 - N
		boardInfo.user = "user";
		totalBoards++;

		if(addBoardInfo2Hash(boardInfo, userDefinedTableId)) {
			//don't need add to normal level list
		} else {
			dupBoards++;
		}			
	}
	debug("----------------------------------------------------------------------");
	debug("User Defined boards = " + totalBoards + ", duplicate boards = " + dupBoards );
	debug("----------------------------------------------------------------------");
	///////////////////////////////////////////////////////////////////
	
	
	return boardList;
}

//-----------------------------------
//return =  1:success, 0: duplicate
//-----------------------------------
function addBoardInfo2Hash(boardInfo, tableId)
{
	var boardKey1 = gBoard2Key(gEasyBoard(boardInfo.board));
	var boardKey2 = gBoard2Key(gEasyBoard(boardFlip(boardInfo.board)));
	var level = boardInfo.level;
	var rc = 1;
	
	if(boardHash.put(boardKey1, {tableId:tableId, level:level, flip:0} ) != null) {
		// already exist
		var exitItem = boardHash.get(boardKey1).value;
		debug("srcItem: level " + level + " of " + gBoardTableList[tableId][1]);
		debug("existItem: level " + exitItem.level + " of " + gBoardTableList[exitItem.tableId][1] + (exitItem.flip?" (flip)":""));
		debug("======> same board!!!");
		debug("");
		rc = 0;
	} else if(boardKey1 != boardKey2 && boardHash.put(boardKey2, {tableId:tableId, level:level, flip:1} ) != null) {
		// already exist with flip board
		var exitItem = boardHash.get(boardKey2).value;
		debug("srcItem: level " + level + " of " + gBoardTableList[tableId][1] + " (flip)");
		debug("existItem: level " + exitItem.level + " of " + gBoardTableList[exitItem.tableId][1] + (exitItem.flip?" (flip)":""));
		debug("======> same board!!!");
		debug("");
		rc = 0;
	}
	return rc;
}

function getBoardInfo(tableId, level)
{
	return gBoardTableList[tableId][0][level-1];
}
