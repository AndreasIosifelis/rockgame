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
		attr("data-hit", false).
		addClass("rock").
		css({
			width: s + "px",
			height: s + "px",
			left: x + "px",
			top: y 
		}).
		animate({
			top: _this.stopAt()
		},{
			duration:d,
			step:function(now){
			var cols = _this.rock.collision($(".player-box")[0]);
		
				if(cols.length){
					game.data.playerScore--;
					game.setScore(game.data.playerScore);
				}
			},
			complete:function(){
				$(this).remove();
			}
		});	
};