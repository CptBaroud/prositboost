<template>
  <v-row class="d-flex justify-center">
    <v-col cols="2">
      <v-card
        rounded="lg"
        color="secondary"
        flat
      >
        <v-card-title>
          Auteur
        </v-card-title>
        <v-card-text>
          <v-list color="secondary">
            <v-list-item>
              <v-list-item-avatar>
                <v-img v-if="currentTeam.scribe.avatar" :src="currentTeam.scribe.avatar" />
                <v-img v-else :src="avatar" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ currentTeam.scribe.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ currentTeam.scribe.surname }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card
        flat
        color="background"
      >
        <v-card-title>
          <v-list color="background" width="800">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h4 mb-2">
                  {{ title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <template v-for="(item, i) in keywords">
            <v-chip
              :key="i"
              color="primary"
              label
              class="my-1 mr-3"
            >
              {{ item }}
            </v-chip>
          </template>
        </v-card-title>
        <v-card-text>
          <v-list color="background">
            <v-list-item class="mb-4">
              <v-list-item-content>
                <v-list-item-title class="text-h6 mb-2">
                  • Contexte
                </v-list-item-title>
                <v-list-item-subtitle class="subtitle-1">
                  {{ context }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mb-4">
              <v-list-item-content>
                <v-list-item-title class="text-h6 mb-2">
                  • Contraintes
                </v-list-item-title>
                <v-list-item-subtitle v-for="(item, i) in constraints" :key="i" class="subtitle-1 mb-1">
                  {{ item }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mb-4">
              <v-list-item-content>
                <v-list-item-title class="text-h6 mb-2">
                  • Généralisation
                </v-list-item-title>
                <v-list-item-subtitle class="subtitle-1">
                  {{ generalization }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mb-4">
              <v-list-item-content v-if="Array.isArray(problematics)">
                <v-list-item-title class="text-h6 mb-2">
                  • Problématiques
                </v-list-item-title>
                <v-list-item-subtitle v-for="(item, i) in problematics" :key="i" class="subtitle-1 mb-1 text--truncate">
                  {{ item }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content v-else>
                <v-list-item-title class="text-h6 mb-2">
                  • Problématique
                </v-list-item-title>
                <v-list-item-subtitle class="subtitle-1">
                  {{ problematics[0] }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mb-4">
              <v-list-item-content>
                <v-list-item-title class="text-h6 mb-2">
                  • Hypothèses
                </v-list-item-title>
                <v-list-item-subtitle v-for="(item, i) in hypotesies" :key="i" class="subtitle-1 mb-1">
                  {{ item }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mb-4">
              <v-list-item-content>
                <v-list-item-title class="text-h6 mb-2">
                  • Plan d'action
                </v-list-item-title>
                <v-list-item-subtitle v-for="(item, i) in summary" :key="i" class="subtitle-1 mb-1">
                  {{ item }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'See',
  data () {
    return {
      title: '',
      keywords: [],
      constraints: [],
      context: '',
      generalization: '',
      problematics: [],
      hypotesies: [],
      summary: []
    }
  },
  computed: {
    currentTeam: {
      get () {
        return this.$store.getters['team/currentTeam']
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

    this.socket.on('connection', (data) => {
      console.log(data)
    })

    this.socket.on('prosit', (data) => {
      if (data.action !== 'push' && data.action !== 'remove') {
        this.$data[data.type] = data.data
      } else {
        this.$data[data.type] = data.array
      }
    })
  }
}
</script>
