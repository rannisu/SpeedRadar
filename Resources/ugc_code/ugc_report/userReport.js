var report_url='/report/post';
 

function userReport_trap(baseURLStr,report_data_body){
	/*
	this.report_returnData='abc';
	var resultData='';
	*/
	if(baseURLStr!=null && report_url=='/report/post'){
		report_url=baseURLStr+report_url;
	}
	
	Ti.API.info('oh '+report_url+'\nthe '+report_data_body);
	
	/*
	//要先有angle,(direction),complete,[NSArray arrayWithObjects:@"type", @"latitude", @"longitude",@"direction" , @"accuracy" , @"cam_type", nil]];
	*/
	HttpClientObj = Titanium.Network.createHTTPClient();
	HttpClientObj.onload = function() {
		try{
			//report_returnData = this.responseText;
			Ti.API.info(this.status);
			Ti.API.info(this.responseText);
		}catch(exception) {
		    Ti.API.info(exception);
		}
	};
	HttpClientObj.onerror=function() {
		//for android: 
		//409: this.responseText=='Duplicate entry'
		Ti.API.info('error: '+this.responseText);
	};
	HttpClientObj.open("POST",report_url);
	HttpClientObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
	if (Titanium.Platform.osname != 'android') {
		HttpClientObj.setRequestHeader("Content-Length", report_data_body.length);
	}
	HttpClientObj.send(report_data_body);
	
}
