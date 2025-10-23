<template>
  <v-container grid-list-xl>
    <PageHeader title="Magasins" />

    <v-sheet border rounded>
      <v-data-table :items="storeList" :headers="headers">
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-icon icon="mdi-store" size="x-small" />
              Magasins
            </v-toolbar-title>
            <v-btn
              class="me-2"
              prepend-icon="mdi-plus"
              rounded="lg"
              text="Ajouter un magasin"
              border
              @click="add"
            />
          </v-toolbar>
        </template>

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

        <template #no-data> La liste des magasins est vide </template>
      </v-data-table>
    </v-sheet>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card title="Créer un magasin">
        <template #text>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="storeModel.name" label="Nom du magasin" />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="storeModel.location"
                label="Adresse du magasin"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="storeModel.size"
                label="Supérficie du magasin"
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
    name: "",
    location: "",
    size: "",
  };
}
export default {
  data() {
    return {
      headers: [
        { title: "Nom du magasin", key: "name", align: "start" },
        { title: "Addresse", key: "location", align: "end" },
        { title: "Supérficie", key: "size", align: "end" },
        { title: "Actions", key: "actions", align: "end", sortable: false },
      ],
      dialog: false,
      storeList: [],
      storeModel: createNewStore(),
    };
  },
  async beforeMount() {
    await useAsyncData("stores", () => this.updateStoreList());
  },
  methods: {
    add() {
      this.storeModel = createNewStore();
      this.dialog = true;
    },
    async save() {
      await $fetch("/api/store", {
        method: "POST",
        body: this.storeModel,
      });
      await this.updateStoreList();
      this.dialog = false;
    },
    async updateStoreList() {
      const storeList = await $fetch("/api/store");
      this.storeList = storeList;
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
