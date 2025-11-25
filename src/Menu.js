class Menu extends Phaser.Scene
    {
        constructor(){
            super('Menu');
            this.waitingText = null;
        }
        preload ()
        {
            this.load.image('logo', 'images/logo.png');
        }

        create ()
        {
            menuScene = this;
            this.logo = this.add.image(100, 50, 'logo');
            this.logo.setDepth(10);
            this.logo.setScale(4);
            this.logo.setOrigin(0.5,0.5);
            this.logo.x = 600;
            this.logo.y = 120;

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

        update(){
            frame += 1;
            bgX += 0.5;
            bgY -= 0.5;

            bgX %= bgMod;
            bgY %= bgMod;
            container.style.backgroundPositionX = bgX + "px";
            container.style.backgroundPositionY = bgY + "px";

            if(frame % 60 == 0){
                frame = 0;
                this.waitingUpdate();
            }
        }

        waitingUpdate(){

            if(this.waitingText != null){
                if(this.waitingText.text == "Waiting"){
                    this.waitingText.text = "Waiting.";
                }else if(this.waitingText.text == "Waiting."){
                    this.waitingText.text = "Waiting..";
                }else if(this.waitingText.text == "Waiting.."){
                    this.waitingText.text = "Waiting...";
                }else if(this.waitingText.text == "Waiting..."){
                    this.waitingText.text = "Waiting";
                }
            }
            
        }

        loadWaiting(){

            const menuGraphics = this.add.graphics();
            menuGraphics.fillStyle(0xFFFFFF);
            menuGraphics.fillRoundedRect(-308/2,-466/2,308,466,6); //Draw this at the center of menugraphics for scaling.
            menuGraphics.fillStyle(0x000000,0.1);
            menuGraphics.fillRoundedRect(-308/2+16, -466/2+73, 276, 252, 6)
            this.waitingText = this.add.text(608, 266, "Waiting").setFontFamily('daydream').setFontSize(27).setColor('#000000').setOrigin(0.5, 0.5)
            const wt = this.waitingText;
            menuGraphics.x = 600;
            menuGraphics.y = 460;

            const chain = this.tweens.chain({
                targets: menuGraphics,wt,
                tweens:[
                {
                    duration: 20,
                    scale: 1.025,

                },
                {
                    duration: 20,
                    scale:1
                }

                ]
            })


        }

        goToGame(){
            this.scene.switch(gameScene);
        }
    }