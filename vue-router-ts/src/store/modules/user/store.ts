export const createStore = () => {
    const store = {
        loading: true
    }
    return store
}

export type userState = ReturnType<typeof createStore>