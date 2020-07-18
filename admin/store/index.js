export const state = () => ({
    counter: 0,
    token: '',
})

export const mutations = {
    mutationIncrementSync(state) {
        state.counter++
    },
    mutationIncrementSyncN(state, payload) {
        state.counter += payload
    },
    mutationDecrementSync(state) {
        state.counter--
    },
    mutationDecrementSyncN(state, payload) {
        state.counter -= payload
    },
}

export const actions = {
    actionIncrementSync(context) {
        setTimeout(() => {
            context.commit('mutationIncrementSync')
        }, 1000)
    },
    actionIncrementSyncN(context, payload) {
        setTimeout(() => {
            context.commit('mutationIncrementSyncN', payload)
        }, 2000)
    },
    actionDecrementAsync(context) {
        setTimeout(() => {
            context.commit('mutationDecrementSync')
        }, 1000)
    },
    actionDecrementAsyncN(context, payload) {
        setTimeout(() => {
            context.commit('mutationDecrementSyncN', payload)
        }, 2000)
    },
}

export const getters = {
    counter(state) {
        return `从 mapGetters 中获取的值：${state.counter}`
    },
}
