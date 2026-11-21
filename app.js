let P=[],CATS={},cat="",sort="",$=s=>document.querySelector(s);
const NOON=/^https:\/\/(www\.)?noon\.com\/uae-(en|ar)\/.+/i;
const slug=s=>s.toLowerCase().replace(/\(sample data\)/,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const PH="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="#f2f2f2"/><text x="150" y="155" text-anchor="middle" fill="#c9a227" font-size="22">Curetech</text></svg>');
function csv(t){let r=[],row=[],f="",q=false;for(let i=0;i<t.length;i++){let c=t[i];
 if(q){if(c=='"'&&t[i+1]=='"'){f+='"';i++}else if(c=='"')q=false;else f+=c}
 else if(c=='"')q=true;else if(c==','){row.push(f);f=""}
 else if(c=='\n'||c=='\r'){if(c=='\r'&&t[i+1]=='\n')i++;row.push(f);f="";if(row.join("")!="")r.push(row);row=[]}else f+=c}
 if(f||row.length){row.push(f);r.push(row)}return r}
const price=p=>p.price?"AED "+p.price:"Price on request";
const link=p=>CONFIG.siteUrl+"#/p/"+p.slug;
const wa=(txt)=>"https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(txt);
const orderMsg=p=>`Hello Curetech, I would like to order ${p.name}, SKU ${p.sku}. `+(p.price?`The listed price is AED ${p.price}. Please confirm availability.`:"Please confirm price and availability.")+" "+link(p);
function share(u,t){open("https://wa.me/?text="+encodeURIComponent(t+" "+u),"_blank")}
function copyLink(){navigator.clipboard.writeText(CONFIG.siteUrl).then(()=>alert("Link copied"))}
function check(p){let w=[];if(!p.price||isNaN(p.price))w.push("missing/invalid price");if(!p.img)w.push("missing image");
 if(p.noon&&!NOON.test(p.noon))w.push("Noon link not a valid noon.com/uae-en/ product URL");if(!p.sku)w.push("missing SKU");return w}
function buttons(p){return `<div class="row">${p.noon&&NOON.test(p.noon)?`<a class="btn noon" target="_blank" rel="noopener" href="${esc(p.noon)}">Buy on Noon</a>`:""}
 <a class="btn wa" target="_blank" rel="noopener" href="${wa(orderMsg(p))}">Order via WhatsApp</a>
 <button onclick="share('${link(p)}','${esc(p.name).replace(/'/g,"")} (${p.sku}) - ${price(p)}')">Share</button></div>`}
function card(p){return `<div class="card"><img loading="lazy" src="${esc(p.img||PH)}" onerror="this.src='${PH}'" alt="${esc(p.name)} - ${esc(p.brand)} dental supplies UAE">
 <a class="t" href="#/p/${p.slug}">${esc(p.name)}</a><div class="m">SKU ${esc(p.sku)} · ${esc(p.brand)} · ${esc(p.cat)}</div>
 <div class="m">${esc(p.desc.slice(0,90))}</div><div class="price">${price(p)}</div>
 <div class="${/out/i.test(p.avail)?"out":"in"}">${esc(p.avail||"Ask for availability")}</div>${buttons(p)}</div>`}
function list(){const q=$("#q").value.toLowerCase().trim(),b=$("#brand")?.value||"";
 let l=P.filter(p=>(!cat||p.cat==cat||p.group==cat)&&(!b||p.brand==b)&&(!q||(p.name+p.sku+p.brand+p.cat).toLowerCase().includes(q)));
 if(sort)l.sort((a,c)=>sort=="lo"?(a.price||1e9)-(c.price||1e9):(c.price||0)-(a.price||0));
 $("#grid").innerHTML=l.map(card).join("")||"<p>No products found.</p>"}
function home(){const brands=[...new Set(P.map(p=>p.brand))].sort(),feat=P.filter(p=>p.featured);
 $("#app").innerHTML=`<div class="hero"><h1>Your Trusted Dental & Medical Supplies Partner in UAE</h1>Curetech Medical Equipment Trading LLC</div>
 <div class="bar">${["", ...Object.keys(CATS)].map(c=>`<span class="chip ${c==cat?"on":""}" data-c="${c}">${c||"All"}</span>`).join("")}</div>
 <div class="bar"><select id="sub"><option value="">All sub-categories</option>${(CATS[cat]||[]).map(s=>`<option>${s}</option>`)}</select>
 <select id="brand"><option value="">All brands</option>${brands.map(b=>`<option>${esc(b)}</option>`)}</select>
 <select id="sort"><option value="">Sort</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option></select>
 <span class="chip" id="ft">★ Featured</span></div>
 <div id="grid" class="grid"></div>`;
 document.querySelectorAll(".chip[data-c]").forEach(e=>e.onclick=()=>{cat=e.dataset.c;home()});
 $("#sub").onchange=e=>{cat=e.target.value||cat;list()};$("#brand").onchange=list;$("#sort").onchange=e=>{sort=e.target.value;list()};
 $("#ft").onclick=()=>{$("#grid").innerHTML=feat.map(card).join("")||"<p>No featured products.</p>"};list()}
function prod(s){const p=P.find(x=>x.slug==s);if(!p)return home();document.title=p.name+" | Curetech Medical UAE";
 $("#app").innerHTML=`<p><a href="#/">← All products</a></p><div class="pg"><img class="pimg" src="${esc(p.img||PH)}" onerror="this.src='${PH}'" alt="${esc(p.name)} - ${esc(p.brand)}">
 <div><h1>${esc(p.name)}</h1><div class="m">SKU ${esc(p.sku)} · Brand ${esc(p.brand)} · ${esc(p.cat)}</div><p>${esc(p.desc)}</p>
 <div class="price">${price(p)}</div><p class="${/out/i.test(p.avail)?"out":"in"}">${esc(p.avail)}</p>${buttons(p)}</div></div>`}
function admin(){$("#app").innerHTML="<h2>Data check</h2>"+P.map(p=>({p,w:check(p)})).filter(x=>x.w.length).map(x=>`<div class="warn"><b>${esc(x.p.name)}</b> (${esc(x.p.sku)}): ${x.w.join(", ")}</div>`).join("")||"<p>All products OK.</p>"}
function route(){const h=location.hash;cat=h.startsWith("#/p/")?cat:cat;
 if(h.startsWith("#/p/"))prod(h.slice(4));else if(h=="#/check")admin();else home()}
$("#q").oninput=()=>{if(location.hash.length>2){location.hash="#/"}else if($("#grid"))list()};
Promise.all([fetch("products.csv").then(r=>r.text()),fetch("categories.json").then(r=>r.json())]).then(([t,c])=>{CATS=c;
 const r=csv(t),h=r.shift().map(x=>x.trim());const g=(row,n)=>(row[h.indexOf(n)]||"").trim();
 P=r.map(w=>{const p={id:g(w,"Product ID"),name:g(w,"Product Name"),sku:g(w,"SKU"),cat:g(w,"Category"),brand:g(w,"Brand"),desc:g(w,"Description"),
  price:g(w,"Price AED"),img:g(w,"Image URL"),noon:g(w,"Noon Product URL"),avail:g(w,"Availability"),featured:/^y/i.test(g(w,"Featured Product"))};
  p.slug=slug(p.name)||p.id;p.group=Object.keys(CATS).find(k=>CATS[k].includes(p.cat))||p.cat;
  if(!CATS[p.group])CATS[p.group]=[];if(!CATS[p.group].includes(p.cat)&&p.group!=p.cat)CATS[p.group].push(p.cat);return p});
 P.forEach(p=>{const w=check(p);if(w.length)console.warn(p.sku,w.join(", "))});
 $("#fab").href=CONFIG.whatsapp?wa("Hello Curetech, I have an enquiry about your dental products."):"#";
 new QRCode($("#qr"),{text:CONFIG.siteUrl,width:140,height:140});route();addEventListener("hashchange",route)});
