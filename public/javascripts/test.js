
//===========
// define 
//===========
var VERSION_STRING = "1.5";
var DATA_VERSION = 1;

var MIN_SCREEN_X = 1000;
var MIN_SCREEN_Y = 650;

var BOTTOM_BOUND = 60; //bottom bound for action button

var BLOCK_CELL_SIZE = 90;
var MAX_MOV_STEP = Math.floor(BLOCK_CELL_SIZE/4);
var CELL_BORDER_SIZE = 0;

var BACKGROUND_COLOR = "#FAFAD2"; //Light Goldenrod Yellow
var TITLE_COLOR = "black";
var BOARD_BORDER_WIDTH = 50;
var BOARD_WIDTH = BLOCK_CELL_SIZE * G_BOARD_X + BOARD_BORDER_WIDTH*2;
var BOARD_HEIGHT = BLOCK_CELL_SIZE * G_BOARD_Y + BOARD_BORDER_WIDTH*2;

var MIN_HINTS_STEP = 5;
var MAX_HINTS_STEP = 10;
var ACTIVE_HINTS_COUNT = 15;

//================== 
// global variable 
//==================
var screenX, screenY;
var boardStageX, boardStageY;
var titleStartX, titleStartY;
var boardStartX, boardStartY;
var blockStartX, blockStartY;

var minX, minY;

var gStage;
var gBoardLayer;
var gButtonLayer
var gBackgroundLayer;  //kinetic layer

var playSpeed = 1;  //speed: 1, 2, 3, ..., no used
var dataVersion = 0;

var boardState; //current boardState [x][y]
var stepInfo;   //current step information
var manualMoveCount = 0; //move count for active hints button

var cellSize = BLOCK_CELL_SIZE - CELL_BORDER_SIZE;

/*
window.onresize = function(event) {
	//alert("resize");
	location.reload();
}
*/

window.onload = function()
{
	//just for fixed: chrome sets cursor to text while dragging, why?
	//http://stackoverflow.com/questions/2745028/chrome-sets-cursor-to-text-while-dragging-why
	//This will disable any text selection on the page and it seems that browser starts to show custom cursors.
	document.onselectstart = function(){ return false; } ;
	init();
	loadResource(initBoard); //after resource load complete will callback to initBoard
};	

var gLevelSelectObj;
var gCurSelectedBoard;
var gPassLevelDialog;
var gOKDialog;

var gHintsCount;




function init()
{
	initScreenSize();
	initScreenPosColor();
	showLoadingMsg("dialogStage", boardStageX, boardStageY);
}

function initBoard()
{
	initScreenVariable();
	createStageLayer();
	addBackgroundLayer();

	restoreConfigInfo(); //get config info: volume state & data_version
	
	gLevelSelectObj = new vSelectBoard();
	gCurSelectedBoard = gLevelSelectObj.init(
		"selectMainStage", "selectTabsStage", "selectBoardStage", boardStageX, boardStageY, setSelectedLevel );
	gPassLevelDialog = new vSelectBoard();
	gOKDialog = new vSelectBoard();
		
	stepInfo = [];
	gHintsCount = 0;
	manualMoveCount = 0;

	//------------------------------------
	// 08/22/2013
	// force assign level from url
	//------------------------------------
	var assignLevel = getUrlArgument();
	if(assignLevel != null) {
		getAssignLevel(assignLevel); //direct assign initial level from url //08/22/2013
	} else {	
		 //get last step and board info
	}
	setPlayMode(stepInfo.length);

	
	createGameButton();
	enableFunctionButton();
	
	enableGameButton();
 
	setTimeout(function(){audioPlayStartup();}, 500 );
}




