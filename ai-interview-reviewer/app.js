(function () {
  "use strict";

  var examples = window.INTERVIEW_EXAMPLES || [];
  var storageKey = "ai-interview-field-guide-completed-v1";
  var state = { topic: "all", level: "all", role: "all", completed: loadCompleted() };
  var topicLabels = { all: "All topics", coding: "Coding", ml: "ML reasoning", transformers: "Transformers", systems: "Systems", leadership: "Leadership" };
  var levelLabels = { all: "All levels", basics: "Basics", intermediate: "Intermediate", advanced: "Advanced", staff: "Staff" };
  var roleLabels = { all: "All roles", "AI engineer": "AI engineer", "Senior AI engineer": "Senior", "Lead / staff": "Lead / staff", "FDE / AI product": "FDE / AI product" };
  var list = document.getElementById("example-list");
  var template = document.getElementById("example-template");

  function loadCompleted() {
    try {
      var saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      return [];
    }
  }

  function saveCompleted() {
    try { localStorage.setItem(storageKey, JSON.stringify(state.completed)); } catch (error) { /* Device storage may be unavailable. */ }
  }

  function makeFilters(targetId, labels, key) {
    var target = document.getElementById(targetId);
    Object.keys(labels).forEach(function (value) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "filter-button";
      button.textContent = labels[value];
      button.dataset.value = value;
      button.setAttribute("aria-pressed", value === "all" ? "true" : "false");
      button.addEventListener("click", function () {
        state[key] = value;
        target.querySelectorAll("button").forEach(function (item) { item.setAttribute("aria-pressed", String(item === button)); });
        renderExamples();
      });
      target.appendChild(button);
    });
  }

  function addList(target, values) {
    values.forEach(function (value) {
      var item = document.createElement("li");
      item.textContent = value;
      target.appendChild(item);
    });
  }

  function renderExamples() {
    list.innerHTML = "";
    var visible = examples.filter(function (example) {
      return (state.topic === "all" || example.topic === state.topic) &&
        (state.level === "all" || example.level === state.level) &&
        (state.role === "all" || example.roles.indexOf(state.role) !== -1);
    });

    visible.forEach(function (example, index) {
      var node = template.content.cloneNode(true);
      var article = node.querySelector(".example");
      var walkthrough = node.querySelector(".walkthrough");
      var reveal = node.querySelector(".reveal-button");
      var checkbox = node.querySelector("input[type='checkbox']");
      var panelId = "walkthrough-" + example.id;

      article.style.setProperty("--item-index", index);
      walkthrough.id = panelId;
      reveal.setAttribute("aria-controls", panelId);
      node.querySelector(".example-number").textContent = String(examples.indexOf(example) + 1).padStart(2, "0");
      node.querySelector(".example-eyebrow").textContent = example.eyebrow;
      node.querySelector(".example-level").textContent = levelLabels[example.level];
      node.querySelector(".example-time").textContent = example.minutes + " min";
      node.querySelector(".example-title").textContent = example.title;
      node.querySelector(".example-description").textContent = example.summary;
      node.querySelector(".example-roles").textContent = example.roles.join(" · ");
      node.querySelector(".prompt").textContent = example.prompt;
      addList(node.querySelector(".questions"), example.questions);
      addList(node.querySelector(".hints"), example.hints);
      node.querySelector(".solution").textContent = example.solution;
      node.querySelector(".code").textContent = example.code;
      node.querySelector(".analysis").textContent = example.analysis;
      node.querySelector(".trap").textContent = example.trap;
      node.querySelector(".follow-up-copy").textContent = example.followUp;
      node.querySelector(".transfer-copy").textContent = example.transfer;

      checkbox.checked = state.completed.indexOf(example.id) !== -1;
      article.classList.toggle("is-complete", checkbox.checked);
      checkbox.addEventListener("change", function () {
        state.completed = checkbox.checked ? state.completed.concat(example.id) : state.completed.filter(function (id) { return id !== example.id; });
        state.completed = state.completed.filter(function (id, position, values) { return values.indexOf(id) === position; });
        article.classList.toggle("is-complete", checkbox.checked);
        saveCompleted();
        updateProgress();
      });

      reveal.addEventListener("click", function () {
        var opening = walkthrough.hidden;
        walkthrough.hidden = !opening;
        reveal.setAttribute("aria-expanded", String(opening));
        reveal.innerHTML = opening ? "Close case <span aria-hidden='true'>−</span>" : "Open case <span aria-hidden='true'>+</span>";
      });

      list.appendChild(node);
    });

    document.getElementById("empty-state").hidden = visible.length !== 0;
    document.getElementById("result-count").textContent = visible.length + (visible.length === 1 ? " case" : " cases");
  }

  function updateProgress() {
    var validCompleted = state.completed.filter(function (id) { return examples.some(function (example) { return example.id === id; }); });
    var count = validCompleted.length;
    var percent = examples.length ? Math.round((count / examples.length) * 100) : 0;
    document.getElementById("complete-count").textContent = count;
    document.getElementById("total-count").textContent = examples.length;
    document.getElementById("progress-bar").style.transform = "scaleX(" + (percent / 100) + ")";
    document.getElementById("progress-track").setAttribute("aria-valuemax", String(examples.length));
    document.getElementById("progress-track").setAttribute("aria-valuenow", String(count));
    document.getElementById("progress-note").textContent = count === examples.length && examples.length ? "Proof set complete. Revisit the follow-ups aloud." : "Start with one case. Your progress stays on this device.";
  }

  function resetFilters() {
    state.topic = "all";
    state.level = "all";
    state.role = "all";
    document.querySelectorAll(".filter-button").forEach(function (button) { button.setAttribute("aria-pressed", String(button.dataset.value === "all")); });
    renderExamples();
  }

  makeFilters("topic-filters", topicLabels, "topic");
  makeFilters("level-filters", levelLabels, "level");
  makeFilters("role-filters", roleLabels, "role");
  document.getElementById("clear-filters").addEventListener("click", resetFilters);
  document.getElementById("reset-progress").addEventListener("click", function () {
    if (state.completed.length && !window.confirm("Reset every reviewed example on this device?")) return;
    state.completed = [];
    saveCompleted();
    renderExamples();
    updateProgress();
  });
  renderExamples();
  updateProgress();
}());
