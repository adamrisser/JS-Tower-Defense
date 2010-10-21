(function() {
    
    var _doc = document,
        html = {
             money: _doc.getElementById("money"),
             lives: _doc.getElementById("lives")
         };
    
    /**
     * Tower Defense namespace
     * @namespace
     */
    td = { 
        canvas: _doc.getElementById("track"),
        enemy: {},
        tower: {}
    };
    
    /**
     * The main game object. This runs everything
     * @public
     * @param {HTMLElement} canvas  Canvas HTML element
     */
    td.Game = function () {
        
        /**
         * Canvas canvas
         * @public
         */
        this.context = td.canvas.getContext("2d");
        
        /**
         * Canvas canvas
         * @public
         */
        this.track = new td.Track();
        
        /**
         * Enemies array
         * @public
         */
        this.enemies = [];
        
        /**
         * Enemies array
         * @public
         */
        this.waveId = 0;
        
        /**
         * Towers array
         * @public
         */
        this.towers = [];
        
        /**
         * Bullets array
         * @public
         */
        this.bullets = [];
        
        /**
         * Init buttons
         * @public
         */
        this.buttons = [
            new td.Button({
                id: 'tower1',
                height: 50,
                width: 50,
                x: 815,
                y: 50,
                color: 'rgba(0, 80, 80, 1.0)'
            }),
            new td.Button({
                id: 'mgun',
                height: 50,
                width: 50,
                x: 875,
                y: 50,
                color: 'rgba(80, 80, 0, 1.0)'
            }),
            new td.Button({
                id: 'cannon',
                height: 50,
                width:  50,
                x: 935,
                y: 50,
                color: 'rgba(80, 80, 80, 1.0)'
            }),
            new td.Button({
                id: 'start',
                height: 30,
                width: 60,
                x: 830,
                y: 525,
                color: 'rgba(0, 200, 0, 1.0)'
            }),
            new td.Button({
                id: 'pause',
                height: 30,
                width: 60,
                x: 910,
                y: 525,
                color: 'rgba(200, 0, 0, 1.0)'
            })
        ];
        
        /**
         * Fire up the event managers
         * @public
         */
        this.eventManager = new td.EventManager(this);
        
        /**
         * Dashboard object
         * @public
         */
        this.dashboard = new td.Dashboard(this);
        
        /**
         * Holds the current setInterval loop that is running
         * @public
         */
        this.currentInterval = null;
        
        this.track.draw();
        
        this.dashboard.draw();
    };
    
    td.Game.prototype = {
        
        /**
         * How many milliseconds between frames
         * @public
         */
        speed: 30,
        
        /**
         * Clear frame
         * @public
         */
        clear: function () {
            this.context.clearRect(0, 0, 800, 700);
        },
        
        /**
         * Animation loop that runs after the game starts. Lets the last enemies die and final
         * bullets fly off the frame
         * during this phase
         */
        afterLevel: function () {
            var self = this;
            
            self.currentInterval = setInterval(function () {
                self.clear();
                self.track.draw();
                self.dashboard.draw();
            }, self.speed);
            
            self.updateMoney();
        },
        
        /**
         * Animation loop that runs before the game starts. Players can set their initial towers
         * during this phase
         */
        beforeLevel: function () {
            var self = this;
            
            self.currentInterval = setInterval(function () {
                var j = 0,
                    m = 0,
                    tower,
                    button;

                self.clear();
                
                self.track.draw();
                
                self.dashboard.draw();
                
                for (; m < self.buttons.length; m+=1) {
                    button = self.buttons[m];
                    button.draw();
                }
                
                // Add towers to the page and start their actions
                for (; j < self.towers.length; j += 1) {
                    tower = self.towers[j];
                    tower.draw();
                }
                
            }, self.speed);
            
            self.updateMoney();
            self.updateLives();
        },
        
        /**
         * Main animation loop
         * @public
         */
        play: function () {
            var self = this,
                frame = 0;
                
            self.currentInterval = setInterval(function () {
                var i = 0,
                    j = 0,
                    k = 0,
                    m = 0,
                    enemy,
                    tower,
                    bullet,
                    button;
                
                self.clear();
                
                self.track.draw();
                
                self.dashboard.draw();
                
                for (; m < self.buttons.length; m+=1) {
                    button = self.buttons[m];
                    button.draw();
                }
                
                // Loop through each enemy and start their animation after
                // they pass their delay time
                for (; i < self.enemies.length; i += 1) {
                    enemy = self.enemies[i];
                    
                    if (frame >= enemy.delay) {
                        enemy.follow(self.track.path);
                        
                        // Reached final checkpoint? remove
                        // Add a scoring/health function here
                        if (enemy.health <= 0) {
                            enemy.die();
                            self.enemies.splice(i, 1);
                        } else if (enemy.checkpoint === self.track.path.length) {
                            
                            td.Player.lives -= 1;
                            self.updateLives();
                            
                            self.enemies.splice(i, 1);
                            
                            if (td.Player.lives <= 0) {
                                clearInterval(self.currentInterval);
                                self.afterLevel();
                                return;
                            }
                        }
                    }
                }
                
                // Add towers to the page and start their actions
                for (; j < self.towers.length; j += 1) {
                    tower = self.towers[j];
                    tower.draw();
                    tower.aim(self.enemies, self.track, self);
                }
                
                // Manage the bullets
                for (; k < self.bullets.length; k+=1) {
                    bullet = self.bullets[k];
                    
                    // Bullet is offf screen
                    if (bullet.x > 800 || bullet.y > 600) {
                        self.bullets.splice(k, 1);
                    } 
                    // Bullet has hit target
                    else if (bullet.hasHit(self.enemies)) {
                        self.bullets.splice(k, 1);
                    }
                    // Bullet is still live ammunition, keep it moving!
                    else {
                        bullet.move(self.enemies);    
                    }
                }
                
                // Done with wave? Either start the next wave or end the game
                if (self.enemies.length <= 0) {
                    clearInterval(self.currentInterval);
                    
                    self.waveId += 1;
                    
                    // Are there more waves to send?
                    if (self.waveId < td.Wave.length) {
                        self.enemies = td.Wave[self.waveId]();
                        self.play();
                    } else {
                        self.afterLevel();
                    }
                }
                
                frame += 1;
                
            }, self.speed);
        },
        
        pauseLevel: function () {
            var self = this;
            clearInterval(self.currentInterval);
            
            self.buttons.pop();
            self.play();
        },
        
        startLevel: function () {
            var self = this;
            clearInterval(self.currentInterval);
            
            self.enemies = td.Wave[0]();
            self.buttons.pop();
            self.play();
        },
        
        /**
         * Update player's money display
         */
        updateMoney: function () {
            html.money.innerHTML = td.Player.money;
        },
        
        /**
         * Update player's money display
         */
        updateLives: function () {
            html.lives.innerHTML = td.Player.lives;
        }
    };
}());
