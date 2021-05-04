<template>
    <div id="main">
        <div id="chat">
            <h1>
                {{ t('chatting-as') }}
                <span class="username">{{ username }}</span>
            </h1>
            <div v-if="isErrored" class="error-msg">
                {{ t(error) }}
                <router-link
                    @click="clearSessionId"
                    v-if="error === t('unauthorized')"
                    to="/"
                    >{{ t('connect') }}</router-link
                >
            </div>
            <Messages :messages="messages" />
            <MsgEditor @send="sendMsg" />
        </div>
    </div>
</template>
<script lang="ts">
import Messages from '@/components/Messages.vue';
import MsgEditor from '@/components/MsgEditor.vue';
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
import socket from '@/socket';
import cookies from '@/cookies';
type message = {
    content: string;
    username: string;
    sessionID: string;
    date: string;
};
export default defineComponent({
    name: 'Chat',
    setup() {
        const { t } = useI18n({
            inheritLocale: true,
            useScope: 'local',
        });
        return { t };
    },
    props: {
        username: String,
        sessionID: String,
    },
    data(): { messages: message[]; error: string; isErrored: boolean } {
        return {
            messages: [],
            error: '',
            isErrored: false,
        };
    },
    created(): void {
        if (this.sessionID == '') this.$router.push('/');
        this.update();
        socket.connect();
        socket.on('msg', (message) => {
            this.messages.push(message);
            this.scroll();
        });
        socket.on('error', (error) => {
            this.error = this.t(error);
            this.isErrored = true;
        });
    },
    methods: {
        clearSessionId() {
            cookies.setCookie('sessionID', '', 0);
        },
        scroll() {
            requestAnimationFrame(() => {
                var messages = document.getElementById('messages')?.children[0];
                messages?.scrollTo(0, messages.scrollHeight);
            });
        },
        update() {
            var api = 'localhost:3000';
            fetch(`http://${api}/messages`, {
                method: 'POST',
                body: JSON.stringify({
                    sessionID: this.sessionID,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    switch (data.status) {
                        case 'authorized':
                            this.messages = data.messages;
                            this.scroll();
                            this.$emit('updateUname', data.username);
                            break;
                        case 'unauthorized':
                            this.$emit('updateUname', data.username);
                            break;
                        case 'disconnected':
                            this.clearSessionId();
                            this.$router.push('/');
                            break;
                    }
                });
        },
        sendMsg(msg: string): void {
            var msgWithData = {
                content: msg,
                username: this.username as string,
                date: new Date().toString(),
                sessionID: this.sessionID,
            };
            socket.emit('msg', msgWithData);
            /* fetch(`http://${api}/messages`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(msgWithData),
            })
                .then((res) => res.json())
                .then((data) => this.messages.push(data)); */
        },
    },
    components: { Messages, MsgEditor },
});
</script>
<style lang="scss" scoped>
@import '@/_variables.scss';
$bright-maroon: #b33951ff;
$flax: #e3d081ff;

#main {
    display: flex;
    justify-content: center;
    height: 100vh;
    #chat {
        border-radius: 0 0 30px 30px;
        box-shadow: 0 0 20px 1px $color3;
        background: $color1;
        background: linear-gradient(45deg, $color1, $color2);
        display: flex;
        flex-direction: column;
        background-color: $color2;
        padding: 20px;
        width: 100%;
        max-width: 800px;
        height: calc(100vh - 80px);
        overflow: hidden;
        .error-msg {
            margin: 20px;
            padding: 10px;
            box-shadow: 0 0 10px 1px $error;
            color: $color2;
            text-align: center;
            background: $error;
            border-radius: 100px;
            font-size: 1.5em;

            a {
                color: white;
                display: block;
                font-size: 0.7em;
            }
        }
    }
    background: $color3;
    background: linear-gradient(45deg, $color3, $color1);
}
h1 {
    margin-top: 0;
    color: $color4;
    text-align: center;
    font-size: 1.7em;
    font-weight: 400;
    .username {
        color: $color3;
    }
}
</style>
<i18n>
{
    "fr": {
        "chatting-as": "Vous êtes ",
        "unauthorized": "Vous n'êtes pas connecté!",
        "connect": "Se connecter"
    },
    "de": {
        "chatting-as": "Sie sind "
    },
    "en": {
        "chatting-as": "Chatting as "
    }
}
</i18n>
