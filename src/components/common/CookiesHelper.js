export const CookiesHelper=()=> {
    const createCookie = (name, value, days)=> {
        console.log('inside createCookie')
        var expires=""
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        const newCookie=name + "=" + JSON.stringify(value) + expires + "; path=/";
        document.cookie = newCookie
    }
    
    const readCookie = (name)=> {
        console.log('inside readCookie')
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return JSON.parse(c.substring(nameEQ.length, c.length)) ;
        }
        return null;
    }
    
    const eraseCookie = (name)=> {
        createCookie(name, "", -1);
    }
    return {
        eraseCookie,
        readCookie,
        createCookie
    }
    
}
