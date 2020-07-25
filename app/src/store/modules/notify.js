import Push from 'push.js';

export default {
  namespaced: true,
  state: {
    asked: false,
  },
  actions: {
    async askForPush() {
      try {
        const asked = JSON.parse(localStorage.getItem('asked'));
        if (asked) return;
        // eslint-disable-next-line
      } catch (err) {}
      Push.Permission.request(() => {
        localStorage.asked = true;
      }, () => {
        localStorage.asked = true;
      });
    },
    async checkAsked({ state }) {
      try {
        state.asked = JSON.parse(localStorage.getItem('asked')) || false;
        // eslint-disable-next-line
      } catch(err) {}
    },
  },
};
