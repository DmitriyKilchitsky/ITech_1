/*Определение основных переменных */
let params = window.location.search.split('&').map((item) => {
  return item.split('=')[1];
});
let currentValue = Number(params[0]);
let previousValue = currentValue;
let inputLineValue = Number(document.getElementById('seconds').value);
let isRunning = false;
let timerId;

if (currentValue && Notification.permission === 'granted') {
  /*Есть get-параметр*/
  startTimer();
}

/*Обработчик события change, для установки значения inputLineValue*/
document.getElementById('seconds').addEventListener('change', () => {
  inputLineValue = Number(document.getElementById('seconds').value);
});

/*Обработчик события click, для начала работы таймера*/
document.getElementById('btn-start').addEventListener('click', () => {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted' && isRunning === false) {
      if (currentValue) {
        /*Таймер стоит на паузе*/
        startTimer();
      } else if (inputLineValue) {
        /*Если таймер только что закончил работу или был отменен, при этом значение inputLineValue валидно*/
        currentValue = inputLineValue;
        previousValue = inputLineValue;
        startTimer();
      } else {
        console.log('Значение отсутствует, либо введено некоректно!');
      }
    } else if (permission === 'denied') {
      document.getElementById('timer').innerHTML = 'Denied permission!';
      document.title = 'Denied permission!';
    }
  });
});

/*Обработчик события click, для приостановки работы таймера*/
document.getElementById('btn-pause').addEventListener('click', () => {
  if (isRunning) {
    isRunning = false;
    clearTimeout(timerId);
  }
});

/*Обработчик события click, для отмены работы таймера*/
document.getElementById('btn-cancel').addEventListener('click', () => {
  currentValue = null;
  isRunning = false;
  document.getElementById('timer').innerHTML = '00:00:00';
  document.title = '00:00:00';
  clearTimeout(timerId);
});

/*Обработчик события click, для прекращения работы*/
document.getElementById('btn-exit').addEventListener('click', () => {
  document.getElementById('modal').innerHTML = 'Bye!';
});

/*Обработчик события click, для повторного запуска таймера*/
document.getElementById('btn-restart').addEventListener('click', () => {
  document.getElementById('manage-timer').style.display = 'block';
  document.getElementById('modal').style.display = 'none';
  currentValue = previousValue;
  startTimer();
});

/*Таймер*/
function startTimer() {
  isRunning = true;

  let hours = Math.floor((currentValue % (60 * 60 * 24)) / (60 * 60));
  let minutes = Math.floor((currentValue % (60 * 60)) / 60);
  let seconds = Math.floor(currentValue % 60);
  let result = getStringForTimer([hours, minutes, seconds]);

  document.getElementById('timer').innerHTML = result;
  document.title = result;

  if (currentValue > 0) {
    currentValue--;
    timerId = setTimeout(startTimer, 1000);
  } else {
    isRunning = false;
    document.getElementById('manage-timer').style.display = 'none';
    document.getElementById('modal').style.display = 'block';
    raiseNotification();
  }
}

/*Формируем строку с оставшимся временем, для записи в элемент*/
function getStringForTimer(arr) {
  let str = '';

  for (let elem of arr) {
    if (elem < 10) {
      str += '0';
    }
    str += elem + ':';
  }
  return str.slice(0, -1);
}

/*Вызов уведомления*/
function raiseNotification() {
  let title = params[1];
  if (!title) {
    title = 'Wake up!';
  }

  new Notification(title, {
    body: "It's time to work.",
    icon: 'https://img.icons8.com/windows/32/000000/sms--v2.png',
  });
}
