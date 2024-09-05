var tableHeader="<tr>"+
            "<th>Дитина</th>"+
            "<th>Дата народження</th>"+
            "<th>Інформація про мати</th>"+
            "<th>Номер телефону мати</th>"+
            "<th>Інформація про батька</th>"+
            "<th>Номер телефону батька</th>"+
        "</tr>"

var kids;

function getKids(){
    $.ajax({
        url:"http://192.168.0.180:8080/api/v1/tutoring/kids",
        type: 'GET',
        dataType: 'json',
        success: function(data){
            kids =data;
            document.getElementById("table").innerHTML=tableHeader
            console.log(data);
            data.forEach(e => {
                let tr = document.createElement("tr");
                let tds = new Array(6);
                for(let i=0; i<6; i++){
                    tds[i]=document.createElement("td")
                }
                tds[0].innerText=e.name;
                tds[1].innerText=e.birthday;
                tds[2].innerText=e.motherInfo;
                tds[3].innerText=e.motherPhone;
                tds[4].innerText=e.fatherInfo;
                tds[5].innerText=e.fatherPhone;
                for(let i=0; i<6; i++){
                    tr.appendChild(tds[i]);
                }
                document.getElementById("table").appendChild(tr);
            });
        }
    })
}

function findByName(){
    document.getElementById("table").innerHTML=tableHeader
    kids.forEach(e=>{
        if(e.name.includes($("#kid")[0].value)){
            let tr = document.createElement("tr");
            let tds = new Array(6);
            for(let i=0; i<6; i++){
                tds[i]=document.createElement("td")
            }
            tds[0].innerText=e.name;
            tds[1].innerText=e.birthday;
            tds[2].innerText=e.motherInfo;
            tds[3].innerText=e.motherPhone;
            tds[4].innerText=e.fatherInfo;
            tds[5].innerText=e.fatherPhone;
            for(let i=0; i<6; i++){
                tr.appendChild(tds[i]);
            }
            document.getElementById("table").appendChild(tr);
        }
        
    })
}