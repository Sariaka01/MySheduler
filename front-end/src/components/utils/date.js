export function getLocaleDateTime(ISOString) {
    // Extracting year, month, day, hour, min, sec from ISO string to locale string
    let [month, day, year, _, hour, min, sec, amPm] = new Date(ISOString).toLocaleString().split(/[,:\s/]/)
    hour = +hour + (amPm == 'PM' && +hour > 12 ? 12 : 0)
    // console.log(day, month, year, hour)
    // console.log(new Date(year, month - 1, day, hour).toUTCString()) // This should display another date
    /* Month - 1 because they are counted from 0 */
    return {
        year: +year,
        month: month - 1,   // Starts from 0 to 11
        day: +day,
        hour: +hour,
        min: +min,
        sec: +sec,
        week: getWeek(ISOString),
        offset: new Date().getTimezoneOffset()
    }
}

export function getISOString(dateObject) {
    return new Date(dateObject.year, dateObject.month, dateObject.day, dateObject.hour, dateObject.min, dateObject.sec).toISOString()
}

export function getWeek(ISOString) {
    const date = new Date(ISOString)
    // const localDate = getLocaleDateTime(ISOString)
    const firstJanuary = new Date(date.getUTCFullYear(), 0, 1)  // January 1st of the current year
    // console.log(firstJanuary, localDate.offset)
    const days = Math.floor((date - firstJanuary) / (24 * 60 * 60 * 1000))   // Operations on dates works with milliseconds
    // console.log('Week is ' + Math.ceil(days / 7))
    return Math.ceil(days / 7) - (date.getDay() == 0? 1: 0) // To start a week on monday
}


export const VIEWS = {
    year: {
        getList: () => [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        getLabel(i, j, { year }) {
            // i-th day element of j-th month
            console.log(year)
            return `${i}-${j}-${year}`  // i-th day of the j-th month of year year
        },
        rowNumber: 31,
        belongsTo(date, matrixIndex) {
            // Return if dates belongs to matrixIndex
            // i for rows, j for columns
            const [i, j, year] = matrixIndex.split('-')
            // In year, we have i, the day number (1-31) and j, the month number (1, 12)
            // return false
            return date.getDate() == i && date.getMonth() == j - 1 && date.getFullYear() == year
        },
        getTitle(date) {
            return date.getFullYear()
        },
        next(date) {
            return date.getFullYear() + 1
        },
        previous(date) {
            return date.getFullYear() - 1
        }
    }
}