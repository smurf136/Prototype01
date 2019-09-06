let i;
let blocks;
let time = 0;
let bg01;
let iter = 0;
let player;
let cursors;
let alive = true;
let bullet;
let bullets;
let Bullet;
let amount;
let enemy;
let enemy1;
let enemy2;
let enemy3;
let enemy4;
let enemy5;
let textScore;
let lifeScore;
let hpPlayerScore;
let scores = 0;
let lifed = true;
let life2 = true;
let life1 = true;
let life3 = true;
let life4 = true;
let life5 = true;
let timeEvent;
let childrens;
let timedEvent;
let life = 2;
let hpPlayer = 2;
let hpEnemy = 2;
class Map01 extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'Map01'
        });
    }

    preload() {
        this.load.image('bg01', 'src/assets/images/desert-backgorund-looped.png')
        this.load.spritesheet('player', 'src/assets/images/ship.png', {
            frameHeight: 24,
            frameWidth: 16
        })
        this.load.spritesheet('bullet', 'src/assets/images/laser-bolts.png', {
            frameHeight: 16,
            frameWidth: 16
        })
        this.load.spritesheet('enemy', 'src/assets/images/enemy-big.png', {
            frameHeight: 32,
            frameWidth: 32
        })
    }

    create() {

        bg01 = this.add.tileSprite(620, 300, 800, 600, 'bg01').setScale(2)
        player = this.physics.add.sprite(170, 680, 'player').setSize(1.5).setScale(1.5)
        enemy = this.physics.add.group({
            key: 'enemy',
            repeat: Phaser.Math.Between(6, 10),
            setXY: {
                x: Phaser.Math.Between(20, 100),
                y: Phaser.Math.Between(50, 100),
                stepX: 30,
                stepY: 30
            }
        })

        // this.time.addEvent({
        //     delay: 500,
        //     callback: ()=>{
        //         enemy1 = this.physics.add.group({
        //             key: 'enemy',
        //             repeat: Phaser.Math.Between(6,10),
        //             setXY: { x: Phaser.Math.Between(20, 100), y: Phaser.Math.Between(50, 100), stepX: 30, stepY: 30 }
        //         })
        //     },
        //     callbackScope: enemy1.setVelocityY(300),
        //     loop: false
        // })

        player.setCollideWorldBounds(true)

        Bullet = new Phaser.Class({

            Extends: Phaser.GameObjects.Image,

            initialize:

                function Bullet(scene) {
                    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet')
                    this.speed = Phaser.Math.GetSpeed(600, 1)

                },

            fire: function (x, y) {
                this.setPosition(x, y)
                this.setActive(true)
                this.setVisible(true)
            },

            update: function (time, delta) {
                this.y -= this.speed * delta;
                if (this.y > 1000) {
                    this.setActive(false)
                    this.setVisible(false)
                }
            }
        });

        bullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 70,
            runChildUpdate: true
        });

        this.anims.create({
            key: 'turn',
            frames: [{
                key: 'player',
                frame: 2
            }],
            frameRate: 10
        })
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 1
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {
                start: 3,
                end: 4
            }),
            frameRate: 10,
            repeat: -1
        })
        //bug animation fired
        this.anims.create({
            key: 'fired',
            frames: this.anims.generateFrameNumbers('bullet', {
                start: 3,
                end: 4
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'enemy',
            frames: this.anims.generateFrameNumbers('enemy'),
            frameRate: 7,
            yoyo: false,
            repeat: -1
        })

        cursors = this.input.keyboard.createCursorKeys()
        enemy.playAnimation('enemy')

        this.physics.add.collider(bullets, enemy, this.hitEnemy)
        // this.physics.add.collider(player, enemy, function(){
        //     player.setTint(0xff0000)
        //     player.body.reset()
        //     timedEvent.remove()
        // })
        this.physics.add.collider(player, enemy, this.enemyHit)

        // timedEvent = this.time.addEvent({ delay: 50, callback: this.enemyHit, callbackScope: this, loop: true });

        console.log(enemy)
        // console.log(enemy.getLength())
        // console.log(enemy.getChildren())

        // console.log(enemy.children)
        // childrens = enemy.children;
        // console.log(childrens)

        // for(let i = 0;i<enemy.getLength();i++){
        //     console.log(childrens[i])
        // }
        enemy.setVelocityY(40)

        textScore = this.add.text(16, 16, 'score : 0', {
            fontSize: '32 px',
            fil: '#000'
        })
        lifeScore = this.add.text(250, 16, 'life x 2', {
            fontSize: '32 px',
            fil: '#000'
        })
        hpPlayerScore = this.add.text(100, 16, 'hp : 2', {
            fontSize: '32 px',
            fil: '#000'
        })

        // for(var i = 0;i < enemy.length;i++){
        //     console.log(enemy.entries)
        // }
    }

    update() {


        if (alive) {
            bullet = bullets.get();
            if (bullet != null) {
                if (bullet) {
                    bullet.setScale(1.3).setSize(1.3).fire(player.x, player.y - 30)
                }
            }
            bullets.children.each(function (b) {
                if (b.active) {
                    if (b.y < 0) {
                        b.setActive(false)
                    }
                }
            })
        }

        if (hpPlayer == 0) {
            life--;
            if (life != 0) {
                hpPlayer = 2;
            }
        }

        if (life == 0) {
            alive = false
            console.log('dead')
            this.scene.pause()
            player.setTint(0xff0000)
        }

        hpPlayerScore.setText('hp : ' + hpPlayer)
        lifeScore.setText('life : ' + life)

        if (cursors.up.isDown) {
            player.setVelocityY(-300)
            player.anims.play('turn')

        } else if (cursors.down.isDown) {
            player.setVelocityY(300)
            player.anims.play('turn')
        } else if (cursors.left.isDown) {
            player.setVelocityX(-300)
            player.anims.play('left')
        } else if (cursors.right.isDown) {
            player.setVelocityX(300)
            player.anims.play('right')
        } else {
            player.setVelocityX(0)
            player.setVelocityY(0)
            player.anims.play('turn')
        }
        bg01.tilePositionY = -iter * 400;
        iter += 0.005
    }

    hitEnemy(bullet, enemy) {
        enemy.disableBody(true, true)
        scores += 1001;
        textScore.setText('score : ' + scores)
        hpEnemy--;
        if (hpEnemy == 0) {

        }
        // for(var i = 0;i < enemy.getLength();i++){
        //     // console.log(enemy.children.entries[i].body.blocked.down)
        //     console.log(enemy.children.entries[1].body.touching.down)
        //     // enemy.children.entries[0].setVisible(false)
        //     if(enemy.children.entries[i].body.blocked.down){
        //         // enemy.children.entries[i].body.enable = false;
        //     }
        // }
    }

    enemyHit(player, enemy) {
        if (life > 0) {
            player.body.reset(170, 680)
        }
        enemy.disableBody(true, true)
        hpPlayer--;
    }
}
export default Map01;
