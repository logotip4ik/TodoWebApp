import Push from 'push.js';

export default {
  namespaced: true,
  actions: {
    async askForPush() {
      if (localStorage.asked) return;
      Push.Permission.request(() => {
        localStorage.asked = true;
      }, () => {
        localStorage.asked = true;
      });
    },
  },
};
