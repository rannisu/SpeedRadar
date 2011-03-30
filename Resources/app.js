// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


//Construct main content views
Titanium.include('tab_radar.js'); // Creates a 'tab_radar' view we manipulate in the main app
Titanium.include('tab_setting.js'); // Creates a 'tab_setting' view we manipulate in the main app
Titanium.include('tab_account.js'); // Creates a 'tab_account' view we manipulate in the main app



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
