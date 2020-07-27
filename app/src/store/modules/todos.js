import Push from 'push.js';
import feathers from '../../feathers';

export default {
  namespaced: true,
  state: {
    todos: [],
    // Index of currently editing todo
    currentlyEditing: {
      title: 'No Todo selected',
      completed: true,
      pushDate: new Date(),
    },
    loading: false,
  },
  actions: {
    async createTodo(_, todo) {
      await feathers.service('todo').create(todo);
    },
    async updateTodo(_, { todo }) {
      await feathers.service('todo')
        // eslint-disable-next-line
        .patch(todo._id, todo)
        .then((res) => {
          // eslint-disable-next-line
          console.info('Object was updated: ', JSON.stringify(res));
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error(JSON.stringify(err));
        });
    },
    async removeTodo({ state }, { index }) {
      await feathers.service('todo')
        // eslint-disable-next-line
        .remove(state.todos[index]._id)
        .then((res) => {
          // eslint-disable-next-line
          console.info('Item was removed: ', JSON.stringify(res));
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error('Error ocurred: ', JSON.stringify(err));
        });
    },
    async settingsTodo({ state }, { index }) {
      state.currentlyEditing = state.todos[index];
    },
    async listen({ state }) {
      state.loading = true;
      const todos = await feathers.service('todo').find({
        query: {
          $limit: 100,
          $sort: { createdAt: -1 },
        },
      });
      state.todos = todos;
      state.loading = false;
      await feathers.service('todo').on('created', (todo) => {
        state.todos.splice(0, 0, todo);
      });
      await feathers.service('todo').on('patched', (updatedTodo) => {
        state.todos.forEach((todo, index) => {
        // eslint-disable-next-line
          if (todo._id === updatedTodo._id) {
            state.todos[index].title = updatedTodo.title;
            state.todos[index].badge = updatedTodo.badge;
            state.todos[index].completed = updatedTodo.completed;
            state.todos[index].pushDate = updatedTodo.pushDate;
          }
        });
      });
      await feathers.service('todo').on('removed', (removedTodo) => {
        // BUG: This don't work:
        // const index = state.todos.indexOf(removedTodo);
        // console.log(index);
        // if (index > -1) {
        //   state.todos.splice(index, 1);
        // }

        // But this do
        // eslint-disable-next-line
        state.todos = state.todos.filter((item) => removedTodo._id !== item._id);
      });
    },
    async notify({ state }, index) {
      (function loop() {
        let now = new Date();
        const pushdate = state.todos[index] || null;
        if (pushdate == null) return;
        const date = new Date(pushdate.pushDate);
        if (!state.todos[index].completed
          && now.getDate() >= date.getDate()
          && now.getHours() >= date.getHours()
          && now.getMinutes() >= date.getMinutes()
          && Push.Permission.has()) {
          Push.create(state.todos[index].title, {
            body: 'Click to complete this todo.',
            // eslint-disable-next-line
            onClick: async () => {
              await feathers.service('todo')
              // eslint-disable-next-line
              .patch(state.todos[index]._id, {
                  completed: true,
                })
                .then((res) => {
                // eslint-disable-next-line
                console.info('Object was updated: ', JSON.stringify(res));
                })
                .catch((err) => {
                // eslint-disable-next-line
                console.error(JSON.stringify(err));
                });
            },
          });
        }
        now = new Date(); // allow for time passing
        const delay = 60000 - (now % 60000); // exact ms to next minute interval
        setTimeout(loop, delay);
      }());
    },
  },
};
