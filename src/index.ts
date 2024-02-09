/** @format */
import { AmazonApp } from './AmazonApp';

const app = new AmazonApp();

// @ts-ignore
window.app = app;

window.onload = () => {
  console.table(app);
  const node = document.getElementById('root');
  if (node) {
    node.innerHTML = `<h1>Welcome ${app.name}</h1>`;
  } else throw new Error('Root element not found');
};
