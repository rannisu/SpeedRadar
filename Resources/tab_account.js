Titanium.include('account_code/account_sign_up.js');
Titanium.include('account_code/account_login.js');
Titanium.include('account_code/account_manage.js');

var win_width=Titanium.Platform.displayCaps.platformWidth;

var UserAccountEmailProperty='RS_Account_Email';
var UserAccountPwdProperty='RS_Account_Pwd';
var user_email,user_pwd;



/////////////////////////////////////////////////////////////////////////////////////
//Radar's account view
/////////////////////////////////////////////////////////////////////////////////////
var tabview_account = Titanium.UI.createScrollView({  
    title:'Account window',
    backgroundImage:'images/background.png',
	contentWidth:win_width,
	//contentHeight:500,
	showVerticalScrollIndicator:true
});
var accountContainer = Titanium.UI.createView({
	top:0,
  	width:win_width
});

/*
var labelAccount = Titanium.UI.createLabel({
	color:'#999',
	text:'Account',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

tabview_account.add(labelAccount);
*/



/////////////////////////////////////////////////////////////////////////////////////
//function
/////////////////////////////////////////////////////////////////////////////////////
function LoadAccountInfo(){
	//catch the account login info
	/*
	if(Ti.App.Properties.hasProperty(UserAccountEmailProperty)){
		user_email=Ti.App.Properties.getString(UserAccountEmailProperty);
		
		if(Ti.App.Properties.hasProperty(UserAccountPwdProperty)){
			//has log in
			user_pwd=Ti.App.Properties.getString(UserAccountPwdProperty);
			
			accountContainer.height=account_manageContainer.height;
			accountContainer.add(account_manageContainer);
		}else{
			//has log out
			Ti.API.info('the property pwd is '+Ti.App.Properties.getString(UserAccountPwdProperty));
			
			accountContainer.height=account_loginContainer.height;
			accountContainer.add(account_loginContainer);
		}
	}else{
		//first time to use it
		Ti.API.info('the property Email is '+Ti.App.Properties.getString(UserAccountEmailProperty));
		
		accountContainer.height=account_signupContainer.height;
		accountContainer.add(account_signupContainer);
	}*/
	
	
	//accountContainer.height=account_manageContainer.height;
	//accountContainer.add(account_manageContainer);
	
	//accountContainer.height=account_loginContainer.height;
	//accountContainer.add(account_loginContainer);
	
	accountContainer.height=account_signupContainer.height;
	accountContainer.add(account_signupContainer);
}


//catch the account login info
LoadAccountInfo();



//add to window
tabview_account.add(accountContainer);
tabview_account.contentHeight=accountContainer.top+accountContainer.height;



/////////////////////////////////////////////////////////////////////////////////////
//Event handler
/////////////////////////////////////////////////////////////////////////////////////
Titanium.App.addEventListener('SignUpFinishEvent',function(e){
	//log in process
	accountContainer.remove(account_signupContainer);
	accountContainer.height=account_loginContainer.height;
	accountContainer.add(account_loginContainer);
	
	
	var passMsg=e.message;
	Titanium.App.fireEvent("LogInEvent", {
		message: passMsg
	});
	
});