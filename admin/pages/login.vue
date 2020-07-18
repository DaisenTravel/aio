<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="model.email" :counter="1024" :rules="emailRules" label="邮箱" required />
    <v-text-field
      v-model="model.password"
      :counter="1024"
      :rules="passwordRules"
      label="密码"
      required
      type="password"
    />
    <v-btn :disabled="!valid" @click="validate">登录</v-btn>
    <v-btn @click="reset">重置</v-btn>
    <!-- <v-btn @click="this.$store.state.counter++">重置</v-btn> -->
    <!-- <v-text-fileld>{{counter}}</v-text-fileld> -->
  </v-form>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      tips: "",
      valid: true,
      model: {
        email: "admin@live.cn",
        password: "123456"
        // email: 'user1@live.cn',
        // password: '123456'
        // email: '',
        // password: ''
      },
      emailRules: [
        v => !!v || "登录邮箱是必须的",
        v => (/.+@.+/.test(v) && v.length <= 1024) || "登录邮箱必须有效"
      ],
      passwordRules: [
        v => !!v || "登录密码是必须的",
        v =>
          (v && v.length >= 3 && v.length <= 1024) ||
          "登录密码不少于3个字符并且不大于1024个字符"
      ]
    };
  },
  beforeCreate() {
    sessionStorage.clear();
    localStorage.clear();
  },
  // computed: {
  //   counter() {
  //     return this.$store.state.counter
  //   }
  // },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        try {
          this.$toast.show("正在登录，请稍候...");
          const res = await this.$axios.post("/api/auth/login", this.model);
          console.log(res.status);
          console.log(res.data);
          if (res.status === 200) {
            this.$toast.success("登录成功，正重定向...");
            // console.log(res)
            sessionStorage.setItem("token", res.data.token);
            localStorage.setItem("token", res.data.token);
            // this.$router.push('/')
            this.$router.replace("/");
            // console.log(this.$router)
          } else if (res.status === 422) {
            this.$toast.error("登录失败1111！" + res.data);
            // this.tips = ''
          }
        } catch (error) {
          // console.log(error)
          // this.$toast.error(error)
          this.$toast.error("登录失败2222！");
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
  // notifications: {
  //   showLoginError: {
  //     // You can have any name you want instead of 'showLoginError'
  //     title: 'Login Failed',
  //     message: 'Failed to authenticate',
  //     type: 'error' // You also can use 'VueNotifications.types.error' instead of 'error'
  //   }
  // }
};
</script>
