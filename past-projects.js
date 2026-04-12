const projectList = document.getElementById("projectList");

function renderEmpty(text) {
  if (!projectList) return;
  projectList.innerHTML = "";
  const item = document.createElement("p");
  item.className = "project-empty";
  item.textContent = text;
  projectList.appendChild(item);
}

function parseProjectSection(markdown) {
  const sectionMatch = markdown.match(/##\s*代表项目（可选）([\s\S]*?)(\n##\s+|$)/);
  if (!sectionMatch) return [];

  const section = sectionMatch[1].trim();
  const lines = section.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const projects = [];

  let current = null;
  lines.forEach((line) => {
    const head = line.match(/^(\d{2})\.\s*「(.+?)」：(.+)$/);
    if (head) {
      if (current) projects.push(current);
      current = {
        id: head[1],
        title: head[2],
        subtitle: head[3],
        keywords: "",
        description: "",
        cta: ""
      };
      return;
    }

    if (!current) return;

    if (line.startsWith("关键词：")) {
      current.keywords = line.replace("关键词：", "").trim();
      return;
    }

    const quote = line.match(/^“(.+)”$/);
    if (quote) {
      current.description = quote[1];
      return;
    }

    const cta = line.match(/^\[(.+)\]$/);
    if (cta) {
      current.cta = cta[1];
      return;
    }
  });

  if (current) projects.push(current);
  return projects;
}

function renderProjects(projects) {
  if (!projectList) return;
  projectList.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const id = document.createElement("p");
    id.className = "project-id";
    id.textContent = `项目 ${project.id}`;

    const title = document.createElement("h2");
    title.textContent = project.title;

    const subtitle = document.createElement("p");
    subtitle.className = "project-subtitle";
    subtitle.textContent = project.subtitle;

    const keywords = document.createElement("p");
    keywords.className = "project-keywords";
    keywords.textContent = `关键词：${project.keywords || "待补充"}`;

    const description = document.createElement("p");
    description.className = "project-desc";
    description.textContent = project.description || "项目介绍待补充。";

    card.appendChild(id);
    card.appendChild(title);
    card.appendChild(subtitle);
    card.appendChild(keywords);
    card.appendChild(description);

    if (project.cta) {
      const cta = document.createElement("p");
      cta.className = "project-cta";
      cta.textContent = project.cta;
      card.appendChild(cta);
    }

    projectList.appendChild(card);
  });
}

async function initProjects() {
  if (!projectList) return;

  try {
    const response = await fetch("./content/past.md", { cache: "no-store" });
    if (!response.ok) {
      renderEmpty("项目内容暂时读取失败，请稍后再试。");
      return;
    }

    const markdown = await response.text();
    const projects = parseProjectSection(markdown);
    if (projects.length === 0) {
      renderEmpty("暂时还没有读取到项目内容。你可以在 content/past.md 里补充这一章节。");
      return;
    }

    renderProjects(projects);
  } catch (error) {
    renderEmpty("项目内容加载失败，请检查本地服务或文件路径。");
  }
}

initProjects();
