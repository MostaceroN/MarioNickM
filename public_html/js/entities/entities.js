//my entities project starts here!!
game.PlayerEntity = me.Entity.extend ({
  init: function(x, y, settings){
      this._super(me.Entity, 'init', [x, y, {
              image: "mario",
              spritewidth: "128",
              spriteheight: "128",
              width: 128,
              height: 128,
              getShape: function(){
                  return (new me.Rect(0, 0, 30, 128)).toPolygon();
                  //this shows how big and wide mario will be in the game
              }
      }]);
  
      this.renderable.addAnimation("idle",[3]);
      this.renderable.addAnimation("bigIdle", [19]);
      this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);
      this.renderable.addAnimation("bigWalk", [14, 15, 16, 17, 18, 19], 80);
      this.renderable.addAnimation("shrink", [0, 1, 2, 3], 80);
      this.renderable.addAnimation("grow", [4, 5, 6, 7], 80);
      
      //this shows how big my characters will be in the game
      this.renderable.setCurrentAnimation("idle");
   
      this.big = false;
      this.body.setVelocity(5, 20);
      me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
  },  


  update: function(delta){
      if(me.input.isKeyPressed("right")){
          this.body.vel.x += this.body.accel.x * me.timer.tick;
          //very confusing code 
          
      }else{
          this.body.vel.x = 0;
         }
         
         this.body.update(delta);
         me.collision.check(this, true, this.collideHandler.bind(this), true);
         
         //this allows my character to do things like walk and go in doors
        if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("bigWalk") && !this.renderable.isCurrentAnimation("grow") && !this.renderable.isCurrentAnimation("shrink")) {
                this.renderable.setCurrentAnimation("bigWalk");
                this.renderable.setAnimationFrame();
                //looks like code that will make my character walks when he transforms into big mario
            }
      }else{
          this.renderable.setCurrentAnimation("bigIdle");
         }
    
      
      this._super(me.Entity, "update", [delta]);
      return true;
  },
  
    collideHandler: function(response){
        var ydif = this.pos.y - response.b.pos.y;
        console.log(ydif);
        
        if (response.b.type === 'badguy'){
            if(ydif <= -115){
                response.b.alive = false;
            
                if(this.big){
                    this.big = false;
                    this.body.vel.y -= this.body.accel.y * me.tiimer.tick;
                    this.jumping = true;
                    this.renderable.setCurrentAnimation("shrink", "Idle");
                    this.renderable.setAnimationFrame();
                }else{
            me.state.change(me.state.MENU);
        }
        }else if(response.b.type === 'mushroom'){
            this.renderable.setCurrentAnimation("grow", "bigIdle");
        }
            this.big = true;
            me.collision.check(response.b);
            //all this complicated code is the reaason why my mario is able to grow and shrink
            
        }
        }
    

   
});

game.levelTrigger = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
        this.xSpawn = settings.xSpawn;
        this.ySpawn = settings.ySpawn;
        //my character will spawn in a certain position thanks to these spawn codes
    },
    
    onCollision: function(){
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
        me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
        //i like this code becuase it shows all the code i need to start up my level
    }
    
});


game.BadGuy = me.Entity.extend({
    init: function(x, y, settings){
          this._super(me.Entity, 'init', [x, y, {
              image: "slime",
              spritewidth: "60",
              spriteheight: "28",
              width: 60,
              height: 28,
              getShape: function(){
                  return (new me.Rect(0, 0, 60, 28)).toPolygon();
                  
                  //this shows the height and width of my bad guy, he isnt that big
              }
      }]);
  
      this.spritewidth = 60;
      var width = settings.width;
      x = this.pos.x;
      this.startX = x;
      this.endX = x + width - this.spritewidth;
      this.pos.x = x + width -this.spritewidth;
      this.updateBounds();
      //very confusing code that took like 20 minutes to transfer from the video
      
      this.alwaysUpdate = true;
      
      this.walkLeft = false;
      this.alive = true;
      this.type = "badguy";
      
      //the code above is all the code i need to have my bad guy in the game trying to kill the main man mario
      //this.renderable.addAnimation("run", [0, 1, 2], 80);
      //this.renderable.setCurrentAnimation("run");
      
      this.body.setVelocity(4, 6);
  
  
    },
    
    update: function(delta){
        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        if(this.alive){
            if(this.wawlkLeft && this.pos.x <= this.startX){
                this.walkLeft = false;
            }else if(!this.walkLeft && this.pos.x >= this.endX){
                this.walkLeft = true;
                
                //elses and ifs help my character do things more easily
                
                this.flipX(!this.walkLeft);
                this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
            }
        }else{
            me.game.world.removeChild(this);
        }
        //the code above helps my character move to the left
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    collideHandler: function(){
        
    }
});

game.Mushroom = me.Entity.extend({
    init: function(x, y, settings){
this._super(me.Entity, 'init', [x, y, {
image: "mario",
        spritewidth: "64",
        spriteheight: "64",
        width: 64,
        height: 64,
        getShape: function(){
        return (new me.Rect(0, 0, 64, 64)).toPolygon();
        
        //helps me know the size of my mushrooms
        }
      }]);
  
  me.collision.check(this);
  this.type = "mushroom";
  }
     });
     
     //the code above shows all the code that is needed to put the mushrooms into the game