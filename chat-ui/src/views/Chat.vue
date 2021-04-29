<template>
    <div id="main">
        <div id="chat">
            <h1>
                Chatting as <span class="username">{{ username }}</span>
            </h1>
            <Messages :messages="messages" />
            <MsgEditor @send="addMsg" />
        </div>
    </div>
</template>
<script lang="ts">
import Messages from '@/components/Messages.vue';
import MsgEditor from '@/components/MsgEditor.vue';
import { defineComponent } from 'vue';
type message = {
    content: string;
    username: string;
    date: string;
};
export default defineComponent({
    name: 'Chat',
    props: {
        username: String,
    },
    data(): { messages: message[] } {
        return {
            messages: [],
        };
    },
    methods: {
        addMsg(msg: string): void {
            this.messages.push({
                content: msg,
                username: this.username as string,
                date: new Date().toString(),
            });
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
    #chat {
        display: flex;
        flex-direction: column;
        border: solid $color1 2pt;
        background-color: $color2;
        padding: 20px;
        width: 100%;
        max-width: 800px;
        height: calc(100vh - 45px);
        overflow: hidden;
    }
}
h1 {
    margin-top: 0;
    color: $color4;
    text-align: center;
    font-weight: 400;
    .username {
        color: $color3;
    }
}
</style>
