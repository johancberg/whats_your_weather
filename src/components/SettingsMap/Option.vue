<template>
  <q-item
    @click="switchActive({ id: id, updates: { active: !setting.active }})"
    tag="label"
    clickable
    v-ripple>
      <q-item-section side top>
        <q-checkbox :value="setting.active" class="no-pointer-events"/>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ setting.name }}</q-item-label>
        <q-item-label caption>
          {{ setting.description }}
        </q-item-label>
      </q-item-section>
    </q-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      check1: false
    }
  },
  props: ['setting', 'id'],
  methods: {
    ...mapActions('data', ['switchActive'])
  }
}
</script>

<style>

</style>
