// ===== Math AI Ultimate - English Only =====
const chat = document.getElementById("chat");
const historyBox = document.getElementById("history");
const graphCanvas = document.getElementById("graph");
let chart;

// Display message in chat
function addMsg(text, type) {
  const div = document.createElement("div");
  div.className = "msg " + type;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// Save history
function saveHistory(q, res) {
  const item = document.createElement("div");
  item.innerText = q + " = " + res;
  historyBox.appendChild(item);
}

// Clean input
function clean(q) {
  q = q.toLowerCase();
  q = q.replace(/\s+/g, "");
  q = q.replace(/×/g, "*");
  q = q.replace(/÷/g, "/");
  q = q.replace(/(\d)x(\d)/g, "$1*$2");
  q = q.replace(/(\d)x/g, "$1*x");
  q = q.replace(/x(\d)/g, "x*$1");
  return q;
}

// Draw function graph
function drawGraph(expr) {
  if (chart) chart.destroy();
  let x = [], y = [];
  for (let i = -10; i <= 10; i += 0.5) {
    try {
      x.push(i);
      y.push(math.evaluate(expr, { x: i }));
    } catch {}
  }
  chart = new Chart(graphCanvas, {
    type: "line",
    data: { labels: x, datasets: [{ data: y, borderColor: "blue", borderWidth: 2 }] }
  });
}

// Solve math problem
function solve(q) {
  q = clean(q);
  let resultText = "";

  try {
    // Derivative
    if (q.includes("d/dx")) {
      let expr = q.replace("d/dx", "");
      let d = math.derivative(expr, "x").toString();
      resultText = `Derivative of ${expr} is ${d}`;
      return resultText;
    }

    // Equation
    if (q.includes("=")) {
      let parts = q.split("=");
      if (parts.length !== 2) resultText = "Invalid equation";
      else {
        let left = parts[0];
        let right = parts[1];
        let expr = `${left}-(${right})`;
        let sol = math.solve(expr, "x");
        resultText = `Solution: x = ${sol}. Steps: Move everything to one side, simplify, solve for x.`;
        saveHistory(q, sol);
      }
      return resultText;
    }

    // Function graph
    if (q.includes("x") && !q.includes("=")) {
      drawGraph(q);
      resultText = `Graph drawn for: ${q}`;
      return resultText;
    }

    // Basic calculation
    let result = math.evaluate(q);
    resultText = `Result: ${result}. Steps: Apply PEMDAS and compute step by step.`;
    saveHistory(q, result);
    return resultText;

  } catch {
    return "❌ Invalid math problem";
  }
}

// Send input
function send() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;
  addMsg(text, "user");
  const reply = solve(text);
  setTimeout(() => addMsg(reply, "ai"), 200);
  input.value = "";
}

// Clear chat
function clearChat() {
  chat.innerHTML = "";
  historyBox.innerHTML = "";
  if (chart) chart.destroy();
}

// Support Enter key
document.getElementById("input").addEventListener("keypress", e => {
  if (e.key === "Enter") send();
});
