(function () {
    
    td.Dashboard = function () {
        this.context = td.canvas.getContext("2d");
    };
    
    td.Dashboard.prototype = {
        
        height: 600,
        
        width: 200,
        
        x: 800,
        
        y: 0,
        
        /**
         * Draw the dashboard
         */
        draw: function () {
            var self = this,
                context = self.context;
            
            // Background
            context.fillStyle = "rgba(150, 80, 30, 1.0)";
            context.fillRect(self.x, self.y, self.width, self.height);
            
            /*
            // Tower Button
            context.fillStyle = "rgba(0, 80, 80, 1.0)";
            context.fillRect(520, 50, 50, 50);
           
            // Start Button
            if (true) {
                context.fillStyle = "rgba(0, 200, 0, 1.0)";
                context.fillRect(520, 450, 50, 30);    
            }
            */
        }
    };
}());
