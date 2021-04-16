<template>
  <v-container :class="$vuetify.theme.dark ? 'card_background_dark' : 'card_background_light'" style="min-height: 800px">
    <v-text-field
      v-if="$auth.user.role >= 2"
      v-model="toPick"
      flat
      solo
      placeholder="Nombre de personnes a tiré au sort"
      background-color="secondary"
      @keypress.enter="shuffle"
    />
    <v-row class="d-flex justify-center ">
      <v-col cols="3">
        <v-card
          color="secondary"
          rounded="lg"
          flat
        >
          <v-card-title>
            Les tirés au sort
          </v-card-title>
          <v-card-text>
            <v-list color="secondary">
              <template v-for="(item, i) in picked">
                <v-list-item :key="i">
                  <v-list-item-avatar>
                    <v-img class="avatar" :src="item.avatar ? item.avatar : avatar" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.surname }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-autocomplete
                  :key="'combobox' + i"
                  v-model="item.pickedSummary"
                  :items="prositSummary"
                  flat
                  solo
                  background-color="background"
                  @change="emit({ action: 'select', item: item.pickedSummary, user: item })"
                  @click:clear="emit({action: 'remove', item: item.pickedSummary, user: item})"
                />
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          color="secondary"
          rounded="lg"
          flat
        >
          <v-card-title>
            Pas encore tirés au sort
          </v-card-title>
          <v-card-text>
            <v-list color="secondary">
              <v-list-item v-for="(item, i) in kivaferkoi.notYetPicked" :key="i">
                <v-list-item-avatar>
                  <v-img class="avatar" :src="item.avatar ? item.avatar : avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.surname }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          color="secondary"
          rounded="lg"
          flat
        >
          <v-card-title>
            Déjà tirés au sort
          </v-card-title>
          <v-card-text>
            <v-list color="secondary">
              <v-list-item v-for="(item, i) in kivaferkoi.alreadyPicked" :key="i">
                <v-list-item-avatar>
                  <v-img class="avatar" :src="item.avatar ? item.avatar : avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.surname }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Kivaferoi',
  data () {
    return {
      toPick: 0,
      windowSize: {
        x: 0,
        y: 1
      },
      pickedSummary: [],
      temp: '',
      choosenSummary: ''
    }
  },
  computed: {
    kivaferkoi: {
      get () {
        return this.$store.getters['kivaferkoi/kivaferkoi']
      }
    },

    picked: {
      get () {
        const out = this.$store.getters['kivaferkoi/picked']
        return out.slice()
      },

      set (value) {
        this.$store.dispatch('kivaferkoi/update', { token: this.$auth.getToken('local', value) })
      }
    },

    numProsit: {
      get () {
        return this.$store.getters['conf/conf'].numProsit
      }
    },

    prositSummary: {
      get () {
        if (this.numProsit) {
          const out = []
          this.$store.getters['prosit/prosits']
            .filter(item => item.prositNumber === this.numProsit)[0]?.summary
            // On récupère uniquement les parties incluant une etude
            .filter(item => item.toLowerCase().includes('etude'))
            // On copie ce tableau pour pouvoir le changer a loisir
            .slice()
            .forEach((item) => {
              out.push({ text: item, value: item, disabled: false })
            })
          // On récupère le prosit
          return out
        }
        return []
      }
    },

    avatar () {
      return process.env.api_url + '/images/user_homme.svg'
    }
  },
  mounted () {
    this.socket = this.$nuxtSocket({
      name: 'main'
    })

    // On ecoute le chanel kivaferkoi
    this.socket.on('kivaferkoi', (data) => {
      // On récupère le PA a update
      const index = this.prositSummary.findIndex((item) => {
        return item.value === data.item
      })
      // Dans le cas du delete l'item est null mais on doit eviter ce cas de figure
      if (data.item !== null) {
        // Dans le cas d'un select
        if (data.action === 'select') {
          // Si notre tableau temporaire n'a pas encore l'user
          if (this.pickedSummary.filter(item => item.user === data.user._id).length === 0) {
            // On ajoute l'user a notre tableau temporaire
            this.pickedSummary.push({
              user: data.user._id,
              value: data.item
            })
            // On disable pour les autres ce PA
            this.prositSummary[index].disabled = true
          } else {
            // Dans le cas ou notre user à déjà fais un choix
            // On récupère notre objet avec l'ancienne partie qu'il avait choisie
            const tempIndex = this.pickedSummary.findIndex((item) => {
              return item.user === data.user._id
            })

            // On recupère maintenant l'index de l'array princpal correspondant à l'ancienne partie choisie
            const tempIndex2 = this.prositSummary.findIndex((item) => {
              return item.value === this.pickedSummary[tempIndex].value
            })

            // On rend l'ancienne partie de nouveau disponbile
            this.prositSummary[tempIndex2].disabled = false
            // On rend le nouveau choix indisponible
            this.prositSummary[index].disabled = true
            // On update le tableau temporaire pour le prochain choix
            this.pickedSummary[data.user._id].value = data.item
          }
        } else {
          // Dans le cas ou c'est un remove on rend simplement la partie disponible à nouveau
          this.prositSummary[index].disabled = false
        }
      }
    })
  },
  methods: {
    /**
     * Permet de calculer la taille de l'ecran
     **/
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },

    shuffle () {
      this.$store.dispatch('kivaferkoi/shuffle', { size: this.toPick, token: this.$auth.getToken('local') }).then((response) => {
        if (response.status === 200) {
          for (const item in Object.entries(response.data.picked)) {
            this.$store.dispatch('notification/create', {
              token: this.$auth.getToken('local'),
              type: 2,
              icon: 'mdi-account-group',
              author: this.$auth.user,
              receiver: response.data.picked[item]._id,
              title: 'Tu as été tiré au sort pour faire une partie',
              to: '/kivaferkoi'
            })
          }
        }
      })
    },

    emit (data) {
      this.socket.emit('kivaferkoi', data)
    }
  }
}
</script>

<style scoped>
.card_background_light {
  background-image: url('../assets/svg/kivaferkoi_light.svg');
  background-size: 42em;
  background-position: right 105% bottom -22%;
  position: relative;
}

.card_background_dark {
  background-image: url('../assets/svg/kivaferkoi_dark.svg');
  background-size: 42em;
  background-position: right 105% bottom -22%;
  position: relative;
}

.light::-webkit-scrollbar {
  width: 15px;
}

.light::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.light::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.light::-webkit-scrollbar-thumb:hover {
  background: black;
}

.dark::-webkit-scrollbar {
  width: 15px;
}

.dark::-webkit-scrollbar-track {
  background: #202020;
}

.dark::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

.dark::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
