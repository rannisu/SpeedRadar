// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

//Construct main content views
Titanium.include('tab_radar.js'); // Creates a 'tab_radar' view we manipulate in the main app
Titanium.include('mapview.js');
Titanium.include('tab_more.js');

//Create main app window
/*
var app = Titanium.UI.createWindow({
  backgroundImage:'images/background.png'
});


//app.add(headerView);
app.add(tab_radarview);
app.open();
*/

var catchDataFinish=false;

var navigationBarHeight=40;
var statusBarHeight=20;

var win_width=Titanium.Platform.displayCaps.platformWidth;
var win_height=Titanium.Platform.displayCaps.platformHeight-statusBarHeight;

if (Ti.Platform.osname != 'android') {
	win_height = win_height - navigationBarHeight;
	//Ti.API.info(navigationBarHeight);
}/*else{
	win_height = win_height - statusBarHeight;
}*/

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
var userEmail='ylhuang@wildmindcorp.com';

var longitude;
var latitude;
var altitude;
var heading;
var accuracy;
var speed;
var timestamp;
var altitudeAccuracy;

//var parseResult=new Array(0);
var navigationBarHeight;

//var viewContainerHEIGHT=(Ti.Platform.osname!='android')?win_height*(3/4):win_height*(4/5);
//Ti.API.info('Ti.Platform.osname:\t'+Ti.Platform.osname);

//,borderColor:'#fff'


/////////////////////////////////////////////////////////////////////////////////////
//Radar's main view
/////////////////////////////////////////////////////////////////////////////////////
var tab_radarview = Titanium.UI.createWindow({
	width:win_width,
	height:win_height,
	backgroundColor:'#fff',
	title:'Radar view'
	//,navBarHidden:true,fullscreen:false
});

tab_radarview.addEventListener('open',function(e){
	if(!catchDataFinish){
		//資料只抓一次
		downloadBaseUrl();
		getTraps();
		
		catchDataFinish=true;
	}
});
/*
tab_radarview.addEventListener('close',function(e){
	Ti.API.info('tab close');
});*/

if(Ti.Platform.osname != 'android'){
	tab_radarview.navBarHidden=false;
}




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
    height:radar_RMM.height,
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
    height:radar_RMM.height,
	font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Map'
	//title:'Parse_getTrap'
});

var btnMore = Titanium.UI.createButton({
	color:'#00f',
    //image:'images/reportButton.png',
	backgroundImage:'images/reportButton.png',
	backgroundSelectedImage:'images/reportButton_pressed.png',
	left:btnMap.left+btnMap.width,
    top:0,
	width:radar_RMM.width*(1/3),
    height:radar_RMM.height,
	font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'More'
});

radar_RMM.add(btnReport);
radar_RMM.add(btnMap);
radar_RMM.add(btnMore);


mapview_container.visible=false;
radarview_container.visible=true;
tab_radarview.add(radarview_container);
tab_radarview.add(mapview_container);
tab_radarview.add(radar_RMM);









/////////////////////////////////////////////////////////////////////////////////////
//function
/////////////////////////////////////////////////////////////////////////////////////

function parseXMLdata(xmlData){
	var index,subindex;
	//Ti.API.info(xmlData.indexOf("<SR_baseurl>")+"     "+xmlData.indexOf("</SR_baseurl>"));
	if((index=xmlData.indexOf("<SR_baseurl>"))>0){
		//Ti.API.info('getting SR_baseurl   '+index+'   '+xmlData.indexOf("</SR_baseurl>"));
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
		//Ti.API.info('getting cameras   '+index+'   '+xmlData.indexOf("</cameras>"));
		
		var substrProcess=xmlData.substring(index,xmlData.indexOf("</cameras>"));
		//Ti.API.info(substrProcess+"   "+index);
		
		var cnt=0;
		while(substrProcess.length>0){
			//substrProcess=substrProcess.substring(0,substrProcess.indexOf("/>")+2);
			//Ti.API.info(substrProcess.substring(0,substrProcess.indexOf("/>")+2));
			//parseResult=parseResult+'\n'+substrProcess.substring(0,substrProcess.indexOf("/>")+2);
			//parseResult[parseResult.length]=substrProcess.substring(0,substrProcess.indexOf("/>")+2);
			var tmp2check=substrProcess.substring(0,substrProcess.indexOf("/>")+2);
			var indexReporter = tmp2check.indexOf("reporter=")+10;
			var reporterEmail = tmp2check.substring(indexReporter,tmp2check.indexOf("\" ",indexReporter));
			
			if(reporterEmail=="WildmindCorp"){//wildmind
				wildmindRepoter[wildmindRepoter.length]=substrProcess.substring(0,substrProcess.indexOf("/>")+2);
			}else if(reporterEmail==userEmail){//user self
				myRepoter[myRepoter.length]=substrProcess.substring(0,substrProcess.indexOf("/>")+2);
			}else{//others
				otherRepoter[otherRepoter.length]=substrProcess.substring(0,substrProcess.indexOf("/>")+2);
			}
			
			substrProcess=substrProcess.substring(substrProcess.indexOf("/>")+2,substrProcess.length);
			//index=index+substrProcess.indexOf("/>")+2;
			//cnt++;
		}
		
		////////////////////////////////////////////////////////
		/////////////////////設定map的data annotation///////////////////////////////////
		settingMapData();
		////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////
		
		
		/*
		parseResult=null;
		parseResult=new Array(0);
		*/
		btnMap.backgroundImage='images/mapButton.png';
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
			
			
			//event to notify others that downloading success.
			account_signupContainer.memberURLStr=memberURLStr;
			Titanium.App.fireEvent("GetBaseurlEvent", {
				    message: 'success'
			});
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
		
		currentLatitude=latitude;
		currentLongitude=longitude;
		//Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
		
		
		//連線一定要放在這個function裡面,因為要等longitude等值抓完
		HttpClientObj = Titanium.Network.createHTTPClient();
		HttpClientObj.onload = function() {
			try{
				var results = this.responseText;
			  	//Ti.API.info(results);
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
	//Ti.API.info('Start downloading data... \t');
	
	if (Titanium.Geolocation.locationServicesEnabled==false)
	{
		Titanium.UI.createAlertDialog({title:'Error', message:'Your device has geo turned off - turn it on.'}).show();
	}else{
		
		if(mapview_container.visible){
			mapview_container.visible = false;
			radarview_container.visible = true;
			
			btnMap.title='Map';
			tab_radarview.title='Radar view';
		}else{
			//btnMap.backgroundImage='images/mapButton_pressed.png';
			
			mapview_container.visible = true;
			radarview_container.visible = false;
			
			btnMap.title='Radar';
			tab_radarview.title='Map view';
		}
		
	}
});
btnMore.addEventListener('click',function(e){
	if(Ti.Platform.osname!='android'){
		//Ti.API.info(navigationBarHeight);
		nav.open(tab_morewindow, {animated: true});
	} 
	else{
		tab_morewindow.open();
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


if (Ti.Platform.osname != 'android') {
	var app = Titanium.UI.createWindow();
	
	var nav = Titanium.UI.iPhone.createNavigationGroup({
		window: tab_radarview
	});
	app.add(nav);
	app.open();
}else{
	tab_radarview.open();
}


