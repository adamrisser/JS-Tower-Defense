(function () {
    
    var _circle;
    
    td.enemy.Circle = _circle = function (config) {
        var self = this;
        self.context  = td.canvas.getContext("2d");
        self.delay    = config.delay;
        self.game     = config.game;
        self.health   = config.health;
        self.value    = config.value;
        self.velocity = config.velocity;
    };
    
    // Steal common methods
    _circle = td.enemy.Circle.prototype = new td.Enemy();
    
    _circle.checkpoint = 0;
    
    _circle.rotation = 0;
    
    _circle.radius = 10;
    
    _circle.draw = function () {
        var self = this,
            context = self.context,
            piBy2 = Math.PI / 2,
            startAngle = self.rotation + piBy2,
            endAngle   = self.rotation - piBy2;
        
        context.fillStyle = "#c00";
        
        context.beginPath();
        context.arc(self.x, self.y, self.radius, startAngle, endAngle, true);
        context.closePath();
        context.fill();
    };
}());