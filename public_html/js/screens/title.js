game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild( new me.Sprite (0, 0, me.loader.getImage('title-screen')), -10);
                me.input.bindKey(me.input.KEY.ENTER, "start");
                
                //by pressing enter, i can start my game with ease
                me.game.world.addChild(new(me.Renderable.extend ({
                    init: function (){
                        this._super(me.Renderable, 'init',[510, 30, me.game.viewport.width, me.game.viewport.height]);
                        this.font = new me.Font("Arial", 46, "white");
                    
                    },
                    
                    draw: function(renderer){
                        this.font.draw(renderer.getContext(), "Marioish", 450, 130);
                        this.font.draw(renderer.getContext(), "Press ENTER to play!", 250, 530);
                     
                        //this is all the code i need to successfully have a title page on my game
                    }
                     
                })));
                
                
                this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
                    if(action === "start"){
                        me.state.change(me.state.PLAY);
                        
                        //with this code, i can start the game by pressing a button
                    }
                    
                });
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER);
                me.event.unsubscribe(this.handler);
                
                //thanks to coding, i can have a title page on my game of mario
	}
});
