// تحويل الأرقام العربية إلى إنجليزية
function convertArabicNumbers(str) {
    const arabicNums = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    const englishNums = ['0','1','2','3','4','5','6','7','8','9'];
    for(let i=0; i<arabicNums.length; i++){
        str = str.replace(new RegExp(arabicNums[i], 'g'), englishNums[i]);
    }
    return str;
}

// حل المعادلة نصياً
function solveEquation() {
    let eq = document.getElementById('equation').value;
    eq = convertArabicNumbers(eq);
    
    try {
        const [lhs, rhs] = eq.split("=").map(e => math.simplify(e.trim()));
        const sol = math.solve(lhs.toString() + " - (" + rhs.toString() + ")", "x");

        document.getElementById('solution').innerHTML = "Solution: x = " + sol.join(", ");
        document.getElementById('steps').innerHTML = `
            Steps:<br>
            1️⃣ Move all terms to one side: ${lhs.toString()} - (${rhs.toString()}) = 0<br>
            2️⃣ Solve for x using math.js<br>
            3️⃣ Final answer: x = ${sol.join(", ")}
        `;
    } catch(e) {
        document.getElementById('solution').innerHTML = "Error: Invalid equation";
        document.getElementById('steps').innerHTML = "";
    }
}

// حل المعادلة من صورة
function solveFromImage() {
    const file = document.getElementById('imageInput').files[0];
    if (!file) { alert("Please select an image"); return; }

    Tesseract.recognize(file, 'eng+ara')
    .then(result => {
        let eq = result.data.text.replace(/\s+/g,'');
        eq = convertArabicNumbers(eq);
        document.getElementById('equation').value = eq;
        solveEquation();
    }).catch(err => {
        document.getElementById('solution').innerHTML = "OCR Error: " + err;
        document.getElementById('steps').innerHTML = "";
    });
}