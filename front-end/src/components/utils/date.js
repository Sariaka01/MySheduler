export function getWeek(date) {
    // date is of Date type
    const firstJanuary = new Date(date.getFullYear(), 0, 1)  // January 1st of the current year
    const days = Math.floor((date - firstJanuary) / (24 * 60 * 60 * 1000))   // Operations on dates works with milliseconds
    return Math.ceil(days / 7)
}


export const VIEWS = {
    year: {
        list: [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        rowNumber: 31,   // Per month view
        getLabel(i, j, { year }) {
            // i-th day element of j-th month
            console.log(year)
            return `${i}-${j}-${year}`  // day-month-year
        },
        setDate(curDate, date) {
            // Only month changes
            const cur = new Date(curDate)
            // console.log(cur.toTimeString().split(' '))
            const [day, month] = date.split('-')
            // console.log(day, month)
            // const string = `${cur.getFullYear()}-${month}-${day} ${cur.toTimeString().split(' ').shift()}`
            // console.log(string)
            // console.log(new Date(string))
            const newDateString = new Date(cur.getFullYear(), month-1, day, cur.getHours(), cur.getMinutes()).toISOString()
            // console.log(newDateString)
            return newDateString
        },
        belongsTo(task, date) {
            const taskDate = new Date(task.start)
            const dateString = `${taskDate.getDate()}-${taskDate.getMonth() + 1}-${taskDate.getFullYear()}` // Because month starts at 0 with getMonth
            // console.log(dateString)
            return dateString == date
        }
    },
    month: {
        list: function (name) { 
            console.log(this)
            const index = [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ].indexOf(name)
            return [index]
        }(),
        rowNumber: 24   // Per month view
    },
    week: {
        list: [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        rowNumber: 24,   // Per hour
        getLabel(i, j, { week, year}) {
            // i-th hour element of j-th day of week-th week of year year
            return `${i}-${j}-${week}-${year}`
        },
        setDate(curDate, date) {
            // Only month changes
            const cur = new Date(curDate)
            // console.log(cur.toTimeString().split(' '))
            const [hour, day] = date.split('-')
            // console.log(hour, day)
            const string = `${cur.getFullYear()}-${cur.getMonth()+1}-${day} ${cur.toTimeString().split(' ').shift().split(':').map((el, i) => i? el: hour.padStart(2, '0')).join(':')}`
            // console.log(string)
            // console.log(new Date(string))
            const newDateString = new Date(string).toString()
            // console.log(newDateString)
            return newDateString
        },
        belongsTo(task, date) {
            const taskDate = new Date(task.start)
            // console.log(taskDate.getDay())
            const dateString = `${taskDate.getHours()}-${taskDate.getDay()}-${getWeek(taskDate)}-${taskDate.getFullYear()}` // getDay: 1-7
            // console.log(dateString)
            return dateString == date
        }
    },
    day: {
        list: [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        rowNumber: 24   // Per hour
    },
    test: {
        list: [
            "Today", "Tomorrow"
        ],
        getLabel(i, j) {
            // i-th day element of j-th month
            return `${i}-${j}`
        },
        rowNumber: 5,
        /*getLabel(i, j) {
            // i-th element of j
            return `${i}-${this.list[j]}`.toLowerCase()
        },*/
        belongsTo(task, date) {
            return task.date == date
        }
    }
}