import { userState } from "./store";

const moduleGetters = {
    isTest: (state:userState):string => {
        return `【${state.testing}】`
    }
}


export default moduleGetters