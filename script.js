// ===== Math AI Ultimate ثنائية اللغة بدون صوت =====
const chat = document.getElementById("chat");
const historyBox = document.getElementById("history");
const graphCanvas = document.getElementById("graph");
let chart;

// عرض رسالة
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

// كشف اللغة (عربي / انجليزي)
function detectLanguage(q){
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(q) ? "ar" : "en";
}

// تنظيف وتحويل المدخلات العربية إلى رموز رياضية
function clean(q){
  q = q.toLowerCase();
  q = q.replace(/ضرب/g,"*");
  q = q.replace(/قسمة/g,"/");
  q = q.replace(/جمع/g,"+");
  q = q.replace(/طرح/g,"-");
  q = q.replace(/يساوي|=|يعادل/g,"=");
  q = q.replace(/\s+/g,"");
  q = q.replace(/×/g,"*");
  q = q.replace(/÷/g,"/");
  q = q.replace(/(\d)x(\d)/g,"$1*$2");
  q = q.replace(/(\d)x/g,"$1*x");
  q = q.replace(/x(\d)/g,"x*$1");
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
    data:{labels:x,datasets:[{data:y,borderColor:'blue',borderWidth:2}]}
  });
}

// حل العملية
function solve(q){
  const lang = detectLanguage(q);
  q = clean(q);
  let resultText = "";

  try {
    // مشتقة
    if(q.includes("d/dx")){
      let expr = q.replace("d/dx","");
      let d = math.derivative(expr,"x").toString();
      resultText = lang==="ar" ? `مشتقة ${expr} هي ${d}` : `Derivative of ${expr} is ${d}`;
      return resultText;
    }

    // معادلة
    if(q.includes("=")){
      let parts = q.split("=");
      if(parts.length!==2) resultText = lang==="ar" ? "المعادلة غير صحيحة" : "Invalid equation";
      else {
        let left = parts[0];
        let right = parts[1];
        let expr = `${left}-(${right})`;
        let sol = math.solve(expr,"x");
        resultText = lang==="ar" ? 
          `الحل: س = ${sol}. الخطوات: انقل كل شيء إلى جهة واحدة، بسط المعادلة، حل للمتغير س.` :
          `Solution: x = ${sol}. Steps: Move everything to one side, simplify, solve for x.`;
        saveHistory(q,sol);
      }
      return resultText;
    }

    // رسم دالة
    if(q.includes("x") && !q.includes("=")){
      drawGraph(q);
      resultText = lang==="ar" ? `تم رسم الدالة: ${q}` : `Graph drawn for: ${q}`;
      return resultText;
    }

    // حساب عادي
    let result = math.evaluate(q);
    resultText = lang==="ar" ? 
      `النتيجة: ${result}. الخطوات: طبق ترتيب العمليات الحسابية واحسب خطوة خطوة.` :
      `Result: ${result}. Steps: Apply PEMDAS and compute step by step.`;
    saveHistory(q,result);
    return resultText;

  } catch {
    return lang==="ar" ? "❌ العملية غير صحيحة" : "❌ Invalid math problem";
  }
}

// إرسال عند زر أو Enter
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
