(function () {
    
    /**
     * @public
     * Towers to fight the baddies
     */
    td.Laser = function (config) {
        var self = this;
        
        self.context = td.canvas.getContext("2d");
        
        self.x = config.x;
        self.y = config.y;
        
        self.angle    = config.angle;
        self.enemies  = config.enemies;
        self.target   = config.target;
        self.velocity = config.velocity;
        self.tower    = config.tower;
        
        self.frame = 0;
        self.hasHit();
    };
    
    td.Laser.prototype = {
        
        radius: 4,
        
        hasHit: function () {
            var self = this,
                enemy = self.target;
            
            if (!enemy.dead) {
                enemy.damage(self.tower.attack);
                return true 
            }
            
            return false;
        },
        
        /**
         * Move in a straight trajectory and check if it hit anything
         * @param {Array} enemies
         */
        move: function () {
            var self = this,
                context = self.context;
            
            self.frame++;
            
            context.beginPath();
           
            context.moveTo(self.x, self.y);
            context.strokeStyle = 'rgba(255, 0, 0, ' + (1.0 - (self.frame * .05)) + ')';
            context.lineWidth = 1;
            context.lineTo(self.target.x, self.target.y);
            
            context.stroke();
        }
    };
}());