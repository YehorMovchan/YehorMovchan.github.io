var allData;

function getData(){
    $.ajax({
        url:"http://192.168.0.180:8080/api/v1/view/tutoring/price",
        type: "GET",
        success: (data)=>{
            allData=data;
            let subarray = new Array()
            data.forEach(element => {
                if(!subarray.includes(element.subjectId)){
                    let subject = document.createElement("option")
                    subject.value=element.subjectId
                    subject.innerText = element.subject
                    
                    document.getElementById("subject").appendChild(subject)
                    
                    subarray.push(element.subjectId)
                }
                
            });
            setTimeout(()=>{
                changeSubject();
            }, 200)
        }
    })

}

function changeSubject(){
    document.getElementById("teacher").innerHTML="";
    let subjectId = document.getElementById("subject").value
    allData.forEach(element => {
        if(element.subjectId==subjectId){
            let teacher = document.createElement("option")
            teacher.value=element.teacherId
            teacher.innerText = element.teacher
            document.getElementById("teacher").appendChild(teacher)
        }
    });
}

function getSchedule(){            // Розібратися з цією функцією (переписати за потреби)
    document.getElementById("schedule").innerHTML="";
    for(let i=0; i<14; i++){
        let newDate = new Date(new Date())
        newDate.setDate(new Date().getDate()+i)
        $.ajax({
            url: "http://192.168.0.180:8080/api/v1/teachers/schedule/"+document.getElementById("teacher").value+"/"+ newDate.getTime(),
            type: "GET",
            success:(data)=>{
                let dt = document.createElement("dt");
                dt.innerText=newDate;    // Зробити цю дату через getFormattedDate()
                let dd = document.createElement("dd");
                let booked = new Array();
                for(let j=0; j<data.length; j++){
                    booked.push(j[3])
                }
                for(let j=0; j<10; j++){
                    let hour = j+8;
                    if(!booked.includes(j)){
                        dd.innerHTML=dd.innerHTML+"<br>"+hour
                    }
                }
                document.getElementById("schedule").appendChild(dt)
                document.getElementById("schedule").appendChild(dd)
            }
        })
    }
}