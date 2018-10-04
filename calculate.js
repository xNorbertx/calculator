var MODE;
var PREV_VAL;
var DISPLAY;

function set(val) {
	var displayField = $(".display-screen");
  if ((displayField.val() === "0" && val !== ",") || MODE) {
    DISPLAY = val;
  } else {
    DISPLAY = displayField.val() + val;
  }
	displayField.val(DISPLAY);
}

function cleardisplay() {
  $(".display-screen").val(0);
  MODE = null;
  PREV_VAL = null;
  DISPLAY = "0";
}

function action(val) {
  MODE = val;
  DISPLAY = $(".display-screen").val();
  if (DISPLAY) {
    DISPLAY = DISPLAY.replace(",", ".");
    PREV_VAL = parseFloat(DISPLAY);
  }
}

function reverseAbsolute() {
  var res = parseFloat(DISPLAY.replace(",", "."));
  res = -res;
  DISPLAY = res.toString();
  $(".display-screen").val(DISPLAY);
}

function calculate() {
  if (PREV_VAL && MODE) {
    var res;
    switch (MODE) {
      case 'add':
        res = PREV_VAL + parseFloat(DISPLAY);
        break;
      case 'subtract':
        res = PREV_VAL - parseFloat(DISPLAY);
        break;
      case 'multiply':
        res = PREV_VAL * parseFloat(DISPLAY);
        break;
      case 'divide':
        res = PREV_VAL / parseFloat(DISPLAY);
        break;
      case 'percentage':
        res = parseFloat(DISPLAY) / 100;
        break;
      default:
        res = 0;
        break;
    }
    DISPLAY = res.toString().replace(".", ",");
    $(".display-screen").val(DISPLAY);
  }
}
