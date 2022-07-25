export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export function randomInt(max) {
  return Math.floor(Math.random() * max);
}

export function randomIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1))+ min;
}

export function randomFloat(max) {
  return Math.random() * max;
}

export function randomColor() {
  return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}