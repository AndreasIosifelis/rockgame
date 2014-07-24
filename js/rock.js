game.rock = function(s, x, y, d){
	
	var _this = this;
	this.rock = $("<img />");
	this.gameScreen = $("#gameScreen");
	
	
	
	
	this.stopAt = function(){
		return y + $("body").width();
	};
		
		
		
	this.gameScreen.append(this.rock);
	
	this.rock.
		attr("src", game.data.rockIcons[game.rand(0, game.data.rockIcons.length-1)]).
		attr("data-hit", false).
		addClass("rock").
		css({
			width: s + "px",
			height: s + "px",
			left: x + "px",
			top: y 
		}).
		animate({
			top: 3000
		},{
			duration:d,
			step:function(now){
				var pcols = _this.rock.collision($(".player-box")[0]),
					bcols = _this.rock.collision($(".bullet")),
					hit = _this.rock.attr("data-hit");
				hit = hit === "false" ? false: true;
					
		
				if(pcols.length && !hit){
					game.data.playerScore-=1;
					game.setScore(game.data.playerScore);				
				}
				
				if(bcols.length && !hit){
					var newScore = s - 100;
					game.data.playerScore+=s;
					game.setScore(game.data.playerScore);
					$(bcols[0]).remove();
					_this.rock.
						attr("data-hit", true).
						attr("src", game.data.explotionIcon);
					//_this.rock.remove();
				}
				
				
			},
			complete:function(){
				$(this).remove();
			}
		});	
};