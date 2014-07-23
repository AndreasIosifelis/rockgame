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
		},1000, function(){
			_this.bullet.remove();
		});
};