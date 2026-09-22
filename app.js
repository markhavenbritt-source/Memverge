const menu=document.querySelector('.menu-button');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.querySelector('#navigation').classList.toggle('is-open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){menu.click();menu.focus();}});
const dialog=document.querySelector('#preview-dialog');
document.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#dialog-copy').textContent=button.dataset.preview;dialog.showModal();}));
document.querySelectorAll('[data-carousel]').forEach(section=>{
  const track=section.querySelector('.cards'),dots=[...section.querySelectorAll('[data-slide]')];
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  function go(index){track.scrollTo({left:track.children[index].offsetLeft-track.children[0].offsetLeft,behavior:reduced.matches?'instant':'smooth'});}
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>go(i)));
  track.addEventListener('scroll',()=>{const width=track.children[0].getBoundingClientRect().width+20;const active=Math.min(2,Math.max(0,Math.round(track.scrollLeft/width)));dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===active)));},{passive:true});
  track.addEventListener('keydown',event=>{if(!['ArrowRight','ArrowLeft'].includes(event.key)||window.innerWidth>700)return;event.preventDefault();const current=Math.round(track.scrollLeft/(track.children[0].getBoundingClientRect().width+20));go((current+(event.key==='ArrowRight'?1:2))%3);});
  section.querySelector('[data-expand]').addEventListener('click',()=>{const expanded=track.classList.toggle('is-expanded');section.querySelector('[data-expand]').textContent=expanded?'Show carousel →':`View all ${section.id==='users'?'guides':'updates'} →`;if(window.innerWidth>700)track.focus();});
});
const filterForm=document.querySelector('.job-filters');
if(filterForm){
  const search=document.querySelector('#job-search'),team=document.querySelector('#job-team'),location=document.querySelector('#job-location');
  function filterJobs(){let count=0;const query=search.value.trim().toLowerCase();document.querySelectorAll('.job-row').forEach(row=>{const matches=row.textContent.toLowerCase().includes(query)&&(!team.value||row.dataset.team===team.value)&&(!location.value||row.dataset.location===location.value);row.hidden=!matches;if(matches)count++;});document.querySelector('#job-count').textContent=`${count} matching ${count===1?'role':'roles'}`;document.querySelector('.empty-jobs').hidden=count!==0;}
  filterForm.addEventListener('submit',e=>e.preventDefault());filterForm.addEventListener('input',filterJobs);filterForm.addEventListener('change',filterJobs);document.querySelector('#reset-jobs').addEventListener('click',()=>{filterForm.reset();filterJobs();search.focus();});
}
