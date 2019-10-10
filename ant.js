;(function(){
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    
    function Game(antCount) {
        var GAME_WIDTH = 500;
        var GAME_HEIGHT = 500;
        var GAME_ANIMATION_FRAME = 24;
        this.ants = [];
        this.antCount = antCount;
        this.parentElem = document.createElement('div');
        document.body.appendChild(this.parentElem);
        this.parentElem.classList.add('app-container');
        
        
        this.moveAnts = function() {
          for(var i=0; i< this.antCount; i++) {
            this.ants[i].move();
            this.ants[i].checkCollision(this.ants);
            this.ants[i].antSmash(this.ants);
          }
        }
        
        this.init = function() {

            this.createants();
          setInterval(this.moveAnts.bind(this), GAME_ANIMATION_FRAME);
          return this;
     
        }
        
        this.createants = function(){
          for(var i =0; i < this.antCount; i++) {
            var angle = getRandomInt(0,360);
            var ant = new Ant(this.parentElem, angle);
            var randomX = getRandomInt(0, GAME_WIDTH);
            var randomY = getRandomInt(0, GAME_HEIGHT);
            ant.setPosition(randomX, randomY);
            ant.draw();
            this.ants.push(ant);
            ant.antSmash();
          }
        }
  
      }
    

    function Ant(parentElem, angle) {
      this.parentElem = parentElem;
      this.angle = angle;
      this.element = null;
      this.x = null;
      this.y = null;
      this.dx;
      this.dy;
      this.isActive = true;
      
      
      this.init = function() {
        this.element = document.createElement('img');
        this.element.setAttribute('src', 'giphy.gif');
        this.element.classList.add('box');
        this.parentElem.appendChild(this.element);
      }
      this.checkCollision = checkCollision.bind(this);
      this.antSmash = antSmash.bind(this);

      function checkCollision(ants){
        // checkCollision
        if(this.isActive){
        for(var i=0; i< ants.length; i++) {
            if(this !== ants[i]){

                if(this.x + 20 >= ants[i].x && this.x <= ants[i].x + 20 && this.y + 20 >= ants[i].y && this.y <= ants[i].y + 20){
                  this.x += 30;
                  this.y += 30;
                  ants[i].x -= 30;
                  ants[i].y -= 30;

                }
            }
        }
    }
    }
      
      this.init();
      
      function antSmash(ants){
          this.element.addEventListener('click', function(e){
           this.element.setAttribute('src', 'smiley.gif');
          setTimeout(function(){
            this.element.remove();
          }.bind(this),1000) 
              this.isActive = false;
          }.bind(this));
      }

      this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
      }
      
      this.move = move.bind(this);
      
      function move() {

        if(this.isActive){
          this.dx = 1 * Math.cos(this.angle);
          this.dy = 1 * Math.sin(this.angle);
         if(this.x<=480 && this.y<=480 && this.x>=0 && this.y>=0){ 
        this.x += this.dx;
        this.y += this.dy; 
    }else{
        this.x =  getRandomInt(0, 480);;
        this.y =  getRandomInt(0, 480);; 
        }
         
    
        this.draw();
    }
      }
      
      this.draw = function() {
        this.element.style.top = this.x + 'px';
        this.element.style.left = this.y + 'px';
      }
    }
    
   
    new Game(20).init();
    new Game(15).init();
  })();
  