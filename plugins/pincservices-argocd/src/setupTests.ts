import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';

// @ts-ignore
window.HTMLCanvasElement.prototype.getContext = () => {};
