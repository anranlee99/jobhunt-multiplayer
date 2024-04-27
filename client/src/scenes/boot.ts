import { Room, Client } from "colyseus.js";
import { BACKEND_URL } from "../backend";
import {setUpDiscordSdk } from "../utils/useAuth"

export class Boot extends Phaser.Scene {
    room: Room;
    constructor() {
        super('Boot');
    }



    preload() {
        this.load.path = "./assets/";
        this.load.image("titleScreen","jobhuntTitleScreen.png");
        this.load.image("loading", "TEMPloading.png");
    }

    async create() {
        this.scene.start('preloader');

        const connectionStatusText = this.add
            .text(0, 0, "Trying to connect with the server...")
            .setStyle({ color: "#ff0000" })
            .setPadding(4)

        const client = new Client(BACKEND_URL);
        try {

            const auth_obj = await setUpDiscordSdk();
            //pass in the auth obj once we define it 
            this.room = await client.joinOrCreate("part1_room", {
                deez: "nuts"

            });
            console.log("joined room");
            // connection successful!
            connectionStatusText.destroy();


        } catch (e) {
            // couldn't connect
            connectionStatusText.text = "Could not connect with the server.";
            console.log("failed to join room");
        }


        this.room.state.players.onAdd((player, sessionId) => {
            //replace with actual entity creation
            this.add.text(0, 0, `player id ${player} joined`);
            this.add.text(0, 20, "session id: " + sessionId);
        });

        // remove local reference when entity is removed from the server
        this.room.state.players.onRemove((player, sessionId) => {
            // const entity = this.playerEntities[sessionId];
            // if (entity) {
            //     entity.destroy();
            //     delete this.playerEntities[sessionId]
            // }
        });
    }
}
