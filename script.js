/* ===== Scale khung 420px theo màn hình ===== */
var DESIGN_W=420, P1_H=683;
var stage=document.getElementById('stage'), zoom=document.getElementById('zoom'),
    p1=document.getElementById('p1');
var pages=document.querySelectorAll('.page');
function fit(){
  try{
    var vw=document.documentElement.clientWidth, vh=window.innerHeight;
    var s=(vw>760)?Math.min(vh*0.95/P1_H,1.5):(vw/DESIGN_W);
    stage.style.transform='scale('+s+')';
    var total=0;
    for(var i=0;i<pages.length;i++)total+=pages[i].offsetHeight;
    zoom.style.width=(DESIGN_W*s)+'px';
    zoom.style.height=(total*s)+'px';
  }catch(e){}
}
addEventListener('resize',fit); addEventListener('orientationchange',fit);
addEventListener('load',fit);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
fit();

/* ===== Ảnh bìa (trang 1) ===== */
var cover=document.getElementById('cover'), fileCover=document.getElementById('fileCover');
cover.src="1.jpg";
cover.addEventListener('load',function(){cover.classList.add('ready');fit();});
cover.addEventListener('error',function(){p1.classList.add('nocover');});
fileCover.addEventListener('change',function(e){
  var f=e.target.files&&e.target.files[0];if(!f)return;
  var r=new FileReader();r.onload=function(ev){cover.src=ev.target.result;p1.classList.remove('nocover');};r.readAsDataURL(f);
});


/* Ruy băng PNG — nếu file lỗi thì fallback ruy băng CSS có tên */
var ribbonImg=document.getElementById('ribbonImg'),ribbonFb=document.getElementById('ribbonFb');
ribbonImg.addEventListener('error',function(){ribbonImg.style.display='none';ribbonFb.style.display='block';});

/* ===== "Gửi đến" ===== */
var guden=document.getElementById('guden'),ten=document.getElementById('ten');
function askRecipient(){
  var n=prompt('Nhập tên người nhận:', ten.style.display==='block'?ten.textContent:'');
  if(n===null)return;
  if(n.trim()===''){ten.style.display='none';}
  else{ten.textContent=n.trim();ten.style.display='block';}
}
guden.addEventListener('click',function(e){e.stopPropagation();askRecipient();});
ten.addEventListener('click',function(e){e.stopPropagation();askRecipient();});

/* ===== Ngày trang 1 — sửa xong tự cập nhật lịch + countdown ===== */
var dateEl=document.getElementById('date');
dateEl.addEventListener('click',function(e){
  e.stopPropagation();
  var d=prompt('Nhập ngày tốt nghiệp (VD: 22.11.2026):',dateEl.textContent);
  if(d&&d.trim()){dateEl.textContent=d.trim();buildCalendar();fit();}
});

/* ===== 2 ảnh polaroid trang 2 ===== */
function wirePolaroid(polId){
  var pol=document.getElementById(polId),
      img=pol.querySelector('img'),ph=pol.querySelector('.ph');
  img.addEventListener('load',function(){img.style.display='block';ph.classList.add('filled');fit();});
  if(img.complete){img.style.display='block';ph.classList.add('filled');}
}
wirePolaroid('pol1');
wirePolaroid('pol2');

/* ===== Ảnh trường trang 3 ===== */
var campus=document.getElementById('campus'),campusImg=document.getElementById('campusImg');
campusImg.addEventListener('load',function(){campusImg.style.display='block';campus.classList.add('filled');fit();});
if(campusImg.complete){campusImg.style.display='block';campus.classList.add('filled');}

/* ===== LỊCH trang 3 — tự sinh theo ngày ở trang 1 ===== */
function buildCalendar(){
  var cal=document.getElementById('calendar'),head=document.getElementById('calHead');
  var p=dateEl.textContent.trim().split('.');
  var day=parseInt(p[0],10),mon=parseInt(p[1],10),yr=parseInt(p[2],10);
  if(!day||!mon||!yr||mon<1||mon>12||day>31){day=22;mon=11;yr=2026;}
  head.textContent='Th\u00e1ng '+mon;
  var WD=['MON','TUE','WED','THU','FRI','SAT','SUN'];
  var start=(new Date(yr,mon-1,1).getDay()+6)%7;
  var dim=new Date(yr,mon,0).getDate();
  var rows=Math.ceil((start+dim)/7);
  var h='<div class="calrow">';
  for(var i=0;i<7;i++)h+='<div class="calcell calh'+(i>=5?' weekend':'')+'">'+WD[i]+'</div>';
  h+='</div>';
  var HEART='<span class="hrt"><svg viewBox="0 0 48 44"><path d="M24 39 C 10 28, 3 20, 3 12.5 C3 6.5 8 2.5 13.5 2.5 C18 2.5 22 5 24 9 C26 5 30 2.5 34.5 2.5 C40 2.5 45 6.5 45 12.5 C45 20 38 28 24 39 Z"/></svg></span>';
  for(var r=0;r<rows;r++){
    h+='<div class="calrow">';
    for(var c=0;c<7;c++){
      var n=r*7+c-start+1;
      if(n<1||n>dim){h+='<div class="calcell"></div>';}
      else if(n===day){h+='<div class="calcell evday">'+HEART+'<i>'+n+'</i></div>';}
      else{h+='<div class="calcell'+(c>=5?' weekend':'')+'">'+n+'</div>';}
    }
    h+='</div>';
  }
  cal.innerHTML=h;
}
buildCalendar();

/* ===== TRANG 4 — film + bubbles ===== */
var bg4=document.getElementById('bg4'), fileBg4=document.getElementById('fileBg4');
bg4.addEventListener('load',function(){bg4.classList.add('ready');});
bg4.addEventListener('error',function(){bg4.style.display='none';});
fileBg4.addEventListener('change',function(e){
  var f=e.target.files&&e.target.files[0];if(!f)return;
  var r=new FileReader();r.onload=function(ev){bg4.src=ev.target.result;};r.readAsDataURL(f);
});
var p4=document.getElementById('p4');

var filmph=document.getElementById('filmph'),filmImg=document.getElementById('filmImg');
filmImg.addEventListener('load',function(){filmImg.style.display='block';filmph.classList.add('filled');fit();});
if(filmImg.complete){filmImg.style.display='block';filmph.classList.add('filled');}

(function(){
  var L=document.getElementById('holesL'),R=document.getElementById('holesR');
  for(var i=0;i<8;i++){
    L.appendChild(document.createElement('i'));
    R.appendChild(document.createElement('i'));
  }
})();
(function(){
  var box=document.getElementById('bubbles');
  for(var i=0;i<12;i++){
    var b=document.createElement('span');b.className='bub';
    var s=8+Math.random()*20;
    b.style.width=s+'px';b.style.height=s+'px';
    b.style.left=(Math.random()*96)+'%';
    b.style.animationDuration=(9+Math.random()*8).toFixed(2)+'s';
    b.style.animationDelay=(-Math.random()*15).toFixed(2)+'s';
    if(Math.random()<.35)b.style.filter='blur(1px)';
    box.appendChild(b);
  }
})();

/* ===== TRANG 5 — polaroid + countdown ===== */
var pol5=document.getElementById('pol5'),pol5img=document.getElementById('pol5img');
pol5img.addEventListener('load',function(){pol5img.style.display='block';pol5.classList.add('filled');fit();});
if(pol5img.complete){pol5img.style.display='block';pol5.classList.add('filled');}

var cdD=document.getElementById('cdD'),cdH=document.getElementById('cdH'),
    cdM=document.getElementById('cdM'),cdS=document.getElementById('cdS');
function pad(n){return (n<10?'0':'')+n;}
function target(){
  var p=dateEl.textContent.trim().split('.');
  var day=parseInt(p[0],10),mon=parseInt(p[1],10),yr=parseInt(p[2],10);
  if(!day||!mon||!yr||mon<1||mon>12||day>31){day=22;mon=11;yr=2026;}
  var hh=7,mm=0;
  var wb=document.querySelector('#p2 .when b');
  if(wb){
    var t=wb.textContent.trim().split(':');
    var a=parseInt(t[0],10),b=parseInt(t[1],10);
    if(!isNaN(a)&&a>=0&&a<24)hh=a;
    if(!isNaN(b)&&b>=0&&b<60)mm=b;
  }
  return new Date(yr,mon-1,day,hh,mm,0);
}
function tick(){
  try{
    var diff=target()-new Date();
    if(diff<0)diff=0;
    var d=Math.floor(diff/86400000);
    var h=Math.floor(diff%86400000/3600000);
    var m=Math.floor(diff%3600000/60000);
    var s=Math.floor(diff%60000/1000);
    cdD.textContent=pad(d);cdH.textContent=pad(h);
    cdM.textContent=pad(m);cdS.textContent=pad(s);
  }catch(e){}
}
tick();
setInterval(tick,1000);

/* ===== TRANG 6 — 4 ảnh album (mặc định 1.jpg) ===== */
function wireAlbum(photoid){
  var box=document.getElementById(photoid),img=box.querySelector('img');
  img.addEventListener('load',function(){img.style.display='block';box.classList.add('filled');fit();});
  if(img.complete){img.style.display='block';box.classList.add('filled');}
}
wireAlbum('al1');
wireAlbum('al2');
wireAlbum('al3');
wireAlbum('al4');

/* ===== TRANG 7 — ảnh nền phần lời kết + form RSVP ===== */
var endbg=document.getElementById('endbg'), fileEnd=document.getElementById('fileEnd');
endbg.addEventListener('load',function(){endbg.classList.add('ready');});
endbg.addEventListener('error',function(){endbg.style.display='none';});


var rsvpForm=document.getElementById('rsvpForm'),fName=document.getElementById('fName'),
    fEmail=document.getElementById('fEmail'),fWish=document.getElementById('fWish'),fCome=document.getElementById('fCome'),
    fBtn=document.getElementById('fBtn'),fDone=document.getElementById('fDone');
fCome.addEventListener('change',function(){
  if(fCome.value)fCome.classList.add('set');
});
rsvpForm.addEventListener('submit',function(e){
  e.preventDefault();
  if(!fName.value.trim()){
    fName.classList.add('f-err');fName.focus();
    setTimeout(function(){fName.classList.remove('f-err');},1800);
    return;
  }
  if(!fEmail.validity.valid || !fEmail.value.trim()){
    fEmail.classList.add('f-err');fEmail.focus();
    setTimeout(function(){fEmail.classList.remove('f-err');},1800);
    return;
  }
  if(!fCome.value){
    fCome.classList.add('f-err');
    fCome.focus();
    setTimeout(function(){fCome.classList.remove('f-err');},1800);
    return;
  }
  try{
    var list=JSON.parse(localStorage.getItem('rsvp_phuongtrang')||'[]');
    list.push({name:fName.value.trim(),wish:fWish.value.trim(),come:fCome.value||'?',t:Date.now()});
    localStorage.setItem('rsvp_phuongtrang',JSON.stringify(list));
  }catch(err){}
  var attendance={
    yes:'Có, mình sẽ đến',
    no:'Rất tiếc, mình bận mất rồi'
  };
  var googleForm=document.createElement('form');
  googleForm.method='POST';
  googleForm.action='https://docs.google.com/forms/d/e/1FAIpQLSd-EjBVuIksVVluTmYi6a1kBKRjlsbKbW8EXEemjoOiveCU-g/formResponse';
  googleForm.target='rsvpGoogleFrame';
  function addField(name,value){
    var input=document.createElement('input');
    input.type='hidden';input.name=name;input.value=value;
    googleForm.appendChild(input);
  }
  addField('entry.1550607041',fName.value.trim());
  addField('emailAddress',fEmail.value.trim());
  addField('entry.96797833',fWish.value.trim() || '(Không có lời chúc)');
  addField('entry.284726174',attendance[fCome.value]);
  document.body.appendChild(googleForm);
  googleForm.submit();
  googleForm.remove();

  rsvpForm.style.display='none';
  fDone.style.display='block';
  fit();
});

/* ===== Sửa tên tân cử nhân ===== */
var nl1=document.getElementById('nl1'),nl2=document.getElementById('nl2');
var gradNameEl=document.getElementById('gradName');
if(gradNameEl){
  gradNameEl.addEventListener('click',function(e){
    e.stopPropagation();
    var cur=nl1?nl1.textContent:'';
    if(nl2&&nl2.style.display!=='none')cur=(cur+' '+nl2.textContent).trim();
    var n=prompt('Nhập tên tân cử nhân:',cur);
    if(!n||!n.trim())return;
    var w=n.trim().split(/\s+/);
    if(nl2&&w.length>2){
      nl1.textContent=w.slice(0,2).join(' ');
      nl2.textContent=w.slice(2).join(' ');
      nl2.style.display='block';
    }else if(nl1){
      nl1.textContent=n.trim();
      if(nl2)nl2.style.display='none';
    }
  });
}

/* ===== Sửa nội dung các dòng chữ ===== */
function wireEdit(id){
  var el=document.getElementById(id);if(!el)return;
  el.addEventListener('click',function(e){
    e.stopPropagation();
    var n=prompt('Nhập nội dung:',el.textContent);
    if(n&&n.trim())el.textContent=n.trim();
  });
}
wireEdit('t1time');wireEdit('t1label');wireEdit('t2time');wireEdit('t2label');
wireEdit('s4a');wireEdit('s4b');

wireEdit('alGrad');wireEdit('alAlbum');
wireEdit('rsvpIntro');wireEdit('hengap');wireEdit('endmsg');wireEdit('thankyou');wireEdit('fbrand');

/* ===== Hiện dần các trang — có fail-safe ===== */
function revealAll(){
  var els=document.querySelectorAll('.rv');
  for(var i=0;i<els.length;i++)els[i].classList.add('in');
}
try{
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}
      });
    },{threshold:.05});
    var rvs=document.querySelectorAll('.rv');
    for(var i=0;i<rvs.length;i++)io.observe(rvs[i]);
    setTimeout(revealAll,3000);
  }else{revealAll();}
}catch(e){revealAll();}

/* ===== Nhạc nền: phát file music.mp3 ===== */
var musicBtn=document.getElementById('music'),
    bgm=document.getElementById('bgm');
bgm.volume=0.85; /* âm lượng 0.0 → 1.0, chỉnh tại đây */
musicBtn.addEventListener('click',function(){
  if(!bgm.paused){
    bgm.pause();
    musicBtn.classList.remove('on');
    musicBtn.textContent='♪';
  }else{
    try{
      var p=bgm.play();
      if(p&&p.catch)p.catch(function(){});
    }catch(e){}
    musicBtn.classList.add('on');
    musicBtn.textContent='♫';
  }
});
bgm.addEventListener('ended',function(){ /* phòng khi bỏ thuộc tính loop */
  musicBtn.classList.remove('on');
  musicBtn.textContent='♪';
});
