Titanium.include('tab_setting.js'); // Creates a 'tab_setting' view we manipulate in the main app
Titanium.include('tab_account.js'); // Creates a 'tab_account' view we manipulate in the main app

var btnTabHeight=0.22;
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

/////////////////////////////////////////////////////////////////////////////////////
//Radar's more window
/////////////////////////////////////////////////////////////////////////////////////
var tab_morewindow = Ti.UI.createWindow({
  backgroundImage:'images/background.png',
  navBarHidden:true,fullscreen:true
});

if(Ti.Platform.osname != 'android'){
	tab_morewindow.navBarHidden=false;
} 
var tabContainer = Titanium.UI.createView({
	top:0,
  	width:win_width,
  	height:win_height*(1-btnTabHeight)
});

/////////////////////////////////////////////////////////////////////////////////////
//switch tab{setting,account} implement
/////////////////////////////////////////////////////////////////////////////////////

tabview_setting.visible = true;
tabview_account.visible = false;

tabContainer.add(tabview_setting);
tabContainer.add(tabview_account);
tab_morewindow.add(tabContainer);


/////////////////////////////////////////////////////////////////////////////////////
//create the {setting,account} view
/////////////////////////////////////////////////////////////////////////////////////
var tab_SA = Titanium.UI.createView({
	top:tabContainer.height,
  	width:win_width,
  	height:win_height*btnTabHeight
});

var btnSetting = Titanium.UI.createButton({
	color:'#00f',
	/*
    backgroundImage:'images/reportButton.png',
	backgroundSelectedImage:'images/reportButton_pressed.png',*/
	
	left:0,
    top:0,
	width:tab_SA.width*(1/2),
    height:tab_SA.height,
	font:{fontSize:18,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Setting'
});

var btnAccount = Titanium.UI.createButton({
	color:'#00f',
	/*
    backgroundImage:'images/mapButton.png',
	backgroundSelectedImage:'images/mapButton_pressed.png',*/
	
	left:btnSetting.left+btnSetting.width,
    top:0,
	width:tab_SA.width*(1/2),
    height:tab_SA.height,
	font:{fontSize:18,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Account'
	//title:'Parse_getTrap'
});
/*
var btnMore = Titanium.UI.createButton({
	color:'#00f',
    backgroundImage:'images/reportButton.png',
	backgroundSelectedImage:'images/reportButton_pressed.png',
	left:btnRadar.left+btnRadar.width,
    top:0,
	width:tab_RRM.width*(1/3),
    height:tab_RRM.width*(1/3),
	font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'More'
});*/

tab_SA.add(btnSetting);
tab_SA.add(btnAccount);
//tab_RRM.add(btnMore);

tab_morewindow.add(tab_SA);




/////////////////////////////////////////////////////////////////////////////////////
//event handler
/////////////////////////////////////////////////////////////////////////////////////

btnSetting.addEventListener('click',function(e){
	tabview_setting.visible = true;
	tabview_account.visible = false;
	//Titanium.UI.createAlertDialog({title:'Report ', message:'success'}).show();
});
btnAccount.addEventListener('click',function(e){
	tabview_setting.visible = false;
	tabview_account.visible = true;
	//tab_radarview.open();
	//app.open();
});
/*
btnMore.addEventListener('click',function(e){
	Titanium.UI.createAlertDialog({title:'Here put ', message:'setting,account view...'}).show();
});
*/