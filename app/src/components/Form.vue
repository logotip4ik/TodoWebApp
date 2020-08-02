<template>
  <div class="container-sm mt-2 mb-3">
    <b-form @submit.prevent="addNewTodo" @reset="resetForm">
      <b-form-group
        label="Type new Todo"
        label-for="newTodo"
        :label-class="dark ? 'h5 dark-label' : 'h5'">
        <b-form-input
          id="newTodo"
          v-model.trim="todo"
          ref="inputFocus"
          type="text"
          required
          :class="dark ? 'dark-input' : ''"
          placeholder="Add new Todo...">
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="Choose notification date"
        :label-class="dark ? 'h5 dark-label' : 'h5'"
        label-for="datepicker"
        description="You can leave date and time empty">
        <b-form-datepicker
          id="datepicker"
          v-model="date"
          :class="dark ? 'dark-input' : ''"
          :min="minDate"
          today-button
          close-button
          reset-button>
        </b-form-datepicker>
      </b-form-group>
      <transition
        name="fade"
        mode="out-in">
        <b-form-group v-if="date"
          label="Choose notification time"
          :label-class="dark ? 'h5 dark-label' : 'h5'"
          label-for="timepicker">
          <b-form-timepicker
            id="timepicker"
            :class="dark ? 'dark-input' : ''"
            label-selected
            v-model="time"
            now-button
            reset-button
            :hide-header="true">
          </b-form-timepicker>
        </b-form-group>
      </transition>
      <b-form-group>
        <b-form-radio-group v-model="badge" required>
          <b-form-radio
            value="0"
            :class="dark ? 'dark-checkbox' : ''"
            size="lg">
            No Badge
          </b-form-radio>
          <b-form-radio
            value="1"
            :class="dark ? 'dark-checkbox' : ''"
            size="lg">
            Normal priority
            <b-badge variant="primary">{{userBadge !== '' ? userBadge : 'Normal'}}</b-badge>
          </b-form-radio>
          <b-form-radio
            value="2"
            :class="dark ? 'dark-checkbox' : ''"
            size="lg">
            High priority
            <b-badge variant="warning"
              class="text-white">{{userBadge !== '' ? userBadge : 'High'}}</b-badge>
          </b-form-radio>
          <b-form-radio
            value="3"
            :class="dark ? 'dark-checkbox' : ''"
            size="lg">
            Critical priority
            <b-badge variant="danger">{{userBadge !== '' ? userBadge : 'Critical'}}</b-badge>
          </b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <transition
        name="fade"
        mode="out-in">
        <b-form-group
          v-if="badge != 0"
          label="Select text for badges"
          label-for="badge-text"
          :label-class="dark ? 'dark-label' : ''"
          description="You can leave it empty">
          <b-form-input
            id="badge-text"
            v-model.trim="userBadge"
            :class="dark ? 'dark-input' : ''"
            size="sm"
            placeholder="Text for badge..." />
        </b-form-group>
      </transition>
      <b-button class="mr-2" type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="outline-warning">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { useActions, useState } from '@u3u/vue-hooks';
import { ref } from '@vue/composition-api';
// import Push from 'push.js';

export default {
  name: 'Form',
  data() {
    return {
      badges: {
        1: 'Normal',
        2: 'High',
        3: 'Critical',
      },
    };
  },
  setup() {
    const todo = ref('');
    const badge = ref('0');
    const userBadge = ref('');
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
      userBadge.value = '';
    };

    const addNewTodo = () => {
      if (date.value !== '' && time.value !== '') {
        createTodo({
          title: todo.value.trim(),
          badge: badge.value,
          badgeText: userBadge.value !== '' ? userBadge.value : '',
          pushDate: `${date.value} ${time.value}`,
        });
      } else if (date.value) {
        createTodo({
          title: todo.value,
          badge: badge.value,
          badgeText: userBadge.value !== '' ? userBadge.value : '',
          pushDate: new Date(date.value),
        });
      } else {
        createTodo({
          title: todo.value,
          badge: badge.value,
          badgeText: userBadge.value !== '' ? userBadge.value : '',
          pushDate: new Date(new Date().getTime() + 40 * 60000),
        });
      }
      resetForm();
    };

    const minDate = new Date(today);

    const { dark } = useState('todos', ['dark']);

    return {
      addNewTodo,
      resetForm,
      userBadge,
      dark,
      todo,
      time,
      badge,
      date,
      minDate,
    };
  },
};
</script>

<style lang="scss">
.dark-label{
  color: #FCF7F8 !important;
}
.dark-input {
  background-color: #333 !important;
  transition: all 0.2s !important;
  color: #FCF7F8 !important;
  border-color: #888!important;
}
.dark-input .form-control{
  color: #FCF7F8;
}
.dark-input::placeholder{
  color: #777;
}
.dark-checkbox{
  color: #FCF7F8 !important;
}
</style>
