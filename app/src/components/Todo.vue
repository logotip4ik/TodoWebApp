<template>
  <div>
    <b-card
      class="mt-3">
        <div class="d-flex full-width col">
          <div @click="updateTodo" class="d-flex flex-9 click">
            {{todo.title}}
          </div>
          <div class="d-flex flex-1 justify-content-end">
            <b-icon-dash-square
              variant="danger"
              class="my-auto click"
              @click="removeTodo"/>
          </div>
        </div>
      <b-badge
        v-if="todo.badge == 1"
        variant="primary"
        class="badgeForTodo">
        Normal</b-badge>
      <b-badge
        v-if="todo.badge == 2"
        variant="warning"
        class="text-white badgeForTodo">
        High</b-badge>
      <b-badge
        v-if="todo.badge == 3"
        variant="danger"
        class="badgeForTodo">
        Critical</b-badge>
      <b-icon-gear
        @click="settingsTodo"
        class="settings"/>
    </b-card>
  </div>
</template>

<script>
import { useActions } from '@u3u/vue-hooks';

export default {
  name: 'Todo',
  props: ['todo', 'index'],
  created() {
    const { notify } = useActions('todos', [
      'notify',
    ]);

    notify(this.index);

    return {
      notify,
    };
  },
  methods: {
    removeTodo() {
      this.$emit('removeTodo');
    },
    updateTodo() {
      this.$emit('updateTodo');
    },
    settingsTodo() {
      this.$emit('settingsTodo');
    },
  },
};
</script>

<style lang="scss">
.flex-9{
  flex: 9;
}
.flex-1{
  flex: 1;
}
.badgeForTodo{
  position: absolute;
  top: -10%;
  right: -2%;
}
.settings{
  cursor: pointer;
  position: absolute;
  top: 5%;
  left: 0.5%;
}
</style>
