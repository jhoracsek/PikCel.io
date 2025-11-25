
/*
    This is the in-game scene. It sets up the board, HUD, animations (logo pulse, grid shine), 
    player badges, timer, turn info, and manages win screen and “new turn” popups. 
    It also updates the moving background and handles transitions back to the waiting room/menu.
*/

class Game extends Phaser.Scene
    {
        constructor(){
            super('Game');
            gameScene = this;
            this.popUpGraphics = null;
            this.winScreen = null;
            this.winText = null;
        }
        preload ()
        {
            this.load.image('logo', 'images/logo.png');
            this.load.image('shine', 'images/shine.png');

        }

        

        create ()
        {
            gameScene = this;

            this.logo = this.add.image(100, 50, 'logo');
            this.logo.setDepth(10);
            this.logo.setScale(4);
            this.logo.setOrigin(0.5,0.5);
            this.logo.x = 600;
            this.logo.y = 120;


            var gridPosX = 312;
            var smallBoxStart = (1200-500-576)/4;

            const grid = new Grid(gridPosX, 170, 2);
            const graphics = this.add.graphics();
            const shadows = this.add.graphics();

            grid.create(graphics, this);

            var startL = 3*smallBoxStart + 250 + 576;
            var startT = 170;
            var endT = 776;

            pbs.create(this, graphics);
            graphics.fillStyle('0xf7f7f7',1);
            graphics.setDepth(1);
            
            var divElement = this.add.dom(0, 0, 'div');
            divElement.innerHTML = '<b>This is an embedded HTML element.</b>';

            shadows.fillStyle(0x000000, 0.17);

            
            //TOP RIGHT====
            graphics.fillRoundedRect(startL, startT,250,273,6);
            shadows.fillRoundedRect(startL+shadowOffset, startT+shadowOffset,250,273,6);
            //=============

            //BOTTOM RIGHT====
            graphics.fillRoundedRect(startL, startT+303,250,273,6);
            shadows.fillRoundedRect(startL+shadowOffset, startT+303+shadowOffset,250,273,6);
            //================

            //Top
            graphics.setDepth(4);
            var topBoxStart = 2*smallBoxStart + 576 + 2*250;
            

            //GRID SHADOW
            shadows.setDepth(-5);
            
            shadows.fillRect(gridPosX+shadowOffset, 170+shadowOffset,576,576);


            shadows.fillStyle(0x6b4ea2, 0.5);
            shadows.fillRect(gridPosX-3, 170-3,576+6,576+6,6);


            // GRID SHINE =============================================

            // gridUnderlay serves as our mask for the shine.
            var gridUnderlay = this.add.rectangle(gridPosX+288,170+288,576,576,0xFFFFFF,0.2);

            // This should essentially be hidden under everything in our canvas.
            gridUnderlay.setDepth(-10);

            // This is the actual shine that will appear over our grid.
            let shine = this.add.image(190, 190-75, 'shine');
            shine.setDepth(2);
            shine.rotation = -Math.PI/4;
            shine.setBlendMode(Phaser.BlendModes.ADD);


            // We mask the shine so it only appears within the confines of gridUnderlay.
            const mask = new Phaser.Display.Masks.BitmapMask(this, gridUnderlay);
            shine.setMask(mask);

            //This is the animation associated w/ the shine.
            this.tweens.add({
                targets: shine,
                x: 960,
                y: 960-75,
                repeat:-1,
                repeatDelay: 2000,
                duration:800,
            });
            
            
            // ========================================================

            this.clock = this.add.text(1140, 198, timerSeconds).setFontFamily('daydream').setFontSize(37).setColor(convertColorCode(playerColours[whoseTurn])).setStroke('#6b4ea2', 7).setOrigin(0.5, 0.5);
            this.clock.setDepth(101);
            this.numText = this.add.text(1044, 309, numAllowedToPlace+"/"+numAllowedToPlace).setFontFamily('daydream').setFontSize(52).setColor(convertColorCode(playerColours[whoseTurn])).setStroke('#6b4ea2', 7).setOrigin(0.5, 0.5);
            this.numText.setDepth(101);

            this.nameTextRight = this.add.text(1044, 400, ogNames[whoseTurn]).setFontFamily('daydream').setFontSize(27).setColor(convertColorCode(playerColours[whoseTurn])).setStroke('#6b4ea2', 7).setOrigin(0.5, 0.5);
            this.nameTextRight.setDepth(101);
            

            //Logo animation
            pbs.addAllPlayerBoxes();
                this.tweens.add({

                targets: this.logo,
                duration: 1000,
                scaleX: 3.75,
                scaleY: 3.75,
                ease: 'Phaser.Math.Easing.Linear',
                repeat: -1,
                yoyo: true
            });
           
        }

        displayWinScreen(winnerName, clr){
            if(this.winScreen != null){
                this.winScreen.destroy();
            }
            if(this.winText != null){
                this.winText.destroy();
            }
            this.winScreen = this.add.graphics();
            this.winScreen.fillStyle(0xFFFFFF,1);
            this.winScreen.lineStyle(1,0x6b4ea2, 1);
            this.winScreen.setDepth(200);
            this.winText = this.add.text(608, 360, winnerName + " has won!").setFontFamily('daydream').setFontSize(37).setColor(convertColorCode(clr)).setOrigin(0.5, 0.5).setStroke('#6b4ea2', 7);
            this.winText.setDepth(201);
            let pWidth = 450;
            let pHeight = 200;
            this.winScreen.fillStyle(0x000000,0.17);
            this.winScreen.fillRoundedRect(-pWidth/2+shadowOffset,-pHeight/2+shadowOffset,pWidth,pHeight,6);
            this.winScreen.fillStyle(0xFFFFFF,1);
            this.winScreen.fillRoundedRect(-pWidth/2,-pHeight/2,pWidth,pHeight,6);
            this.winScreen.strokeRoundedRect(-pWidth/2,-pHeight/2,pWidth,pHeight,6);
            this.winScreen.x = 600;
            this.winScreen.y = 400;

            const chain = this.tweens.chain({
                targets: this.winScreen,
                tweens:[
                {
                    duration: 20,
                    scale: 1.1,

                },
                {
                    duration: 20,
                    scale:1
                },
                {
                    duration: 750,
                    alpha:1
                },
                ]

            })
        }

        removeWinScreen(){
            //Should only be called when win screen is active.
            if(this.winScreen != null){
                this.winScreen.destroy();
            }
            if(this.winText != null){
                this.winText.destroy();
            }
        }

        newTurnGraphic(plrName){

            if(this.popUp != null)
                this.popUp.destroy();
            this.popUp = this.add.graphics();
            this.popUp.setDepth(100);
            this.popUp.fillStyle(0xFFFFFF);
            this.popUp.lineStyle(1,0x6b4ea2, 1);
            let pWidth = 450;
            let pHeight = 100;
            this.popUp.fillStyle(0x000000,0.17);
            this.popUp.fillRoundedRect(-pWidth/2+shadowOffset,-pHeight/2+shadowOffset,pWidth,pHeight,6);
            this.popUp.fillStyle(0xFFFFFF,1);
            this.popUp.fillRoundedRect(-pWidth/2,-pHeight/2,pWidth,pHeight,6);
            this.popUp.strokeRoundedRect(-pWidth/2,-pHeight/2,pWidth,pHeight,6);

            if(this.nameText == null){
                this.nameText = this.add.text(608, 400, plrName+"\'s turn!").setFontFamily('daydream').setFontSize(27).setColor('#000000').setOrigin(0.5, 0.5)
                this.nameText.setDepth(101);
            }else{
                this.nameText.setText(plrName+"\'s turn!")
                this.nameText.alpha = 1;
            }
            this.popUp.x = 600;
            this.popUp.y = 400;
            
            let nt = this.nameText;

            const chain = this.tweens.chain({
                targets: this.popUp,
                tweens:[
                {
                    duration: 20,
                    scale: 1.1,

                },
                {
                    duration: 20,
                    scale:1
                },
                {
                    duration: 750,
                    alpha:1
                },

                {
                    duration: 300,
                    alpha: 0
                }
                ]
            })

            const chain1 = this.tweens.chain({

                targets: this.nameText,
                tweens:[
                {
                    duration: 790,
                    alpha:1
                },

                {
                    duration: 300,
                    alpha: 0
                }
                ]
            })

        }

        update(){
            bgX += 0.5;
            bgY -= 0.5;
            bgX %= bgMod;
            bgY %= bgMod;
            container.style.backgroundPositionX = bgX + "px";
            container.style.backgroundPositionY = bgY + "px";
        }
        goToWait(){
            if(this.winScreen != null){
                this.winScreen.destroy();
            }
            numPlaced = 0;
            this.scene.switch(menuScene);
            waitRoomDisplay();
        }
    }