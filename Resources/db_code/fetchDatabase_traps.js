var col_str_camera_evaluate='(trap_id,username,evaluate,update_time,download_time)';
//var col_str_deleted_cameras='(id,area,location,latitude,longitude,cam_type,angle,speed,source,country,update_time,reporter,info_completement,salutes,ignores,valid_time,create_time)';
//var col_str_request_history='()';
var svr_col_str_sr_cameras='(id,location,latitude,longitude,cam_type,angle,speed,source,country,update_time,reporter,info_completement,salutes,ignores,valid_time)';
//var response_data_str_sr_cameras=new Array('id','name','latitude','longitude','type','angle','speed','source','country','update_time','reporter','info_completement','salutes','ignores','valid_time');
//var response_data_value_sr_cameras=new Array(response_data_str_sr_cameras.length);

//var col_str_SRMailSample='(type,language,subject,body,reply)';
//var col_str_sr_tracks='()';
//var col_str_user_evaluate='()';
//var col_str_user_info='()';



function fetchDB_traps(dbServerUrlStr){
	this.db = Titanium.Database.open('speedradar_DB');
	this.db.execute('CREATE TABLE IF NOT EXISTS camera_evaluate '+col_str_camera_evaluate);
	this.db.execute();
}

/*
function initDB_sr_cameras_rowData(dbServerUrlStr, row_data){
	/////parse row data:,   than will access db in one time(per all_data)
	for(i=0;i<response_data_str_sr_cameras.length;i++){
		//var strShow=response_data_str_sr_cameras[i];
		var searchStr=' '+response_data_str_sr_cameras[i]+'=\"';
		var indexColStr=row_data.indexOf(searchStr)+searchStr.length;
		response_data_value_sr_cameras[i]=row_data.substring(indexColStr,row_data.indexOf("\"",indexColStr));
		//strShow=strShow+'   :  '+row_data.substring(indexColStr,row_data.indexOf("\"",indexColStr));
		
		//Ti.API.info('ooo  '+response_data_str_sr_cameras[i]+'  : '+response_data_value_sr_cameras[i]);
	}
}*/

//function insertDB_sr_cameras(dbServerUrlStr,dataArray){
function insertDB_sr_cameras(dataArray){
	
	
	//////////////////////////////////////////
	
	this.db = Titanium.Database.open('speedradar_DB');
	this.db.execute('CREATE TABLE IF NOT EXISTS sr_cameras '+svr_col_str_sr_cameras);
	this.db.execute('DELETE FROM sr_cameras');
	
	for(i=0;i<dataArray.length;i++){
		this.db.execute('INSERT INTO sr_cameras '+svr_col_str_sr_cameras+' VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',dataArray[i][0],dataArray[i][1],dataArray[i][2],dataArray[i][3],dataArray[i][4],dataArray[i][5],dataArray[i][6],dataArray[i][7],dataArray[i][8],dataArray[i][9],dataArray[i][10],dataArray[i][11],dataArray[i][12],dataArray[i][13],dataArray[i][14]);
	}
	
	var rows = db.execute('SELECT * FROM sr_cameras');
	Titanium.API.info('ROW COUNT = ' + rows.getRowCount());
	
	while (rows.isValidRow())
	{
		Ti.API.info('(id\t,location\t,latitude\t,longitude\t,cam_type\t,angle\t,speed\t,source\t,country\t,update_time\t,reporter\t,info_completement\t,salutes\t,ignores\t,valid_time)');
		var rowShow='';
		for(i=0;i<rows.fieldCount();i++){
			rowShow=rowShow+' '+rows.field(i);
		}
		Ti.API.info('+++++++++++++++   '+rowShow);
		//Titanium.API.info('ID: ' + rows.field(0) + ' NAME: ' + rows.fieldByName('name') + ' COLUMN NAME ' + rows.fieldName(0));
	
		rows.next();
	}
	rows.close();
	db.close(); // close db when you're done to save resources
}