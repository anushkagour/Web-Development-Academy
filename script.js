
document.querySelectorAll('.quiz').forEach((quiz)=>{
 const answer=quiz.dataset.answer;
 quiz.querySelectorAll('button[data-choice]').forEach(btn=>{
  btn.addEventListener('click',()=>{
   const out=quiz.querySelector('.feedback');
   if(btn.dataset.choice===answer){out.textContent='Correct! Well done.';out.style.color='#16836f';}
   else{out.textContent='Not quite. Review the section and try again.';out.style.color='#bd5a36';}
  });
 });
});
document.querySelectorAll('.progress').forEach(p=>{
 const bar=p.querySelector('span'); if(bar) bar.style.width='100%';
});
