var lesson
var attendance = new Array();

tableHeader = "<tr><th>Діти</th></tr>"

function showKids(el){
    if(el.value==   8){
        for(let i=8; i<12; i++){
            getKids(i);
        }
    }
    else{
        getKids(el.value)
    }
    document.getElementById("kids").innerHTML=tableHeader
    
}

function getKids(grade){
    $.ajax({
        url:"http://192.168.0.180:8080/api/v1/kids/grade="+grade,
        type: "GET",
        success: function (data){
            data.forEach(element => {
                let tr = document.createElement("tr");
                let tdName= document.createElement("td") 
                tdName.addEventListener("click", ()=>{getAttendance(element.id)})
                tdName.style.cursor= "pointer"
                tdName.innerText = element.name;
                tr.appendChild(tdName);
                document.getElementById("kids").appendChild(tr);
             });
             console.log(attendance)
        }
    })
}

function getAttendance(id){
    $.ajax({
        url: "http://192.168.0.180:8080/api/v1/attendance/subject/kid/"+id+"/"+getFormattedDate(document.getElementById("from").value)+"/"+getFormattedDate(document.getElementById("to").value),
        type: "GET",
        success:(data)=>{
            setKidAttendance(data);
        }
    })
}

function getFormattedDate(dateStr){
    let date = new Date(dateStr)
    let day = date.getDate() <10 ? "0"+date.getDate() : date.getDate(); 
    let month = date.getMonth()+1 <10 ? "0"+(date.getMonth()+1) : date.getMonth()+1; 
    let year = date.getFullYear();


    return `${year}-${month}-${day}`
}


function setKidAttendance(data){
    document.getElementById("attendance").innerHTML=""
    document.getElementById("label").innerHTML=data[0][2]
    let sortData = new Array();
    let already = new Array();
    let counter=0;
    for(let i=0; i<data.length; i++){
        if(!already.includes(data[i][0])){
            already[already.length]=(data[i][0])
            sortData[sortData.length] = []
            let s = sortData[sortData.length-1]
            sortData[sortData.length-1][s.length]=data[i];
        }
        else{
            let s = sortData[sortData.length-1]
            sortData[sortData.length-1][s.length]=data[i];
        }
    }
    for(let i=0; i<sortData.length; i++){
        let trh = document.createElement("tr");
        let th = document.createElement("th");
        th.colSpan=4;
        th.innerHTML=sortData[i][0][0];
        trh.appendChild(th);
        document.getElementById("attendance").appendChild(trh)

        for(let j=0; j<sortData[i].length; j++){
            let tr = document.createElement("tr")
            lesson=document.createElement("td");
            lesson.innerHTML=sortData[i][j][7];
            subject=document.createElement("td");
            subject.innerHTML=sortData[i][j][4];
            teacher=document.createElement("td");
            teacher.innerHTML=sortData[i][j][5];
            atten=document.createElement("td");
            atten.innerHTML=sortData[i][j][8] ? "Був" : "Не було";
            tr.appendChild(lesson)
            tr.appendChild(subject)
            tr.appendChild(teacher)
            tr.appendChild(atten)
            document.getElementById("attendance").appendChild(tr)
        }
        
    }
    console.log(sortData)
}