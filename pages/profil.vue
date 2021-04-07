<template>
  <v-container class="mt-2" :class="$vuetify.theme.dark ? 'card-background-dark' : 'card-background-light'">
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center mt-4">
        <v-card
          color="secondary"
          rounded="lg"
          flat
          widt="600"
          max-width="600"
        >
          <v-card-text>
            <v-list style="background: transparent">
              <div class="mb-8">
                <v-list-item class="mb-4">
                  <v-list-item-icon>
                    <v-icon>
                      mdi-account-settings
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      Parmètres du compte
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Modifier votre nom, prénom ..
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-row>
                  <v-col md="12" lg="6">
                    <v-text-field
                      v-model="name"
                      background-color="background"
                      flat
                      solo
                      placeholder="Prénom"
                    />
                  </v-col>
                  <v-col md="12" lg="6">
                    <v-text-field
                      v-model="surname"
                      background-color="background"
                      flat
                      solo
                      placeholder="Nom"
                    />
                  </v-col>
                </v-row>

                <v-list-item class="mb-4">
                  <v-list-item-avatar style="border: solid var(--v-primary-base) 2px" size="96">
                    <v-img v-if="avatar" :src="avatar" />
                    <v-icon v-else>
                      mdi-account
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-form
                      ref="uploadProfilePictureForm"
                      v-model="uploadProfilPictureValid"
                      lazy-validation
                    >
                      <v-file-input
                        v-model="uploadProfilPictureItem"
                        style="max-width: 356px"
                        accept="image/png, image/jpeg, image/bmp"
                        hide-details
                        background-color="background"
                        flat
                        solo
                      />
                    </v-form>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      class="ml-4"
                      color="primary"
                      :disabled="!uploadProfilPictureValid"
                      @click="uploadPicture"
                    >
                      Modifier
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </div>
              <div class="mb-8">
                <v-list-item class="mb-4">
                  <v-list-item-icon>
                    <v-icon>
                      mdi-lock
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      Paramètres de sécurité
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Modifier votre mot de passe, votre adresse de connexion ..
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-card
                  color="secondary"
                  flat
                >
                  <v-card-text
                    style="padding-left: 0 !important;"
                  >
                    <v-text-field
                      v-model="changePasswordItem.old"
                      background-color="background"
                      flat
                      solo
                      type="password"
                      style="max-width: 356px"
                      placeholder="Mot de passe actuel"
                      @change="checkPassword"
                    />
                    <v-form
                      ref="changePasswordForm"
                      v-model="changePasswordValid"
                      lazy-validation
                    >
                      <v-row>
                        <v-col lg="6" md="12">
                          <v-text-field
                            v-model="changePasswordItem.new"
                            :disabled="!canChangePassword"
                            background-color="background"
                            flat
                            solo
                            :rules="[
                              v => v.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/) || 'Ton mot de passe doit contenir au moins 8 charactères, une majuscule et une minuscule un chiffre et un charactère spécial'
                            ]"
                            placeholder="Nouveau mot de passe"
                          />
                        </v-col>
                        <v-col lg="6" md="12">
                          <v-text-field
                            v-model="changePasswordItem.verifyNew"
                            :disabled="!canChangePassword"
                            background-color="background"
                            :rules="[
                              v => v === changePasswordItem.new || 'Les mots de passes ne sont pas les memes'
                            ]"
                            flat
                            solo
                            placeholder="Confirmer le nouveau mot de passe"
                          />
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      class="mb-4"
                      text
                      color="primary"
                      :disabled="!changePasswordValid"
                      @click="changePassword"
                    >
                      Valider
                    </v-btn>
                  </v-card-actions>
                </v-card>
                <v-text-field
                  v-model="mail"
                  background-color="background"
                  flat
                  solo
                  hint="Attention y'a aucune verifications donc si tu te trompe tu pourras plus te connecté et je vais devoir te la changer à la main et ça va me souler"
                  placeholder="Mail"
                />
              </div>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Profil',
  data () {
    return {
      uploadProfilPictureDialog: false,
      uploadProfilPictureItem: {},
      uploadProfilPictureValid: false,

      canChangePassword: false,
      changePasswordValid: false,
      changePasswordItem: {
        old: '',
        new: '',
        verifyNew: ''
      },

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

    name: {
      get () {
        return this.$auth.user.name
      },
      set (value) {
        this.$store.dispatch('user/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user._id, name: value })
      }
    },

    surname: {
      get () {
        return this.$auth.user.surname
      },
      set (value) {
        this.$store.dispatch('user/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user._id, surname: value })
      }
    },

    mail: {
      get () {
        return this.$auth.user.mail
      },
      set (value) {
        this.$store.dispatch('agent/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user._id, mail: value })
      }
    },

    avatar: {
      get () {
        return this.$auth.user.avatar
      },
      set (value) {
        this.$store.dispatch('user/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user._id, avatar: value })
      }
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
    },

    uploadPicture () {
      const user = this.$auth.user
      delete user.password

      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })

      toBase64(this.uploadProfilPictureItem).then((response) => {
        this.$store.dispatch('user/updateProfilePicture', {
          token: this.$auth.getToken('local'),
          type: this.uploadProfilPictureItem.type,
          name: this.uploadProfilPictureItem.name,
          _id: this.$auth.user._id,
          file: response
        })
      })
    },

    checkPassword () {
      this.$store.dispatch('user/checkPassword', {
        token: this.$auth.getToken('local'),
        password: this.changePasswordItem.old,
        _id: this.$auth.user._id
      }).then((response) => {
        this.canChangePassword = response.data.isPasswordCorrect
      })
    },

    changePassword () {
      if (this.$refs.changePasswordForm.validate()) {
        this.$store.dispatch('user/changePassword', {
          token: this.$auth.getToken('local'),
          user: this.$auth.user._id,
          password: this.changePasswordItem.new
        })
      }
    }
  }
}
</script>

<style scoped>
>>> .v-text-field--enclosed .v-input__append-inner {
  padding-top: 0 !important;
}
</style>
