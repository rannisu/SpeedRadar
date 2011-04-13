Titanium.include('tab_setting.js'); // Creates a 'tab_setting' view we manipulate in the main app
Titanium.include('tab_account.js'); // Creates a 'tab_account' view we manipulate in the main app



/////////////////////////////////////////////////////////////////////////////////////
//Radar's more window
/////////////////////////////////////////////////////////////////////////////////////
var tab_morewindow = Ti.UI.createWindow({
  backgroundImage:'images/background.png'
});

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
//tab1:setting
var tabSetting = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Setting',
    window:tabwin_setting
});
//tab2:account
var tabAccount = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Account',
    window:tabwin_account
});

//
//  add tabs
// 
tabGroup.addTab(tabSetting);  
tabGroup.addTab(tabAccount); 

