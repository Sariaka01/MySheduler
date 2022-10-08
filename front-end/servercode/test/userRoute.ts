import Axios from 'axios'
import { DOMAIN } from '../globals/variable'
import users from './users'

(async function runTest() {
    await clearData()
    let datas = await addUsers()
    console.log(datas)
    setTimeout(async () => {
        console.log('Clearing data')
        await clearData()
        console.log('Done')
    }, 2000)
})()

async function clearData() {
    Axios.delete(`${DOMAIN}/user/all`)
    console.log('Deleted all users')
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
        catch(e: any) {
            console.error(`Error at user n ${index}: ${e.message}`)
        }
    }
    console.log(`inserted ${data.length} of ${users.length}`)
    return data
}