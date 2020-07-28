<template>
  <div class="container-sm mt-2 mb-3">
    <b-form @submit.prevent="addNewTodo" @reset="resetForm">
      <b-form-group
        label="Type new Todo"
        label-for="newTodo"
        label-class="h5">
        <b-form-input
          id="newTodo"
          v-model="todo"
          ref="inputFocus"
          type="text"
          required
          placeholder="Add new Todo...">
        </b-form-input>
      </b-form-group>
      <b-form-group
        description="You can leave date and time empty">
        <label for="datepicker" class="h5">
          Choose notification date
        </label>
        <b-form-datepicker
          id="datepicker"
          v-model="date"
          :min="minDate"
          today-button
          reset-button>
        </b-form-datepicker>
      </b-form-group>
      <transition
        name="fade"
        mode="out-in">
        <b-form-group v-if="date">
          <label for="timepicker" class="h5">
            Choose notification time
          </label>
          <b-form-timepicker
            id="timepicker"
            v-model="time"
            now-button
            reset-button
            :hide-header="true">
          </b-form-timepicker>
        </b-form-group>
      </transition>
      <b-form-group>
        <b-form-radio-group v-model="badge" required>
          <b-form-radio value="0" size="lg">
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
// import Push from 'push.js';

export default {
  name: 'Form',
  setup() {
    const todo = ref('');
    const badge = ref('0');
    const date = ref('');
    const time = ref('');
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const { createTodo } = useActions('todos', [
      'createTodo',
    ]);

    const resetForm = () => {
      todo.value = '';
      date.value = '';
      time.value = '';
      badge.value = '0';
    };

    const addNewTodo = () => {
      if (date.value !== '' && time.value !== '') {
        createTodo({
          title: todo.value.trim(),
          badge: badge.value,
          pushDate: `${date.value} ${time.value}`,
        });
      } else {
        createTodo({
          title: todo.value.trim(),
          badge: badge.value,
          pushDate: new Date(new Date().getTime() + 40 * 60000),
        });
      }
      resetForm();
    };

    const minDate = new Date(today);

    return {
      addNewTodo,
      resetForm,
      todo,
      time,
      badge,
      date,
      minDate,
    };
  },
};
</script>
