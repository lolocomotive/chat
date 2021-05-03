<template>
    <div class="login">
        <form>
            <h1>{{ t('form.login') }}</h1>
            <div v-if="error" class="error-msg">{{ errorMsg }}</div>
            <input
                :placeholder="t('form.username')"
                type="text"
                name="uname-input"
                id="uname-input"
            />
            <input
                :placeholder="t('form.password')"
                type="password"
                name="password-input"
                id="password-input"
            />
            <input type="submit" :value="t('form.login')" :onclick="login" />
        </form>
    </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Home',
    data() {
        return { error: false, errorMsg: '' };
    },
    setup() {
        const { t } = useI18n({
            inheritLocale: true,
            useScope: 'local',
        });
        return { t };
    },
    methods: {
        login(event: Event): void {
            event.preventDefault();
            event.stopPropagation();
            var credentials = {
                username: (document.getElementById(
                    'uname-input'
                ) as HTMLInputElement).value,
                password: (document.getElementById(
                    'password-input'
                ) as HTMLInputElement).value,
            };
            if (credentials.username === '') {
                this.error = true;
                this.errorMsg =
                    this.t('form.error.entera') +
                    this.t('form.error.username') +
                    this.t('form.error.entera_');
                return;
            }
            if (credentials.password === '') {
                this.error = true;
                this.errorMsg =
                    this.t('form.error.entera') +
                    this.t('form.error.password') +
                    this.t('form.error.entera_');
                return;
            }

            var api = 'localhost:3000';
            fetch(`http://${api}/login`, {
                method: 'POST',
                body: JSON.stringify(credentials),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 'authorized') {
                        this.$emit(
                            'login',
                            credentials.username,
                            data.sessionID
                        );
                        this.$router.push('chat');
                    } else {
                        this.error = true;
                        this.errorMsg = this.t(`form.error.${data.message}`);
                    }
                });
        },
    },
});
</script>
<style lang="scss" scoped>
@use "sass:color";
@import '@/_variables.scss';
form {
    h1 {
        text-align: center;
        color: $color3;
    }
    width: 500px;
    display: flex;
    flex-direction: column;
    border-radius: 0 0 30px 30px;
    box-shadow: 0 0 20px 1px $color3;
    height: fit-content;
    background: $color1;
    background: linear-gradient(45deg, $color1, $color2);
    .error-msg {
        margin: 20px;
        padding: 10px;
        box-shadow: 0 0 10px 1px $error;
        color: $color2;
        text-align: center;
        background: $error;
        border-radius: 100px;
        font-size: 1.5em;
    }

    input {
        &::placeholder {
            color: $color3;
        }
        display: block;
        margin: 20px;
        padding: 10px;
        outline: none;
        border: none;
        font-size: 1em;
        border-radius: 100px;
        background: unset;
        transition: all 0.3s;
        box-shadow: 0 0 10px 1px color.scale($color3, $alpha: -50%);
        &:focus {
            box-shadow: 0 0 0px 0px color.scale($color3, $alpha: -50%);
        }
        &[type='submit'] {
            color: $color3;
            border: none;
            background: #ddd;
            background: linear-gradient(0deg, #ddd, $color2 200%);
            cursor: pointer;
            &:hover {
                box-shadow: 0 0 0px 0px color.scale($color3, $alpha: -50%),
                    0 0 0 2px inset $color3;
            }
        }
    }
}
.login {
    display: flex;
    justify-content: center;
    background: $color1;
    background: linear-gradient(45deg, $color3, $color1);
    min-height: 100vh;
}
</style>
<i18n>
{
    "fr":{
        "form":{
            "username": "Nom d'utilisateur",
            "password":"Mot de passe",
            "login":"Se connecter",
            "error":{
                "nouser":"Cet utilisateur n'existe pas",
                "wrongpass":"Mauvais mot de passe",
                "entera":"Veuillez entrer un ",
                "entera_":"",
                "username": "nom d'utilisateur",
                "password": "mot de passe"
            }
        }
    },
    "en":{
        "form":{
            "username": "Username",
            "password":"Password",
            "login":"Log in",
            "error":{
                "nouser":"This user does not exist",
                "wrongpass":"Wrong password",
                "entera":"Please enter a ",
                "entera_":"",
                "username": "username",
                "password": "password"
            }
        }
        
    },
    "de":{
        "form":{
            "username": "Benutzername",
            "password":"Kennwort",
            "login":"Sich einloggen",
            "error":{
                "nouser":"Dieser Benutzer existiert nicht",
                "wrongpass":"Falsches Passwort",
                "entera":"Bitte geben sie ein ",
                "entera_":"ein",
                "username": "Benutzername",
                "password": "Kennwort"
            }
        }
        
    }
}
</i18n>
