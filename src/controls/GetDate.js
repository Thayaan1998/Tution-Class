const  GetCurrentDate = (separator='') =>{

    let newDate = new Date()
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}`
    }

    export default GetCurrentDate;