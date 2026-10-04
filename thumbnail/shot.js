const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('file://'+process.cwd()+'/thumb.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:'thumbnail.png'});await b.close();})();
