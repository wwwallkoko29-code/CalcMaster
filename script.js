// Show selected tool
function showTool(id){
  document.querySelectorAll('.tool-section').forEach(t => t.style.display='none');
  document.getElementById(id).style.display = 'block';
}

// Virtual Keyboard
const mathKeys = ['7','8','9','4','5','6','1','2','3','0','+','-','*','/','^','√','(',')','x','y','z','=','π'];
const keyboardDiv = document.getElementById('math-keyboard');
mathKeys.forEach(k=>{
  let btn = document.createElement('button');
  btn.textContent = k;
  btn.onclick = () => { document.getElementById('eq-input').value += k; };
  keyboardDiv.appendChild(btn);
});

// Fraction Simplifier
function simplifyFraction(){
  let val = document.getElementById('frac-input').value;
  let [num,den] = val.split('/').map(Number);
  if(isNaN(num)||isNaN(den)||den===0){
    document.getElementById('frac-result').innerText='Enter valid fraction';
    return;
  }
  function gcd(a,b){return b===0?a:gcd(b,a%b);}
  let g = gcd(num,den);
  document.getElementById('frac-result').innerText = `${num/g}/${den/g}`;
}

// Age Calculator
function calculateAge(){
  const birthdate = new Date(document.getElementById('birthdate').value);
  if(!birthdate.getTime()){ document.getElementById('age-result').innerText='Select a valid date'; return; }
  const now = new Date();
  let years = now.getFullYear() - birthdate.getFullYear();
  let months = now.getMonth() - birthdate.getMonth();
  let days = now.getDate() - birthdate.getDate();
  if(days<0){ months--; days+=new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
  if(months<0){ years--; months+=12; }
  document.getElementById('age-result').innerText = `${years} years, ${months} months, ${days} days`;
}

// Equation Solver (supports linear, quadratic, simple polynomials)
function solveEquation(){
  let eq = document.getElementById('eq-input').value;
  if(eq.trim()===''){ document.getElementById('eq-result').innerText='Enter an equation'; return; }

  try {
    // Replace √ with Math.sqrt
    eq = eq.replace(/√/g, 'Math.sqrt');
    // Linear/Quadratic Solver (basic demo)
    let x = mathSolve(eq); // function to implement advanced solving
    document.getElementById('eq-result').innerText = x;
  } catch(e){
    document.getElementById('eq-result').innerText = 'Cannot solve this equation yet';
  }
}

// Placeholder for mathSolve (يمكن تطويره لاحقاً ليحل كل المعادلات الصعبة)
function mathSolve(eq){
  // حاليا يرجع نفس النص (يمكن استخدام math.js أو API خارجي لاحقاً)
  return "Solution feature coming soon...";
}
