function create(){
    let data = $('form').serializeArray();
    let JSONdata = {}
    JSONdata.name=data[0].value
    JSONdata.grade=data[1].value
    JSONdata.birthday=data[2].value
    JSONdata.motherInfo=data[3].value
    JSONdata.motherPhone=data[4].value
    JSONdata.fatherInfo=data[5].value
    JSONdata.fatherPhone=data[6].value
    JSONdata.birthCertificate="";
    $.ajax({
        url:"http://192.168.0.180:8080/api/v1/tutoring/kids/create",
        cache: false,
        type: "POST",
        contentType: 'application/json',
        data: ja=JSON.stringify(JSONdata),
        success: function(data){console.log("success!");
            window.open("tutoring.html")
        },
        error: function(data) {
            console.log('error');
            console.log(data)
        }
    })
}
