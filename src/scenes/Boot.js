import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('level0_background', 'assets/level0_background.jpeg');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('invisible_platform', 'assets/invisibleBottom.png');
        this.load.spritesheet('misha', 'assets/wombat.png', { frameWidth: 128, frameHeight: 90 });
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
