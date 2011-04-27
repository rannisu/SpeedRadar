
Titanium.include('setting_code/setting_subview.js');

var win_width=Titanium.Platform.displayCaps.platformWidth;

var tabview_setting = Titanium.UI.createScrollView({  
    title:'Setting window',
    backgroundImage:'images/background.png',
	contentWidth:win_width,
	//contentHeight:'auto',
	showVerticalScrollIndicator:true
});

var labelSetting = Titanium.UI.createLabel({
	color:'#999',
	text:'Setting',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

var firstWarn_setting=new setting_subview_model('1','600');
firstWarn_setting.setting_viewContainer.top=0;
tabview_setting.add(firstWarn_setting.setting_viewContainer);
/*
var view_line =Titanium.UI.createView({
	top:firstWarn_setting.setting_viewContainer.height+20,
	left:5,
	width:Titanium.Platform.displayCaps.platformWidth-10,
	height:5,
	backgroundColor:'#fff'
});
tabview_setting.add(view_line);
*/
var secondWarn_setting=new setting_subview_model('2','100');
secondWarn_setting.setting_viewContainer.top=firstWarn_setting.setting_viewContainer.height+20;
tabview_setting.add(secondWarn_setting.setting_viewContainer);

var view_line =Titanium.UI.createView({
	top:secondWarn_setting.setting_viewContainer.top+secondWarn_setting.setting_viewContainer.height+20,
	left:0,
	width:10,
	height:50
});
tabview_setting.add(view_line);

tabview_setting.contentHeight=view_line.top+view_line.height;
/*
var eWarn_setting=new setting_subview_model('3','30');
eWarn_setting.setting_viewContainer.top=secondWarn_setting.setting_viewContainer.top+secondWarn_setting.setting_viewContainer.height+20;
tabview_setting.add(eWarn_setting.setting_viewContainer);
*/
//tabwin_setting.add(labelSetting);