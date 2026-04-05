// حل المعادلة نصيًا
function solveEquation() {
    const eq = document.getElementById('equation').value;
    try {
        const [lhs, rhs] = eq.split("=").map(e => math.simplify(e.trim()));
        const sol = math.solve(lhs.toString() + " - (" + rhs.toString() + ")", "x");
        document.getElementById('solution').innerHTML = "Solution: x = " + sol.join(", ");
    } catch(e) {
        document.getElementById('solution').innerHTML = "Error: Invalid equation";
    }
}

// حل المعادلة من صورة
function solveFromImage() {
    const file = document.getElementById('imageInput').files[0];
    if (!file) { alert("Please select an image"); return; }

    Tesseract.recognize(file, 'eng')
    .then(result => {
        const eq = result.data.text.replace(/\s+/g,'');
        document.getElementById('equation').value = eq;
        solveEquation();
    }).catch(err => {
        document.getElementById('solution').innerHTML = "OCR Error: " + err;
    });
}
