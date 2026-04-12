const rantForm = document.getElementById("rantForm");
const rantAlias = document.getElementById("rantAlias");
const rantText = document.getElementById("rantText");
const rantList = document.getElementById("rantList");
const clearRantsBtn = document.getElementById("clearRantsBtn");
const toast = document.getElementById("toast");

const RANT_STORAGE_KEY = "liangziyuan_home_rants_v1";

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2000);
}

function loadRants() {
  try {
    const raw = localStorage.getItem(RANT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveRants(items) {
  try {
    localStorage.setItem(RANT_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    showToast("本地存储不可用，暂时无法保存");
  }
}

function formatRantTime(timestamp) {
  const time = new Date(timestamp);
  return time.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function renderRants() {
  const items = loadRants();
  rantList.innerHTML = "";

  if (items.length === 0) {
    const empty = document.createElement("li");
    empty.className = "rant-empty";
    empty.textContent = "吐槽池还空着，来写第一条吧。";
    rantList.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "rant-item";

    const meta = document.createElement("div");
    meta.className = "rant-meta";
    meta.textContent = `${item.alias || "匿名访客"} · ${formatRantTime(item.createdAt)}`;

    const text = document.createElement("p");
    text.textContent = item.text;

    const del = document.createElement("button");
    del.type = "button";
    del.className = "rant-delete";
    del.dataset.id = item.id;
    del.textContent = "删除这条";

    li.appendChild(meta);
    li.appendChild(text);
    li.appendChild(del);
    rantList.appendChild(li);
  });
}

rantForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = rantText.value.trim();
  const alias = rantAlias.value.trim();
  if (!text) return;

  const current = loadRants();
  current.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    alias,
    text,
    createdAt: Date.now()
  });

  saveRants(current.slice(0, 80));
  rantText.value = "";
  rantAlias.value = "";
  renderRants();
  showToast("已丢进吐槽池");
});

rantList.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (!target.classList.contains("rant-delete")) return;
  const id = target.dataset.id;
  if (!id) return;
  const current = loadRants().filter((item) => item.id !== id);
  saveRants(current);
  renderRants();
});

clearRantsBtn.addEventListener("click", () => {
  try {
    localStorage.removeItem(RANT_STORAGE_KEY);
  } catch (error) {
    showToast("本地存储不可用，无法清空");
  }
  renderRants();
  showToast("已清空本地吐槽");
});

renderRants();
