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

/* THIS VIEWS CONCEPT */
/*
VIEW COMPONENT HAS
start: starting row notation
end: ending row notation
set(date): to set the date state
getList(date): get the list of rows
belongsTo(date, i, j): returns either a date belongs to column j of row i
getTitle(date): returns the title for the header
next(date): returns the next date
previous(date): returns the previous date
getLimits(date): returns an array of [lower, upper] date to filter queries
isToday(i, j): returns if a given label represents today

============== WEEKS START FROM MONDAY SO THE INDEX OF SUNDAY IS 7 ===================
*/


export const VIEWS = {
    yearly: {
        start: 1,
        end: 31,
        set(date) {
            // set the start date
            const today = new Date()
            if (date.getFullYear() == today.getFullYear())
                // If the year includes us
                return new Date(today.getFullYear(), today.getMonth(), today.getDate())
            return new Date(date.getFullYear(), 0)  // Else return first january
        },
        getList() {
            return [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ]
        },
        belongsTo(date, day, month) {
            // i-th day element of j-th month
            return date.getMonth()+1 == month && date.getDate() == day
        },
        getTitle(date) {
            return date.getFullYear()
        },
        isToday(day, month, date) {
            const today = new Date()
            return date.getFullYear() == today.getFullYear() && this.belongsTo(today, day, month)
        },
        next(date) {
            date = new Date(date.getFullYear() + 1, 0)  // January first
            return this.set(date)
        },
        previous(date) {
            date = new Date(date.getFullYear() - 1, 0)  // January first
            return this.set(date)
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
            // console.log(date.getDate())
            // console.log(date)
            const today = new Date()
            if (date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth())
                // If the month includes us
                return new Date(today.getFullYear(), today.getMonth(), today.getDate())
            return new Date(date.getFullYear(), date.getMonth())
        },
        getList(date) {
            const options = {
                day: 'numeric',
                weekday: 'short'
            }
            const limit = getLastDay(date)
            let list = []
            for (let i = 1; i < limit; i++) {
                let label = new Date(date.getFullYear(), date.getMonth(), i)
                list.push(Intl.DateTimeFormat('en-GB', options).format(label))
            }
            return list
        },
        belongsTo(date, hour, day) {
            // i-th hour of j-th day
            return date.getDate() == day && date.getHours() == hour
        },
        getTitle(date) {
            return `${Intl.DateTimeFormat('en-US', {month: 'long', year: 'numeric'}).format(date)}`
        },
        isToday(hour, day, date) {
            const today = new Date()
            return date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && today.getDate() == day
        },
        next(date) {
            date = new Date(date.getFullYear(), date.getMonth() + 1)
            return this.set(date)
        },
        previous(date) {
            date = new Date(date.getFullYear(), date.getMonth() - 1)
            return this.set(date)
        },
        getLimits(date) {
            // return lower and upper dates
            return [new Date(date.getFullYear(), date.getMonth()), new Date(date.getFullYear(), date.getMonth(), getLastDay(date), 23, 59, 59, 999)]  // Get first january
        }
    },
    weekly: {
        start: 0,
        end: 23,
        set(date) {
            const today = new Date()
            // Weeks starts on mondays so Sunday(index 0) will be considered 7
            if (date.getFullYear() == today.getFullYear() && getWeek(date.toISOString()) == getWeek(today.toISOString()))
                // If the month includes us
                return new Date(today.getFullYear(), today.getMonth(), today.getDate() - (today.getDay()? today.getDay(): 7) + 1)
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay()? date.getDay(): 7) + 1)
        },
        getList(date) {
            // const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            // const monday = this.set(date).getDate()
            let list = []
            let options = {
                weekday: 'long',
                day: 'numeric'
            }
            // console.log('from getList: ' + date)
            date = this.set(date)
            for (let i = 0; i < 7; i++) {
                let labelDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i)
                // console.log(labelDate)
                list.push(`${Intl.DateTimeFormat('en-GB', options).format(labelDate)}`)
            }
            return list
        },
        isToday(hour, day, date) {
            const today = new Date()
            return date.getFullYear() == today.getFullYear() && getWeek(date) == getWeek(today) && (today.getDay() || 7) == day
        },
        belongsTo(date, hour, weekday) {
            // i-th hour of j-th day
            return date.getDay()? date.getDay(): 7 == weekday && date.getHours() == hour
        },
        getTitle(date) {
            return `Week of ${Intl.DateTimeFormat('en-US', {day: '2-digit', month: 'long', year: 'numeric'}).format(date)}`
        },
        next(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)
        },
        previous(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
        },
        getLimits(date) {
            // return lower and upper dates
            return [new Date(date.getFullYear(), date.getMonth(), date.getDate()), new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7, 23, 59, 59, 999)]  // Get first january
        }
    },
    daily: {
        start: 0,
        end: 23,
        set(date) {
            const today = new Date()
            // Weeks starts on mondays so Sunday(index 0) will be considered 7
            if (date.getFullYear() == today.getFullYear() && (date.getMonth() == today.getMonth() || getWeek(date) == getWeek(today)))
                // If the month or week includes us
                return new Date(today.getFullYear(), today.getMonth(), today.getDate())
            return new Date(date.getFullYear(), date.getMonth(), date.getDate()) // Return the first day
        },
        getList(date) {
            // const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            // const monday = this.set(date).getDate()
            let options = {
                weekday: 'long',
                day: 'numeric'
            }
            // console.log('from getList: ' + date)
            return [Intl.DateTimeFormat('en-GB', options).format(date)]
        },
        isToday(hour, day, date) {
            const today = new Date()
            return date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate()
        },
        belongsTo(date, hour) {
            // i-th hour of j-th day
            return date.getHours() == hour
        },
        getTitle(date) {
            return Intl.DateTimeFormat('en-US', {day: 'numeric', year: 'numeric', month: 'long', weekday: 'long'}).format(date)
        },
        next(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        },
        previous(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
        },
        getLimits(date) {
            // return lower and upper dates
            return [new Date(date.getFullYear(), date.getMonth(), date.getDate()), new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)]  // Get first january
        }
    }
}