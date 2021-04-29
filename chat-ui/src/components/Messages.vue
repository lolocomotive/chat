<template>
    <div id="messages">
        <div>
            <Message
                v-for="msg in messages"
                :key="msg.id"
                :username="msg.username"
                :content="msg.content"
                :date="msg.date"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Message from '@/components/Message.vue';
import { defineComponent } from 'vue';

type message = {
    content: string;
    username: string;
    date: string;
};
export default defineComponent({
    name: 'Messages',
    components: { Message },
    props: {
        messages: {
            type: Object as () => message[],
            required: true,
        },
    },
});
</script>
<style lang="scss">
@import '@/_variables.scss';
#messages {
    display: flex;
    flex-direction: column;
    border: solid $color1 1pt;
    background-color: white;
    padding: 10px;
    padding-right: 5px;

    overflow: auto;
    > div {
        overflow: auto;
        padding-right: 5px;
    }
}
</style>
