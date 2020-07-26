<template>
  <b-modal
    id="ModalTodo">
    <h1>{{todo.title || 'Wait for data to load'}}</h1>
    <div v-if="!edit">
      <strong v-if="todo.completed">Is completed</strong>
      <h5 v-else>
        Will notify at {{new Date(todo.pushDate).toLocaleString()}}</h5>
    </div>
    <b-form v-else>
      <b-form-group>

      </b-form-group>
    </b-form>
    <b-button
      size="sm"
      variant="outline-secondary"
      class="mt-2"
      @click="edit=!edit">
      Edit
    </b-button>
  </b-modal>
</template>

<script>
import { useState } from '@u3u/vue-hooks';
// import { watch } from '@vue/composition-api';
// import { ref } from '@vue/composition-api';

export default {
  name: 'Modal',
  props: ['todo'],
  // eslint-disable-next-line
  data: () => {
    return {
      edit: false,
    };
  },
  setup() {
    const { indexTodo } = useState('todos', [
      'indexTodo',
    ]);

    return {
      indexTodo,
    };
  },
};
</script>
