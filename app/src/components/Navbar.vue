<template>
  <div>
    <b-navbar style="background-color: #66CED6">
      <b-navbar-brand href="/">
        <h4 style="margin: 0!important;padding: 0!important;">TodoApp</h4>
      </b-navbar-brand>
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
