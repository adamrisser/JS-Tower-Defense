(function () {
    
    var _square;
    
    /**
     * @public
     * Bad guys!
     */
    td.enemy.Square = _square = function (config) {
        var self = this;
        
        self.context  = td.canvas.getContext("2d");
        self.delay    = config.delay;
        self.game    = config.game;
        self.health   = config.health;
        self.value    = config.value;
        self.velocity = config.velocity;
    };
    
    // Steal common methods
    _square.prototype = new td.Enemy();
    
    _square.prototype.h = 20;
    _square.prototype.w = 20;
    
    _square.prototype.draw = function () {
        var context = this.context;
        // Subtract half the width (and height) from the coords so the
        // enemy is centered on the position
        context.fillStyle = "#00c";
        context.fillRect(this.x- (this.w / 2), this.y - (this.h / 2), this.w, this.h);
    };
}());