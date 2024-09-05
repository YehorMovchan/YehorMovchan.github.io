var tableHeader="<tr>"+
            "<th>Число</th>"+
            "<th>Прийшов</th>"+
            "<th>Початок роботи</th>"+
            "<th>Кінець роботи</th>"+
            "<th>Пішов</th>"+
            "<th>Додаткові години</th>"+
            "<th>Вид роботи</th>"+
            "<th>Додаткові години 2</th>"+
            "<th>Вид роботи</th>"+
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
}


function getData(){
    document.getElementById("table").innerHTML=tableHeader
    let id = document.getElementById("teacher").value
    $.ajax({
        url:"http://192.168.0.180:8080/api/v1/view/attendance/teachers/" + id,
        type: "GET",
        dataType: 'json',
        success: function(data){
            console.log(data);
            data.forEach(e => {
                let tr = document.createElement("tr");
                let tds = new Array(11);
                for(let i=0; i<11; i++){
                    tds[i]=document.createElement("td")
                }
                tds[0].innerText=e.date;
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