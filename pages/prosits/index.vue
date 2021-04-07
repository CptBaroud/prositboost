<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="9">
        <v-data-iterator
          no-data-text="Aucuns prosits pour le moment"
          hide-default-footer
          :items="prosits"
          :search="search"
        >
          <template #header>
            <v-text-field
              v-model="search"
              flat
              solo
              :full-width="false"
              placeholder="Recherche"
              prepend-inner-icon="mdi-magnify"
              background-color="secondary"
            />
            <v-spacer />
          </template>
          <template #default="props">
            <v-row>
              <v-col
                v-for="item in props.items"
                :key="item.name"
                cols="12"
                sm="6"
                md="4"
                lg="4"
              >
                <v-hover
                  v-slot="{ hover }"
                >
                  <prositCard
                    :item="item"
                    :hover="hover"
                  />
                </v-hover>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import prositCard from '@/components/prositCard'

export default {
  name: 'Index',
  components: {
    prositCard
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    prosits: {
      get () {
        return this.$store.getters['prosit/prosits']
      }
    },

    avatar () {
      return process.env.api_url + '/images/user_homme.svg'
    }
  }
}
</script>

<style scoped>

</style>
