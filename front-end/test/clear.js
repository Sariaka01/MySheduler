const Axios = require('axios')
const DOMAIN = 'http://localhost:3001'

async function clearData() {
    try {
        await Axios.delete(`${DOMAIN}/user?table=all`)
        console.log('Cleared database')
    }
    catch (e) {
        console.log("Couldn't delete the datas")
    }
}

clearData()