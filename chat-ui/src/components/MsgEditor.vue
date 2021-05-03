<template>
    <div>
        <form>
            <input
                :placeholder="t('write-message')"
                autocomplete="off"
                type="text"
                name="message"
                id="msg-input"
            />
            <input type="submit" value="send" :onclick="send" id="send-btn" />
            <label
                for="send-btn"
                id="send-btn-label"
                :onclick="send"
                class="fas fa-paper-plane"
            >
            </label>
        </form>
    </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Message Editor',
    setup() {
        const { t } = useI18n({
            inheritLocale: true,
            useScope: 'local',
        });
        return { t };
    },
    methods: {
        send(event: Event) {
            event.preventDefault();
            event.stopPropagation();
            var el = document.getElementById('msg-input') as HTMLInputElement;
            this.$emit('send', el.value);
            el.value = '';
        },
    },
});
</script>

<style lang="scss" scoped>
@import '@/_variables.scss';
form {
    display: flex;
    margin-top: 20px;
    * {
        margin: 5px;
        display: block;
        padding: 5px 10px;
        border-radius: 50px;
        border: none;
        transition: all 0.3s;
        font-size: 11.6pt;

        &#msg-input {
            box-shadow: 0 0 0 1px $color1;
            background: #f5f5f5;
            flex: 1;
            color: $color4;
            &:focus {
                box-shadow: 0 0 0 2px $color3;
                background: white;
                color: black;
            }
        }
        &#send-btn {
            display: none;
        }
        &#send-btn-label {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 7px;
            background: $color3;
            color: white;
            cursor: pointer;
            transition: all 0.2s;
            &:hover {
                transform: scale(1.1);
                color: #b5e8ff;
            }
        }
        &:focus {
            outline: 0;
        }
    }
}
</style>

<i18n>
{
    "fr":{
        "write-message":"Écrire un message"
    },
    "en":{
        "write-message":"Write a message"
    },
    "de":{
        "write-message":"Eine Nachricht schreiben"
    }
}
</i18n>
