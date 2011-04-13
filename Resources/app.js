// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

//Construct main content views
Titanium.include('tab_radar.js'); // Creates a 'tab_radar' view we manipulate in the main app


//Create main app window
var app = Ti.UI.createWindow({
  backgroundImage:'images/background.png'
});
//app.add(headerView);
app.add(tab_radarview);
app.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});