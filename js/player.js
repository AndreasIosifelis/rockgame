game.player = function(playerName, playerAvatar){

	var _this = this;

	this.gameScreen = $("#gameScreen");
	this.bulletSizeHolder = $("#bulletSizeHolder");
	this.playerNameHolder = $("#playerNameHolder");
	this.playerName = playerName;
	this.playerAvatar = playerAvatar;
	
	this.css = {};
	
	this.playerBox = $("<div />");
	
	this.playerPosition = function(pos){
		return this.playerBox.position()[pos];
	};
	
	this.move = function(x,y){
		this.playerBox.css({
			left:x - 25 + "px",
			top:y - 25 + "px"
		});
	};	
	
	this.playerBox.
			addClass("player-box").
			css(this.css).
			html("<img src='" + this.playerAvatar + "' />");
	
	this.gameScreen.append(this.playerBox);
	this.playerNameHolder.html("Player: " + this.playerName);
	
	$("body").on("mousemove", function(e){
		_this.move(e.pageX, e.pageY);	
		
	}).on("mousewheel", function(e){
		
		var s = game.data.bulletSize,
			md = e.originalEvent.wheelDelta;
		if(md > 0){
			s++;
		} else {
			s--;
		}
		game.data.bulletSize = s > 30 ? 30 : (s < 7 ? 7 : s);
		_this.bulletSizeHolder.html("Bullet size: " + game.data.bulletSize);
	});
	
	
	this.playerBox.on("click", function(e){
		var bs = game.data.bulletSize,
			s = bs,
			x = e.pageX - s / 2 -1,
			y = e.pageY - 35;
		new game.bullet(s, x, y);	
		
	});
};