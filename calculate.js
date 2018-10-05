var DISPLAY;
var C = {
  first: null,
  operation: null,
  second: null,
  prev: null,
  active: null
};

function setCalculation(val) {
  if (C.active === 'first') {
    C.first = parseFloat(val.replace(",", "."));
  } else {
    C.second = parseFloat(val.replace(",", "."));
  }
}

function setNumber(val) {
  var displayField = $(".display-screen");
  displayField.stop(true).animate({
    fontSize: '0px'
  }, 20, 'linear', function() {
    displayField.css('font-size', 'xx-large');
  });
  $("#clear").val("C");
  if (val === "," && C.prev) {
    DISPLAY = "0" + val;
  } else if (displayField.val() === "0" && val !== ","
      || C.prev === 'arit'
      || C.prev === 'calc') {
    DISPLAY = val;
  } else {
    DISPLAY = displayField.val() + val;
  }
  setCalculation(DISPLAY);
  C.prev = null;
	displayField.val(DISPLAY);
}

function cleardisplay() {
  $(".display-screen").val(0);
  $("#clear").val("AC");
  DISPLAY = "0";
  C.first = null;
  C.operation = null;
  C.second = null;
  C.prev = null;
  C.active = 'first';
}

function arithmeticOperation(val) {
  C.operation = val;
  C.prev = 'arit';
  C.active = 'second';
}

function reverseAbsolute() {
  var res = parseFloat(DISPLAY.replace(",", "."));
  res = -res;
  if ( C.active === 'first') {
    C.first = res;
  } else {
    C.second = res;
  }
  DISPLAY = res.toString().replace(".", ",");
  $(".display-screen").val(DISPLAY);
}

function calculate() {
  C.prev = 'calc';
  if (C.operation) {
    var res;
    switch (C.operation) {
      case 'add':
        res = C.first + C.second;
        break;
      case 'subtract':
        res = C.first - C.second;
        break;
      case 'multiply':
        res = C.first * C.second;
        break;
      case 'divide':
        res = C.first / C.second;
        break;
      default:
        res = 0;
        break;
    }
    C.first = res;
    C.active = 'first';
    DISPLAY = res.toString().replace(".", ",");
    $(".display-screen").val(DISPLAY);
  }
}

function calculatePercentage() {
  var res;
  if ( C.active === 'first') {
    res = C.first / 100
    C.first = res;
  } else if ( C.active === 'second' ){
    res = C.second / 100;
    C.second = res;
  }
  DISPLAY = res.toString().replace(".", ",");
  $(".display-screen").val(DISPLAY);
}
