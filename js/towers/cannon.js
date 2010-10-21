(function () {
     
    var _getDistance = function (obj1, obj2) {
        var dx = Math.abs(obj1.x - obj2.x),
            dy = Math.abs(obj1.y - obj2.y);
            
        return Math.sqrt((dx*dx) + (dy*dy));
    },
        
    _findFarthestTarget = function (tower, enemies, track) {
        var farthest = 100000000000,
            target = null,
            nextCheckpoint,
            targetCheckpoint = 0,
            enemy,
            enemyDistance;
        
        // Find enemy that is farthest along the path in range
        for (var i = 0; i < enemies.length; i+=1) {
            enemy = enemies[i];
            
            enemyToTowerDistance = _getDistance(tower, enemy);
            enemyToCheckpointDistance = _getDistance(track.path[enemy.checkpoint], enemy);
            
            inRange = enemyToTowerDistance < tower.range;
            
            // if closest is not set or new distance is smaller than 
            // previous distance
            if (inRange && enemy.checkpoint >= targetCheckpoint && enemyToCheckpointDistance < farthest) {
                farthest = enemyToCheckpointDistance;
                target = enemies[i];
                targetCheckpoint = target.checkpoint;
            }
        }

        return target;
    }
    
    /**
     * @public
     * Towers to fight the baddies
     */
    td.Cannon = function (config) {
        var self = this;
        
        self.context = td.canvas.getContext("2d");
        
        self.x = config.x + self.width / 2;
        self.y = config.y + self.height / 2;
        
        self.attack   = config.attack;
        self.fireRate = config.fireRate;
        self.price    = config.price;
        self.range    = config.range;
        self.velocity = config.velocity;
        self.placed   = false;
        
        self.img = new Image();
        self.img.src = 'img/towers/cannon2.png';
        
        self.laser = null;
    };
    
    td.Cannon.prototype = {
        
        angle: 0,
        
        fireTimer: 0,
        
        selected: false,
        
        height: 70,
        
        width: 70,
        
        /**
         * Aim the turrent at the minion that is farthest down the path
         * @public
         */
        aim: function (enemies, track, game) {
            
            var self = this,
                context = self.context,
                target = _findFarthestTarget(self, enemies, track),
                dx,
                dy,
                width = 87,
                height = 35;
            
            // fire at target if available
            if (target) {
                dx = target.x - self.x;
                dy = target.y - self.y;
                self.angle = Math.atan2(dy, dx);
                
                // we have a target, let him have it!
                self.fire(enemies, game, target);
            }
            
           // Start drawings turrent
            context.save();
            
            // Position turrent in the center of the tower body
            context.translate(self.x, self.y);
            
            // Rotate to face the enemy!
            context.rotate(self.angle);
            
            // Fix the area we are rotating around
            context.translate(0, 0);
            
            context.drawImage(self.img,
                              0,
                              0,
                              width,
                              height,
                              0 - (width/2) + 20,
                              0 - (height/2),
                              width,
                              height);
            
            context.restore();
        },
        
        /**
         * Draw the tower
         * @public
         */
        draw: function () {
            var self = this,
                context = self.context,
                startAngle = Math.PI * 2,
                endAngle = 0,
                width  = 70,
                height = 70;
            
            context.drawImage(self.img,
                              0,
                              35,
                              width,
                              height,
                              (self.x - width/2),
                              (self.y - height/2),
                              width,
                              height);
            
            // Show range circle if placing tower or it is selected
            if (!self.placed) {
                
                context.save();
                
                context.fillStyle = "rgba(0, 0, 200, 0.4)";
                context.beginPath();
                context.arc(self.x, self.y, self.range, startAngle, endAngle, true);
                context.closePath();
                
                context.lineWidth = 0;
                context.strokeStyle = "rgba(0, 0, 0, 0.9)";
                context.stroke();
                context.fill();
                
                context.restore();
            }
            else {
                
                //TODO: move this somewhere that makes sense
                // if laser has disappeared, remove it
                if (self.laser && self.laser.frame > 20) {
                    self.laser = null;
                }
                // if we still have a laser, then call its move function so it fades out
                else if (self.laser) {
                    self.laser.move();
                }      
            }
            
            this.fireTimer -= 1;
        },
        
        /**
         * Fire a bulllet if able 
         */
        fire: function (enemies, game, target) {
            var self = this, 
                bullet;
            
            if (self.fireTimer <= 0 && self.placed) {
                self.fireTimer = self.fireRate;
                
                self.laser = new td.Laser({
                    x: self.x,
                    y: self.y,
                    angle: self.angle,
                    enemies: enemies,
                    target: target,
                    tower: self,
                    velocity: self.velocity,
                });
            }
        },
        
        move: function (x, y) {
            var self = this;
            self.x = x;
            self.y = y;
        }
    };
}());





