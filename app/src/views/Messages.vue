<template>
  <div>
    <Navbar/>
      <div class="container">
        <b-collapse id="formCollaps">
          <Form />
        </b-collapse>
        <transition-group
          name="list">
          <Todo
            v-for="(todo, index) in todos"
            v-bind:key="todo._id"
            :todo="todo"
            :index="index"
            :class="todo.completed ? 'line-through': ''"
            @updateTodo="UpdateExTodo(index)"
            @removeTodo="RemoveExTodo(index)"
            @settingsTodo="settingsExTodo(index)"/>
        <!-- TODO: add state for setting the todo, probably (editing, currentlyEditing) -->
          <SettingsTodo v-if="false" />
        </transition-group>
      </div>
    <transition name="fade">
      <b-spinner
        v-if="loading"
        variant="info"
        label="Loading..."
        style="width: 3rem; height: 3rem;"
        class="spinner_"/>
    </transition>
    <transition name="fade">
      <NoneState v-if="!loading && (todos === null || todos.length === 0)"/>
    </transition>
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
import SettingsTodo from '../components/SettingsTodo.vue';
import NoneState from '../components/NoneState.vue';

export default {
  name: 'Messages',
  components: {
    Navbar,
    Todo,
    Form,
    NoneState,
    SettingsTodo,
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

    const settingsExTodo = (index) => {
      console.log(index);
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
      settingsExTodo,
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
  position: fixed;
  top: 50%;
  left:50%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateX(30px);
}
</style>
