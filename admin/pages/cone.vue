<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>限光筒型号管理</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" app>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" large>mdi-plus-circle</v-icon>
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
                    <v-text-field v-model="editedItem.text" label="限光筒型号" />
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.value" label="代码" />
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-checkbox v-model="editedItem.enabled" label="激活" />
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

    <v-data-table :headers="headers" :items="desserts" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.text }}</td>
        <td>{{ props.item.value }}</td>
        <td class="text-xs-left">
          <v-checkbox v-model="props.item.enabled" readonly />
        </td>
        <td class="justify-center layout px-0">
          <v-icon class="mr-2" @click="editItem(props.item)">mdi-edit</v-icon>
          <v-icon @click="deleteItem(props.item)">mdi-delete</v-icon>
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
      select: { state: '20mm', abbr: 3284 },
      cones: [
        // { text: '20mm', value: 3284 },
        // { text: '25mm', value: 3289 },
      ],
      valid: true,
      dialog: false,
      headers: [
        { text: '型号', sortable: true, align: 'left', value: 'text', },
        { text: '代码', sortable: true, align: 'left', value: 'value', },
        { text: '激活', sortable: true, align: 'left', value: 'enabled', },
        { text: '操作', sortable: false, align: 'center', value: 'name', }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        text: '',
        value: '',
        enabled: true,
      },
      defaultItem: {
        text: '',
        value: '',
        enabled: true,
      },
      nameRules: [
        v => !!v || '帐号名称是必须的',
        v => (v && v.length >= 2 && v.length <= 1024) || '帐号名称不少于2个字符并且不大于1024个字符',
      ],
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新建项目' : '编辑项目'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    select() {
      // console.log(this.select.abbr)
      this.editedItem.cone = this.select
      // console.log(this.editedItem.cone)
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      // this.desserts = []

      const res = await this.$axios.get("/api/rest/cones")
      // console.log(res)
      if (res.status === 200) {
        this.desserts = res.data
      }
    },

    async editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem(item) {
      const index = this.desserts.indexOf(item)
      if (confirm('您确定要删除此项目吗？')) {
        const res = await this.$axios.delete("/api/rest/cones/" + item._id)
        if (res.status === 200) {
          this.desserts.splice(index, 1)
        }
      }
    },

    async close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    async save() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        if (this.editedIndex > -1) {
          const res = await this.$axios.put("/api/rest/cones/" + this.editedItem._id, this.editedItem)
          if (res.status === 200) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
          }
        } else {
          const res = await this.$axios.post("/api/rest/cones", this.editedItem)
          if (res.status === 200) {
            // this.desserts.push(this.editedItem)
            this.desserts.unshift(this.editedItem)
          }
        }
        this.close()
      }
    },
  }
}
</script>
