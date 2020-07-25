import Push from 'push.js';
import feathers from '../../feathers';

export default {
  namespaced: true,
  state: {
    todos: null,
    loading: false,
  },
  actions: {
    async createTodo(_, todo) {
      await feathers.service('todo').create(todo);
    },
    async updateTodo({ state }, { index }) {
      await feathers.service('todo')
        // eslint-disable-next-line
        .patch(state.todos[index]._id, {
          completed: !state.todos[index].completed,
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
            state.todos[index].completed = updatedTodo.completed;
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
        const pushDate = new Date(state.todos[index].pushDate);
        if (now.getDate() >= pushDate.getDate()
          && now.getHours() >= pushDate.getHours()
          && now.getMinutes() >= pushDate.getMinutes()
          && !state.todos[index].completed) {
          Push.create(state.todos[index].title, {
            body: 'Click to complete this todo.',
            // eslint-disable-next-line
            onClick: async () => {
              await feathers.service('todo')
              // eslint-disable-next-line
              .patch(state.todos[index]._id, {
                  completed: !state.todos[index].completed,
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
