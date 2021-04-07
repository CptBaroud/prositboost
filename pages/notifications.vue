<template>
  <v-container class="mt-2" :class="$vuetify.theme.dark ? 'card-background-dark' : 'card-background-light'" :style="'min-height: '+ windowSize.y + 'px'">
    <v-row>
      <v-col xl="12" lg="12" md="12" sm="12">
        <v-card class="rounded-card px-8 pt-8" style="background: transparent" flat>
          <v-card-title class="text-h4 pt-8" style="color: var(--v-text-base)">
            Notifications
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" class="d-flex align-center justify-center">
        <v-card
          color="background"
          class="rounded-card"
          flat
          width="650"
        >
          <v-card-text>
            <v-virtual-scroll
              :items="notification"
              :item-height="75 /* 200 */"
              :class="scrollbarTheme"
              class="rounded-card"
              height="600"
            >
              <template #default="{ item }">
                <v-list rounded color="background">
                  <v-list-item
                    router
                    :to="item.to"
                    @mouseover="!item.info.seen ? $store.dispatch('notification/seen', {token: $auth.getToken('local'), _id: item._id}) : null"
                  >
                    <v-badge
                      v-if="!item.info.seen"
                      class="pr-2"
                      inline
                      left
                      dot
                      color="greenPastel"
                    />
                    <v-list-item-avatar style="border: solid var(--v-primary-base) 2px">
                      <v-img v-if="item.author.avatar" :src="item.author.avatar" />
                      <v-icon v-else>
                        mdi-account
                      </v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="pl-2">
                      <v-list-item-subtitle>
                        {{ item.author.name }} - <span class="text--secondary">Le {{ new Date(item.created).toLocaleDateString('fr-FR', {
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
                        {{ item.title }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon>
                        {{ item.info.icon }}
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </template>
            </v-virtual-scroll>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Notifications',
  data () {
    return {
      windowSize: {
        x: 0,
        y: 1
      }
    }
  },
  computed: {
    notification: {
      get () {
        return this.$store.getters['notification/notification']
      }
    },

    scrollbarTheme () {
      return this.$vuetify.theme.dark ? 'dark ' : 'light'
    }
  },
  mounted () {
    this.onResize()
  },
  methods: {
    /**
     * Permet de calculer la taille de l'ecran
     **/
    onResize () {
      this.windowSize = {
        x: window.innerWidth,
        y: window.innerHeight
      }
    }
  }
}
</script>

<style scoped>
.card-background-dark {
  background-image: url('../assets/svg/notification_dark.svg');
  background-size: 35em;
  background-position: right 100% bottom 42%;
}

.card-background-light {
  background-image: url('../assets/svg/notification_light.svg');
  background-size: 35em;
  background-position: right 100% bottom 42%;
}

.light::-webkit-scrollbar {
  width: 15px;
}

.light::-webkit-scrollbar-track {
  background: #F8F8F8;
  border-left: 1px solid #F8F8F8;
}

.light::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #F8F8F8;
  border-radius: 7px;
}

.light::-webkit-scrollbar-thumb:hover {
  background: black;
}

.dark::-webkit-scrollbar {
  width: 15px;
  border-radius: 20px;
}

.dark::-webkit-scrollbar-track {
  background: #2C2C2C;
  border-left: 1px solid #2c2c2c;
}

.dark::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #2C2C2C;
  border-radius: 7px;
}

.dark::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
