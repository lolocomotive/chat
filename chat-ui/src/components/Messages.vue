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
@use "sass:color";
@import '@/_variables.scss';
#messages {
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px 1px color.scale($color3, $alpha: -50%);
    border-radius: 20px;
    padding: 10px;
    padding-right: 5px;
    flex: 1;
    overflow: auto;
    > div {
        overflow: auto;
        padding-right: 5px;
    }
}
</style>
