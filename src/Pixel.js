class Pixel {
        constructor(posX, posY, size, x, y){
            this.x = x;
            this.y = y;
            this.posX = posX;
            this.posY = posY;
            this.size = size;
            this.pix = null;
            this.virgin = true;
            this.fx = null;
        }

        update(posX, posY, size, x, y){
            this.x = x;
            this.y = y;
            this.posX = posX;
            this.posY = posY;
            this.size = size;
        }

        create(graphics, scene){
            this.graphics = graphics;
            var pix = scene.add.rectangle(this.posX+this.size/2, this.posY+this.size/2, this.size, this.size, board[this.x][this.y]);
            this.pix = pix;

            this.updateColor(board[this.x][this.y])
            
            pix.setInteractive()
            pix.on('pointerdown', (pointer)=>
            {
                if(!gameOver && myTurn && checkAdj(this.x, this.y)){
                    pix.setFillStyle(playerColor);
                    board[this.x][this.y] = playerColor;
                    socket.emit('board update', playerColor, this.x, this.y, roomID);
                    numPlaced++;
                    if (numPlaced >= numAllowedToPlace){
                        socket.emit('turn update', playerNum, roomID, false);
                        numPlaced = 0;
                        myTurn = false;
                    }
                }
            });


        }

        updateColor(color){

            if(this.pix != null){
                this.pix.setFillStyle(color);

                //If it's a default colour, just draw it above the shine, otherwise just draw it below.
                if(color == '0xEFEFEF' || color == '0xFFFFFF'){
                    this.pix.setDepth(3);
                }else{
                    this.pix.setDepth(1);
                }
            }
        }
    }