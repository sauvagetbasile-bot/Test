const STORAGE_KEY = "notes";

const app = document.querySelector("#app");

function loadNotes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function render(notes) {
  app.innerHTML = `
    <header>
      <span class="mark">GitHub Pages</span>
      <span class="mark">statique</span>
    </header>
    <main>
      <h1>Une application web, prête à publier.</h1>
      <p class="lede">
        Ce dépôt construit une application statique avec Vite et la déploie
        sur GitHub Pages à chaque push sur <code>main</code>.
      </p>
      <section class="panel" aria-labelledby="notes-title">
        <h2 id="notes-title">Notes locales</h2>
        <form id="note-form">
          <input
            id="note-input"
            type="text"
            name="note"
            maxlength="140"
            placeholder="Ajouter une note"
            autocomplete="off"
            required
          />
          <button type="submit">Ajouter</button>
        </form>
        ${
          notes.length
            ? `<ul>${notes
                .map(
                  (note, index) => `
                    <li>
                      <span>${escapeHtml(note)}</span>
                      <button class="ghost" type="button" data-index="${index}">Retirer</button>
                    </li>`,
                )
                .join("")}</ul>`
            : `<p class="empty">Rien pour l’instant. Les notes restent dans ce navigateur.</p>`
        }
      </section>
    </main>
    <footer>
      Lancer en local avec <code>npm run dev</code>. Le site public suit le workflow
      <code>Deploy GitHub Pages</code>.
    </footer>
  `;

  app.querySelector("#note-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = app.querySelector("#note-input");
    const value = input.value.trim();
    if (!value) return;
    const next = [value, ...notes];
    saveNotes(next);
    render(next);
  });

  app.querySelectorAll("[data-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      const next = notes.filter((_, i) => i !== index);
      saveNotes(next);
      render(next);
    });
  });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

render(loadNotes());
