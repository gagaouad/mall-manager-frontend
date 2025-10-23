<!-- <template>
  <v-app>
    <AppHeader />
  </v-app>
</template> -->

<template>
  <v-app>
    <v-layout>
      <AppHeader />
      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>
