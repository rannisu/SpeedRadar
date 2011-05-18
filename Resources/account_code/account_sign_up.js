var win_width=Titanium.Platform.displayCaps.platformWidth;
var gettingBaseUrlFinish=false,downloadSuccessful='success';
var signupURL='/user/signup';
//var numCnt =0;

var account_signupContainer = Titanium.UI.createView({
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
var signupButton = Titanium.UI.createButton({
	title:'Sign up',
	height:60,
	width:win_width,
	color:'red',
	font:{fontSize:48,fontWeight:'bold',fontFamily:'Helvetica Neue'}
});
account_signupContainer.add(baseurlLabel);
account_signupContainer.add(signupButton);




/////////////////////////////////////////////////////////////////////////////////////
//function
/////////////////////////////////////////////////////////////////////////////////////
function ConnectServerSignUp(){
	//request:signupURL
	//body:username=%@&password=%@&email=%@&mood=%@&nickname=%@&language=%@&app=speedradar
	
	//var bodyStr='username=rannisu@wildmindcorp.com&password=speedradar123&email=rannisu@wildmindcorp.com&mood=soso&nickname=ran&language=tw&app=speedradar';
	//var bodyStr='username=ran123'+encodeURIComponent('@')+'gmail.com&password=speedradar123&email=ran123'+encodeURIComponent('@')+'gmail.com&mood=&nickname=test&language=en&app=speedradar';
	var bodyStr='username=rannisu@wildmindcorp.com&password=speedradar123&email=rannisu@wildmindcorp.com&mood=&nickname=test&language=en&app=speedradar';
	if(Titanium.Platform.osname == 'android'){
		bodyStr='username=ran123@gmail.com&password=sr123&email=ran123@gmail.com&mood=&nickname=test&language=en&app=speedradar';
	}
	
	//bodyStr=bodyStr.replace('gmail',encodeURIComponent('@'));
	Ti.API.info(bodyStr);
	
	
	var userInfo='username=rannisu@wildmindcorp.com&password=speedradar123&app=speedradar&udid=5BF6E101-3CDE-5882-8947-38E1E8B9BFB4&language=en';
	if(Titanium.Platform.osname == 'android'){
		userInfo='username=ran123@gmail.com&password=sr123&app=speedradar&udid=android&language=en';
	} 
		
			
	
	HttpClientObj = Titanium.Network.createHTTPClient();
	HttpClientObj.onload = function() {
		try{
			var results = this.responseText;
			var msg2show=downloadSuccessful+'\n\n\n'+results;
			var errorReason;
			
			if(this.status == 200){
				
				Ti.API.info(results);
				
				errorReason='no error';
				
				Titanium.App.fireEvent("SignUpFinishEvent", {
					message: userInfo
				});
			}else if(this.status == 409){
				errorReason='Username Exist!';
				Ti.API.info(results);
				
				Titanium.App.fireEvent("SignUpFinishEvent", {
					message: userInfo
				});
			}else if(this.status == 404){
				errorReason='Url not found!';
			}else if(this.status == 0){
				errorReason='Can\'t connect!';
			}else if(this.status >= 500){
				errorReason='Time out!';
			}else{
				errorReason='Sign up...Fail...';
			}
			
			
			
			
			Titanium.UI.createAlertDialog({ 
			  	    title:'sign up',
			  	    message: msg2show+' \n\n '+this.status+' \n\n '+errorReason
			  	  }).show() ;
		}catch(exception) {
		    Ti.API.info(exception);
		}
	};
	HttpClientObj.onerror=function() {
		//for android: 
		//409: this.responseText=='Username Exist'
		Ti.API.info('error: '+this.responseText);
	};
	
	HttpClientObj.open("POST",signupURL);
	HttpClientObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
	if (Titanium.Platform.osname != 'android') {
		HttpClientObj.setRequestHeader("Content-Length", bodyStr.length);
	}
	
	//HttpClientObj.send(bodyStr);
	if (Titanium.Platform.osname == 'android') {
		HttpClientObj.send({
			"username": "ran123@gmail.com",
			"password": "sr123",
			"email": "ran123@gmail.com",
			"mood": "",
			"nickname": "test",
			"language": "en",
			"app": "speedradar"
		});
	}else{
		HttpClientObj.send({
			"username": "rannisu@wildmindcorp.com",
			"password": "speedradar123",
			"email": "rannisu@wildmindcorp.com",
			"mood": "",
			"nickname": "test",
			"language": "en",
			"app": "speedradar"
		});
	}
	
	//HttpClientObj.open("GET",signupURL+'?'+bodyStr);
	//HttpClientObj.send();
}


/*
function CheckMemberConflict(){
	var sqlURL='';
	
	HttpClientObj = Titanium.Network.createHTTPClient();
	HttpClientObj.onload = function() {
		try{
			var results = this.responseText;
			var json = JSON.parse(this.responseText);
		    if (!json) { 
		        Titanium.API.info('Error - Null return!'); 
		        return;
		    }
		    var json = json.cats;
		    var pos;
		    for( pos=0; pos < jsoncats.length; pos++){
		        //Ti.API.info(json[pos].cat_name, json[pos].colour_name);
		    }
			
		}catch(exception) {
		    Ti.API.info(exception);
		}
	};
	HttpClientObj.open("GET",sqlURL);
	HttpClientObj.send();
}*/




/////////////////////////////////////////////////////////////////////////////////////
//Event handler
/////////////////////////////////////////////////////////////////////////////////////
Titanium.App.addEventListener('GetBaseurlEvent',function(e){
	gettingBaseUrlFinish=true;
	//downloadSuccessful=e.message;
	if (signupURL == '/user/signup') {
		signupURL = e.message + signupURL;
	}
});

signupButton.addEventListener('click',function(e){
	//Ti.API.info('downloadURL '+downloadSuccessful);
	if(gettingBaseUrlFinish){
		/*
		if(signupURL=='/user/signup'){
			signupURL=account_signupContainer.memberURLStr+signupURL;
			
		}*/
		baseurlLabel.text='';
		
		Ti.API.info('see '+signupURL);
			
			
		//There still has bug(android)...
		//the "409 member exist" exception was catched by android os,titanium can't catch	
		//CheckMemberConflict();	
			
		//sign up process
		ConnectServerSignUp();
		
		
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
