<template>
  <div class="container-sm mt-2 mb-3">
    <b-form @submit.prevent="addNewTodo" @reset="resetForm">
      <b-form-group
        id="new-todo"
        label="Type new Todo"
        label-for="newTodo"
        label-class="h5">
        <b-form-input
          id="new-todo"
          v-model="todo"
          type="text"
          required
          placeholder="Add new Todo...">
        </b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-radio-group v-model="badge">
          <b-form-radio :value="null" size="lg">
            No Badge
          </b-form-radio>
          <b-form-radio value="1" size="lg">
            Normal priority
            <b-badge variant="primary">Normal</b-badge>
          </b-form-radio>
          <b-form-radio value="2" size="lg">
            High priority
            <b-badge variant="warning" class="text-white">High</b-badge>
          </b-form-radio>
          <b-form-radio value="3" size="lg">
            Critical priority
            <b-badge variant="danger">Critical</b-badge>
          </b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-button class="mr-2" type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="outline-warning">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { useActions } from '@u3u/vue-hooks';
import { ref } from '@vue/composition-api';

export default {
  name: 'Form',
  setup() {
    const todo = ref('');
    const badge = ref(null);
    const { createTodo } = useActions('todos', [
      'createTodo',
    ]);

    const addNewTodo = () => {
      createTodo({
        title: todo.value.trim(),
        badge: badge.value,
      });
      todo.value = '';
      badge.value = null;
    };

    const resetForm = () => {
      todo.value = '';
      badge.value = null;
    };

    return {
      addNewTodo,
      resetForm,
      todo,
      badge,
    };
  },
};
</script>

<style lang="scss">
</style>
