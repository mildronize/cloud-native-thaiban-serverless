import './style.css';
import * as signalR from '@microsoft/signalr';

export async function setup() {
  let counter = 0;
  const connectingMessage = document.querySelector<HTMLDivElement>('#connecting-message')!;
  const counterElement = document.querySelector<HTMLSpanElement>('#counter')!;

  const fireConfetti = async () => {
    window.dispatchEvent(new Event('fireConfetti'));
  };

  // fireButton.addEventListener('click', () => fireConfetti());

  const apiBaseUrl = 'https://thadaw-thaiban-api.azurewebsites.net';

  const connection = new signalR.HubConnectionBuilder()
    .withUrl(apiBaseUrl + '/api')
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection.on('newMessage', message => {
    console.log(`newMessage: ${message}`);
    fireConfetti();
    counter ++;
    counterElement.innerHTML = `${counter}`;
  });

  try {
    await connection.start();
    connectingMessage.style.display = 'none';
  } catch (err) {
    const message = 'Connection failed. Retrying...';
    connectingMessage.innerHTML = message;
    console.log(message, err);
    setTimeout(() => setup(), 5000);
  }
}

setup();
