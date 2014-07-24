game.bullet = function(s,x,y){
	
	var _this = this;
	
	this.bullet = $("<div />");
	
	this.stopAt = function(){
		return y + $("body").width();
	};
	
	$("#gameScreen").append(this.bullet);
	
	this.bullet.
		css({
			left: x,
			top: y,
			width: s + "px",
			height: s + "px"
		}).
		addClass("bullet").
		animate({
			top: - _this.stopAt() + "px"
		}, {
			duration:1200,
			step:function(now, tween){				
				var rocks = $(".rock"),
					bullet = $(this),			
					cols = bullet.collision(rocks);
				
				if(cols.length){
					var rock = $(cols[0]),
						hit = rock.attr("data-hit");
					if(hit == "false"){
						rock.
							attr("src", game.data.explotionIcon).
							attr("data-hit", true);
						bullet.remove();
						game.data.playerScore++;
						game.setScore(game.data.playerScore);
					}					
					
				}
			
			
			},
			complete: function(){
				$(this).remove();
			}
		});
};