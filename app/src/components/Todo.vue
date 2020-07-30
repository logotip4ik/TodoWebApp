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
        {{ todo.badgeText !== '' ? todo.badgeText : 'Normal'}}
      </b-badge>
      <b-badge
        v-if="todo.badge == 2"
        variant="warning"
        class="text-white badgeForTodo">
        {{ todo.badgeText !== '' ? todo.badgeText : 'High'}}</b-badge>
      <b-badge
        v-if="todo.badge == 3"
        variant="danger"
        class="badgeForTodo">
        {{ todo.badgeText !== '' ? todo.badgeText : 'Critical'}}</b-badge>
      <b-button
        style="padding: 0 0.05em!important;"
        variant="outline-secondary"
        @click="settingsTodo"
        class="settings">
        <b-icon-gear
          style="my-0"
          scale="0.8"
          aria-label="SettingsForTodo"/>
      </b-button>
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

    if (!this.todo.completed || this.todo.pushDate == null) notify(this.index);

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
      this.$bvModal.show('ModalTodo');
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
  position: absolute;
  top: 4px;
  left: 4px;
}
</style>
