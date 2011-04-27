var win_width=Titanium.Platform.displayCaps.platformWidth;

var account_manageContainer = Titanium.UI.createView({
	top:0,
  	width:win_width,
  	height:500
});

var manageButton = Titanium.UI.createButton({
	title:'Manage',
	height:60,
	width:win_width,
	color:'red',
	font:{fontSize:48,fontWeight:'bold',fontFamily:'Helvetica Neue'}
});

account_manageContainer.add(manageButton);