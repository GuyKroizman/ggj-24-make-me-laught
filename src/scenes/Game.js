import {Scene} from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {

        this.add.image(512, 384, 'level0_background')

        const platforms = this.physics.add.staticGroup();
        platforms.create(500, 600, 'platform')
        platforms.create(800, 600, 'platform')
        platforms.create(200, 400, 'platform').setScale(1).refreshBody();

        this.misha = this.physics.add.sprite(500, 500, 'misha');
        this.misha.setScale(0.5);
        this.misha.setCollideWorldBounds(true);
        this.misha.setBounce(0.2);

        this.physics.add.collider(this.misha, platforms);

        const bottom = this.physics.add.staticGroup();
        bottom.create(500, 810, 'invisible_platform').setScale(9).refreshBody();
        const invisibleBottom = this.physics.add.collider(this.misha, bottom);
        invisibleBottom.visibe = false;

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('misha', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('misha', {start: 2, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.add.text(512, 384, 'Meet misha', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }

    update() {
        const cursor = this.input.keyboard.createCursorKeys();
        if (cursor.left.isDown) {
            this.misha.setVelocityX(-160);
            this.misha.anims.play('left', true);
        } else if (cursor.right.isDown) {
            this.misha.setVelocityX(160);
            this.misha.anims.play('right', true);
        } else {
            this.misha.setVelocityX(0);
        }

        if (cursor.up.isDown && this.misha.body.touching.down) {
            this.misha.setVelocityY(-200);
        }
    }
}
