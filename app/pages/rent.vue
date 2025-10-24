<template>
  <v-container grid-list-xl>
    <PageHeader title="Loyers" />

    <v-sheet border rounded>
      <v-data-table :items="rentList" :headers="headers">
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-icon icon="mdi-account-tie" size="x-small" />
              Loyers
            </v-toolbar-title>
            <v-btn
              class="me-2"
              prepend-icon="mdi-plus"
              rounded="lg"
              text="Ajouter un Loyer"
              border
              @click="add"
            />
          </v-toolbar>
        </template>

        <template #item.store="{ value }"> {{ value.name }} </template>

        <template #item.firstName="{ value }"> {{ value.firstName }} </template>
        <template #item.lastName="{ value }"> {{ value.lastName }} </template>

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

        <template #no-data> La liste des loyers est vide </template>
      </v-data-table>
    </v-sheet>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card title="Créer un loyer">
        <template #text>
          <v-row>
            <v-col cols="12">
              <v-date-input
                v-model="rentModel.period"
                clearable
                label="Période"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="rentModel.amount" label="Loyer" />
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="rentModel.tenentId"
                :items="tenentList"
                label="Locataire"
                input-format="dd/mm/yyyy"
              />
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="rentModel.storeId"
                :items="storeList"
                item-title="name"
                item-value="id"
                label="Magasin"
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
    period: "",
    amount: 0,
    storeId: "",
    tenentId: "",
  };
}
export default {
  data() {
    return {
      headers: [
        { title: "Magasin", key: "store", align: "start" },
        {
          title: "Nom du locataire",
          key: "firstName",
          value: "tenent",
          align: "start",
        },
        {
          title: "Prénom du locataire",
          key: "lastName",
          value: "tenent",
          align: "start",
        },
        { title: "Montant", key: "amount", align: "start" },
        { title: "Période", key: "period", align: "start" },
        { title: "Actions", key: "actions", align: "end", sortable: false },
      ],
      dialog: false,
      rentList: [],
      tenentList: [],
      storeList: [],
      rentModel: createNewStore(),
    };
  },
  async beforeMount() {
    await useAsyncData("rents", () => this.updatetenentList());
  },
  methods: {
    async add() {
      this.rentModel = createNewStore();

      const results = await Promise.all([
        $fetch("/api/store"),
        $fetch("/api/tenent"),
      ]);

      this.storeList = results[0];
      this.tenentList = results[1].map((tenent) => {
        return {
          title: `${tenent.firstName}  ${tenent.lastName}`,
          value: tenent.id,
        };
      });

      this.dialog = true;
    },
    async save() {
      const date = new Date(this.rentModel.period);
      this.rentModel.period = `${date.getFullYear()}-${date.toLocaleString(
        "default",
        {
          month: "long",
        }
      )}`;

      console.log(this.rentModel);
      await $fetch("/api/rent", {
        method: "POST",
        body: this.rentModel,
      });

      await this.updatetenentList();

      this.dialog = false;
    },
    async updatetenentList() {
      const rentList = await $fetch("/api/rent");
      this.rentList = rentList;
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
