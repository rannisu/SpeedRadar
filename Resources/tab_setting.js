
var tabwin_setting = Titanium.UI.createWindow({  
    title:'Setting window',
    backgroundImage:'images/background.png'
});

var labelSetting = Titanium.UI.createLabel({
	color:'#999',
	text:'Setting',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

tabwin_setting.add(labelSetting);