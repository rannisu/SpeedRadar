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

var wildmindRepoter=new Array(0);
var otherRepoter=new Array(0);
var myRepoter=new Array(0);

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
	
	//Ti.API.info(wildmindRepoter.length+'   wildmind');
	for(i=0;i<wildmindRepoter.length;i++){
		var indexLat=wildmindRepoter[i].indexOf("latitude")+10;
		var latitudeW=wildmindRepoter[i].substring(indexLat,wildmindRepoter[i].indexOf("\" ",indexLat));
		var indexLong=wildmindRepoter[i].indexOf("longitude")+11;
		var longitudeW=wildmindRepoter[i].substring(indexLong,wildmindRepoter[i].indexOf("\" ",indexLong));
		
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
	
	
	//Ti.API.info(otherRepoter.length+'   other');
	for(i=0;i<otherRepoter.length;i++){
		//Ti.API.info(otherRepoter[i]);
		indexLat=otherRepoter[i].indexOf("latitude")+10;
		latitudeW=otherRepoter[i].substring(indexLat,otherRepoter[i].indexOf("\" ",indexLat));
		indexLong=otherRepoter[i].indexOf("longitude")+11;
		longitudeW=otherRepoter[i].substring(indexLong,otherRepoter[i].indexOf("\" ",indexLong));
		
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
	//Ti.API.info(myRepoter.length+'   userOwn');
	for(i=0;i<myRepoter.length;i++){
		//Ti.API.info(myRepoter[i]);
		indexLat=myRepoter[i].indexOf("latitude")+10;
		latitudeW=myRepoter[i].substring(indexLat,myRepoter[i].indexOf("\" ",indexLat));
		indexLong=myRepoter[i].indexOf("longitude")+11;
		longitudeW=myRepoter[i].substring(indexLong,myRepoter[i].indexOf("\" ",indexLong));
		
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
