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
		attr("data-hitb", false).
		attr("data-hitp", false).
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
					hitb = _this.rock.attr("data-hitb"),
					hitp = _this.rock.attr("data-hitp");
				hitb = hitb === "false" ? false: true;
				hitp = hitp === "false" ? false: true;
					
		
				if(pcols.length && !hitp){
					//game.data.playerScore-=game.data[game.data.playerLevel].minusScoreDelta;
					game.data.playerLives-=1;
					_this.rock.
						attr("data-hitp", true);
					$("#livesHolder").html("Lives: " + game.data.playerLives);
					//game.setScore(game.data.playerScore);				
				}
				
				if(bcols.length && !hitb){
					var newScore = s - 100;
					game.data.playerScore+=game.data[game.data.playerLevel].plusScoreDelta;
					game.setScore(game.data.playerScore);
					$(bcols[0]).remove();
					_this.rock.
						attr("data-hitb", true).
						attr("src", game.data.explotionIcon);
					//_this.rock.remove();
				}
				
				
			},
			complete:function(){
				$(this).remove();
			}
		});	
};