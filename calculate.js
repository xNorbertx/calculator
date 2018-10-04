$(".btn").on("click", function() {
  $(".display-screen").attr('class', tmp + ' blip');
});

var tmp = "display-screen";
var DISPLAY;
var CALCULATION = {
  first: null,
  operation: null,
  second: null,
  prev: null,
  active: null
};

function setCalculation(val) {
  if (CALCULATION.active === 'first') {
    CALCULATION.first = parseFloat(val.replace(",", "."));
  } else {
    CALCULATION.second = parseFloat(val.replace(",", "."));
  }
}

function setNumber(val) {
	var displayField = $(".display-screen");
  $("#clear").val("C");
  if (val === "," && CALCULATION.prev) {
    DISPLAY = "0" + val;
  } else if (displayField.val() === "0" && val !== ","
      || CALCULATION.prev === 'arit'
      || CALCULATION.prev === 'calc') {
    DISPLAY = val;
  } else {
    DISPLAY = displayField.val() + val;
  }
  setCalculation(DISPLAY);
  CALCULATION.prev = null;
	displayField.val(DISPLAY);
}

function cleardisplay() {
  $(".display-screen").val(0);
  $("#clear").val("AC");
  DISPLAY = "0";
  CALCULATION.first = null;
  CALCULATION.operation = null;
  CALCULATION.second = null;
  CALCULATION.prev = null;
  CALCULATION.active = 'first';
}

function arithmeticOperation(val) {
  CALCULATION.operation = val;
  CALCULATION.prev = 'arit';
  CALCULATION.active = 'second';
}

function reverseAbsolute() {
  var res = parseFloat(DISPLAY.replace(",", "."));
  res = -res;
  if ( CALCULATION.active === 'first') {
    CALCULATION.first = res;
  } else {
    CALCULATION.second = res;
  }
  DISPLAY = res.toString().replace(".", ",");
  $(".display-screen").val(DISPLAY);
}

function calculate() {
  CALCULATION.prev = 'calc';
  if (CALCULATION.operation) {
    var res;
    switch (CALCULATION.operation) {
      case 'add':
        res = CALCULATION.first + CALCULATION.second;
        break;
      case 'subtract':
        res = CALCULATION.first - CALCULATION.second;
        break;
      case 'multiply':
        res = CALCULATION.first * CALCULATION.second;
        break;
      case 'divide':
        res = CALCULATION.first / CALCULATION.second;
        break;
      default:
        res = 0;
        break;
    }
    CALCULATION.first = res;
    CALCULATION.active = 'first';
    DISPLAY = res.toString().replace(".", ",");
    $(".display-screen").val(DISPLAY);
  }
}

function calculatePercentage() {
  var res;
  if ( CALCULATION.active === 'first') {
    res = CALCULATION.first / 100
    CALCULATION.first = res;
  } else if ( CALCULATION.active === 'second' ){
    res = CALCULATION.second / 100;
    CALCULATION.second = res;
  }
  DISPLAY = res.toString().replace(".", ",");
  $(".display-screen").val(DISPLAY);
}
