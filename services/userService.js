
export const formatNumber = (number) => {
    let phone
    if (number[0] === "0") {
        phone = number.slice(1)
    } else {
        phone = number
    }
    return `+234${phone}`    

}