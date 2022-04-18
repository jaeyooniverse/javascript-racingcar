let inputCar = '';

let carNamesInput = document.querySelector('#car-names-input');

const handleInputCar = (event) => {
  inputCar = event.target.value;
};
carNamesInput.addEventListener('input', handleInputCar);

const checkInputCar = (array) => {
  for (let i = 0; i < array.length; i++) {
    // 자동차 이름이 5자 이상을 넘어가거나 공백이면 재입력
    if (array[i].length > 5 || array[i].length === 0) {
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
    racingCountInput.focus(); // 자동차 이름을 올바르게 입력했으면 focus를 racing-count-input으로 변경
  } else {
    alert('입력창을 확인해주세요!');
    cars = [];
  }
};
document
  .querySelector('#car-names-submit')
  .addEventListener('click', handleClickCar);

let inputCount = 0;

let racingCountInput = document.querySelector('#racing-count-input');

const handleInputCount = (event) => {
  inputCount = event.target.value; // html input type이 number이므로 문자열 입력은 되지 않을뿐더러, 문자가 아닌 숫자로 저장
};
racingCountInput.addEventListener('input', handleInputCount);

let carsCount = [];

let logs = document.querySelector('#logs');

const play = (array) => {
  /*
   * 전진 조건은 0부터 9사이에서 무작위 값을 구한 후 무작위 값이 4 이상인 경우 전진
   * 자동차 전진 횟수를 배열로 받아 전진하면 횟수를 1 증가
   */
  for (let i = 0; i < array.length; i++) {
    if (Math.floor(Math.random() * 10) >= 4) {
      array[i] += 1;
    }
  }

  // 매 게임 실행 결과를 출력해야 하므로 반복문을 통해 실행 결과를 출력
  for (let i = 0; i < array.length; i++) {
    logs.innerHTML += `${cars[i]}:${'-'.repeat(array[i])}<br/>`; // repeat()을 통해 '-'를 여러번 표현
  }
};

const winner = document.querySelector('#racing-winners');

const findWinner = (array) => {
  winner.innerHTML = '';
  let winnerCount = 0;

  // 자동차 전진 횟수 배열에서 우승한 자동차의 전진 횟수를 저장
  for (let i = 0; i < array.length; i++) {
    if (array[i] >= winnerCount) {
      winnerCount = array[i];
    }
  }

  const winners = [];

  // 공동 우승이 있을 수 있으므로 가장 많이 전진한 자동차들을 우승자들 배열에 저장
  for (let i = 0; i < array.length; i++) {
    if (array[i] === winnerCount) {
      winners.push(cars[i]);
    }
  }

  const winnersString = winners.join(', ');
  winner.innerHTML = `${winnersString}`;
};

// 결과를 출력하고 모든 정보를 초기화하는 함수
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

  // 자동차 수만큼 자동차들의 전진 횟수를 저장할 배열에 0을 넣어준다.
  for (let i = 0; i < cars.length; i++) {
    carsCount.push(0);
  }

  // 입력한 시도 횟수만큼 게임을 실행
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
