let OutputText = document.getElementById("outputText");

function calculate() {
  let firstnumber = document.getElementById("fnumber").value;
  let secondNumber = document.getElementById("snumber").value;
  let mathpart = document.getElementById("MathValues").value;

  switch (mathpart) {
    case "+":
       OutputText.innerHTML = Number(firstnumber) + Number(secondNumber);
      break;

    case "-":
        OutputText.innerHTML = Number(firstnumber) - Number(secondNumber);
      break;

    case "*":
        OutputText.innerHTML = Number(firstnumber) * Number(secondNumber);
      break;

    case "/":
        OutputText.innerHTML = Number(firstnumber) / Number(secondNumber);
      break;
  }
}
