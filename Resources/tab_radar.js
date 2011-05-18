var navigationBarHeight=40;
var statusBarHeight=20;
var btnTabHeight=0.2;

var win_width=Titanium.Platform.displayCaps.platformWidth;
var win_height=Titanium.Platform.displayCaps.platformHeight-statusBarHeight;

if (Ti.Platform.osname != 'android') {
	win_height = win_height - navigationBarHeight;
	//Ti.API.info(navigationBarHeight);
}/*else{
	win_height = win_height - statusBarHeight;
}*/

var lineOffset=3,lineHeight=2;
var /*labelTextSmallSize=20,*/labelTextLargeSize=28;


var radarview_container = Titanium.UI.createView({
	backgroundImage:'images/background/radarview_bg.png',
	top:0,
	left:0,
 	width:win_width,
  	height:win_height*(1-btnTabHeight)
});

/////////////////////////////////////////////////////////////////////////////////////
//create the status view
/////////////////////////////////////////////////////////////////////////////////////
var radar_status = Titanium.UI.createView({
	top:20,
	left:20,
 	width:radarview_container.width-40,
  	height:radarview_container.height*(55/80)-30,
	backgroundImage:'images/bg.png'
});

var radar_status_top = Titanium.UI.createView({
	top:0,
  	width:radar_status.width,
  	height:radar_status.height*(15/55)
});

var radar_status_top_label = Titanium.UI.createLabel({
	left:0,
	top:0,
	width:'auto',
	height:'auto',
	color:'#fff',
	text:'(latitude,longitude)',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center'
});

radar_status_top.add(radar_status_top_label);


//the dynamic bottom
var radar_status_bottom = Titanium.UI.createView({
	top:radar_status_top.top+radar_status_top.height,
  	width:radar_status.width,
  	height:radar_status.height*(40/55)
});
var view_line =Titanium.UI.createView({
	top:0,
	left:lineOffset,
	width:radar_status_bottom.width-lineOffset*2,
	height:lineHeight,
	backgroundColor:'#777777'
});
radar_status_bottom.add(view_line);

var radar_status_bottom_container = Titanium.UI.createView({
	top:view_line.height,
  	width:radar_status_bottom.width,
  	height:radar_status_bottom.height-view_line.height
});
var radar_status_bottom_speed_label = Titanium.UI.createLabel({
	left:0,
	top:0,
	width:radar_status_bottom_container.width*(0.5),
	height:radar_status_bottom_container.height*(0.5),
	color:'#fff',
	text:'SPEED',
	font:{fontSize:labelTextLargeSize,fontFamily:'Helvetica Neue'},
	textAlign:'left'
});
var radar_status_bottom_speedNUM_label = Titanium.UI.createLabel({
	left:radar_status_bottom_speed_label.width,
	top:0,
	width:radar_status_bottom_container.width*(0.5),
	height:radar_status_bottom_container.height*(0.5),
	color:'#FFCC00',
	text:'120 KM/H',
	font:{fontSize:labelTextLargeSize,fontFamily:'Helvetica Neue'},
	textAlign:'right'
});

var radar_status_bottom_distance_label = Titanium.UI.createLabel({
	left:0,
	top:radar_status_bottom_speed_label.height,
	width:radar_status_bottom_container.width*(0.5),
	height:radar_status_bottom_container.height*(0.5),
	color:'#fff',
	text:'DISTANCE',
	font:{fontSize:labelTextLargeSize,fontFamily:'Helvetica Neue'},
	textAlign:'left'
});
var radar_status_bottom_distanceNUM_label = Titanium.UI.createLabel({
	left:radar_status_bottom_distance_label.width,
	top:radar_status_bottom_speed_label.height,
	width:radar_status_bottom_container.width*(0.5),
	height:radar_status_bottom_container.height*(0.5),
	color:'#fff',
	text:'1000 M',
	font:{fontSize:labelTextLargeSize,fontFamily:'Helvetica Neue'},
	textAlign:'right'
});

radar_status_bottom_container.add(radar_status_bottom_speed_label);
radar_status_bottom_container.add(radar_status_bottom_speedNUM_label);
radar_status_bottom_container.add(radar_status_bottom_distance_label);
radar_status_bottom_container.add(radar_status_bottom_distanceNUM_label);


var radar_status_bottom_notification = Titanium.UI.createView({
	top:radar_status_bottom_container.top+radar_status_bottom_container.height,
  	width:radar_status_bottom.width,
  	height:radar_status_bottom.height*(15/40),
  	visible:false
});
var view_line_not =Titanium.UI.createView({
	top:0,
	left:lineOffset,
	width:radar_status_bottom_notification.width-lineOffset*2,
	height:lineHeight,
	backgroundColor:'#777777'
});
radar_status_bottom_notification.add(view_line_not);

var radar_status_bottom_notification_image = Titanium.UI.createImageView({
	left:0,
	top:radar_status_bottom_notification.height*(1/3),
	width:radar_status_bottom_notification.width*(0.1),
	/*width:viewBottom_Speed.width*(6/7),*/
	height:radar_status_bottom_notification.width*(0.1),
	backgroundImage:'images/cam.png'
});
var radar_status_bottom_notification_label = Titanium.UI.createLabel({
	left:radar_status_bottom_notification_image.width,
	top:0,
	width:radar_status_bottom_notification.width*(0.9),
	height:radar_status_bottom_notification.height,
	color:'#fff',
	text:'樂群一路近堤頂大道(東向)',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center'
});
radar_status_bottom_notification.add(radar_status_bottom_notification_image);
radar_status_bottom_notification.add(radar_status_bottom_notification_label);


radar_status_bottom.add(radar_status_bottom_container);
radar_status_bottom.add(radar_status_bottom_notification);

radar_status.add(radar_status_top);
radar_status.add(radar_status_bottom);

/////////////////////////////////////////////////////////////////////////////////////
//create the {salute,speed,ignore} view
/////////////////////////////////////////////////////////////////////////////////////
var radar_SSI = Titanium.UI.createView({
	top:win_height*(0.55)-10,
  	width:radarview_container.width,
  	height:radarview_container.height*(25/80)+10
});
var radar_SSI_btnLikeReport = Titanium.UI.createButton({
	left:10,
    backgroundImage:'images/likeReportButton.png',
	backgroundSelectedImage:'images/likeReportButton_dark.png',
	width:radar_SSI.width*(1/3),
    height:(radar_SSI.height-20)*0.8
});
var radar_SSI_btnLikeReport_label = Titanium.UI.createLabel({
	top:radar_SSI_btnLikeReport.height,
	left:radar_SSI_btnLikeReport.left,
	color:'#fff',
	width:radar_SSI_btnLikeReport.width,
    height:(radar_SSI.height-20)*0.2,
	font:{fontSize:24,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	text:'28',
	textAlign:'center'
});
var radar_SSI_notification_label = Titanium.UI.createLabel({
	left:radar_SSI_btnLikeReport.width,
	width:radar_SSI.width*(1/3),
    height:radar_SSI.height-20,
	color:'#000',
	text:'90',
	font:{fontSize:80,fontFamily:'Helvetica Neue'},
	textAlign:'center'
});
var radar_SSI_btnHateReport = Titanium.UI.createButton({
	left:radar_SSI_notification_label.left+radar_SSI_notification_label.width,
    backgroundImage:'images/hateReportButton.png',
	backgroundSelectedImage:'images/hateReportButton_dark.png',
	width:radar_SSI.width*(1/3),
    height:(radar_SSI.height-20)*0.8,
});
var radar_SSI_btnHateReport_label = Titanium.UI.createLabel({
	top:radar_SSI_btnHateReport.height,
	left:radar_SSI_btnHateReport.left,
	color:'#fff',
	width:radar_SSI_btnHateReport.width,
    height:(radar_SSI.height-20)*0.2,
	font:{fontSize:24,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	text:'3',
	textAlign:'center'
});
radar_SSI.add(radar_SSI_btnLikeReport);
radar_SSI.add(radar_SSI_btnLikeReport_label);
radar_SSI.add(radar_SSI_notification_label);
radar_SSI.add(radar_SSI_btnHateReport);
radar_SSI.add(radar_SSI_btnHateReport_label);

radarview_container.add(radar_status);
radarview_container.add(radar_SSI);