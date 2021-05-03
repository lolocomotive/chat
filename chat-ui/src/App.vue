<template>
    <router-view
        @login="setUserData"
        :username="username"
        :sessionID="sessionID"
    />
</template>
<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'App',
    setup() {
        const { t } = useI18n({
            inheritLocale: true,
            useScope: 'local',
        });
        return { t };
    },
    data() {
        return {
            sessionID: '',
            username: '',
        };
    },
    methods: {
        setUserData(username: string, sessionID: string) {
            this.username = username;
            this.sessionID = sessionID;
        },
    },
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
