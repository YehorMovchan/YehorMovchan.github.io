function view(){
    $('#behind').css('display', 'block')
}
function cl(){
    $('#wall').empty();
    main()
    $('#g').css('left', 0+'px');
    $('#g').css('top', 0+'px');
    x_sq=0;
    y_sq=0;
    sq=[x_sq, y_sq];
    $('#behind').css('display', 'none');
}
function reload(){
    rad=document.getElementsByName('size');
        for (var i=0;i<rad.length; i++) {
            if (rad[i].checked) {
                a=i
            }
        }
    switch (a) {
        case 0: size=5; break;
        case 1: size=10; break;
        case 2: size=15; break;
        case 3: size=20; break;
        case 4: size=30; break;
        default: size=10; break;
    }
    wid=parseInt($('#main').css('width'))/size;
    cell_count=size;
    $('#g').css('width', wid+'px');
    $('#g').css('height', wid+'px');
    $('#goal').css('width', wid+'px');
    $('#goal').css('height', wid+'px');
    $('#m').css('width', wid+'px');
    $('#m').css('height', wid+'px');
    $('#c').css('width', wid+'px');
    $('#c').css('height', wid+'px');
    $('#goal').css('left', parseInt($('#main').css('width'))-wid+'px');
    $('#goal').css('top', parseInt($('#main').css('width'))-wid+'px');
    cl();
}
size=10;
wid=parseInt($('#main').css('width'))/size;
cell_count=size;
$('#g').css('width', wid+'px');
$('#g').css('height', wid+'px');
$('#goal').css('width', wid+'px');
$('#goal').css('height', wid+'px');
$('#m').css('width', wid+'px');
$('#m').css('height', wid+'px');
$('#c').css('width', wid+'px');
$('#c').css('height', wid+'px');
$('#goal').css('left', parseInt($('#main').css('width'))-wid+'px');
$('#goal').css('top', parseInt($('#main').css('width'))-wid+'px');
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
    /*[1, 2, [3, 4]].equals([1, 2, [3, 2]]) === false;
    [1, "2,3"].equals([1, 2, 3]) === false;
    [1, 2, [3, 4]].equals([1, 2, [3, 4]]) === true;
    [1, 2, 1, 2].equals([1, 2, 1, 2]) === true;*/
}
Array.prototype.delFromMatrix=function(x, y){
    newArray=this[x];
    newArray.splice(y, 1, null);
    this.splice(x, 1, newArray)
}
function getRandomInt(min, max) {
    min = Math.ceil(min); 
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
function compareNumbers(a, b) {
    return a - b;
}
function vertWall(wv){
    for(j=0; j<wv.length; j++){
        for(i=0; i<wv[j].length; i++){
            l=(j+1)*wid;
            t=wv[j][i]*wid;
            div=document.createElement('div');
            div.style.left=l+'px';
            div.style.top=t+'px'; 
            div.style.backgroundColor = 'black';
            div.style.width= '1px';
            div.style.height= wid+'px';
            div.style.position='absolute';
            div.className='w'+ div.style.left+div.style.top+div.style.width;
            div.id='w'+ div.style.left+div.style.top+div.style.width;
            $('.wall').append(div);
        }
    }
    
}
function horWall(wh){
    for(j=0; j<wh.length; j++){
        for(i=0; i<wh[j].length; i++){
            l=wh[j][i]*wid;
            t=(j+1)*wid;
            div=document.createElement('div');
            div.style.left=l+'px';
            div.style.top=t+'px';
            div.style.backgroundColor = 'black';
            div.style.width= wid+'px';
            div.style.height= '1px';
            div.style.position='absolute';
            div.className= div.style.left+div.style.top+div.style.width;
            $('.wall').append(div);
    } 
    }
    
}
function createGrid(){
    wh=[];
    wv=[];
    for(i=0;i<cell_count; i++){
        wh[i]=[];
        for(j=0; j<cell_count; j++){
            wh[i][j]=j;
        }
    }
    for(i=0;i<cell_count; i++){
        wv[i]=[];
        for(j=0; j<cell_count; j++){
            wv[i][j]=j;
        }
    }
}
function move(){
    for(;rand.length!=0;){
        z=rand.length
        r=getRandomInt(0, z);
        switch(rand[r]){
            case 1 : 
                for(i=0; i<cell_count || i<was.length; i++){
                    if(b.equals([i,0]) || [x, y-1].equals(was[i])) {i=0; rand.splice(r,1); break;}  //check possible move
                }
                if(i>=cell_count){  //make move
                    wh.delFromMatrix(y, x);
                    y-=1;
                    b=[x, y];
                    rand=[1, 2, 3, 4];
                    was.push(b);
                    max_length.push(b);
                }
            break;
            case 2 :    
                for(i=0; i<cell_count || i<was.length;i++){
                    if(b.equals([cell_count-1,i]) || [x+1, y].equals(was[i])) {i=0; rand.splice(r,1); break;}  //check possible move
                }
                if(i>=cell_count){  //make move
                    x+=1;
                    wv.delFromMatrix(x, y);
                    b=[x, y];
                    rand=[1, 2, 3, 4];
                    was.push(b);
                    max_length.push(b);
                }
            break;
            case 3 : 
                for(i=0; i<cell_count || i<was.length;i++){
                    if(b.equals([i,cell_count-1]) || [x, y+1].equals(was[i])) {i=0;rand.splice(r,1); break;}  //check possible move
                }
                if(i>=cell_count){  //make move
                    y+=1;
                    b=[x, y];
                    wh.delFromMatrix(y, x);
                    rand=[1, 2, 3, 4];
                    was.push(b);
                    max_length.push(b);
                }
            break;
            case 4 : 
                for(i=0; i<cell_count || i<was.length;i++){
                    if(b.equals([0,i]) || [x-1, y].equals(was[i])) {i=0;rand.splice(r,1); break;}  //check possible move
                }
                if(i>=cell_count){  //make move
                    wv.delFromMatrix(x, y);
                    x-=1;
                    b=[x, y];
                    rand=[1, 2, 3, 4];
                    was.push(b);
                    max_length.push(b);
                }
            break;
        }
    }
}
Array.prototype.filterMatrix = function(){
    filtarray=[];
    for(i=0; i<this.length; i++){
        filtarray.push(this[i].filter(function(e){ return e != null}));
    }
    return filtarray;
}
function main(){
        was=[[0,0]];
        max_length=[[0,0]];
        n_max=max_length.length;
        y=0
        x=0;
        b=[x, y];
        createGrid();
        rand=[1, 2, 3, 4];
        move();
        for(k=2;k<=was.length;){
            n=was.length;
            max_length.shift();
            x=was[n-k][0];
            y=was[n-k][1];
            b=[x, y];
            rand=[1, 2, 3, 4];
            move();
            if(max_length.length>n_max) {n_max=max_length.length; max=max_length[max_length.length-1];};
            if(n==was.length) k++;
            else k=2;
        }
        wvf=wv.filterMatrix();
        wvf.shift();
        whf=wh.filterMatrix();
        whf.shift();
        vertWall(wvf);
        horWall(whf);
        $('#goal').css('left', max[0]*wid+'px');
        $('#goal').css('top', max[1]*wid+'px');
}