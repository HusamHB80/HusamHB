(function(){
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>[...c.querySelectorAll(s)];

  const progress=$('#progressBar');
  const updateProgress=()=>{if(!progress)return;const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?(scrollY/max)*100:0}%`};
  addEventListener('scroll',updateProgress,{passive:true}); updateProgress();

  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
  $$('.reveal').forEach(el=>observer.observe(el));

  // Jekyll-inspired terminal typing: the reference uses a command-line presentation on its homepage; here it becomes part of the portfolio identity.
  const lines=$$('#typeConsole .console-line[data-line]');
  lines.forEach((line,i)=>{
    const full=line.textContent.trim();
    line.innerHTML='&gt; ';
    let n=0;
    setTimeout(()=>{
      line.classList.add('revealed');
      const interval=setInterval(()=>{
        line.insertAdjacentText('beforeend',full.slice(full.startsWith('> ')?2:0,n+1).slice(-1));
        n++;
        if(n>=full.replace(/^> /,'').length){clearInterval(interval);const cursor=line.querySelector('.cursor');if(cursor)cursor.remove();}
      },28);
    },850+i*700);
  });

  const typed=$('#typedLine');
  if(typed){
    const text='Editing stories.'; typed.textContent=''; let i=0;
    const type=()=>{if(i<text.length){typed.textContent+=text[i++];setTimeout(type,58)}};
    setTimeout(type,350);
  }

  // Video hover previews.
  $$('.project-media video').forEach(video=>{
    const parent=video.closest('.project-media');
    parent?.addEventListener('mouseenter',()=>video.play().catch(()=>{}));
    parent?.addEventListener('mouseleave',()=>{video.pause();try{video.currentTime=0}catch{}});
  });

  // Archive filters.
  $$('.filter').forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.filter;
    $$('.filter').forEach(b=>b.classList.remove('active')); button.classList.add('active');
    $$('#archiveGrid .project-card').forEach(card=>{
      const show=filter==='All'||card.dataset.category===filter;
      card.classList.toggle('hidden',!show);
    });
  }));

  const sound=$('#soundToggle');
  if(sound){sound.addEventListener('click',()=>{const on=sound.getAttribute('aria-pressed')!=='true';sound.setAttribute('aria-pressed',String(on));sound.querySelector('span').textContent=on?'ON':'OFF';});}
})();
