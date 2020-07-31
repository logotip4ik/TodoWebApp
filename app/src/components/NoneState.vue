<template>
  <transition name="fade" mode="out-in" appear>
    <div
      class="d-flex flex-column justify-content-center align-items-center noneState mx-4"
      style="height: 100%!impotrant; transition: all 0.5s;">
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
.noneState{
  height: calc(100% - 54.8px)!important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
