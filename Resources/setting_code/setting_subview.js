var fileMute = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'sounds/avoid_delay_sound.mp3');
var file1 = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'sounds/beep_alert/alert1.mp3');
var file2 = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'sounds/beep_alert/dingLing.mp3');
var file3 = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'sounds/people_alert/A-BOY.mp3');
var file4 = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'sounds/people_alert/A.mp3');

var sound = new Array(5);
sound[0]= Titanium.Media.createSound({url:fileMute.nativePath});
sound[1]= Titanium.Media.createSound({url:file1.nativePath});
sound[2] = Titanium.Media.createSound({url:file2.nativePath});
sound[3] = Titanium.Media.createSound({url:file3.nativePath});
sound[4] = Titanium.Media.createSound({url:file4.nativePath});

//to avoid the first time delay!
sound[0].play();

function setting_subview_model(setting_model_num,setting_model_distance_min){
	this.setting_num=setting_model_num;
	this.setting_distance_min=setting_model_distance_min;
	this.setting_title=(this.setting_num==1)?'First Warning':'Second Warning';
	var setting_property_distance=(this.setting_num==1)?'FirstWarning_Distance':'SecondWarning_Distance';
	var setting_property_sound=(this.setting_num==1)?'FirstWarning_Sound':'SecondWarning_Sound';
	
	this.win_width=Titanium.Platform.displayCaps.platformWidth;
	this.win_height=Titanium.Platform.displayCaps.platformHeight;
	//this.win_width=300;

	this.setting_viewContainer = Titanium.UI.createView({
		left:10,
		top:0,
		width:this.win_width-20,
		height:this.win_height*(1/4)
	});
	this.setting_label = Titanium.UI.createLabel({
		left:0,
		top:0,
		width:this.setting_viewContainer.width*(2/3),
		height:this.setting_viewContainer.height*(1/3),
		color:'#0f0',
		text:this.setting_title,
		font:{fontSize:20,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'left'
	});
	var setting_distance_label = Titanium.UI.createLabel({
		left:this.setting_label.left+this.setting_label.width,
		top:0,
		width:this.setting_viewContainer.width*(1/3),
		height:this.setting_viewContainer.height*(1/3),
		color:'#fff',
		text:parseInt(this.setting_distance_min,10)+200+' meters',//default text
		font:{fontSize:18,fontFamily:'Helvetica Neue'},
		textAlign:'right'
	});
	this.setting_viewContainer.add(this.setting_label);
	this.setting_viewContainer.add(setting_distance_label);
	
	
	//Alert distance
	var setting_slider_label = Titanium.UI.createLabel({
		left:0,
		top:this.setting_viewContainer.height*(1/3),
		width:this.setting_viewContainer.width*(1/6),
		height:this.setting_viewContainer.height*(4/15),
		color:'#fff',
		text:'Meter:',
		font:{fontSize:16,fontFamily:'Helvetica Neue'},
		textAlign:'left'
	});
	this.setting_viewContainer.add(setting_slider_label);
	
	var WarningSlider = Ti.UI.createSlider({
	  left: setting_slider_label.left+setting_slider_label.width,
	  top: this.setting_viewContainer.height*(1/3),
	  width: this.setting_viewContainer.width*(5/6),
	  height: this.setting_viewContainer.height*(4/15),
	  min: parseInt(this.setting_distance_min,10),
	  max: parseInt(this.setting_distance_min,10)+400,
	  value:  ((Ti.App.Properties.hasProperty(setting_property_distance)) ? Ti.App.Properties.getString(setting_property_distance)  : parseInt(this.setting_distance_min,10)+200 ),
	  enabled: true
	});
	this.setting_viewContainer.add(WarningSlider);
	
		
	WarningSlider.addEventListener('change',function(e) {
		setting_distance_label.text = Math.round(WarningSlider.value/100)*100;
		Titanium.App.Properties.setString(setting_property_distance ,  Math.round(WarningSlider.value/100)*100 );
	});
	
	
	//Alert sounds
	this.setting_sound_label = Titanium.UI.createLabel({
		left:0,
		top:this.setting_viewContainer.height*(2/3)+5,
		width:this.setting_viewContainer.width*(1/6),
		height:this.setting_viewContainer.height*(2/5),
		color:'#fff',
		text:'Sound:',
		font:{fontSize:15,fontFamily:'Helvetica Neue'},
		textAlign:'left'
	});
	this.setting_viewContainer.add(this.setting_sound_label);
	
	var setting_tabbedBar_array = new Array(5);
	for(i=0;i<5;i++){
		var soundProperty=(Ti.App.Properties.hasProperty(setting_property_sound)) ? Ti.App.Properties.getInt(setting_property_sound):2;
		
		var textTitle=(i==0)?'Mute':i;
		var label_color=(i==soundProperty)?'#007EE0':'#CDCDCD';
		var text_color=(i==soundProperty)?'#fff':'#777777';
		
		setting_tabbedBar_array[i]= Titanium.UI.createLabel({
			top: this.setting_viewContainer.height*(2/3),
			left: this.setting_sound_label.width+this.setting_viewContainer.width*(i/6),
			width: this.setting_viewContainer.width*(1/6),//  *(5/6)*(1/5)=*(1/6)
			height: this.setting_viewContainer.height*(2/5),
			backgroundColor:label_color,
			color:text_color,
			text:textTitle,
			font:{fontSize:18,fontFamily:'Helvetica Neue',fontWeight:'bold'},
			textAlign:'center'
		});
		var tab_line =Titanium.UI.createView({
			top:this.setting_viewContainer.height*(2/3),
			left:this.setting_sound_label.width+this.setting_viewContainer.width*(i/6),
			width:1,
			height:this.setting_viewContainer.height*(2/5),
			backgroundColor:'#777777'
		});
		this.setting_viewContainer.add(setting_tabbedBar_array[i]);
		this.setting_viewContainer.add(tab_line);
	}
	setting_tabbedBar_array[0].addEventListener('click', function(e){
		//Ti.API.info(  this.setting_title+' clicked index = ' + 0 ) ;
		for(i=0;i<5;i++){
			setting_tabbedBar_array[i].color='#777777';
			setting_tabbedBar_array[i].backgroundColor='#CDCDCD';
		} 
		setting_tabbedBar_array[0].color='#fff';
		setting_tabbedBar_array[0].backgroundColor='#007EE0';
		
		for (i = 0; i < 5; i++) {
			if (sound[i].isPlaying()){
				sound[i].stop();
				sound[i].reset();
			} 
		}
		Titanium.App.Properties.setInt(setting_property_sound ,  0 );
	});
	setting_tabbedBar_array[1].addEventListener('click', function(e){
		//Ti.API.info(  this.setting_title+' clicked index = ' + 1 ) ;
		for(i=0;i<5;i++){
			setting_tabbedBar_array[i].color='#777777';
			setting_tabbedBar_array[i].backgroundColor='#CDCDCD';
		} 
		setting_tabbedBar_array[1].color='#fff';
		setting_tabbedBar_array[1].backgroundColor='#007EE0';
		
		for (i = 0; i < 5; i++) {
			if (sound[i].isPlaying()){
				sound[i].stop();
			} 
		}
		if (Titanium.Platform.name == 'android') {
			sound[1].reset();
		}
		sound[1].play();
		Titanium.App.Properties.setInt(setting_property_sound ,  1 );
	});
	setting_tabbedBar_array[2].addEventListener('click', function(e){
		//Ti.API.info(  this.setting_title+' clicked index = ' + 2 ) ;
		for(i=0;i<5;i++){
			setting_tabbedBar_array[i].color='#777777';
			setting_tabbedBar_array[i].backgroundColor='#CDCDCD';
		} 
		setting_tabbedBar_array[2].color='#fff';
		setting_tabbedBar_array[2].backgroundColor='#007EE0';
		
		for (i = 0; i < 5; i++) {
			if (sound[i].isPlaying()){
				sound[i].stop();
			} 
		}
		if (Titanium.Platform.name == 'android') {
			sound[2].reset();
		}
		sound[2].play();
		Titanium.App.Properties.setInt(setting_property_sound ,  2 );
	});
	setting_tabbedBar_array[3].addEventListener('click', function(e){
		//Ti.API.info(  this.setting_title+' clicked index = ' + 3 ) ;
		for(i=0;i<5;i++){
			setting_tabbedBar_array[i].color='#777777';
			setting_tabbedBar_array[i].backgroundColor='#CDCDCD';
		} 
		setting_tabbedBar_array[3].color='#fff';
		setting_tabbedBar_array[3].backgroundColor='#007EE0';
		
		for (i = 0; i < 5; i++) {
			if (sound[i].isPlaying()){
				sound[i].stop();
			} 
		}
		if (Titanium.Platform.name == 'android') {
			sound[3].reset();
		}
		sound[3].play();
		Titanium.App.Properties.setInt(setting_property_sound ,  3 );
	});
	setting_tabbedBar_array[4].addEventListener('click', function(e){
		//Ti.API.info(  this.setting_title+' clicked index = ' + 4 ) ;
		for(i=0;i<5;i++){
			setting_tabbedBar_array[i].color='#777777';
			setting_tabbedBar_array[i].backgroundColor='#CDCDCD';
		} 
		setting_tabbedBar_array[4].color='#fff';
		setting_tabbedBar_array[4].backgroundColor='#007EE0';
		
		for (i = 0; i < 5; i++) {
			if (sound[i].isPlaying()){
				sound[i].stop();
			} 
		}
		if (Titanium.Platform.name == 'android') {
			sound[4].reset();
		}
		sound[4].play();
		Titanium.App.Properties.setInt(setting_property_sound ,  4 );
	});
	/*
	if (Titanium.Platform.name == 'iPhone OS'){ 
	
		this.setting_sound_TabbedBar = Ti.UI.createTabbedBar({
			  labels:['Mute', '1', '2' , '3' , '4'],
			  top: this.setting_viewContainer.height*(2/3)+5,
			  left: this.setting_sound_label.width,
			  width: this.setting_viewContainer.width*(5/6),
			  height: this.setting_viewContainer.height*(1/3)-10,
			//  style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
			  index:2
			});
		
		this.setting_sound_TabbedBar.addEventListener('click', function(e)
				{
					Ti.API.info(  this.setting_title+' clicked index = ' + e.index ) ;
				});
		this.setting_viewContainer.add(this.setting_sound_TabbedBar);
		
	}else if(Titanium.Platform.name == 'android'){
		
		this.setting_sound_TabbedBar = Ti.UI.createTabbedBar({
			  labels:['Mute', '1', '2' , '3' , '4'],
			  top: this.setting_viewContainer.height*(1/3),
			  left: 0,
			  width: this.setting_viewContainer.width,
			  height: this.setting_viewContainer.height*(1/3),
			//  style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
			  index:2
			});
		
		setting_sound_TabbedBar.addEventListener('click', function(e)
				{
					Ti.API.info(  this.setting_title+' clicked index = ' + e.index ) ;
				});
		this.setting_viewContainer.add(this.setting_sound_TabbedBar);
		
	}*/
};

	

