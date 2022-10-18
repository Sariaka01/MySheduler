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

export function getLastDay(date) {
    switch (date.getMonth()) {
        case 1: 
            // February
            if (new Date(date.getFullYear(), 1, 29).getMonth() == 1)
                return 29
            else
                return 28
        case 0, 2, 4, 6, 7, 9, 11:
            return 31
        default:
            return 30
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
    yearly: {
        start: 1,
        end: 31,
        set(date) {
            // set the start date
            return new Date(date.getFullYear(), 0)
        },
        getList() {
            return [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ]
        },
        getLabel(i, j, { year }) {
            // i-th day element of j-th month
            // console.log(year)
            return `${i}-${j}-${year}`  // i-th day of the j-th month of year year
        },
        // rowNumber: 31,
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
            return new Date(date.getFullYear() + 1, 0)  // January first
        },
        previous(date) {
            return new Date(date.getFullYear() - 1, 0)  // January first
        },
        getLimits(date) {
            // return lower and upper dates
            return [new Date(date.getFullYear(), 0, 1), new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999)]  // Get first january
        }
    },
    monthly: {
        start: 0,
        end: 23,
        set(date) {
            return new Date(date.getFullYear(), date.getMonth())
        },
        getList(date) {
            let limit = getLastDay(date)
            let list = []
            for (let i = 1; i <= limit; i++)
                list.push(i)
            return list
        },
        getLabel(i, j, { month, year }) {
            // i-th hour of j-th day
            return `${i}-${j}-${month}-${year}`  // i-th day of the j-th month of year year
        },  // 24 hours
        belongsTo(date, matrixIndex) {
            // Return if dates belongs to matrixIndex
            // i for rows, j for columns
            const [i, j, month, year] = matrixIndex.split('-')
            // console.log(`Hours ${i} compared to ${date.getHours()}`)
            // console.log(`${j} compared to ${date.getDate()}`)
            // console.log(`${month} compared to ${date.getMonth()}`)
            // console.log(`${year} compared to ${date.getFullYear()}`)
            // In year, we have i, the day number (1-31) and j, the month number (1, 12)
            // return false
            return date.getHours() == i && date.getDate() == j && date.getMonth() == month && date.getFullYear() == year
        },
        getTitle(date) {
            return `${date.getMonth() + 1}/${date.getFullYear()}`
        },
        next(date) {
            return new Date(date.getFullYear(), date.getMonth() + 1)
        },
        previous(date) {
            return new Date(date.getFullYear(), date.getMonth() - 1)
        },
        getLimits(date) {
            // return lower and upper dates
            return [new Date(date.getFullYear(), date.getMonth(), 1), new Date(date.getFullYear(), date.getMonth(), getLastDay(date), 23, 59, 59, 999)]  // Get first january
        }
    },
    weekly: {
        start: 0,
        end: 24,
        set(date) {
            const monday = date.getDate() - date.getDay() + 1
            console.log(date.getDate() + ' and ' + date.getDay() + ', monday is ', monday < 0? monday + 7: monday)
            const newDate = new Date(date.getFullYear(), date.getMonth(), monday < 0? monday + 7: monday)
            console.log(newDate)
            return newDate
        },
        getList(date) {
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            const monday = this.set(date).getDate()
            let list = []
            for (let i = 0; i < 7; i++) {
                list.push(`${days[i]} ${monday + i}`)
            }
            return list
        },
        getLabel(i, j, { year }) {
            // i-th day element of j-th month
            console.log(year)
            return `${i}-${j}-${year}`  // i-th day of the j-th month of year year
        },
        belongsTo(date, matrixIndex) {
            // Return if dates belongs to matrixIndex
            // i for rows, j for columns
            const [i, j, year] = matrixIndex.split('-')
            // In year, we have i, the day number (1-31) and j, the month number (1, 12)
            // return false
            return date.getDate() == i && date.getMonth() == j - 1 && date.getFullYear() == year
        },
        getTitle(date) {
            return `${date.getMonth() + 1}/${date.getFullYear()}`
        },
        next(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)
        },
        previous(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
        }
    }
}