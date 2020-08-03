<template>
  <div
    id="app"
    :class="dark ? 'dark' : ''">
    <router-view/>
  </div>
</template>

<script>
import { useActions, useState } from '@u3u/vue-hooks';
import { watchEffect } from '@vue/composition-api';

export default {
  setup() {
    const { reAuth } = useActions('auth', [
      'reAuth',
    ]);
    reAuth();
    const { dark } = useState('todos', ['dark']);

    watchEffect(() => {
      if (dark.value) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    });

    return {
      dark,
    };
  },
};
</script>

<style lang="scss">
  body{
    background-color: #FCF7F8;
    color: #222222;
    height: 100vh;
  }
  #app{
    height: 100%;
  }
</style>
