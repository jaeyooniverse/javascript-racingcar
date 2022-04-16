let inputCar = '';

let carNamesInput = document.querySelector('#car-names-input');

const handleInputCar = (event) => {
  inputCar = event.target.value;
};
carNamesInput.addEventListener('input', handleInputCar);

const checkInputCar = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].length > 5) {
      return false;
    }
  }

  return true;
};

let cars = [];

const handleClickCar = (event) => {
  event.preventDefault();

  cars = inputCar.split(',');

  if (checkInputCar(cars)) {
    racingCountInput.focus();
  } else {
    alert('입력창을 확인해주세요!');
  }
};
document
  .querySelector('#car-names-submit')
  .addEventListener('click', handleClickCar);

let inputCount = 0;

let racingCountInput = document.querySelector('#racing-count-input');

const handleInputCount = (event) => {
  inputCount = event.target.value; // html input type이 number이므로 문자열 입력은 되지 않을뿐더러, 문자가 아닌 숫자로 저장된다.
};
racingCountInput.addEventListener('input', handleInputCount);

let carsCount = [];

// count 저장 받았으니, count만큼 시도하는 함수
// count만큼 배열 요소 하나 하나 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우 전진, 아니면 그냥 가만히

let logs = document.querySelector('#logs');

const play = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (Math.floor(Math.random() * 10) >= 4) {
      array[i] += 1;
    }
  }

  for (let i = 0; i < array.length; i++) {
    logs.innerHTML += `${cars[i]}:${'-'.repeat(array[i])}<br/>`;
  }
};

const winner = document.querySelector('#racing-winners');

const findWinner = (array) => {
  winner.innerHTML = '';
  let winnerCount = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] >= winnerCount) {
      winnerCount = array[i];
    }
  }

  const winners = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i] === winnerCount) {
      winners.push(cars[i]);
    }
  }

  const winnersString = winners.join(', ');
  winner.innerHTML = `${winnersString}`;
};

const reset = () => {
  inputCar = '';
  cars = [];
  inputCount = 0;
  carsCount = [];
  carNamesInput.value = '';
  racingCountInput.value = '';
  carNamesInput.focus();
};

const handleClickCount = (event) => {
  event.preventDefault();

  logs.innerHTML = '';

  for (let i = 0; i < cars.length; i++) {
    carsCount.push(0);
  }

  for (let i = 0; i < inputCount; i++) {
    play(carsCount);
    logs.innerHTML += `<br/>`;
  }

  findWinner(carsCount);
  reset();
};
document
  .querySelector('#racing-count-submit')
  .addEventListener('click', handleClickCount);
