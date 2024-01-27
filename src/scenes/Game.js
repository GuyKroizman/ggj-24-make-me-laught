import {Scene} from 'phaser';
import Phaser from "phaser";

export class Game extends Scene {
    constructor() {
        super('Game');
        this.poopGroup = null;
        this.isFacingRight = false;
    }

    create() {

        this.poopGroup = new PoopGroup(this);

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

    update(time, delta) {
        const cursor = this.input.keyboard.createCursorKeys();
        if (cursor.left.isDown) {
            this.isFacingRight = false;
            this.misha.setVelocityX(-160);
            this.misha.anims.play('left', true);
        } else if (cursor.right.isDown) {
            this.isFacingRight = true;
            this.misha.setVelocityX(160);
            this.misha.anims.play('right', true);
        } else {
            this.misha.setVelocityX(0);
        }

        if(cursor.down.isDown) {
            this.poopGroup.shootPoop(this.isFacingRight, this.misha.x, this.misha.y);
        }

        if (cursor.up.isDown && this.misha.body.touching.down) {
            this.misha.setVelocityY(-200);
        }
    }
}

export class PoopGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: PoopSprite,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: "poop_bullet"
        })
    }

    shootPoop(isFacingRight, x, y) {
        const poop = this.getFirstDead(true);
        if (poop) {
            poop.shoot(isFacingRight, x, y);
        }
    }

}

export class PoopSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "poop_bullet");
    }

    shoot(isFacingRight, x, y) {
        this.body.setSize(24,24)
        this.body.reset(isFacingRight? x - 40: x + 40, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(-60);
        this.setVelocityX(isFacingRight ? -250 : 250);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}
