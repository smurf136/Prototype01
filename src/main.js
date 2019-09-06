import 'phaser';
import Map01 from './scenes/Map01';
import test from './scenes/test';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 330,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            // gravity: {y:300}
        }
    },
    scene: [
        Map01,
        test
    ]
};

const game = new Phaser.Game(config);