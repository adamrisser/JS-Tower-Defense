(function () {
    
    td.Button = function (config) {
        var self = this;
        
        self.context = td.canvas.getContext("2d");
        
        self.color = config.color;
        self.id = config.id;
        self.width = config.width;
        self.height = config.height;
        self.x = config.x;
        self.y = config.y;
    };
    
    td.Button.prototype = {
        
        x: 500,
        
        y: 0,
        
        /**
         * Draw the button
         */
        draw: function () {
            var self = this,
                context = self.context;            
            
            context.fillStyle = self.color;
            context.fillRect(self.x, self.y, self.width, self.height);
        }
    };
    
}());