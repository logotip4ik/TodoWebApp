<template>
  <div>
    <Navbar/>
      <div class="container">
        <b-collapse id="formCollaps">
          <Form ref="form" />
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
        </transition-group>
      </div>
    <transition
      name="fade"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter">
      <b-spinner
        v-if="loading"
        variant="info"
        label="Loading..."
        style="width: 3rem; height: 3rem;"
        class="spinner_"/>
      <NoneState v-if="!loading && (todos === null || todos.length === 0)"/>
    </transition>
    <b-button
      pill
      @click="collapsForm"
      variant="info"
      class="addTodo">
      <p class="h4 my-1"><b-icon-plus-circle /></p>
    </b-button>
    <Modal
      v-if="!loading"/>
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

export default {
  name: 'Todos',
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
      // eslint-disable-next-line
      const { _id, completed } = todos.value[index];
      updateTodo({
        todo: {
          _id,
          completed: !completed,
        },
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
    };
  },
  methods: {
    collapsForm() {
      this.$root.$emit('bv::toggle::collapse', 'formCollaps');
      const wait = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });
      wait(400).then(() => {
        this.$refs.form.$refs.inputFocus.$el.focus();
      });
    },
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);
      // eslint-disable-next-line
      element.style.height = this.prevHeight;

      setTimeout(() => {
        // eslint-disable-next-line
        element.style.height = height;
      });
    },
    afterEnter(element) {
      // eslint-disable-next-line
      element.style.height = 'auto';
    },
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
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
.list-enter-active, .list-leave-active {
  transition: all .5s;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateX(30px);
}
</style>
