(function () {
    
    /**
     * @public
     * Towers to fight the baddies
     */
    td.Bullet = function (config) {
        var self = this;
        
        self.context = td.canvas.getContext("2d");
        
        self.x = config.x;
        self.y = config.y;
        
        self.angle    = config.angle;
        self.color    = config.color;
        self.enemies  = config.enemies;
        self.target   = config.target;
        self.velocity = config.velocity;
        self.tower    = config.tower;
    };
    
    td.Bullet.prototype = {
        
        radius: 4,
        
        hasHit: function (enemies) {
            var ret = false, self = this, i, enemy;
            
            for (i in enemies) {
                enemy = enemies[i];
                if (Math.sqrt(Math.pow(self.x - enemy.x, 2) + Math.pow(self.y - enemy.y, 2)) < self.velocity) {
                    enemy.damage(self.tower.attack);
                    return true 
                }
            }
            
            return false;
        },
        
        /**
         * Move in a straight trajectory and check if it hit anything
         * @param {Array} enemies
         */
        move: function (enemies) {
            var self = this,
                context = self.context,
                dx, 
                dy;
            
            // if the target is still around, recompute, otherwise stick with old angle
            if (self.target && !self.target.dead) {
                dx = self.target.x - self.x,
                dy = self.target.y - self.y;
                self.angle = Math.atan2(dy, dx);
            }
            
            self.x += self.velocity * Math.cos(self.angle);
            self.y += self.velocity * Math.sin(self.angle);
            
            context.beginPath();
            context.arc(self.x, self.y, self.radius, Math.PI * 2, 0, true);
            context.closePath();
            context.fillStyle = self.color;
            context.fill();
        }
    };
}());