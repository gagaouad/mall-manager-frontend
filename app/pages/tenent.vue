<template>
  <v-container grid-list-xl>
    <PageHeader title="Locataires" />

    <v-sheet border rounded>
      <v-data-table :items="tenentList" :headers="headers">
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-icon icon="mdi-account-tie" size="x-small" />
              Locataires
            </v-toolbar-title>
            <v-btn
              class="me-2"
              prepend-icon="mdi-plus"
              rounded="lg"
              text="Ajouter un locataire"
              border
              @click="add"
            />
          </v-toolbar>
        </template>

        <template #item.store="{ value }"> {{ value.name }} </template>

        <template #item.actions="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon
              color="medium-emphasis"
              icon="mdi-pencil"
              size="small"
              @click="edit(item.id)"
            />

            <v-icon
              color="medium-emphasis"
              icon="mdi-delete"
              size="small"
              @click="remove(item.id)"
            />
          </div>
        </template>

        <template #no-data> La liste des locataires est vide </template>
      </v-data-table>
    </v-sheet>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card title="Créer un locataire">
        <template #text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="tenentModel.lastName" label="Nom" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="tenentModel.firstName" label="Prénom" />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="tenentModel.phoneNumber"
                label="Numéro de téléphone"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="tenentModel.email"
                type="email"
                label="Email"
              />
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="tenentModel.storeId"
                :items="storeList"
                item-title="name"
                label="Locataire"
                item-value="id"
              />
            </v-col>
          </v-row>
        </template>
        <v-divider />
        <v-card-actions class="bg-surface-light">
          <v-btn text="Cancel" variant="plain" @click="dialog = false" />

          <v-spacer />

          <v-btn text="Save" @click="save" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
function createNewStore() {
  return {
    lastName: "",
    firstName: "",
    phoneNumber: "",
    email: "",
    storeId: "",
  };
}
export default {
  data() {
    return {
      headers: [
        { title: "Nom", key: "lastName", align: "start" },
        { title: "Prénom", key: "firstName", align: "start" },
        { title: "Numéro de téléphone", key: "phoneNumber", align: "start" },
        { title: "Email", key: "email", align: "start" },
        { title: "Nom du magasin", key: "store", align: "start" },
        { title: "Actions", key: "actions", align: "end", sortable: false },
      ],
      dialog: false,
      tenentList: [],
      storeList: [],
      tenentModel: createNewStore(),
    };
  },
  async beforeMount() {
    await useAsyncData("tenents", () => this.updatetenentList());
  },
  methods: {
    async add() {
      this.tenentModel = createNewStore();
      const storeList = await $fetch("/api/store");
      this.storeList = storeList;
      this.dialog = true;
    },
    async save() {
      await $fetch("/api/tenent", {
        method: "POST",
        body: this.tenentModel,
      });
      await this.updatetenentList();

      this.dialog = false;
    },
    async updatetenentList() {
      const tenentList = await $fetch("/api/tenent");
      this.tenentList = tenentList;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-container {
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  width: 100%;
  padding: 20px;
}
</style>
