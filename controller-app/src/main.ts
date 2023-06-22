import './style.css';

const apiBaseUrl = 'https://thadaw-thaiban-api.azurewebsites.net';

export async function setup() {
  const fireButton = document.querySelector<HTMLButtonElement>('#fireButton')!;

  const fireConfetti = async () => {
    await fetch(`${apiBaseUrl}/api/fire`);
  };

  fireButton.addEventListener('click', () => fireConfetti());
}

setup();
