(function(){
    /**
     * @public
     * Track for enemies to follow.
     */
    td.Track = function () {
        var self = this;
        
        self.context = td.canvas.getContext("2d");
        
        self.img = new Image();
        self.img.src = 'img/levels/1.png';
    };

    td.Track.prototype = {
        
        color: '#0c0',
        
        path: [
            { x: 64,  y:  0 },
            { x: 64,  y:137 },
            { x:175,  y:137 },
            { x:175,  y:247 },
            { x: 64,  y:247 },
            { x: 64,  y:540 },
            { x: 545, y:540 },
            { x: 545, y:405 },
            { x: 355, y:405 },
            { x: 355, y: 57 },
            { x: 742, y: 57 },
            { x: 742, y:600 }
        ],
        
        startPosition: { x:65, y:0 },
        
        width: 52,
        
        /**
         * Draw track
         * @public
         */
        draw: function () {
            
            var self = this,
                context = self.context,
                imgHeight = 600,
                imgWidth = 800;
            
            // draw pretty image overlay of level
            context.drawImage(self.img, 0, 0, imgWidth, imgHeight);
            
            /*
            // draw path for enemies to walk upon
            context.beginPath();
            
            context.strokeStyle = self.color;
            context.lineWidth   = self.width;
            
            context.moveTo(self.startPosition.x, self.startPosition.y);
            
            for (var i = 0; i < this.path.length; i+=1) {
                context.lineTo(self.path[i].x, self.path[i].y);
            }
            
            
            context.stroke();
            */
        }
    };
}());