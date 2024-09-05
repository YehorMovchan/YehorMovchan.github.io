var lesson
var attendance = new Array();

function showKids(el){
    if(el.value==   8){
        for(let i=8; i<12; i++){
            getKids(i);
        }
    }
    else{
        getKids(el.value)
    }
    document.getElementById("kids").innerHTML=""
    
}

function getKids(grade){
    $.ajax({
        url:"http://192.168.0.180:8080/api/v1/kids/grade="+grade,
        type: "GET",
        success: function (data){
            data.forEach(element => {
                let tr = document.createElement("tr");
                let tdName= document.createElement("td") 
                let tdbutton= document.createElement("td")
                tdName.innerText = element.name;
                tdbutton.innerHTML = "<button style=\"color:green;\" value="+element.id+" onclick=\"changeStatus(this)\">Присутній</button>"
                tr.appendChild(tdName);
                tr.appendChild(tdbutton);
                document.getElementById("kids").appendChild(tr);
                $.ajax({
                    url:"http://192.168.0.180:8080/api/v1/schedule/get/lesson/"+lesson+"/grade/"+grade,
                    type: "GET",
                    success:(data)=>{
                        
                        attendance.push({
                            kid: element.id,
                            teacher: data[0].teacher,
                            subject: data[0].subject,
                            date: getFormattedDate(),
                            present:true})
                    }
                })
                
             });
             console.log(attendance)
        }
    })
}

function getFormattedDate(){
    let date = new Date();
    let day = date.getDate() <10 ? "0"+date.getDate() : date.getDate(); 
    let month = date.getMonth()+1 <10 ? "0"+(date.getMonth()+1) : date.getMonth()+1; 
    let year = date.getFullYear();


    return `${year}-${month}-${day}`
}

function setLesson(el){
    lesson=el.value;
    document.getElementById("lesson").innerText=lesson
}

function getTeacherAndSubject(){
    $.ajax({
        url:"http://192.168.0.180:8080/api/v1/schedule/get/lesson/"+lesson+"/grade/"+grade,
        type: "GET",
        success:(data)=>{
            console.log(data);
        }
    })
}

function sendData(){
    for(let i=0; i<attendance.length; i++){
        $.ajax({
            url:"http://192.168.0.180:8080/api/v1/attendance/subject/create",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(attendance[i]),
            success: ()=>{console.log("success")},
            error: ()=>{console.log("error")}
        })
    }
}

function changeStatus(element){
    let result = attendance.findIndex(obj =>{
        return obj.kid == element.value
    })
    attendance[result].present = !attendance[result].present
    if(attendance[result].present){
        element.innerText = "Присутній";
        element.style.color = "green"
    }
    else{
        element.innerText = "Відсутній";
        element.style.color = "red"
    }
   
    console.log(attendance)
}