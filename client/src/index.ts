import Phaser from 'phaser';
import { Boot } from './scenes/boot'
import { MainMenu } from './scenes/mainmenu' 
import { Preloader } from './scenes/preloader';

import { BACKEND_HTTP_URL } from "./backend";

const config = {
    type: Phaser.AUTO,
    width: 1920, //window.innerWidth,
    height: 1080, //window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#a8d1f0',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
    ]
};

const game = new Phaser.Game(config);







const fpsInput = document.querySelector<HTMLInputElement>("input#fps");
const fpsValueLabel = document.querySelector<HTMLSpanElement>("#fps-value");
fpsValueLabel.innerText = fpsInput.value;

fpsInput.oninput = function(event: InputEvent) {
    const value = (event.target as HTMLInputElement).value;
    fpsValueLabel.innerText = value;

    // destroy previous loop
    game.loop.destroy();

    // create new loop
    game.loop = new Phaser.Core.TimeStep(game, {
        target: parseInt(value),
        forceSetTimeOut: true,
        smoothStep: false,
    });

    // start new loop
    game.loop.start(game.step.bind(game));
};

/**
 * Create latency simulation selector
 */
let fetchLatencySimulationInterval: number;

// latency simulation label
const latencyInput = document.querySelector<HTMLInputElement>("input#latency");

// if (latencyInput) {
//     // current latency label
//     const selectedLatencyLabel = document.querySelector<HTMLInputElement>("#latency-value")
//     selectedLatencyLabel.innerText = `${latencyInput.value} ms`;

//     latencyInput.onpointerdown = (event: PointerEvent) =>
//         clearInterval(fetchLatencySimulationInterval);

//     latencyInput.oninput = (event: InputEvent) =>
//         selectedLatencyLabel.innerText = `${latencyInput.value} ms`;

//     latencyInput.onchange = function (event: InputEvent) {
//         // request server to update its latency simulation
//         fetch(`${BACKEND_HTTP_URL}/simulate-latency/${latencyInput.value}`);

//         setIntervalFetchLatencySimulation();
//     };

//     function setIntervalFetchLatencySimulation() {
//         //
//         // Keep fetching latency simulation number from server to keep all browser tabs in sync
//         //
//         fetchLatencySimulationInterval = setInterval(() => {
//             fetch(`${BACKEND_HTTP_URL}/latency`)
//                 .then((response) => response.json())
//                 .then((value) => {
//                     latencyInput.value = value;
//                     latencyInput.oninput(undefined);
//                 });
//         }, 1000);
//     }
//     setIntervalFetchLatencySimulation();
// }