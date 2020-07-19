import feathers from '../../feathers';

export default {
  namespaced: true,
  state: {
    user: null,
    loading: false,
  },
  actions: {
    async reAuth({ state }) {
      try {
        state.loading = true;
        const user = await feathers.reAuthenticate();
        state.user = user.user;
        /* eslint-disable-next-line */
      } catch (error) {}
      state.loading = false;
    },
    async logout({ state }) {
      try {
        await feathers.logout();
        /* eslint-disable-next-line */
      } catch (error) {}
      state.user = null;
    },
    async loginWithGithub({ state }) {
      state.loading = true;
      async function receiveMessage(event) {
        if (event.origin !== 'http://localhost:3030') {
          /* eslint-disable-next-line */
          console.log('invalid origin', event.origin);
        } else {
          const user = await feathers.authenticate({
            strategy: 'jwt',
            accessToken: event.data.token,
          });
          state.user = user.user;
        }
        state.loading = false;
      }
      window.addEventListener('message', receiveMessage, {
        once: true,
      });
      window.open('http://localhost:3030/oauth/github');
    },
  },
};
