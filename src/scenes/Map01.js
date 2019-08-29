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
let life = true;
let life2 = true;
let life1 = true;
let life3 = true;
let life4 = true;
let life5 = true;
let timeEvent;
let childrens;
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
        this.load.spritesheet('enemy', 'src/assets/images/enemy-big.png', { frameHeight: 32, frameWidth: 32 })
    }

    create() {
        // bg01 = this.add.tileSprite(100, 50, 600, 1000, 'bg01')
        bg01 = this.add.tileSprite(620,300,800,600,'bg01').setScale(2)
        player = this.physics.add.sprite(170, 680, 'player').setSize(1.5).setScale(1.5)
        enemy = this.physics.add.group()
        enemy.create(30, 50, 'enemy')
        enemy.create(80, 50, 'enemy')
        enemy.create(130, 50, 'enemy')
        enemy.create(180, 50, 'enemy')
        enemy.create(230, 50, 'enemy')
        enemy.create(280, 50, 'enemy')
        // enemy.sprite(10, 50, 'enemy').setSize(1.5).setScale(1.5)
        // enemy = this.physics.add.sprite(10, 50, 'enemy').setSize(1.5).setScale(1.5)
        // enemy1 = this.physics.add.sprite(30, 50, 'enemy').setSize(1.5).setScale(1.5)
        // enemy2 = this.physics.add.sprite(80, 50, 'enemy').setSize(1.5).setScale(1.5)
        // enemy3 = this.physics.add.sprite(130, 50, 'enemy').setSize(1.5).setScale(1.5)
        // enemy4 = this.physics.add.sprite(180, 50, 'enemy').setSize(1.5).setScale(1.5)
        // enemy5 = this.physics.add.sprite(230, 50, 'enemy').setSize(1.5).setScale(1.5)
        // enemy = this.physics.add.sprite(20, 50, 'enemy').setSize(1.5).setScale(1.5)
        // enemy = this.physics.add.sprite(10, 50, 'enemy').setSize(1.5).setScale(1.5)
        // enemy = this.physics.add.sprite(10, 50, 'enemy').setSize(1.5).setScale(1.5)
        // enemy = this.physics.add.staticGroup()
        // enemy.create(10, 50, 'enemy')


        player.setCollideWorldBounds(true)

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

        bullets = this.physics.add.group({
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
        this.anims.create({
            key: 'enemy',
            frames: this.anims.generateFrameNumbers('enemy'),
            frameRate: 7,
            yoyo: false,
            repeat: -1
        })
        
        cursors = this.input.keyboard.createCursorKeys()
        enemy.playAnimation('enemy')
        // enemy1.anims.play('enemy')
        // enemy2.anims.play('enemy')
        // enemy3.anims.play('enemy')
        // enemy4.anims.play('enemy')
        // enemy5.anims.play('enemy')
        this.physics.add.collider(bullets, enemy, this.fired)
        // this.physics.add.collider(bullets, enemy1, this.fired1)
        // this.physics.add.collider(bullets, enemy2, this.fired2)
        // this.physics.add.collider(bullets, enemy3, this.fired3)
        // this.physics.add.collider(bullets, enemy4, this.fired4)
        // this.physics.add.collider(bullets, enemy5, this.fired5)
        console.log(enemy.getLength())
        console.log(enemy.getChildren())

        // timeEvent = this.time.addEvent({
        //     delay: 10000,
        //     callback: this.fired(),
        //     callbackScope: this,
        //     loop: true
        // })
        childrens = enemy.children;
        // console.log(childrens)
        for(let i = 0;i<enemy.getLength();i++){
            console.log(childrens[i])
        }
    }
    
    update() {
        
        if(alive){
            time++;
            bullet = bullets.get().setScale(1.3);
            if(bullet){
                bullet.fire(player.x, player.y - 30)
            }
            // if(time == 1000){
            //     time = 0;
            //     bullet.destroy()
            // }
        }

        // enemy.play('enemy', true)
        // bullets.anims.play('fired')
        if(life){
            enemy.angle += 5
            enemy.setVelocityY(40)
        }
        // if(life2){
        //     enemy2.angle += 5
        //     enemy2.setVelocityY(40)
        // }
        // if(life3){
        //     enemy3.angle += 5
        //     enemy3.setVelocityY(40)
        // }
        // if(life4){
        //     enemy4.angle += 5
        //     enemy4.setVelocityY(40)
        // }
        // if(life5){
        //     enemy5.angle += 5
        //     enemy5.setVelocityY(40)
        // }
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

    bulletHit(){
        
    }
    
    fired(){
        
        life = false;
        // enemy.body.setTint(0x000000);
        enemy.kill()
    }
    fired1(){
        life1 = false;
        enemy1.body.setTint(0x000000);
        // enemy2.setTint(0x000000);
        // enemy3.setTint(0x000000);
        // enemy4.setTint(0x000000);
        // enemy5.setTint(0x000000);
        enemy1.destroy()
    }
    fired2(){
        life2 = false;
        enemy2.setTint(0x000000);
        // enemy2.setTint(0x000000);
        // enemy3.setTint(0x000000);
        // enemy4.setTint(0x000000);
        // enemy5.setTint(0x000000);
        enemy2.destroy()
    }
    fired3(){
        life3 = false;
        enemy3.setTint(0x000000);
        // enemy2.setTint(0x000000);
        // enemy3.setTint(0x000000);
        // enemy4.setTint(0x000000);
        // enemy5.setTint(0x000000);
        enemy3.destroy()
    }
    fired4(){
        life4 = false;
        enemy4.body.setTint(0x000000);
        // enemy2.setTint(0x000000);
        // enemy3.setTint(0x000000);
        // enemy4.setTint(0x000000);
        // enemy5.setTint(0x000000);
        enemy4.destroy()
    }
    fired5(){
        life5 = false;
        enemy5.setTint(0x000000);
        // enemy2.setTint(0x000000);
        // enemy3.setTint(0x000000);
        // enemy4.setTint(0x000000);
        // enemy5.setTint(0x000000);
        enemy5.destroy()
    }
    
}

export default Map01;
