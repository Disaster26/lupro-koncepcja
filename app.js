(function(){
  var hdr=document.getElementById('hdr'),b=document.body,burger=document.getElementById('burger'),nav=document.getElementById('nav');
  var y=document.getElementById('rok'); if(y) y.textContent=new Date().getFullYear();
  function sc(){hdr.classList.toggle('sc',window.scrollY>8)} sc(); window.addEventListener('scroll',sc,{passive:true});
  burger.addEventListener('click',function(){var o=b.classList.toggle('menu-open');burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){b.classList.remove('menu-open');burger.setAttribute('aria-expanded','false')})});
  // aktywna pozycja menu
  var links=[].slice.call(nav.querySelectorAll('a[href^="#"]')),secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var i=secs.indexOf(e.target);links.forEach(function(l,j){l.classList.toggle('on',i===j)})}})},{rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(function(s){s&&io.observe(s)});
  }
  // karuzela: palec, mysz, strzałki, klawiatura
  document.querySelectorAll('[data-car]').forEach(function(c){
    var t=c.querySelector('.car-track'),sl=[].slice.call(t.children),n=c.querySelector('[data-n]'),bar=c.querySelector('[data-bar]');
    function step(){return sl[1]?sl[1].offsetLeft-sl[0].offsetLeft:t.clientWidth}
    function idx(){var max=t.scrollWidth-t.clientWidth;if(t.scrollLeft>=max-4)return sl.length-1;return Math.round(t.scrollLeft/step())}
    function upd(){var i=idx();n.textContent=(i+1)+' / '+sl.length;bar.style.width=((i+1)/sl.length*100)+'%'}
    t.addEventListener('scroll',function(){window.requestAnimationFrame(upd)},{passive:true});
    c.querySelector('[data-prev]').addEventListener('click',function(){t.scrollBy({left:-step(),behavior:'smooth'})});
    c.querySelector('[data-next]').addEventListener('click',function(){t.scrollBy({left:step(),behavior:'smooth'})});
    t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){t.scrollBy({left:step(),behavior:'smooth'});e.preventDefault()}if(e.key==='ArrowLeft'){t.scrollBy({left:-step(),behavior:'smooth'});e.preventDefault()}});
    var down=false,sx=0,sl0=0,moved=false;
    t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl0=t.scrollLeft});
    window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;t.classList.add('drag')}t.scrollLeft=sl0-dx});
    window.addEventListener('pointerup',function(){if(!down)return;down=false;t.classList.remove('drag');if(moved){var i=Math.round(t.scrollLeft/step());t.scrollTo({left:i*step(),behavior:'smooth'})}});
    t.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation()}},true);
    upd();
  });
  // formularz pokazowy
  var f=document.getElementById('form');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();document.getElementById('form-ok').style.display='block'});
    var inp=f.querySelector('input[type=file]'),lab=f.querySelector('[data-file]');
    inp.addEventListener('change',function(){lab.textContent=inp.files.length?inp.files[0].name:'PDF, DWG, JPG'});}
})();
