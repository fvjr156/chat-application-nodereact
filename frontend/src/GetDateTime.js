

function GetDateTime(){
    const cd = new Date();
    const year = cd.getFullYear();
    const month = String(cd.getMonth()+1).padStart(2, '0');
    const day = String(cd.getDate()).padStart(2, '0');
    const hour = String(cd.getHours()).padStart(2, '0');
    const minute = String(cd.getMinutes()).padStart(2, '0');
    const second = String(cd.getSeconds()).padStart(2, '0');

    const dtstr = `${year}-${month}-${day}:${hour}:${minute}:${second}`;
    return dtstr;
}

export default GetDateTime;