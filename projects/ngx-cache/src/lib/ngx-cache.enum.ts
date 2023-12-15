export enum NgxCacheEnum {
    sessionstorage = 'sessionstorage',
    localstorage = 'localstorage',
    cookie = 'cookie'
}

export namespace NgxCacheEnum {
    export function set(key: string, value: string, type: NgxCacheEnum, ttl: number = 0) {
        switch (type) {
            case NgxCacheEnum.sessionstorage:
                sessionStorage.setItem(key, value)
                sessionStorage.setItem(key + "-cas", new Date().getTime().toString())
                break;
            case NgxCacheEnum.localstorage:
                localStorage.setItem(key, value)
                localStorage.setItem(key + "-cas", new Date().getTime().toString())
                break;
            case NgxCacheEnum.cookie:
                setCookie(key, value, ttl)
                break;
            default:
                sessionStorage.setItem(key, value)
                sessionStorage.setItem(key + "-cas", new Date().getTime().toString())
                break;
        }
    }

    export function get(key: string, type: NgxCacheEnum) {
        switch (type) {
            case NgxCacheEnum.sessionstorage:
                return sessionStorage.getItem(key)
            case NgxCacheEnum.localstorage:
                return localStorage.getItem(key)
            case NgxCacheEnum.cookie:
                return getCookie(key)
            default:
                return sessionStorage.getItem(key)
        }
    }

    export function remove(key: string, type: NgxCacheEnum) {
        switch (type) {
            case NgxCacheEnum.sessionstorage:
                sessionStorage.removeItem(key)
                sessionStorage.removeItem(key + "-cas")
                break;
            case NgxCacheEnum.localstorage:
                localStorage.removeItem(key)
                localStorage.removeItem(key + "-cas")
                break;
            case NgxCacheEnum.cookie:
                break;
            default:
                sessionStorage.removeItem(key)
                sessionStorage.removeItem(key + "-cas")
                break;
        }
    }
}

function setCookie(key: string, value: string, ttl: number = 0) {
    let expires = "";
    if (ttl) {
        let date = new Date();
        date.setTime(date.getTime() + ttl * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = key + "=" + (value || "") + expires + "; path=/";
}

function getCookie(key: string) {
    let nameEQ = key + "=";
    let ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return undefined;
}