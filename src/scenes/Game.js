import { Scene } from 'phaser';
// import nisha from 'assets/wombat.jpeg'

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {

        this.add.image(512, 384, 'level0_background')


        this.misha = this.physics.add.sprite(500, 500, 'misha');
        this.misha.setCollideWorldBounds(true);
        this.misha.setBounce(0.2);

        this.add.text(512, 384, 'Meet misha', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }
}
