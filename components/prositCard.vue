<template>
  <v-card
    rounded="lg"
    class="my-4"
    style="transition: background-color 0.2s ease-in-out"
    :color="hover ? 'primary' : background"
    :elevation="hover ? 6 : 0"
  >
    <v-card-text style="padding-bottom: 0">
      <template v-for="(keyword, i) in item.keywords">
        <v-chip
          v-if="i <= 2"
          :key="i"
          color="accent"
          label
          class="my-1 mr-3"
        >
          {{ keyword.name }}
        </v-chip>
      </template>
      <v-chip
        v-if="item.keywords.length >= 2 && item.keywords.length >= 3"
        :color="background === 'secondary' ? 'background' : 'secondary'"
        label
        class="my-1"
        style="color: var(--var-text-base)"
      >
        + {{ item.keywords.length - 3 }} autres ...
      </v-chip>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="mb-2">
            {{ item.title }}
          </v-list-item-title>
          <v-list-item-subtitle style="display: inline-block" class="text-truncate">
            {{ item.context }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
    <v-card-actions style="padding-top: 0">
      <v-list-item>
        <v-list-item-avatar>
          <v-img v-if="item.author.avatar" :src="item.author.avatar" />
          <v-img v-else :src="avatar" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.author.name }} {{ item.author.surname }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            v-if="hover"
            text
            :to="'/prosits/' + item._id"
            nuxt
          >
            En voir plus
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PrositCard',
  props: {
    item: {
      type: Object,
      default: null,
      required: true
    },
    hover: {
      type: Boolean,
      default: null,
      required: true
    },
    background: {
      type: String,
      default: 'secondary',
      required: false
    }
  }
}
</script>

<style scoped>

</style>
