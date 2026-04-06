const chat = document.getElementById("chat");
const historyBox = document.getElementById("history");
const graphCanvas = document.getElementById("graph");
let chart;

// عرض رسالة
function addMsg(text,type){
  let div=document.createElement("div");
  div.className="msg "+type;
  div.innerText=text;
  chat.appendChild(div);
  chat.scrollTop=chat.scrollHeight;
}

// حفظ التاريخ
function saveHistory(q,res){
  let item=document.createElement("div");
  item.innerText=q+" = "+res;
  historyBox.appendChild(item);
}

// إرسال
function send(){
  let input=document.getElementById("input");
  let text=input.value.trim();
  if(!text) return;

  addMsg(text,"user");
  let reply=solve(text);
  setTimeout(()=>addMsg(reply,"ai"),200);
  input.value="";
}

// Enter
document.getElementById("input").addEventListener("keypress",e=>{
  if(e.key==="Enter") send();
});

// تنظيف
function clean(q){
  q=q.toLowerCase();
  q=q.replace(/ضرب/g,"*");
  q=q.replace(/قسمة/g,"/");
  q=q.replace(/جمع/g,"+");
  q=q.replace(/طرح/g,"-");
  q=q.replace(/حل/g,"");
  q=q.replace(/\s+/g,"");
  q=q.replace(/×/g,"*");
  q=q.replace(/(\d)x(\d)/g,"$1*$2");
  q=q.replace(/(\d)x/g,"$1*x");
  q=q.replace(/x(\d)/g,"x*$1");
  return q;
}

// رسم الدوال
function drawGraph(expr){
  if(chart) chart.destroy();
  let x=[],y=[];
  for(let i=-10;i<=10;i+=0.5){
    try{x.push(i); y.push(math.evaluate(expr,{x:i}));}catch{}
  }
  chart=new Chart(graphCanvas,{
    type:'line',
    data:{labels:x,datasets:[{data:y,borderColor:'red',borderWidth:2}]}
  });
}

// حل + شرح
function solve(q){
  try{
    q=clean(q);

    // مشتقة
    if(q.includes("d/dx")){
      let expr=q.replace("d/dx","");
      let d=math.derivative(expr,"x");
      return "Derivative:\n"+d;
    }

    // معادلة
    if(q.includes("=")){
      let parts=q.split("=");
      if(parts.length!==2) return "Invalid equation";
      let left=parts[0]; let right=parts[1];
      let expr=`${left}-(${right})`;
      let sol=math.solve(expr,"x");
      saveHistory(q,sol);
      return `Solution:\nx = ${sol}\nSteps:\n1) Move to one side\n2) Simplify\n3) Solve`;
    }

    // رسم دالة
    if(q.includes("x") && !q.includes("=")){
      drawGraph(q);
      return `Graph drawn for: ${q}`;
    }

    // حساب عادي
    let result=math.evaluate(q);
    saveHistory(q,result);
    return `Result: ${result}\nSteps:\n1) Apply PEMDAS\n2) Compute step by step`;
  }catch{
    return "❌ Invalid math problem";
  }
}

// مسح
function clearChat(){chat.innerHTML=""; historyBox.innerHTML=""; if(chart) chart.destroy();} 
