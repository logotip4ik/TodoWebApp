<template>
  <transition name="fade" mode="out-in" appear>
    <div class="d-flex flex-column justify-content-center align-items-center noneState">
      <b-icon-check2
        class="checked"
        style="width: 150px; height: 150px"/>
      <h1 class="display-4">All your todos is done</h1>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NoneState',
};
</script>

<style>
</style>
