<template>
  <div>
    <p>从 $store.state 中获取的值：{{this.$store.state.counter}}</p>
    <p>
      <v-btn small @click="addSync">Sync +1</v-btn>
      <v-btn small @click="addSyncN(5)" color="primary">Sync +5</v-btn>
      <v-btn small @click="addAsync" color="error">Async +1</v-btn>
      <v-btn small @click="addAsyncN(5)" color="error">Async +5</v-btn>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Add',
  methods: {
    addSync() {
      this.$store.commit('mutationIncrementSync')
    },
    addSyncN(payload) {
      this.$store.commit('mutationIncrementSyncN', payload)
    },
    addAsync() {
      this.$store.dispatch('actionIncrementSync')
    },
    addAsyncN(payload) {
      this.$store.dispatch('actionIncrementSyncN', payload)
    }
  }
}
</script>

<style>
</style>
