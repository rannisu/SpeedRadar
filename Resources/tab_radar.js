Titanium.include('tab_more.js');

var win_width=Titanium.Platform.displayCaps.platformWidth;
var win_height=Titanium.Platform.displayCaps.platformHeight;


var HttpClientObj;

//url
var baseURLStr;
var tracksURLStr;
var ugcURLStr;
var memberURLStr;
var notificationURLStr;
var announcement;
var reachGoalUrlStr;
//var camerasUrlStr='http://wildmind.info:8080/speedradar/1.0';
//var camerasUrlStr='http://wildmind.info:8080/speedradar/2';
var camerasUrlStr='http://wildmind.info:8080/speedradar/3/get';
//var udidUser='kevin_Test';
var udidUser='kevin';

var longitude;
var latitude;
var altitude;
var heading;
var accuracy;
var speed;
var timestamp;
var altitudeAccuracy;

var parseResult='';



//var viewContainerHEIGHT=(Ti.Platform.osname!='android')?win_height*(3/4):win_height*(4/5);
//Ti.API.info('Ti.Platform.osname:\t'+Ti.Platform.osname);

//,borderColor:'#fff'


/////////////////////////////////////////////////////////////////////////////////////
//Radar's main view
/////////////////////////////////////////////////////////////////////////////////////
var tab_radarview = Titanium.UI.createView({
	width:win_width,
	height:win_height,
	backgroundColor:'#fff'
});

var lineOffset=3,lineHeight=2;
var /*labelTextSmallSize=20,*/labelTextLargeSize=28;

/////////////////////////////////////////////////////////////////////////////////////
//create the status view
/////////////////////////////////////////////////////////////////////////////////////
var radar_status = Titanium.UI.createView({
	top:20,
	left:20,
 	width:win_width-40,
  	height:win_height*(0.55)-40,
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
	top:win_height*(0.55),
  	width:win_width,
  	height:win_height*(0.23),
  	backgroundColor:'#777777'
});


/////////////////////////////////////////////////////////////////////////////////////
//create the {report,map,more} view
/////////////////////////////////////////////////////////////////////////////////////
var radar_RMM = Titanium.UI.createView({
	top:radar_SSI.top+radar_SSI.height,
  	width:win_width,
  	height:win_height*(0.22)
});

var btnReport = Titanium.UI.createButton({
	color:'#00f',
    backgroundImage:'images/reportButton.png',
	backgroundSelectedImage:'images/reportButton_pressed.png',
	left:0,
    top:0,
	width:radar_RMM.width*(1/3),
    height:radar_RMM.width*(1/3),
	font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Report'
});

var btnMap = Titanium.UI.createButton({
	color:'#00f',
    backgroundImage:'images/mapButton.png',
	backgroundSelectedImage:'images/mapButton_pressed.png',
	left:btnReport.left+btnReport.width,
    top:0,
	width:radar_RMM.width*(1/3),
    height:radar_RMM.width*(1/3),
	font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Parse_getTrap'
});

var btnMore = Titanium.UI.createButton({
	color:'#00f',
    backgroundImage:'images/reportButton.png',
	backgroundSelectedImage:'images/reportButton_pressed.png',
	left:btnMap.left+btnMap.width,
    top:0,
	width:radar_RMM.width*(1/3),
    height:radar_RMM.width*(1/3),
	font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'More'
});

radar_RMM.add(btnReport);
radar_RMM.add(btnMap);
radar_RMM.add(btnMore);


tab_radarview.add(radar_status);
tab_radarview.add(radar_SSI);
tab_radarview.add(radar_RMM);









/////////////////////////////////////////////////////////////////////////////////////
//function
/////////////////////////////////////////////////////////////////////////////////////

function parseXMLdata(xmlData){
	var index,subindex;
	//Ti.API.info(xmlData.indexOf("<SR_baseurl>")+"     "+xmlData.indexOf("</SR_baseurl>"));
	if((index=xmlData.indexOf("<SR_baseurl>"))>0){
		Ti.API.info('getting SR_baseurl   '+index+'   '+xmlData.indexOf("</SR_baseurl>"));
		var subxml;
		if((subindex=xmlData.indexOf("registerNotification"))>0){
			subxml = xmlData.substring(subindex,xmlData.length);
			notificationURLStr=subxml.substring(subxml.indexOf("http://"),subxml.indexOf("\"/>"));
		}
		if((subindex=xmlData.indexOf("base"))>0){
			subxml = xmlData.substring(subindex,xmlData.length);
			baseURLStr=subxml.substring(subxml.indexOf("http://"),subxml.indexOf("\"/>"));
		}
		if((subindex=xmlData.indexOf("baseMember"))>0){
			subxml = xmlData.substring(subindex,xmlData.length);
			memberURLStr=subxml.substring(subxml.indexOf("http://"),subxml.indexOf("\"/>"));
		}
		if((subindex=xmlData.indexOf("reachGoal"))>0){
			subxml = xmlData.substring(subindex,xmlData.length);
			reachGoalUrlStr=subxml.substring(subxml.indexOf("http://"),subxml.indexOf("\"/>"));
		}
		tracksURLStr=baseURLStr+'/Tracks';
		ugcURLStr=baseURLStr+'/ugc';
		
		/*
		Ti.API.info('the notification:   '+notificationURLStr);
		Ti.API.info('the base:   '+baseURLStr);
		Ti.API.info('the baseMember:   '+memberURLStr);
		Ti.API.info('the reachGoal:   '+reachGoalUrlStr);
		Ti.API.info('the track:   '+tracksURLStr);
		Ti.API.info('the ugc:   '+ugcURLStr);
		*/
	}else if((index=xmlData.indexOf("<cameras>")+"<cameras>".length)>0){
		Ti.API.info('getting cameras   '+index+'   '+xmlData.indexOf("</cameras>"));
		
		var substrProcess=xmlData.substring(index,xmlData.indexOf("</cameras>"));
		//Ti.API.info(substrProcess+"   "+index);
		
		var cnt=0;
		while(substrProcess.length>0){
			//substrProcess=substrProcess.substring(0,substrProcess.indexOf("/>")+2);
			Ti.API.info(substrProcess.substring(0,substrProcess.indexOf("/>")+2));
			parseResult=parseResult+'\n'+substrProcess.substring(0,substrProcess.indexOf("/>")+2);
			substrProcess=substrProcess.substring(substrProcess.indexOf("/>")+2,substrProcess.length);
			//index=index+substrProcess.indexOf("/>")+2;
			//cnt++;
		}
		
		Titanium.UI.createAlertDialog({title:'Connection Parse Result', message:parseResult}).show();
		parseResult='';
		btnMap.backgroundImage='images/mapButton.png';
		//Ti.API.info(xmlData.split("<"));
	}
}

function downloadBaseUrl(){
	Ti.API.info('Start getUrl... \t');
	
	HttpClientObj = Titanium.Network.createHTTPClient();
	HttpClientObj.onload = function() {
		try{
			if(this.status >= 200 && this.status < 300){
				var results = this.responseText;
				//Ti.API.info(results);
				parseXMLdata(results);
			}else{
				Ti.API.info('Getting Base URL...Fail...Response Code: '+responseCode);
				baseURLStr = "http://speedradarTomcat-wildmind.apigee.com";
				memberURLStr = "http://members-wildmind.apigee.com";
				notificationURLStr = "http://apns-wildmind.apigee.com/register" ;
				tracksURLStr = baseURLStr+'/Tracks';
				ugcURLStr = baseURLStr+'/ugc';
			}
		}catch(exception) {
		    Ti.API.info(exception);
		}
	};
	HttpClientObj.open("GET","http://speedradarTomcat-wildmind.apigee.com/baseurl/get");
	HttpClientObj.send();
	
	
}

function getTraps(){
	Ti.API.info('Start getTraps... \t');
	
	//
	//  SET ACCURACY - THE FOLLOWING VALUES ARE SUPPORTED
	//
	// Titanium.Geolocation.ACCURACY_BEST
	// Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS
	// Titanium.Geolocation.ACCURACY_HUNDRED_METERS
	// Titanium.Geolocation.ACCURACY_KILOMETER
	// Titanium.Geolocation.ACCURACY_THREE_KILOMETERS
	//
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

	//
	//  SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES
	//  THIS VALUE IS IN METERS
	//
	Titanium.Geolocation.distanceFilter = 10;

	//
	// GET CURRENT POSITION - THIS FIRES ONCE
	//
	Titanium.Geolocation.getCurrentPosition(function(e)
	{
		if (!e.success || e.error)
		{
			currentLocation.text = 'error: ' + JSON.stringify(e.error);
			Ti.API.info("Code translation: "+translateErrorCode(e.code));
			alert('error ' + JSON.stringify(e.error));
			return;
		}

		//var index_point=(''+e.coords.longitude).indexOf(".");
		longitude = (''+e.coords.longitude).substring(0,(''+e.coords.longitude).indexOf(".")+7);
		latitude = (''+e.coords.latitude).substring(0,(''+e.coords.latitude).indexOf(".")+7);
		altitude = e.coords.altitude;
		heading = e.coords.heading;
		accuracy = e.coords.accuracy;
		speed = e.coords.speed;
		timestamp = e.coords.timestamp;
		altitudeAccuracy = e.coords.altitudeAccuracy;
		//Ti.API.info('speed ' + speed);
		//currentLocation.text = 'long:' + longitude + ' lat: ' + latitude;
		radar_status_top_label.text='long:' + longitude + ' lat: ' + latitude;
		//Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
		
		
		//連線一定要放在這個function裡面,因為要等longitude等值抓完
		HttpClientObj = Titanium.Network.createHTTPClient();
		HttpClientObj.onload = function() {
			try{
				var results = this.responseText;
			  	Ti.API.info(results);
				parseXMLdata(results);
				//labelStatus.text=baseUrl+'/'+latitude+'/'+longitude+'/'+udidUser;
				/*
			  	Titanium.UI.createAlertDialog({ 
			  	    title:'getTrap',
			  	    message: results
			  	  }).show() ;
			  	  */
			}catch(exception) {
			    Ti.API.info(exception);
				radar_status_top_label.text='Connect error!';
			}
		};
		//HttpClientObj.open("GET","http://wildmind.info:8080/speedradar/1.0/25.041784/121.546914/kevin_Test");
		//HttpClientObj.open("GET","http://wildmind.info:8080/speedradar/3/get/25.041784/121.546914/kevin_Test");
		HttpClientObj.open("GET",""+camerasUrlStr+'/'+latitude+'/'+longitude+'/'+udidUser);
		HttpClientObj.send();
	});
	//longitude=121.546914;
	//latitude=25.041784;
}



/////////////////////////////////////////////////////////////////////////////////////
//event handler
/////////////////////////////////////////////////////////////////////////////////////

function refreshUI(){
	radar_status_bottom_speed_label.height=radar_status_bottom_container.height*(0.5);
	radar_status_bottom_speedNUM_label.height=radar_status_bottom_speed_label.height;
	radar_status_bottom_distance_label.height=radar_status_bottom_speed_label.height;
	radar_status_bottom_distanceNUM_label.height=radar_status_bottom_speed_label.height;
		
	//radar_status_bottom_speed_label.top=0;
	//radar_status_bottom_speedNUM_label.top=0;
	radar_status_bottom_distance_label.top=radar_status_bottom_speed_label.height;
	radar_status_bottom_distanceNUM_label.top=radar_status_bottom_speed_label.height;
	
}

btnReport.addEventListener('click',function(e){
	if(radar_status_bottom_notification.visible){
		radar_status_bottom_container.height=radar_status_bottom_container.height*(40/25);
		radar_status_bottom_notification.top=radar_status_bottom_container.top+radar_status_bottom_container.height;
		
		refreshUI();
		
		btnReport.backgroundImage='images/reportButton.png';
		radar_status_bottom_notification.visible=false;
	}
	else{
		radar_status_bottom_container.height=radar_status_bottom_container.height*(25/40);
		radar_status_bottom_notification.top=radar_status_bottom_container.top+radar_status_bottom_container.height;
		
		refreshUI();
		
		btnReport.backgroundImage='images/reportButton_pressed.png';
		radar_status_bottom_notification.visible=true;
	}
	
});
btnMap.addEventListener('click',function(e){
	Ti.API.info('Start downloading data... \t');
	
	if (Titanium.Geolocation.locationServicesEnabled==false)
	{
		Titanium.UI.createAlertDialog({title:'Error', message:'Your device has geo turned off - turn it on.'}).show();
	}else{
		btnMap.backgroundImage='images/mapButton_pressed.png';
		downloadBaseUrl();
		getTraps();
	}
});
btnMore.addEventListener('click',function(e){
	if(Ti.Platform.osname!='android'){
		tab_morewindow.open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
		
		// open tab group
		tabGroup.open();
		
		tab_morewindow.add(tabGroup);
	} 
	else{
		Titanium.UI.createAlertDialog({title:'Here put ', message:'setting,account view...'}).show();
	} 
});
 
/*
tab_radarview.addEventListener('load',function(e) {
	Ti.API.info('Start downloading data... \t');
	
	if (Titanium.Geolocation.locationServicesEnabled==false)
	{
		Titanium.UI.createAlertDialog({title:'Error', message:'Your device has geo turned off - turn it on.'}).show();
	}else{
		downloadBaseUrl();
		getTraps();
	}

});
*/