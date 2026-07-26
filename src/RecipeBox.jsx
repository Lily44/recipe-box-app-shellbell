import React, { useState, useEffect, useRef, useCallback } from "react";
import { Camera, Plus, X, Search, ChefHat, Tag, Sparkles, Trash2, Pencil, ArrowLeft, Image as ImageIcon, Loader2, Download, Upload, Share2 } from "lucide-react";

const FONT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=Hanken+Grotesk:wght@400;500;600;700&display=swap');

  .rb-root {
    --surface: #fafaf4;
    --surface-lowest: #ffffff;
    --surface-low: #f4f4ee;
    --surface-container: #eeeee9;
    --surface-high: #e8e8e3;
    --on-surface: #1a1c19;
    --on-surface-variant: #42493e;
    --outline: #72796e;
    --outline-variant: #c2c9bb;
    --primary: #2d5a27;
    --primary-dark: #1f4019;
    --on-primary: #ffffff;
    --secondary-container: #dde5dc;
    --tertiary-container: #ffdcc4;
    --on-tertiary-container: #6f3800;
    --error: #ba1a1a;
    --error-container: #ffdad6;
    font-family: 'Hanken Grotesk', sans-serif;
    color: var(--on-surface);
    background: var(--surface);
    min-height: 100%;
    position: relative;
  }
  .rb-display { font-family: 'Source Serif 4', serif; letter-spacing: -0.01em; }
  .rb-mono {
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .rb-tab {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 8px 14px;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    border: none;
    background: var(--secondary-container);
    color: var(--primary);
    transition: background 0.15s, color 0.15s;
  }
  .rb-tab.active {
    background: var(--primary);
    color: var(--on-primary);
  }

  .rb-card {
    background: var(--surface-lowest);
    border: 1px solid transparent;
    border-radius: 8px;
    box-shadow: 0px 4px 20px rgba(26,28,25,0.05);
    transition: box-shadow 0.15s, border-color 0.15s;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .rb-card:hover {
    box-shadow: 0px 6px 26px rgba(26,28,25,0.09);
    border-color: var(--outline-variant);
  }

  .rb-btn-primary {
    background: var(--primary);
    color: var(--on-primary);
    border: none;
    border-radius: 4px;
    padding: 10px 18px;
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: background 0.15s;
  }
  .rb-btn-primary:hover { background: var(--primary-dark); }
  .rb-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .rb-btn-secondary {
    background: var(--secondary-container);
    color: var(--primary);
    border: none;
    border-radius: 4px;
    padding: 9px 16px;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: filter 0.15s;
  }
  .rb-btn-secondary:hover { filter: brightness(0.96); }
  .rb-btn-secondary:disabled { opacity: 0.5; cursor: not-allowed; }

  .rb-btn-ghost {
    background: transparent;
    border: none;
    color: var(--primary);
    border-radius: 4px;
    padding: 9px 14px;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: background 0.15s;
  }
  .rb-btn-ghost:hover { background: var(--secondary-container); }

  .rb-btn-danger {
    background: transparent;
    border: 1px solid var(--error-container);
    color: var(--error);
    border-radius: 4px;
    padding: 9px 14px;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: background 0.15s;
  }
  .rb-btn-danger:hover { background: var(--error-container); }

  .rb-input {
    width: 100%;
    background: var(--surface-lowest);
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 9px 12px;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 15px;
    color: var(--on-surface);
    box-sizing: border-box;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .rb-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(45,90,39,0.14);
  }
  .rb-label {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--on-surface-variant);
    display: block;
    margin-bottom: 6px;
  }

  .rb-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--secondary-container);
    color: var(--primary);
    border-radius: 20px;
    padding: 4px 10px 4px 12px;
    font-size: 12px;
    font-weight: 600;
  }
  .rb-chip button {
    background: none; border: none; cursor: pointer;
    color: var(--primary); display: flex; padding: 0;
  }

  .rb-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(26,28,25,0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex; align-items: flex-start; justify-content: center;
    padding: 24px 16px; z-index: 50; overflow-y: auto;
  }
  .rb-modal {
    background: var(--surface-lowest);
    border-radius: 8px;
    max-width: 560px; width: 100%;
    margin: auto;
    box-shadow: 0px 20px 50px rgba(26,28,25,0.18);
  }

  .rb-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
  .rb-scrollbar::-webkit-scrollbar-thumb { background: var(--outline-variant); border-radius: 3px; }

  textarea.rb-input { resize: vertical; font-family: 'Hanken Grotesk', sans-serif; }
`;

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

const API_URL = "https://recipe-box-shellbell.lsolson.workers.dev";

async function uploadPhoto(blob) {
  const formData = new FormData();
  formData.append("photo", blob, "photo.jpg");
  const res = await fetch(`${API_URL}/api/photos`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Photo upload failed");
  const data = await res.json();
  return data.key;
}

function dataUrlToBlob(dataUrl) {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function compressImage(file, maxWidth = 1000, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => resolve({ blob, dataUrl: canvas.toDataURL("image/jpeg", quality) }),
          "image/jpeg",
          quality
        );
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const INGREDIENT_QUANTITY_START = /^(\d+(\.\d+)?|\d+\s*\/\s*\d+|[¼½¾⅓⅔⅛⅜⅝⅞]|\d+\s+\d+\s*\/\s*\d+|scant\s|generous\s|a\s+pinch|a\s+dash)/i;
const INGREDIENT_UNIT_WORDS = /\b(cups?|tsp|teaspoons?|tbsp|tablespoons?|oz|ounces?|lbs?|pounds?|grams?|kg|ml|liters?|litres?|pinch(es)?|dash(es)?|cloves?|slices?|cans?|packages?|sticks?|bunch(es)?|handful(s)?)\b/i;
const STEP_VERBS = /\b(bake|mix|stir|whisk|simmer|chill|preheat|combine|pour|fold|knead|roll|chop|dice|mince|season|garnish|serve|cook|boil|fry|saut[eé]|grill|roast|blend|whip|beat|drain|rinse|cover|rest|cool|refrigerate|freeze|place|transfer|spread|sprinkle|arrange|remove|let\s+(it|the|cool|rest|sit)|set\s+aside)\b/i;
const TEMP_PATTERN = /\b\d{3}\s?°?\s?(F|C)?\b/;
const NOTE_START = /^(note|notes|tip|tips|variation|variations|p\.?s\.?)[:\-]/i;

function parseRecipeHeuristically(rawText) {
  const lines = rawText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  let title = "";
  const ingredients = [];
  const steps = [];
  const notesLines = [];

  lines.forEach((line, idx) => {
    const isFirstLine = idx === 0;
    const looksLikeIngredient = INGREDIENT_QUANTITY_START.test(line) || INGREDIENT_UNIT_WORDS.test(line);
    const looksLikeStep = STEP_VERBS.test(line) || TEMP_PATTERN.test(line);
    const looksLikeNote = line.trim().endsWith("?") || NOTE_START.test(line);

    if (looksLikeNote) {
      notesLines.push(line.replace(NOTE_START, "").trim());
    } else if (looksLikeIngredient) {
      ingredients.push(line);
    } else if (looksLikeStep) {
      steps.push(line);
    } else if (isFirstLine && line.length < 60 && !title) {
      title = line;
    } else if (line.length > 0) {
      // Ambiguous line with no clear signal — default to treating it as a step,
      // since most leftover prose in a recipe tends to be instructional.
      steps.push(line);
    }
  });

  return {
    title: title || "",
    ingredients,
    steps,
    notes: notesLines.join(" "),
  };
}

async function downloadBackup(recipes) {
  const withPhotos = await Promise.all(
    recipes.map(async (r) => {
      if (!r.photoKey) return r;
      try {
        const res = await fetch(`${API_URL}/api/photos/${r.photoKey}`);
        if (!res.ok) return r;
        const blob = await res.blob();
        const photoDataUrl = await blobToDataUrl(blob);
        return { ...r, photoDataUrl };
      } catch (e) {
        return r; // if a photo fails to fetch, back up the recipe anyway
      }
    })
  );
  const payload = {
    app: "Recipe Box",
    exportedAt: new Date().toISOString(),
    recipeCount: withPhotos.length,
    recipes: withPhotos,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const dateStamp = new Date().toISOString().slice(0, 10);
  const a = document.createElement("a");
  a.href = url;
  a.download = `recipe-box-backup-${dateStamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function buildSingleRecipeFile(recipe) {
  let toShare = recipe;
  if (recipe.photoKey) {
    try {
      const res = await fetch(`${API_URL}/api/photos/${recipe.photoKey}`);
      if (res.ok) {
        const blob = await res.blob();
        const photoDataUrl = await blobToDataUrl(blob);
        toShare = { ...recipe, photoDataUrl };
      }
    } catch (e) { /* share without the photo if it can't be fetched */ }
  }
  const payload = {
    app: "Recipe Box",
    exportedAt: new Date().toISOString(),
    recipeCount: 1,
    recipes: [toShare],
  };
  const safeName = recipe.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "recipe";
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  return new File([blob], `${safeName}.json`, { type: "application/json" });
}

async function shareRecipe(recipe) {
  const file = await buildSingleRecipeFile(recipe);

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: recipe.title,
        text: `Try my recipe for ${recipe.title}! Open this file in Recipe Box and tap Restore to add it to your collection.`,
      });
      return { shared: true };
    } catch (e) {
      if (e.name === "AbortError") return { shared: false, cancelled: true };
      // fall through to download if sharing fails for another reason
    }
  }

  // Fallback for browsers without native share support (mostly desktop)
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return { shared: true, downloaded: true };
}

function readBackupFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        const recipes = Array.isArray(parsed) ? parsed : parsed.recipes;
        if (!Array.isArray(recipes)) throw new Error("No recipes found in file");
        resolve(recipes);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export default function RecipeBox() {
  const [recipes, setRecipes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState({ screen: "list" }); // list | detail | edit
  const [storageError, setStorageError] = useState(false);
  const [importStatus, setImportStatus] = useState(null); // { type: 'success'|'error', message }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/recipes`);
        if (!res.ok) throw new Error("Failed to load recipes");
        const data = await res.json();
        setRecipes(data.recipes || []);
      } catch (e) {
        setStorageError(true);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const saveRecipe = useCallback(async (recipe) => {
    try {
      const res = await fetch(`${API_URL}/api/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });
      if (!res.ok) throw new Error("Save failed");
    } catch (e) {
      setStorageError(true);
    }
  }, []);

  const deleteRecipe = useCallback(
    async (id) => {
      const recipe = recipes.find((r) => r.id === id);
      try {
        await fetch(`${API_URL}/api/recipes/${id}`, { method: "DELETE" });
        if (recipe?.photoKey) {
          await fetch(`${API_URL}/api/photos/${recipe.photoKey}`, { method: "DELETE" });
        }
      } catch (e) { /* noop */ }
      setRecipes((prev) => prev.filter((r) => r.id !== id));
      setView({ screen: "list" });
    },
    [recipes]
  );

  const upsertRecipe = (recipe) => {
    setRecipes((prev) => {
      const exists = prev.some((r) => r.id === recipe.id);
      const next = exists ? prev.map((r) => (r.id === recipe.id ? recipe : r)) : [recipe, ...prev];
      return next;
    });
    saveRecipe(recipe);
  };

  const handleImport = async (file) => {
    setImportStatus(null);
    try {
      const incoming = await readBackupFile(file);
      let restored = 0;
      const merged = [...recipes];
      for (const raw of incoming) {
        if (!raw || !raw.title) continue;
        let photoKey = raw.photoKey || null;
        if (raw.photoDataUrl) {
          try {
            const blob = dataUrlToBlob(raw.photoDataUrl);
            photoKey = await uploadPhoto(blob);
          } catch (e) { /* keep going without the photo if upload fails */ }
        }
        const recipe = {
          id: raw.id || uid(),
          title: raw.title,
          ingredients: Array.isArray(raw.ingredients) ? raw.ingredients : [],
          steps: Array.isArray(raw.steps) ? raw.steps : [],
          notes: raw.notes || "",
          tags: Array.isArray(raw.tags) ? raw.tags : [],
          photoKey,
          createdAt: raw.createdAt || Date.now(),
        };
        await saveRecipe(recipe);
        const existingIdx = merged.findIndex((r) => r.id === recipe.id);
        if (existingIdx >= 0) merged[existingIdx] = recipe;
        else merged.unshift(recipe);
        restored++;
      }
      merged.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setRecipes(merged);
      setImportStatus({ type: "success", message: `Restored ${restored} recipe${restored === 1 ? "" : "s"}.` });
    } catch (e) {
      setImportStatus({ type: "error", message: "That file didn't look like a Recipe Box backup." });
    }
  };

  const allTags = Array.from(new Set(recipes.flatMap((r) => r.tags || []))).sort();

  const filtered = recipes.filter((r) => {
    const matchesTag = activeTag === "All" || (r.tags || []).includes(activeTag);
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      r.title.toLowerCase().includes(q) ||
      (r.ingredients || []).some((i) => i.toLowerCase().includes(q)) ||
      (r.tags || []).some((t) => t.toLowerCase().includes(q));
    return matchesTag && matchesSearch;
  });

  return (
    <div className="rb-root" style={{ padding: "28px 20px 60px" }}>
      <style>{FONT_STYLES}</style>

      {view.screen === "list" && (
        <ListScreen
          recipes={filtered}
          allTags={allTags}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
          search={search}
          setSearch={setSearch}
          onOpen={(r) => setView({ screen: "detail", recipe: r })}
          onAdd={() => setView({ screen: "edit", recipe: null })}
          loaded={loaded}
          storageError={storageError}
          allRecipes={recipes}
          onImport={handleImport}
          importStatus={importStatus}
          onDismissImportStatus={() => setImportStatus(null)}
        />
      )}

      {view.screen === "detail" && (
        <DetailScreen
          recipe={view.recipe}
          onBack={() => setView({ screen: "list" })}
          onEdit={(r) => setView({ screen: "edit", recipe: r })}
          onDelete={deleteRecipe}
        />
      )}

      {view.screen === "edit" && (
        <EditScreen
          recipe={view.recipe}
          allTags={allTags}
          onCancel={() => setView(view.recipe ? { screen: "detail", recipe: view.recipe } : { screen: "list" })}
          onSave={(r) => {
            upsertRecipe(r);
            setView({ screen: "detail", recipe: r });
          }}
        />
      )}
    </div>
  );
}

function ListScreen({ recipes, allTags, activeTag, setActiveTag, search, setSearch, onOpen, onAdd, loaded, storageError, allRecipes, onImport, importStatus, onDismissImportStatus }) {
  const importInputRef = useRef(null);
  const [backingUp, setBackingUp] = useState(false);

  const handleBackup = async () => {
    setBackingUp(true);
    try {
      await downloadBackup(allRecipes);
    } finally {
      setBackingUp(false);
    }
  };

  return (
    <div style={{ maxWidth: 780, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ChefHat size={26} color="var(--primary)" strokeWidth={2} />
          <h1 className="rb-display" style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>Recipe Box</h1>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            className="rb-btn-secondary"
            onClick={handleBackup}
            disabled={!allRecipes.length || backingUp}
            title={allRecipes.length ? "Download all recipes as a backup file" : "Add a recipe first"}
          >
            <Download size={14} /> {backingUp ? "Backing up..." : "Backup"}
          </button>
          <input
            type="file"
            accept="application/json"
            ref={importInputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImport(file);
              e.target.value = "";
            }}
          />
          <button className="rb-btn-secondary" onClick={() => importInputRef.current?.click()}>
            <Upload size={14} /> Restore
          </button>
          <button className="rb-btn-primary" onClick={onAdd}>
            <Plus size={16} /> New recipe
          </button>
        </div>
      </div>

      {importStatus && (
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: importStatus.type === "success" ? "var(--secondary-container)" : "var(--error-container)",
            border: `1px solid ${importStatus.type === "success" ? "var(--outline-variant)" : "var(--error)"}`,
            borderRadius: 4, padding: "9px 14px", marginBottom: 16, fontSize: 13,
          }}
        >
          <span>{importStatus.message}</span>
          <button className="rb-btn-ghost" style={{ padding: "3px 8px", border: "none" }} onClick={onDismissImportStatus}>
            <X size={13} />
          </button>
        </div>
      )}

      <div style={{ position: "relative", marginBottom: 18 }}>
        <Search size={15} color="var(--on-surface-variant)" style={{ position: "absolute", left: 12, top: 11 }} />
        <input
          className="rb-input"
          style={{ paddingLeft: 34 }}
          placeholder="Search recipes, ingredients, tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rb-scrollbar" style={{ display: "flex", gap: 2, overflowX: "auto", marginBottom: 20, paddingBottom: 1 }}>
        {["All", ...allTags].map((tag) => (
          <div
            key={tag}
            className={`rb-tab ${activeTag === tag ? "active" : ""}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </div>
        ))}
      </div>

      {storageError && (
        <p className="rb-mono" style={{ fontSize: 12, color: "var(--error)", marginBottom: 16 }}>
          Storage had trouble saving — your changes this session may not persist.
        </p>
      )}

      {loaded && recipes.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--on-surface-variant)" }}>
          <p className="rb-display" style={{ fontSize: 20, marginBottom: 6 }}>Empty, for now.</p>
          <p style={{ fontSize: 14 }}>Paste in something from your notes, or start fresh.</p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {recipes.map((r) => (
          <div key={r.id} className="rb-card" onClick={() => onOpen(r)}>
            <div style={{ width: "100%", aspectRatio: "4/3", background: "var(--secondary-container)", overflow: "hidden" }}>
              {r.photoKey ? (
                <img src={`${API_URL}/api/photos/${r.photoKey}`} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ImageIcon size={26} color="var(--on-surface-variant)" strokeWidth={2} />
                </div>
              )}
            </div>
            <div style={{ padding: "12px 14px 14px" }}>
              <p className="rb-display" style={{ fontSize: 16, fontWeight: 600, margin: "0 0 6px" }}>{r.title}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {(r.tags || []).slice(0, 3).map((t) => (
                  <span key={t} className="rb-mono" style={{ fontSize: 10, color: "var(--on-surface-variant)" }}>#{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailScreen({ recipe, onBack, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareNote, setShareNote] = useState("");

  const handleShare = async () => {
    setSharing(true);
    setShareNote("");
    try {
      const result = await shareRecipe(recipe);
      if (result.downloaded) {
        setShareNote("Saved as a file — send it to them however you'd like.");
      } else if (result.cancelled) {
        setShareNote("");
      }
    } catch (e) {
      setShareNote("Couldn't prepare that recipe for sharing — try again.");
    } finally {
      setSharing(false);
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <button className="rb-btn-ghost" onClick={onBack} style={{ marginBottom: 18 }}>
        <ArrowLeft size={15} /> All recipes
      </button>

      {recipe.photoKey && (
        <img src={`${API_URL}/api/photos/${recipe.photoKey}`} alt={recipe.title} style={{ width: "100%", maxHeight: 320, objectFit: "cover", borderRadius: 6, marginBottom: 20, border: "1px solid var(--outline-variant)" }} />
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
        <h1 className="rb-display" style={{ fontSize: 30, fontWeight: 600, margin: 0 }}>{recipe.title}</h1>
        <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap" }}>
          <button className="rb-btn-secondary" onClick={handleShare} disabled={sharing}>
            <Share2 size={14} /> {sharing ? "Preparing..." : "Share"}
          </button>
          <button className="rb-btn-secondary" onClick={() => onEdit(recipe)} aria-label="Edit recipe"><Pencil size={14} /> Edit</button>
          <button className="rb-btn-danger" onClick={() => setConfirmDelete(true)} aria-label="Delete recipe"><Trash2 size={14} /> Delete</button>
        </div>
      </div>

      {shareNote && (
        <p style={{ fontSize: 13, color: "var(--on-surface-variant)", marginBottom: 16 }}>{shareNote}</p>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
        {(recipe.tags || []).map((t) => (
          <span key={t} className="rb-chip"><Tag size={10} />{t}</span>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 28 }}>
        <section>
          <p className="rb-label">Ingredients</p>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9 }}>
            {(recipe.ingredients || []).map((i, idx) => <li key={idx}>{i}</li>)}
          </ul>
        </section>
        <section>
          <p className="rb-label">Steps</p>
          <ol style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9 }}>
            {(recipe.steps || []).map((s, idx) => <li key={idx} style={{ marginBottom: 6 }}>{s}</li>)}
          </ol>
        </section>
        {recipe.notes && (
          <section>
            <p className="rb-label">Notes</p>
            <p style={{ margin: 0, fontStyle: "italic", color: "var(--on-surface-variant)" }}>{recipe.notes}</p>
          </section>
        )}
      </div>

      {confirmDelete && (
        <div className="rb-modal-overlay" onClick={() => setConfirmDelete(false)}>
          <div className="rb-modal" style={{ padding: 24 }} onClick={(e) => e.stopPropagation()}>
            <p className="rb-display" style={{ fontSize: 18, marginBottom: 8 }}>Delete "{recipe.title}"?</p>
            <p style={{ fontSize: 14, color: "var(--on-surface-variant)", marginBottom: 18 }}>This can't be undone.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="rb-btn-ghost" onClick={() => setConfirmDelete(false)}>Cancel</button>
              <button className="rb-btn-primary" style={{ background: "var(--error)" }} onClick={() => onDelete(recipe.id)}>Delete permanently</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EditScreen({ recipe, allTags, onCancel, onSave }) {
  const isNew = !recipe;
  const [mode, setMode] = useState(isNew ? "blank" : "blank");
  const [pasteText, setPasteText] = useState("");
  const [parsing, setParsing] = useState(false);
  const [parseError, setParseError] = useState("");

  const [title, setTitle] = useState(recipe?.title || "");
  const [ingredients, setIngredients] = useState(recipe?.ingredients?.length ? recipe.ingredients : [""]);
  const [steps, setSteps] = useState(recipe?.steps?.length ? recipe.steps : [""]);
  const [notes, setNotes] = useState(recipe?.notes || "");
  const [tags, setTags] = useState(recipe?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [photoKey, setPhotoKey] = useState(recipe?.photoKey || null);
  const [photoPreview, setPhotoPreview] = useState(recipe?.photoKey ? `${API_URL}/api/photos/${recipe.photoKey}` : null);
  const [compressing, setCompressing] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const fileInputRef = useRef(null);

  const tagSuggestions = tagInput.trim()
    ? allTags.filter((t) => t.toLowerCase().startsWith(tagInput.trim().toLowerCase()) && !tags.includes(t))
    : [];

  const handleParse = async () => {
    if (!pasteText.trim()) return;
    setParsing(true);
    setParseError("");
    try {
      const result = parseRecipeHeuristically(pasteText);
      setTitle(result.title || "");
      setIngredients(result.ingredients?.length ? result.ingredients : [""]);
      setSteps(result.steps?.length ? result.steps : [""]);
      setNotes(result.notes || "");
      setMode("blank");
    } catch (e) {
      setParseError("Couldn't parse that — try the blank form instead, or tweak the text.");
    } finally {
      setParsing(false);
    }
  };

  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCompressing(true);
    setPhotoError("");
    try {
      const { blob } = await compressImage(file);
      setPhotoPreview(URL.createObjectURL(blob));
      const key = await uploadPhoto(blob);
      setPhotoKey(key);
    } catch (e) {
      setPhotoError("Couldn't upload that photo — check your connection and try again.");
    } finally {
      setCompressing(false);
    }
  };

  const addTag = (t) => {
    const clean = t.trim().toLowerCase();
    if (clean && !tags.includes(clean)) setTags([...tags, clean]);
    setTagInput("");
  };

  const updateListItem = (list, setList, idx, value) => {
    const next = [...list];
    next[idx] = value;
    setList(next);
  };
  const addListItem = (list, setList) => setList([...list, ""]);
  const removeListItem = (list, setList, idx) => setList(list.filter((_, i) => i !== idx));

  const handleSave = () => {
    if (!title.trim()) return;
    const cleanRecipe = {
      id: recipe?.id || uid(),
      title: title.trim(),
      ingredients: ingredients.map((i) => i.trim()).filter(Boolean),
      steps: steps.map((s) => s.trim()).filter(Boolean),
      notes: notes.trim(),
      tags,
      photoKey,
      createdAt: recipe?.createdAt || Date.now(),
    };
    onSave(cleanRecipe);
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <button className="rb-btn-ghost" onClick={onCancel} style={{ marginBottom: 18 }}>
        <ArrowLeft size={15} /> Cancel
      </button>

      <h1 className="rb-display" style={{ fontSize: 26, fontWeight: 600, marginBottom: 20 }}>
        {isNew ? "New recipe" : "Edit recipe"}
      </h1>

      {isNew && (
        <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
          <div className={`rb-tab ${mode === "paste" ? "active" : ""}`} onClick={() => setMode("paste")}>Paste from notes</div>
          <div className={`rb-tab ${mode === "blank" ? "active" : ""}`} onClick={() => setMode("blank")}>Start blank</div>
        </div>
      )}

      {mode === "paste" && (
        <div style={{ marginBottom: 26 }}>
          <label className="rb-label">Paste your recipe as-is</label>
          <textarea
            className="rb-input"
            rows={8}
            placeholder={"Oat topping\n\nScant 1 cup rolled oats\nSliced almonds...\n\nMix all. Bake 350 about 10 minutes..."}
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
          />
          {parseError && <p style={{ color: "var(--error)", fontSize: 13, marginTop: 8 }}>{parseError}</p>}
          <button className="rb-btn-primary" style={{ marginTop: 10 }} onClick={handleParse} disabled={parsing || !pasteText.trim()}>
            {parsing ? <Loader2 size={15} className="rb-spin" /> : <Sparkles size={15} />}
            {parsing ? "Parsing..." : "Parse into fields"}
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label className="rb-label">Photo</label>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {photoPreview ? (
              <img src={photoPreview} alt="" style={{ width: 84, height: 84, objectFit: "cover", borderRadius: 6, border: "1px solid var(--outline-variant)" }} />
            ) : (
              <div style={{ width: 84, height: 84, borderRadius: 6, background: "var(--secondary-container)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Camera size={20} color="var(--on-surface-variant)" />
              </div>
            )}
            <div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handlePhotoSelect}
              />
              <button className="rb-btn-secondary" onClick={() => fileInputRef.current?.click()} disabled={compressing}>
                <Camera size={14} /> {compressing ? "Uploading..." : photoKey ? "Replace photo" : "Add photo"}
              </button>
              {photoError && <p style={{ color: "var(--error)", fontSize: 12, marginTop: 6 }}>{photoError}</p>}
            </div>
          </div>
        </div>

        <div>
          <label className="rb-label">Title</label>
          <input className="rb-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Oat topping" />
        </div>

        <div>
          <label className="rb-label">Ingredients</label>
          {ingredients.map((ing, idx) => (
            <div key={idx} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
              <input className="rb-input" value={ing} onChange={(e) => updateListItem(ingredients, setIngredients, idx, e.target.value)} placeholder="1 cup rolled oats" />
              <button className="rb-btn-ghost" style={{ padding: "9px 10px" }} onClick={() => removeListItem(ingredients, setIngredients, idx)}><X size={14} /></button>
            </div>
          ))}
          <button className="rb-btn-ghost" onClick={() => addListItem(ingredients, setIngredients)}><Plus size={13} /> Add ingredient</button>
        </div>

        <div>
          <label className="rb-label">Steps</label>
          {steps.map((s, idx) => (
            <div key={idx} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
              <span className="rb-mono" style={{ fontSize: 12, color: "var(--on-surface-variant)", paddingTop: 10 }}>{idx + 1}</span>
              <input className="rb-input" value={s} onChange={(e) => updateListItem(steps, setSteps, idx, e.target.value)} placeholder="Bake at 350°F for 10 minutes" />
              <button className="rb-btn-ghost" style={{ padding: "9px 10px" }} onClick={() => removeListItem(steps, setSteps, idx)}><X size={14} /></button>
            </div>
          ))}
          <button className="rb-btn-ghost" onClick={() => addListItem(steps, setSteps)}><Plus size={13} /> Add step</button>
        </div>

        <div>
          <label className="rb-label">Notes <span style={{ opacity: 0.7 }}>(asides, variations, questions)</span></label>
          <textarea className="rb-input" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add vanilla and cinnamon?" />
        </div>

        <div>
          <label className="rb-label">Tags</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
            {tags.map((t) => (
              <span key={t} className="rb-chip">
                {t}
                <button onClick={() => setTags(tags.filter((x) => x !== t))}><X size={11} /></button>
              </span>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <input
              className="rb-input"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(tagInput); } }}
              placeholder="Type a tag and press Enter (e.g. dessert)"
            />
            {tagSuggestions.length > 0 && (
              <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "var(--surface-lowest)", border: "1px solid var(--outline-variant)", borderRadius: 4, marginTop: 4, zIndex: 5, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                {tagSuggestions.slice(0, 5).map((t) => (
                  <div
                    key={t}
                    style={{ padding: "8px 12px", cursor: "pointer", fontSize: 13 }}
                    onClick={() => addTag(t)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className="rb-btn-primary" style={{ justifyContent: "center", marginTop: 8 }} onClick={handleSave} disabled={!title.trim()}>
          Save recipe
        </button>
      </div>
    </div>
  );
}
