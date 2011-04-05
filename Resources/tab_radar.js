
var tabwin_radar = Titanium.UI.createWindow({  
    title:'Radar window'
});
//var win_width=tabwin_radar.getWidth();
//var win_height=tabwin_radar.getHeight();
var win_width=Titanium.Platform.displayCaps.platformWidth;
var win_height=Titanium.Platform.displayCaps.platformHeight;
var viewContainerHEIGHT=(Ti.Platform.osname!='android')?win_height*(3/4):win_height*(4/5);
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
	width:viewTop_radar.width*(1/4),
    height:viewTop_radar.width*(1/4),
	font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Report'
});
var imv_satelite = Titanium.UI.createImageView({
   left:btnReport.left+btnReport.width*(4/5),
   top:0,
   width:viewTop_radar.width*(3/5),
   height:viewTop_radar.height,
   image:'images/radar_signal/R.png'
});
var btnMap = Titanium.UI.createButton({
	color:'#00f',
    backgroundImage:'images/mapButton.png',
	backgroundSelectedImage:'images/mapButton_pressed.png',
	left:imv_satelite.left+imv_satelite.width+imv_satelite.left-btnReport.width,
    top:viewTop_radar.height/3,
	width:viewTop_radar.width*(1/4),
    height:viewTop_radar.width*(1/4),
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
	height:viewContainerHEIGHT*(1/8)
	
});



var labelStatus = Titanium.UI.createLabel({
	left:0,
	top:0,
	width:viewBottom_Status.width,
	height:viewBottom_Status.height,
	color:'#fff',
	text:'Working',
	font:{fontSize:35,fontFamily:'Helvetica Neue'},
	textAlign:'center'
});

viewBottom_Status.add(labelStatus);

//,borderColor:'#fff'
var viewBottom_Speed = Titanium.UI.createView({
	left:0,
	top:viewBottom_Status.top+viewBottom_Status.height,
	width:viewContainer.width,
	height:viewContainerHEIGHT*(3/8),
	borderColor:'#fff'
});

var dif_compass_left=(Ti.Platform.osname!='android')?0:10;
var dif_compass_top=(Ti.Platform.osname!='android')?0:2;
Ti.API.info('the os '+Ti.Platform.osname+' and (left,top)=('+dif_compass_left+','+dif_compass_top+')');

var view_compass = Titanium.UI.createView({
	left:0,
	top:viewBottom_Speed.height*(1/3),
	width:0,
	/*width:viewBottom_Speed.height*(1/3),*/
	height:viewBottom_Speed.height*(1/3),
	backgroundImage:'images/compassback.png'
});
var imv_compass = Titanium.UI.createImageView({
   left:dif_compass_left,
   top:dif_compass_top,
   width:view_compass.width-2*dif_compass_left,
   height:view_compass.height-2*dif_compass_top,
   image:'images/compass.png'
});
view_compass.add(imv_compass);

var view_speed = Titanium.UI.createImageView({
	left:view_compass.left+view_compass.width,
	top:0,
	width:viewBottom_Speed.width,
	/*width:viewBottom_Speed.width*(6/7),*/
	height:viewBottom_Speed.height,
	backgroundImage:'images/lcdBg.png'
});
var labelSpeed = Titanium.UI.createLabel({
	left:0,
	top:0,
	width:'auto',
	height:'auto',
	color:'#fff',
	text:'Radar Speed',
	font:{fontSize:40,fontFamily:'Helvetica Neue'},
	textAlign:'center'
});
view_speed.add(labelSpeed);

viewBottom_Speed.add(view_compass);
viewBottom_Speed.add(view_speed);

viewContainer.add(viewTop_radar);
viewContainer.add(viewBottom_Status);
viewContainer.add(viewBottom_Speed);
tabwin_radar.add(viewContainer);