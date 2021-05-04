<template>
    <CookieDeclaration v-if="showCookieDeclaration" />
    <router-view
        @updateUname="updateUname"
        @login="setUserData"
        :username="username"
        :sessionID="sessionID"
    />
</template>
<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
import CookieDeclaration from '@/components/CookieDeclaration.vue';
import cookies from '@/cookies';
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
            sessionID: cookies.getCookie('sessionID'),
            username: '',
        };
    },
    methods: {
        setUserData(username: string, sessionID: string) {
            this.username = username;
            this.sessionID = sessionID;
            try {
                if (JSON.parse(cookies.getCookie('allowedCookies'))) {
                    cookies.setCookie('sessionID', sessionID, 1 / 24);
                }
            } catch (err) {
                console.log(
                    'Cookies have been disabled, your login will not be saved'
                );
            }
        },
        updateUname(uname: string) {
            this.username = uname;
        },
    },
    components: {
        CookieDeclaration,
    },
    computed: {
        showCookieDeclaration() {
            try {
                var cookiesAllowed = JSON.parse(
                    cookies.getCookie('allowedCookies')
                ).cookiesAllowed;
                return !cookiesAllowed;
            } catch (err) {
                return true;
            }
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
