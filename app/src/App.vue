<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { useActions } from '@u3u/vue-hooks';

export default {
  setup() {
    const { reAuth } = useActions('auth', [
      'reAuth',
    ]);
    reAuth();
  },
};
</script>

<style lang="scss">
  body{
    background-color: #FCF7F8;
    color: #222222;
  }
</style>
