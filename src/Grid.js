 /*
    Creates and draws the main game grid and initializes all 'Pixel' instances in pixStore. 
    Additionally, draws grid lines and a border around the board.
 */
 class Grid {
        constructor(posX, posY, players){
            this.posX = posX;
            this.posY = posY;
            this.players = players;
            this.size = 96*6;

            /*
                This was scraped...
            */
            // 2 player should be 16x16
            // 3 player should be 24x24
            // 4 player should be 32x32
            this.gridPixelSize = 0;
            switch(players){
                case 2:
                    this.gridPixelSize = 16;
                    break;
                case 3:
                    this.gridPixelSize = 24;
                    break;
                default:
                    this.gridPixelSize = 32;
            }
            this.lineSep = this.size/this.gridPixelSize;
            this.lineWidth = 1.0;
        }

        create(graphics, scene){
            var x = 0;
            var y = 0;
            const pixelGraphics = scene.add.graphics();


            for(let i = 0; i < this.size; i+= this.lineSep){
                for(let j = 0; j < this.size; j+= this.lineSep){
                    pixStore[x][y].update(this.posX+i,this.posY+j,this.lineSep, x, y);
                    pixStore[x][y].create(pixelGraphics, scene);
                    y+=1;
                }
                x+=1;
                y=0;
            }

            graphics.setBlendMode(Phaser.BlendModes.NORMAL);
            // https://www.canva.com/colors/color-wheel/
            graphics.lineStyle(this.lineWidth,0x6b4ea2,2,1);
            for(let i = this.lineSep; i < this.size; i+=this.lineSep){
                graphics.lineBetween(this.posX, this.posY + i, this.posX+this.size, this.posY+i);
            }
            for(let i = this.lineSep; i < this.size; i+=this.lineSep){
                graphics.lineBetween(this.posX+i, this.posY, this.posX+i, this.posY+this.size);
            }

            graphics.strokeRect(this.posX,this.posY,this.size,this.size);
        }

        update(){

        }


    }