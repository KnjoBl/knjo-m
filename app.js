const $ = (id) => document.getElementById(id);
const views = ["studio","templates","enhance","library"];
const names = {studio:"Estudio creativo",templates:"Plantillas",enhance:"Mejorar medios",library:"Biblioteca"};
document.querySelectorAll(".nav").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".nav").forEach(b=>b.classList.toggle("active",b===btn));
  views.forEach(v=>$("view-"+v).classList.toggle("active",v===btn.dataset.view));
  $("page-title").textContent=names[btn.dataset.view];
  if(btn.dataset.view==="library") renderSaved();
}));
const fields = ["brand-name","headline","subline","accent","style","format"];
function updatePreview(){
  $("preview-brand").textContent=$("brand-name").value.trim()||"TU MARCA";
  const headline=$("headline").value.trim()||"HECHO PARA DESTACAR";
  $("preview-headline").innerHTML=headline.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])).replace(/\n/g,"<br>").replace(/ (?![^<]*>)/g,"<br>");
  $("preview-subline").textContent=$("subline").value;
  $("ad-card").className="ad-card "+$("style").value;
  document.documentElement.style.setProperty("--accent",$("accent").value);
  const format=$("format").value, card=$("ad-card");
  if(format==="square"){card.style.aspectRatio="1/1";$("dimension").textContent="1:1 · cuadrado";}
  else if(format==="landscape"){card.style.aspectRatio="16/9";$("dimension").textContent="16:9 · horizontal";}
  else{card.style.aspectRatio="9/16";$("dimension").textContent="9:16 · vertical";}
}
fields.forEach(id=>$(id).addEventListener("input",updatePreview));
$("image-upload").addEventListener("change",e=>{
  const file=e.target.files?.[0];if(!file)return;
  if(!file.type.startsWith("image/")){$("message").textContent="Selecciona un archivo de imagen válido.";return;}
  const url=URL.createObjectURL(file);$("preview-image").src=url;$("preview-image").hidden=false;$("product-placeholder").hidden=true;
  $("message").textContent=`Imagen cargada localmente: ${file.name}. No se ha enviado a ningún servidor.`;
});
function getState(){return {brand:$("brand-name").value,headline:$("headline").value,subline:$("subline").value,accent:$("accent").value,style:$("style").value,format:$("format").value,createdAt:new Date().toISOString()}}
function loadState(s){$("brand-name").value=s.brand;$("headline").value=s.headline;$("subline").value=s.subline;$("accent").value=s.accent;$("style").value=s.style;$("format").value=s.format;updatePreview()}
function saved(){try{return JSON.parse(localStorage.getItem("knjo-m-templates")||"[]")}catch{return []}}
function writeSaved(a){localStorage.setItem("knjo-m-templates",JSON.stringify(a))}
$("save-template").addEventListener("click",()=>{
  const a=saved(), s=getState();s.id=crypto.randomUUID?.()||String(Date.now());s.name=s.headline||"Plantilla sin título";a.unshift(s);writeSaved(a);$("message").textContent="Plantilla guardada en este navegador.";renderSaved();
});
function renderSaved(){
 const a=saved();$("saved-count").textContent=`${a.length} elemento${a.length===1?"":"s"}`;
 const list=$("saved-list");list.innerHTML="";
 if(!a.length){list.innerHTML='<p class="empty-state">Todavía no hay plantillas guardadas.</p>';return}
 a.forEach(s=>{const row=document.createElement("div");row.className="saved-item";const info=document.createElement("div");const title=document.createElement("strong");title.textContent=s.name;const meta=document.createElement("small");meta.textContent=`${s.format} · ${new Date(s.createdAt).toLocaleString()}`;info.append(title,meta);const controls=document.createElement("div");const load=document.createElement("button");load.textContent="Abrir";load.style.marginRight="6px";load.addEventListener("click",()=>{loadState(s);document.querySelector('[data-view="studio"]').click()});const del=document.createElement("button");del.textContent="Eliminar";del.addEventListener("click",()=>{writeSaved(saved().filter(x=>x.id!==s.id));renderSaved()});controls.append(load,del);row.append(info,controls);list.append(row)});
}
document.querySelectorAll("[data-preset]").forEach(btn=>btn.addEventListener("click",()=>{
 const p=btn.dataset.preset;
 if(p==="premium"){$("style").value="dark";$("accent").value="#35d6c5";$("headline").value="HECHO PARA DESTACAR";$("subline").value="Calidad, confianza y rendimiento en cada detalle."}
 if(p==="clean"){$("style").value="light";$("accent").value="#087a6e";$("headline").value="MENOS RUIDO. MÁS IMPACTO."; $("subline").value="Diseño claro. Mensaje directo. Una marca consistente."}
 if(p==="impact"){$("style").value="bold";$("accent").value="#d8ff47";$("headline").value="QUE SE NOTE."; $("subline").value="Una campaña visual pensada para destacar."}
 updatePreview();document.querySelector('[data-view="studio"]').click();
}));
$("media-upload").addEventListener("change",e=>{const f=e.target.files?.[0];$("media-info").textContent=f?`${f.name} · ${(f.size/1024/1024).toFixed(2)} MB · ${f.type||"tipo desconocido"}`:"Ningún archivo seleccionado";});
$("prepare-enhance").addEventListener("click",()=>{
 const f=$("media-upload").files?.[0];
 $("enhance-message").textContent=f?`Solicitud preparada para "${f.name}". La mejora real requiere conectar y probar un motor de procesamiento; el archivo no se ha modificado.`:"Primero selecciona una imagen o video. No se ha ejecutado ningún procesamiento.";
});
$("reset").addEventListener("click",()=>{
 $("brand-name").value="TU MARCA";$("headline").value="HECHO PARA DESTACAR";$("subline").value="Calidad, confianza y rendimiento en cada detalle.";$("accent").value="#35d6c5";$("style").value="dark";$("format").value="story";$("image-upload").value="";$("preview-image").hidden=true;$("preview-image").removeAttribute("src");$("product-placeholder").hidden=false;$("message").textContent="Vista previa restablecida.";updatePreview();
});
$("export").addEventListener("click",async()=>{
 const card=$("ad-card");const rect=card.getBoundingClientRect();const scale=2;const canvas=document.createElement("canvas");canvas.width=Math.round(rect.width*scale);canvas.height=Math.round(rect.height*scale);const c=canvas.getContext("2d");
 const style=getComputedStyle(card);c.scale(scale,scale);c.fillStyle=style.backgroundColor;c.fillRect(0,0,rect.width,rect.height);
 const accent=$("accent").value, light=$("style").value==="light", bold=$("style").value==="bold";c.fillStyle=light?"#131922":bold?"#141b0b":"#f4f7fa";c.strokeStyle=accent;c.lineWidth=1;c.beginPath();c.arc(34,32,13,0,Math.PI*2);c.stroke();c.font="bold 10px Manrope, sans-serif";c.fillStyle=accent;c.fillText("KΩ",24,35);
 c.fillStyle=light?"#131922":bold?"#141b0b":"#f4f7fa";c.font="500 8px monospace";c.fillText(($("brand-name").value||"TU MARCA").toUpperCase().slice(0,26),57,35);
 c.fillStyle=accent;c.font="8px monospace";c.fillText("NUEVA CAMPAÑA / 2026",20,rect.height*.34);
 const words=($("headline").value||"HECHO PARA DESTACAR").toUpperCase().split(/\s+/);c.fillStyle=light?"#131922":bold?"#141b0b":"#f4f7fa";c.font="800 27px Manrope, sans-serif";let y=rect.height*.42,line="";
 for(const word of words){if((line+" "+word).trim().length>15){c.fillText(line,20,y);y+=30;line=word}else line=(line+" "+word).trim()}if(line)c.fillText(line,20,y);
 c.font="10px Manrope, sans-serif";c.fillStyle=light?"#26312e":bold?"#263018":"#c7d0dc";const sub=$("subline").value;const chunks=sub.match(/.{1,37}(\s|$)/g)||[sub];chunks.slice(0,3).forEach((t,i)=>c.fillText(t.trim(),20,y+23+i*14));
 const img=$("preview-image");if(!img.hidden&&img.complete&&img.naturalWidth){try{const maxW=rect.width-40,maxH=rect.height*.27,ratio=Math.min(maxW/img.naturalWidth,maxH/img.naturalHeight),w=img.naturalWidth*ratio,h=img.naturalHeight*ratio;c.drawImage(img,(rect.width-w)/2,rect.height*.61,w,h)}catch{}}
 c.strokeStyle=accent;c.beginPath();c.moveTo(20,rect.height-30);c.lineTo(rect.width-20,rect.height-30);c.stroke();c.fillStyle=light?"#58635f":bold?"#384322":"#8995a5";c.font="7px monospace";c.fillText("DISEÑO REUTILIZABLE",20,rect.height-15);c.fillText("KNJO M",rect.width-55,rect.height-15);
 const a=document.createElement("a");a.download="knjo-m-flyer-preview.png";a.href=canvas.toDataURL("image/png");a.click();$("message").textContent="PNG exportado como vista previa. Revisa tipografía y composición antes de usarlo comercialmente.";
});
updatePreview();renderSaved();