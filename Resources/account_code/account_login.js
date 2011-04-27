var win_width=Titanium.Platform.displayCaps.platformWidth;
var gettingBaseUrlFinish=false,downloadSuccessful='unsuccess';
var loginURL='/user/login';

var account_loginContainer = Titanium.UI.createView({
	top:0,
  	width:win_width,
  	height:500
});
var baseurlLabel = Ti.UI.createLabel({
  textAlign:'center',
  font:{
    fontSize:24,
    fontFamily:'Trebuchet MS',
    fontWeight:'bold',
    fontStyle:'italic'
  },
  height:'200',
  width:win_width,
  color:'#fff',
  top:50
});

var loginButton = Titanium.UI.createButton({
	title:'Login',
	height:60,
	width:win_width,
	color:'red',
	font:{fontSize:48,fontWeight:'bold',fontFamily:'Helvetica Neue'}
});
account_loginContainer.add(baseurlLabel);
account_loginContainer.add(loginButton);




/////////////////////////////////////////////////////////////////////////////////////
//function
/////////////////////////////////////////////////////////////////////////////////////
function ConnectServerLogin(userinfo){
	//request:signupURL
	//body:username=%@&password=%@&email=%@&mood=%@&nickname=%@&language=%@&app=speedradar
	
	//var bodyStr='username=rannisu@wildmindcorp.com&password=speedradar123&email=rannisu@wildmindcorp.com&mood=soso&nickname=ran&language=tw&app=speedradar';
	//var bodyStr='username=ran123'+encodeURIComponent('@')+'gmail.com&password=speedradar123&email=ran123'+encodeURIComponent('@')+'gmail.com&mood=&nickname=test&language=en&app=speedradar';
	
	
	//bodyStr=bodyStr.replace('gmail',encodeURIComponent('@'));
	//Ti.API.info(userinfo);
	
	HttpClientObj = Titanium.Network.createHTTPClient();
	HttpClientObj.onload = function() {
		try{
			var results = this.responseText;
			var msg2show=downloadSuccessful+'\n\n\n'+results;
			var errorReason;
			
			if(this.status == 200){
				
				Ti.API.info(results);
				
				errorReason='no error';
			}else if(this.status >= 500){
				errorReason='Time out!';
			}
			
			Titanium.UI.createAlertDialog({ 
			  	    title:'login',
			  	    message: msg2show+' \n\n '+this.status+' \n\n '+errorReason
			  	  }).show() ;
		}catch(exception) {
		    Ti.API.info(exception);
		}
	};
	HttpClientObj.open("POST",loginURL);
	HttpClientObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
	if (Titanium.Platform.osname != 'android') {
		HttpClientObj.setRequestHeader("Content-Length", userinfo.length);
	}
	HttpClientObj.send(userinfo);
}





/////////////////////////////////////////////////////////////////////////////////////
//Event handler
/////////////////////////////////////////////////////////////////////////////////////
Titanium.App.addEventListener('GetBaseurlEvent',function(e){
	gettingBaseUrlFinish=true;
	downloadSuccessful=e.message;
});

loginButton.addEventListener('click',function(e){
	//Ti.API.info('downloadURL '+downloadSuccessful);
	if(gettingBaseUrlFinish){
		if(loginURL=='/user/login'){
			loginURL=account_signupContainer.memberURLStr+loginURL;
			Ti.API.info('see '+loginURL);
		
			
			var userInfo='username=rannisu@wildmindcorp.com&password=speedradar123&app=speedradar&udid=5BF6E101-3CDE-5882-8947-38E1E8B9BFB4&language=en';
			if(Titanium.Platform.osname == 'android'){
				userInfo='username=ran123@gmail.com&password=sr123&app=speedradar&udid=android&language=en';
			} 
			
			//log in process
			ConnectServerLogin(userInfo);
		}
		baseurlLabel.text='';
		/*
		Ti.API.info('========================================================');
		Ti.API.info('the account sign up with url: '+account_signupContainer.memberURLStr);
		Ti.API.info('========================================================');
		*/
	}else{
		Ti.API.info('has not yet downloaded,please wait');
		baseurlLabel.text='has not yet downloaded,please wait';
		baseurlLabel.visible=true;
	}
	
});


Titanium.App.addEventListener('LogInEvent',function(e){
	//log in process
	ConnectServerLogin(e.message);
});
