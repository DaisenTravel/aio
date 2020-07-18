<template>
  <v-layout>
    <v-flex class="text-center">
      <h2>Vuex 实例应用</h2>
      <p></p>
      <hr />
      <p></p>
      <p>加法</p>
      <p>
        <add />
      </p>
      <hr />
      <p></p>
      <p>减法</p>
      <p>
        <Sub />
      </p>
      <p></p>
      <hr />
    </v-flex>
  </v-layout>
</template>

<script>
import Add from '~/components/Add'
import Sub from '~/components/Sub'
export default {
  components: {
    Add,
    Sub
  }
}
</script>

<style scoped>
</style>
