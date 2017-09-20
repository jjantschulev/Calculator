var resultP = document.querySelector("#result p");
var resultBox = document.querySelector("#result");

var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
var operations = ["+", "-", "×", "÷", "(", ")", "*", "/"];

var buttons = document.getElementsByClassName("button");

var equation = "";

for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    buttonClicked(this.innerHTML);
  }
}

function buttonClicked(value) {

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = "";
    buttons[i].style.color = "";
  }

  if (numbers.indexOf(value) != -1) {
    //  && numbers.indexOf(resultP.innerHTML.slice(-1)) != -1
    // value is a number
    resultP.innerHTML += value;
    equation += value;
  } else if (operations.indexOf(value) != -1) {
    //value is an operation sign
    if (value == "×") {
      resultP.innerHTML += value;
      equation += "*";
    } else if (value == "÷") {
      resultP.innerHTML += value;
      equation += "/";
    } else {
      resultP.innerHTML += value;
      equation += value;
    }

    if (["+", "-", "×", "÷"].indexOf(value) != -1) {
      for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].innerHTML == value) {
          buttons[i].style.backgroundColor = "#fa0";
          buttons[i].style.color = "#000";
        }
      }
    }

    //clearing mode:
    resultP.innerHTML = "";
  }

  if (value == "DEL") {
    if (resultP.innerHTML.length > 0) {
      resultP.innerHTML = resultP.innerHTML.slice(0, -1);
    }
    if (equation.length > 0) {
      equation = equation.slice(0, -1);
    }
  }
  if (value == "AC") {
    clear();
  }
  resultBox.scrollLeft = resultBox.scrollWidth;

  if (value == "=") {
    solve();
  }


}

function clear() {
  equation = "";
  resultP.innerHTML = "";
}

function solve() {
  if (equation.length > 0) {
    console.log(equation);
    try {
      var ans = eval(equation)
      ans = ans.toFixed(9);
      ans = ans.toString();
      ans = Number(ans);
      resultP.innerHTML = ans;
      equation = ans.toString();
      console.log(equation);
    } catch (e) {
      resultP.innerHTML = "Syntax Error";
      if (e instanceof SyntaxError) {
        console.log(e.message);
        if (e.message == "Unexpected end of input") {
          equation += ")";
          solve();
        } else {
          equation = "";
        }
      } else {
        equation = "";
      }
    }
  }


}
