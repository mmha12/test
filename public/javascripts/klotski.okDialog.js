function okDialog()
{
	var LINE_BORDER = 10;
	var LINE_START_OFFSET = 20;
	var rectX, rectY;
	var STAGE_SHADOW_OFFSET = 10;
	var ICON_OFFSET = 50;
	var BACKGROUND_SHIFT = 10;
	var minStageX;
	var minStageY;
	var stageName, stageX, stageY;
	var	stage, layer, textLayer;
	
	function createStageLayer()
	{
		stage = new Kinetic.Stage({
			container: stageName,
			width:  stageX,
			height: stageY
		});
		
		layer = new Kinetic.Layer( );
		textLayer = new Kinetic.Layer( );
		stage.add(layer);
		stage.add(textLayer);
		
	}
	
	var titleTxt;
	var  maxMsgTxtWidth;
	function initStagePosition(maxStageX, maxStageY)
	{
		rectY = totalMsgTxtHeight +  titleTxt.getHeight()*2 + LINE_BORDER * 2;
		rectX = maxMsgTxtWidth + LINE_START_OFFSET * 2 + ICON_OFFSET * 3;
		
		minStageX = rectX + STAGE_SHADOW_OFFSET;
		minStageY = rectY + STAGE_SHADOW_OFFSET;
	
		stageX = maxStageX > minStageX?maxStageX:minStageX;
		stageY = maxStageY > minStageY?maxStageY:minStageY;
	
		startX = (stageX <= minStageX)?0:Math.floor(stageX-minStageX)/2+BACKGROUND_SHIFT/2;
		startY = (stageY <= minStageY)?0:Math.floor(stageY-minStageY)/2+BACKGROUND_SHIFT/2;
	
		document.getElementById(stageName).style.cssText = "top:" + 0 + "px; left:" + 0 + "px; position: absolute;";
	}

	this.init = function(name, images, screenX, screenY, title, msg, url)
	{
		okImageObj = new Image();
		okImageObj = images.ok;
		
		stageName = name;
		titleName = title;
		msgInfo = msg;
		urlInfo = url;
		
		initStagePosition(screenX, screenY);
	};	
	
	this.show = function() 
	{
		createStageLayer();
		layer.draw();
		layer.draw();
	};
}
