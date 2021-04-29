<template>
    <router-view username="lolocomotive" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'App',
});
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
@import '@/_variables';
body {
    font-family: Lato, sans-serif;
    margin: 0;
}
::-webkit-scrollbar {
    background: $color1;
    width: 7px;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    background: $color3;
    border-radius: 50px;
}
</style>
