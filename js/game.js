var game = {};

game.data = {
	bulletSize: 7,
	durations: [1000,2000,3000,4000,5000,6000,7000,8000],
	explotionIcon: "http://tech.no.logi.es/woodshop/booma.gif",
	rockIcons: [
		"http://img2.wikia.nocookie.net/__cb20100528150321/ztreasureisle/images/thumb/d/d1/Hot_Lava_Rock-icon.png/50px-Hot_Lava_Rock-icon.png",
		"http://img4.wikia.nocookie.net/__cb20120924140500/tinymonsters/images/8/84/Quest_icon_stone_debris@2x.png",
		"http://images.uesp.net/9/9f/DB-icon-misc-Heart_Stone.png",
		"http://www.iconarchive.com/download/i2604/anton-gerasimenko/harry-potter/Philosophers-Stone.ico"
	],
	avatars : [{
			link : "http://cache.hackedfreegames.com/uploads/userpics/nJ0ZSQDDR4ULG.jpg",
			label : "Freak"
		}, {
			link : "http://www.javascriptsource.com/img/alien-spacecraft/alien.gif",
			label : "Pumpkin"
		}, {
			link : "http://upload.wikimedia.org/wikipedia/en/thumb/6/66/Falcon_9_Flight_1_mission_emblem.png/50px-Falcon_9_Flight_1_mission_emblem.png",
			label : "Bird"
		}, {
			link : "http://www.sinelabs.com/static/images/icon_rocket.png",
			label : "Cake"
		}, {
			link : "http://fc04.deviantart.net/fs71/f/2013/046/5/2/free_big_rocket_ship_icon_by_countmoopula-d5uzyzo.gif",
			label : "Pizza"
		}
	],
	easy:{
		throwDuration:1500
		
	},
	medium: {
		throwDuration:1000
	},
	expert:{
		throwDuration:500
	},
	playerName: "",
	playerAvatar: "",
	playerScore: 0,
	playerLevel: ""
};

game.setScore = function(score){
	$("#playerScoreHolder").html("Score: " + score);
};

game.loadAvatarToSelect = function(){
	var selectBox = $("#playerAvatar"),
		imgBox = $("#avatarPreview");
	
	$.each(game.data.avatars, function(i, avatar){
		var option = $("<option />");
		option.
			attr("value", avatar.link).
			html(avatar.label);
		selectBox.append(option);
	});
	
	selectBox.on("change", function(){
		imgBox.attr("src", $(this).val());
		$(this).next().next().focus();
	});
};

game.switchScreen = function(){
	$("#loginScreen").toggle();
	$("#gameScreen").toggle();
};

game.rand = function(max, min){
	return Math.floor(Math.random()*(max-min+1)+min);
};

game.rockThrower = function(){
	var s = game.rand(50, 150),
	x = game.rand(s, $("body").width()-s),
	y = - s,
	d = game.data.durations[game.rand(0, game.data.durations.length-1)];

	new game.rock(s, x, y, d);
};

game.scoreChecker = function(){
	if(game.data.playerScore < 0){
		alert("Game Over");
		game.doExit();
	}
};


game.start = function () {
	var _this = this;
	$("#loginForm").on("submit", function(e){
		e.preventDefault();
		
		var playerName = $("#playerName").val(),
			playerAvatar = $("#playerAvatar").val(),
			playerLevel = $("#playerLevel").val();
			
			if(playerName == "" || playerAvatar == ""){
				alert("Please choose an avatar and a nickname and playe");
				return;
			}

		_this.data.playerName = playerName;
		_this.data.playerAvatar = playerAvatar;
		_this.switchScreen();
		_this.setScore(_this.data.playerScore);		
		game.data.playerLevel = playerLevel;
		game.currentPlayer = new game.player(playerName, playerAvatar);
		game.rockThrowerVar = setInterval(game.rockThrower, game.data[playerLevel].throwDuration);
		game.scoreCheckerVar = setInterval(game.scoreChecker, 10);
			
	});
};

game.doExit = function(){
		this.switchScreen();
		this.data.playerName = "";
		this.data.playerAvatar = "";
		this.data.playerScore = 0;
		$("#playerAvatar").val("");
		$("#playerName").val("");
		$("#avatarPreview").attr("src", "");
		$("body").unbind("mousemove");
		$(".player-box").remove();
		$(".rock").remove();
		clearInterval(game.rockThrowerVar);
		clearInterval(game.scoreCheckerVar);
};

game.exit = function(){
	var answer = confirm("Are you sure you want to exit?"); 
	if(answer){
		this.doExit();
	}
};


game.init = function(){
	var _this = this;
	this.loadAvatarToSelect();
	this.start();
	$("#exitGame").on("click", function(e){
		e.preventDefault();
		_this.exit();
	});
	
	// window.onbeforeunload = function () {
		// return "Do you really want to close?";
	// };
	
	//clearInterval(game.rockThrower);
	//clearInterval(game.scoreCheckerVar);
};







