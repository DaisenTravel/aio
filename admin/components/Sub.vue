<template>
  <div>
    <p>{{counter}}</p>
    <p>
      <v-btn small @click="subSync">Sync -1</v-btn>
      <v-btn small @click="mutationDecrementSync">MutationSync -1</v-btn>
      <v-btn small @click="subSyncN(5)" color="primary">Sync -5</v-btn>
      <v-btn small @click="subAsync" color="error">Async -1</v-btn>
      <v-btn small @click="actionDecrementAsync" color="error">Action Async -1</v-btn>
      <v-btn small @click="subAsyncN(5)" color="error">Async -5</v-btn>
    </p>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Sub',
  computed: {
    // ...mapState(['counter']),
    ...mapGetters(['counter'])
  },
  methods: {
    ...mapMutations(['mutationDecrementSync', 'mutationDecrementSyncN']),
    ...mapActions(['actionDecrementAsync', 'actionDecrementAsyncN']),
    subSync() {
      this.mutationDecrementSync()
    },
    subSyncN(payload) {
      this.mutationDecrementSyncN(payload)
    },
    subAsync() {
      this.actionDecrementAsync()
    },
    subAsyncN(payload) {
      this.actionDecrementAsyncN(payload)
    }
  }
}
</script>

<style>
</style>
