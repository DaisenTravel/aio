<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>用户管理</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="800px" app>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" large>mdi-plus-circle</v-icon>
          <!-- <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn> -->
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.email" :rules="emailRules" label="邮箱" />
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedItem.name"
                      :counter="1024"
                      :rules="nameRules"
                      label="名称"
                    />
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-checkbox v-model="editedItem.enabled" label="激活" />
                  </v-flex>
                  <!-- <v-flex xs12 sm6 md4 v-if="editedIndex == -1"> -->
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedItem.password"
                      :counter="1024"
                      :rules="password1Rules"
                      label="登录密码"
                      required
                      type="password"
                    />
                  </v-flex>
                  <!-- <v-flex xs12 sm6 md4 v-if="editedIndex == -1"> -->
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="password"
                      :counter="1024"
                      :rules="password2Rules"
                      label="校验密码"
                      required
                      type="password"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">取消</v-btn>
            <v-btn color="blue darken-1" flat @click="save">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-alert
      :value="alert"
      color="pink"
      dark
      border="top"
      icon="mdi-home"
      transition="scale-transition"
    >
      Phasellus tempus. Fusce ac felis sit amet ligula pharetra condimentum. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Pellentesque posuere. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo.
      Phasellus nec sem in justo pellentesque facilisis. Phasellus magna. Cras risus ipsum, faucibus ut, ullamcorper id, varius ac, leo. In hac habitasse platea dictumst. Praesent turpis.
    </v-alert>
    <v-data-table :headers="headers" :items="desserts" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">
          <v-checkbox v-model="props.item.enabled" readonly />
        </td>
        <td class="justify-center layout px-0">
          <v-icon class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn @click="initialize">刷新</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alert: false,
      valid: true,
      dialog: false,
      headers: [
        { text: "邮箱", sortable: true, align: "left", value: "email" },
        { text: "名称", sortable: true, align: "left", value: "name" },
        { text: "激活", sortable: true, align: "left", value: "enabled" },
        { text: "操作", sortable: false, align: "right", value: "name" }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        // email: 'admin@live.cn',
        // name: 'admin',
        // password: '123456',
        email: "",
        name: "",
        password: "",
        enabled: true
      },
      defaultItem: {
        // email: 'admin@live.cn',
        // name: 'admin',
        // password: '123456',
        email: "",
        name: "",
        password: "",
        enabled: true
      },
      password: "",
      emailRules: [
        v => !!v || "登录邮箱是必须的",
        v => /.+@.+/.test(v) || "登录邮箱必须有效"
      ],
      nameRules: [
        v => !!v || "帐号名称是必须的",
        v =>
          (v && v.length >= 2 && v.length <= 1024) ||
          "帐号名称不少于2个字符并且不大于1024个字符"
      ],
      password1Rules: [
        v => !!v || "登录密码是必须的",
        v =>
          (v && v.length >= 3 && v.length <= 1024) ||
          "登录密码不少于3个字符并且不大于1024个字符"
      ],
      password2Rules: [
        v => !!v || "校验密码是必须的",
        v =>
          (v && v.length >= 3 && v.length <= 1024) ||
          "校验密码不少于3个字符并且不大于1024个字符",
        v => (v && v === this.editedItem.password) || "校验密码不正确"
      ]
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "新建项目" : "编辑项目";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      // this.desserts = []

      const res = await this.$axios.get("/api/rest/users");
      if (res.status === 200) {
        this.desserts = res.data;
      }
    },

    async editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.desserts.indexOf(item);
      if (confirm("您确定要删除此项目吗？")) {
        const res = await this.$axios.delete("/api/rest/users/" + item._id);
        if (res.status === 200) {
          this.desserts.splice(index, 1);
        }
      }
    },

    async close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        if (this.editedIndex > -1) {
          const res = await this.$axios.put(
            "/api/rest/users/" + this.editedItem._id,
            this.editedItem
          );
          // console.log(res)
          if (res.status === 200) {
            // Object.assign(this.desserts[this.editedIndex], this.editedItem)
            this.initialize();
          } else if (res.status === 409) {
            this.alert = true;
          }
        } else {
          // console.log(this.editedItem)
          const res = await this.$axios.post(
            "/api/rest/users",
            this.editedItem
          );
          // console.log(res)
          if (res.status === 200) {
            // this.desserts.push(this.editedItem)
            // this.desserts.unshift(this.editedItem)
            this.initialize();
          } else if (res.status === 409) {
            this.alert = true;
          }
        }
        this.close();
      }
    }
  }
};
</script>
