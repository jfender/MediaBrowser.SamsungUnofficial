var GuiPage_Contributors = {
		MainDevs : ["ChessDragon136"],
		ContribDevs : ["Cragjagged","DrWatson","im85288"],
		DonateSupport : ["c0m3r","Cbers","crashkelly","DaN","FrostByte","gbone8106","ginganinja","grimfandango","SamES"]
}

GuiPage_Contributors.start = function() {
	document.getElementById("pageContent").innerHTML = "<div class='EpisodesSeriesInfo'>Contributors</div><div id=Content style='font-size:14px;' class='guiPage_Settings_Settings'></div>";
	
	var htmlToAdd = "<span style='font-size:16px;'>Main Developers</span><table><tr class='guiSettingsRow'>";
	for (var index = 0; index < this.MainDevs.length; index++) {
		if (index % 4 == 0) {
			htmlToAdd += "<tr class='guiSettingsRow'>";
		}
		htmlToAdd += "<td class='guiSettingsTD'>" + this.MainDevs[index] + "</td>";
		if (index+1 % 4 == 0) {
			htmlToAdd += "</tr>";
		}
	}
	htmlToAdd += "</tr></table><br><br><br>";
	htmlToAdd += "<span style='font-size:16px;'>Contributing Developers</span><table><tr class='guiSettingsRow'>";
	for (var index = 0; index < this.ContribDevs.length; index++) {
		if (index % 4 == 0) {
			htmlToAdd += "<tr class='guiSettingsRow'>";
		}
		htmlToAdd += "<td class='guiSettingsTD'>" + this.ContribDevs[index] + "</td>";
		if (index+1 % 4 == 0) {
			htmlToAdd += "</tr>";
		}
	}
	htmlToAdd += "</tr></table><br><br><br>";
	htmlToAdd += "<span style='font-size:16px;'>Donators & Supporters</span><table><tr class='guiSettingsRow'>";
	for (var index = 0; index < this.DonateSupport.length; index++) {
		if (index % 4 == 0) {
			htmlToAdd += "<tr class='guiSettingsRow'>";
		}
		htmlToAdd += "<td class='guiSettingsTD'>" + this.DonateSupport[index] + "</td>";
		if (index+1 % 4 == 0) {
			htmlToAdd += "</tr>";
		}
	}
	
	document.getElementById("Content").innerHTML = htmlToAdd + "</tr></table>";
	
	//Set Focus for Key Events
	document.getElementById("GuiPage_Contributors").focus();
}


GuiPage_Contributors.keyDown = function() {
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
		case tvKey.KEY_RETURN:
			alert("RETURN");
			widgetAPI.blockNavigation(event);
			Support.processReturnURLHistory();
			break;	
		case tvKey.KEY_BLUE:	
			GuiMusicPlayer.showMusicPlayer("GuiPage_Contributors");
			break;	
		case tvKey.KEY_TOOLS:
			alert ("TOOLS KEY");
			widgetAPI.blockNavigation(event);
			Support.updateURLHistory("GuiPage_Contributors",null,null,null,null,null,null,null);
			GuiMainMenu.requested("GuiPage_Contributors",null);
			break;	
		case tvKey.KEY_EXIT:
			alert ("EXIT KEY");
			widgetAPI.sendExitEvent(); 
			break;
	}
}