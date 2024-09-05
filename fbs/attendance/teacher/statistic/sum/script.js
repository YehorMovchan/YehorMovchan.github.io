var tableHeaderStatistic="<tr>"+
            "<th>Вчитель</th>"+
            "<th>Ставка</th>"+
            "<th>Кількість годин</th>"+
            "<th>Зароблена сума</th>"+
            "<th>Кількість додаткових годин</th>"+
            "<th>Зароблена сума з додаткових годин</th>"+
            "<th>Загальна сума</th>"
        "</tr>"


function getData(){
    document.getElementById("table").innerHTML=tableHeaderStatistic
    $.ajax({
        url:"http://192.168.0.180:8080/api/v1/view/attendance/teachers/statistic/start=" + new Date(document.getElementById("start").value).getTime()+ "&end="+new Date(document.getElementById("end").value).getTime(),
        type: "GET",
        success: (data)=>{
            console.log(data)
            data.forEach(element => {
                let tr = document.createElement("tr")
                let td = new Array(4);
                for(let i=0; i<7; i++){
                    td[i]=document.createElement("td");
                    td[i].innerText=element[i];
                }

                for(let i=0; i<7; i++){
                    tr.appendChild(td[i]);
                }
                document.getElementById("table").appendChild(tr);
            });
        }
    })
}
