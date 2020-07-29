<template>
<div class="container">
  <h1 class="display-1">Todo App</h1>
  <b-button
    variant="outline-info"
    v-if="!loading && !user"
    @click="loginWithGithub">
    Log in with GitHub
    <span class="icon">
      <i class="fab fa-500px fa-github" />
    </span>
  </b-button>
  <div
    v-if="loading && !user"
    class="d-flex justify-content-between align-items-center">
    <strong>Waiting you for login...</strong>
    <b-spinner
      style="width: 3rem; height: 3rem;"
      class="ml-auto" />
  </div>
</div>
</template>

<script>
import { watch } from '@vue/composition-api';
import { useState, useActions, useRouter } from '@u3u/vue-hooks';

export default {
  name: 'Home',
  setup() {
    // eslint-disable-next-line
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
      // eslint-disable-next-line
      if (user.value) {
        router.push('/todos');
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
