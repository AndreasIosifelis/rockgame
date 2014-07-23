game.rock = function(s, x, y, d){
	
	var _this = this;
	this.rock = $("<img />");
	this.gameScreen = $("#gameScreen");
	
	
	
	
	this.stopAt = function(){
		return y + $("body").width();
	};
		
		
		
	this.gameScreen.append(this.rock);
	
	this.rock.
		attr("src", game.data.rockIcon).
		addClass("rock").
		css({
			width: s + "px",
			height: s + "px",
			left: x + "px",
			top: y 
		}).animate({
			top: _this.stopAt()
		},d, function(){
			_this.rock.remove();
		});
		
	
	
	
};