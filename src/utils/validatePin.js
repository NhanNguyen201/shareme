export default function Valdate(pin){
    const errors = {}
    if(pin.title === "") errors.title = "You should give it a title"
    if(pin.asset === "") errors.asset = "You should choose an image"
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}