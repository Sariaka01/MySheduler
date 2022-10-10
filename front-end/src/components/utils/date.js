export const VIEWS = {
    year: {
        list: [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        rowNumber: 31,   // Per month view
        /*getLabel(i, j) {
            // i-th day element of j-th month
            return `${i}-${j}`
        },*/
        setDate(curDate, date) {
            // Only month changes
            const cur = new Date(curDate)
            const [day, month] = date.split('-')
            const newDateString = new Date(`${cur.getFullYear()}-${month}-${day}`).toISOString()
            console.log(newDateString)
            return newDateString
        },
        belongsTo(task, date) {
            const taskDate = new Date(task.start)
            const dateString = `${taskDate.getDate()}-${taskDate.getMonth()+1}` // Because month starts at 0 with getMonth
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
        rowNumber: 24   // Per hour
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