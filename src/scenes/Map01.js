let bg01;
let iter = 0;
let player;
let cursors;
let alive = true;
let bullet;
let bullets;
let Bullet;
let amount;
class Map01 extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'Map01'
        });
    }

    preload() {
        this.load.image('bg01', 'src/assets/images/desert-backgorund-looped.png')
        this.load.spritesheet('player', 'src/assets/images/ship.png', { frameHeight: 24, frameWidth: 16 })
        this.load.spritesheet('bullet', 'src/assets/images/laser-bolts.png', { frameHeight: 16, frameWidth: 16 })
    }

    create() {
        // bg01 = this.add.tileSprite(100, 50, 600, 1000, 'bg01')
        bg01 = this.add.tileSprite(620,300,800,600,'bg01').setScale(2)
        player = this.physics.add.sprite(170, 680, 'player').setSize(1.5).setScale(1.5)

        Bullet = new Phaser.Class({

            Extends: Phaser.GameObjects.Image,

            initialize:

            function Bullet(scene){
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet')
                this.speed = Phaser.Math.GetSpeed(600, 1)
            },

            fire: function (x,y){
                this.setPosition(x, y)
                this.setActive(true)
                this.setVisible(true)
            },

            update: function(time, delta){
                this.y -= this.speed * delta;
                if(this.y > 820){
                    this.setActive(false)
                    this.setVisible(false)
                }
            }
        });

        bullets = this.add.group({
            classType: Bullet,
            // maxSize: amount,
            runChildUpdate: true
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 2 } ],
            frameRate: 10
        })
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 4 }),
            frameRate: 10,
            repeat: -1
        })
        //bug animation fired
        this.anims.create({
            key: 'fired',
            frames: this.anims.generateFrameNumbers('bullet', { start: 3, end: 4 }),
            frameRate: 10,
            repeat: -1
        })

        cursors = this.input.keyboard.createCursorKeys()

    }

    update() {

        if(alive){
            bullet = bullets.get().setScale(1.3);
            if(bullet){
                bullet.fire(player.x, player.y - 30)
            }
        }

        if(cursors.up.isDown){
            player.setVelocityY(-100)
            player.anims.play('turn')
            
        }else if(cursors.down.isDown){
            player.setVelocityY(100)
            player.anims.play('turn')
        }else if(cursors.left.isDown){
            player.setVelocityX(-100)
            player.anims.play('left')
        }else if(cursors.right.isDown){
            player.setVelocityX(100)
            player.anims.play('right')
        }else{
            player.setVelocityX(0)
            player.setVelocityY(0)
            player.anims.play('turn')
        }


        bg01.tilePositionY = -iter * 400;
        iter += 0.005
    }
}

export default Map01;
