//=============================================================================
// Klotski (華容道) resource program
//
// 08/12/2013 - create by Simon Hung
//=============================================================================

//==================
// global variable 
//==================
var gTxtMsg;
var images = {};
var noAudio = 0; //no audio support
var preload; //preload resource object


var enTextMsg = {
	//play mode:
	GameMode: "GAME Mode",
	DemoMode: "DEMO Mode",	

	
}

var audioSource = {
	title:      '/javascripts/audio/title', 
	woodHit:    '/javascripts/audio/woodhit',
	happyPass: 	'/javascripts/audio/pass',
	stamp:      '/javascripts/audio/stamp',
	good:       '/javascripts/audio/good',
	exist:	    '/javascripts/audio/exist',
	error:      '/javascripts/audio/error',
	success:    '/javascripts/audio/success'
}

var imageSource = {
// for title
	title: '/javascripts/image/klotski.png',
	
// for board & block
	board:  '/javascripts/image/board1.jpg',
	block1: '/javascripts/image/block1.jpg',
	block2: '/javascripts/image/block2.jpg',
	block3: '/javascripts/image/block3.jpg',
	block4: '/javascripts/image/block4.jpg',
	
//for function button

	volume0: '/javascripts/image/volume00.png',
	volume1: '/javascripts/image/volume01.png',
	//game <--> edit mode, switch	
	edit:    '/javascripts/image/edit.png',
	game:    '/javascripts/image/game.png',
	
//for pass level dialog
	replayLevel: '/javascripts/image/return.png',
	nextLevel:   '/javascripts/image/nextLevel.png',
	highScore:   '/javascripts/image/bestScore00.png',
	
//for play mode button
	reset0: '/javascripts/image/reset00.png',
	reset1: '/javascripts/image/reset11.png',
	undo0:  '/javascripts/image/undo00.png',
	undo1:  '/javascripts/image/undo11.png',
	redo0:  '/javascripts/image/redo00.png',
	redo1:  '/javascripts/image/redo11.png',
	hints0: '/javascripts/image/hints00.png',
	hints1: '/javascripts/image/hints11.png',
	
//for demo mode button
	first0: '/javascripts/image/first00.png',
	first1: '/javascripts/image/first01.png',
	back0:  '/javascripts/image/backward00.png',
	back1:  '/javascripts/image/backward01.png',
	play0: 	'/javascripts/image/play00.png', //play mode
	play1: 	'/javascripts/image/play01.png', //stop mode
	play2: 	'/javascripts/image/play02.png', //gray mode
	next0:  '/javascripts/image/forward00.png',
	next1:  '/javascripts/image/forward01.png',
	last0:  '/javascripts/image/last00.png',
	last1:  '/javascripts/image/last01.png',

//for edit mode button	
	test0:  '/javascripts/image/test00.png', 
	test1:  '/javascripts/image/test01.png', 
	save0:  '/javascripts/image/save00.png', 
	save1:  '/javascripts/image/save01.png', 
	
//for game mode
	demoMode0:   '/javascripts/image/demoMode00.png',
	demoMode1:   '/javascripts/image/demoMode01.png',
	gameMode0:   '/javascripts/image/gameMode00.png',
	gameMode1:   '/javascripts/image/gameMode01.png',
	
//for msg dialog
	yes: '/javascripts/image/yes.png',
	no:  '/javascripts/image/no.png',
	ok:	 '/javascripts/image/yes.png'
}

function setTxtMsg()
{
	var sysLang = getSystemLanguage();

	//if(sysLang == "zh-tw" || sysLang == "zh-hk") { //tranditional chinese
	if(sysLang.indexOf("zh-") >= 0) { //all chinese
		gTxtMsg = twTextMsg;
		imageSource.demoMode0 = '/javascripts/image/demoMode10.png';
		imageSource.demoMode1 = '/javascripts/image/demoMode11.png';
		imageSource.gameMode0 = '/javascripts/image/gameMode10.png';
		imageSource.gameMode1 = '/javascripts/image/gameMode11.png';
		imageSource.save0 = '/javascripts/image/save10.png';
		imageSource.save1 = '/javascripts/image/save11.png'; 
		imageSource.highScore = '/javascripts/image/bestScore01.png';
	} else {
		gTxtMsg = enTextMsg;
	}
}

//======================
// get system language
//======================
function getSystemLanguage()
{
	var lang = window.navigator.userLanguage || window.navigator.language;
	return lang.toLowerCase();
}

//----------------------------------------------------------------------------------------
// reference: http://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/
//            Change load audio by PreloadJS & SoundJS, 09/07/2017
//----------------------------------------------------------------------------------------
//=======================
// (1) set text message
// (2) load audio
// (3) load images
// (4) callback
//=======================
function loadResource(callback)
{
	setTxtMsg();
	audioPreload(callback);
}

var audioSource = [
//audio
	{ id: "startup",   src: "/javascripts/audio/title.ogg"},
	{ id: "woodHit",   src: "/javascripts/audio/woodhit.ogg"},
	{ id: "happyPass", src: "/javascripts/audio/pass.ogg"},
	{ id: "stamp",     src: "/javascripts/audio/stamp.ogg"},
	{ id: "good",      src: "/javascripts/audio/good.ogg"},
	{ id: "exist",     src: "/javascripts/audio/exist.ogg"},
	{ id: "error",     src: "/javascripts/audio/error.ogg"},
	{ id: "success",   src: "/javascripts/audio/success.ogg"}
];

function audioPreload(callback)
{
	preload = new createjs.LoadQueue(true);
	createjs.Sound.alternateExtensions = ["mp3"];
	preload.installPlugin(createjs.Sound);
	preload.on("error", handleFileError);
	//preload.on("progress", handleProgress);
	preload.on("complete", handleComplete);

	preload.loadManifest(audioSource);

	function handleFileError(event) 
	{
		console.log("error", event);
	}

	function handleComplete(event) 
	{
		imagePreload(callback); 
	}
}

function imagePreload(callback) 
{
	var loadedFiles = 0;
	var totalFiles = 0;
	
	// get num of image sources
	for(var src in imageSource) {
		totalFiles++;
	}

	debug("image totalFiles = " + (totalFiles));
	
	//preload image source
	for(var src in imageSource) {
		images[src] = new Image();
		images[src].onload = function() {
			debug("image loadedFiles = " + (loadedFiles+1));
			if(++loadedFiles >= totalFiles) {
				if(callback != null) callback();
			}
		};
		images[src].src = imageSource[src];
	}
}

function soundPlay(name)
{
	if(!volumeState) return;
	return createjs.Sound.play(name);
}

function audioPlayStartup()
{
	soundPlay("startup");
}

function audioPlayWoodHit()
{
	soundPlay("woodHit");
}

function audioPlayHappyPass()
{
	soundPlay("happyPass");
}

function audioPlayGood()
{
	soundPlay("good");
}

function audioPlayExist()
{
	soundPlay("exist");
}

function audioPlayError()
{
	soundPlay("error");
}

function audioPlaySuccess()
{
	soundPlay("success");
}

function audioPlayStamp()
{
	soundPlay("stamp");
}