const chat = document.getElementById("chat");

function addMsg(text, type){
  let div = document.createElement("div");
  div.className = "msg " + type;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function send(){
  let input = document.getElementById("input");
  let text = input.value.trim();

  if(text === "") return;

  addMsg(text, "user");

  let reply = solve(text);

  setTimeout(()=> addMsg(reply, "ai"), 300);

  input.value = "";
}

// 🔥 الذكاء الرياضي
function solve(q){

  try {

    // معادلة
    if(q.includes("=")){
      let [l,r] = q.split("=");

      let expr = `${l} - (${r})`;

      let x = math.solve(expr, "x");

      return `x = ${x}

Step:
Move all terms to one side
Solve for x`;
    }

    // حساب عادي
    let res = math.evaluate(q);

    return `Result: ${res}

Step:
Calculated using math rules`;

  } catch {
    return "Write a valid math problem only";
  }
}
