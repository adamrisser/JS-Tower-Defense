(function () {
    
    td.Wave = [
        
        function () {
            var enemies = [],
                i = 0;
            
            // Add enemies to the ranks, creating the first wave
            for (; i < 10; i+=1) {
                
                enemies.push(
                    new td.enemy.Warrior({
                        delay   : (i+1) * 20,
                        health  : 45,
                        value   : 10,
                        velocity: 4
                    })
                );
            }
            
            return enemies;
        },
        
        // Ninja
        function () {
            var enemies = [],
                i = 0;
            
            // Add enemies to the ranks, creating the first wave
            for (; i < 8; i+=1) {
                
                enemies.push(
                    new td.enemy.Ninja({
                        delay   : (i+1) * 35,
                        health  : 50,
                        value   : 3,
                        velocity: 2,
                    })
                );
            }
            
            return enemies;
        },
        
        // Black Mage
        function () {
            var enemies = [],
                i = 0;
            
            // Add enemies to the ranks, creating the first wave
            for (; i < 8; i+=1) {
                
                enemies.push(
                    new td.enemy.BlackMage({
                        delay   : (i+1) * 35,
                        health  : 80,
                        value   : 3,
                        velocity: 2,
                    })
                );
            }
            
            return enemies;
        },
        
        // Red Mage
        function () {
            var enemies = [],
                i = 0;
            
            // Add enemies to the ranks, creating the first wave
            for (; i < 8; i+=1) {
                
                enemies.push(
                    new td.enemy.RedMage({
                        delay   : (i+1) * 35,
                        health  : 100,
                        value   : 3,
                        velocity: 2,
                    })
                );
            }
            
            return enemies;
        },
        
        // Black belt
        function () {
            var enemies = [],
                i = 0;
            
            // Add enemies to the ranks, creating the first wave
            for (; i < 8; i+=1) {
                
                enemies.push(
                    new td.enemy.BlackBelt({
                        delay   : (i+1) * 35,
                        health  : 120,
                        value   : 3,
                        velocity: 2,
                    })
                );
                
                // Add enemies to the ranks, creating the first wave
            for (; i < 8; i+=1) {
                
                enemies.push(
                    new td.enemy.Ninja({
                        delay   : (i+1) * 25,
                        health  : 70,
                        value   : 3,
                        velocity: 10,
                    })
                );
            }
            }
            
            return enemies;
        },
        
        function () {
            var enemies = [],
                i = 0;
            
            // Add enemies to the ranks, creating the first wave
            for (; i < 8; i+=1) {
                
                enemies.push(
                    new td.enemy.Square({
                        delay   : (i+1) * 35,
                        health  : 140,
                        value   : 3,
                        velocity: 2,
                    })
                );
            }
            
            return enemies;
        },
        
        function () {
            var enemies = [],
                i = 0;
            
            // Add enemies to the ranks, creating the first wave
            for (; i < 10; i+=1) {
                
                enemies.push(
                    new td.enemy.Square({
                        delay   : (i+1) * 35,
                        health  : 110,
                        value   : 3,
                        velocity: 2,
                    })
                );
            }
            
            return enemies;
        },
        
        function () {
            var enemies = [],
                i = 0;
            
            // Add enemies to the ranks, creating the first wave
            for (; i < 20; i+=1) {
                
                enemies.push(
                    new td.enemy.Circle({
                        delay   : (i+1) * 10,
                        health  : 30,
                        value   : 1,
                        velocity: 5,
                    })
                );
                
            }
            
            return enemies;
        },
        
        function () {
            var enemies = [],
                i = 0;
            
            // Add enemies to the ranks, creating the first wave
            for (; i < 15; i+=1) {
                
                enemies.push(
                    new td.enemy.Circle({
                        delay   : (i+1) * 10,
                        health  : 30,
                        value   : 2,
                        velocity: 5,
                    })
                );
                
                enemies.push(
                    new td.enemy.Square({
                        delay   : (i+1) * 35,
                        health  : 160,
                        value   : 5,
                        velocity: 2,
                    })
                );
            }
            
            return enemies;
        },
    
        function () {
            var enemies = [],
                i = 0;
            
            // Add enemies to the ranks, creating the first wave
            for (; i < 20; i+=1) {
                
                enemies.push(
                    new td.enemy.Circle({
                        delay   : (i+1) * 10,
                        health  : 30,
                        value   : 2,
                        velocity: 5,
                    })
                );
                
                enemies.push(
                    new td.enemy.Square({
                        delay   : (i+1) * 35,
                        health  : 160,
                        value   : 5,
                        velocity: 2,
                    })
                );
            }
            
            return enemies;
        },
        
        function () {
            var enemies = [],
                i = 0;
            
            // Add enemies to the ranks, creating the first wave
            for (; i < 10; i+=1) {
                
                enemies.push(
                    new td.enemy.Warrior({
                        delay   : (i+1) * 20,
                        health  : 1000,
                        value   : 10,
                        velocity: 3
                    })
                );
            }
            
            return enemies;
        },
        
        /*
         * Boss Wave
         */
        function () {
            
            return [
                new td.enemy.Square({
                    delay   : 15,
                    health  : 3360,
                    value   : 25,
                    velocity: 2
                })
            ];
        }
    ];
    
}());