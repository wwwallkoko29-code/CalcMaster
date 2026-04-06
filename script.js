// عرض الأدوات
function showTool(id){
  document.querySelectorAll('.tool-section').forEach(t=>t.style.display='none');
  document.getElementById(id).style.display='block';
}

// كيبورد رياضي
const keys = ['7','8','9','4','5','6','1','2','3','0','+','-','*','/','^','(',')','x','=','sqrt('];
const keyboard = document.getElementById('math-keyboard');

keys.forEach(k=>{
  let btn = document.createElement('button');
  btn.textContent = k;
  btn.onclick = ()=>{
    document.getElementById('eq-input').value += k;
  };
  keyboard.appendChild(btn);
});

// حل المعادلات 🔥
function solveEquation(){
  let eq = document.getElementById('eq-input').value.trim();

  if(eq === ''){
    document.getElementById('eq-result').innerText = 'Enter equation';
    return;
  }

  try {
    if(eq.includes('=')){
      let [left, right] = eq.split('=');
      let expr = `${left} - (${right})`;

      let solution = math.solve(expr, 'x');

      document.getElementById('eq-result').innerText = "x = " + solution;
    } else {
      let result = math.evaluate(eq);
      document.getElementById('eq-result').innerText = result;
    }
  } catch {
    document.getElementById('eq-result').innerText = 'Error';
  }
}

// تبسيط الكسور
function simplifyFraction(){
  let val = document.getElementById('frac-input').value;
  let [n,d] = val.split('/').map(Number);

  if(!n || !d){
    document.getElementById('frac-result').innerText = 'Invalid';
    return;
  }

  function gcd(a,b){return b==0?a:gcd(b,a%b);}
  let g = gcd(n,d);

  document.getElementById('frac-result').innerText = `${n/g}/${d/g}`;
}

// حساب العمر 🔥
function calculateAge(){
  let birth = new Date(document.getElementById('birthdate').value);
  let now = new Date();

  if(!birth.getTime()){
    document.getElementById('age-result').innerText='Invalid date';
    return;
  }

  let y = now.getFullYear() - birth.getFullYear();
  let m = now.getMonth() - birth.getMonth();
  let d = now.getDate() - birth.getDate();

  if(d<0){ m--; d+=30; }
  if(m<0){ y--; m+=12; }

  document.getElementById('age-result').innerText =
    `${y} years, ${m} months, ${d} days`;
}
