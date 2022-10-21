const Axios = require('axios')
const users = require('./users')
const DOMAIN = 'http://localhost:3001'

async function run() {
    await addUsers()
    for (let user of users) {
        // Create random
        console.log(`Creating tasks for ${user.email}`)
        await addTask(user.email)
    }
    console.log(`Ready to use users\n${users.map(user => user.email + ':' + user.password).join('\n')}`)
}

async function addUsers() {
    let data= []
    for (let user of users) {
        let index= users.findIndex(u => u.email == user.email)
        try {
            let res = await Axios.post(`${DOMAIN}/user/create`, user)
            if (res.status == 201) {
                data.push(res.data)
            }
            else {
                console.log(`User ${index}`)
            }
        }
        catch(e) {
            console.error(`Error at user n ${index}: ${e.message}`)
        }
    }
    // console.log(`Inserted ${data.length} of ${users.length}`)
    return data
}

async function connect(email = 'safidy@gmail.com') {
    const user = users.find(user => user.email == email)
    if (user) {
        try {
            const res = await Axios.post(`${DOMAIN}/user/login`, {
                email: email,
                password: user.password
            })
            return res.data.user.token
        }
        catch {
            return 'An error occured during user login ' + email
        }
    }
    else {
        console.log(email + ' not found in users.js')
    }
}

async function addTask(email = 'safidy@gmail.com') {
    let token = await connect(email)
    let user = users.find(user => user.email == email)
    // Select random users as participants
    let p1 = parseInt(Math.random() * 100 % users.length)
    let p2 = parseInt(Math.random() * 100 % users.length)
    let p3 = parseInt(Math.random() * 100 % users.length)
    for (let i = 1; i <= 5; i++) {
        console.log(`\rTask ${i} of 5`)
        let [month, day, hour, min] = [parseInt((Math.random() * 100) % 12), parseInt((Math.random() * 100) % 31), parseInt((Math.random() * 100) % 24), parseInt((Math.random() * 100) % 60)]
        let startDate = new Date(new Date().getFullYear(), month, day, hour, min)
        let endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1)   // By default one month is enough
        let task = {
            "name": `Task ${i} of ${user?.email}`,
            "start": `${startDate.toISOString()}`,
            "end": `${endDate.toISOString()}`,
            "priority": `${['HIGH', 'MEDIUM', 'LOW'][parseInt(Math.random() * 100 % 3)]}`,
            "description": "Description of the task",
            "beforeStart": parseInt(Math.random() * 100 % 61),
            "participants": [users[p1].email, users[p2].email, users[p3].email]
        }
        try {
            await Axios.post(`${DOMAIN}/user/tasks/create`, {
                token: token,
                data: task
            })
        }
        catch {
            console.log('Unable to create task for ' + email)
        }
    }
    console.log('Done...')
}

run()
// addTask()
