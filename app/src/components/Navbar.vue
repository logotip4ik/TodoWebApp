<template>
  <div>
    <b-navbar
      :style="dark ? 'background-color: #123E40; background-color: #0C2E31;'
        : 'background-color: #66CED6'"
      :type="dark ? 'dark' : 'light'"
      class="transition">
      <b-navbar-brand href="/">
        <h4
          style="margin: 0!important;padding: 0!important;"
          class="transition">TodoApp</h4>
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-button
          :variant="dark ? 'outline-light' : 'outline-dark'"
          @click="logout">
          Log Out
        </b-button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { useActions, useState } from '@u3u/vue-hooks';

export default {
  name: 'Navbar',
  setup() {
    const { logout } = useActions('auth', [
      'logout',
    ]);
    const { dark } = useState('todos', ['dark']);
    return {
      logout,
      dark,
    };
  },
};
</script>

<style lang="scss">
.transition{
  transition: all 0.5s;
}
</style>
