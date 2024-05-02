export class MainMenu extends Phaser.Scene {

    constructor() {
        super("mainmenu");
    }

    create(data) {
        this.cameras.main.setAlpha(0);
        const width = this.game.config.width as number;
        const height = this.game.config.height as number;

       // display map image
       let mapCenterX =  width * 0.6
       let mapCenterY =  height * 0.5
       let mapScale = 0.7
       let map = this.add.image(mapCenterX, mapCenterY, 'map').setOrigin(0.5).setScale(mapScale)

       // add map buttons -- TODO:: set interactive
       let star1 = this.add.image( width * 0.63,  height * 0.48, 'star')
       star1.setOrigin(0.5).setScale(0.15).setInteractive()
       let star2 = this.add.image( width * 0.44,  height * 0.41, 'star')
       star2.setOrigin(0.5).setScale(0.15).setInteractive()

       this.add.text( width * 0.65,  height * 0.48, 'AI interviewer mode', {
           font: '40px Arial',
           color: '#000000'
       });

       star1.on('pointerover', () => star1.setScale(0.2))
       star1.on('pointerout', () => star1.setScale(0.15))
       star1.on('pointerdown', () => {
           this.scene.transition({
               target: 'interview',
               duration: 1000,
               moveBelow: true,
               data: {transitionEffect: { duration: 2000 }},
               onUpdate: this.transitionOut,
           });
       })

       // init graphics
       let graphics = this.add.graphics();
       let shapeColor = 0xC3DAFC
       let outlineColor = 0x5798DC
       let cornerRadius = 20
       graphics.fillStyle(shapeColor, 1);
       graphics.lineStyle(5, outlineColor, 1);

       // settings button --- TODO:: set interactive
       let settings = this.add.image( width * 0.97,  height * 0.05, 'settings')
       settings.setScale(0.15)

       // "select mode" title
       let selectWidth =  width * 0.3
       let selectHeight = selectWidth * 0.1
       let selectX = mapCenterX - selectWidth/2
       let selectCenterY =  height * 0.12
       let selectY = selectCenterY - selectHeight/2

       graphics.fillRoundedRect(selectX, selectY, selectWidth, selectHeight, cornerRadius)
       graphics.strokeRoundedRect(selectX, selectY, selectWidth, selectHeight, cornerRadius)

       this.add.text(mapCenterX, selectCenterY, 'Select Mode', {
           font: '30px Arial', color: "#000000"
       }).setOrigin(0.5).setFontSize(selectHeight * 0.6);

       // players tab
       let mapStart = mapCenterX - (map.width * mapScale)/2     // center - midpoint of (width * scale)
       let playerCenterX = (0 + mapStart)/2
       let playerWidth =  width * 0.2
       let playerHeight =  height * 0.8
       let playerX = playerCenterX - playerWidth/2
       let playerY = mapCenterY - playerHeight/2

       graphics.fillRoundedRect(playerX, playerY, playerWidth, playerHeight, cornerRadius)
       graphics.strokeRoundedRect(playerX, playerY, playerWidth, playerHeight, cornerRadius)

       
       // player text -- TODO: SET INTERACTIVE
       let playerTextY = playerY + selectHeight * 0.6
       let players = this.add.text(playerCenterX, playerTextY, 'Players (1)', {
           font: '30px Arial', color: '#000000'
       }).setOrigin(0.5).setFontSize(selectHeight * 0.6);
       
       // singular player boxes
       let boxesWidth = playerWidth * 0.9
       let boxesX = playerCenterX - boxesWidth/2
       graphics.fillStyle(0x5798DC, 1)
       for(let i = 0; i < 10; i++) {
           graphics.fillRoundedRect(boxesX, selectCenterY + selectHeight + (i * selectHeight * 1.25), boxesWidth, selectHeight, cornerRadius)
       }

       // spectate tab
       let spectateCenterX =  width * 0.87
       let spectateCenterY =  height * 0.93
       let spectateWidth =  width * 0.23
       let spectateHeight =  height * 0.08
       let spectateX = spectateCenterX - spectateWidth/2
       let spectateY = spectateCenterY - spectateHeight/2

       graphics.fillStyle(shapeColor, 1)
       graphics.fillRoundedRect(spectateX, spectateY, spectateWidth, spectateHeight, cornerRadius)
       graphics.strokeRoundedRect(spectateX, spectateY, spectateWidth, spectateHeight, cornerRadius)

       // buttons near spectate tab -- TODO:: add text & set interactive
       let plusButtonWidth = spectateWidth * 0.15
       let plusButtonX = spectateX - plusButtonWidth * 0.5
       graphics.fillStyle(outlineColor, 1)
       graphics.fillRoundedRect(plusButtonX, spectateY, plusButtonWidth, spectateHeight, cornerRadius)
       graphics.strokeRoundedRect(plusButtonX, spectateY, plusButtonWidth, spectateHeight, cornerRadius)

       // eye symbol
       let eyeRadius = spectateHeight/2
       graphics.fillCircle(plusButtonX - eyeRadius * 1.2, spectateY + eyeRadius, eyeRadius)
       let eye = this.add.text(plusButtonX - eyeRadius * 1.2, spectateY + eyeRadius, '👁️', {
           font: '40px Arial'
       }).setOrigin(0.5)

       // bots tab -- TODO: add text & set interactive
       let botsX = mapStart
       graphics.fillRoundedRect(botsX, spectateY,  width * 0.1, spectateHeight, cornerRadius)
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

    transitionOut(progress) {
        this.cameras.main.setAlpha(1 - progress);
    }
}