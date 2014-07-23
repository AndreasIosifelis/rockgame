var game = {};

game.data = {
	bulletSize: 7,
	durations: [1000,2000,3000,4000,5000,6000,7000,8000],
	explotionIcon: "http://tech.no.logi.es/woodshop/booma.gif",
	rockIcon: "http://img2.wikia.nocookie.net/__cb20100528150321/ztreasureisle/images/thumb/d/d1/Hot_Lava_Rock-icon.png/50px-Hot_Lava_Rock-icon.png",
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
	playerName: "",
	playerAvatar: "",
	playerScore: 0
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


game.bulletWidthCollition = function(){
	var bullets = $(".bullet"),
		rocks = $(".rock");
		
		$.each(bullets, function(b, bullet){
			var by = $(bullet).position().top;			
			 $.each(rocks, function(r, rock){
				var ry = $(rock).position().top;
				if(ry === by){
					console.log("collition");
				}
			 });
			
		});
};

game.start = function () {
	var _this = this;
	$("#loginForm").on("submit", function(e){
		e.preventDefault();
		
		var playerName = $("#playerName").val(),
			playerAvatar = $("#playerAvatar").val();
			
			if(playerName == "" || playerAvatar == ""){
				alert("Please choose an avatar and a nickname");
				return;
			}

		_this.data.playerName = playerName;
		_this.data.playerAvatar = playerAvatar;
		_this.switchScreen();
		_this.setScore(_this.data.playerScore);		
		
		game.currentPlayer = new game.player(playerName, playerAvatar);
		game.intervalRockVar = setInterval(game.rockThrower, 2000);
		//game.intetvalBulletWidthCollition = setInterval(game.bulletWidthCollition,10);
		game.rockThrower;
		game.bulletWidthCollition();
			
	});
};
game.exit = function(){
	var answer = confirm("Are you sure you want to exit?"); 
	if(answer){
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
		clearInterval(game.intervalRockVar);
		//clearInterval(game.intetvalBulletWidthCollition);
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
	
	clearInterval(game.rockThrower);
	
};







