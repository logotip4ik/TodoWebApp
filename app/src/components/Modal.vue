<template>
  <b-modal
    id="ModalTodo">
    <h1>{{title}}</h1>
    <transition
      name="fade"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter">
      <div v-if="!edit">
        <strong v-if="currentlyEditing.completed">Is completed</strong>
        <h5 v-else>
          Will notify at {{new Date(currentlyEditing.pushDate).toLocaleString()}}</h5>
      </div>
      <b-form @submit.prevent="updateExTodo" v-else>
        <b-form-group
          label="New Title"
          label-for="titleInput"
          label-class="h5">
          <b-form-input
            id="titleInput"
            type="text"
            v-model="title" />
        </b-form-group>
        <b-form-group
          label="New Badge"
          label-for="badgeInput"
          label-class="h5">
          <b-form-radio-group v-model="badge" required>
            <b-form-radio value="0">
              No Badge
            </b-form-radio>
            <b-form-radio value="1">
              Normal priority
              <b-badge variant="primary">Normal</b-badge>
            </b-form-radio>
            <b-form-radio value="2">
              High priority
              <b-badge variant="warning" class="text-white">High</b-badge>
            </b-form-radio>
            <b-form-radio value="3">
              Critical priority
              <b-badge variant="danger">Critical</b-badge>
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <b-form-group
          label="New Date"
          label-for="dateInput"
          label-class="h5">
          <b-form-input
            v-model="pushdate"
            id="dateInput"
            type="date"/>
        </b-form-group>
        <b-form-group
          label="New Time"
          label-for="timeInput"
          label-class="h5">
          <b-form-input
            v-model="pushtime"
            id="timeInput"
            type="time"/>
        </b-form-group>
      </b-form>
    </transition>
    <b-button
      size="sm"
      variant="outline-secondary"
      class="mt-2"
      @click="edit=!edit">
      Edit
    </b-button>
    <transition name="fade" v-if="edit">
      <b-button
        type="submit"
        class="mt-2 ml-2"
        variant="success"
        size="sm"
        @click="updateExTodo"
        >Submit</b-button>
    </transition>
  </b-modal>
</template>

<script>
import { useState, useActions } from '@u3u/vue-hooks';
import { computed } from '@vue/composition-api';

export default {
  name: 'Modal',
  data() {
    return {
      edit: false,
      newTitle: '',
      newBadge: '0',
      newDate: '',
      newTime: '',
    };
  },
  setup() {
    const { currentlyEditing } = useState('todos', [
      'currentlyEditing',
    ]);

    const { updateTodo } = useActions('todos', [
      'updateTodo',
    ]);

    function updateExTodo() {
      if (!this.newTitle && !this.newBadge && !this.newDate && !this.newTime) {
        this.edit = !this.edit;
        return;
      }
      const todo = {
        // eslint-disable-next-line
        _id: this._id,
        title: this.newTitle.trim() !== '' ? this.newTitle.trim() : this.title,
        badge: this.newBadge !== this.badge ? this.newBadge : this.badge,
        pushDate: `${
          (this.newDate !== this.pushdate && this.newDate) ? this.newDate : this.pushdate} ${
          (this.newTime !== this.pushtime && this.newTime) ? this.newTime : this.pushtime}`,
      };
      updateTodo({
        todo,
      });
      this.edit = !this.edit;
    }

    const date = computed(() => currentlyEditing.value.pushDate);

    return {
      currentlyEditing,
      updateExTodo,
      date,
    };
  },
  computed: {
    // eslint-disable-next-line
    _id() {
      // eslint-disable-next-line
      return this.currentlyEditing._id;
    },
    pushdate: {
      get() {
        const newDate = new Date(this.date).toLocaleString();
        const day = newDate.slice(0, 2);
        const month = newDate.slice(3, 5);
        const year = newDate.slice(6, 10);
        return `${year}-${month}-${day}`;
      },
      set(val) {
        this.newDate = val;
      },
    },
    pushtime: {
      get() {
        const newTime = new Date(this.date).toLocaleString();
        const hours = newTime.slice(12, 14);
        const minutes = newTime.slice(15, 17);
        return `${hours}:${minutes}`;
      },
      set(val) {
        this.newTime = val;
      },
    },
    title: {
      get() { return this.currentlyEditing.title; },
      set(val) {
        this.newTitle = val;
      },
    },
    badge: {
      get() { return this.currentlyEditing.badge; },
      set(val) {
        this.newBadge = val;
      },
    },
  },
  methods: {
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
