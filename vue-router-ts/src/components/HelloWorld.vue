<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex';
import { type State } from '../store';

const {getters, state}  = useStore<State>()
console.log('[state]', state.user.loading)
console.log('[getters]', getters["user/isLogin"])


defineProps<{ msg: string }>()
const count = ref(0)
</script>

<template>
  <h1>test</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
