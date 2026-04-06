// تأكد أن مكتبة nerdamer محملة في index.html قبل هذا السكربت
// <script src="https://cdnjs.cloudflare.com/ajax/libs/nerdamer/1.1.13/nerdamer.core.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/nerdamer/1.1.13/Algebra.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/nerdamer/1.1.13/Calculus.min.js"></script>

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector("button");
    const solutionDiv = document.getElementById("solution");
    const input = document.getElementById("equation");

    function solveEquation() {
        solutionDiv.innerHTML = "";
        const eqInput = input.value.trim();

        if (!eqInput) {
            solutionDiv.innerHTML = "Please enter an equation first.";
            return;
        }

        try {
            // حل المعادلة باستخدام nerdamer
            const solutions = nerdamer.solveEquations(eqInput, 'x');

            if (!solutions || solutions.length === 0) {
                solutionDiv.innerHTML = "No solution found.";
                return;
            }

            solutionDiv.innerHTML = "Solution(s):\n";
            solutions.forEach((sol, index) => {
                solutionDiv.innerHTML += `x${index + 1} = ${sol.toString()}\n`;
            });

        } catch (err) {
            solutionDiv.innerHTML = "Error: Invalid equation or format.";
            console.error(err);
        }
    }

    if (btn) {
        btn.addEventListener("click", solveEquation);
    } else {
        console.error("Button not found! Make sure your HTML has a <button> element.");
    }
});
