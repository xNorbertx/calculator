//SET EVENT HANDLERS
$(function() {
  C.active = 'first';
  C.display = $(".display-val");
  $(".number").click(function() {
    C.set(this.value);
  });
  $("#clear").click(function() {
    C.clear();
  });
  $("#reverse").click(function() {
    C.reverse();
  });
  $("#percentage").click(function() {
    C.percentage();
  });
  $("#calc").click(function() {
    C.calculate();
  });
  $(".ops").click(function() {
    C.op(this.value);
  });
})

//MODULE OBJECT
const C = (function() {
  var first,
      operation,
      second,
      prev,
      active,
      display;

  ///HELPER FUNCTIONS
  function getNumberBasedOnActive() {
    if ( C.active === 'first') {
      return C.first;
    } else {
      return C.second;
    }
  }

  function setNumberBasedOnActive(res) {
    if ( C.active === 'first') {
      C.first = res;
    } else {
      C.second = res;
    }
  }

  function setClearButton(val) {
    $("#clear").val(val);
  }

  function numToString(num) {
    return num.toString().replace(".",",");
  }

  function stringToNum(str) {
    return parseFloat(str.replace(",","."))
  }

  ///MAIN FUNCTIONS
  function setNumber(val) {
    var res;
    setClearButton("C");
    if (val === "," && this.prev) {
      res = "0" + val;
    } else if ((this.display.text() === "0" && val !== ",") || this.prev) {
      res = val;
    } else {
      res = this.display.text() + val;
    }
    setNumberBasedOnActive(stringToNum(res));
    this.prev = null;
    this.display.text(res);
  }
  
  function arithmeticOperation(val) {
    this.operation = val;
    this.prev = 'arit';
    this.active = 'second';
  }
  
  function reverseAbsolute() {
    var res = stringToNum(this.display.text());
    res = -res;
    setNumberBasedOnActive(res);
    this.display.text(numToString(res));
  }

  function calculatePercentage() {
    var res = getNumberBasedOnActive();
    res / 100;
    setNumberBasedOnActive(res);
    this.display.text(numToString(res));
  }
  
  function calculate() {
    this.prev = 'calc';
    if (this.operation) {
      var res;
      switch (this.operation) {
        case '+':
          res = this.first + this.second;
          break;
        case '-':
          res = this.first - this.second;
          break;
        case 'x':
          res = this.first * this.second;
          break;
        case '/':
          res = this.first / this.second;
          break;
        default:
          res = 0;
          break;
      }
      this.first = res;
      this.active = 'first';
      this.display.text(numToString(res));   
    }
  }

  function cleardisplay() {
    setClearButton("AC");
    this.first = null;
    this.operation = null;
    this.second = null;
    this.prev = null;
    this.active = 'first';
    this.display.text("0");
  }
  
  return {
    set: setNumber,
    clear: cleardisplay,
    op: arithmeticOperation,
    reverse: reverseAbsolute,
    calculate: calculate,
    percentage: calculatePercentage
  }
}());