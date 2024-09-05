var tableHeader="<tr>"+
            "<th>Вчитель</th>"+
            "<th>Прийшов</th>"+
            "<th>Початок роботи</th>"+
            "<th>Кінець роботи</th>"+
            "<th>Пішов</th>"+
            "<th>Додаткові години</th>"+
            "<th>Вид зайнятості</th>"+
            "<th>Додаткові години 2</th>"+
            "<th>Вид зайнятості</th>"+
            "<th>Перерва</th>"+
            "<th>Примітки</th>"+
        "</tr>"

function getTeachers(){
    $.ajax({
        url:"http://192.168.0.180:8080/api/v1/teachers",
        type: 'GET',
        dataType: 'json',
        success: function(data){
            console.log(data);
            data.forEach(t => {
                let opt = document.createElement("option")
                opt.value=t.id;
                opt.innerText=t.name;
                document.getElementById("teacher").appendChild(opt);
            });
        }
    })
    setTimeout(()=>{updateTable()}, 1000)
}

function setStart(){
    let date = new Date().setHours(document.getElementById("start").value.split(":")[0], document.getElementById("start").value.split(":")[1], 0);
    $.ajax({
        url: "http://192.168.0.180:8080/api/v1/attendance/teachers/set/start/"+document.getElementById("teacher").value+"&"+date,
        type: "POST",
        success: function(){
            console.log("success!")
        }
    })
    setTimeout(()=>{updateTable()}, 1000)
}

function setEnd(){
    let date = new Date().setHours(document.getElementById("end").value.split(":")[0], document.getElementById("end").value.split(":")[1], 0);
    $.ajax({
        url: "http://192.168.0.180:8080/api/v1/attendance/teachers/set/end/"+document.getElementById("teacher").value+"&"+date,
        type: "POST",
        success: function(){
            console.log("success!")
        }
    })
    setTimeout(()=>{updateTable()}, 1000)
}

function setArrive(){
    let date=new Date().getTime();
    $.ajax({
        url: "http://192.168.0.180:8080/api/v1/attendance/teachers/set/arrive/"+document.getElementById("teacher").value + "&"+ date,
        type: "POST",
        success: function(){
            console.log("success!")
        }
    })
    setTimeout(()=>{updateTable()}, 1000)
}

function setLeave(){
    let date=new Date().getTime();
    $.ajax({
        url: "http://192.168.0.180:8080/api/v1/attendance/teachers/set/leave/"+document.getElementById("teacher").value+ "&"+ date,
        type: "POST",
        success: function(){
            console.log("success!")
        }
    })
    setTimeout(()=>{updateTable()}, 1000)
}

function setAddition(){
    var time = document.getElementById("addition").value
    let category = document.getElementById("category").value
    $.ajax({
        url: "http://192.168.0.180:8080/api/v1/attendance/teachers/set/addition/"+document.getElementById("teacher").value+"&"+time+"&"+category,
        type: "POST",
        success: function(){
            console.log("success!")
        }
    })
    setTimeout(()=>{updateTable()}, 1000)
}

function setAddition2(){
    var time = document.getElementById("addition2").value
    let category = document.getElementById("category2").value
    $.ajax({
        url: "http://192.168.0.180:8080/api/v1/attendance/teachers/set/addition2/"+document.getElementById("teacher").value+"&"+time+"&"+category,
        type: "POST",
        success: function(){
            console.log("success!")
        }
    })
    setTimeout(()=>{updateTable()}, 1000)
}


function setBreaktime(){
    var time = document.getElementById("breaktime").value
    $.ajax({
        url: "http://192.168.0.180:8080/api/v1/attendance/teachers/set/breaktime/"+document.getElementById("teacher").value+"&"+time,
        type: "POST",
        success: function(){
            console.log("success!")
        }
    })
    setTimeout(()=>{updateTable()}, 1000)
}

function setInfo(){
    let str = document.getElementById("info").value;
    console.log(info);
    $.ajax({
        url: "http://192.168.0.180:8080/api/v1/attendance/teachers/set/info/"+document.getElementById("teacher").value,
        type: "POST",
        contentType: 'application/json',
        data:JSON.stringify({
            info: str,
        }),
        success: function(){
            console.log("success!")
        }
    })
    setTimeout(()=>{updateTable()}, 1000)
}

function updateTable(){
    document.getElementById("table").innerHTML=tableHeader;
    $.ajax({
        url:"http://192.168.0.180:8080/api/v1/view/attendance/teachers/day",
        type: 'GET',
        dataType: 'json',
        success: function(data){
            console.log(data);
            data.forEach(e => {
                let tr = document.createElement("tr");
                let tds = new Array(11);
                for(let i=0; i<11; i++){
                    tds[i]=document.createElement("td")
                }
                tds[0].innerText=e.name;
                tds[1].innerText=e.arrive;
                tds[2].innerText=e.start;
                tds[3].innerText=e.end;
                tds[4].innerText=e.leave;
                tds[5].innerText=e.addition;
                tds[6].innerText=e.category;
                tds[7].innerText=e.addition2;
                tds[8].innerText=e.category2;
                tds[9].innerText=e.breaktime;
                tds[10].innerText=e.info;
                for(let i=0; i<11; i++){
                    tr.appendChild(tds[i]);
                }
                document.getElementById("table").appendChild(tr);
            });
        }
    })
}