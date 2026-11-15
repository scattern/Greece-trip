const V='gr26-v6',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(A.map(u=>fetch(u,{cache:'reload'}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const EXT=u=>u.hostname==='cdnjs.cloudflare.com'||u.hostname==='cdn.jsdelivr.net'||u.hostname==='tessdata.projectnaptha.com';
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET')return;
  if(u.origin===location.origin){
    /* 앱 파일: 인터넷이 되면 항상 최신 버전, 안 되면 저장본 */
    e.respondWith(caches.open(V).then(c=>fetch(r,{cache:'no-cache'}).then(res=>{if(res.ok)c.put(r,res.clone());return res})
      .catch(()=>c.match(r,{ignoreSearch:true}).then(h=>h||c.match('index.html')))));
    return}
  if(EXT(u)){
    /* 사진 인식 라이브러리·언어 파일: 한 번 받으면 저장본 사용 */
    e.respondWith(caches.open(V).then(c=>c.match(r).then(h=>h||fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res}))))}
});
