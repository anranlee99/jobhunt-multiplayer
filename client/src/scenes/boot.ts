import { Room, Client } from "colyseus.js";
import { BACKEND_URL } from "../backend";


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

        const msg = document.getElementById("msg")
        msg.innerHTML = "no status";
        msg.innerHTML = "backend url is " + BACKEND_URL;


        const connectionStatusText = this.add
            .text(0, 0, "Trying to connect with the server...")
            .setStyle({ color: "#ff0000" })
            .setPadding(4)

        const client = new Client(BACKEND_URL);
        msg.innerHTML = "created client";
        try {
            this.room = await client.joinOrCreate("part1_room", {
                deez: "nuts"

            });
            msg.innerHTML = "joined room";
            console.log("joined room");
            // connection successful!
            connectionStatusText.destroy();


        } catch (e) {
            // couldn't connect
            connectionStatusText.text = "Could not connect with the server.";
            msg.innerHTML = "failed to join room";
            console.log("failed to join room");
        }

        msg.innerHTML += "\n got past try catch"
    }
}