
var tabview_account = Titanium.UI.createView({  
    title:'Account window',
    backgroundImage:'images/background.png'
});


var labelAccount = Titanium.UI.createLabel({
	color:'#999',
	text:'Account',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

tabview_account.add(labelAccount);
