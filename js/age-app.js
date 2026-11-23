const AGE_KEY='opogva-progress-age-v1';
const AGE_PROGRAM='https://boe.es/buscar/doc.php?id=BOE-A-2025-26262';
const agePdf={
 '2008':'EXAMEN_AUXADMAGE_2008.pdf','2009':'EXAMEN_AUXADMAGE_2009.pdf',
 '2018-A':'EXAMEN_AUXADMAGE_2018_A.pdf','2018-B':'EXAMEN_AUXADMAGE_2018_B.pdf',
 '2019':'EXAMEN_AUXADMAGE_2019.pdf','2022':'EXAMEN_AUXADMAGE_2022.pdf',
 '2024-A':'EXAMEN_AUXADMAGE_2024_A.pdf','2024-B':'EXAMEN_AUXADMAGE_2024_B.pdf',
 '2025-A':'EXAMEN_AUXADMAGE_2025_A.pdf','2025-B':'EXAMEN_AUXADMAGE_2025_B.pdf'
};
const ageTopics=[
['Organización pública',[
'Constitución Española: principios, derechos y garantías.',
'Tribunal Constitucional, reforma constitucional y Corona.',
'Cortes Generales y Defensor del Pueblo.',
'Poder Judicial y organización judicial española.',
'Gobierno y Administración General del Estado.',
'Gobierno abierto, Agenda 2030 y Objetivos de Desarrollo Sostenible.',
'Transparencia, acceso a la información y buen gobierno.',
'Órganos centrales y territoriales de la Administración del Estado.',
'Organización territorial: comunidades autónomas y administración local.',
'Instituciones y funcionamiento de la Unión Europea.',
'Procedimiento administrativo, régimen jurídico y recursos.',
'Protección de datos personales.',
'Personal funcionario: selección, provisión y situaciones administrativas.',
'Derechos, deberes, carrera y retribuciones del personal funcionario.',
'Presupuestos Generales del Estado y ciclo presupuestario.',
'Igualdad, diversidad, discapacidad y dependencia.'
]],
['Actividad administrativa y ofimática',[
'Atención al público y atención a personas con discapacidad.',
'Información administrativa, iniciativas, quejas y reclamaciones.',
'Documentos, registros y archivos.',
'Administración electrónica y servicios a la ciudadanía.',
'Informática básica, hardware, software y seguridad.',
'Entorno Windows 11 y sus elementos principales.',
'Explorador de Windows, carpetas, archivos y búsquedas.',
'Procesador de textos Word 365.',
'Hojas de cálculo Excel 365.',
'Bases de datos Access 365.',
'Correo electrónico Outlook 365.',
'Internet, protocolos, servicios y navegadores.'
]]
].flatMap(([block,titles])=>titles.map((title,index)=>({n:index+1+(block==='Actividad administrativa y ofimática'?16:0),block,title})));
const $age=s=>document.querySelector(s);
const ageFresh=()=>({topicProgress:{},wrong:[],stats:{answered:0,correct:0}});
function ageState(){try{return {...ageFresh(),...JSON.parse(localStorage.getItem(AGE_KEY)||'{}')}}catch{return ageFresh()}}
function ageSave(s){localStorage.setItem(AGE_KEY,JSON.stringify(s));ageRenderStats()}
function ageView(name){document.querySelectorAll('.view').forEach(x=>x.classList.remove('active-view'));$age(`#age-view-${name}`).classList.add('active-view');document.querySelectorAll('[data-age-view]').forEach(x=>x.classList.toggle('active',x.dataset.ageView===name));if(name==='fallos')ageRenderReview();window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-age-view]').forEach(button=>button.addEventListener('click',()=>ageView(button.dataset.ageView)));
document.querySelectorAll('[data-age-go]').forEach(button=>button.addEventListener('click',()=>ageView(button.dataset.ageGo)));
$age('#opposition-switch-age').addEventListener('change',event=>{if(event.target.value==='gva')window.location.href='index.html'});
function ageProgress(s,n){return s.topicProgress?.[n]||{status:'pending',rating:0}}
function ageRenderStats(){const s=ageState(),done=ageTopics.filter(t=>ageProgress(s,t.n).status==='done').length;$age('#age-topics-done').textContent=done;$age('#age-topic-progress').style.width=`${done/ageTopics.length*100}%`;$age('#age-answered-count').textContent=s.stats.answered;$age('#age-correct-count').textContent=s.stats.correct;$age('#age-missed-count').textContent=s.wrong.length;$age('#age-error-badge').textContent=s.wrong.length;const pending=ageTopics.filter(t=>ageProgress(s,t.n).status!=='done');$age('#age-remaining').innerHTML=pending.length?`<p>Te quedan <strong>${pending.length} temas</strong> por completar:</p><ul>${pending.slice(0,6).map(t=>`<li>Tema ${String(t.n).padStart(2,'0')} · ${t.title} <span>${ageProgress(s,t.n).status==='progress'?'En curso':'Pendiente'}</span></li>`).join('')}</ul>${pending.length>6?`<small>y ${pending.length-6} más</small>`:''}`:'<p class="all-topics-done">✓ Has completado todos los temas.</p>'}
function ageRenderTopics(){
 const s=ageState();
 $age('#age-topic-list').innerHTML=ageTopics.map(t=>{
  const p=ageProgress(s,t.n),status=p.status==='done'?'Estudiado':p.status==='progress'?'En curso':'Pendiente',number=String(t.n).padStart(2,'0');
  return `<article class="topic-card age-topic age-study-card"><button class="age-topic-open" type="button" data-open-age-topic="${t.n}" aria-label="Abrir tema ${number}"><span class="topic-number">${number}</span><span class="topic-title"><small>${t.block.toUpperCase()}</small><strong>${t.title}</strong></span><span class="topic-state ${p.status==='done'?'is-done':''}">${status}</span><span class="age-topic-arrow" aria-hidden="true">↗</span></button><div class="age-study-toolbar"><div class="age-study-controls"><label><span>Progreso</span><select data-age-status="${t.n}"><option value="pending" ${p.status==='pending'?'selected':''}>Pendiente</option><option value="progress" ${p.status==='progress'?'selected':''}>En curso</option><option value="done" ${p.status==='done'?'selected':''}>Estudiado</option></select></label><label><span>Autoevaluación</span><select data-age-rating="${t.n}"><option value="0" ${!p.rating?'selected':''}>Sin valorar</option>${[1,2,3,4,5].map(v=>`<option value="${v}" ${p.rating===v?'selected':''}>${v} · ${['','Inicial','Básico','En progreso','Buen dominio','Lo domino'][v]}</option>`).join('')}</select></label></div><div class="age-topic-actions"><button type="button" class="secondary-button" data-age-outline="${t.n}">Esquema ↗</button><button type="button" class="secondary-button" data-age-summary="${t.n}">Resumen ↗</button><button type="button" class="secondary-button" data-age-questions="${t.n}">Preguntas ↗</button><button type="button" class="secondary-button" data-open-age-topic="${t.n}">Tema completo ↗</button></div><div class="age-study-checks"><label><input type="checkbox" data-age-read="${t.n}" ${p.read?'checked':''}><span>He leído el tema</span></label><label><input type="checkbox" data-age-complete="${t.n}" ${p.status==='done'?'checked':''}><span>Temario completado</span></label></div></div></article>`
 }).join('');
 const update=(el,change)=>{const st=ageState(),n=Number(el.dataset.ageStatus||el.dataset.ageRating||el.dataset.ageRead||el.dataset.ageComplete);st.topicProgress[n]={...ageProgress(st,n),...change};ageSave(st);ageRenderTopics()};
 document.querySelectorAll('[data-age-status]').forEach(el=>el.addEventListener('change',()=>update(el,{status:el.value})));
 document.querySelectorAll('[data-age-rating]').forEach(el=>el.addEventListener('change',()=>update(el,{rating:Number(el.value)})));
 document.querySelectorAll('[data-age-read]').forEach(el=>el.addEventListener('change',()=>update(el,{read:el.checked})));
 document.querySelectorAll('[data-age-complete]').forEach(el=>el.addEventListener('change',()=>update(el,{status:el.checked?'done':'progress'})));
 document.querySelectorAll('[data-open-age-topic]').forEach(el=>el.addEventListener('click',()=>ageOpenMaterialTopic(Number(el.dataset.openAgeTopic))));
 document.querySelectorAll('[data-age-outline]').forEach(el=>el.addEventListener('click',()=>ageOpenTopicAid(Number(el.dataset.ageOutline),'outline')));
 document.querySelectorAll('[data-age-summary]').forEach(el=>el.addEventListener('click',()=>ageOpenTopicAid(Number(el.dataset.ageSummary),'summary')));
 document.querySelectorAll('[data-age-questions]').forEach(el=>el.addEventListener('click',()=>ageOpenTopicQuestionsPage(Number(el.dataset.ageQuestions))) )
}const ageTopicMaterialCache=new Map();
// The Block II folder duplicates its Explorer file as TEMA 24; Word and Excel are in TEMA 25/26.
const ageBlockIIFiles={17:'TEMA 17',18:'TEMA 18',19:'TEMA 19',20:'TEMA 20',21:'TEMA 21',22:'TEMA 22',23:'TEMA 23',24:'TEMA 25',25:'TEMA 26',27:'TEMA 27',28:'TEMA 28'};
async function ageGetTopicHtml(n){
  if(ageTopicMaterialCache.has(n))return ageTopicMaterialCache.get(n);
  let html;
  const path=n<=16
    ?`OPOSICIONES/AUX ADM AGE/TEMARIO/BLOQUE I/TEMA ${String(n).padStart(2,'0')}`
    :ageBlockIIFiles[n]?`OPOSICIONES/AUX ADM AGE/TEMARIO/BLOQUE II/${ageBlockIIFiles[n]}`:null;
  if(path){
    const response=await fetch(new URL(path,location.href),{cache:'no-cache'});
    if(!response.ok)throw new Error(`No se pudo cargar el tema ${n}: HTTP ${response.status}`);
    html=window.ageFormatMaterial(await response.text());
  }else{
    const encoded=window.ageTopicMaterialsB64?.[n];
    if(!encoded)throw new Error(`Falta el material del tema ${n}`);
    const bytes=Uint8Array.from(atob(encoded),char=>char.charCodeAt(0));
    html=ageMarkdownToHtml(new TextDecoder('utf-8').decode(bytes));
  }
  ageTopicMaterialCache.set(n,html);
  return html;
}
function ageReaderLoadingPage(topic){return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${ageEscape(topic.title)}</title></head><body><p style="font:16px system-ui;padding:24px">Cargando el tema…</p></body></html>`}
function ageReaderPage(topic,n,content){
  const topicNumber=String(n).padStart(2,'0');
  const audioHref=new URL(`assets/audio/age-tema-${topicNumber}.mp3`,location.href).href;
  const manifestHref=new URL('assets/audio/age-manifest.json',location.href).href;
  const speechScriptHref=new URL('js/topic-reader-speech.js',location.href).href;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${ageEscape(topic.title)}</title><style>*{box-sizing:border-box}body{margin:0;background:#f5f7f2;color:#263328;font:16px/1.8 system-ui,sans-serif}.bar{position:sticky;top:0;z-index:2;background:#fff;border-bottom:1px solid #e5ebe3;padding:10px 18px}.bar-inner{max-width:900px;margin:auto;display:flex;align-items:center;gap:10px;flex-wrap:wrap}.bar button,.bar a{border:1px solid #dce8da;border-radius:7px;padding:8px 11px;background:#f5f8f3;color:#286342;font:600 12px system-ui;cursor:pointer;text-decoration:none}.bar a.download{background:#286342;color:#fff}.bar button:disabled{opacity:.5;cursor:default}.reader-title{font-size:12px;color:#55705a}.speech-controls{display:flex;align-items:center;gap:7px;flex-wrap:wrap}.speech-status{font-size:11px;color:#657665}.speech-speed-label{display:flex;align-items:center;gap:5px;color:#55705a;font-size:11px}.speech-speed{border:1px solid #dce8da;border-radius:6px;background:#fff;color:#286342;padding:6px;font:12px system-ui}.speech-progress{max-width:900px;margin:9px auto 0;display:flex;align-items:center;gap:10px}.speech-progress label{font-size:11px;white-space:nowrap}.speech-progress input{flex:1;min-width:70px;accent-color:#286342;cursor:pointer}.speech-progress output{color:#55705a;font-size:11px;white-space:nowrap}.speech-highlight{border-radius:3px;background:#fff2b8!important;color:#263328;box-shadow:inset 0 0 0 1px #e8c94e}::selection{background:#ffe27a;color:#263328}main{max-width:900px;margin:26px auto;padding:30px 42px;background:#fff;border:1px solid #e7ebe4;border-radius:14px}h1{font:700 26px/1.4 system-ui;color:#245c43}h2,h3,h4{color:#286342;line-height:1.45}h2{font-size:19px}h3{font-size:15px}p{margin:9px 0}li{margin:5px 0}.age-material-lead{padding:12px 14px;border-left:3px solid #83a98a;border-radius:6px;background:#f2f7f1;color:#405b43;font-weight:600}.age-law-code{margin:20px 0 3px;color:#245c43;font-size:16px}.age-law-title{color:#758275;font-size:13px}.age-law-block{margin:22px 0 28px}.age-law-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 0 10px;border-bottom:1px solid #e3ebe1;cursor:pointer;list-style:none}.age-law-heading::-webkit-details-marker{display:none}.age-law-heading .age-law-code{flex:1;margin:0}.age-law-heading .age-law-title{margin:0}.age-law-toggle{flex:0 0 auto;color:#55705a;font-size:18px}.age-law-toggle::before{content:"⌃"}.age-law-block:not([open]) .age-law-toggle::before{content:"⌄"}.age-law-content{padding-top:2px}.age-material-article{margin:15px 0;padding:14px 17px;border:1px solid #e3ebe1;border-left:4px solid #8bb497;border-radius:9px;background:#f7faf6}.age-material-article h3{margin:0 0 9px}.age-material-hierarchy{padding-left:9px;border-left:2px solid #d5e2d3;color:#7a8678;font-size:12px}hr{border:0;border-top:1px solid #e1e9df;margin:22px 0}@media(max-width:700px){main{margin:12px;padding:18px 15px}.bar{padding:9px 11px}.bar-inner{align-items:flex-start}.speech-controls{width:100%}.reader-title{width:100%}.speech-progress{margin-top:8px;gap:7px;flex-wrap:wrap}.speech-progress label{width:100%}.speech-progress output{font-size:10px}}</style></head><body><header class="bar"><div class="bar-inner"><button type="button" id="back">← Volver a OpoGVA</button><span class="reader-title">Auxiliar AGE · Tema ${topicNumber}</span><div class="speech-controls"><button type="button" id="speak-start">▶ Escuchar tema</button><label class="speech-speed-label" for="speak-speed">Velocidad<select class="speech-speed" id="speak-speed"><option value="0.7">0,7×</option><option value="0.85">0,85×</option><option value="1" selected>1×</option><option value="1.25">1,25×</option><option value="1.5">1,5×</option><option value="2">2×</option></select></label><button type="button" id="speak-pause" disabled>⏸ Pausar</button><button type="button" id="speak-stop" disabled>■ Detener</button><span id="speak-status" class="speech-status" aria-live="polite"></span><span id="speak-duration" class="speech-status" aria-live="polite"></span><a id="download-mp3" class="download" href="${audioHref}" download="OpoGVA-AGE-Tema-${topicNumber}.mp3" hidden>Descargar MP3</a><button type="button" id="mp3-unavailable" disabled>MP3 no generado</button><span id="audio-status" class="speech-status" aria-live="polite">Comprobando audio…</span></div></div><div class="speech-progress"><label for="speak-progress">Progreso de lectura</label><input id="speak-progress" type="range" min="0" max="1000" value="0" aria-label="Elegir el punto del tema que quieres escuchar"><output id="speak-position" for="speak-progress">0:00 / 0:00 aprox.</output></div></header><main id="reader-content"><h1>${ageEscape(topic.title)}</h1>${content}</main><script src="${speechScriptHref}"></script><script>(()=>{document.getElementById('back').addEventListener('click',()=>{if(window.opener)window.close();else history.back()});const download=document.getElementById('download-mp3'),unavailable=document.getElementById('mp3-unavailable'),audioStatus=document.getElementById('audio-status');fetch('${manifestHref}',{cache:'no-store'}).then(response=>{if(!response.ok)throw new Error('No se pudo consultar el manifiesto de audio');return response.json()}).then(manifest=>{if(Array.isArray(manifest.available)&&manifest.available.includes(${n})){download.hidden=false;unavailable.hidden=true;audioStatus.textContent=''}else{audioStatus.textContent='Genera el MP3 de este tema para habilitar la descarga'}}).catch(error=>{console.error(error);audioStatus.textContent='No se pudo comprobar la disponibilidad del MP3'})})();</script></body></html>`;
}
function ageGroupLaws(html){
 const template=document.createElement('template');template.innerHTML=html;const output=document.createDocumentFragment();let details=null,body=null,nodes=[...template.content.childNodes];
 for(let i=0;i<nodes.length;i++){const node=nodes[i];if(node.nodeType===1&&node.matches('h2.age-law-code')){details=document.createElement('details');details.className='age-law-block';details.open=true;const summary=document.createElement('summary');summary.className='age-law-heading';summary.append(node.cloneNode(true));if(nodes[i+1]?.nodeType===1&&nodes[i+1].matches('p.age-law-title'))summary.append(nodes[++i].cloneNode(true));const icon=document.createElement('span');icon.className='age-law-toggle';icon.setAttribute('aria-hidden','true');summary.append(icon);body=document.createElement('div');body.className='age-law-content';details.append(summary,body);output.append(details);continue}if(details)body.append(node.cloneNode(true));else output.append(node.cloneNode(true))}
 const holder=document.createElement('div');holder.append(output);return holder.innerHTML
}
function ageOpenTopicAid(n,kind){
 const topic=ageTopics.find(item=>item.n===n);if(!topic)return;const win=window.open('about:blank','_blank');if(!win)return;win.document.write('<!doctype html><html lang="es"><meta charset="utf-8"><title>Cargando…</title><body style="font:15px system-ui;padding:24px">Cargando material…</body></html>');
 ageGetTopicHtml(n).then(html=>{
  const doc=new DOMParser().parseFromString(html,'text/html');let title='',content='';
  if(kind==='outline'){const headings=[...doc.querySelectorAll('h2.age-law-code,h2,h3,h4,.age-material-article h3')].map(node=>node.textContent.trim()).filter(Boolean);title='Esquema · '+topic.title;content=headings.length?'<ol>'+headings.map(item=>`<li>${ageEscape(item)}</li>`).join('')+'</ol>':'<p>No se han encontrado encabezados para crear el esquema.</p>'}
  else{const qs=Object.entries(window.agePastExams||{}).flatMap(([year,items])=>(items||[]).filter(q=>Number(q.topicNumber)===n).map(q=>({year,q})));title=(kind==='summary'?'Resumen de preguntas · ':'Preguntas · ')+topic.title;content=qs.length?qs.map(({year,q})=>{const opts=Object.entries(q.options||{}),answer=opts.find(([letter])=>letter===q.correct);return `<article class="aid-question"><small>${ageEscape(year)} · ${ageEscape(q.section||'')} · Pregunta ${ageEscape(String(q.number||''))}</small><p>${ageEscape(q.question||'')}</p>${kind==='summary'?`<strong>${answer?`Respuesta ${ageEscape(answer[0])}: ${ageEscape(answer[1])}`:'Sin plantilla de respuesta'}</strong>`:`<ol type="A">${opts.map(([,text])=>`<li>${ageEscape(text)}</li>`).join('')}</ol>`}</article>`}).join(''):'<p>No hay preguntas de exámenes anteriores vinculadas a este tema.</p>'}
  win.document.open();win.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${ageEscape(title)}</title><style>body{margin:0;background:#f5f7f2;color:#263328;font:15px/1.7 system-ui,sans-serif}header{position:sticky;top:0;background:white;border-bottom:1px solid #e5ebe3;padding:12px max(16px,calc((100vw - 850px)/2));display:flex;justify-content:space-between;align-items:center}button{border:1px solid #dce8da;border-radius:7px;padding:8px 11px;background:#f5f8f3;color:#286342;cursor:pointer}main{max-width:850px;margin:25px auto;padding:0 18px 40px}h1{font-size:24px;color:#245c43}.aid-question{margin:12px 0;padding:14px 16px;background:#fff;border:1px solid #e5ebe3;border-radius:9px}.aid-question small{color:#718071}.aid-question ol{padding-left:22px}</style></head><body><header><button onclick="if(window.opener)window.close();else history.back()">← Volver</button><span>Auxiliar AGE · Tema ${String(n).padStart(2,'0')}</span></header><main><h1>${ageEscape(title)}</h1>${content}</main></body></html>`);win.document.close()
 }).catch(error=>{console.error(error);if(!win.closed)win.document.body.textContent='No se pudo cargar el contenido del tema.'})
}let ageQuestionBankPromise;
function ageGetQuestionBank(){if(!ageQuestionBankPromise)ageQuestionBankPromise=Promise.all(Object.entries(agePdf).map(async([key,pdf])=>{const jsonName=pdf.replace(/\.pdf$/i,'.json'),url=new URL(`OPOSICIONES/AUX ADM AGE/EXAMENES/JSON/${jsonName}`,location.href),response=await fetch(url,{cache:'no-cache'});if(!response.ok)throw new Error(`No se pudo cargar ${jsonName}: HTTP ${response.status}`);const document=await response.json();return (document.secciones||[]).flatMap(section=>(section.preguntas||[]).map(question=>({...question,tema_numero:Number(question.tema_numero)||null,anio:key.slice(0,4),examen:key,seccion:section.nombre||''}))) })).then(groups=>groups.flat());return ageQuestionBankPromise}
function ageOpenTopicQuestionsPage(number){
 const topic=ageTopics.find(item=>item.n===number);if(!topic)return;const popup=window.open('about:blank','_blank');if(!popup)return;
 popup.document.open();popup.document.write('<!doctype html><html lang="es"><meta charset="utf-8"><title>Preguntas AGE</title><body style="font:15px system-ui;padding:24px">Cargando preguntas de los exámenes AGE…</body></html>');popup.document.close();
 ageGetQuestionBank().then(bank=>{
  if(popup.closed)return;
  const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const renderQuestion=(q,index)=>{const options=Object.entries(q.opciones||{}).map(([letter,text])=>`<li><span class="letter">${escape(letter.toUpperCase())}</span>${escape(text)}</li>`).join(''),answer=String(q.respuesta_correcta||'').toUpperCase(),answerText=q.opciones?.[String(q.respuesta_correcta||'').toLowerCase()],explanation=q.explicacion?`<p>${escape(q.explicacion)}</p>`:'';const official=q.fuente_oficial?`<a class="source" href="${escape(q.fuente_oficial)}" target="_blank" rel="noopener">Fuente oficial ↗</a>`:'';return `<article class="question"><div class="meta">${escape(q.anio)} · EXAMEN_AUXADMAGE_${escape(q.examen.replace('-','_'))} · ${escape(q.seccion)} · Pregunta ${escape(q.numero??index+1)}</div><h2>${escape(q.enunciado||'Enunciado no disponible')}</h2><ul class="options">${options}</ul>${official}<details class="answer"><summary>Ver respuesta y explicación</summary><p><strong>${answer?`Respuesta correcta: ${answer}${answerText?` · ${escape(answerText)}`:''}`:'Este examen no incluye plantilla de respuestas.'}</strong></p>${explanation}</details></article>`};
  const allRecords=bank.slice().sort((a,b)=>a.anio.localeCompare(b.anio)||a.examen.localeCompare(b.examen)||a.seccion.localeCompare(b.seccion)||Number(a.numero)-Number(b.numero));
  popup.document.open();popup.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Preguntas · Tema ${String(number).padStart(2,'0')} AGE</title><style>*{box-sizing:border-box}body{margin:0;background:#f5f7f2;color:#263328;font:15px/1.65 system-ui,-apple-system,"Segoe UI",sans-serif}.bar{position:sticky;top:0;z-index:10;background:#fff;border-bottom:1px solid #e5ebe3;padding:10px max(18px,calc((100vw - 900px)/2));display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;color:#55705a;font-size:12px}.bar button,.bar select{border:1px solid #dce8da;background:#f5f8f3;color:#286342;border-radius:7px;padding:8px 11px;font:600 11px system-ui}.bar button{cursor:pointer}.tools{display:flex;align-items:end;gap:9px;flex-wrap:wrap}.tools label{display:grid;gap:4px;font-size:10px}.tools select,.tools button{min-height:36px}main{max-width:900px;margin:30px auto;padding:0 18px 50px}.eyebrow{color:#718071;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase}h1{font-size:30px;line-height:1.2;margin:6px 0}header p:last-child{color:#718071}.question{background:#fff;border:1px solid #e5ebe3;border-radius:12px;padding:20px;margin:12px 0}.meta{font-size:10px;color:#718071;letter-spacing:.5px}.question h2{font-size:16px;line-height:1.5;margin:10px 0 14px}.options{list-style:none;padding:0;margin:0;display:grid;gap:7px}.options li{padding:10px 12px;border:1px solid #e7ebe4;border-radius:8px}.letter{display:inline-grid;place-items:center;width:22px;height:22px;margin-right:7px;border-radius:6px;background:#f0f5ee;color:#34764d;font-weight:700;font-size:11px}.answer{margin-top:12px;border-top:1px solid #eff1ec;padding-top:10px}.answer summary{cursor:pointer;color:#286342;font-size:12px;font-weight:700}.answer p{font-size:13px;color:#566256}.source{display:inline-block;margin-top:12px;color:#34764d;font-size:11px}.empty{padding:16px;background:#fff5ee;border-radius:9px;color:#805b34}#status{color:#718071}@media(max-width:600px){.bar{padding:10px 12px}.tools{order:3;width:100%}.tools label{flex:1}main{margin:20px auto;padding:0 12px 35px}h1{font-size:24px}.question{padding:15px}}</style></head><body><div class="bar"><span>OpoGVA · Preguntas del temario AGE</span><div class="tools"><label>Contenido<select id="scope"><option value="topic">Este tema</option><option value="all">Todo el temario</option></select></label><label>Formato<select id="format"><option value="md">Markdown (.md)</option><option value="doc">Word (.doc)</option><option value="txt">Texto (.txt)</option></select></label><button id="export">Exportar</button></div><button id="back">Volver al temario</button></div><main><header><p class="eyebrow">${escape(topic.block)} · TEMA ${String(number).padStart(2,'0')}</p><h1>${escape(topic.title)}</h1><p id="status"></p></header><div id="questions"></div></main></body></html>`);popup.document.close();
  const scope=popup.document.querySelector('#scope'),container=popup.document.querySelector('#questions'),status=popup.document.querySelector('#status');
  const render=()=>{const selected=scope.value==='all'?allRecords:allRecords.filter(q=>q.tema_numero===number);status.textContent=`${selected.length} pregunta${selected.length===1?'':'s'} de los exámenes oficiales${scope.value==='all'?' (incluye las que no tienen tema asignado)':''}`;container.innerHTML=selected.length?selected.map(renderQuestion).join(''):'<p class="empty">No hay preguntas de los exámenes AGE asignadas a este tema.</p>';return selected};
  scope.addEventListener('change',render);render();popup.document.querySelector('#back').addEventListener('click',()=>{if(popup.opener&&!popup.opener.closed){popup.opener.focus();popup.close()}else popup.close()});
  popup.document.querySelector('#export').addEventListener('click',()=>{const records=render(),format=popup.document.querySelector('#format').value,scopeName=scope.value==='all'?'todo-el-temario':`tema-${String(number).padStart(2,'0')}`,filename=`preguntas-auxiliar-age-${scopeName}`,lines=[];for(const q of records){lines.push(`## ${q.anio} · Examen ${q.examen} · ${q.seccion} · Pregunta ${q.numero}`,q.enunciado||'');for(const [letter,text] of Object.entries(q.opciones||{}))lines.push(`- ${letter.toUpperCase()}. ${text}`);lines.push(q.respuesta_correcta?`Respuesta correcta: ${q.respuesta_correcta.toUpperCase()}${q.opciones?.[String(q.respuesta_correcta).toLowerCase()]?`. ${q.opciones[String(q.respuesta_correcta).toLowerCase()]}`:''}`:'Sin plantilla de respuestas',q.explicacion||'',q.fuente_oficial?`Fuente oficial: ${q.fuente_oficial}`:'','')};let data=lines.join('\n'),type='text/plain;charset=utf-8',extension=format;if(format==='doc'){data=`<!doctype html><html lang="es"><meta charset="utf-8"><body><h1>Preguntas Auxiliar AGE · ${scopeName}</h1>${records.map((q,i)=>`<article><p><small>${escape(q.anio)} · Examen ${escape(q.examen)} · ${escape(q.seccion)} · Pregunta ${escape(q.numero)}</small></p><h3>${escape(q.enunciado||'')}</h3><ol type="A">${Object.values(q.opciones||{}).map(option=>`<li>${escape(option)}</li>`).join('')}</ol><p><strong>${q.respuesta_correcta?`Respuesta correcta: ${escape(q.respuesta_correcta.toUpperCase())}`:'Sin plantilla de respuestas'}</strong></p>${q.explicacion?`<p>${escape(q.explicacion)}</p>`:''}${q.fuente_oficial?`<p><a href="${escape(q.fuente_oficial)}">Fuente oficial</a></p>`:''}</article>`).join('')}</body></html>`;type='application/msword;charset=utf-8'}else if(format==='md'){data=`# Preguntas Auxiliar AGE · ${scopeName}\n\n`+data;type='text/markdown;charset=utf-8'}const blob=new Blob([format==='txt'?'\uFEFF'+data:data],{type}),url=URL.createObjectURL(blob),link=popup.document.createElement('a');link.href=url;link.download=`${filename}.${extension}`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
 }).catch(error=>{console.error(error);if(!popup.closed){popup.document.open();popup.document.write(`<!doctype html><html lang="es"><meta charset="utf-8"><body style="font:15px system-ui;padding:24px">No se pudieron cargar los exámenes AGE: ${String(error.message||error)}</body></html>`);popup.document.close()}})
}function ageOpenMaterialTopic(n){const topic=ageTopics.find(item=>item.n===n);if(!topic)return;const reader=window.open('about:blank','_blank');if(!reader)return;reader.document.open();reader.document.write(ageReaderLoadingPage(topic));reader.document.close();ageGetTopicHtml(n).then(content=>{if(reader.closed)return;reader.document.open();reader.document.write(ageReaderPage(topic,n,ageGroupLaws(content)));reader.document.close()}).catch(error=>{console.error(error);if(reader.closed)return;reader.document.open();reader.document.write(ageReaderLoadingPage(topic).replace('Cargando el tema…','No se pudo cargar el tema. Comprueba la conexión e inténtalo de nuevo.'));reader.document.close()})}
function agePdfUrl(key){return encodeURI(`OPOSICIONES/AUX ADM AGE/EXAMENES/${agePdf[key]}`)}
function ageExamOptions(){return Object.keys(agePdf).map(key=>({key,label:`Examen ${key.replace('-',' · Modelo ')}`}))}
function fillAgeExamSelect(select){select.innerHTML='<option value="all">Todos los exámenes · 2008–2025</option>'+ageExamOptions().map(x=>`<option value="${x.key}">${x.label}</option>`).join('')}
fillAgeExamSelect($age('#age-test-exam'));fillAgeExamSelect($age('#age-exam-select'));
function ageEscape(text){return text.replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}
function ageInline(text){return ageEscape(text).replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1 ↗</a>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')}
function ageMarkdownToHtml(markdown){const out=[];let list=false;for(const raw of markdown.split(/\r?\n/)){const line=raw.trim();if(!line){if(list){out.push('</ul>');list=false}continue}if(line.startsWith('# ')){if(list){out.push('</ul>');list=false}out.push(`<h1>${ageInline(line.slice(2))}</h1>`)}else if(line.startsWith('## ')){if(list){out.push('</ul>');list=false}out.push(`<h2>${ageInline(line.slice(3))}</h2>`)}else if(line.startsWith('### ')){if(list){out.push('</ul>');list=false}out.push(`<h3>${ageInline(line.slice(4))}</h3>`)}else if(line.startsWith('- ')){if(!list){out.push('<ul>');list=true}out.push(`<li>${ageInline(line.slice(2))}</li>`)}else if(line.startsWith('> ')){if(list){out.push('</ul>');list=false}out.push(`<blockquote>${ageInline(line.slice(2))}</blockquote>`)}else{if(list){out.push('</ul>');list=false}out.push(`<p>${ageInline(line)}</p>`)}}if(list)out.push('</ul>');return out.join('')}
function ageOpenTopic(n){const encoded=window.ageTopicMaterialsB64?.[n],topic=ageTopics.find(t=>t.n===n);if(!encoded||!topic)return;const bytes=Uint8Array.from(atob(encoded),char=>char.charCodeAt(0)),markdown=new TextDecoder('utf-8').decode(bytes),body=ageMarkdownToHtml(markdown),html=`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${ageEscape(topic.title)}</title><style>*{box-sizing:border-box}body{margin:0;background:#f5f7f2;color:#263328;font:16px/1.8 system-ui,sans-serif}.bar{position:sticky;top:0;background:#fff;border-bottom:1px solid #e5ebe3;padding:12px 18px}.bar-inner{max-width:880px;margin:auto;display:flex;align-items:center;gap:14px}.bar a{color:#286342}button{border:1px solid #dce8da;background:#f5f8f3;color:#286342;border-radius:7px;padding:8px 11px;font:600 12px system-ui;cursor:pointer}main{max-width:880px;margin:26px auto;padding:32px 42px;background:#fff;border:1px solid #e7ebe4;border-radius:14px}h1,h2,h3{color:#245c43;line-height:1.4}h1{font-size:26px}h2{margin-top:28px}li{margin:8px 0}a{overflow-wrap:anywhere}blockquote{margin:24px 0 0;padding:12px 15px;border-left:3px solid #83a98a;background:#f4f8f3;color:#526453;font-size:13px}@media(max-width:600px){main{margin:12px;padding:18px}.bar{padding:9px 12px}.bar-inner{flex-wrap:wrap}h1{font-size:22px}}</style></head><body><header class="bar"><div class="bar-inner"><button onclick="if(window.opener)window.close();else history.back()">← Volver a OpoGVA</button><span>Auxiliar AGE · Tema ${String(n).padStart(2,'0')}</span><a href="${AGE_PROGRAM}" target="_blank" rel="noopener">Programa oficial ↗</a></div></header><main>${body}</main></body></html>`,url=URL.createObjectURL(new Blob([html],{type:'text/html;charset=utf-8'})),win=window.open(url,'_blank');if(!win){URL.revokeObjectURL(url);return}setTimeout(()=>URL.revokeObjectURL(url),60000)}function agePool(selection){const keys=selection==='all'?Object.keys(agePdf):[selection];return keys.flatMap(key=>(window.agePastExams?.[key]||[]).map((q,index)=>{const letters=Object.keys(q.options||{}),opts=letters.map(letter=>q.options[letter]),correct=letters.indexOf(q.correct);return {id:`age-${key}-${q.section}-${q.number}-${index}`,n:q.number,number:q.number,year:key,section:q.section,q:q.question,opts,correct:correct<0?null:correct,why:q.explanation|| (correct<0?'El JSON de este examen no contiene plantilla de respuestas.':'Respuesta indicada en el JSON del examen.'),source:[`PDF del examen ${key}`,agePdfUrl(key)]}}).filter(q=>q.opts.length>=2))}
const agePoolWithoutMetadata = agePool;
agePool = selection => agePoolWithoutMetadata(selection).map(question => {
  const record = (window.agePastExams?.[question.year] || []).find(item => (
    item.number === question.number && item.section === question.section
  ));
  return {
    ...question,
    topicNumber: record?.topicNumber,
    officialSource: record?.officialSource
  };
});

function ageQuestionReferenceHtml(question) {
  const topicNumber = Number.isInteger(question.topicNumber) ? question.topicNumber : null;
  const topic = topicNumber === null ? null : ageTopics.find(item => item.n === topicNumber);
  const topicLink = topic
    ? `<a class="material-link" href="#age-view-temario" data-age-question-topic="${topic.n}">Tema ${String(topic.n).padStart(2, '0')} · ${ageEscape(topic.title)}</a>`
    : question.topicNumber === null
      ? '<span class="material-link">Ejercicio de aptitud · sin tema específico</span>'
      : '';
  const sourceLink = question.officialSource
    ? `<a class="material-link" href="${ageEscape(question.officialSource)}" target="_blank" rel="noopener">Fuente oficial ↗</a>`
    : '';
  return topicLink || sourceLink
    ? `<div class="answer-references">${topicLink}${sourceLink}</div>`
    : '';
}

const ageRenderQuestionWithoutReferences = ageRenderQuestion;
ageRenderQuestion = () => {
  ageRenderQuestionWithoutReferences();
  const question = ageQuestions[ageIndex];
  const questionBlock = document.querySelector(`${ageTarget} .quiz-question`);
  if (question && questionBlock) {
    questionBlock.insertAdjacentHTML('afterend', ageQuestionReferenceHtml(question));
  }
};

const ageRenderReviewWithoutReferences = ageRenderReview;
ageRenderReview = () => {
  ageRenderReviewWithoutReferences();
  const wrongQuestions = ageState().wrong;
  document.querySelectorAll('#age-review-area .review-card').forEach((card, index) => {
    const answers = card.querySelector('.answers');
    if (answers && wrongQuestions[index]) {
      answers.insertAdjacentHTML('afterend', ageQuestionReferenceHtml(wrongQuestions[index]));
    }
  });
};

document.addEventListener('click', event => {
  const topicLink = event.target.closest('[data-age-question-topic]');
  if (!topicLink) return;
  event.preventDefault();
  ageOpenMaterialTopic(Number(topicLink.dataset.ageQuestionTopic));
});

let ageQuestions=[],ageIndex=0,ageSession={right:0,wrong:0,ungraded:0},ageTarget='#age-quiz-area';
function ageStart(selection,size,target,sourceTarget){ageTarget=target;const pool=agePool(selection);ageQuestions=pool.slice(0,size==='all'?pool.length:Number(size));ageIndex=0;ageSession={right:0,wrong:0,ungraded:0};const years=selection==='all'?Object.keys(agePdf):[selection];$age(sourceTarget).innerHTML=years.map(key=>`<a class="material-link" href="${agePdfUrl(key)}" target="_blank" rel="noopener">PDF ${key} ↗</a>`).join(' ')+`<span>${pool.length} preguntas · ${pool.filter(q=>q.correct!==null).length} con plantilla</span>`;ageRenderQuestion()}
function ageRenderQuestion(){window.stopQuizSpeech();const area=$age(ageTarget);if(ageIndex>=ageQuestions.length){area.innerHTML=`<div class="result-card panel"><span class="stat-icon green">✓</span><h2>Test terminado</h2><p>Has acertado <strong>${ageSession.right}</strong> y fallado <strong>${ageSession.wrong}</strong> preguntas.${ageSession.ungraded?` ${ageSession.ungraded} no tenían plantilla y no se han puntuado.`:''}</p><button class="primary-button" id="age-again">Hacer otro test →</button></div>`;$age('#age-again').addEventListener('click',()=>ageStart($age(ageTarget==='#age-quiz-area'?'#age-test-exam':'#age-exam-select').value,$age(ageTarget==='#age-quiz-area'?'#age-test-size':'#age-exam-size').value,ageTarget,ageTarget==='#age-quiz-area'?'#age-quiz-source':'#age-exam-source'));return}const q=ageQuestions[ageIndex];area.innerHTML=`<div class="quiz-card panel"><div class="quiz-meta"><span>${q.year} · ${q.section} · PREGUNTA ${q.number} / ${ageQuestions.length}</span><span>${q.correct===null?'SIN PLANTILLA':'CON PLANTILLA'}</span></div><div class="quiz-progress"><span style="width:${(ageIndex+1)/ageQuestions.length*100}%"></span></div><div class="quiz-question"><h2>${q.q}</h2><button class="secondary-button read-question" type="button" data-read-question aria-pressed="false" ${window.quizSpeechAvailable()?'':'disabled title="La lectura en voz alta no está disponible en este navegador"'}>🔊 Escuchar pregunta y respuestas</button></div><div class="answers">${q.opts.map((answer,i)=>`<button class="answer" data-age-answer="${i}"><b>${String.fromCharCode(65+i)}</b>${answer}</button>`).join('')}</div><div class="feedback-slot"></div><div class="quiz-actions"><button class="secondary-button" id="age-next" disabled>${ageIndex+1===ageQuestions.length?'Ver resultado':'Siguiente pregunta →'}</button></div></div>`;area.querySelectorAll('[data-age-answer]').forEach(button=>button.addEventListener('click',()=>ageRespond(q,Number(button.dataset.ageAnswer),area)));$age('#age-next').addEventListener('click',()=>{ageIndex++;ageRenderQuestion()})}
function ageRespond(q,choice,area){area.querySelectorAll('.answer').forEach(b=>b.disabled=true);if(q.correct===null){ageSession.ungraded++;area.querySelector('.feedback-slot').innerHTML=`<div class="feedback"><strong>Pregunta practicada, sin puntuación</strong><p>${q.why}</p><a href="${q.source[1]}" target="_blank" rel="noopener">Abrir PDF original ↗</a></div>`;$age('#age-next').disabled=false;return}const s=ageState(),ok=choice===q.correct;s.stats.answered++;if(ok){s.stats.correct++;ageSession.right++;s.wrong=s.wrong.filter(x=>x.id!==q.id)}else{ageSession.wrong++;if(!s.wrong.some(x=>x.id===q.id))s.wrong.push(q)}s.answers=s.answers||{};s.answers[q.id]=choice;ageSave(s);area.querySelectorAll('.answer').forEach((b,i)=>{if(i===q.correct)b.classList.add('correct');else if(i===choice)b.classList.add('incorrect')});area.querySelector('.feedback-slot').innerHTML=`<div class="feedback ${ok?'good':'bad'}"><strong>${ok?'¡Correcto!':'Respuesta incorrecta'}</strong><p>${q.why} Respuesta: ${String.fromCharCode(65+q.correct)}.</p><a href="${q.source[1]}" target="_blank" rel="noopener">Abrir PDF original ↗</a>${ok?'':'<small>Se ha añadido a Repasar fallos.</small>'}</div>`;$age('#age-next').disabled=false}
function ageRenderReview(){const area=$age('#age-review-area'),s=ageState();if(!s.wrong.length){area.innerHTML='<div class="empty-review panel"><span>✦</span><h2>¡Todo al día!</h2><p>Los fallos de preguntas con plantilla aparecerán aquí.</p></div>';return}area.innerHTML=s.wrong.map(q=>`<article class="review-card panel"><div class="quiz-meta"><span>EXAMEN ${q.year} · PREGUNTA ${q.number}</span><span>REPASO PENDIENTE</span></div><h2>${q.q}</h2><div class="answers">${q.opts.map((a,i)=>`<button class="answer" data-age-review="${q.id}" data-answer="${i}">${String.fromCharCode(65+i)}. ${a}</button>`).join('')}</div><div class="review-feedback" id="age-review-${q.id}"></div><p>${q.why}</p><a class="material-link" href="${q.source[1]}" target="_blank" rel="noopener">${q.source[0]} ↗</a></article>`).join('');document.querySelectorAll('[data-age-review]').forEach(button=>button.addEventListener('click',()=>{const st=ageState(),q=st.wrong.find(x=>x.id===button.dataset.ageReview),choice=Number(button.dataset.answer),ok=choice===q.correct;document.querySelectorAll(`[data-age-review="${q.id}"]`).forEach((el,i)=>{el.disabled=true;if(i===q.correct)el.classList.add('correct');else if(i===choice)el.classList.add('incorrect')});if(ok){st.wrong=st.wrong.filter(x=>x.id!==q.id);ageSave(st);$age(`#age-review-${q.id}`).innerHTML='<p class="feedback good">¡Bien! Fallo repasado.</p>';setTimeout(ageRenderReview,700)}else $age(`#age-review-${q.id}`).innerHTML='<p class="feedback bad">Revisa la opción correcta y vuelve a intentarlo.</p>'}))}
$age('#age-start-test').addEventListener('click',()=>ageStart($age('#age-test-exam').value,$age('#age-test-size').value,'#age-quiz-area','#age-quiz-source'));
$age('#age-start-exam').addEventListener('click',()=>ageStart($age('#age-exam-select').value,$age('#age-exam-size').value,'#age-exam-area','#age-exam-source'));
ageRenderTopics();ageRenderStats();

const ageOppositionSwitch = document.querySelector('#opposition-switch-age');
if (ageOppositionSwitch && ![...ageOppositionSwitch.options].some(option => option.value === 'valencia')) {
  const valenciaOption = document.createElement('option');
  valenciaOption.value = 'valencia';
  valenciaOption.textContent = 'Ayuntamiento de València';
  ageOppositionSwitch.append(valenciaOption);
}
ageOppositionSwitch?.addEventListener('change', event => {
  if (event.target.value === 'valencia') window.location.href = 'valencia.html';
  if (event.target.value === 'gsi-age') window.location.href = 'gsi-age.html';
});
