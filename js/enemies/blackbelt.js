(function () {
    
    var _blackbelt,
    
        /**
         * Enemy sprite details
         * @type Object
         * @private
         */
        _img = {
            height:  32,
            width:   29,
            dHeight: 32,
            dWidth:  30
        },
        
        /**
         * 
         * @private
         */
        _imgPos = [
            {x: 327, y: 19},
            {x: 387, y: 19},
            {x: 447, y: 19},
            {x: 507, y: 19},
            {x: 327, y: 79},
            {x: 387, y: 79},
            {x: 447, y: 79},
            {x: 507, y: 79}
        ];
    
    td.enemy.BlackBelt = _blackbelt = function (config) {
        var self = this;
        self.context  = td.canvas.getContext("2d");
        self.delay    = config.delay;
        self.game     = config.game;
        self.health   = config.health;
        self.value    = config.value;
        self.velocity = config.velocity;
        
        self.img = new Image();
        self.img.src = 'img/enemies.png';
        
        self._pos = 0;
        self._frame = 0;
    };
    
    // Steal common methods
    _blackbelt = td.enemy.BlackBelt.prototype = new td.Enemy();
    
    _blackbelt.checkpoint = 0;
    
    _blackbelt.rotation = 0;
    
    _blackbelt.draw = function () {
        
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
