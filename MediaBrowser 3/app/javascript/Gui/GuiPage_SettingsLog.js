var GuiPage_SettingsLog = {
		logArray : null,
		selectedBannerItem : 0,
		topLeftItem : 0,
		
		MAXCOLUMNCOUNT : 1,
		MAXROWCOUNT : 20,
		
		bannerItems : ["User Settings","Server Settings","TV Settings","Log"],
}

GuiPage_SettingsLog.getMaxDisplay = function() {
	return this.MAXCOLUMNCOUNT * this.MAXROWCOUNT;
}

GuiPage_SettingsLog.start = function() {	
	//Reset Vars
	this.selectedBannerItem = 3; //match Logs
	
	//Load Data
	this.logArray = FileLog.loadFile(true);  
	this.topLeftItem = this.logArray.length - GuiPage_SettingsLog.getMaxDisplay();
	this.topLeftItem = (this.topLeftItem < 0) ? 0 : this.topLeftItem;
	
	//Load Settings
	document.getElementById("pageContent").className = "";
	document.getElementById("pageContent").innerHTML = "<div id=bannerSelection class='guiDisplay_Series-Banner'></div><div id='guiTV_Show_Title' class='guiPage_Settings_Title'>Log</div>\ \
		<div id='guiPage_Settings_Settings' class='guiPage_Settings_Settings'></div>" +
		"<div id='guiPage_Settings_Overview' class='guiPage_Settings_Overview'>" +
			"<div id=guiPage_Settings_Overview_Title></div>" +
			"<div id=guiPage_Settings_Overview_Content></div>" +
		"</div>";
	
	//Create Banner Items
	for (var index = 0; index < this.bannerItems.length; index++) {
		if (index != this.bannerItems.length-1) {
			document.getElementById("bannerSelection").innerHTML += "<div id='bannerItem" + index + "' class='guiDisplay_Series-BannerItem guiDisplay_Series-BannerItemPadding'>"+this.bannerItems[index].replace(/-/g, ' ').toUpperCase()+"</div>";			
		} else {
			document.getElementById("bannerSelection").innerHTML += "<div id='bannerItem" + index + "' class='guiDisplay_Series-BannerItem'>"+this.bannerItems[index].replace(/-/g, ' ').toUpperCase()+"</div>";					
		}
	}
	
	//Update Displayed
	this.setText();
	this.updateDisplayedItems();
	this.updateSelectedBannerItems();
	document.getElementById("GuiPage_SettingsLog").focus();
}

GuiPage_SettingsLog.updateDisplayedItems = function() {
	var htmlToAdd = "<table class=guiSettingsTable>";
	for (var index = this.topLeftItem; index < Math.min(this.topLeftItem + this.getMaxDisplay(),this.logArray.length); index++) {
		htmlToAdd += "<tr class=guiSettingsRow><td>"+(index+1)+"</td><td>" + this.logArray[index] + "</td></tr>";
	}
	document.getElementById("guiPage_Settings_Settings").innerHTML = htmlToAdd + "</table>";
}

GuiPage_SettingsLog.updateSelectedBannerItems = function() {
	for (var index = 0; index < this.bannerItems.length; index++) {
		if (index == this.selectedBannerItem) {
			if (index != this.bannerItems.length-1) {
				document.getElementById("bannerItem"+index).className = "guiDisplay_Series-BannerItem guiDisplay_Series-BannerItemPadding red";
			} else {
				document.getElementById("bannerItem"+index).className = "guiDisplay_Series-BannerItem red";
			}		
		} else {
			if (index != this.bannerItems.length-1) {
				document.getElementById("bannerItem"+index).className = "guiDisplay_Series-BannerItem guiDisplay_Series-BannerItemPadding";
			} else {
				document.getElementById("bannerItem"+index).className = "guiDisplay_Series-BannerItem";
			}
		}
	}
	document.getElementById("Counter").innerHTML = (this.selectedBannerItem + 1) + "/" + (this.bannerItems.length);
}

GuiPage_SettingsLog.keyDown = function() {
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	if (document.getElementById("Notifications").style.visibility == "") {
		document.getElementById("Notifications").style.visibility = "hidden";
		document.getElementById("NotificationText").innerHTML = "";
		
		//Change keycode so it does nothing!
		keyCode = "VOID";
	}
	
	//Update Screensaver Timer
	Support.screensaver();
	
	//If screensaver is running 
	if (Main.getIsScreensaverRunning()) {
		//Update Main.js isScreensaverRunning - Sets to True
		Main.setIsScreensaverRunning();
		
		//End Screensaver
		GuiImagePlayer_Screensaver.stopScreensaver();
		
		//Change keycode so it does nothing!
		keyCode = "VOID";
	}
	
	switch(keyCode) {
		//Need Logout Key
		case tvKey.KEY_UP:	
			this.processUpKey();
			break;
		case tvKey.KEY_DOWN:	
			this.processDownKey();
			break;	
		case tvKey.KEY_LEFT:
			this.processLeftKey();
			break;
		case tvKey.KEY_RIGHT:
			this.processRightKey();
			break;	
		case tvKey.KEY_RETURN:
			widgetAPI.blockNavigation(event);
			Support.processReturnURLHistory();
			break;	
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			this.processSelectedItem();
			break;
		case tvKey.KEY_RED:
			FileLog.empty();
			FileLog.write("---------------------------------------------------------------------")
			FileLog.write("Log File Emptied by User")
			GuiPage_SettingsLog.start(); //relead
			break;
		case tvKey.KEY_YELLOW:	
			//Favourites - Not needed on this page!
			break;	
		case tvKey.KEY_BLUE:	
			GuiMusicPlayer.showMusicPlayer("GuiPage_Music");
			break;		
		case tvKey.KEY_TOOLS:
			widgetAPI.blockNavigation(event);
			GuiMainMenu.requested("GuiPage_SettingsLog",null);
			break;	
		case tvKey.KEY_INFO:
			GuiHelper.toggleHelp("GuiPage_SettingsLog");
			break;
		case tvKey.KEY_EXIT:
			widgetAPI.sendExitEvent(); 
			break;
	}
}

GuiPage_SettingsLog.processUpKey = function() {
	this.topLeftItem = this.topLeftItem - this.MAXCOLUMNCOUNT;
	if (this.topLeftItem == -1) {
		this.topLeftItem = 0;
	} else {
		this.updateDisplayedItems();
	}	
}

GuiPage_SettingsLog.processDownKey = function() {
	this.topLeftItem = this.topLeftItem + this.MAXCOLUMNCOUNT;
	if (this.topLeftItem > this.logArray.length - this.getMaxDisplay()) {
		this.topLeftItem = this.topLeftItem - this.MAXCOLUMNCOUNT;
	} else {
		this.updateDisplayedItems();
	}
}

GuiPage_SettingsLog.processLeftKey = function() {
	this.selectedBannerItem--;
	if (this.selectedBannerItem < 0) {
		this.selectedBannerItem = 0;
	} else {
		this.updateSelectedBannerItems();	
	}	
}

GuiPage_SettingsLog.processRightKey = function() {
	this.selectedBannerItem++;
	if (this.selectedBannerItem >= this.bannerItems.length) {
		this.selectedBannerItem--;
	} else {
		this.updateSelectedBannerItems();	
	}
}

GuiPage_SettingsLog.processSelectedItem = function() {
	if (this.bannerItems[this.selectedBannerItem] != "Logs") {
		GuiPage_Settings.start(this.bannerItems[this.selectedBannerItem]);
	}
}

GuiPage_SettingsLog.setText = function() {
	document.getElementById("guiPage_Settings_Overview_Title").innerHTML = "Log Viewer";
	document.getElementById("guiPage_Settings_Overview_Content").innerHTML = "Press the up arrow to navigate to earlier entries in the log, and down to view later entries. The log opens at the last items in the log. <br><br> Press the red button to clear the log.";
}

