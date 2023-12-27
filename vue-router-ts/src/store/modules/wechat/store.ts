export const createStore = () => {
    const store = {
        testing: true
    }
    return store
}

export type userState = ReturnType<typeof createStore>