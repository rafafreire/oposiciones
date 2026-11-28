(() => {
  const KEY = 'opogva-progress-admin-age-v1';
  const BOE = 'https://boe.es/buscar/doc.php?id=BOE-A-2026-24839';
  const topics = window.adminAgeBlocks.flatMap(block => block.topics);
  let activeSyllabusBlocks = window.adminAgeBlocks;
  let selectedSyllabusYear = '2026';
  const $ = selector => document.querySelector(selector);
  const fresh = () => ({ progress: {} });
  const state = () => {
    try { return { ...fresh(), ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
    catch { return fresh(); }
  };
  const save = value => localStorage.setItem(KEY, JSON.stringify(value));
  const progress = (value, n) => value.progress?.[n] || { status: 'pending', rating: 0, read: false, notes: '' };
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);

  function showView(name) {
    document.querySelectorAll('.view').forEach(section => section.classList.remove('active-view'));
    $(`#admin-view-${name}`).classList.add('active-view');
    document.querySelectorAll('[data-admin-view]').forEach(button => button.classList.toggle('active', button.dataset.adminView === name));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('[data-admin-view]').forEach(button => button.addEventListener('click', () => showView(button.dataset.adminView)));
  document.querySelectorAll('[data-admin-go]').forEach(button => button.addEventListener('click', () => showView(button.dataset.adminGo)));
  $('#admin-opposition-switch').addEventListener('change', event => {
    const pages = { gva:'index.html', age:'age.html', 'admin-age':'admin-age.html', valencia:'valencia.html', 'gsi-age':'gsi-age.html' };
    window.location.href = pages[event.target.value];
  });

  function renderStats() {
    const value = state();
    const done = topics.filter(topic => progress(value, topic.n).status === 'done').length;
    const inProgress = topics.filter(topic => progress(value, topic.n).status === 'progress').length;
    $('#admin-done').textContent = done;
    $('#admin-in-progress').textContent = inProgress;
    $('#admin-progress').style.width = `${done / topics.length * 100}%`;
    const pending = topics.filter(topic => progress(value, topic.n).status !== 'done');
    $('#admin-next-topics').innerHTML = pending.length
      ? `<p>Te quedan <strong>${pending.length} temas</strong> por completar:</p><ul>${pending.slice(0, 5).map(topic => `<li>Tema ${String(topic.n).padStart(2, '0')} · ${escapeHtml(topic.title)} <span>${progress(value, topic.n).status === 'progress' ? 'En curso' : 'Pendiente'}</span></li>`).join('')}</ul>`
      : '<p class="all-topics-done">✓ Has completado todos los temas.</p>';
  }

  function renderTopics(filter = 'all') {
    const value = state();
    const blocks = activeSyllabusBlocks.filter((block, index) => filter === 'all' || String(index) === filter);
    $('#admin-topic-list').innerHTML = blocks.map(block => `<section class="admin-topic-block"><h2>${escapeHtml(block.name)}</h2>${block.topics.map(topic => {
      const p = progress(value, topic.n), number = String(topic.n).padStart(2, '0');
      const officialSource = selectedSyllabusYear === '2025' ? 'https://boe.es/buscar/doc.php?id=BOE-A-2025-26262' : BOE;
      return `<details class="topic-card admin-study-card"><summary><span class="topic-number">${number}</span><span class="topic-title"><small>${escapeHtml(block.name)}</small><strong>${escapeHtml(topic.title)}</strong></span><span class="topic-state ${p.status === 'done' ? 'is-done' : ''}">${p.status === 'done' ? 'Estudiado' : p.status === 'progress' ? 'En curso' : 'Pendiente'}</span></summary><div class="topic-body"><p>${escapeHtml(topic.scope)}</p><div class="admin-study-controls"><label>Progreso <select data-admin-status="${topic.n}"><option value="pending" ${p.status === 'pending' ? 'selected' : ''}>Pendiente</option><option value="progress" ${p.status === 'progress' ? 'selected' : ''}>En curso</option><option value="done" ${p.status === 'done' ? 'selected' : ''}>Estudiado</option></select></label><label>Dominio <select data-admin-rating="${topic.n}"><option value="0" ${!p.rating ? 'selected' : ''}>Sin valorar</option>${[1,2,3,4,5].map(rating => `<option value="${rating}" ${Number(p.rating) === rating ? 'selected' : ''}>${rating} · ${['','Inicial','Básico','En progreso','Buen dominio','Lo domino'][rating]}</option>`).join('')}</select></label><label class="study-check"><input type="checkbox" data-admin-read="${topic.n}" ${p.read ? 'checked' : ''}><span>He repasado el contenido</span></label></div><label class="admin-notes-label">Mis notas<textarea data-admin-notes="${topic.n}" rows="3" placeholder="Añade aquí tus apuntes o dudas…">${escapeHtml(p.notes || '')}</textarea></label><div class="source-links"><strong>Fuente oficial</strong><a href="${officialSource}" target="_blank" rel="noopener">Programa · BOE ${selectedSyllabusYear} ↗</a></div></div></details>`;
    }).join('')}</section>`).join('');
    $('#admin-topic-list').querySelectorAll('[data-admin-status], [data-admin-rating], [data-admin-read], [data-admin-notes]').forEach(control => {
      const eventName = control.matches('textarea') ? 'input' : 'change';
      control.addEventListener(eventName, () => {
        const updated = state(), number = control.dataset.adminStatus || control.dataset.adminRating || control.dataset.adminRead || control.dataset.adminNotes;
        const current = progress(updated, number);
        updated.progress[number] = {
          ...current,
          ...(control.dataset.adminStatus ? { status: control.value } : {}),
          ...(control.dataset.adminRating ? { rating: Number(control.value) } : {}),
          ...(control.dataset.adminRead ? { read: control.checked } : {}),
          ...(control.dataset.adminNotes ? { notes: control.value } : {})
        };
        save(updated);
        if (control.dataset.adminStatus) {
          const card = control.closest('details');
          const label = card.querySelector('.topic-state');
          label.textContent = control.value === 'done' ? 'Estudiado' : control.value === 'progress' ? 'En curso' : 'Pendiente';
          label.classList.toggle('is-done', control.value === 'done');
        }
        renderStats();
      });
    });
  }

  function renderFilters() {
    $('#admin-topic-filters').innerHTML = `<button class="filter-button active" data-block="all">Todos <span>${activeSyllabusBlocks.reduce((sum, block) => sum + block.topics.length, 0)}</span></button>${activeSyllabusBlocks.map((block, index) => `<button class="filter-button" data-block="${index}">${escapeHtml(block.name.split(' · ')[0])} <span>${block.topics.length}</span></button>`).join('')}`;
    $('#admin-topic-filters').querySelectorAll('[data-block]').forEach(button => button.addEventListener('click', () => {
      $('#admin-topic-filters').querySelectorAll('.filter-button').forEach(item => item.classList.toggle('active', item === button));
      renderTopics(button.dataset.block);
    }));
  }

  async function renderResources() {
    const container = $('#admin-local-resources');
    try {
      const response = await fetch('OPOSICIONES/ADMIN%20AGE/recursos.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('No hay manifiesto publicado');
      const manifest = await response.json();
      const items = Array.isArray(manifest.resources) ? manifest.resources : [];
      if (!items.length) throw new Error('El manifiesto todavía no contiene recursos');
      container.innerHTML = `<section class="panel"><div class="panel-heading"><div><p class="eyebrow">ARCHIVOS LOCALES</p><h2>Material añadido</h2></div></div><div class="source-links">${items.map(item => {
        const path = String(item.path || '');
        if (!path.startsWith('OPOSICIONES/ADMIN AGE/')) return '';
        return `<a href="${encodeURI(path)}" target="_blank" rel="noopener">${escapeHtml(item.title || path.split('/').pop())} ↗</a>`;
      }).join('')}</div></section>`;
    } catch {
      container.innerHTML = '<div class="panel"><p class="panel-description">Aún no hay archivos locales listados. Al añadir material, incorpóralo al manifiesto <code>recursos.json</code> de la carpeta ADMIN AGE.</p></div>';
    }
  }

  $('#admin-syllabus-version').addEventListener('change', async event => {
    const year = event.target.value;
    if (year === '2025') {
      try {
        const response = await fetch('OPOSICIONES/ADMIN%20AGE/TEMARIO/temario-2025.json', { cache: 'no-store' });
        if (!response.ok) throw new Error('No se pudo cargar el programa 2025');
        const syllabus = await response.json();
        const grouped = new Map();
        syllabus.topics.forEach(topic => {
          if (!grouped.has(topic.block)) grouped.set(topic.block, []);
          grouped.get(topic.block).push({ n: topic.number, title: topic.title, scope: topic.scope });
        });
        activeSyllabusBlocks = [...grouped].map(([name, blockTopics]) => ({ name, topics: blockTopics }));
        selectedSyllabusYear = '2025';
        $('#admin-syllabus-notice').textContent = 'Programa extraído del Anexo III de la convocatoria 2025. Sus ocho temas de ofimática incluyen la configuración entonces publicada de Windows 11 y Microsoft 365. Contrasta siempre las normas con el texto vigente.';
        renderFilters();
        renderTopics();
      } catch {
        event.target.value = '2026';
        $('#admin-syllabus-notice').textContent = 'No se pudo cargar el temario 2025. El programa vigente de 2026 sigue seleccionado.';
      }
    } else {
      activeSyllabusBlocks = window.adminAgeBlocks;
      selectedSyllabusYear = '2026';
      $('#admin-syllabus-notice').textContent = 'Programa del Anexo III de la convocatoria de ingreso libre de 2026. El ejercicio combina 40 preguntas de los bloques I–V y 30 de informática y ofimática (bloque VI); la parte práctica comprende 20 preguntas sobre los bloques II–V. Contrasta siempre las normas con el texto vigente.';
      renderFilters();
      renderTopics();
    }
  });

  let examBank = null, currentQuestions = [], questionIndex = 0, examScore = { right: 0, wrong: 0, annulled: 0 };
  const sectionNames = {
    primeraParte: 'Primera parte',
    reservaPrimeraParte: 'Reserva · primera parte',
    supuestoI: 'Supuesto I',
    reservaSupuestoI: 'Reserva · supuesto I',
    supuestoII: 'Supuesto II',
    reservaSupuestoII: 'Reserva · supuesto II'
  };
  const modelPdf = model => `OPOSICIONES/ADMIN%20AGE/EXAMENES/ADVO_2025_${model}.pdf`;

  async function loadExamBank() {
    try {
      const response = await fetch('OPOSICIONES/ADMIN%20AGE/EXAMENES/preguntas-2025.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('No se pudo leer el banco de preguntas');
      examBank = await response.json();
      $('#admin-exam-source').innerHTML = `<a class="material-link" href="${modelPdf('A')}" target="_blank" rel="noopener">Cuestionario A · PDF ↗</a> <a class="material-link" href="${modelPdf('B')}" target="_blank" rel="noopener">Cuestionario B · PDF ↗</a><span>Clave cargada: provisional INAP</span>`;
      $('#admin-exam-start').disabled = false;
    } catch {
      $('#admin-exam-source').textContent = 'No se pudieron cargar los cuestionarios. Abre la aplicación desde GitHub Pages o desde un servidor web.';
      $('#admin-exam-start').disabled = true;
    }
  }

  function startOfficialExam() {
    if (!examBank) return;
    const model = $('#admin-exam-model').value;
    const section = $('#admin-exam-section').value;
    currentQuestions = examBank.models[model].sections[section] || [];
    questionIndex = 0;
    examScore = { right: 0, wrong: 0, annulled: 0 };
    if (!currentQuestions.length) {
      $('#admin-exam-area').innerHTML = '<div class="panel">No hay preguntas en esta parte.</div>';
      return;
    }
    $('#admin-exam-source').innerHTML = `<a class="material-link" href="${modelPdf(model)}" target="_blank" rel="noopener">Abrir cuestionario oficial · Modelo ${model} ↗</a><a class="material-link" href="OPOSICIONES/ADMIN%20AGE/EXAMENES/ADVO_2025_${model}_respuestas_provisionales.pdf" target="_blank" rel="noopener">Plantilla provisional ↗</a><span>${sectionNames[section]} · ${currentQuestions.length} preguntas · corrección provisional</span>`;
    renderOfficialQuestion(model, section);
  }

  function renderOfficialQuestion(model, section) {
    const area = $('#admin-exam-area');
    if (questionIndex >= currentQuestions.length) {
      const scored = examScore.right + examScore.wrong;
      area.innerHTML = `<div class="result-card panel"><span class="stat-icon green">✓</span><h2>Parte terminada</h2><p>${examScore.right} aciertos · ${examScore.wrong} fallos${examScore.annulled ? ` · ${examScore.annulled} anuladas/sin corrección` : ''}${scored ? ` · ${Math.round(examScore.right / scored * 100)} % de acierto` : ''}</p><button class="primary-button" id="admin-exam-again">Repetir esta parte →</button></div>`;
      $('#admin-exam-again').addEventListener('click', startOfficialExam);
      return;
    }
    const question = currentQuestions[questionIndex];
    const labels = Object.keys(question.options);
    const shownNumber = question.printedNumber === question.number ? question.number : `${question.number} (PDF: ${question.printedNumber})`;
    area.innerHTML = `<div class="quiz-card panel"><div class="quiz-meta"><span>MODELO ${model} · ${escapeHtml(sectionNames[section]).toUpperCase()} · PREGUNTA ${shownNumber} / ${currentQuestions.length}</span><span>${question.correct ? 'CON CLAVE' : 'ANULADA / SIN CLAVE'}</span></div><a class="material-link" href="${modelPdf(model)}#page=${question.sourcePage || 1}" target="_blank" rel="noopener">Ver página ${question.sourcePage || 1} del cuestionario oficial ↗</a><div class="quiz-progress"><span style="width:${(questionIndex + 1) / currentQuestions.length * 100}%"></span></div><h2>${escapeHtml(question.question)}</h2><div class="answers">${labels.map((key, index) => `<button class="answer" data-official-answer="${key}"><b>${String.fromCharCode(65 + index)}</b>${escapeHtml(question.options[key])}</button>`).join('')}</div><div class="feedback-slot"></div><div class="quiz-actions"><button class="secondary-button" id="admin-exam-next" disabled>${questionIndex + 1 === currentQuestions.length ? 'Ver resultado' : 'Siguiente pregunta →'}</button></div></div>`;
    area.querySelectorAll('[data-official-answer]').forEach(button => button.addEventListener('click', () => {
      const selected = button.dataset.officialAnswer;
      area.querySelectorAll('[data-official-answer]').forEach(option => {
        option.disabled = true;
        if (question.correct && option.dataset.officialAnswer === question.correct.toLowerCase()) option.classList.add('correct');
        else if (option.dataset.officialAnswer === selected) option.classList.add('incorrect');
      });
      if (!question.correct) {
        examScore.annulled++;
        area.querySelector('.feedback-slot').innerHTML = '<div class="feedback">Esta pregunta no se puntúa: la plantilla provisional no contiene una respuesta válida.</div>';
      } else {
        const correct = selected.toLowerCase() === question.correct.toLowerCase();
        examScore[correct ? 'right' : 'wrong']++;
        area.querySelector('.feedback-slot').innerHTML = `<div class="feedback ${correct ? 'good' : 'bad'}"><strong>${correct ? 'Correcto' : 'Incorrecto'}</strong><p>La plantilla provisional indica la opción ${question.correct}.</p></div>`;
      }
      $('#admin-exam-next').disabled = false;
    }));
    $('#admin-exam-next').addEventListener('click', () => { questionIndex++; renderOfficialQuestion(model, section); });
  }
  $('#admin-exam-start').addEventListener('click', startOfficialExam);

  renderFilters();
  renderTopics();
  renderStats();
  renderResources();
  loadExamBank();
})();
