<template>
  <v-app
    dark
  >
    <v-app-bar
      class="px-4 py-4"
      style="transition: color 0s; background: transparent !important;"
      fixed
      absolute
      app
      color="background"
      flat
    >
      <v-app-bar-nav-icon v-if="$auth.loggedIn" @click="drawer = !drawer" />

      <v-spacer />
      <v-btn
        class="mr-2"
        icon
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon>
          mdi-brightness-4
        </v-icon>
      </v-btn>
      <template v-if="$auth.loggedIn">
        <v-menu open-on-hover bottom offset-y max-height="300" style="background: transparent !important;">
          <template #activator="{ on, attrs }">
            <v-badge
              :content="notification.filter(item => !item.info.seen).length"
              style="border-color: var(v--background-color)"
              :value="notification.filter(item => !item.info.seen).length"
              class="mr-4"
              color="green"
              bordered
              overlap
            >
              <v-icon
                v-bind="attrs"
                v-on="on"
              >
                mdi-bell
              </v-icon>
            </v-badge>
          </template>
          <v-list max-width="375" style="background: transparent !important;">
            <template v-for="(item, a) in notification">
              <notification
                :id="item._id"
                :key="a"
                router
                :name="item.author.name"
                :icon="item.info.icon"
                :to="item.to"
                :created="item.created"
                :title="item.title"
                :avatar="item.author.avatar"
              />
            </template>
            <v-list-item to="/notifications" class="d-flex justify-center">
              <v-list-item-content>
                <v-list-item-title>
                  En voir plus
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-list color="background" dense class="mr-8" style="background: transparent !important;">
          <v-menu open-on-hover bottom offset-y>
            <template #activator="{ on, attrs }">
              <v-list-item
                v-bind="attrs"
                v-on="on"
              >
                <v-list-item-avatar style="border: solid var(--v-primary-base) 2px">
                  <v-img v-if="$auth.user.avatar" :src="$auth.user.avatar" />
                  <v-icon v-else>
                    mdi-account
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-title v-if="on">
                  <h3>{{ $auth.user.name }}</h3>
                </v-list-item-title>
              </v-list-item>
            </template>
            <v-list color="secondary">
              <v-list-item
                router
                to="/profil"
              >
                <v-list-item-title>Mon compte</v-list-item-title>
              </v-list-item>
              <v-list-item
                @click="$auth.logout()"
              >
                <v-list-item-title>Deconnexion</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list>
      </template>
    </v-app-bar>
    <v-navigation-drawer
      v-if="$auth.loggedIn"
      v-model="drawer"
      :value="drawer"
      color="secondary"
      floating
      app
      elevation="0"
    >
      <v-list
        nav
      >
        <img
          v-if="!miniVariant"
          width="128"
          height="64"
          :src="logo"
          class="ml-4 mt-8 mb-8"
          alt="Login"
        >
        <img
          v-else
          width="48"
          height="64"
          :src="logoMin"
          class="ml-1 mt-8 mb-8"
          alt="Login"
        >
        <v-spacer />
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          class="justify-center"
          exact-active-class="selected"
          router
          exact
          nuxt
        >
          <v-list-item-icon>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-light" v-text="item.title" />
        </v-list-item>
      </v-list>
      <template #append>
        <v-btn
          v-if="drawer"
          large
          icon
          @click="miniVariant = !miniVariant"
        >
          <v-icon v-if="!miniVariant">
            mdi-chevron-left
          </v-icon>
          <v-icon v-else>
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import notification from '@/components/notification'

export default {
  components: {
    notification
  },
  data () {
    return {
      miniVariant: false,
      drawer: true,

      items: [
        {
          icon: 'mdi-home',
          title: 'Accueil',
          to: '/'
        },
        {
          icon: 'mdi-form-textbox',
          title: 'Prosit Maker',
          to: '/prosits/add'
        },
        {
          icon: 'mdi-file-document-multiple',
          title: 'Prosits',
          to: '/prosits'
        },
        {
          icon: 'mdi-account-group',
          title: 'Kivaferkoi',
          to: '/kivaferkoi'
        },
        {
          icon: 'mdi-cog-outline',
          title: 'Administration',
          to: '/administration'
        }
      ],
      title: 'PrositBoost'
    }
  },
  computed: {
    notification: {
      get () {
        return this.$store.getters['notification/notification'].filter(item => item.seen === false)
      }
    },

    logo () {
      return this.$vuetify.theme.dark ? process.env.api_url + '/images/logodark.svg' : process.env.api_url + '/images/logolight.svg'
    },

    logoMin () {
      return this.$vuetify.theme.dark ? process.env.api_url + '/images/Logo_mini_light_variant.svg' : process.env.api_url + '/images/Logo_mini_dark_variant.svg'
    }
  },
  mounted () {
    if (this.$auth.loggedIn) {
      this.$store.dispatch('prosit/fetch', this.$auth.getToken('local'))
      this.$store.dispatch('kivaferkoi/fetch', this.$auth.getToken('local'))
      this.$store.dispatch('user/fetch', this.$auth.getToken('local'))
      this.$store.dispatch('team/fetch', this.$auth.getToken('local'))
      this.$store.dispatch('notification/fetch', {
        token: this.$auth.getToken('local'),
        user: this.$auth.user._id
      })
      this.$store.dispatch('conf/fetch', this.$auth.getToken('local')).then((resp) => {
        if (resp.numProsit) {
          this.$store.dispatch('team/fetchCurrentTeam', {
            token: this.$auth.getToken('local'),
            num: resp.numProsit
          })
        }
      })
    }

    this.socket = this.$nuxtSocket({
      name: 'main'
    })

    this.socket.on('connection', (data) => {
      console.log(data)
    })

    // Pour chaques event de type contact on recharge les notifications
    this.socket.on('notification', (data) => {
      if (data.doc.receiver._id === this.$auth.user._id) {
        this.$toast.info(data.doc.title)
        /* this.$toast({
          component: notification,
          props: {
            name: data.doc.author.name,
            icon: data.doc.info.icon,
            to: data.doc.to,
            created: data.doc.created,
            title: data.doc.title,
            avatar: data.doc.author.avatar,
            _id: data.doc._id,
            seen: false
          }
        }) */
      }
      this.$store.dispatch('notification/fetch', { token: this.$auth.getToken('local'), user: this.$auth.user._id })
    })

    this.socket.on('kivaferkoi', (data) => {
      if (data.action === 'fetch') {
        this.$store.dispatch('kivaferkoi/fetch', {
          token: this.$auth.getToken('local')
        })
      }
    })

    this.socket.on('prosit', (data) => {
      if (data.action === 'fetch') {
        this.$store.dispatch('prosit/fetch', {
          token: this.$auth.getToken('local')
        })
      }
    })

    this.socket.on('numProsit', (data) => {
      if (data.action === 'fetch') {
        this.$store.dispatch('team/fetchCurrentTeam', {
          token: this.$auth.getToken('local'),
          numProsit: data.numProsit
        })
      }
    })
  }
}
</script>

<style>
>>> .v-dialog {
  box-shadow: none;
}

/*Arriere plan de l'application*/
.theme--dark.v-application {
  background: url('../assets/svg/background_dark.svg') no-repeat center fixed !important;
  -webkit-background-size: cover !important;
  background-size: cover !important;
}

.theme--light.v-application {
  background: url('../assets/svg/background_light.svg') no-repeat center fixed !important;
  -webkit-background-size: cover !important;
  background-size: cover !important;
}

/*Couleur du drawer*/
>>> .theme--dark.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
  background-color: rgba(255, 255, 255, 0);
}

>>> .theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
  background-color: rgba(255, 255, 255, 0);
}

>>> .v-navigation-drawer__border {
  height: 0;
  width: 0;
}

>>> .v-list-item__icon .v-list-group__header__prepend-icon {
  margin-right: 0 !important;
}

>>> .v-autocomplete__content.v-menu__content {
  border-radius: 28px;
  /*border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;*/
}

>>> .theme--dark.v-badge .v-badge__badge::after {
  border-color: var(v--background-base);
}

>>> .v-menu__content {
  border-radius: 28px;
  background: var(v--background-base);
}

>>> .v-menu__content::-webkit-scrollbar {
  width: 15px;
}

>>> .theme--light .v-menu__content::-webkit-scrollbar-track {
  background: #F8F8F8;
  border-left: 1px solid #F8F8F8;
}

>>> .theme--light .v-menu__content::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #F8F8F8;
  border-radius: 7px;
}

>>> .theme--light .v-menu__content::-webkit-scrollbar-thumb:hover {
  background: black;
}

>>> .theme--dark .v-menu__content::-webkit-scrollbar-track {
  background: #232323;
  border-left: 1px solid #232323;
}

>>> .theme--dark .v-menu__content::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #232323;
  border-radius: 250px;
}

>>> .theme--dark .v-menu__content::-webkit-scrollbar-thumb:hover {
  background: #1e1e1e;
}

>>> .v-list .v-select-list .v-sheet .theme--dark .theme--dark {
  background: #343434;
  border-color: #343434;
}

>>> .v-text-field--rounded .v-select--is-menu-active {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

>>> .v-text-field .v-text-field .v-input__control, .v-text-field .v-input__slot {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
</style>
