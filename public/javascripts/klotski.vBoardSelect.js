//=====================================================================
// Klotski (�خe�D) : vertical slide board selection 
//
// 08/23/2013 - add function for direct open indicate level from url:
//
// 08/08/2013 - add support edit mode
// 
// 05/23/2013 - created by Simon Hung
//=====================================================================
var TABS_TYPE = { NORMAL: 0, USER: 2};
	
function vSelectBoard()
{
	//---------
	// define 
	//---------
	var PAGE = 4;
	var ITEM_PAGE_X = 6;
	var ITEM_PAGE_Y = 4;
	var ITEM_WIDTH = 120;
	var ITEM_HEIGHT = 120;
	var ITEM_PER_PAGE = ITEM_PAGE_X * ITEM_PAGE_Y;
	var TOTAL_ITEM_PER_LEVEL = ITEM_PER_PAGE * PAGE; 
	var MAX_LEVEL = 6; //only support max items = TOTAL_ITEM_PER_LEVEL * MAX_LEVEL

	var SELECT_BOARD_X = ITEM_PAGE_X * ITEM_WIDTH;
	var SELECT_BOARD_Y = ITEM_PAGE_Y * ITEM_HEIGHT;
	var TABS_HEIGHT = 25;
	var MAIN_BORDER_WIDTH = 20;
	var MAIN_BORDER_HEIGHT = 15;
	var TABS_BORDER_WIDTH = 10;
	var MAIN_STAGE_SHADOW_OFFSET = 5;
	var MAIN_RECT_X = (SELECT_BOARD_X + MAIN_BORDER_WIDTH*2 + TABS_BORDER_WIDTH*2);
	var MAIN_RECT_Y = (SELECT_BOARD_Y + MAIN_BORDER_HEIGHT*2 + TABS_BORDER_WIDTH*2 + TABS_HEIGHT);	
	var MAIN_STAGE_X = MAIN_RECT_X + MAIN_STAGE_SHADOW_OFFSET;
	var MAIN_STAGE_Y = MAIN_RECT_Y + MAIN_STAGE_SHADOW_OFFSET;
	
	var TABS_STAGE_X = (SELECT_BOARD_X + TABS_BORDER_WIDTH*2);
	var TABS_STAGE_Y = (SELECT_BOARD_Y + TABS_HEIGHT + TABS_BORDER_WIDTH*2);
	//var SELECT_STAGE_X = SELECT_BOARD_X+200; //for display debug message (writeMessage)
	var SELECT_STAGE_X = SELECT_BOARD_X;
	var SELECT_STAGE_Y = SELECT_BOARD_Y;
	
	//-----------
	// variable
	//-----------
	//var colorStyle = [ 'white', 'white', 'yellow', 'blue' , 'red' ];
	//var colorStyle = [ 'white', 'white', 'yellow', 'blue' , 'red' ];
	var boardList; //total board info (sorted)
	
	var maxLevel;  
	var gameSelectedInfo; //for game mode
	function initStagePosition(maxStageX, maxStageY)
	{
		mainStageX = maxStageX > MAIN_STAGE_X?maxStageX:MAIN_STAGE_X;
		mainStageY = maxStageY > MAIN_STAGE_Y?maxStageY:MAIN_STAGE_Y;
	
		mainStartX = maxStageX <= MAIN_RECT_X?0:Math.floor(maxStageX-MAIN_RECT_X)/2;
		mainStartY = maxStageY <= MAIN_RECT_Y?0:Math.floor(maxStageY-MAIN_RECT_Y)/2;
	
	}
	
	this.init = function(tabsName, selectName, screenX, screenY)
	{
		boardList = genBoardList();		

		maxLevel= Math.ceil(boardList.length / TOTAL_ITEM_PER_LEVEL); //round up
		if (maxLevel > MAX_LEVEL) maxLevel = MAX_LEVEL;

		
		tabsIdOfUserDefined = maxLevel+1;
		initStagePosition(screenX, screenY);
	
		//return first of boardlist
		var tableId = boardList[0].tableId;
		var level = boardList[0].level; 
		
		gameSelectedInfo = {
			boardInfo: getBoardInfo(tableId, level),  
			tableId:   tableId , 
			level:     level , //(1 - )
			type:      TABS_TYPE.NORMAL
		}; 
		
		return gameSelectedInfo;
	}
		
}
