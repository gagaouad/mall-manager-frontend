<template>
  <v-navigation-drawer theme="dark" permanent>
    <v-list color="transparent">
      <v-list-item prepend-icon="mdi-domain" title="Mall Manager" />
      <v-divider />
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        to="/"
        title="Tableau de bord"
      />
      <v-list-item prepend-icon="mdi-store" to="/store" title="Magasin" />
      <v-list-item
        prepend-icon="mdi-account-tie"
        to="/tenent"
        title="Locataire"
      />

      <v-list-item
        prepend-icon="mdi-account-credit-card"
        to="/rent"
        title="Payment"
      />
      <!-- <v-list-item prepend-icon="mdi-view-dashboard">
        <NuxtLink to="/">Tableau de bord</NuxtLink>
      </v-list-item>
      <v-list-item prepend-icon="mdi-store">
        <NuxtLink to="/store">Magasin </NuxtLink>
      </v-list-item>
      <v-list-item prepend-icon="mdi-account-tie">
        <NuxtLink to="/tenent">Locataire </NuxtLink>
      </v-list-item>
      <v-list-item prepend-icon="mdi-account-credit-card">
        <NuxtLink to="/rent"> Payment</NuxtLink>
      </v-list-item> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
// a {
//   color: white;
//   text-decoration: none;
// }
.v-list-item--active {
  color: #7b1fa2 !important;
}
</style>
