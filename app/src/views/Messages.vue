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
            @settingsTodo="SettingsExTodo(index)"/>
        <!-- TODO: add state for setting the todo, probably (editing, currentlyEditing) -->
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
    <Modal
      v-if="!loading"
      :todo="todos[indexTodo]"/>
  </div>
</template>

<script>
import { watch } from '@vue/composition-api';
import { useState, useActions, useRouter } from '@u3u/vue-hooks';

import Navbar from '../components/Navbar.vue';
import Form from '../components/Form.vue';
import Todo from '../components/Todo.vue';
import NoneState from '../components/NoneState.vue';
import Modal from '../components/Modal.vue';

// TODO: add some features with this: 'Push.Permission.get() === "denied"'
// TODO: Default time if user selected some date to current time + 45 min

export default {
  name: 'Messages',
  components: {
    Navbar,
    Todo,
    Form,
    NoneState,
    Modal,
  },
  setup() {
    const { router } = useRouter();
    const { user, loading } = useState('auth', [
      'user',
      'loading',
    ]);
    const { todos, indexTodo } = useState('todos', [
      'todos',
      'indexTodo',
    ]);
    const { logout } = useActions('auth', [
      'logout',
    ]);
    const {
      listen,
      updateTodo,
      removeTodo,
      settingsTodo,
    } = useActions('todos', [
      'listen',
      'updateTodo',
      'removeTodo',
      'settingsTodo',
    ]);

    const { askForPush } = useActions('notify', [
      'askForPush',
    ]);

    askForPush();

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

    const SettingsExTodo = (index) => {
      settingsTodo({
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
      SettingsExTodo,
      user,
      loading,
      logout,
      todos,
      listen,
      indexTodo,
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
  transition: all .5s;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateX(30px);
}
</style>
