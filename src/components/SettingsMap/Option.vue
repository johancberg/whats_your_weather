<template>
  <q-item
    @click="toggleActive({ id: id, updates: { active: !setting.active } })"
    tag="label"
    clickable
    v-ripple
  >
    <q-item-section side top>
      <q-checkbox :model-value="setting.active" class="no-pointer-events" />
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
import useStorage from 'stores/storage';

export default {
  data() {
    return {};
  },
  props: {
    setting: {
      type: Object,
      required: true,
    },
    id: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    toggleActive(payload) {
      const storage = useStorage();
      storage.switchActive(payload);
    },
  },
};
</script>

<style></style>
