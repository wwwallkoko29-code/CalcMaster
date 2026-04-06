function solveEquation() {
  const eqInput = document.getElementById("equation").value;
  const solutionDiv = document.getElementById("solution");
  solutionDiv.innerHTML = "";

  try {
    // فصل طرفي المعادلة
    const sides = eqInput.split("=");
    if(sides.length !== 2) throw "Equation must contain '='";

    const left = math.parse(sides[0]);
    const right = math.parse(sides[1]);

    // تحويل إلى صيغة x = ...
    const simplifiedEq = math.simplify(math.parse(`${sides[0]}-(${sides[1]})`));
    const solutions = math.solve(simplifiedEq, 'x');

    if(solutions.length === 0) {
      solutionDiv.innerHTML = "No solution found.";
    } else {
      solutionDiv.innerHTML = "Solution(s) step by step:\n";
      solutionDiv.innerHTML += `Original equation: ${eqInput}\n`;
      solutionDiv.innerHTML += `Simplified: ${simplifiedEq.toString()} = 0\n`;
      solutions.forEach((sol, index) => {
        solutionDiv.innerHTML += `x${index+1} = ${sol}\n`;
      });
    }
  } catch (err) {
    solutionDiv.innerHTML = "Error: " + err;
  }
}
