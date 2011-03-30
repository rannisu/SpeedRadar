
var tabwin_radar = Titanium.UI.createWindow({  
    title:'Radar window'
});
//var win_width=tabwin_radar.getWidth();
//var win_height=tabwin_radar.getHeight();
var win_width=Titanium.Platform.displayCaps.platformWidth;
var win_height=Titanium.Platform.displayCaps.platformHeight;
var viewContainerHEIGHT=(Ti.Platform.osname!='android')?win_height*(3/4):win_height*(6/7);
Ti.API.info('Ti.Platform.osname:\t'+Ti.Platform.osname);

var viewContainer = Titanium.UI.createView({
	left:0,
	top:0,
	width:win_width,
	height:win_height,
	backgroundImage:'images/background.png'
});
/*
var labelRadar = Titanium.UI.createLabel({
	color:'#999',
	text:'Radar',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

Ti.API.info('in width height'+win_height+','+win_width);
*/
var viewTop_radar = Titanium.UI.createView({
	left:0,
	top:0,
	width:viewContainer.width,
	height:viewContainerHEIGHT*(1/2)
});

/*
 * backgroundSelectedImage:'../images/BUTT_grn_on.png',
	backgroundDisabledImage: '../images/BUTT_drk_off.png',
 */
var btnReport = Titanium.UI.createButton({
	color:'#00f',
    backgroundImage:'images/reportButton.png',
	backgroundSelectedImage:'images/reportButton_pressed.png',
	left:0,
    top:viewTop_radar.height/3,
	width:viewTop_radar.width*(1/5),
    height:viewTop_radar.width*(1/5),
	font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Report'
});
var imv_satelite = Titanium.UI.createImageView({
   left:btnReport.left+btnReport.width,
   top:0,
   width:viewTop_radar.width*(3/5),
   height:viewTop_radar.height,
   image:'images/radar_signal/G.png'
});
var btnMap = Titanium.UI.createButton({
	color:'#00f',
    backgroundImage:'images/mapButton.png',
	backgroundSelectedImage:'images/mapButton_pressed.png',
	left:imv_satelite.left+imv_satelite.width,
    top:viewTop_radar.height/3,
	width:viewTop_radar.width*(1/5),
    height:viewTop_radar.width*(1/5),
	font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Map'
});
viewTop_radar.add(btnReport);
viewTop_radar.add(imv_satelite);
viewTop_radar.add(btnMap);


var viewBottom_Status = Titanium.UI.createView({
	left:0,
	top:viewTop_radar.top+viewTop_radar.height,
	width:viewContainer.width,
	height:viewContainerHEIGHT*(1/8),
	
});
//,borderColor:'#fff'
var viewBottom_Speed = Titanium.UI.createLabel({
	left:0,
	top:viewBottom_Status.top+viewBottom_Status.height,
	width:viewContainer.width,
	height:viewContainerHEIGHT*(3/8),
	color:'#999',
	text:'Radar',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center'
});

viewContainer.add(viewTop_radar);
viewContainer.add(viewBottom_Status);
viewContainer.add(viewBottom_Speed);
tabwin_radar.add(viewContainer);