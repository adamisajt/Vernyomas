import "./style.css";

async function loadData() {
  const loadingEl = document.getElementById("loading");
  const errorEl = document.getElementById("error");
  const tableEl = document.getElementById("bp-table");
  const tbodyEl = document.getElementById("bp-tbody");

  try {
    const res = await fetch("/test.json");
    if (!res.ok) {
      throw new Error(`Hiba a test.json letöltésekor: ${res.status}`);
    }

    const data = await res.json();

    tbodyEl.innerHTML = "";

    data.forEach((item, index) => {
      const tr = document.createElement("tr");

      const tdIndex = document.createElement("td");
      tdIndex.textContent = index + 1;

      const tdName = document.createElement("td");
      tdName.textContent = item.name;

      const tdBp = document.createElement("td");
      tdBp.textContent = item.vernyomas;

      tr.appendChild(tdIndex);
      tr.appendChild(tdName);
      tr.appendChild(tdBp);

      tbodyEl.appendChild(tr);
    });

    loadingEl.classList.add("d-none");
    tableEl.classList.remove("d-none");
  } catch (err) {
    console.error(err);
    loadingEl.classList.add("d-none");
    errorEl.textContent = err.message || "Ismeretlen hiba történt.";
    errorEl.classList.remove("d-none");
  }
}

loadData();
