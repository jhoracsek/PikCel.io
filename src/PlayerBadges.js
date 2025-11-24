class PlayerBadges{
        constructor(posX, posY){
            this.posX = posX;
            this.posY = posY;

            this.playerText = null;
            this.graphics = null;
            this.scene = null;

            this.playerBoxes = [];
            this.playerTexts = [];

            this.boxShadows = [];
        }

        create(scene, graphics){
            this.graphics = graphics;
            this.scene = scene;
        }

        resetBoxes(){
            while(this.playerBoxes.length > 0){
                this.removePlayerBox();
            }

            this.playerBoxes = [];
            this.playerTexts = [];
            this.boxShadows = [];
        }

        addAllPlayerBoxes(){
            this.resetBoxes();
            var first = true;
            var last = false;
            for(const box in playerNames){
                if (box == playerNames.length-1){
                    last = true;
                }
                //This is inefficent.
                this.addPlayerBox(box, first, last);
                first = false;
            }
        }

        addPlayerBox(num, first, last){
                let n = this.playerBoxes.length;

                let height = 170+n*50;

                let boxHeight = 50;
                let boxWidth = 250;

                const boxx = this.scene.add.graphics();

                //https://labs.phaser.io/edit.html?src=src/display/masks/graphics%20bitmap%20mask.js&v=3.70.0
                var top = 0;
                var bot = 0;
                if(first==true){
                    top = 5;
                }
                if(last==true){
                    bot = 5;
                }
                const maskGraphics = this.scene.make.graphics();
                maskGraphics.fillStyle(0xFFFFFF);
                maskGraphics.fillRoundedRect(31, height,boxWidth,boxHeight, { tl: top, tr: top, bl: bot, br: bot });

                const mask = new Phaser.Display.Masks.GeometryMask(this, maskGraphics);

                var c1=0xEFEFEF;
                var c2=0xeaeaea;

                boxx.fillGradientStyle(c1, c1, c2, c2, 1);
                var toBeMasked = boxx.fillRect(31, height,boxWidth,boxHeight);
                mask.dirty = true;
                toBeMasked.setMask(mask);
                this.playerBoxes.push(toBeMasked);

                var pt = this.scene.add.text(Math.round(31+boxWidth/2), Math.round(height+boxHeight/2), playerNames[num]).setFontFamily('daydream').setFontSize(17).setColor(convertColorCode(ogColours[num])).setOrigin(0.5, 0.5).setStroke('#6b4ea2', 3);
                pt.antialias = true;

                this.playerTexts.push(pt);
                boxx.fillStyle(0x000000,1);

                const shadowGraphic = this.scene.add.graphics();
                shadowGraphic.setDepth(-2);
                shadowGraphic.fillStyle(0x000000,0.17);
                
                this.boxShadows.push(shadowGraphic.fillRoundedRect(31+shadowOffset, height+shadowOffset,boxWidth,boxHeight, { tl: top, tr: top, bl: bot, br: bot }));

        }

        removePlayerBox(){
            var rect = this.playerBoxes.pop();
            var text = this.playerTexts.pop();
            var shad = this.boxShadows.pop();
            rect.destroy();
            text.destroy();
            shad.destroy();
        }

        update(){

        }


    }