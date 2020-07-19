<template>
<div class="container">
  <h1 class="display-1">Todo App</h1>
  <b-button
    variant="outline-info"
    v-if="!loading && !user"
    @click="loginWithGithub">
    Log in with GitHub
    <span class="icon">
      <i class="fab fa-github"></i>
    </span>
  </b-button>
  <!-- <Loading v-if="loading && !user"/> -->
</div>
</template>

<script>
import { watch } from '@vue/composition-api';
import { useState, useActions, useRouter } from '@u3u/vue-hooks';
// import Loading from '../components/Loading.vue';

export default {
  name: 'Home',
  components: {
    // Loading,
  },
  setup() {
    /* eslint-disable-next-line */
    const { router } = useRouter();
    const { user, loading } = useState('auth', [
      'user',
      'loading',
    ]);
    const { loginWithGithub } = useActions('auth', [
      'loginWithGithub',
      'logout',
    ]);
    watch(user, () => {
      /* eslint-disable-next-line */
      if (user.value) {
        router.push('/messages');
      }
    });
    return {
      user,
      loading,
      loginWithGithub,
    };
  },
};
</script>
