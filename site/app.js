/* Vinicius Orefice · App do aluno — lógica real, sem build. */
(function () {
  "use strict";

  /* ---------- utilidades de pace e velocidade ---------- */
  function round1(x) { return Math.round(x * 10) / 10; }
  function fmtKmh(x) { return round1(x).toFixed(1).replace(".", ","); }
  function paceToKmh(secPorKm) { return 3600 / secPorKm; }
  function kmhToPaceSec(kmh) { return 3600 / kmh; }
  function fmtPace(sec) {
    sec = Math.round(sec);
    var m = Math.floor(sec / 60), s = sec % 60;
    if (s === 60) { m += 1; s = 0; }
    return m + ":" + (s < 10 ? "0" + s : s);
  }
  function parsePace(txt) {
    if (txt == null) return null;
    txt = String(txt).trim().replace(",", ".");
    if (!txt) return null;
    if (txt.indexOf(":") >= 0) {
      var p = txt.split(":");
      if (p.length !== 2) return null;
      var m = parseInt(p[0], 10), s = parseInt(p[1], 10);
      if (isNaN(m) || isNaN(s) || s < 0 || s >= 60 || m < 0) return null;
      var total = m * 60 + s;
      return (total >= 60 && total <= 1200) ? total : null;
    }
    var dec = parseFloat(txt);
    if (isNaN(dec) || dec <= 0) return null;
    var t2 = Math.round(dec * 60);
    return (t2 >= 60 && t2 <= 1200) ? t2 : null;
  }
  function parseKmh(txt) {
    if (txt == null) return null;
    var v = parseFloat(String(txt).trim().replace(",", "."));
    if (isNaN(v) || v < 4 || v > 25) return null;
    return round1(v);
  }
  function fmtTempo(seg) {
    seg = Math.max(0, Math.round(seg));
    var h = Math.floor(seg / 3600), m = Math.floor((seg % 3600) / 60), s = seg % 60;
    function p(n) { return n < 10 ? "0" + n : "" + n; }
    return h > 0 ? h + ":" + p(m) + ":" + p(s) : m + ":" + p(s);
  }
  function $(id) { return document.getElementById(id); }
  function on(id, ev, fn) { var el = $(id); if (el) el.addEventListener(ev, fn); }

  /* ---------- roteador site / app ---------- */
  function mostrarRota() {
    var h = location.hash || "";
    var ehApp = h === "#/app" || h.indexOf("#/app") === 0;
    $("view-site").hidden = ehApp;
    $("view-app").hidden = !ehApp;
    if (ehApp) { window.scrollTo(0, 0); }
  }
  window.addEventListener("hashchange", mostrarRota);

  /* ---------- reveal do site ---------- */
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visivel"); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { obs.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visivel"); });
  }

  /* ---------- vitrine do site (primeiros 4 produtos) ---------- */
  var PRODUTOS = [
    { nome: "Camiseta preta", imgs: ["01_camiseta-preta_1.webp", "01_camiseta-preta_2.webp", "01_camiseta-preta_3.webp"] },
    { nome: "Camiseta branca", imgs: ["02_camiseta-branca_1.webp", "02_camiseta-branca_2.webp", "02_camiseta-branca_3.webp"] },
    { nome: "Camiseta laranja", imgs: ["03_camiseta-laranja_1.webp", "03_camiseta-laranja_2.webp", "03_camiseta-laranja_3.webp"] },
    { nome: "Regata laranja masculina", imgs: ["04_regata-laranja-masc_1.webp", "04_regata-laranja-masc_2.webp", "04_regata-laranja-masc_3.webp"] },
    { nome: "Babylook laranja", imgs: ["05_babylook-laranja_1.webp", "05_babylook-laranja_2.webp"] },
    { nome: "Babylook branca", imgs: ["06_babylook-branca_1.webp", "06_babylook-branca_2.webp", "06_babylook-branca_3.webp"] },
    { nome: "Babylook preta", imgs: ["07_babylook-preta_1.webp", "07_babylook-preta_2.webp", "07_babylook-preta_3.webp"] },
    { nome: "Regata laranja feminina", imgs: ["08_regata-laranja-fem_1.webp", "08_regata-laranja-fem_2.webp"] },
    { nome: "Top preto", imgs: ["09_top-preto_1.webp", "09_top-preto_2.webp"] },
    { nome: "Cropped preto", imgs: ["10_cropped-preto_1.webp", "10_cropped-preto_2.webp"] },
    { nome: "Moletom preto", imgs: ["11_moletom-preto_1.webp", "11_moletom-preto_2.webp", "11_moletom-preto_3.webp"] }
  ];
  function imgLoja(f) { return "../loja/" + f; }

  (function vitrine() {
    var box = $("vitrine-site");
    if (!box) return;
    box.innerHTML = PRODUTOS.slice(0, 4).map(function (p) {
      return '<figure><img src="' + imgLoja(p.imgs[0]) + '" alt="' + p.nome + '" loading="lazy">' +
        "<figcaption>" + p.nome + "<span>Uniforme da equipe</span></figcaption></figure>";
    }).join("");
  })();

  /* ---------- abas do app ---------- */
  var ABAS = ["esteira", "agenda", "loja", "ranking"];
  function abrirAba(nome) {
    ABAS.forEach(function (a) {
      $("aba-" + a).hidden = a !== nome;
    });
    document.querySelectorAll(".app-nav button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-aba") === nome ? "true" : "false");
    });
    window.scrollTo(0, 0);
  }
  document.querySelectorAll(".app-nav button").forEach(function (b) {
    b.addEventListener("click", function () { abrirAba(b.getAttribute("data-aba")); });
  });
  document.querySelectorAll("[data-abrir-loja]").forEach(function (a) {
    a.addEventListener("click", function () { abrirAba("loja"); });
  });

  /* ---------- conversor ---------- */
  var convPaceSec = 330; /* 5:30 */
  function atualizarConversorPace() {
    var kmh = round1(paceToKmh(convPaceSec));
    $("conv-kmh").textContent = fmtKmh(kmh);
    $("conv-pace-txt").textContent = fmtPace(convPaceSec);
    $("conv-pace-input").value = fmtPace(convPaceSec);
    $("conv-slider").value = convPaceSec;
    desenharRegua(kmh);
  }
  function desenharRegua(kmhCentro) {
    var box = $("conv-regua");
    var html = "";
    for (var d = -3; d <= 3; d++) {
      var v = round1(kmhCentro + d * 0.1);
      if (v < 4 || v > 25) continue;
      var ativo = d === 0;
      html += '<button type="button" data-kmh="' + v.toFixed(1) + '" aria-pressed="' + (ativo ? "true" : "false") + '">' +
        '<span class="v">' + fmtKmh(v) + '</span><span class="p">' + fmtPace(kmhToPaceSec(v)) + "</span></button>";
    }
    box.innerHTML = html;
    box.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = parseFloat(b.getAttribute("data-kmh"));
        convPaceSec = Math.round(kmhToPaceSec(v));
        atualizarConversorPace();
      });
    });
  }
  function atualizarConversorFaixa() {
    var a = parsePace($("conv-faixa-1").value);
    var b = parsePace($("conv-faixa-2").value);
    if (a == null || b == null || a === b) {
      $("conv-faixa-kmh").textContent = "—";
      $("conv-faixa-pace-txt").textContent = "pace inválido";
      return;
    }
    var k1 = paceToKmh(a), k2 = paceToKmh(b);
    var lo = Math.min(k1, k2), hi = Math.max(k1, k2);
    $("conv-faixa-kmh").textContent = fmtKmh(lo) + " a " + fmtKmh(hi);
    $("conv-faixa-pace-txt").textContent = fmtPace(a) + " a " + fmtPace(b);
    desenharRegua(round1((lo + hi) / 2));
  }
  function atualizarConversorKmh() {
    var v = parseKmh($("conv-kmh-input").value);
    if (v == null) { $("conv-pace-grande").textContent = "—"; return; }
    $("conv-pace-grande").textContent = fmtPace(kmhToPaceSec(v));
    $("conv-kmh-txt").textContent = fmtKmh(v);
    desenharRegua(v);
  }
  function modoConversor(modo) {
    [["pace", "conv-bloco-pace"], ["faixa", "conv-bloco-faixa"], ["kmh", "conv-bloco-kmh"]].forEach(function (par) {
      $("conv-modo-" + par[0]).setAttribute("aria-pressed", par[0] === modo ? "true" : "false");
      $(par[1]).hidden = par[0] !== modo;
    });
    if (modo === "pace") atualizarConversorPace();
    if (modo === "faixa") atualizarConversorFaixa();
    if (modo === "kmh") atualizarConversorKmh();
  }
  on("conv-modo-pace", "click", function () { modoConversor("pace"); });
  on("conv-modo-faixa", "click", function () { modoConversor("faixa"); });
  on("conv-modo-kmh", "click", function () { modoConversor("kmh"); });
  on("conv-slider", "input", function (e) { convPaceSec = parseInt(e.target.value, 10); atualizarConversorPace(); });
  on("conv-pace-input", "change", function (e) {
    var v = parsePace(e.target.value);
    if (v != null) { convPaceSec = v; atualizarConversorPace(); }
    else { e.target.value = fmtPace(convPaceSec); }
  });
  function passoPace(delta) {
    convPaceSec = Math.min(600, Math.max(180, convPaceSec + delta));
    atualizarConversorPace();
  }
  on("conv-menos", "click", function () { passoPace(1); });
  on("conv-mais", "click", function () { passoPace(-1); });
  on("conv-faixa-1", "input", atualizarConversorFaixa);
  on("conv-faixa-2", "input", atualizarConversorFaixa);
  on("conv-kmh-input", "input", atualizarConversorKmh);
  function passoKmh(delta) {
    var v = parseKmh($("conv-kmh-input").value);
    if (v == null) v = 10.9;
    $("conv-kmh-input").value = fmtKmh(round1(v + delta));
    atualizarConversorKmh();
  }
  on("kmh-menos", "click", function () { passoKmh(-0.1); });
  on("kmh-mais", "click", function () { passoKmh(0.1); });
  on("seg-treinos", "click", function () {
    $("seg-treinos").setAttribute("aria-pressed", "true");
    $("seg-conversor").setAttribute("aria-pressed", "false");
    $("painel-treinos").hidden = false;
    $("painel-conversor").hidden = true;
  });
  on("seg-conversor", "click", function () {
    $("seg-conversor").setAttribute("aria-pressed", "true");
    $("seg-treinos").setAttribute("aria-pressed", "false");
    $("painel-conversor").hidden = false;
    $("painel-treinos").hidden = true;
    atualizarConversorPace();
  });

  /* ---------- treinos: modelo, modelos do Vini, localStorage ---------- */
  var CHAVE = "vo_treinos_v1";
  function passo(modo, valor, paceMode, pace1, pace2) {
    return { modo: modo, valor: valor, paceMode: paceMode, pace1: pace1, pace2: pace2 || null };
  }
  var MODELOS = [
    {
      nome: "FARTLEK Z4 400X200",
      warmup: passo("dist", 1, "single", 360, null),
      reps: 6,
      a: passo("dist", 0.4, "single", 270, null),
      b: passo("dist", 0.2, "single", 330, null),
      cooldown: passo("dist", 1, "single", 360, null)
    },
    {
      nome: "FARTLEK Z3 300X500",
      warmup: passo("dist", 1, "single", 360, null),
      reps: 3,
      a: passo("dist", 0.3, "single", 300, null),
      b: passo("dist", 0.5, "single", 330, null),
      cooldown: passo("dist", 1, "single", 360, null)
    },
    {
      nome: "18KM RODAGEM Z2",
      warmup: passo("dist", 1, "single", 360, null),
      reps: 1,
      a: passo("dist", 16, "single", 330, null),
      b: null,
      cooldown: passo("dist", 1, "single", 360, null)
    }
  ];
  function carregarTreinos() {
    try {
      var raw = localStorage.getItem(CHAVE);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }
  function salvarTreinos(arr) {
    try { localStorage.setItem(CHAVE, JSON.stringify(arr)); } catch (e) { /* sem localStorage: segue sem salvar */ }
  }
  function novoId() { return "t" + Date.now().toString(36) + Math.floor(Math.random() * 999); }
  function clonar(o) { return JSON.parse(JSON.stringify(o)); }

  function passoKmh(p) {
    var pace = p.paceMode === "range" && p.pace2 ? (p.pace1 + p.pace2) / 2 : p.pace1;
    return round1(paceToKmh(pace));
  }
  function passoDuracao(p) {
    var kmh = passoKmh(p);
    return p.modo === "dist" ? (p.valor / kmh) * 3600 : p.valor * 60;
  }
  function passoDist(p) {
    var kmh = passoKmh(p);
    return p.modo === "dist" ? p.valor : kmh * (p.valor / 60);
  }
  function passoResumo(p) {
    var kmh = passoKmh(p);
    var q = p.modo === "dist" ? p.valor + " km" : p.valor + " min";
    var paceTxt = p.paceMode === "range" && p.pace2
      ? fmtPace(p.pace1) + " a " + fmtPace(p.pace2) + " /km"
      : fmtPace(p.pace1) + " /km";
    return q + " a " + paceTxt + " (" + fmtKmh(kmh) + " km/h)";
  }
  function expandirTreino(w) {
    var steps = [];
    function empurrar(rotulo, p) {
      steps.push({
        rotulo: rotulo, modo: p.modo, valor: p.valor,
        kmh: passoKmh(p), paceSec: p.paceMode === "range" && p.pace2 ? (p.pace1 + p.pace2) / 2 : p.pace1,
        duracao: passoDuracao(p), dist: passoDist(p)
      });
    }
    empurrar("Aquecimento", w.warmup);
    for (var i = 1; i <= w.reps; i++) {
      if (w.b) {
        empurrar("Tiro " + i + " de " + w.reps, w.a);
        empurrar("Recuperação " + i + " de " + w.reps, w.b);
      } else {
        empurrar(w.reps === 1 ? "Bloco único" : "Bloco " + i + " de " + w.reps, w.a);
      }
    }
    empurrar("Desaquecimento", w.cooldown);
    return steps;
  }
  function resumoTreino(w) {
    var steps = expandirTreino(w);
    var dist = 0, tempo = 0;
    steps.forEach(function (s) { dist += s.dist; tempo += s.duracao; });
    return { steps: steps, dist: round1(dist), tempo: Math.round(tempo) };
  }
  function textoTreino(w) {
    var r = resumoTreino(w);
    return r.dist.toFixed(1).replace(".", ",") + " km · " + fmtTempo(r.tempo) + " · " + r.steps.length + " etapas";
  }

  function renderizarTreinos() {
    var arr = carregarTreinos();
    var box = $("lista-treinos");
    if (!arr.length) {
      box.innerHTML = '<p class="hint">Nenhum treino salvo ainda. Use um modelo do Vini ou crie o seu.</p>';
    } else {
      box.innerHTML = arr.map(function (w) {
        return '<div class="treino-item"><div><div class="nome">' + esc(w.nome) + '</div>' +
          '<div class="detalhe">' + textoTreino(w) + '</div></div>' +
          '<div class="acoes">' +
          '<button type="button" class="btn-icone" data-rodar="' + w.id + '">Rodar</button>' +
          '<button type="button" class="btn-icone" data-editar="' + w.id + '">Editar</button>' +
          '<button type="button" class="btn-icone perigo" data-apagar="' + w.id + '" aria-label="Apagar ' + esc(w.nome) + '">Apagar</button>' +
          "</div></div>";
      }).join("");
      box.querySelectorAll("[data-rodar]").forEach(function (b) {
        b.addEventListener("click", function () {
          var w = carregarTreinos().find(function (x) { return x.id === b.getAttribute("data-rodar"); });
          if (w) iniciarPlayer(w);
        });
      });
      box.querySelectorAll("[data-editar]").forEach(function (b) {
        b.addEventListener("click", function () {
          var w = carregarTreinos().find(function (x) { return x.id === b.getAttribute("data-editar"); });
          if (w) abrirEditor(w);
        });
      });
      box.querySelectorAll("[data-apagar]").forEach(function (b) {
        b.addEventListener("click", function () {
          var id = b.getAttribute("data-apagar");
          salvarTreinos(carregarTreinos().filter(function (x) { return x.id !== id; }));
          renderizarTreinos();
        });
      });
    }
    var mod = $("lista-modelos");
    mod.innerHTML = MODELOS.map(function (w, i) {
      return '<div class="treino-item"><div><div class="nome">' + esc(w.nome) + '</div>' +
        '<div class="detalhe">' + textoTreino(w) + '</div></div>' +
        '<div class="acoes"><button type="button" class="btn-icone" data-usar="' + i + '">Usar</button></div></div>';
    }).join("");
    mod.querySelectorAll("[data-usar]").forEach(function (b) {
      b.addEventListener("click", function () {
        var w = clonar(MODELOS[parseInt(b.getAttribute("data-usar"), 10)]);
        w.id = novoId();
        var arr2 = carregarTreinos();
        arr2.push(w);
        salvarTreinos(arr2);
        renderizarTreinos();
        abrirEditor(w);
      });
    });
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---------- editor ---------- */
  var editandoId = null;
  function setSeg(grupo, val) {
    document.querySelectorAll('[data-grupo="' + grupo + '"] button').forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-val") === val ? "true" : "false");
    });
    sincronizarEditor();
  }
  function getSeg(grupo) {
    var b = document.querySelector('[data-grupo="' + grupo + '"] button[aria-pressed="true"]');
    return b ? b.getAttribute("data-val") : "dist";
  }
  document.querySelectorAll(".mini-seg button").forEach(function (b) {
    b.addEventListener("click", function () {
      setSeg(b.parentElement.getAttribute("data-grupo"), b.getAttribute("data-val"));
    });
  });
  on("f-tem-b", "change", sincronizarEditor);
  ["f-nome", "f-aq-valor", "f-aq-pace1", "f-aq-pace2", "f-reps", "f-a-valor", "f-a-pace1", "f-a-pace2",
   "f-b-valor", "f-b-pace1", "f-b-pace2", "f-dq-valor", "f-dq-pace1", "f-dq-pace2"].forEach(function (id) {
    on(id, "input", sincronizarEditor);
  });

  function sincronizarEditor() {
    $("wrap-aq-pace2").hidden = getSeg("aq-pace") !== "range";
    $("wrap-a-pace2").hidden = getSeg("a-pace") !== "range";
    $("wrap-b-pace2").hidden = getSeg("b-pace") !== "range";
    $("wrap-b").hidden = !$("f-tem-b").checked;
    atualizarResumoEditor();
  }
  function lerPasso(prefixo, grupoModo, grupoPace) {
    var valor = parseFloat(String($(prefixo + "-valor").value).replace(",", "."));
    var pace1 = parsePace($(prefixo + "-pace1").value);
    var paceMode = getSeg(grupoPace);
    var pace2 = paceMode === "range" ? parsePace($(prefixo + "-pace2").value) : null;
    return { modo: getSeg(grupoModo), valor: valor, paceMode: paceMode, pace1: pace1, pace2: pace2 };
  }
  function lerTreinoDoEditor() {
    var nome = $("f-nome").value.trim() || "Treino sem nome";
    var reps = parseInt($("f-reps").value, 10);
    var w = {
      id: editandoId || novoId(),
      nome: nome,
      warmup: lerPasso("f-aq", "aq-modo", "aq-pace"),
      reps: reps,
      a: lerPasso("f-a", "a-modo", "a-pace"),
      b: $("f-tem-b").checked ? lerPasso("f-b", "b-modo", "b-pace") : null,
      cooldown: lerPasso("f-dq", "dq-modo", "dq-pace")
    };
    return w;
  }
  function validarTreino(w) {
    var passos = [w.warmup, w.a, w.cooldown];
    if (w.b) passos.push(w.b);
    for (var i = 0; i < passos.length; i++) {
      var p = passos[i];
      if (!(p.valor > 0)) return "Confira os valores: cada etapa precisa de valor maior que zero.";
      if (p.pace1 == null) return "Confira o pace: use o formato min:seg, por exemplo 5:30.";
      if (p.paceMode === "range" && p.pace2 == null) return "Confira a faixa de pace: os dois paces precisam estar no formato min:seg.";
    }
    if (!(w.reps >= 1 && w.reps <= 30)) return "Repetições entre 1 e 30.";
    return null;
  }
  function atualizarResumoEditor() {
    var box = $("resumo-treino");
    var w = lerTreinoDoEditor();
    var erro = validarTreino(w);
    if (erro) { box.textContent = "Confira os campos para ver o resumo."; return; }
    var r = resumoTreino(w);
    box.innerHTML =
      "<b>" + esc(w.nome) + "</b>\n" +
      "Aquecimento · " + passoResumo(w.warmup) + "\n" +
      w.reps + "x (" + passoResumo(w.a) + " + " + (w.b ? passoResumo(w.b) : "sem recuperação") + ")\n" +
      "Desaquecimento · " + passoResumo(w.cooldown) + "\n" +
      "<b>Total: " + r.dist.toFixed(1).replace(".", ",") + " km · " + fmtTempo(r.tempo) + " · " + r.steps.length + " etapas</b>";
  }
  function preencherPasso(prefixo, grupoModo, grupoPace, p) {
    setSeg(grupoModo, p.modo);
    $(prefixo + "-valor").value = p.valor;
    setSeg(grupoPace, p.paceMode);
    $(prefixo + "-pace1").value = fmtPace(p.pace1);
    $(prefixo + "-pace2").value = p.pace2 ? fmtPace(p.pace2) : "";
  }
  function abrirEditor(w) {
    editandoId = w ? w.id : null;
    $("editor-titulo").textContent = w ? "Editar treino" : "Novo treino";
    $("editor-treino").hidden = false;
    $("editor-erro").hidden = true;
    if (w) {
      $("f-nome").value = w.nome;
      preencherPasso("f-aq", "aq-modo", "aq-pace", w.warmup);
      $("f-reps").value = w.reps;
      preencherPasso("f-a", "a-modo", "a-pace", w.a);
      $("f-tem-b").checked = !!w.b;
      if (w.b) preencherPasso("f-b", "b-modo", "b-pace", w.b);
      preencherPasso("f-dq", "dq-modo", "dq-pace", w.cooldown);
    } else {
      $("f-nome").value = "";
      preencherPasso("f-aq", "aq-modo", "aq-pace", passo("dist", 1, "single", 360, null));
      $("f-reps").value = 6;
      preencherPasso("f-a", "a-modo", "a-pace", passo("dist", 0.4, "single", 270, null));
      $("f-tem-b").checked = true;
      preencherPasso("f-b", "b-modo", "b-pace", passo("dist", 0.2, "single", 330, null));
      preencherPasso("f-dq", "dq-modo", "dq-pace", passo("dist", 1, "single", 360, null));
    }
    sincronizarEditor();
    $("editor-treino").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  on("btn-novo-treino", "click", function () { abrirEditor(null); });
  on("btn-cancelar-treino", "click", function () { $("editor-treino").hidden = true; });
  on("btn-salvar-treino", "click", function () {
    var w = lerTreinoDoEditor();
    var erro = validarTreino(w);
    if (erro) {
      var e = $("editor-erro");
      e.textContent = erro;
      e.hidden = false;
      return;
    }
    var arr = carregarTreinos();
    var i = arr.findIndex(function (x) { return x.id === w.id; });
    if (i >= 0) arr[i] = w; else arr.push(w);
    salvarTreinos(arr);
    renderizarTreinos();
    $("editor-treino").hidden = true;
  });

  /* ---------- player da esteira ---------- */
  var P = null; /* estado do player */
  var audioCtx = null;
  var wakeLock = null;

  function garantirAudio() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; }
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  }
  function bipe(qtd) {
    if (!audioCtx) return;
    for (var i = 0; i < qtd; i++) {
      (function (n) {
        var o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.type = "sine"; o.frequency.value = 880;
        g.gain.setValueAtTime(0.0001, audioCtx.currentTime + n * 0.22);
        g.gain.exponentialRampToValueAtTime(0.5, audioCtx.currentTime + n * 0.22 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + n * 0.22 + 0.18);
        o.connect(g); g.connect(audioCtx.destination);
        o.start(audioCtx.currentTime + n * 0.22);
        o.stop(audioCtx.currentTime + n * 0.22 + 0.2);
      })(i);
    }
  }
  function falar(texto) {
    if (!("speechSynthesis" in window)) return;
    try {
      var u = new SpeechSynthesisUtterance(texto);
      u.lang = "pt-BR";
      var vozes = speechSynthesis.getVoices();
      var v = null;
      for (var i = 0; i < vozes.length; i++) {
        if (vozes[i].lang && vozes[i].lang.toLowerCase().indexOf("pt") === 0) { v = vozes[i]; break; }
      }
      if (v) u.voice = v;
      u.rate = 1.0;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch (e) { /* voz indisponível: o bipe e o flash continuam */ }
  }
  function vibrar(padrao) {
    try { if (navigator.vibrate) navigator.vibrate(padrao); } catch (e) {}
  }
  function flash() {
    var f = $("flash");
    f.classList.add("ativo");
    setTimeout(function () { f.classList.remove("ativo"); }, 650);
  }
  function pedirWakeLock() {
    try {
      if (navigator.wakeLock && navigator.wakeLock.request) {
        navigator.wakeLock.request("screen").then(function (wl) { wakeLock = wl; }).catch(function () {});
      }
    } catch (e) {}
  }
  function soltarWakeLock() {
    try { if (wakeLock && wakeLock.release) wakeLock.release(); } catch (e) {}
    wakeLock = null;
  }
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && P && !P.pausado) pedirWakeLock();
  });

  function iniciarPlayer(w) {
    garantirAudio();
    var steps = expandirTreino(w);
    P = {
      nome: w.nome, steps: steps, idx: 0,
      pausado: false, avisou: false, timer: null, ultimo: null,
      decorrido: 0, distancia: 0, wake: true
    };
    $("player").hidden = false;
    document.body.style.overflow = "hidden";
    pedirWakeLock();
    carregarEtapa(0);
    P.ultimo = Date.now();
    P.timer = setInterval(tickPlayer, 200);
    falar("Treino iniciado. " + steps[0].rotulo + ", " + fmtKmh(steps[0].kmh) + " km/h.");
    bipe(1);
    atualizarPlayer();
  }
  function carregarEtapa(i) {
    P.idx = i;
    P.avisou = false;
    var s = P.steps[i];
    P.kmhAtual = s.kmh;
    P.restanteDist = s.dist;
    P.restante = s.duracao;
    P.duracaoEtapa = s.duracao;
    esconderAviso();
  }
  function tickPlayer() {
    if (!P || P.pausado) return;
    var agora = Date.now();
    var dt = (agora - P.ultimo) / 1000;
    P.ultimo = agora;
    if (dt > 2) dt = 2;
    var s = P.steps[P.idx];
    P.decorrido += dt;
    P.distancia += (P.kmhAtual / 3600) * dt;
    if (s.modo === "dist") {
      P.restanteDist = Math.max(0, P.restanteDist - (P.kmhAtual / 3600) * dt);
      P.restante = P.kmhAtual > 0 ? (P.restanteDist / P.kmhAtual) * 3600 : 0;
    } else {
      P.restante = Math.max(0, P.restante - dt);
    }
    if (!P.avisou && P.restante <= 10 && P.restante > 0) {
      P.avisou = true;
      avisarTroca();
    }
    if (P.restante <= 0) {
      avancarEtapa();
      return;
    }
    atualizarPlayer();
  }
  function proximaEtapa() {
    return P.idx + 1 < P.steps.length ? P.steps[P.idx + 1] : null;
  }
  function avisarTroca() {
    var prox = proximaEtapa();
    bipe(2);
    vibrar([220, 120, 220]);
    flash();
    var aviso = $("aviso-troca");
    if (prox) {
      aviso.textContent = "Em 10 segundos: " + fmtKmh(prox.kmh) + " km/h · " + prox.rotulo;
      falar("Em 10 segundos, " + fmtKmh(prox.kmh) + " km/h. " + prox.rotulo + ".");
    } else {
      aviso.textContent = "Em 10 segundos: fim do treino";
      falar("Em 10 segundos, fim do treino.");
    }
    aviso.classList.add("visivel");
  }
  function esconderAviso() { $("aviso-troca").classList.remove("visivel"); }
  function avancarEtapa() {
    var prox = proximaEtapa();
    if (!prox) { encerrarPlayer(true); return; }
    carregarEtapa(P.idx + 1);
    P.ultimo = Date.now();
    bipe(1);
    vibrar(150);
    falar("Agora " + fmtKmh(P.kmhAtual) + " km/h. " + prox.rotulo + ".");
    atualizarPlayer();
  }
  function atualizarPlayer() {
    if (!P) return;
    var s = P.steps[P.idx];
    $("player-etapa-nome").innerHTML = "<b>" + esc(s.rotulo) + "</b>";
    $("player-etapa-contagem").textContent = "Etapa " + (P.idx + 1) + " de " + P.steps.length;
    $("player-vel").textContent = fmtKmh(P.kmhAtual);
    $("player-pace").innerHTML = "Pace <b>" + fmtPace(kmhToPaceSec(P.kmhAtual)) + "</b> /km";
    $("player-tempo").textContent = fmtTempo(P.restante);
    $("player-falta").textContent = s.modo === "dist"
      ? "faltam " + P.restanteDist.toFixed(2).replace(".", ",") + " km"
      : "faltam " + fmtTempo(P.restante);
    var pct = P.duracaoEtapa > 0 ? Math.min(100, Math.max(0, (1 - P.restante / P.duracaoEtapa) * 100)) : 100;
    $("player-barra").style.width = pct + "%";
    var prox = proximaEtapa();
    if (prox) {
      $("player-prox-nome").textContent = prox.rotulo;
      $("player-prox-vel").textContent = fmtKmh(prox.kmh);
    } else {
      $("player-prox-nome").textContent = "Fim do treino";
      $("player-prox-vel").textContent = "0,0";
    }
    $("player-pausar-simbolo").textContent = P.pausado ? "▶" : "II";
    $("player-pausar-rotulo").textContent = P.pausado ? "Continuar" : "Pausar";
    $("player-status").textContent = P.pausado ? "Pausado" : "Tela acesa · aviso 10 s antes de cada troca";
  }
  function encerrarPlayer(concluiu) {
    if (!P) return;
    clearInterval(P.timer);
    soltarWakeLock();
    try { if ("speechSynthesis" in window) speechSynthesis.cancel(); } catch (e) {}
    var dist = round1(P.distancia);
    var tempo = Math.round(P.decorrido);
    var etapas = concluiu ? P.steps.length : P.idx;
    var nome = P.nome;
    P = null;
    $("player").hidden = true;
    document.body.style.overflow = "";
    esconderAviso();
    mostrarFim(nome, dist, tempo, etapas);
    if (concluiu) { falar("Treino concluído. " + dist.toFixed(1).replace(".", ",") + " km."); bipe(3); }
  }
  on("player-pausar", "click", function () {
    if (!P) return;
    P.pausado = !P.pausado;
    if (!P.pausado) { P.ultimo = Date.now(); pedirWakeLock(); }
    atualizarPlayer();
  });
  on("player-pular", "click", function () { if (P) avancarEtapa(); });
  on("player-voltar", "click", function () {
    if (!P) return;
    if (P.idx > 0) { carregarEtapa(P.idx - 1); P.ultimo = Date.now(); atualizarPlayer(); }
  });
  on("player-encerrar", "click", function () { encerrarPlayer(false); });
  on("player-fechar", "click", function () { encerrarPlayer(false); });
  function ajustarVelocidade(delta) {
    if (!P) return;
    P.kmhAtual = Math.min(25, Math.max(4, round1(P.kmhAtual + delta)));
    var s = P.steps[P.idx];
    if (s.modo === "dist") {
      P.restante = (P.restanteDist / P.kmhAtual) * 3600;
      P.duracaoEtapa = (s.dist / P.kmhAtual) * 3600;
    }
    atualizarPlayer();
  }
  on("player-menos", "click", function () { ajustarVelocidade(-0.1); });
  on("player-mais", "click", function () { ajustarVelocidade(0.1); });

  /* ---------- fim do treino: card para compartilhar ---------- */
  var ultimoFim = null;
  function mostrarFim(nome, dist, tempo, etapas) {
    ultimoFim = { nome: nome, dist: dist, tempo: tempo, etapas: etapas, data: new Date() };
    $("fim-nome").textContent = nome;
    $("fim-dist").textContent = dist.toFixed(1).replace(".", ",");
    $("fim-tempo").textContent = fmtTempo(tempo);
    $("fim-etapas").textContent = etapas;
    $("fim-detalhe").textContent =
      dist.toFixed(1).replace(".", ",") + " km em " + fmtTempo(tempo) +
      " · " + etapas + " etapas · " +
      ultimoFim.data.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
    $("fim").hidden = false;
  }
  function desenharCardCanvas(dados) {
    return new Promise(function (resolve) {
      var c = document.createElement("canvas");
      c.width = 1080; c.height = 1350;
      var ctx = c.getContext("2d");
      ctx.fillStyle = "#101214"; ctx.fillRect(0, 0, 1080, 1350);
      ctx.fillStyle = "#FFD400"; ctx.fillRect(0, 0, 1080, 18);
      ctx.fillRect(0, 1180, 1080, 10);
      var img = new Image();
      img.onload = function () { desenhar(); };
      img.onerror = function () { desenhar(); };
      img.src = "../logos/logo-horizontal-white.png";
      function desenhar() {
        try { ctx.drawImage(img, 70, 60, 560, 110); } catch (e) {}
        ctx.fillStyle = "#F2EEE3";
        ctx.font = "900 84px Archivo, sans-serif";
        ctx.fillText("TREINO FEITO", 70, 300);
        ctx.fillStyle = "#FFD400";
        ctx.font = "700 34px 'IBM Plex Mono', monospace";
        ctx.fillText("TREINO É DISCIPLINA. PROVA É RECOMPENSA.", 70, 360);
        ctx.fillStyle = "#F2EEE3";
        ctx.font = "900 72px Archivo, sans-serif";
        var nome = dados.nome.length > 26 ? dados.nome.slice(0, 26) + "…" : dados.nome;
        ctx.fillText(nome.toUpperCase(), 70, 470);
        var blocos = [
          [dados.dist.toFixed(1).replace(".", ",") + " km", "DISTÂNCIA"],
          [fmtTempo(dados.tempo), "TEMPO"],
          [String(dados.etapas), "ETAPAS"]
        ];
        blocos.forEach(function (b, i) {
          var x = 70 + i * 330;
          ctx.strokeStyle = "#3A3E42"; ctx.lineWidth = 4;
          ctx.strokeRect(x, 560, 300, 220);
          ctx.fillStyle = "#FFD400";
          ctx.font = "700 64px 'IBM Plex Mono', monospace";
          ctx.textAlign = "center";
          ctx.fillText(b[0], x + 150, 680);
          ctx.fillStyle = "#B9BCB6";
          ctx.font = "700 26px 'IBM Plex Mono', monospace";
          ctx.fillText(b[1], x + 150, 730);
          ctx.textAlign = "left";
        });
        ctx.fillStyle = "#F2EEE3";
        ctx.font = "600 36px 'IBM Plex Mono', monospace";
        ctx.fillText(dados.data.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }), 70, 900);
        ctx.fillStyle = "#FFD400";
        ctx.font = "700 40px 'IBM Plex Mono', monospace";
        ctx.fillText("@viniorefice_", 70, 1250);
        ctx.fillStyle = "#B9BCB6";
        ctx.font = "500 28px 'IBM Plex Mono', monospace";
        ctx.fillText("BAURU, SP", 70, 1300);
        resolve(c);
      }
    });
  }
  function baixarCard() {
    if (!ultimoFim) return;
    desenharCardCanvas(ultimoFim).then(function (c) {
      c.toBlob(function (blob) {
        if (!blob) return;
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "treino-vinicius-orefice.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      }, "image/png");
    });
  }
  on("fim-baixar", "click", baixarCard);
  on("fim-compartilhar", "click", function () {
    if (!ultimoFim) return;
    desenharCardCanvas(ultimoFim).then(function (c) {
      if (c.toBlob && navigator.share) {
        c.toBlob(function (blob) {
          if (!blob) { baixarCard(); return; }
          var arquivo = new File([blob], "treino-vinicius-orefice.png", { type: "image/png" });
          if (navigator.canShare && navigator.canShare({ files: [arquivo] })) {
            navigator.share({ files: [arquivo], title: "Treino feito" }).catch(function () {});
          } else { baixarCard(); }
        }, "image/png");
      } else { baixarCard(); }
    });
  });
  on("fim-voltar", "click", function () {
    $("fim").hidden = true;
    ultimoFim = null;
  });

  /* ---------- agenda ---------- */
  function meiaNoite(d) { var x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
  function diasEntre(a, b) { return Math.round((meiaNoite(b) - meiaNoite(a)) / 86400000); }
  function proximoSabado(hoje) {
    var d = meiaNoite(hoje);
    while (d.getDay() !== 6) d.setDate(d.getDate() + 1);
    return d;
  }
  function textoDias(n) {
    if (n === 0) return "Hoje";
    if (n === 1) return "Amanhã";
    return "Faltam " + n + " dias";
  }
  function fmtData(d) {
    return d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" });
  }
  (function agenda() {
    var hoje = new Date();
    var sab = proximoSabado(hoje);
    var n = diasEntre(hoje, sab);
    $("proximo-evento").innerHTML =
      '<p class="rotulo">Próximo compromisso da equipe</p>' +
      '<div class="dias"><span class="n">' + n + '</span>' +
      '<span class="t">' + (n === 0 ? "Hoje" : n === 1 ? "Amanhã" : "dias") + '<br>Treino presencial</span></div>' +
      '<p class="quando">' + fmtData(sab) + " · 07h · Bauru, SP</p>" +
      '<p class="obs">O local muda (Alphaville, trilha do IPMet, pista da Unesp). A equipe publica o encontro antes, com hora e mapa.</p>' +
      '<p class="obs" style="margin-top:12px"><a class="btn btn-sinal btn-sm" href="https://instagram.com/viniorefice_" target="_blank" rel="noopener">Ver avisos no Instagram</a></p>';
    var lista = "";
    for (var i = 0; i < 4; i++) {
      var d = new Date(sab); d.setDate(d.getDate() + i * 7);
      var dow = d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "");
      lista += '<li><span class="data"><span class="dow">' + dow + '</span><span class="dia">' + d.getDate() + '</span></span>' +
        '<span class="info"><b>Treino presencial · 07h</b><span>' + fmtData(d) + " · " + textoDias(diasEntre(hoje, d)) + " · local a confirmar</span></span></li>";
    }
    $("agenda-lista").innerHTML = lista;
    var prova = new Date(hoje); prova.setDate(prova.getDate() + 21);
    $("prova-exemplo").textContent =
      fmtData(prova) + " · " + textoDias(diasEntre(hoje, prova)) + ". Data de exemplo.";
  })();

  /* ---------- loja do app ---------- */
  (function loja() {
    var box = $("loja-grade");
    box.innerHTML = PRODUTOS.map(function (p, i) {
      var botoes = p.imgs.map(function (f, j) {
        return '<button type="button" data-prod="' + i + '" data-img="' + j + '" aria-pressed="' + (j === 0 ? "true" : "false") + '">Foto ' + (j + 1) + "</button>";
      }).join("");
      return '<article class="produto">' +
        '<img id="prod-img-' + i + '" src="' + imgLoja(p.imgs[0]) + '" alt="' + p.nome + '" loading="lazy">' +
        '<div class="corpo"><div class="nome">' + p.nome + "</div>" +
        '<div class="fotos">' + botoes + "</div>" +
        '<a class="pedir" href="https://instagram.com/viniorefice_" target="_blank" rel="noopener">Pedir no Instagram</a>' +
        "</div></article>";
    }).join("");
    box.querySelectorAll(".fotos button").forEach(function (b) {
      b.addEventListener("click", function () {
        var i = parseInt(b.getAttribute("data-prod"), 10);
        var j = parseInt(b.getAttribute("data-img"), 10);
        $("prod-img-" + i).src = imgLoja(PRODUTOS[i].imgs[j]);
        b.parentElement.querySelectorAll("button").forEach(function (x) {
          x.setAttribute("aria-pressed", x === b ? "true" : "false");
        });
      });
    });
  })();

  /* ---------- ranking (exemplo) ---------- */
  (function ranking() {
    var dados = [
      { nome: "Atleta exemplo A", km: 312 },
      { nome: "Atleta exemplo B", km: 298 },
      { nome: "Atleta exemplo C", km: 287 },
      { nome: "Atleta exemplo D", km: 265 },
      { nome: "Atleta exemplo E", km: 240 }
    ];
    var podio = $("podio");
    var ordem = [dados[1], dados[0], dados[2]];
    var posicoes = [2, 1, 3];
    podio.innerHTML = ordem.map(function (d, i) {
      return '<div class="lugar' + (posicoes[i] === 1 ? " primeiro" : "") + '">' +
        '<div class="pos">' + posicoes[i] + '</div><div class="quem">' + d.nome + '</div>' +
        '<div class="km">' + d.km + " km no mês</div></div>";
    }).join("");
    var tb = $("ranking-tabela").querySelector("tbody");
    tb.innerHTML = dados.map(function (d, i) {
      return "<tr><td class='num'>" + (i + 1) + "</td><td>" + d.nome + "</td><td class='num'>" + d.km + " km</td></tr>";
    }).join("");
  })();

  /* ---------- arranque ---------- */
  mostrarRota();
  renderizarTreinos();
  atualizarConversorPace();
  if ("speechSynthesis" in window) { try { speechSynthesis.getVoices(); } catch (e) {} }
})();
