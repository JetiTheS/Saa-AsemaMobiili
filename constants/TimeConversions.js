
//Saadun aika rimpsun rakentelu + muunto milli sekunteksi + aika-alue korjaus
function timeConvert(timestamp, weatherForecast) {
    timestamp += weatherForecast?.city?.timezone
    const date = new Date(timestamp * 1000)

    return formatDate(date)
}
export { timeConvert }

//Päivän saanti ja rakentaminen listaa varten
function dayConvert(timestamp, weatherForecast) {
    timestamp += weatherForecast?.city?.timezone
    const date = new Date(timestamp * 1000)
    let day = date.getUTCDay()
    const days = ["SU", "MA", "TI", "KE", "TO", "PE", "LA"]
    return days[day]
}
export { dayConvert }

function formatDate(date) {
    if (typeof date === "string") { //Jos string muuttaa ensin Dateksti
        date = new Date(date)
    }
    let hours = date.getHours()
    let minutes = date.getMinutes()

    if (date.getHours() < 10) {
        hours = "0" + date.getHours()
    }
    if (date.getMinutes() < 10) {
        minutes = "0" + date.getMinutes()
    }
    return hours + ":" + minutes
}
export { formatDate }