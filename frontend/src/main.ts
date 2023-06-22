import './style.css';
import './table.css';
import * as signalR from '@microsoft/signalr';
// import { loadConfettiPreset } from "tsparticles-preset-confetti";
// import { tsParticles } from "tsparticles-engine";

export async function setup() {
  const fireButton = document.querySelector<HTMLButtonElement>('#fireButton')!;

  const fireConfetti = async () => {
    window.dispatchEvent(new Event('fireConfetti'));
  };

  fireButton.addEventListener('click', () => fireConfetti());

  const apiBaseUrl = 'https://thadaw-thaiban-api.azurewebsites.net';

  const connection = new signalR.HubConnectionBuilder()
    .withUrl(apiBaseUrl + '/api')
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection.on('newMessage', message => {
    console.log(`newMessage: ${message}`);
  });

  connection.start().catch(console.error);
}

setup();
