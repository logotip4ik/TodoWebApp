<template>
  <div
    :class="dark ? 'dark' : ''"
    style="height: 100%; transition: all 0.5s">
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
            :dark="dark"
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
        :variant="dark ? 'light' : 'info'"
        label="Loading..."
        style="width: 3rem; height: 3rem;"
        class="spinner_"/>
      <NoneState
        :style="dark ? 'color: #fafafa' : ''"
        v-if="!loading && (todos === null || todos.length === 0)"/>
    </transition>
    <b-button-toolbar key-nav class="addTodo">
      <b-button-group>
        <b-button
          @click="collapsForm"
          :variant="dark ? 'light' : 'info'"
          :class="dark ? 'shadow left-button-dark' : 'shadow left-button'">
          <p class="h4 my-auto"><b-icon-plus /></p>
        </b-button>
        <!-- <div class="line_" /> -->
        <transition
          name="fade"
          mode="out-in">
        <b-button
          :variant="dark ? 'light' : 'info'"
          @click="toggleMode"
          :class="dark ? 'shadow right-button-dark' : 'shadow right-button'">
            <p v-if="dark" class="h4 my-auto"><b-icon-sun /></p>
            <p v-else class="h4 my-auto"><b-icon-moon /></p>
        </b-button>
        </transition>
      </b-button-group>
    </b-button-toolbar>
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

    watch(user, () => {
      if (!user.value) {
        router.push('/');
      }
    });

    const { todos, dark } = useState('todos', [
      'todos',
      'dark',
    ]);
    const {
      listen,
      updateTodo,
      removeTodo,
      settingsTodo,
      toggleMode,
    } = useActions('todos', [
      'listen',
      'updateTodo',
      'removeTodo',
      'settingsTodo',
      'toggleMode',
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

    const darkMode = () => {
      try {
        const Dark = localStorage.dark;
        if (JSON.parse(Dark)) {
          toggleMode();
        } else;
        // eslint-disable-next-line
      } catch (error) {}
    };

    darkMode();

    watch(dark, () => {
      if (dark.value) {
        localStorage.dark = true;
      } else {
        localStorage.dark = false;
      }
    });

    listen();

    return {
      UpdateExTodo,
      RemoveExTodo,
      SettingsExTodo,
      toggleMode,
      user,
      loading,
      todos,
      dark,
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
.dark{
  background-color: #222222!important;
}
.click{
  cursor: pointer;
}
.addTodo{
  position: fixed;
  bottom: 2rem;
  right: 1rem;
}
.left-button{
  background: #66CED6;
  border-color: #66CED6;
  color: #222222;
}
.left-button-dark{
  background: #0C2E31;
  border-color: #0C2E31;
  color: #fafafa;
}
.right-button{
  background: #66CED6;
  border-color: #66CED6;
  color: #222222;
}
.right-button-dark{
  background: #0C2E31;
  border-color: #0C2E31;
  color: #fafafa;
}
.line_{
  height: 100%;
  width: 2px;
  background: #6c757d;
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
