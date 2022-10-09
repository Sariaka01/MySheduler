export const VIEWS = {
    year: {
        list: [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        rowNumber: 31   // Per month view
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
        rowNumber: 5
    }
}