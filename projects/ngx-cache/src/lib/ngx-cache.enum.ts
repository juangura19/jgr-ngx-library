export enum NgxCacheEnum {
    sessionstorage = 'sessionstorage',
    localstorage = 'localstorage'
}

export namespace NgxCacheEnum {
    export function set(key: string, value: string, type: NgxCacheEnum) {
        switch (type) {
            case NgxCacheEnum.sessionstorage:
                sessionStorage.setItem(key, value)
                break;
            case NgxCacheEnum.localstorage:
                localStorage.setItem(key, value)
                break;
            default:
                sessionStorage.setItem(key, value)
                break;
        }
    }

    export function get(key: string, type: NgxCacheEnum) {
        switch (type) {
            case NgxCacheEnum.sessionstorage:
                return sessionStorage.getItem(key)
            case NgxCacheEnum.localstorage:
                return localStorage.getItem(key)
            default:
                return sessionStorage.getItem(key)
        }
    }

    export function remove(key: string, type: NgxCacheEnum) {
        switch (type) {
            case NgxCacheEnum.sessionstorage:
                return sessionStorage.removeItem(key)
            case NgxCacheEnum.localstorage:
                return localStorage.removeItem(key)
            default:
                return sessionStorage.removeItem(key)
        }
    }
}