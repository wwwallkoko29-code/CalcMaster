const chat = document.getElementById("chat");

// إضافة رسالة
function addMsg(text, type){
  let div = document.createElement("div");
  div.className = "msg " + type;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// إرسال
function send(){
  let input = document.getElementById("input");
  let text = input.value.trim();

  if(text === "") return;

  addMsg(text, "user");

  let reply = solve(text);

  setTimeout(() => addMsg(reply, "ai"), 200);

  input.value = "";
}

// Enter
document.getElementById("input").addEventListener("keypress", function(e){
  if(e.key === "Enter") send();
});

// تنظيف الإدخال
function clean(q){
  q = q.toLowerCase();

  q = q.replace(/حل/g, "");
  q = q.replace(/ /g, "");

  q = q.replace(/(\d)([a-z])/g, "$1*$2");

  return q;
}

// حل + شرح
function solve(q){

  try {

    q = clean(q);

    // معادلة
    if(q.includes("=")){
      let parts = q.split("=");
      let left = parts[0];
      let right = parts[1];

      let expr = `${left} - (${right})`;

      let solution = math.solve(expr, "x");

      return `Solution:
x = ${solution}

Steps:
1) Move all terms to one side
2) Simplify equation
3) Solve for x`;
    }

    // حساب عادي
    let result = math.evaluate(q);

    return `Result:
${result}

Steps:
1) Apply operations
2) Follow order (PEMDAS)
3) Final answer`;

  } catch {
    return "Please enter a valid math problem";
  }
}

// مسح
function clearChat(){
  chat.innerHTML = "";
}
