// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


//Construct main content views
Titanium.include('tab_radar.js'); // Creates a 'tab_radar' view we manipulate in the main app
Titanium.include('tab_setting.js'); // Creates a 'tab_setting' view we manipulate in the main app
Titanium.include('tab_account.js'); // Creates a 'tab_account' view we manipulate in the main app

var HttpClientObj;
var baseUrl='http://wildmind.info:8080/speedradar/1.0';
//var baseUrl='http://wildmind.info:8080/speedradar/3/get';
var udidUser='kevin_Test';
//var udidUser='kevin';
var longitude;
var latitude;
var altitude;
var heading;
var accuracy;
var speed;
var timestamp;
var altitudeAccuracy;
/*
var background_process = Titanium.UI.createWindow({  
    title:'background process_hiding window'
});
background_process.addEventListener('click',function(e) {
	Ti.API.info('\t\there is open \t'+e);
});
*/

/////////////////////////////////////////////////////////////////////////////////////
//prevant the orientation change?  --still not working
/////////////////////////////////////////////////////////////////////////////////////
var main_window = Titanium.UI.createWindow({
	title:'main window',
	/*
	orientationModes : [
	  Titanium.UI.PORTRAIT,
	  //Titanium.UI.UPSIDE_PORTRAIT,
	  //Titanium.UI.LANDSCAPE_LEFT,
	  //Titanium.UI.LANDSCAPE_RIGHT,
	]*/
});

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//

//tab1:Radar_mainview
var tabRadar = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Radar',
    window:tabwin_radar
});
//tab2:setting
var tabSetting = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Setting',
    window:tabwin_setting
});
//tab3:account
var tabAccount = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Account',
    window:tabwin_account
});



//
//  add tabs
//
tabGroup.addTab(tabRadar);  
tabGroup.addTab(tabSetting);  
tabGroup.addTab(tabAccount); 

// open tab group
tabGroup.open();
tabGroup.addEventListener('open',function(e) {
	//first open tab, background fetch data
	Ti.API.info('Start downloading data... \t');
	
	if (Titanium.Geolocation.locationServicesEnabled==false)
	{
		Titanium.UI.createAlertDialog({title:'Kitchen Sink', message:'Your device has geo turned off - turn it on.'}).show();
	}else{
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
			labelStatus.text='long:' + longitude + ' lat: ' + latitude;
			//Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
		});
		//longitude=121.546914;
		//latitude=25.041784;
		
		HttpClientObj = Titanium.Network.createHTTPClient();
		HttpClientObj.onload = function() {
			try{
				var results = this.responseText;
			  	Ti.API.info(results);
				//labelStatus.text=baseUrl+'/'+latitude+'/'+longitude+'/'+udidUser;
			  	Titanium.UI.createAlertDialog({ 
			  	    title:'getTrap',
			  	    message: results
			  	  }).show() ;
			}catch(exception) {
			    Ti.API.info(exception);
			}
		};
		HttpClientObj.open("GET","http://wildmind.info:8080/speedradar/1.0/25.041784/121.546914/kevin_Test");
		//HttpClientObj.open("GET",""+baseUrl+'/'+latitude+'/'+longitude+'/'+udidUser);
		HttpClientObj.send();
	}
	
	
	
});

main_window.add(tabGroup);
