const $=s=>document.querySelector(s), KEY='opogva-progress-v2';
const fresh=()=>({done:[],wrong:[],answers:{},topicProgress:{},testHistory:[],stats:{answered:0,correct:0}});
let audioAvailable=new Set(),topicFilter='all';const audioHrefFor=n=>new URL(`assets/audio/tema-${String(n).padStart(2,'0')}.mp3`,location.href).href;
function state(){try{return {...fresh(),...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return fresh()}}
function persist(s){localStorage.setItem(KEY,JSON.stringify(s));renderStats()}
function view(name){document.querySelectorAll('.view').forEach(x=>x.classList.remove('active-view'));$(`#view-${name}`).classList.add('active-view');document.querySelectorAll('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.view===name));if(name==='fallos')renderReview();if(name==='audios')refreshAudioLibrary();window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-view]').forEach(x=>x.addEventListener('click',()=>view(x.dataset.view)));document.querySelector('#opposition-switch')?.addEventListener('change',e=>{if(e.target.value==='age')window.location.href='age.html';if(e.target.value==='gsi-age')window.location.href='gsi-age.html'});document.querySelectorAll('[data-go]').forEach(x=>x.addEventListener('click',()=>view(x.dataset.go)));
function sourceList(t){return [['Bases · Anexo IV (DOGV)',DOGV],...t.src.map(k=>S[k]),...(t.extra||[])]}
function topicStudy(s,n){return {status:s.done.includes(n)?'done':'pending',rating:0,read:false,testAttempts:0,...(s.topicProgress?.[n]||{}),status:s.topicProgress?.[n]?.status||(s.done.includes(n)?'done':'pending')}}function renderStats(){const s=state(),completed=topics.filter(t=>topicStudy(s,t.n).status==='done').length;$('#topics-done').textContent=completed;$('#topic-progress').style.width=`${completed/topics.length*100}%`;
$('#answered-count').textContent=s.stats.answered;$('#correct-count').textContent=s.stats.correct;$('#missed-count').textContent=s.wrong.length;$('#error-badge').textContent=s.wrong.length;
$('#block-progress').innerHTML=[['Parte general',topics.filter(t=>t.b==='general')],['Parte especial',topics.filter(t=>t.b==='especial')]].map(([label,arr])=>{const n=arr.filter(t=>topicStudy(s,t.n).status==='done').length;return `<div class="block-row"><div><strong>${label}</strong><span>${n} de ${arr.length} temas</span></div><div class="progress-track"><span style="width:${n/arr.length*100}%"></span></div></div>`}).join('');const remaining=topics.filter(t=>topicStudy(s,t.n).status!=='done');$('#topic-remaining').innerHTML=remaining.length?`<p>Te quedan <strong>${remaining.length} temas</strong> por completar:</p><ul>${remaining.slice(0,6).map(t=>`<li>Tema ${String(t.n).padStart(2,'0')} · ${t.title} <span>${topicStudy(s,t.n).status==='progress'?'En curso':'Pendiente'}</span></li>`).join('')}</ul>${remaining.length>6?`<small>y ${remaining.length-6} más</small>`:''}`:'<p class="all-topics-done">✓ Has completado todos los temas.</p>'}function renderAudioList(){
 const list=$('#audio-list');if(!list)return;
 list.innerHTML=topics.map(t=>{const available=audioAvailable.has(t.n),number=String(t.n).padStart(2,'0'),file=`OpoGVA-Tema-${number}.mp3`;return `<article class="audio-card"><div class="audio-card-copy"><span class="audio-topic-number">${number}</span><div><small>${t.b==='general'?'PARTE GENERAL':'PARTE ESPECIAL'}</small><strong>${t.title}</strong><span class="audio-status ${available?'is-available':''}">${available?'MP3 disponible':'MP3 no generado'}</span></div></div>${available?`<a class="audio-download" href="${audioHrefFor(t.n)}" download="${file}">Descargar MP3</a>`:`<button class="audio-download is-unavailable" type="button" disabled>MP3 no generado</button>`}</article>`}).join('');
 const count=$('#audio-count');if(count)count.textContent=`${audioAvailable.size}/${topics.length}`;
}
async function refreshAudioLibrary(){
 const summary=$('#audio-summary');
 try{const response=await fetch(new URL('assets/audio/manifest.json',location.href),{cache:'no-store'});if(!response.ok)throw new Error('Manifest not available');const manifest=await response.json();audioAvailable=new Set((Array.isArray(manifest.available)?manifest.available:[]).map(Number).filter(n=>Number.isInteger(n)&&n>=1&&n<=topics.length));if(summary)summary.textContent=`${audioAvailable.size} de ${topics.length} audios disponibles para descargar.`}
 catch{audioAvailable=new Set();if(summary)summary.textContent='No se pudo leer la lista de audios. Abre la aplicacion desde GitHub Pages o un servidor web.'}
 renderAudioList();renderTopics(topicFilter);
}
function renderTopics(filter='all'){
 topicFilter=filter;
 const s=state(),list=topics.filter(t=>filter==='all'||t.b===filter);
 $('#topic-list').innerHTML=list.map(t=>{
  const p=topicStudy(s,t.n),status=p.status==='done'?'Estudiado':p.status==='progress'?'En curso':'Pendiente',rating=p.rating||0,number=String(t.n).padStart(2,'0');
  return '<article class="topic-card age-topic gva-study-card" data-material="'+t.n+'">'
   +'<button class="age-topic-open" type="button" data-open-topic="'+t.n+'" aria-label="Abrir el tema '+number+' en una ventana nueva"><span class="topic-number">'+number+'</span><span class="topic-title"><small>'+(t.b==='general'?'PARTE GENERAL':'PARTE ESPECIAL')+'</small><strong>'+t.title+'</strong></span><span class="topic-state '+(p.status==='done'?'is-done':'')+'">'+status+'</span><span class="age-topic-arrow" aria-hidden="true">↗</span></button>'
   +'<div class="gva-topic-toolbar"><div class="study-controls gva-study-controls"><label><span>Progreso</span><select data-topic-status="'+t.n+'"><option value="pending" '+(p.status==='pending'?'selected':'')+'>Pendiente</option><option value="progress" '+(p.status==='progress'?'selected':'')+'>En curso</option><option value="done" '+(p.status==='done'?'selected':'')+'>Estudiado</option></select></label>'
   +'<label><span>Autoevaluación</span><select data-topic-rating="'+t.n+'"><option value="0" '+(!rating?'selected':'')+'>Sin valorar</option>'+[1,2,3,4,5].map(value=>'<option value="'+value+'" '+(rating===value?'selected':'')+'>'+value+' · '+['','Inicial','Básico','En progreso','Buen dominio','Lo domino'][value]+'</option>').join('')+'</select></label></div>'
   +'<div class="gva-topic-actions"><button type="button" class="secondary-button" data-open-summary="'+t.n+'" title="Esquema e infografía">Esquema ↗</button><button type="button" class="secondary-button" data-open-test-summary="'+t.n+'" title="Resumen del test">Resumen ↗</button><button type="button" class="secondary-button" data-open-questions="'+t.n+'">Preguntas ↗</button><button type="button" class="secondary-button" data-open-topic="'+t.n+'">Tema completo ↗</button></div>'
   +'<div class="gva-study-checks"><label class="study-check"><input type="checkbox" data-topic-read="'+t.n+'" '+(p.read?'checked':'')+'><span>He leído el tema</span></label><label class="study-check"><input type="checkbox" data-topic-complete="'+t.n+'" '+(p.status==='done'?'checked':'')+'><span>Temario completado</span></label></div></div>'
   +'</article>';
 }).join('');
 const update=(n,change)=>{const st=state();st.topicProgress=st.topicProgress||{};st.topicProgress[n]={...topicStudy(st,n),...change};if(st.topicProgress[n].status==='done'){if(!st.done.includes(n))st.done.push(n)}else st.done=st.done.filter(x=>x!==n);persist(st);renderTopics(filter)};
 document.querySelectorAll('[data-topic-status]').forEach(select=>select.addEventListener('change',()=>update(Number(select.dataset.topicStatus),{status:select.value})));
 document.querySelectorAll('[data-topic-read]').forEach(input=>input.addEventListener('change',()=>update(Number(input.dataset.topicRead),{read:input.checked})));
 document.querySelectorAll('[data-topic-complete]').forEach(input=>input.addEventListener('change',()=>update(Number(input.dataset.topicComplete),{status:input.checked?'done':'progress'})));
 document.querySelectorAll('[data-topic-rating]').forEach(select=>select.addEventListener('change',()=>update(Number(select.dataset.topicRating),{rating:Number(select.value)})));
}function openTopicFromHash(){const match=location.hash.match(/^#tema-(\d{2})$/);if(!match)return;view('temario');const card=document.querySelector(`.topic-card[data-material=\"${Number(match[1])}\"]`);if(!card)return;requestAnimationFrame(()=>card.scrollIntoView({behavior:'smooth',block:'start'}))}window.addEventListener('hashchange',openTopicFromHash);document.addEventListener('click',e=>{const questionsButton=e.target.closest('[data-open-questions]');if(questionsButton){e.preventDefault();e.stopPropagation();openTopicQuestions(Number(questionsButton.dataset.openQuestions));return}const topicLink=e.target.closest('[data-topic-link]');if(topicLink){e.preventDefault();const hash=`#tema-${String(topicLink.dataset.topicLink).padStart(2,'0')}`;if(location.hash===hash)openTopicFromHash();else location.hash=hash;return}const summaryLink=e.target.closest('[data-open-summary]');if(summaryLink){e.preventDefault();e.stopPropagation();window.openTopicSummary(Number(summaryLink.dataset.openSummary));return}const b=e.target.closest('[data-open-topic]');if(b){openTopicWindow(Number(b.dataset.openTopic));return}const summary=e.target.closest('.topic-card>summary');if(summary){e.preventDefault();openTopicWindow(Number(summary.parentElement.dataset.material))}});
function openTopicWindow(n){
 const topic=topics.find(t=>t.n===n),encoded=window.topicMaterialB64?.[n];
 if(!topic||!encoded)return;
 const bytes=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0)),markdown=new TextDecoder('utf-8').decode(bytes),content=renderArticleCards(markdownToHtml(markdown)),title=topic.title;
 const audioHref=new URL(`assets/audio/tema-${String(n).padStart(2,'0')}.mp3`,location.href).href,manifestHref=new URL('assets/audio/manifest.json',location.href).href;
 const html=`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>*{box-sizing:border-box}body{margin:0;background:#f5f7f2;color:#263328;font:16px/1.8 system-ui,-apple-system,"Segoe UI",sans-serif}.bar{position:sticky;top:0;z-index:2;background:#fff;border-bottom:1px solid #e5ebe3;padding:10px 20px;font-size:12px;color:#55705a}.bar-inner{max-width:900px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:12px}.bar a{color:#286342}.back-button,.speech-button{border:1px solid #dce8da;background:#f5f8f3;color:#286342;border-radius:7px;padding:8px 11px;font:600 12px system-ui;cursor:pointer}.download-audio{background:#286342;color:#fff;border-color:#286342;text-decoration:none}.download-audio[hidden],#mp3-unavailable[hidden]{display:none}.speech-controls{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.speech-button:disabled{opacity:.5;cursor:default}.speech-status{font-size:11px;color:#6a7a6c;min-width:90px}.speech-speed-label{display:flex;align-items:center;gap:5px;font-size:11px;color:#55705a}.speech-speed{border:1px solid #dce8da;background:#fff;color:#286342;border-radius:6px;padding:6px;font:12px system-ui}.speech-progress{max-width:900px;margin:9px auto 0;display:flex;align-items:center;gap:10px}.speech-progress label{font-size:11px;white-space:nowrap}.speech-progress input{flex:1;min-width:70px;accent-color:#286342;cursor:pointer}.speech-progress output{font-size:11px;white-space:nowrap;color:#55705a}.speech-highlight{background:#fff2b8!important;color:#263328;border-radius:3px;box-shadow:inset 0 0 0 1px #e8c94e}::selection{background:#ffe27a;color:#263328}.bar-links{display:flex;gap:12px;align-items:center}main{max-width:900px;margin:30px auto;padding:30px 42px;background:#fff;border:1px solid #e7ebe4;border-radius:14px;box-shadow:0 8px 30px #233b1710}h1{font:700 28px/1.3 system-ui;color:#245c43;margin:0 0 24px}h2,h3,h4{color:#286342;line-height:1.4;margin:25px 0 8px}p{margin:10px 0}li{margin:6px 0}a{color:#286342;overflow-wrap:anywhere}hr{border:0;border-top:1px solid #e7ebe4;margin:22px 0}code{background:#f2f5f0;padding:2px 5px;border-radius:4px}.article-block{display:block;margin:18px 0;padding:0;border:1px solid #e3ebe1;border-left:4px solid #8bb497;border-radius:10px;background:#f4f8f3}.article-block:nth-of-type(4n+2){background:#f1f6fa;border-color:#e0e9f0;border-left-color:#8baec4}.article-block:nth-of-type(4n+3){background:#fbf7ec;border-color:#f0e8d2;border-left-color:#d5ba72}.article-block:nth-of-type(4n+4){background:#f6f3fa;border-color:#e9e2f1;border-left-color:#aa96c1}.article-block>summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 20px;cursor:pointer;list-style:none}.article-block>summary::-webkit-details-marker{display:none}.article-block>summary h1,.article-block>summary h2,.article-block>summary h3,.article-block>summary h4,.article-block>summary p{flex:1;margin:0}.article-block>summary h3:first-child{font-size:18.72px;font-weight:700}.article-block>summary p:first-child{font-weight:700;color:#45664b}.article-toggle-icon{flex:0 0 auto;color:#55705a;font-size:18px;line-height:1}.article-toggle-icon::before{content:"⌃"}.article-block:not([open]) .article-toggle-icon::before{content:"⌄"}.article-content{padding:0 20px 16px}.article-block h2,.article-block h3,.article-block h4{margin-top:8px}.article-content ul,.article-content ol{padding-left:24px}@media(max-width:700px){main{margin:12px;padding:18px 16px;border-radius:10px}h1{font-size:22px}.bar{padding:9px 12px}.bar-inner{justify-content:flex-start;flex-wrap:wrap}.speech-controls{order:3;width:100%}.speech-progress{margin-top:8px;gap:7px;flex-wrap:wrap}.speech-progress label{width:100%}.speech-progress output{font-size:10px}.speech-status{min-width:0}.bar-links{margin-left:auto}.article-block{padding:12px 13px;margin:12px 0}}.exam-reference{margin:18px 0 22px;padding:11px 14px;border:1px solid #ead7a1;border-left:4px solid #d5a32c;border-radius:8px;background:#fff9e8;color:#70591f;font-size:13px;line-height:1.55}.exam-reference>strong{display:block;margin-bottom:6px;color:#705314;font-size:12px}.exam-reference>div{display:flex;flex-wrap:wrap;gap:6px}.exam-reference-year{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;border-radius:999px;background:#fff0c5;color:#604b1d;font-size:11px}.exam-reference-year b{color:#654800}.exam-reference-inline{display:inline-flex;align-items:center;gap:5px;margin-left:12px;vertical-align:middle;flex-wrap:wrap;font:500 10px/1.3 system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:0}.exam-reference-label{color:#8a6821;font-size:9px;font-weight:700}.exam-reference-pill{display:inline-flex;padding:3px 7px;border:1px solid #f0d48c;border-radius:999px;background:#fff2cc;color:#705314;font-size:9px;font-weight:600}.exam-highlight{padding:0 .12em;border-radius:3px;background:#ffe08a;color:#493400;box-shadow:inset 0 -1px 0 #d7a62d;-webkit-box-decoration-break:clone;box-decoration-break:clone}.law-block{margin:22px 0 28px}.law-heading{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:0 0 10px;border-bottom:1px solid #e3ebe1;cursor:pointer;list-style:none;color:#286342}.law-heading::-webkit-details-marker{display:none}.law-heading h2{flex:1;margin:0;font-size:24px}.law-toggle-icon{flex:0 0 auto;color:#55705a;font-size:18px;line-height:1}.law-toggle-icon::before{content:"⌃"}.law-block:not([open]) .law-toggle-icon::before{content:"⌄"}.law-content{padding-top:2px}.law-content .article-block{padding:14px 20px}.law-content .article-block h1,.law-content .article-block h2,.law-content .article-block h3,.law-content .article-block h4{margin-top:0}.law-content .article-block>p:first-child{font-weight:700;color:#286342}</style></head><body><div class="bar"><div class="bar-inner"><button class="back-button" onclick="if(window.opener){window.close()}else{history.back()}">← Volver a la aplicación</button><span>OpoGVA · Tema ${String(n).padStart(2,'0')}</span><div class="speech-controls"><button class="speech-button" id="speak-start" type="button">▶ Escuchar tema</button><label class="speech-speed-label" for="speak-speed">Velocidad<select class="speech-speed" id="speak-speed"><option value="0.7">0,7×</option><option value="0.85">0,85×</option><option value="1" selected>1×</option><option value="1.25">1,25×</option><option value="1.5">1,5×</option><option value="2">2×</option></select></label><button class="speech-button" id="speak-pause" type="button" disabled>⏸ Pausar</button><button class="speech-button" id="speak-stop" type="button" disabled>■ Detener</button><span class="speech-status" id="speak-status" aria-live="polite"></span><span class="speech-status" id="speak-duration" aria-live="polite"></span><a class="speech-button download-audio" id="download-mp3" href="${audioHref}" download="OpoGVA-Tema-${String(n).padStart(2,'0')}.mp3" hidden>Descargar MP3</a><button class="speech-button" id="mp3-unavailable" type="button" disabled>MP3 no generado</button><span class="speech-status" id="audio-status" aria-live="polite">Comprobando audio...</span></div><span class="bar-links"><a href="https://dogv.gva.es/datos/2026/03/27/pdf/2026_8071_es.pdf" target="_blank" rel="noopener">Convocatoria oficial ↗</a></span></div><div class="speech-progress"><label for="speak-progress">Progreso de lectura</label><input id="speak-progress" type="range" min="0" max="1000" value="0" aria-label="Elegir el punto del tema que quieres escuchar"><output id="speak-position" for="speak-progress">0:00 / 0:00 aprox.</output></div></div><main id="reader-content"><h1>${title}</h1>${content}</main><script>(()=>{const download=document.getElementById('download-mp3'),unavailable=document.getElementById('mp3-unavailable'),audioStatus=document.getElementById('audio-status');fetch('${manifestHref}').then(r=>r.ok?r.json():null).then(m=>{if(m?.available?.includes(${n})){download.hidden=false;unavailable.hidden=true;audioStatus.textContent=''}else audioStatus.textContent='Genera y publica el audio para descargarlo'}).catch(()=>{audioStatus.textContent='Disponible cuando el MP3 est? publicado'});const start=document.getElementById('speak-start'),pause=document.getElementById('speak-pause'),stop=document.getElementById('speak-stop'),status=document.getElementById('speak-status'),speed=document.getElementById('speak-speed'),duration=document.getElementById('speak-duration'),progress=document.getElementById('speak-progress'),position=document.getElementById('speak-position'),reader=document.getElementById('reader-content'),synth=window.speechSynthesis;let chunks=[],index=0,active=false,selectedRange=null,totalChars=0,totalWords=0,boundaryTimer=null;if(!synth){start.disabled=true;status.textContent='Lectura en voz alta no disponible';return}function reset(){active=false;pause.disabled=true;stop.disabled=true;pause.textContent='⏸ Pausar';start.disabled=false}function clearHighlight(){if(selectedRange){if(selectedRange.fallback)selectedRange.fallback.classList.remove('speech-highlight');else{const selection=window.getSelection();if(selection)selection.removeAllRanges()}selectedRange=null}}function visibleText(element){const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);let text='',node;const nodes=[];while(node=walker.nextNode()){const value=node.nodeValue;nodes.push({node,start:text.length,end:text.length+value.length});text+=value}return{text,nodes}}function buildChunks(){chunks=[];const selector='h1,h2,h3,h4,h5,h6,p,li,blockquote,td',blocks=[...reader.querySelectorAll(selector)].filter(el=>!el.querySelector(selector));let words=0;for(const element of blocks){const data=visibleText(element),text=data.text.trim();if(!text)continue;const leading=data.text.length-data.text.trimStart().length;words+=(text.match(/\\S+/g)||[]).length;for(let startAt=0;startAt<text.length;){let endAt=Math.min(startAt+1400,text.length);if(endAt<text.length){const space=text.lastIndexOf(' ',endAt);if(space>startAt+700)endAt=space}const part=text.slice(startAt,endAt).trim();const trimStart=text.slice(startAt,endAt).length-text.slice(startAt,endAt).trimStart().length;chunks.push({text:part,element,nodes:data.nodes,start:leading+startAt+trimStart,weight:part.length});startAt=endAt}}totalChars=chunks.reduce((sum,chunk)=>sum+chunk.weight,0);totalWords=words;return chunks}function secondsFor(chars){return Math.round((chars/5)/(155*Number(speed.value))*60)}function timeLabel(seconds){const mins=Math.floor(seconds/60),secs=seconds%60;return mins+':'+String(secs).padStart(2,'0')}function updateDuration(){const seconds=secondsFor(totalChars);duration.textContent=totalWords?'Duración aprox. '+timeLabel(seconds):'';updateProgress(index<chunks.length?0:totalChars)}function locate(charOffset,nodes){for(const entry of nodes){if(charOffset<=entry.end)return{node:entry.node,offset:Math.max(0,charOffset-entry.start)}}const last=nodes[nodes.length-1];return last?{node:last.node,offset:last.node.length}:null}function highlightChunk(chunk,charIndex,charLength,shouldScroll=false){clearHighlight();if(!chunk)return;const startAt=locate(chunk.start+Math.max(0,charIndex),chunk.nodes),endAt=locate(chunk.start+Math.max(0,charIndex)+(charLength||1),chunk.nodes);if(!startAt||!endAt)return;try{const range=document.createRange();range.setStart(startAt.node,Math.min(startAt.offset,startAt.node.length));range.setEnd(endAt.node,Math.min(endAt.offset,endAt.node.length));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);selectedRange=range}catch(e){chunk.element.classList.add('speech-highlight');selectedRange={fallback:chunk.element}}if(shouldScroll)chunk.element.scrollIntoView({block:'center',behavior:'smooth'})}function updateProgress(offset){const bounded=Math.max(0,Math.min(totalChars,offset));progress.value=totalChars?String(Math.round(bounded/totalChars*1000)):'0';position.textContent=timeLabel(secondsFor(bounded))+' / '+timeLabel(secondsFor(totalChars))+' aprox.'}function speakNext(){if(!active)return;if(index>=chunks.length){clearHighlight();status.textContent='Lectura terminada';updateProgress(totalChars);reset();return}const chunk=chunks[index],chunkIndex=index++;const utterance=new SpeechSynthesisUtterance(chunk.text);utterance.lang='es-ES';utterance.rate=Number(speed.value);const voice=synth.getVoices().find(v=>/^es(-|_)/i.test(v.lang));if(voice)utterance.voice=voice;let prefix=chunks.slice(0,chunkIndex).reduce((sum,item)=>sum+item.weight,0);utterance.onstart=()=>{status.textContent='Leyendo…';highlightChunk(chunk,0,1,true);updateProgress(prefix);boundaryTimer=setTimeout(()=>{clearHighlight();chunk.element.classList.add('speech-highlight');selectedRange={fallback:chunk.element}},700)};utterance.onboundary=event=>{if(event.name==='word'||event.charLength){clearTimeout(boundaryTimer);boundaryTimer=null;const spokenLength=event.charLength||((chunk.text.slice(event.charIndex).match(/^\\S+/)||[''])[0].length)||1;highlightChunk(chunk,event.charIndex,spokenLength);updateProgress(prefix+Math.min(chunk.weight,event.charIndex))}};utterance.onend=()=>{clearTimeout(boundaryTimer);boundaryTimer=null;updateProgress(prefix+chunk.weight);speakNext()};utterance.onerror=()=>{status.textContent='No se pudo continuar la lectura';reset()};synth.speak(utterance)}function startFrom(target){if(!chunks.length)buildChunks();clearTimeout(boundaryTimer);boundaryTimer=null;synth.cancel();clearHighlight();let chars=totalChars*(target/1000),sum=0;index=0;while(index<chunks.length-1&&sum+chunks[index].weight<chars){sum+=chunks[index].weight;index++}active=true;pause.disabled=false;stop.disabled=false;start.disabled=true;status.textContent='Leyendo…';speakNext()}progress.addEventListener('change',()=>startFrom(Number(progress.value)));speed.addEventListener('change',()=>{if(active){const point=Number(progress.value);startFrom(point)}else updateDuration()});start.addEventListener('click',()=>startFrom(Number(progress.value)));pause.addEventListener('click',()=>{if(synth.paused){synth.resume();pause.textContent='⏸ Pausar';status.textContent='Leyendo…'}else if(synth.speaking){synth.pause();pause.textContent='▶ Continuar';status.textContent='Lectura en pausa'}});stop.addEventListener('click',()=>{clearTimeout(boundaryTimer);boundaryTimer=null;synth.cancel();clearHighlight();status.textContent='Lectura detenida';reset()});buildChunks();updateDuration();window.addEventListener('beforeunload',()=>synth.cancel())})();</script></body></html>`;
 const url=URL.createObjectURL(new Blob([html],{type:'text/html;charset=utf-8'})),win=window.open(url,'_blank');
 if(!win){URL.revokeObjectURL(url);return}
 setTimeout(()=>URL.revokeObjectURL(url),60000)
}function renderArticleCards(html){
 const boundary=/(?=<(?:p|h[1-6])>Art(?:ículo)?\.?\s+\d+[a-z]?(?:\s|<)|<h2(?:\s|>))/i;
 const pieces=html.split(boundary),outside=[];let lawTitle='',lawParts=[],article='';
 const flushArticle=()=>{if(article){const block=`<section class="article-block">${article}</section>`;if(lawTitle)lawParts.push(block);else outside.push(block);article=''}};
 const flushLaw=()=>{flushArticle();if(lawTitle){outside.push(`<details class="law-block" open><summary class="law-heading">${lawTitle}<span class="law-toggle-icon" aria-hidden="true"></span></summary><div class="law-content">${lawParts.join('')}</div></details>`);lawTitle='';lawParts=[]}};
 for(const piece of pieces){
  if(/^<h2(?:\s|>)/i.test(piece)&&!/^<h2(?:\s[^>]*)?>Art(?:ículo)?\.?\s+\d+/i.test(piece)){flushLaw();lawTitle=piece.match(/^<h2(?:\s[^>]*)?>[\s\S]*?<\/h2>/i)?.[0]||piece;const rest=piece.slice(lawTitle.length);if(rest)lawParts.push(rest);continue}
  const header=piece.match(/^(<(p|h[1-6])(?:\s[^>]*)?>Art(?:ículo)?\.?\s+\d+[a-z]?[\s\S]*?<\/\2>)/i);
  if(header){flushArticle();article=header[1]+piece.slice(header[1].length);continue}
  if(lawTitle){if(article)article+=piece;else lawParts.push(piece)}else outside.push(piece)
 }
 flushLaw();flushArticle();return outside.join('')
}function markdownToHtml(source){const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');const inline=s=>escape(s).replace(/\[\[HIGHLIGHT\]\](.+?)\[\[\/HIGHLIGHT\]\]/g,'<mark class="exam-highlight">$1</mark>').replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/`([^`]+)`/g,'<code>$1</code>');const lines=source.replace(/\r/g,'').split('\n'),out=[];let para=[],list='';const flush=()=>{if(para.length){out.push(`<p>${inline(para.join(' '))}</p>`);para=[]}if(list){out.push(`</${list}>`);list=''}};for(const line of lines){const trim=line.trim();if(!trim){if(list!=='ol')flush();continue}const exam=trim.match(/^\[\[EXAM-REF:(.+)\]\]$/);if(exam){flush();const refs=exam[1].split('|').map(item=>{const [year,questions]=item.split(':');return `<span class="exam-reference-pill">${escape(year)} ${escape(questions)}</span>`}).join('');const badge=`<span class="exam-reference-inline"><span class="exam-reference-label">Preguntado en</span>${refs}</span>`;if(out.length&&/^<h[23]>/i.test(out[out.length-1]))out[out.length-1]=out[out.length-1].replace('</h3>',badge+'</h3>');else out.push(badge);continue}const h=trim.match(/^(#{1,6})\s+(.+)$/);if(h){flush();const n=h[1].length;out.push(`<h${n}>${inline(h[2])}</h${n}>`);continue}if(/^(-{3,}|_{3,})$/.test(trim)){flush();out.push('<hr>');continue}const li=trim.match(/^[-*]\s+(.+)$/),oi=trim.match(/^\d+[.)]\s+(.+)$/);if(li||oi){para.length&&flush();const type=li?'ul':'ol';if(list!==type){if(list)out.push(`</${list}>`);list=type;out.push(`<${list}>`)}out.push(`<li>${inline((li||oi)[1])}</li>`);continue}if(list)flush();para.push(trim)}flush();return out.join('')}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));renderTopics(b.dataset.filter)}));document.querySelector('#refresh-audios')?.addEventListener('click',refreshAudioLibrary);
$('#test-topic').insertAdjacentHTML('beforeend',`<optgroup label="Exámenes oficiales anteriores"><option value="exam-all">Todos los exámenes · preguntas de 2018, 2021, 2022 y 2023</option><option value="exam-2023">Examen completo · 2023</option><option value="exam-2022">Examen completo · 2022</option><option value="exam-2021">Examen completo · 2021</option><option value="exam-2018">Examen completo · 2018</option></optgroup><optgroup label="Tests por tema">${topics.map(t=>`<option value="${t.n}">Tema ${String(t.n).padStart(2,'0')} · ${t.title}</option>`).join('')}</optgroup>`);
$('#test-topic').addEventListener('change',()=>{const isExam=$('#test-topic').value.startsWith('exam-');$('#test-size').disabled=isExam;if(isExam)$('#test-size').value='all'});
let questions=[],idx=0,session={right:0,wrong:0},activeTestAttemptId=null;
const MAX_TEST_HISTORY=20;
function startTestAttempt(mode,scope,topicNumbers){
 const st=state(),now=new Date().toISOString();st.testHistory=Array.isArray(st.testHistory)?st.testHistory:[];
 const previous=st.testHistory.find(attempt=>attempt.id===activeTestAttemptId&&!attempt.completedAt);
 if(previous)previous.abandonedAt=now;
 const topicsToCount=[...new Set(topicNumbers.map(Number).filter(number=>Number.isInteger(number)&&number>=1&&number<=topics.length))];
 const id=`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
 st.testHistory.unshift({id,mode,scope,startedAt:now,topicNumbers:topicsToCount,questionCount:questions.length,answers:[]});
 st.testHistory=st.testHistory.slice(0,MAX_TEST_HISTORY);st.topicProgress=st.topicProgress||{};
 topicsToCount.forEach(number=>{const progress=topicStudy(st,number);st.topicProgress[number]={...progress,testAttempts:(progress.testAttempts||0)+1,lastTestAt:now}});
 activeTestAttemptId=id;persist(st);renderTopics(topicFilter);
}
function addTestAnswer(st,q,choice){
 const attempt=st.testHistory?.find(item=>item.id===activeTestAttemptId);if(!attempt)return;
 const correctIndex=q.correct===null||q.correct===undefined?null:q.correct;
 attempt.answers.push({questionId:q.id,question:q.q,options:q.opts,givenIndex:choice,correctIndex,isCorrect:correctIndex===null?null:choice===correctIndex,topicNumber:q.topicNumber||(!q.year?q.n:null),year:q.year||null,number:q.number||null,explanation:q.why||'',answeredAt:new Date().toISOString()});
}
function finishTestAttempt(){
 const st=state(),attempt=st.testHistory?.find(item=>item.id===activeTestAttemptId);if(!attempt||attempt.completedAt)return;
 attempt.completedAt=new Date().toISOString();attempt.correct=session.right;attempt.incorrect=session.wrong;attempt.ungraded=session.ungraded||0;persist(st);
}

function beginTest(){const pick=$('#test-topic').value;if(pick.startsWith('exam-'))return beginPastExam(pick.slice(5),'#quiz-area',$('#test-size').value,'#quiz-source');let pool=topics.filter(t=>pick==='all'||t.n===Number(pick)).flatMap(t=>t.qs.map((q,i)=>({id:`${t.n}-${i}`,n:t.n,title:t.title,q:q.q,opts:q.opts,correct:q.correct,why:q.why,source:sourceList(t)[0]})));pool.sort(()=>Math.random()-.5);const size=$('#test-size').value;questions=pool.slice(0,size==='all'?pool.length:Number(size));idx=0;session={right:0,wrong:0};$('#exam-area').innerHTML='';$('#exam-source').innerHTML='';$('#quiz-source').innerHTML='';const scope=pick==='all'?'Todos los temas':`Tema ${pick}`;startTestAttempt('Test',scope,questions.map(q=>q.n));renderQuestion()}
const examPdf={2018:'EXAMEN_AUXADMGVA_2018_L.pdf',2021:'EXAMEN_AUXADMGVA_2021_L.pdf',2022:'EXAMEN_AUXADMGVA_2022_L.pdf',2023:'EXAMEN_AUXADMGVA_2023_L.pdf'};
function questionReferences(q){const topic=q.topicNumber?`<a class="material-link" href="#tema-${String(q.topicNumber).padStart(2,'0')}" data-topic-link="${q.topicNumber}">Consultar Tema ${String(q.topicNumber).padStart(2,'0')} en el temario</a>`:'';const official=q.officialSource?`<a class="material-link" href="${q.officialSource}" target="_blank" rel="noopener">Abrir norma oficial \u2197</a>`:'';return `<div class="answer-references">${topic}${official}</div>`}
function beginPastExam(year=$('#exam-year').value,target='#exam-area',sizeValue=$('#exam-size').value,sourceSelector='#exam-source'){
 const years=String(year)==='all'?Object.keys(examPdf):[String(year)],letters=['A','B','C','D'];
 const pool=years.flatMap(examYear=>(window.pastExams?.[examYear]||[]).filter(x=>x.options).map(x=>{
  const answer=String(x.correct).toUpperCase(),correct=letters.indexOf(answer),optionMap=Object.fromEntries(Object.entries(x.options).map(([key,value])=>[key.toUpperCase(),value])),opts=letters.map(key=>optionMap[key]).filter(value=>typeof value==='string');
  return {id:`exam-${examYear}-${x.number}`,n:x.number,year:examYear,number:x.number,q:x.question,opts,correct:correct>=0?correct:null,topicNumber:x.topicNumber||null,officialSource:x.officialSource||null,why:x.explanation||(correct>=0?`La plantilla de respuestas de este examen señala la opción ${answer}.`:'Este examen no incluye la respuesta correcta en la plantilla; esta pregunta no se puntuará.'),source:[`PDF del examen ${examYear}`,`OPOSICIONES/AUX ADM GVA/EXAMENES/${examPdf[examYear]}`]}
 }).filter(x=>x.opts.length===4));
 questions=pool.slice(0,sizeValue==='all'?pool.length:Number(sizeValue));idx=0;session={right:0,wrong:0};
 const other=target==='#exam-area'?'#quiz-area':'#exam-area';$(other).innerHTML='';$(target).innerHTML='';$(target==='#exam-area'?'#quiz-source':'#exam-source').innerHTML='';
 const links=years.map(examYear=>`<a class="material-link" href="${encodeURI(`OPOSICIONES/AUX ADM GVA/EXAMENES/${examPdf[examYear]}`)}" target="_blank" rel="noopener">PDF examen ${examYear} ↗</a>`).join(' ');
 $(sourceSelector).innerHTML=`${links}<span>${pool.length} preguntas; ${pool.filter(question=>question.correct!==null).length} con respuesta en plantilla</span>`;
 if(!pool.length){$(target).innerHTML='<div class="empty-review panel"><h2>No hay preguntas con respuesta disponible</h2><p>Revisa los JSON de los exámenes o consulta los PDF originales.</p></div>';return}
 startTestAttempt('Examen',years.join(', '),questions.map(q=>q.topicNumber).filter(Boolean));
 renderQuestion(target)
}function renderQuestion(target='#quiz-area'){window.stopQuizSpeech();const area=$(target);if(idx>=questions.length){finishTestAttempt();area.innerHTML=`<div class="result-card panel"><span class="stat-icon green">✓</span><h2>Test terminado</h2><p>Has acertado <strong>${session.right}</strong> y fallado <strong>${session.wrong}</strong> de ${questions.length} preguntas.${session.ungraded?` ${session.ungraded} no tenían respuesta en la plantilla y no se han puntuado.`:''}</p><button class="primary-button" id="again-test">Hacer otro test →</button></div>`;$('#again-test').addEventListener('click',target==='#exam-area'?beginPastExam:beginTest);return}const q=questions[idx];area.innerHTML=`<div class="quiz-card panel"><div class="quiz-meta"><span>${q.year?`EXAMEN ${q.year} · `:''}PREGUNTA ${q.year?q.number:idx+1} ${q.year?'':`/ ${questions.length}`}</span><span>${q.year?'CUESTIONARIO OFICIAL':'TEMA '+String(q.n).padStart(2,'0')}</span></div><div class="quiz-progress"><span style="width:${(idx+1)/questions.length*100}%"></span></div><div class="quiz-question"><h2>${q.q}</h2><button class="secondary-button read-question" type="button" data-read-question aria-pressed="false" ${window.quizSpeechAvailable()?'':'disabled title="La lectura en voz alta no está disponible en este navegador"'}>🔊 Escuchar pregunta y respuestas</button></div><div class="answers">${q.opts.map((a,i)=>`<button class="answer" data-answer="${i}"><b>${String.fromCharCode(65+i)}</b>${a}</button>`).join('')}</div><div class="feedback-slot"></div><div class="quiz-actions"><button class="secondary-button" data-next disabled>${idx+1===questions.length?'Ver resultado':'Siguiente pregunta →'}</button></div></div>`;area.querySelectorAll('.answer').forEach(b=>b.addEventListener('click',()=>respond(q,Number(b.dataset.answer),area,target)));area.querySelector('[data-next]').addEventListener('click',()=>{idx++;renderQuestion(target)})}
function respond(q,choice,area,target){
 const st=state(),hasKey=q.correct!==null&&q.correct!==undefined,ok=hasKey&&choice===q.correct;
 if(!hasKey)session.ungraded=(session.ungraded||0)+1;
 else{st.stats.answered++;if(ok){st.stats.correct++;session.right++;st.wrong=st.wrong.filter(item=>item.id!==q.id)}else{session.wrong++;if(!st.wrong.some(item=>item.id===q.id))st.wrong.push({id:q.id,n:q.n,year:q.year,number:q.number,q:q.q,opts:q.opts,correct:q.correct,why:q.why,topicNumber:q.topicNumber,officialSource:q.officialSource,source:q.source})}}
 st.answers[q.id]=choice;addTestAnswer(st,q,choice);persist(st);
 area.querySelectorAll('.answer').forEach((button,index)=>{button.disabled=true;if(hasKey&&index===q.correct)button.classList.add('correct');else if(index===choice)button.classList.add('incorrect')});
 const feedback=area.querySelector('.feedback-slot');
 if(!hasKey)feedback.innerHTML=`<div class="feedback"><strong>Pregunta sin respuesta en la plantilla</strong><p>${q.why}</p>${questionReferences(q)}<a href="${q.source[1]}" target="_blank" rel="noopener">Abrir PDF del examen &#8599;</a></div>`;
 else feedback.innerHTML=`<div class="feedback ${ok?'good':'bad'}"><strong>${ok?'&#161;Correcto!':'Respuesta incorrecta'}</strong><p>${q.why}</p>${questionReferences(q)}<a href="${q.source[1]}" target="_blank" rel="noopener">${q.year?'Abrir PDF del examen':'Consultar fuente oficial'} &#8599;</a>${ok?'':'<small>Se ha a&#241;adido a Repasar fallos.</small>'}</div>`;
 area.querySelector('[data-next]').disabled=false;
}
$('#start-test').addEventListener('click',beginTest);$('#start-exam').addEventListener('click',beginPastExam);
function renderAttemptHistory(st=state()){
 const container=$('#attempt-history');if(!container)return;
 const history=Array.isArray(st.testHistory)?st.testHistory:[];
 if(!history.length){container.innerHTML='<div class="panel audit-empty">A&#250;n no has realizado tests desde que se activ&#243; el historial.</div>';return}
 container.innerHTML=history.map(attempt=>{
  const when=new Date(attempt.startedAt).toLocaleString('es-ES'),answers=attempt.answers||[],right=answers.filter(item=>item.isCorrect===true).length,wrong=answers.filter(item=>item.isCorrect===false).length,ungraded=answers.filter(item=>item.isCorrect===null).length;
  const stateLabel=attempt.completedAt?'Completado':attempt.abandonedAt?'Interrumpido':'En curso';
  const detail=answers.length?answers.map((item,index)=>{
   const given=item.options?.[item.givenIndex]??'Sin respuesta',correct=item.correctIndex===null?'No disponible':item.options?.[item.correctIndex]??'No disponible';
   const label=item.year?`Examen ${item.year} &#183; pregunta ${item.number}`:`Pregunta ${index+1}${item.topicNumber?` &#183; tema ${String(item.topicNumber).padStart(2,'0')}`:''}`;
   return `<article class="audit-answer ${item.isCorrect===true?'is-correct':item.isCorrect===false?'is-wrong':'is-ungraded'}"><strong>${escapeHtml(label)}</strong><p>${escapeHtml(item.question||'Enunciado no disponible')}</p><div><span>Tu respuesta: <b>${String.fromCharCode(65+item.givenIndex)}. ${escapeHtml(given)}</b></span><span>Correcta: <b>${item.correctIndex===null?'Sin plantilla':`${String.fromCharCode(65+item.correctIndex)}. ${escapeHtml(correct)}`}</b></span></div>${item.explanation?`<small>${escapeHtml(item.explanation)}</small>`:''}</article>`;
  }).join(''):'<p class="audit-empty">No se registraron respuestas en este intento.</p>';
  return `<details class="attempt-card panel"><summary><span><strong>${escapeHtml(attempt.mode)} &#183; ${escapeHtml(attempt.scope)}</strong><small>${escapeHtml(when)} &#183; ${stateLabel} &#183; ${answers.length}/${attempt.questionCount} respondidas</small></span><b>${right} aciertos &#183; ${wrong} fallos${ungraded?` &#183; ${ungraded} sin plantilla`:''}</b></summary><div class="attempt-answers">${detail}</div></details>`;
 }).join('');
}
function renderReview(){const area=$('#review-area'),s=state();renderAttemptHistory(s);if(!s.wrong.length){area.innerHTML='<div class="empty-review panel"><span>✦</span><h2>¡Todo al día!</h2><p>Las preguntas que falles aparecerán aquí para que puedas repasarlas.</p></div>';return}area.innerHTML=`<p class="review-count">${s.wrong.length} pregunta${s.wrong.length===1?'':'s'} pendiente${s.wrong.length===1?'':'s'}</p>`+s.wrong.map(q=>`<article class="review-card panel"><div class="quiz-meta"><span>${q.year?`EXAMEN ${q.year} · PREGUNTA ${q.number}`:`TEMA ${String(q.n).padStart(2,'0')}`}</span><span>REPASO PENDIENTE</span></div><h2>${q.q}</h2><p class="review-last-answer">${s.answers[q.id]!==undefined?`&#218;ltima respuesta registrada: ${String.fromCharCode(65+s.answers[q.id])}. ${escapeHtml(q.opts[s.answers[q.id]])}`:'No hay una respuesta anterior registrada.'}</p><div class="answers">${q.opts.map((a,i)=>`<button class="answer" data-review="${q.id}" data-answer="${i}">${String.fromCharCode(65+i)}. &nbsp;${a}</button>`).join('')}</div><div class="review-feedback" id="review-${q.id}"></div><details class="review-source"><summary>Ver explicación y fuente</summary><p>${q.why}</p>${questionReferences(q)}<a href="${q.source[1]}" target="_blank" rel="noopener">${q.source[0]} ↗</a></details></article>`).join('');
document.querySelectorAll('[data-review]').forEach(b=>b.addEventListener('click',()=>{const q=state().wrong.find(x=>x.id===b.dataset.review),choice=Number(b.dataset.answer),ok=choice===q.correct;document.querySelectorAll(`[data-review="${q.id}"]`).forEach((x,i)=>{x.disabled=true;if(i===q.correct)x.classList.add('correct');else if(i===choice)x.classList.add('incorrect')});if(ok){const st=state();st.wrong=st.wrong.filter(x=>x.id!==q.id);persist(st);$(`#review-${q.id}`).innerHTML='<p class="feedback good">¡Bien! Pregunta repasada y retirada de pendientes.</p>';setTimeout(renderReview,900)}else $(`#review-${q.id}`).innerHTML='<p class="feedback bad">Todavía no. Revisa la explicación y vuelve a intentarlo en otro repaso.</p>'}))}
renderTopics();renderStats();refreshAudioLibrary();openTopicFromHash();

const gvaOppositionSwitch = document.querySelector('#opposition-switch');
if (gvaOppositionSwitch && ![...gvaOppositionSwitch.options].some(option => option.value === 'valencia')) {
  const valenciaOption = document.createElement('option');
  valenciaOption.value = 'valencia';
  valenciaOption.textContent = 'Ayuntamiento de València';
  gvaOppositionSwitch.append(valenciaOption);
}
gvaOppositionSwitch?.addEventListener('change', event => {
  if (event.target.value === 'valencia') window.location.href = 'valencia.html';
});

document.addEventListener('click', event => {
  const button = event.target.closest('[data-open-test-summary]');
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  window.openTopicTestSummary(Number(button.dataset.openTestSummary));
});


const studyArticleMarkdownCache = new Map();
function getStudyTopicMarkdown(number) {
  if (studyArticleMarkdownCache.has(number)) return studyArticleMarkdownCache.get(number);
  const encoded = window.topicMaterialB64?.[number];
  if (!encoded) return '';
  const bytes = Uint8Array.from(atob(encoded), character => character.charCodeAt(0));
  const markdown = new TextDecoder('utf-8').decode(bytes);
  studyArticleMarkdownCache.set(number, markdown);
  return markdown;
}

window.getStudyArticleText = function(topicNumber, reference) {
  const citation = String(reference || '');
  const articleMatches = [...citation.matchAll(/arts?\.?\s*(\d+(?:\.\d+)*)/gi)];
  if (!articleMatches.length) return '';
  const lawName = citation.slice(0, articleMatches[0].index).replace(/[,;\s]+$/, '');
  const normalize = value => String(value || '').toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const lawNumber = lawName.match(/\d{1,4}\/\d{4}/);
  const normalizedLaw = normalize(lawName);
  const topicOrder = [Number(topicNumber), ...Array.from({length:24}, (_, index) => index + 1).filter(number => number !== Number(topicNumber))];
  const matchingSections = [];
  for (const number of topicOrder) {
    const markdown = getStudyTopicMarkdown(number);
    if (!markdown) continue;
    const sections = markdown.split(/(?=^##\s+)/m);
    const documentTitle = normalize((markdown.match(/^#\s+(.+)$/m) || [,''])[1]);
    const matching = sections.filter(part => {
      const heading = (part.match(/^##\s+(.+)$/m) || [,''])[1];
      const normalizedHeading = normalize(heading);
      if (lawNumber) return normalizedHeading.includes(normalize(lawNumber[0])) || documentTitle.includes(normalize(lawNumber[0]));
      if (normalizedLaw.includes('constituci')) return normalizedHeading.includes('constituci');
      if (normalizedLaw.includes('estatuto') || normalizedLaw.includes('estatut')) return normalizedHeading.includes('estatut') || normalizedHeading.includes('autonomia');
      if (normalizedLaw.includes('tfue')) return normalizedHeading.includes('funcionamiento') || normalizedHeading.includes('tfue');
      if (normalizedLaw.includes('tue')) return normalizedHeading.includes('union europea') || /\btue\b/i.test(normalizedHeading);
      return normalizedHeading.includes(normalizedLaw.slice(0, 24));
    });
    if (!matching.length && !lawNumber && normalizedLaw.includes('estatut')) matching.push(markdown);
    for (const section of matching) matchingSections.push({number, section});
  }
  const bodies = articleMatches.map(articleMatch => {
    const requested = articleMatch[1].replace(/\s/g, '');
    for (const {section} of matchingSections) {
      const lines = section.split(/\r?\n/);
      let target = requested;
      const findArticle = article => lines.findIndex(line => {
        const match = line.match(/^###\s+Art.{0,3}culo\s+(\d+(?:\.\d+)*)/i);
        return match && match[1] === article;
      });
      let start = findArticle(target);
      while (start < 0 && target.includes('.')) {
        target = target.slice(0, target.lastIndexOf('.'));
        start = findArticle(target);
      }
      if (start < 0) continue;
      let end = lines.findIndex((line, index) => index > start && (/^###\s+Art.{0,3}culo\s+\d+/i.test(line) || /^##\s+/.test(line)));
      if (end < 0) end = lines.length;
      const body = lines.slice(start, end).join('\n')
        .replace(/^###\s+Art.{0,3}culo\s+\d+(?:\.\d+)*\s*$/im, '')
        .replace(/\[\[HIGHLIGHT\]\]|\[\[\/HIGHLIGHT\]\]/g, '')
        .replace(/\[\[EXAM-REF:[^\]]+\]\]/g, '')
        .trim();
      const fallbackLabel = target !== requested ? ` completo (incluye apartado ${requested})` : '';
      return articleMatches.length > 1 || fallbackLabel ? `Art\u00EDculo ${target}${fallbackLabel}\n${body}` : body;
    }
    return '';
  }).filter(Boolean);
  return bodies.join('\n\n');
};

function openTopicQuestions(number) {
  const popup = window.open('', '_blank');
  if (!popup) return;

  const topic = topics.find(item => item.n === number);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  popup.document.open();
  popup.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Preguntas &#183; Tema ${String(number).padStart(2,'0')}</title><style>
    *{box-sizing:border-box}body{margin:0;background:#f5f7f2;color:#263328;font:15px/1.65 system-ui,-apple-system,"Segoe UI",sans-serif}.bar{position:sticky;top:0;z-index:10;background:#fff;border-bottom:1px solid #e5ebe3;padding:10px max(18px,calc((100vw - 900px)/2));display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;color:#55705a;font-size:12px}.bar button{border:1px solid #dce8da;background:#f5f8f3;color:#286342;border-radius:7px;padding:8px 11px;font-weight:600;cursor:pointer}main{max-width:900px;margin:30px auto;padding:0 18px 50px}.eyebrow{color:#718071;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase}h1{font-size:30px;line-height:1.2;margin:6px 0}header p:last-child{color:#718071}.question{background:#fff;border:1px solid #e5ebe3;border-radius:12px;padding:20px;margin:12px 0}.meta{font-size:10px;color:#718071;letter-spacing:.5px}.question h2{font-size:16px;line-height:1.5;margin:10px 0 14px}.options{list-style:none;padding:0;margin:0;display:grid;gap:7px}.options li{padding:10px 12px;border:1px solid #e7ebe4;border-radius:8px}.letter{display:inline-grid;place-items:center;width:22px;height:22px;margin-right:7px;border-radius:6px;background:#f0f5ee;color:#34764d;font-weight:700;font-size:11px}.answer{margin-top:12px;border-top:1px solid #eff1ec;padding-top:10px}.answer summary{cursor:pointer;color:#286342;font-size:12px;font-weight:700}.answer p{font-size:13px;color:#566256}.empty{padding:16px;background:#fff5ee;border-radius:9px;color:#805b34}.study-reference{display:block;width:100%;margin-top:12px;padding:10px 12px;border:1px solid #dce8da;border-left:3px solid #78a47b;border-radius:7px;background:#f1f6ef;color:#405943;text-align:left;font:inherit;cursor:help}.study-reference strong{display:block;color:#286342;font-size:10px;text-transform:uppercase;letter-spacing:.45px}.study-reference small{display:block;margin-top:4px;color:#708572;font-size:10px}.study-reference:hover{background:#e9f2e8}.article-tooltip{position:fixed;z-index:20;max-width:calc(100vw - 24px);max-height:min(60vh,520px);overflow:auto;padding:14px 16px;border:1px solid #cbdcc9;border-radius:10px;background:#fff;box-shadow:0 10px 32px #2633282b;color:#334336;font-size:13px;line-height:1.65}.article-tooltip[hidden]{display:none}.article-tooltip>strong{display:block;margin-bottom:8px;color:#286342;font-size:12px}.article-tooltip p{margin:7px 0}.question-export-tools{display:flex;align-items:end;gap:9px;flex-wrap:wrap;margin:0}.question-export-tools label{display:grid;gap:4px;color:#6d7b6e;font-size:10px}.question-export-tools select,.question-export-tools button{min-height:36px;border:1px solid #dce8da;border-radius:7px;background:#f5f8f3;color:#286342;padding:7px 10px;font:600 11px system-ui}.question-export-tools button{cursor:pointer}.question-export-tools button:disabled{opacity:.55;cursor:wait}#question-export-status{min-height:17px;color:#708572;font-size:10px}@media(max-width:600px){.bar{padding:10px 12px}.question-export-tools{order:3;width:100%}main{margin:20px auto;padding:0 12px 35px}h1{font-size:24px}.question{padding:15px}}
  </style></head><body><div class="bar"><span>OpoGVA &#183; Preguntas del temario</span><div class="question-export-tools"><label>Contenido<select id="question-export-scope"><option value="topic">Este tema</option><option value="all">Todo el temario</option></select></label><label>Formato<select id="question-export-format"><option value="md">Markdown (.md)</option><option value="doc">Word (.doc)</option><option value="txt">Texto (.txt)</option></select></label><button type="button" id="question-export-submit">Exportar</button></div><button onclick="if(window.opener&&!window.opener.closed){window.opener.focus();window.close()}else{window.close()}">Volver al temario</button></div><main><header><p class="eyebrow">${topic ? escape(topic.b === 'general' ? 'Parte general' : 'Parte especial') + ' \u00B7 ' : ''}Tema ${String(number).padStart(2,'0')}</p><h1>${escape(topic?.title || `Tema ${number}`)}</h1><p id="status">Cargando preguntas...</p><p id="question-export-status" aria-live="polite"></p></header><div id="questions"></div></main></body></html>`);
  popup.document.close();
  const exportButton=popup.document.querySelector('#question-export-submit');
  exportButton?.addEventListener('click',()=>{
    const format=popup.document.querySelector('#question-export-format').value;
    const scope=popup.document.querySelector('#question-export-scope').value;
    const status=popup.document.querySelector('#question-export-status');
    const exportTask=popup.opener?.exportQuestionBank?.(format,scope,number,status);
    if(exportTask?.finally){exportButton.disabled=true;exportTask.finally(()=>{exportButton.disabled=false;});}
  });

  fetch(new URL('OPOSICIONES/AUX ADM GVA/EXAMENES/banco_agrupado_por_temario.json', location.href), {cache:'no-store'})
    .then(response => { if (!response.ok) throw new Error('No se pudo cargar el banco'); return response.json(); })
    .then(bank => {
      const group = Array.isArray(bank.temas) ? bank.temas.find(item => Number(item.tema_numero) === number) : null;
      const questions = group?.preguntas || (Array.isArray(bank) ? bank.filter(item => Number(item.tema_numero) === number) : []);
      const status = popup.document.querySelector('#status');
      const container = popup.document.querySelector('#questions');
      if (!status || !container) return;
      status.textContent = `${questions.length} pregunta${questions.length === 1 ? '' : 's'} ordenadas por norma y art\u00EDculo`;
      if (!questions.length) {
        container.innerHTML = '<p class="empty">Todav\u00EDa no hay preguntas asignadas a este tema en el banco.</p>';
        return;
      }
      container.innerHTML = questions.map((question, index) => {
        const options = Object.entries(question.opciones || {}).map(([letter, text]) => `<li><span class="letter">${escape(letter.toUpperCase())}</span>${escape(text)}</li>`).join('');
        const answer = escape(question.respuesta_correcta || 'Sin respuesta');
        const explanation = question.explicacion ? `<p>${escape(question.explicacion)}</p>` : '';
        const reference = question.referencia_tematica ? (question.referencia_tematica_tipo === 'articulo'
          ? `<button type="button" class="study-reference" data-study-article="${number}" data-reference="${escape(question.referencia_tematica)}" aria-haspopup="true"><strong>Art\u00EDculo para estudiar:</strong> ${escape(question.referencia_tematica)}<small>Pasa el cursor para leerlo</small></button>`
          : `<div class="study-reference"><strong>Apartado para estudiar:</strong> ${escape(question.referencia_tematica)}</div>`) : '';
        return `<article class="question"><div class="meta">${escape(question.anio || '')} \u00B7 ${escape(question.examen_origen || '')} \u00B7 Pregunta ${escape(question.numero_original || index + 1)}</div><h2>${escape(question.enunciado || 'Enunciado no disponible')}</h2><ul class="options">${options}</ul>${reference}<details class="answer"><summary>Ver respuesta y explicaci\u00F3n</summary><p><strong>Respuesta correcta: ${answer}</strong></p>${explanation}</details></article>`;
      }).join('');
      const tooltip = popup.document.createElement('aside');
      tooltip.className = 'article-tooltip';
      tooltip.setAttribute('role','tooltip');
      tooltip.hidden = true;
      popup.document.body.appendChild(tooltip);
      let hideTimer, activeButton;
      const hideTooltip = force => {
        if (!force && activeButton?.dataset.pinned === 'true') return;
        hideTimer = popup.setTimeout(() => {
          tooltip.hidden = true;
          activeButton?.setAttribute('aria-expanded','false');
        }, 160);
      };
      const showTooltip = button => {
        activeButton = button;
        popup.clearTimeout(hideTimer);
        let text = '';
        try { text = popup.opener?.getStudyArticleText?.(number, button.dataset.reference) || ''; } catch {}
        const escapedText = escape(text || 'No se ha encontrado el texto literal de este art\u00EDculo en los apuntes de ninguno de los temas.');
        const paragraphs = escapedText.split(/\n{2,}/).map(part => `<p>${part.replace(/(^|\n)#{1,6}\s+/g,'$1').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>')}</p>`).join('');
        tooltip.innerHTML = `<strong>${escape(button.dataset.reference)}</strong>${paragraphs}`;
        tooltip.hidden = false;
        const rect = button.getBoundingClientRect();
        const width = Math.min(480, popup.innerWidth - 24);
        tooltip.style.width = `${width}px`;
        tooltip.style.left = `${Math.max(12, Math.min(rect.left, popup.innerWidth - width - 12))}px`;
        tooltip.style.top = `${Math.max(12, Math.min(rect.bottom + 8, popup.innerHeight - tooltip.offsetHeight - 12))}px`;
        button.setAttribute('aria-expanded','true');
      };
      container.querySelectorAll('[data-study-article]').forEach(button => {
        button.dataset.pinned = 'false';
        button.addEventListener('mouseenter', () => { button.dataset.pinned = 'false'; showTooltip(button); });
        button.addEventListener('focus', () => showTooltip(button));
        button.addEventListener('mouseleave', () => hideTooltip(false));
        button.addEventListener('blur', () => hideTooltip(false));
        button.addEventListener('click', () => {
          button.dataset.pinned = button.dataset.pinned === 'true' ? 'false' : 'true';
          if (button.dataset.pinned === 'true') showTooltip(button);
          else hideTooltip(true);
        });
      });
      tooltip.addEventListener('mouseenter', () => popup.clearTimeout(hideTimer));
      tooltip.addEventListener('mouseleave', () => hideTooltip(false));
      popup.document.addEventListener('keydown', event => { if (event.key === 'Escape') hideTooltip(true); });
      popup.document.addEventListener('click', event => {
        if (!event.target.closest('[data-study-article]') && !tooltip.contains(event.target)) {
          if (activeButton) activeButton.dataset.pinned = 'false';
          hideTooltip(true);
        }
      });
    })
    .catch(() => {
      const status = popup.document.querySelector('#status');
      const container = popup.document.querySelector('#questions');
      if (status) status.textContent = 'No se pudo cargar el banco de preguntas.';
      if (container) container.innerHTML = '<p class="empty">Abre la aplicaci\u00F3n desde su servidor o GitHub Pages para acceder al archivo JSON.</p>';
    });
}


function exportQuestionText(value) {
  return String(value ?? '').replace(/\[\[HIGHLIGHT\]\]|\[\[\/HIGHLIGHT\]\]/g,'').replace(/\[\[EXAM-REF:[^\]]+\]\]/g,'').trim();
}

function exportQuestionBank(format, scope='all', topicNumber=null, statusNode=null) {
  const status=statusNode||document.querySelector('#question-export-status');
  let printWindow=null;
  if(format==='print') {
    printWindow=window.open('','_blank');
    if(!printWindow) { if(status)status.textContent='Permite las ventanas emergentes para imprimir.'; return; }
    printWindow.document.write('<!doctype html><html lang="es"><meta charset="utf-8"><title>Preparando impresi\u00F3n</title><body>Preparando las preguntas...</body></html>');
    printWindow.document.close();
  }
  if(status)status.textContent='Preparando preguntas...';
  return fetch(new URL('OPOSICIONES/AUX ADM GVA/EXAMENES/banco_agrupado_por_temario.json',location.href),{cache:'no-store'})
    .then(response=>{if(!response.ok)throw new Error('No se pudo cargar el banco de preguntas.');return response.json()})
    .then(bank=>{
      const selectedTopics=scope==='topic'?(bank.temas||[]).filter(topic=>Number(topic.tema_numero)===Number(topicNumber)):(bank.temas||[]);
      const records=selectedTopics.flatMap(topic=>(topic.preguntas||[]).map(question=>({topic,question,articleText:question.referencia_tematica_tipo==='articulo'?window.getStudyArticleText(topic.tema_numero,question.referencia_tematica):''})));
      const plain=value=>exportQuestionText(value);
      const topicInfo=selectedTopics[0];
      const exportTitle=scope==='topic'&&topicInfo?`Tema ${String(topicInfo.tema_numero).padStart(2,'0')} \u2014 ${plain(topicInfo.titulo)}`:'Banco de preguntas \u2014 Auxiliar Administrativo GVA';
      const filename=scope==='topic'?`OpoGVA-tema-${String(topicNumber).padStart(2,'0')}-preguntas`:'OpoGVA-preguntas-temario';
      const markdown=[`# ${exportTitle}`,'',`${records.length} preguntas ordenadas por tema y art\u00EDculo.`,''];
      const text=[exportTitle.toUpperCase(),'',`${records.length} preguntas ordenadas por tema y art\u00EDculo.`,''];
      const htmlQuestions=[];
      let currentTopic=null;
      records.forEach(({topic,question,articleText},index)=>{
        if(currentTopic!==topic.tema_numero){
          currentTopic=topic.tema_numero;
          markdown.push(`## Tema ${String(currentTopic).padStart(2,'0')} \u2014 ${plain(topic.titulo)}`,'');
          text.push('',`TEMA ${String(currentTopic).padStart(2,'0')} - ${plain(topic.titulo)}`,'='.repeat(76));
          htmlQuestions.push(`<h2>Tema ${String(currentTopic).padStart(2,'0')} \u2014 ${escapeHtml(topic.titulo)}</h2>`);
        }
        const questionTitle=`Pregunta ${question.numero_original||index+1} \u00B7 ${question.anio||''}`;
        const options=Object.entries(question.opciones||{});
        const reference=question.referencia_tematica||'Sin referencia disponible';
        markdown.push(`### ${questionTitle}`,'',plain(question.enunciado),'',...options.map(([key,value])=>`- **${key.toUpperCase()}:** ${plain(value)}`),'',`**Respuesta correcta:** ${plain(question.respuesta_correcta||'Sin respuesta')}`,'',`**Explicaci\u00F3n:** ${plain(question.explicacion||'Sin explicaci\u00F3n disponible')}`,'',`**Art\u00EDculo o apartado para estudiar:** ${plain(reference)}`,'');
        text.push('',`${questionTitle}`,plain(question.enunciado),...options.map(([key,value])=>`${key.toUpperCase()}) ${plain(value)}`),'',`Respuesta correcta: ${plain(question.respuesta_correcta||'Sin respuesta')}`,`Explicaci\u00F3n: ${plain(question.explicacion||'Sin explicaci\u00F3n disponible')}`,`Art\u00EDculo o apartado para estudiar: ${plain(reference)}`);
        if(articleText){markdown.push('**Texto del art\u00EDculo:**','',articleText,'');text.push('Texto del art\u00EDculo:',plain(articleText));}else if(question.referencia_tematica_tipo==='articulo'){markdown.push('_Texto del art\u00EDculo no encontrado en los apuntes disponibles._','');text.push('Texto del art\u00EDculo no encontrado en los apuntes disponibles.');}
        text.push('-'.repeat(76));
        const articleHtml=articleText?`<h4>Texto del art\u00EDculo</h4><div class="article-text">${escapeHtml(plain(articleText)).replace(/\n/g,'<br>')}</div>`:question.referencia_tematica_tipo==='articulo'?'<p><strong>Texto del art\u00EDculo:</strong> No encontrado en los apuntes disponibles.</p>':'';
        htmlQuestions.push(`<article><h3>${escapeHtml(questionTitle)}</h3><p>${escapeHtml(plain(question.enunciado))}</p><ul>${options.map(([key,value])=>`<li><strong>${escapeHtml(key.toUpperCase())}.</strong> ${escapeHtml(plain(value))}</li>`).join('')}</ul><p><strong>Respuesta correcta:</strong> ${escapeHtml(plain(question.respuesta_correcta||'Sin respuesta'))}</p><p><strong>Explicaci\u00F3n:</strong> ${escapeHtml(plain(question.explicacion||'Sin explicaci\u00F3n disponible'))}</p><p><strong>Art\u00EDculo o apartado para estudiar:</strong> ${escapeHtml(plain(reference))}</p>${articleHtml}</article>`);
      });
      if(format==='md') downloadQuestionFile(`${filename}.md`,markdown.join('\n'),'text/markdown;charset=utf-8');
      if(format==='txt') downloadQuestionFile(`${filename}.txt`,'\uFEFF'+text.join('\n'),'text/plain;charset=utf-8');
      const html=`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Preguntas Auxiliar Administrativo GVA</title><style>body{font:11pt/1.5 Arial,sans-serif;color:#222}h1{font-size:20pt}h2{margin-top:28px;border-bottom:2px solid #6d9271;padding-bottom:5px}article{margin:18px 0 25px;page-break-inside:avoid}h3{font-size:12pt}li{margin:4px 0}.article-text{border-left:3px solid #78a47b;padding:8px 12px;background:#f3f7f1}.article-text p{margin:5px 0}@media print{article{page-break-inside:avoid}}</style></head><body><h1>${escapeHtml(exportTitle)}</h1>${htmlQuestions.join('')}</body></html>`;
      if(format==='doc') downloadQuestionFile(`${filename}.doc`,'\uFEFF'+html,'application/msword;charset=utf-8');
      if(format==='print'&&printWindow){printWindow.document.open();printWindow.document.write(html);printWindow.document.close();setTimeout(()=>{try{printWindow.focus();printWindow.print()}catch{}},500);}
      if(status)status.textContent=`${records.length} preguntas preparadas${format==='print'?' para imprimir':'.'}`;
    })
    .catch(error=>{if(status)status.textContent=error.message;if(printWindow)printWindow.close();})
    ;
}

function escapeHtml(value) {
  return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

function downloadQuestionFile(filename,content,type) {
  const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),link=document.createElement('a');
  link.href=url;link.download=filename;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
}

window.exportQuestionBank=exportQuestionBank;







