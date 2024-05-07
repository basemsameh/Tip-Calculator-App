let bill = document.querySelector('input');
let tip = document.querySelector('.btns').children;
let numPeople = document.querySelector('[name="num-people"]');
let wrong = document.querySelector('span');
let tipAmount = document.querySelectorAll('span')[1];
let total = document.querySelectorAll('span')[2];
let reset = document.querySelector('[type="reset"');

document.forms[0].onsubmit = (e) => {
  e.preventDefault();
}

let testBill = '';
let testTip = '';
let testPeople = '';

bill.onblur = () => {
  testBill = bill.value;
  sessionStorage.setItem('bill', testBill);
}

testBill = sessionStorage.getItem('bill');
bill.value = testBill;

Array.from(tip).forEach(ele => {
  ele.onclick = () => {
    // The backGround color of the button that clicked
    Array.from(tip).forEach(e => {
      if (e.classList.contains('active')) {
        e.classList.remove('active');
        e.style.color = '#fff';
        e.style.backgroundColor = '#00494d';
      }
      ele.classList.add('active');
      ele.style.color = '#00494d';
      ele.style.backgroundColor = '#22c0a7';
    })
    // When click on the custom button 
    if (ele.id === 'custom') {
      ele.value = 0;
      ele.style.cssText = 'background-color:#f4fafa; outline:1px solid #22c0a7; text-align:right;';
      ele.onblur = () => {
        testTip = (+ele.value / 100).toFixed(2);
        sessionStorage.setItem('tip', testTip);
      }
    }
    else {
      testTip = (+ele.textContent.slice(0, ele.textContent.indexOf('%')) / 100).toFixed(2);
      sessionStorage.setItem('tip', testTip);
    }
  }
})

testTip = sessionStorage.getItem('tip');
tip.value = testTip;

numPeople.onblur = () => {
  if (+numPeople.value !== 0) {
    testPeople = +numPeople.value;
    sessionStorage.setItem('people', testPeople);
    // Calculate Tip Amount and Total
    tipAmount.textContent = (testBill * testTip / testPeople).toFixed(2);
    total.textContent = (testBill / testPeople + +tipAmount.textContent).toFixed(2);
    // Reset Button Style After Results
    reset.className = 'hover';
    reset.style.cssText = 'background-color:#22c0a7; cursor:pointer;';
  }
  else {
    numPeople.style.border = '1px solid red';
    wrong.textContent = `Can't be zero`;
  }
}

numPeople.onfocus = () => {
  numPeople.style.border = 'none';
  wrong.textContent = ``;
}

testPeople = sessionStorage.getItem('people');
numPeople.value = testPeople;

// Reset Button when clicked
reset.onclick = e => {
  if (reset.style.backgroundColor === 'rgb(34, 192, 167)') {
    sessionStorage.clear();
    window.location.reload();
  }
  else {
    e.preventDefault();
    reset.classList.remove('hover');
  }
}