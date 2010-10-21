(function () {
    
    /**
     * Game events that happen on mouse actions
     */
    var events = {
        
        tower : {
            handleMouseDown: function (game, tower) {
                console.info('highlight');
            }
        },
        
        button : {
            
            pause: function (game) {
                game.pauseLevel();
            },
            
            start: function (game) {
                game.startLevel();
            },
            
            tower1: function (game, button) {
                var price = 20;
                
                if (td.Player.money >= price) {
                    
                    var tower = new td.Tower({
                        attack: 20,
                        fireRate: 20,
                        price: price,
                        range: 150,
                        velocity: 10,
                        x: button.x,
                        y: button.y
                    }),
                    
                    _move = function () {
                        tower.move(td.mouseX, td.mouseY);
                    },
                    
                    _dropTower = function () {
                        if (tower.x < 800) {
                            td.canvas.removeEventListener("mousemove", _move, false);
                            td.canvas.removeEventListener("mouseup", _dropTower, false);
                            
                            tower.placed = true;
                            
                            td.Player.money -= price;
                            game.updateMoney();
                        }
                    };
                    
                    game.towers.push(tower);
                    
                    td.canvas.addEventListener("mousemove", _move, false);
                    td.canvas.addEventListener("mouseup", _dropTower, false);
                    
                }
            },
            
            mgun: function (game, button) {
                
                var price = 10;
                
                if (td.Player.money >= price) {
                    
                    var tower = new td.MachineGun({
                        attack: 3,
                        fireRate: 4,
                        price: price,
                        range: 100,
                        velocity: 0,
                        x: button.x,
                        y: button.y
                    }),
                    
                    _move = function () {
                        tower.move(td.mouseX, td.mouseY);
                    },
                    
                    _dropTower = function () {
                        
                        //make sure not on dash
                        if (tower.x < 800) {
                            td.canvas.removeEventListener("mousemove", _move, false);
                            td.canvas.removeEventListener("mouseup", _dropTower, false);
                            
                            tower.placed = true;
                            
                            td.Player.money -= price;
                            game.updateMoney();
                        }
                    };
                    
                    game.towers.push(tower);
                    
                    td.canvas.addEventListener("mousemove", _move, false);
                    td.canvas.addEventListener("mouseup", _dropTower, false);
                    
                }
            },
            
            cannon: function (game, button) {
                var price = 50;
                
                if (td.Player.money >= price) {
                    
                    var tower = new td.Cannon({
                        attack: 100,
                        fireRate: 80,
                        price: price,
                        range: 250,
                        velocity: 50,
                        x: button.x,
                        y: button.y
                    }),
                    
                    _move = function () {
                        tower.move(td.mouseX, td.mouseY);
                    },
                    
                    _dropTower = function () {
                        if (tower.x < 800) {
                            td.canvas.removeEventListener("mousemove", _move, false);
                            td.canvas.removeEventListener("mouseup", _dropTower, false);
                            
                            tower.placed = true;
                            
                            td.Player.money -= price;
                            game.updateMoney();
                        }
                    };
                    
                    game.towers.push(tower);
                    
                    td.canvas.addEventListener("mousemove", _move, false);
                    td.canvas.addEventListener("mouseup", _dropTower, false);
                    
                }
            },
        }
    };
    
    td.EventManager = function (game) {
        var self = this;
        
        self.game = game;
        
        // figure out position of the click in respect to the canvas and call the proper function
        td.canvas.addEventListener("mousedown", function (e) {
            self.handleOnMouseDown(e.clientX - td.canvas.offsetLeft, e.clientY - td.canvas.offsetTop);
        }, false);
        
        // capture mouse coordinates and store so each object can reference them
        td.canvas.addEventListener("mousemove", function (e) {
            
            if (typeof e.offsetX !== 'undefined') {
                td.mouseX = e.offsetX;
                td.mouseY = e.offsetY;
            }
            else if (typeof e.layerX !== 'undefined') {
                td.mouseX = e.layerX;
                td.mouseY = e.layerY;
            }
            
        }, false);
        
    };
    
    td.EventManager.prototype = {
        
        /**
         * Check to see if anything was clicked on mouse down
         * @param {Float}  x
         * @param {Float}  y
         * @param {String} type
         */
        handleOnMouseDown: function (x, y, type) {
            
            var self = this,
                towers = self.game.towers,
                buttons = self.game.buttons,
                tower,
                button,
                i = 0;
            
            for (; i < towers.length; i+=1) {
                tower = towers[i];
                
                if (x <= (tower.x + (tower.width/2))  && x >= (tower.x - (tower.width/2)) &&
                    y <= (tower.y + (tower.height/2)) && y >= (tower.y - (tower.height/2))) {
                    events.tower.handleMouseDown(self.game, tower);
                    return;
                }
            }
            
            for (i=0; i < buttons.length; i+=1) {
                button = buttons[i];
                
                if (x <= (button.x + button.width)  && x >= button.x &&
                    y <= (button.y + button.height) && y >= button.y) {
                    events.button[button.id](self.game, button);
                    return;
                }
            }
        }
    };
    
}());