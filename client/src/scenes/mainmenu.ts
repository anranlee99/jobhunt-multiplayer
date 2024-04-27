export class MainMenu extends Phaser.Scene {

    constructor() {
        super("mainmenu");
    }

    create(data) {
        this.cameras.main.setAlpha(0);
        const width = this.game.config.width as number;
        const height = this.game.config.height as number;

        // display map image
        let map = this.add.image(width * 0.6, height * 0.5, 'map');
        map.setOrigin(0.5, 0.5)
        map.setScale(0.55)
        console.log(map)

        // init graphics
        let graphics = this.add.graphics();
        graphics.fillStyle(0xC3DAFC, 1);
        graphics.lineStyle(5, 0x5798DC, 1);

        // settings button
        let settings = this.add.image(width * 0.95, height * 0.05, 'settings')
        settings.setScale(0.15)

        // "select mode" title
        graphics.fillRoundedRect(600, height * 0.1, 500, 50, 20)
        graphics.strokeRoundedRect(600, height * 0.1, 500, 50, 20)

        let title = this.add.text(775, height * 0.1 + 10, 'Select Mode', {
            font: '30px Arial',
            color: '#000000'
        });

        // players tab
        graphics.fillRoundedRect(30, height * 0.05, 250, 700, 20)
        graphics.strokeRoundedRect(30, height * 0.05, 250, 700, 20)
        let players = this.add.text(75, height * 0.05 + 10, 'Players (1)', {
            font: '30px Arial',
            color: '#000000'
        });

        graphics.fillStyle(0x5798DC, 1)
        for (let i = 0; i < 10; i++) {
            graphics.fillRoundedRect(42, 120 + (i * 60), 225, 50, 20)
        }

        // spectate tab


        // bots tab


        // fade in
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