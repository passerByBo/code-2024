import {GET_DATA} from './constant'
import {userState} from './store'

const mutations = {
[GET_DATA](state:userState, payload: boolean){
    console.log('数据请求', payload)
    state.testing = payload
}
}

export default mutations