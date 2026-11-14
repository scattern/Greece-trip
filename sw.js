const V='gr26-v3',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const CACHEABLE=u=>u.origin===location.origin||u.hostname==='cdnjs.cloudflare.com'||u.hostname==='cdn.jsdelivr.net'||u.hostname==='tessdata.projectnaptha.com';
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||!CACHEABLE(u))return;
  e.respondWith(caches.open(V).then(c=>c.match(e.request,{ignoreSearch:u.origin===location.origin}).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r.ok||r.type==='opaque')c.put(e.request,r.clone());return r}).catch(()=>hit);
    return hit||net;
  })));
});
