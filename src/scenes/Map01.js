let bg01;
let iter = 0;

class Map01 extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'Map01'
        });
    }

    preload() {
        this.load.image('bg01', 'src/assets/images/desert-backgorund-looped.png')
    }

    create() {
        // bg01 = this.add.tileSprite(100, 50, 600, 1000, 'bg01')
        bg01 = this.add.tileSprite(620,300,800,600,'bg01').setScale(2)
    }

    update() {
        bg01.tilePositionY = -iter * 400;
        iter += 0.005
    }
}

export default Map01;
