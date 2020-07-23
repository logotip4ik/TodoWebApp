<template>
  <div>
    <Navbar/>
      <div class="container">
        <b-collapse id="formCollaps">
          <Form />
        </b-collapse>
        <Todo
          v-for="(todo, index) in todos"
          :key="todo.id"
          :todo="todo"
          :class="todo.completed ? 'line-through': ''"
          @updateTodo="UpdateExTodo(index)"
          @removeTodo="RemoveExTodo(index)"/>
      </div>
    <b-spinner
      v-if="loading"
      variant="info"
      label="Loading..."
      style="width: 3rem; height: 3rem;"
      class="spinner_"/>
    <NoneState v-if="!loading && ( todos === null || todos.length === 0)"/>
    <b-button v-b-toggle.formCollaps pill variant="info" class="addTodo">
      <p class="h4 my-1"><b-icon-plus-circle /></p>
    </b-button>
  </div>
</template>

<script>
import { watch } from '@vue/composition-api';
import { useState, useActions, useRouter } from '@u3u/vue-hooks';

import Navbar from '../components/Navbar.vue';
import Form from '../components/Form.vue';
import Todo from '../components/Todo.vue';
import NoneState from '../components/NoneState.vue';

export default {
  name: 'Messages',
  components: {
    Navbar,
    Todo,
    Form,
    NoneState,
  },
  setup() {
    const { router } = useRouter();
    const { user, loading } = useState('auth', [
      'user',
      'loading',
    ]);
    const { todos } = useState('todos', [
      'todos',
    ]);
    const { logout } = useActions('auth', [
      'logout',
    ]);
    const {
      listen,
      updateTodo,
      removeTodo,
    } = useActions('todos', [
      'listen',
      'updateTodo',
      'removeTodo',
    ]);

    const UpdateExTodo = (index) => {
      updateTodo({
        index,
      });
    };

    const RemoveExTodo = (index) => {
      removeTodo({
        index,
      });
    };

    watch(user, () => {
      if (!user.value) {
        router.push('/');
      }
    });

    listen();

    return {
      UpdateExTodo,
      RemoveExTodo,
      user,
      loading,
      logout,
      todos,
      listen,
    };
  },
};
</script>

<style lang="scss">
.line-through{
  text-decoration: line-through;
}
.click{
  cursor: pointer;
}
.addTodo{
  position: fixed;
  bottom: 2rem;
  right: 1rem;
}
.spinner_{
  transition: 1s;
  position: fixed;
  top: 50%;
  left:50%;
}
</style>
