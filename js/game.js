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
	easy:{
		throwDuration:1500,
		minusScoreDelta:1,
		plusScoreDelta:10,
		lives: 5
	},
	medium: {
		throwDuration:1000,
		minusScoreDelta:2,
		plusScoreDelta:9,
		lives:4
	},
	expert:{
		throwDuration:500,
		minusScoreDelta:3,
		plusScoreDelta:8,
		lives:3
	},
	playerName: "",
	playerAvatar: "",
	playerScore: 0,
	playerLevel: "",
	playerLives:0
};

game.setScore = function(score){
	score = score < 0 ? 0 : score;
	$("#playerScoreHolder").html("Score: " + score);
};

game.loadAvatarToSelect = function(){
	var selectBox = $("#playerAvatar"),
		imgBox = $("#avatarPreview");
	
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

game.lifeChecker = function(){
	if(game.data.playerLives === 0){
		alert("Game Over \n Score " + game.data.playerScore);
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
		game.data.playerLives = game.data[game.data.playerLevel].lives;
		$("#livesHolder").html("Lives: " + game.data.playerLives);
		game.currentPlayer = new game.player(playerName, playerAvatar);
		game.rockThrowerVar = setInterval(game.rockThrower, game.data[game.data.playerLevel].throwDuration);
		game.lifeCheckerVar = setInterval(game.lifeChecker, 10);
			
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
		clearInterval(game.lifeCheckerVar);
};

game.exit = function(){
	var answer = confirm("Are you sure you want to exit?"); 
	if(answer){
		this.doExit();
	}
};

game.showHelp = function(){
	$("#helpLink").on("click", function(e){
		e.preventDefault();
		alert("1.Click to fire \n 2.Mouse wheel to change bullet size");
	});
	
};


game.init = function(){
	var _this = this;
	this.loadAvatarToSelect();
	this.start();
	this.showHelp();
	$("#exitGame").on("click", function(e){
		e.preventDefault();
		_this.exit();
	});
};







