<script setup lang="ts">
import { hello } from '@luckin/shared';

const props = withDefaults(defineProps<{
  text?: string;
}>(), {
  text: 'World',
});

function clickHandler() {
  hello(props.text);
}
</script>

<template>
  <button
    class="openx-button"
    @click="clickHandler"
  >
    1<slot />
  </button>
</template>

