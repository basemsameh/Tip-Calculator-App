let bill = document.querySelector('input');
let tips = document.querySelector('.btns').children;
let numPeople = document.querySelector('[name="num-people"]');
let wrong = document.querySelector('span');
let tipAmount = document.querySelectorAll('span')[1];
let total = document.querySelectorAll('span')[2];
let reset = document.querySelector('[type="reset"');

let testBill = '';
let testTip = '';
let testPeople = '';

bill.onblur = () => {
  testBill = bill.value;
  check();
}

Array.from(tips).forEach(ele => {
  ele.onclick = () => {
    Array.from(tips).forEach(e => {
      if (e.classList.contains('active')) {
        e.classList.remove('active');
      }
      ele.classList.add('active');
    })
    // If element is custom button 
    if (ele.id === 'custom') {
      ele.value = 0;
      ele.classList.add('active');
      ele.onblur = () => {
        ele.classList.remove('active');
        testTip = (+ele.value / 100).toFixed(2);
        check();
      }
    }
    else {
      testTip = (+ele.textContent.slice(0, ele.textContent.indexOf('%')) / 100).toFixed(2);
      check();
    }
  }
})

numPeople.onblur = () => {
  if (+numPeople.value !== 0) {
    testPeople = +numPeople.value;
    wrong.classList.remove('show');
    check();
  }
  else {
    numPeople.style.border = '1px solid red';
    wrong.classList.add('show');
  }
}

numPeople.onfocus = () => {
  numPeople.style.border = 'none';
}

function check() {
  if (testBill.length != 0 && testPeople.length != 0 && testTip.length != 0) {
    // Calculate Tip Amount and Total
    tipAmount.textContent = (testBill * testTip / testPeople).toFixed(2);
    total.textContent = (testBill / testPeople + +tipAmount.textContent).toFixed(2);
    // Reset Button Style After Results
    reset.disabled = false;
    reset.classList.add('active');
  }
}

reset.onclick = () => {
  window.location.reload();
};