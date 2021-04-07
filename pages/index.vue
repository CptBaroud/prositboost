<template>
  <!--<v-container class="mt-2" style="height: 1080px" :class="$vuetify.theme.dark ? 'card-background-dark' : 'card-background-light'">-->
  <v-container class="mt-2">
    <v-row style="padding-top: 0">
      <v-col cols="9">
        <v-row style="padding-top: 0">
          <v-col cols="12">
            <v-card
              elevation="0"
              color="secondary"
              :class="$vuetify.theme.dark ? 'card-background-dark' : 'card-background-light'"
              rounded="lg"
            >
              <v-card-title class="text-md-h5 text-sm-h4 mb-8" style="color: var(--v-text-base)">
                Bonjour, {{ $auth.user.name }}
              </v-card-title>
              <v-card-text v-if="currentTeam" class="text-md-h6 font-weight-light">
                <span v-if="currentTeam.animateur._id === $auth.user._id">
                  Tu es animateur sur ce prosit
                </span>
                <span v-else-if="currentTeam.gestionaire._id === $auth.user._id">
                  Tu es gestionaire sur ce prosit
                </span>
                <span v-else-if="currentTeam.scribe._id === $auth.user._id">
                  Tu es scribe sur ce prosit
                </span>
                <span v-else-if="currentTeam.secretaire._id === $auth.user._id">
                  Tu es secretaire sur ce prosit
                </span>
                <span v-else>
                  Tu n'as pas de role pour ce prosit
                </span>
                <br>
                <span v-if="kivaferkoi.picked.filter(item => item._id === $auth.user._id).length > 0">
                  et tu as une partie à faire pour ce prosit
                </span>
                <span v-else>et tu n'as pas de partie à faire</span>
              </v-card-text>
              <v-card-actions class="my-4">
                <v-btn
                  color="primary"
                  class="mx-4 my-2"
                >
                  Créer un prosit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col
            lg="4"
            md="6"
          >
            <v-card
              color="secondary"
              rounded="lg"
              elevation="0"
            >
              <v-card-title style="padding-bottom: 0">
                <v-spacer />
                <v-btn
                  nuxt
                  icon
                  small
                  to="/prosits"
                >
                  <v-icon>
                    mdi-dots-horizontal
                  </v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text v-if="currentTeam">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-md-h5">
                      Equipe n°{{ conf.numProsit % 9 }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-md-h6 text--secondary">
                      Prosit {{ conf.numProsit }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-row class="avatars">
                      <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                          <v-avatar class="avatars__item" v-bind="attrs" v-on="on">
                            <v-img class="avatar" :src="currentTeam.animateur.avatar ? currentTeam.animateur.avatar : avatar" />
                          </v-avatar>
                        </template>
                        <span>Animateur : {{ currentTeam.animateur.name }}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                          <v-avatar class="avatars__item" v-bind="attrs" v-on="on">
                            <v-img class="avatar" :src="currentTeam.scribe.avatar ? currentTeam.scribe.avatar : avatar" />
                          </v-avatar>
                        </template>
                        <span>Scribe : {{ currentTeam.scribe.name }}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                          <v-avatar class="avatars__item" v-bind="attrs" v-on="on">
                            <v-img class="avatar" :src="currentTeam.secretaire.avatar ? currentTeam.secretaire.avatar : avatar" />
                          </v-avatar>
                        </template>
                        <span>Secretaire : {{ currentTeam.secretaire.name }}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                          <v-avatar class="avatars__item" v-bind="attrs" v-on="on">
                            <v-img class="avatar" :src="currentTeam.gestionaire.avatar ? currentTeam.gestionaire.avatar : avatar" />
                          </v-avatar>
                        </template>
                        <span>Gestionaire : {{ currentTeam.gestionaire.name }}</span>
                      </v-tooltip>
                    </v-row>
                  </v-list-item-action>
                </v-list-item>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            lg="5"
            md="6"
          >
            <v-card
              v-if="kivaferkoi.picked"
              color="secondary mb-4"
              rounded="lg"
              elevation="0"
            >
              <v-card-title style="padding-bottom: 0">
                <v-spacer />
                <v-btn
                  nuxt
                  icon
                  small
                  to="/kivaferkoi"
                >
                  <v-icon>
                    mdi-dots-horizontal
                  </v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-md-h5">
                      Tirés au sort
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-md-h6 font-weight-light text--secondary">
                      {{ kivaferkoi.picked.length }} personnes
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-row class="avatars">
                      <v-tooltip v-for="(item, i) in kivaferkoi.picked" :key="i" bottom>
                        <template #activator="{ on, attrs }">
                          <v-avatar class="avatars__item" v-bind="attrs" v-on="on">
                            <v-img class="avatar" :src="item.avatar ? item.avatar : avatar" />
                          </v-avatar>
                        </template>
                        <span>{{ item.name }}</span>
                      </v-tooltip>
                    </v-row>
                  </v-list-item-action>
                </v-list-item>
              </v-card-text>
            </v-card>
            <v-card
              v-if="kivaferkoi.notYetPicked"
              color="secondary mb-4"
              rounded="lg"
              elevation="0"
            >
              <v-card-title style="padding-bottom: 0">
                <v-spacer />
                <v-btn
                  nuxt
                  icon
                  small
                  to="/kivaferkoi"
                >
                  <v-icon>
                    mdi-dots-horizontal
                  </v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-md-h5">
                      Pas encore tirés
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-md-h6 font-weight-light text--secondary">
                      {{ kivaferkoi.notYetPicked.length }} personnes
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-row class="avatars">
                      <v-tooltip v-for="(item, i) in kivaferkoi.notYetPicked" :key="i" bottom>
                        <template #activator="{ on, attrs }">
                          <v-avatar class="avatars__item" v-bind="attrs" v-on="on">
                            <v-img class="avatar" :src="item.avatar ? item.avatar : avatar" />
                          </v-avatar>
                        </template>
                        <span>{{ item.name }}</span>
                      </v-tooltip>
                    </v-row>
                  </v-list-item-action>
                </v-list-item>
              </v-card-text>
            </v-card>
            <v-card
              v-if="kivaferkoi.alreadyPicked"
              color="secondary"
              rounded="lg"
              elevation="0"
            >
              <v-card-title style="padding-bottom: 0">
                <v-spacer />
                <v-btn
                  nuxt
                  icon
                  small
                  to="/kivaferkoi"
                >
                  <v-icon>
                    mdi-dots-horizontal
                  </v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-md-h5">
                      Déjà tirés
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-md-h6 font-weight-light text--secondary">
                      {{ kivaferkoi.alreadyPicked.length }} personnes
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-row class="avatars">
                      <v-tooltip v-for="(item, i) in kivaferkoi.alreadyPicked" :key="i" bottom>
                        <template #activator="{ on, attrs }">
                          <v-avatar class="avatars__item" v-bind="attrs" v-on="on">
                            <v-img class="avatar" :src="item.avatar ? item.avatar : avatar" />
                          </v-avatar>
                        </template>
                        <span>{{ item.name }}</span>
                      </v-tooltip>
                    </v-row>
                  </v-list-item-action>
                </v-list-item>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            lg="3"
            md="6"
          >
            <v-card color="secondary" rounded="lg" flat>
              <v-card-title>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-md-h5">
                      Les liens utiles
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-card-title>
              <v-card-text>
                <v-list
                  color="secondary"
                >
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon
                        color="primary"
                      >
                        mdi-discord
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        Discord
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <a href="https://discord.gg/fqVWdAgp">Viens</a>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="3">
        <v-card
          color="secondary"
          rounded="lg"
          flat
        >
          <v-card-title>
            Prosits
          </v-card-title>
          <v-card-text>
            <v-data-iterator
              no-data-text="Aucuns prosits pour le moment"
              hide-default-footer
              :items="prosits"
              :items-per-page="5"
            >
              <template #item="data">
                <v-hover
                  v-slot="{ hover }"
                >
                  <prositCard
                    :hover="hover"
                    :item="data.item"
                    background="background"
                  />
                </v-hover>
              </template>
            </v-data-iterator>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import prositCard from '@/components/prositCard'
export default {
  components: {
    prositCard
  },
  data () {
    return {
      teamDisplay: false
    }
  },
  computed: {
    prosits: {
      get () {
        return this.$store.getters['prosit/prosits']
      }
    },

    kivaferkoi: {
      get () {
        return this.$store.getters['kivaferkoi/kivaferkoi']
      }
    },

    currentTeam: {
      get () {
        return this.$store.getters['team/currentTeam']
      }
    },

    conf: {
      get () {
        return this.$store.getters['conf/conf']
      }
    },

    avatar () {
      return process.env.api_url + '/images/user_homme.svg'
    }
  },
  mounted () {
    this.$store.dispatch('team/fetchCurrentTeam', { token: this.$auth.getToken('local'), num: this.conf.numProsit })
  }
}
</script>

<style>
.card-background-light {
  background-image: url('../assets/svg/home_light.svg');
  background-size: 42em;
  background-position: right 19% bottom 109%;
  position: relative;
}

.card-background-dark {
  background-image: url('../assets/svg/home_dark.svg');
  background-size: 42em;
  background-position: right 19% bottom 109%;
  position: relative;
}

.card-gradient-light {
  background: rgba( 234, 109, 93, 0.55 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}

.card-gradient-dark {
  background: rgba( 36, 36, 38, 0.25 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}

.list-date-ticket {
  color: var(--v-white-base);
  opacity: 0.48;
  max-width: 240px
}

.list-title-ticket {
  color: var(--v-white-base);
  max-width: 250px
}

@media (max-width: 1264px){
  .card-background-light {
    background-size: 38em;
    background-position: right 14% bottom 107%;
  }

  .card-background-dark {
    background-size: 38em;
    background-position: right 14% bottom 107%;
  }
}

@media (max-width: 600px){
  .card-background-light {
    background-size: 20em;
    background-position: right 6% bottom 90%;
  }

  .card-background-dark {
    background-size: 20em;
    background-position: right 6% bottom 90%;
  }

  .list-date-ticket {
    max-width: 140px;
  }

  .list-title-ticket {
    max-width: 150px;
  }
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

.no-scrollbar::-webkit-scrollbar {
  width: 0;
}

.dark::-webkit-scrollbar {
  width: 15px;
  border-radius: 20px;
}

.dark::-webkit-scrollbar-track {
  background: #232323;
  border-left: 1px solid #232323;
}

.dark::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #232323;
  border-radius: 250px;
}

.dark::-webkit-scrollbar-thumb:hover {
  background: #1e1e1e;
}

@keyframes metronome-example {
  from {
    transform: scale(.5);
  }

  to {
    transform: scale(1);
  }
}

.v-avatar--metronome {
  animation-name: metronome-example;
  animation-iteration-count: 1;
  animation-direction: alternate;
}

/* Propriété CSS permettant a la bordure de l'alert de faire la meme taille que la liste */

>>> .v-alert {
  margin-bottom: 0;
  padding: 0 16px 0 16px;
}

>>> .v-alert .v-list-item__action {
  margin: 0;

}

>>> .v-alert .v-list-item__content {
  padding: 0;
}

>>> .v-alert__border {
  border-radius: 20px !important;
  border-width: 6px;
}

.avatars {
  display: flex;
  list-style-type: none;
  margin: auto;
  padding: 0px;
  flex-direction: row;
}

.avatars__item {
  background-color: var(--v-background-base);
  border: 2px solid var(--v-primary-base);
  border-radius: 100%;
  color: #ffffff;
  display: block;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: 100;
  height: 45px;
  width: 45px;
  line-height: 45px;
  text-align: center;
  transition: margin 0.1s ease-in-out;
  overflow: hidden;
  margin-left: -10px;
}

.avatars__item:first-child {
  z-index: 5;
}

.avatars__item:nth-child(2) {
  z-index: 4;
}

.avatars__item:nth-child(3) {
  z-index: 3;
}

.avatars__item:nth-child(4) {
  z-index: 2;
}

.avatars__item:nth-child(5) {
  z-index: 1;
}

.avatars__item:last-child {
  z-index: 0;
}

.avatars__item img {
  width: 100%;
}

</style>
