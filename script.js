// يجب التأكد أن مكتبة nerdamer محملة في index.html قبل هذا السكربت
// <script src="https://cdnjs.cloudflare.com/ajax/libs/nerdamer/1.1.13/nerdamer.core.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/nerdamer/1.1.13/Algebra.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/nerdamer/1.1.13/Calculus.min.js"></script>

function solveEquation() {
    const eqInput = document.getElementById("equation").value.trim();
    const solutionDiv = document.getElementById("solution");
    solutionDiv.innerHTML = "";

    if (!eqInput) {
        solutionDiv.innerHTML = "Please enter an equation first.";
        return;
    }

    try {
        // nerdamer.solveEquations يقبل المعادلة بصيغة "2*x+5=15"
        const solutions = nerdamer.solveEquations(eqInput, 'x');

        if (!solutions || solutions.length === 0) {
            solutionDiv.innerHTML = "No solution found.";
            return;
        }

        // عرض النتائج خطوة خطوة (أساسية)
        solutionDiv.innerHTML = "Solution(s):\n";
        solutions.forEach((sol, index) => {
            solutionDiv.innerHTML += `x${index + 1} = ${sol}\n`;
        });

    } catch (err) {
        solutionDiv.innerHTML = "Error: Invalid equation or format.";
        console.error(err);
    }
}
