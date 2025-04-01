$(document).ready(function() {
    $(".accordion-header").click(function() {
        $(this).next(".addition-block").slideToggle();
    });
    $(".loader").show();
    $(".request-error").hide();
    $("iframe").each(()=>{
        let iframeDoc = $(this)[0].contentDocument || $(this)[0].contentWindow.document;
        if (iframeDoc) {
            $(iframeDoc.head).append('<style>body { background-color: green; }</style>');
        }
    })
});



const formatDateISO = (date) => {
    const isoString = date.toISOString();
    const formattedDate = isoString.split("T")[0];
    return formattedDate;
};

const todayISO = () =>{
    const today = new Date();
    return formatDateISO(today);
}

function getUserRole(){
    return new Promise((resolve, reject)=>{
        let token = localStorage.getItem('token');
        if(!token){
            resolve(null)
        }
        else{
            let payload = JSON.parse(atob(token.split('.')[1]));
            let username = payload.sub;
            let role
            $.getJSON(`http://localhost:8080/users/${username}`, (user)=>{
                resolve(user.role);
            }).fail((error)=>{
                reject(error);
            })
        }
    })
}