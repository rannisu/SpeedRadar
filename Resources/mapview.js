Titanium.include('tab_more.js');

var navigationBarHeight=40;
var statusBarHeight=20;
var btnTabHeight=0.22;

var win_width=Titanium.Platform.displayCaps.platformWidth;
var win_height=Titanium.Platform.displayCaps.platformHeight-statusBarHeight;

if (Ti.Platform.osname != 'android') {
	win_height = win_height - navigationBarHeight;
}/*else{
	win_height = win_height - statusBarHeight;
}*/

var currentLatitude;
var currentLongitude;

var wildmindReporter=new Array(0);
var otherReporter=new Array(0);
var myReporter=new Array(0);

var mapAnnotation=new Array(0);
var wildmindAnnotation=new Array(0);
var otherAnnotation=new Array(0);
var myAnnotation=new Array(0);

/////////////////////////////////////////////////////////////////////////////////////
//Map's main view
/////////////////////////////////////////////////////////////////////////////////////
var mapview_container = Ti.UI.createView({
	top:0,
	left:0,
	width:win_width,
  	height:win_height*(1-btnTabHeight),
	backgroundImage:'images/background.png'
});

var label = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

function settingMapData(){
	
	//Ti.API.info(wildmindReporter.length+'   wildmind');
	for(i=0;i<wildmindReporter.length;i++){
		/*
		var indexLat=wildmindReporter[i].indexOf("latitude")+10;
		var latitudeW=wildmindReporter[i].substring(indexLat,wildmindReporter[i].indexOf("\" ",indexLat));
		var indexLong=wildmindReporter[i].indexOf("longitude")+11;
		var longitudeW=wildmindReporter[i].substring(indexLong,wildmindReporter[i].indexOf("\" ",indexLong));
		*/
		var latitudeW=wildmindReporter[i].substring(wildmindReporter[i].indexOf("(")+1,wildmindReporter[i].indexOf(","));
		var longitudeW=wildmindReporter[i].substring(wildmindReporter[i].indexOf(",")+1,wildmindReporter[i].indexOf(")"));
		
		mapAnnotation[mapAnnotation.length]= Titanium.Map.createAnnotation({
			latitude:latitudeW,
			longitude:longitudeW,
			title:"Wildmind",
			subtitle:'camera',
			pinImage:'images/SpeedRadar_pin/official/pin5_official.png',
			animate:true,
			rightButton: 'images/SpeedRadar_pin/official/pin5_official.png',
			myid:1 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
		});
		//if (Ti.Platform.osname != 'android') wildmindAnnotation[i].pincolor=Titanium.Map.ANNOTATION_GREEN;
	}
	
	
	//Ti.API.info(otherReporter.length+'   other');
	for(i=0;i<otherReporter.length;i++){
		//Ti.API.info(otherReporter[i]);
		/*
		indexLat=otherReporter[i].indexOf("latitude")+10;
		latitudeW=otherReporter[i].substring(indexLat,otherReporter[i].indexOf("\" ",indexLat));
		indexLong=otherReporter[i].indexOf("longitude")+11;
		longitudeW=otherReporter[i].substring(indexLong,otherReporter[i].indexOf("\" ",indexLong));
		*/
		latitudeW=otherReporter[i].substring(otherReporter[i].indexOf("(")+1,otherReporter[i].indexOf(","));
		longitudeW=otherReporter[i].substring(otherReporter[i].indexOf(",")+1,otherReporter[i].indexOf(")"));
		
		mapAnnotation[mapAnnotation.length]= Titanium.Map.createAnnotation({
			latitude:latitudeW,
			longitude:longitudeW,
			title:"Others",
			subtitle:'camera',
			pinImage:'images/SpeedRadar_pin/others_report/pin5_OR.png',
			animate:true,
			rightButton: 'images/SpeedRadar_pin/others_report/pin5_OR.png',
			myid:2 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
		});
		if (Ti.Platform.osname != 'android'){
			mapAnnotation[mapAnnotation.length-1].pincolor=Titanium.Map.ANNOTATION_PURPLE;
		} 
	}
	//Ti.API.info(myReporter.length+'   userOwn');
	for(i=0;i<myReporter.length;i++){
		//Ti.API.info(myReporter[i]);
		/*
		indexLat=myReporter[i].indexOf("latitude")+10;
		latitudeW=myReporter[i].substring(indexLat,myReporter[i].indexOf("\" ",indexLat));
		indexLong=myReporter[i].indexOf("longitude")+11;
		longitudeW=myReporter[i].substring(indexLong,myReporter[i].indexOf("\" ",indexLong));
		*/
		
		latitudeW=myReporter[i].substring(myReporter[i].indexOf("(")+1,myReporter[i].indexOf(","));
		longitudeW=myReporter[i].substring(myReporter[i].indexOf(",")+1,myReporter[i].indexOf(")"));
		Ti.API.info(latitudeW+'     '+longitudeW);
		
		mapAnnotation[mapAnnotation.length]= Titanium.Map.createAnnotation({
			latitude:latitudeW,
			longitude:longitudeW,
			title:"Self",
			subtitle:'camera',
			pinImage:'images/SpeedRadar_pin/self_report/pin5_SR.png',
			animate:true,
			rightButton: 'images/SpeedRadar_pin/self_report/pin5_SR.png',
			myid:3 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
		});
		if (Ti.Platform.osname != 'android'){
			mapAnnotation[mapAnnotation.length-1].pincolor=Titanium.Map.ANNOTATION_GREEN;
		} 
	}
	
	var mapview = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region:{latitude:currentLatitude, longitude:currentLongitude, latitudeDelta:0.01, longitudeDelta:0.01},
		animate:true,
		regionFit:true,
		userLocation:true,
		annotations:mapAnnotation
	});
	mapview_container.add(mapview);
}

mapview_container.add(label);
