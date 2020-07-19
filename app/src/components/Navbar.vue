<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="/">TodoApp</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-button
          variant="outline-dark"
          @click="logout">
          Log Out
        </b-button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { useActions } from '@u3u/vue-hooks';

export default {
  name: 'Navbar',
  setup() {
    const { logout } = useActions('auth', [
      'logout',
    ]);
    return {
      logout,
    };
  },
};
</script>
