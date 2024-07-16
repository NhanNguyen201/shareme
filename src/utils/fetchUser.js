export const fetchUser = () => {
    if(localStorage.getItem('shareme-user')) {
        return JSON.parse(localStorage.getItem('shareme-user'))
    } else {
        localStorage.clear()
        return {}

    }
    // localStorage.getItem('shareme-user') ? JSON.parse(localStorage.getItem('shareme-user')) : localStorage.clear()
}
