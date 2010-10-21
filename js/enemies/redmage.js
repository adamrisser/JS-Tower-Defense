(function () {
    
    var _redMage,
    
        /**
         * Enemy sprite details
         * @type Object
         * @private
         */
        _img = {
            height:  32,
            width:   33,
            dHeight: 32,
            dWidth:  30
        },
        
        /**
         * 
         * @private
         */
        _imgPos = [
            {x: 324, y: 207},
            {x: 384, y: 207},
            {x: 444, y: 207},
            {x: 504, y: 207},
            {x: 324, y: 267},
            {x: 384, y: 267},
            {x: 444, y: 267},
            {x: 504, y: 267}
        ];
    
    td.enemy.RedMage = _redMage = function (config) {
        var self = this;
        self.context  = td.canvas.getContext("2d");
        self.delay    = config.delay;
        self.game     = config.game;
        self.health   = config.health;
        self.value    = config.value;
        self.velocity = config.velocity;
        
        self.img = new Image();
        self.img.src = 'file:///Users/arisser/Desktop/td/img/enemies.png';
        
        self._pos = 0;
        self._frame = 0;
    };
    
    // Steal common methods
    _redMage = td.enemy.RedMage.prototype = new td.Enemy();
    
    _redMage.checkpoint = 0;
    
    _redMage.rotation = 0;
    
    _redMage.draw = function () {
        
        var self = this,
            context = self.context;
        
        if (self._frame > 10) {
            
            // down
            if (self.rotation > 1.0) {
                self._pos = self._pos === 0 ? 1 : 0;
            }
            // left
            else if ((self.rotation < 0 && self.rotation > -1.0) || (self.rotation > 0 && self.rotation < .3)) {
                self._pos = self._pos === 4 ? 5 : 4;
            }
            // up
            else if (self.rotation < -1.0 && self.rotation > -2.0) {
                self._pos = self._pos === 6 ? 7 : 6;
            }
            // right
            else {
                self._pos = self._pos === 4 ? 5 : 4;
            }
            
            self._frame = 0;
        }
        else {
            self._frame+=1;
        }
        
        context.drawImage(self.img,
                          _imgPos[self._pos].x,
                          _imgPos[self._pos].y,
                          _img.width,
                          _img.height,
                          (self.x - _img.dWidth/2),
                          (self.y - _img.dHeight/2),
                          _img.dWidth,
                          _img.dHeight);
    };
    
}());
