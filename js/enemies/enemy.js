(function () {
    
    /**
     * @public
     * Parent class for bad guys! All
     */
    td.Enemy = function () {
        this.context = td.canvas.getContext("2d");
    };

    td.Enemy.prototype = {
        
        checkpoint: 0,
        
        dead: false,
        
        health: 10,
        
        rotation: 0,
        
        value: 10,
        
        velocity: 5,
        
        x: 50,
        
        y: 0,
        
        damage: function (amt) {
            this.health -= amt;
        },
        
        die: function () {
            var self = this;
            self.dead = true;
            td.Player.money += self.value;
            game.updateMoney();
        },
        
        draw: function () {
            // override when extended
        },
        
        follow: function (path) {
            var self = this;
            
            if (self.checkpoint < path.length) {
                
                var checkpointCoords = path[self.checkpoint],
                    dx = checkpointCoords.x - self.x,
                    dy = checkpointCoords.y - self.y,
                    angle = Math.atan2(dy, dx);
                
                if (Math.abs(dx) + Math.abs(dy) < self.velocity) {
                    self.checkpoint += 1;
                }
                
                self.x += self.velocity * Math.cos(angle);
                self.y += self.velocity * Math.sin(angle);
                self.rotation = angle;
                self.draw();
            }
        }
    };
}());