export class Interview extends Phaser.Scene {
    constructor() {
        super('interview');
    }

    create(data) {
        this.cameras.main.setAlpha(0);
        const width = this.game.config.width as number;
        const height = this.game.config.height as number;

        // image placement
        let battleCenterX = width * 0.5
        let battleCenterY = height * 0.5
        let battleScale = 0.7
        let battle = this.add.image(battleCenterX, battleCenterY, 'battle1').setOrigin(0.5).setScale(battleScale)

        // init graphics
        let graphics = this.add.graphics()
        let shapeColor = 0xC3DAFC
        let outlineColor = 0x5798DC
        let cornerRadius = 20
        graphics.fillStyle(shapeColor, 1);
        graphics.lineStyle(5, outlineColor, 1);

        // "interview" title
        let titleWidth = width * 0.3
        let titleHeight = titleWidth * 0.1
        let titleX = battleCenterX - titleWidth/2
        let titleCenterY = height * 0.12
        let titleY = titleCenterY - titleHeight/2

        graphics.fillRoundedRect(titleX, titleY, titleWidth, titleHeight, cornerRadius)
        graphics.strokeRoundedRect(titleX, titleY, titleWidth, titleHeight, cornerRadius)

        this.add.text(battleCenterX, titleCenterY, 'Interview', {
            font: '30px Arial', color: '#000000'
        }).setOrigin(0.5).setFontSize(titleHeight * 0.6);

        if (data.transitionEffect) {
            this.tweens.add({
                targets: this.cameras.main,
                alpha: 1,
                duration: data.transitionEffect.duration,
                ease: 'Linear'
            });
        }
    }
}