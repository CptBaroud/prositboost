<template>
  <v-list-item
    :router="$route.name !== 'notifications'"
    :to="to"
    @mouseover="!seen ? markNotificationAsSeen(id) : null"
    @click="markNotificationAsRead(id)"
  >
    <v-badge
      v-if="!seen"
      class="pr-2"
      inline
      left
      dot
      color="pantoneGreen"
    />
    <v-list-item-avatar style="border: solid var(--v-primary-base) 2px">
      <v-img v-if="avatar" :src="avatar" />
      <v-icon v-else>
        mdi-account
      </v-icon>
    </v-list-item-avatar>
    <v-list-item-content class="pl-2">
      <v-list-item-subtitle>
        {{ name }} - <span class="text--secondary">Le {{ new Date(created).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        })
        }}
        </span>
      </v-list-item-subtitle>
      <v-list-item-title>
        {{ title }}
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-icon>
      <v-icon>
        {{ icon }}
      </v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'mdi-close'
    },
    to: {
      type: String,
      default: '/'
    },
    created: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    seen: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    markNotificationAsSeen (id) {
      setInterval(() => {
        this.$store.dispatch('notification/seen', { token: this.$auth.getToken('local'), _id: id })
      }, 5000)
    },

    markNotificationAsRead (id) {
      this.$store.dispatch('notification/read', { token: this.$auth.getToken('local'), _id: id })
    }
  }
}
</script>
