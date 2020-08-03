<template>
  <b-modal
    id="ModalTodo"
    :modal-class="dark ? 'dark-modal dark-close-button' : ''">
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
            :class="dark ? 'dark-input' : ''"
            v-model.trim="title" />
        </b-form-group>
        <b-form-group
          label="New Badge"
          label-for="badgeInput"
          label-class="h5">
          <b-form-radio-group v-model="badge" required>
            <b-form-radio
              value="0"
              :class="dark ? 'dark-checkbox' : ''">
              No Badge
            </b-form-radio>
            <b-form-radio
              value="1"
              :class="dark ? 'dark-checkbox' : ''">
              Normal priority
              <b-badge variant="primary">Normal</b-badge>
            </b-form-radio>
            <b-form-radio
              value="2"
              :class="dark ? 'dark-checkbox' : ''">
              High priority
              <b-badge variant="warning" class="text-white">High</b-badge>
            </b-form-radio>
            <b-form-radio
              value="3"
              :class="dark ? 'dark-checkbox' : ''">
              Critical priority
              <b-badge variant="danger">Critical</b-badge>
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <b-form-group
          label="New Badge Text"
          label-for="badge-text"
          label-class="h5">
          <b-form-input
            v-model.trim="badgeText"
            id="badge-text"
            :class="dark ? 'dark-input' : ''"
            type="text"/>
        </b-form-group>
        <b-form-group
          label="New Date"
          label-for="dateInput"
          label-class="h5">
          <b-form-input
            v-model="pushdate"
            :class="dark ? 'dark-input' : ''"
            id="dateInput"
            type="date"/>
        </b-form-group>
        <b-form-group
          label="New Time"
          label-for="timeInput"
          label-class="h5">
          <b-form-input
            v-model="pushtime"
            :class="dark ? 'dark-input' : ''"
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
      newBadgeText: '',
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
        title: this.newTitle !== '' ? this.newTitle : this.title,
        badge: this.newBadge !== this.badge ? this.newBadge : this.badge,
        badgeText: this.newBadgeText !== this.badgeText ? this.newBadgeText : this.badgeText,
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

    const { dark } = useState('todos', ['dark']);

    return {
      currentlyEditing,
      updateExTodo,
      date,
      dark,
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
        const newDate = new Date(this.date); // Time from current todo
        const date = new Intl.DateTimeFormat('en', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).formatToParts(newDate);
        //       Year             Day              Month
        return `${date[4].value}-${date[0].value}-${date[2].value}`;
      },
      set(val) {
        this.newDate = val;
      },
    },
    pushtime: {
      get() {
        const newTime = new Date(this.date); // Time from current todo
        const time = new Intl.DateTimeFormat('en', {
          hour: '2-digit',
          hour12: false,
          hourCycle: 'h23',
          minute: '2-digit',
        }).format(newTime);
        return time;
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
    badgeText: {
      get() { return this.currentlyEditing.badgeText; },
      set(val) {
        this.newBadgeText = val;
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

<style lang="scss">
.dark-modal > .modal-dialog > .modal-content{
  background-color: #222!important;
  color: #FCF7F8!important;
}
.dark-close-button > .modal-dialog > .modal-content > .modal-header button{
  -webkit-filter: invert(100%);
  filter: invert(100%);
}
</style>
