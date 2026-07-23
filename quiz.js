function answer(btn, qi, oi, correct){
  const qdiv=document.getElementById('q'+qi);
  if(qdiv.dataset.done) return;
  qdiv.dataset.done='1';
  const opts=qdiv.querySelectorAll('.opt');
  opts[correct].classList.add('correct');
  if(oi!==correct){btn.classList.add('wrong');
    const d=qdiv.dataset.domain||'General';
    window.__missed=window.__missed||{}; window.__missed[d]=(window.__missed[d]||0)+1;}
  qdiv.querySelector('.expl').style.display='block';
  window.__score=(window.__score||0)+(oi===correct?1:0);
  window.__answered=(window.__answered||0)+1;
  const total=document.querySelectorAll('.qcard').length;
  if(window.__answered===total) finish(total);
}
function finish(total){
  const s=document.getElementById('score');
  const pass=window.__score>=total*0.7;
  s.textContent='Your score: '+window.__score+' / '+total+(pass?' — on track.':' — below the 70% bar most exams set.');
  const g=document.getElementById('gaps');
  if(g){
    const missed=Object.entries(window.__missed||{}).sort((a,b)=>b[1]-a[1]);
    let html='';
    if(missed.length){
      html='<strong>Where you lost points:</strong> '+missed.map(m=>m[0].replace(/^Domain \d+:\s*/i,'')+' ('+m[1]+')').join(', ')+'. ';
      html+='The full course has a dedicated chapter, lab and practice-test coverage for each of these.';
    } else {
      html='<strong>Perfect score.</strong> The two full-length timed practice tests in the course are the natural next step.';
    }
    const c=g.dataset.coupon;
    if(c) html+=' Use code <strong>'+c+'</strong> at checkout — the link below applies it automatically.';
    g.innerHTML=html; g.style.display='block';
  }
  s.scrollIntoView({behavior:'smooth'});
}
