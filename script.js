// ===== Math AI Ultimate 3.0 Script بدون صوت =====
const chat = document.getElementById("chat");
const historyBox = document.getElementById("history");
const graphCanvas = document.getElementById("graph");
let chart;

// عرض رسالة في المحادثة
function addMsg(text,type){
  let div = document.createElement("div");
  div.className = "msg "+type;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// حفظ التاريخ
function saveHistory(q,res){
  let item = document.createElement("div");
  item.innerText = q + " = " + res;
  historyBox.appendChild(item);
}

// تنظيف وتحويل المدخلات
function clean(q){
  q = q.toLowerCase();

  // تحويل الكلمات العربية إلى رموز رياضية
  q = q.replace(/ضرب/g,"*");
  q = q.replace(/قسمة/g,"/");
  q = q.replace(/جمع/g,"+");
  q = q.replace(/طرح/g,"-");
  q = q.replace(/حل/g,"");

  // إزالة المسافات
  q = q.replace(/\s+/g,"");
  q = q.replace(/×/g,"*");  // × → *
  q = q.replace(/÷/g,"/");  // ÷ → /
  q = q.replace(/(\d)x(\d)/g,"$1*$2"); // 2x3 → 2*3
  q = q.replace(/(\d)x/g,"$1*x");     // 2x → 2*x
  q = q.replace(/x(\d)/g,"x*$1");     // x2 → x*2
  return q;
}

// رسم الدوال
function drawGraph(expr){
  if(chart) chart.destroy();
  let x=[],y=[];
  for(let i=-10;i<=10;i+=0.5){
    try{
      x.push(i);
      y.push(math.evaluate(expr,{x:i}));
    }catch{}
  }
  chart = new Chart(graphCanvas,{
    type:'line',
    data:{labels:x,datasets:[{data:y,borderColor:'red',borderWidth:2}]}
  });
}

// دالة الحل بدون صوت
function solve(q){
  try{
    q = clean(q);
    let resultText = "";

    // مشتقة
    if(q.includes("d/dx")){
      let expr = q.replace("d/dx","");
      let d = math.derivative(expr,"x").toString();
      resultText = `Derivative of ${expr} is ${d}`;
      return resultText;
    }

    // معادلة
    if(q.includes("=")){
      let parts = q.split("=");
      if(parts.length!==2) resultText = "Invalid equation";
      else {
        let left = parts[0]; 
        let right = parts[1];
        let expr = `${left}-(${right})`;
        let sol = math.solve(expr,"x");
        resultText = `Solution: x = ${sol}. Steps: Move everything to one side, simplify, solve for x.`;
        saveHistory(q,sol);
      }
      return resultText;
    }

    // رسم دالة إذا فيها x بدون =
    if(q.includes("x") && !q.includes("=")){
      drawGraph(q);
      resultText = `Graph drawn for: ${q}`;
      return resultText;
    }

    // حساب عادي (ضرب، قسمة، جمع، طرح)
    let result = math.evaluate(q);
    resultText = `Result: ${result}. Steps: Apply PEMDAS and compute step by step.`;
    saveHistory(q,result);
    return resultText;

  }catch{
    resultText = "❌ Invalid math problem";
    return resultText;
  }
}

// إرسال العملية عند الضغط على زر أو Enter
function send(){
  let input = document.getElementById("input");
  let text = input.value.trim();
  if(!text) return;

  addMsg(text,"user");
  let reply = solve(text);
  setTimeout(()=>addMsg(reply,"ai"),200);
  input.value = "";
}

// مسح كل شيء
function clearChat(){
  chat.innerHTML="";
  historyBox.innerHTML="";
  if(chart) chart.destroy();
}

// دعم Enter
document.getElementById("input").addEventListener("keypress",e=>{
  if(e.key==="Enter") send();
});
