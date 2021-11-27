score=[0, 0];
{
function choose(){
     m=10;
     l=10;
     modeInt=document.getElementsByName('mode');
        for (var i=0;i<modeInt.length; i++) {
            if (modeInt[i].checked) {
                a=i;
            }
        }
        if(a==0){
             PvsP();
        }
        else{
               $('.mode').css('display', 'none');
               $('.complexity').css('display', 'flex');
               $('.back').css('display', 'block');
        }
}
function complexity(){
     complexityInt=document.getElementsByName('complexity');
     for (var i=0;i<complexityInt.length; i++) {
         if (complexityInt[i].checked) {
             b=i;
         }
     }
     switch (b){
          case 0: complexity=1.5; break;
          case 1: complexity=1.7; break;
          case 2: complexity=2; break;
          case 3: complexity=3; break
     }
     $('.complexity').css('display', 'none');
     $('.all').css('display', 'block');
     PvsAI();
}
function PvsAI(){
     l=a;
     win1='Congratulations!!! <br> You WIN!!!';
     win2='Sorry <br> You lose!!!';
     winok1='Yippee!'
     winok2='Try again'
     setTimeout(startMoveBall, 500);
     $('.menu').css('display', 'none');
     $('.all').css('display', 'block');
     $('.back').css('display', 'block');
     document.getElementById('player1').innerHTML='You';
     document.getElementById('player2').innerHTML='AI';
     checkDpoublePush=0;
     function moveDown(){
          checkDpoublePush='Down';
          nowPos=parseInt($("#rplayer").css('top'));
          intDown=setInterval(frameDown, 1);
          function frameDown(){
               if(key=='ArrowUp' || nowPos==300){
               clearInterval(intDown);
               }
               else{
               nowPos++;
               $('#rplayer').css('top', nowPos+'px');
               }
          }
     }
     function moveUp(){
          checkDpoublePush='Up';
          nowPos=parseInt($("#rplayer").css('top'));
          intUp=setInterval(frameUp, 1);
          function frameUp(){
               if(key=='ArrowDown' || nowPos==0){
                    clearInterval(intUp);
               }
               else{
                    nowPos--;
                    $('#rplayer').css('top', nowPos+'px');
               }    
          }
     }
     document.onkeyup=function(e){
          key=e.key;
          console.log(key)
          switch (key){
               case 'ArrowDown':if(checkDpoublePush!='Down') moveDown(); break;
               case 'ArrowUp':if(checkDpoublePush!='Up') moveUp(); break;
          }
          
     }
     AIStart=setInterval(AI, 1);
     checkDpoublePush2=0;
     function AI(){
          nowPos2=parseInt($('#rAI').css('top'));
          if(nowPos2+95<startPosBall[1]){keyAI='downAI'}
          else if(nowPos2+5>startPosBall[1]){keyAI='upAI'}
          switch (keyAI){
               case 'downAI':if(checkDpoublePush2!='Down2') moveDown2(); break;
               case 'upAI':if(checkDpoublePush2!='Up2') moveUp2(); break;
          }
          function moveDown2(){
               checkDpoublePush2='Down2';
               intDown2=setInterval(frameDown2, 1);
               function frameDown2(){
                    if(keyAI=='upAI' || nowPos2>=300){
                    clearInterval(intDown2);
                    }
                    else{
                    nowPos2+=complexity;
                    $('#rAI').css('top', nowPos2+'px');
                    }
               }
          }
          function moveUp2(){
               checkDpoublePush2='Up2';
               intUp2=setInterval(frameUp2, 1);
               function frameUp2(){
                    if(keyAI=='downAI' ||  nowPos2<=0){
                         clearInterval(intUp2);
                    }
                    else{
                         nowPos2-=complexity;
                         $('#rAI').css('top', nowPos2+'px');
                    }    
               }
          }
     }
}
function PvsP(){
     win1='Congratulations!!! <br> Player 1 WIN!!!';
     win2='Congratulations!!! <br> Player 2 WIN!!!';
     winok1='Yippee!'
     setTimeout(startMoveBall, 500);
     $('.menu').css('display', 'none');
     $('.all').css('display', 'block');
     $('.back').css('display', 'block');
     document.getElementById('player1').innerHTML='Player 1';
     document.getElementById('player2').innerHTML='Player 2';
     checkDpoublePush=0;
     function moveDown(){
          checkDpoublePush='Down';
          nowPos=parseInt($("#rAI").css('top'));
          intDown=setInterval(frameDown, 1);
          function frameDown(){
               if(key=='ArrowUp' || nowPos==300){
               clearInterval(intDown);
               }
               else{
               nowPos++;
               $('#rAI').css('top', nowPos+'px');
               }
          }
     }
     function moveUp(){
          checkDpoublePush='Up';
          nowPos=parseInt($("#rAI").css('top'));
          intUp=setInterval(frameUp, 1);
          function frameUp(){
               if(key=='ArrowDown' || nowPos==0){
                    clearInterval(intUp);
               }
               else{
                    nowPos--;
                    $('#rAI').css('top', nowPos+'px');
               }    
          }
     }
     checkDpoublePush2=0;
     function moveDown2(){
          checkDpoublePush2='Down2';
          nowPos2=parseInt($("#rplayer").css('top'));
          intDown2=setInterval(frameDown2, 1);
          function frameDown2(){
               if(key=='w' || key=='ц' ||  nowPos2==300){
               clearInterval(intDown2);
               }
               else{
               nowPos2++;
               $('#rplayer').css('top', nowPos2+'px');
               }
          }
     }
     function moveUp2(){
          checkDpoublePush2='Up2';
          nowPos2=parseInt($("#rplayer").css('top'));
          intUp2=setInterval(frameUp2, 1);
          function frameUp2(){
               if(key=='s' || key=='ы' ||  nowPos2==0){
                    clearInterval(intUp2);
               }
               else{
                    nowPos2--;
                    $('#rplayer').css('top', nowPos2+'px');
               }    
          }
     }
     document.onkeyup=function(e){
          key=e.key;
          console.log(key)
          switch (key){
               case 'ArrowDown':if(checkDpoublePush!='Down') moveDown(); break;
               case 'ArrowUp':if(checkDpoublePush!='Up') moveUp(); break;
               case 'ы':
               case 's':if(checkDpoublePush2!='Down2') moveDown2(); break;
               case 'ц':
               case 'w':if(checkDpoublePush2!='Up2') moveUp2(); break;
          }
          
     }
}
}

//ball
{
function startMoveBall(){
     m=1;
     document.getElementById('player').innerHTML=score[0];
     document.getElementById('AI').innerHTML=score[1];
     t=1;
     j=0;
     time=3;
     if(getRandomInt(1, 3)==1){ cosdeg=-getRandomArbitrary(0.3, 0.7)}
     else{ cosdeg=getRandomArbitrary(0.2, 0.8) }
     rad=Math.acos(cosdeg);
     k=Math.tan(rad);
     b=190-290*k;
     yRight=600*k+b;
     yLeft=b;
     xTop=(-b)/k;
     xBottom=(400-b)/k;
     checkFor=false;
     rand=[0, 1, 2, 3];
     for(;checkFor==false;){
          z=getRandomInt(0, rand.length);
          switch (rand[z]){
               case 0: if(yRight>=0 && yRight<=400) {finalPosBall=[590, yRight]; checkFor=true; finalPos='r'} rand.splice(z, 1); break;
               case 1: if(yLeft>=0 && yLeft<=400) {finalPosBall=[10, yLeft]; checkFor=true; finalPos='l'} rand.splice(z, 1); break;
               case 2: if(xTop>=0 && xTop<=600) {finalPosBall=[xTop, 10]; checkFor=true; finalPos='t'} rand.splice(z, 1); break;
               case 3: if(xBottom>=0 && xBottom<=600) {finalPosBall=[xBottom, 390]; checkFor=true; finalPos='b'} rand.splice(z, 1); break;
          }
     }
     oneStep=(finalPosBall[0]-290)/350; 
     startPosBall=[290, 190];
     alfa=Math.atan2(startPosBall[0]-finalPosBall[0], startPosBall[1]-finalPosBall[1])*180/Math.PI;
     gamma=90-Math.atan(19/29)*180/Math.PI;  
     switch(true){                           //find next deg
          case (alfa>0 && alfa<gamma):
               beta=270-alfa;
               break;
          case (alfa>gamma && alfa<90):
               beta=90-alfa; 
               break;
          case (alfa>90 && alfa<180-gamma):
               beta=360-alfa-90; 
               break;
          case (alfa>180-gamma && alfa<180):
               beta=90+180-alfa; 
               break;
          case (alfa<0 && alfa>-gamma):
               beta=270-alfa; 
               break;
          case (alfa<-gamma && alfa>-90):
               beta=180-alfa-90; 
               break;
          case (alfa<-90 && alfa>-180+gamma):
               beta=90-alfa; 
               break;
          case (alfa<-180+gamma && alfa>-180):
               beta=90-180-alfa;
               break;
     }
     $('#ball').css('left', startPosBall[0]+'px');
     $('#ball').css('top', startPosBall[1]+'px');
    moveBallInt=setInterval(startMoveBallAnim, 5);
     function startMoveBallAnim(){
          startPosBall[0]+=oneStep;
          startPosBall[1]=k*startPosBall[0]+b;
          check(oneStep);
          $('#ball').css('left', startPosBall[0]+'px');
          $('#ball').css('top', startPosBall[1]+'px');
          }  
}
function moveBall(){
     j++;
     startPosBall=[parseFloat($('#ball').css('left')), parseFloat($('#ball').css('top'))];
     beta+=getRandomInt(-3, 4);
     if(Math.abs( 90-beta)<=5) {beta=84}
     else if (Math.abs(beta-90)<=5) {beta=96}
     if(Math.abs( 270-beta)<=5) {beta=264}
     else if (Math.abs(beta-270)<=5) {beta=276}
     k=-Math.tan((beta)*Math.PI/180);
     beta=Math.abs(360-beta);
     b=startPosBall[1]-k*startPosBall[0];
     yRight=600*k+b;
     yLeft=b;
     xTop=(-b)/k;
     xBottom=(400-b)/k;
     checkFor=false;
     rand=[0, 1, 2, 3];
     switch (finalPos){
          case 'r': 
               rand.splice(0, 1); 
               if(xTop>=565) {rand.splice(1, 1)} 
               else if(xBottom>=565) {rand.splice(2, 1)};  
          break;
          case 'l': 
          rand.splice(1, 1); 
          if(xTop<=15) {rand.splice(1, 1)} 
          else if(xBottom<=15) {rand.splice(2, 1)};
          break;
          case 't': rand.splice(2, 1); break;
          case 'b': rand.splice(3, 1); break;
     }
     for(;checkFor==false;){
          z=getRandomInt(0, rand.length);
          switch (rand[z]){
               case 0: if(yRight>=0 && yRight<=400) {finalPosBall=[600, yRight]; checkFor=true; finalPos='r'} rand.splice(z, 1); break;
               case 1: if(yLeft>=0 && yLeft<=400) {finalPosBall=[0, yLeft]; checkFor=true; finalPos='l'} rand.splice(z, 1); break;
               case 2: if(xTop>=0 && xTop<=600) {finalPosBall=[xTop, 0]; checkFor=true; finalPos='t'} rand.splice(z, 1); break;
               case 3: if(xBottom>=0 && xBottom<=600) {finalPosBall=[xBottom, 400]; checkFor=true; finalPos='b'} rand.splice(z, 1); break;
          }
     }
     if(finalPosBall[0]-startPosBall[0]>0){
          x=Math.sqrt((0.5/(1+k*k)), 2);
     }
     else { x=-Math.sqrt((0.5/(1+k*k)), 2);}
     if(finalPosBall[1]-startPosBall[1]>0){
          y=Math.sqrt(0.5-x*x, 2);
     }
     else { y=-Math.sqrt(0.5-x*x, 2);}
     moveBallInt=setInterval(moveBallAnim, time);
     function moveBallAnim(){
          for(i=0; i<t; i++){
               startPosBall[0]+=x;
               startPosBall[1]+=y;
               check(x);  
               $('#ball').css('left', startPosBall[0]+'px');
               $('#ball').css('top', startPosBall[1]+'px'); 
          }
          if(j==5){t++; j=0; time++}

          }
}
}

//other
{
function view(){
     clearInterval(moveBallInt);
     if(a==1){
     clearInterval(AIStart);
     }
     $('#behind').css('display', 'block');
}
function cl(){
     score=[0, 0];
     $('#behind').css('display', 'none');
     clearInterval(moveBallInt);
     if(a==0){
          PvsP();
     }
     else{
          PvsAI();
     }
}
function check(x){
     if(startPosBall[0]+x<=15) {
          if(startPosBall[1]+10>parseFloat($('#rplayer').css('top')) && startPosBall[1]+10<parseFloat($('#rplayer').css('top'))+100){
          clearInterval(moveBallInt); finalPos='l'; moveBall()
          }
          else {clearInterval(moveBallInt); score[1]++, m=0; 
               if(score[0]==5) {document.getElementById('win').innerHTML=win1;  view()}
               else if(score[1]==5) {document.getElementById('win').innerHTML=win2; document.getElementById('winok').innerHTML=winok1;  view()}
               else {startMoveBall()}}
     }
     else if(startPosBall[0]+x>=565){
               if(startPosBall[1]+10>parseFloat($('#rAI').css('top')) && startPosBall[1]+10<parseFloat($('#rAI').css('top'))+100){
               clearInterval(moveBallInt); finalPos='r'; moveBall()
               }
               else {clearInterval(moveBallInt); score[0]++, m=0;  
                    if(score[0]==5) {document.getElementById('win').innerHTML=win1;  view()}
                    else if(score[1]==5) {document.getElementById('win').innerHTML=win2; document.getElementById('winok').innerHTML=winok2;  view()}
                    else {startMoveBall()}}}
     else{ switch(finalPos){
          case 't': if(startPosBall[1]<=0) {clearInterval(moveBallInt); moveBall()}; break;
          case 'b': if(startPosBall[1]>=380) {clearInterval(moveBallInt); moveBall()}; break;
          }
     }
}
function backToMenu(){
     if(m==1) {clearInterval(moveBallInt)};
     if(l==1){
          clearInterval(AIStart);
          parseInt($("#rplayer").css('top', '0px'))
          }
     $('input[type="radio"]').prop('checked', false);
     score=[0, 0];
     $('.back').css('display', 'none');
     $('.complexity').css('display', 'none');
     $('.menu').css('display', 'flex');
     $('.mode').css('display', 'flex');
     $('.all').css('display', 'none');
     $('.behind').css('display', 'none');
}
}
