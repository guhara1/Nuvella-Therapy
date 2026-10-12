(function(){
  var f1=document.getElementById('f1'),f2=document.getElementById('f2'),
      f3=document.getElementById('f3'),go=document.getElementById('fgo');
  if(!f1||!f2||!f3||!go)return;
  var D=null,cur=[];
  function opt(sel,rows,head){
    sel.innerHTML='';
    var o=document.createElement('option');o.value='';o.textContent=head;sel.appendChild(o);
    rows.forEach(function(r){var e=document.createElement('option');
      e.value=r.s;e.textContent=r.n;sel.appendChild(e);});
    sel.disabled=rows.length===0;
  }
  function load(cb){
    if(D)return cb();
    fetch('/regions.json').then(function(r){return r.json();}).then(function(j){D=j;cb();})
      .catch(function(){go.textContent='지역 목록을 불러오지 못했습니다';});
  }
  f1.addEventListener('change',function(){
    var v=f1.value;
    opt(f3,[],'구 전체 보기');f3.disabled=true;
    if(!v){opt(f2,[],'먼저 시·도를 고르세요');return;}
    load(function(){cur=D[v]||[];opt(f2,cur,'구·시·군을 고르세요');});
  });
  f2.addEventListener('change',function(){
    var g=cur.filter(function(x){return x.s===f2.value;})[0];
    opt(f3,g?g.d:[],'구 전체 보기');
  });
  go.addEventListener('click',function(){
    if(f3.value&&f2.value){location.href='/massage/'+f2.value+'/'+f3.value+'/';return;}
    if(f2.value){location.href='/massage/'+f2.value+'/';return;}
    if(f1.value){location.href='/massage/'+f1.value+'/';return;}
    f1.focus();
  });
})();