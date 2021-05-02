<template>
    <div id="main">
        <div id="chat">
            <h1>
                {{ t('chatting-as') }}
                <span class="username">{{ username }}</span>
            </h1>
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
type message = {
    content: string;
    username: string;
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
    },
    data(): { messages: message[] } {
        return {
            messages: [],
        };
    },
    created(): void {
        this.update();
        socket.connect();
        socket.on('msg', (message) => {
            console.log(this.messages.push(message));
            this.scroll();
        });
    },
    methods: {
        scroll() {
            requestAnimationFrame(() => {
                var messages = document.getElementById('messages')?.children[0];
                messages?.scrollTo(0, messages.scrollHeight);
            });
        },
        update() {
            var api = 'localhost:3000';
            fetch(`http://${api}/messages`)
                .then((res) => res.json())
                .then((data) => {
                    this.messages = data;
                    this.scroll();
                });
        },
        sendMsg(msg: string): void {
            var msgWithData = {
                content: msg,
                username: this.username as string,
                date: new Date().toString(),
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
        "chatting-as": "Vous êtes "
    },
    "de": {
        "chatting-as": "Sie sind "
    },
    "en": {
        "chatting-as": "Chatting as "
    }
}
</i18n>
