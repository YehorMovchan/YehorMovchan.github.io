function getFormattedDate(dateStr){
    let date = new Date(dateStr);
    let day = date.getDate() <10 ? "0"+date.getDate() : date.getDate(); 
    let month = date.getMonth()+1 <10 ? "0"+(date.getMonth()+1) : date.getMonth()+1; 
    let year = date.getFullYear();
    return `${year}-${month}-${day}`
}