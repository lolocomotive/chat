<template>
    <div>
        <div id="cookie-bg">
            <div id="cookie-fg">
                <h1>{{ t('dialog.cookie.title') }}</h1>
                <table>
                    <thead>
                        <th>{{ t('dialog.cookie.name') }}</th>
                        <th>{{ t('dialog.cookie.description') }}</th>
                        <th>{{ t('dialog.cookie.accept') }}</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="cookie-id">allowedCookies</td>
                            <td class="cookie-desc">
                                {{ t('dialog.cookie.allowedCookies') }}
                            </td>
                            <td>
                                <input
                                    @change="updateBoxes"
                                    type="checkbox"
                                    name="accept-allowedCookies"
                                    id="accept-allowedCookies"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="cookie-id">sessionID</td>
                            <td class="cookie-desc">
                                {{ t('dialog.cookie.sessionid') }}
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    name="accept-sessionid"
                                    id="accept-sessionid"
                                    disabled
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="confirm">
                    <button @click="submit(false)" id="acceptSelected">
                        {{ t('dialog.cookie.acceptSelected') }}
                    </button>
                    <button @click="submit(true)" id="acceptAll">
                        {{ t('dialog.cookie.acceptAll') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import cookies from '@/cookies';
export default defineComponent({
    name: 'Cookie declaration',
    setup() {
        const { t } = useI18n({
            inheritLocale: true,
            useScope: 'local',
        });
        return { t };
    },
    methods: {
        submit(all: boolean) {
            var allowedCookies = {
                sessionid: false,
                cookiesAllowed: false,
            };
            if (all) {
                allowedCookies.sessionid = true;
                allowedCookies.cookiesAllowed = true;
            } else {
                allowedCookies.cookiesAllowed = (document.getElementById(
                    'accept-allowedCookies'
                ) as HTMLInputElement).checked;
                allowedCookies.sessionid = (document.getElementById(
                    'accept-sessionid'
                ) as HTMLInputElement).checked;
            }
            if (allowedCookies.cookiesAllowed) {
                cookies.setCookie(
                    'allowedCookies',
                    JSON.stringify(allowedCookies),
                    30
                );
            }
            var cookieBg = document.getElementById('cookie-bg');
            cookieBg?.remove();
        },
        updateBoxes() {
            var cookiesEnabled = (document.getElementById(
                'accept-allowedCookies'
            ) as HTMLInputElement).checked;

            var sessionIdenabled = document.getElementById(
                'accept-sessionid'
            ) as HTMLInputElement;
            if (!cookiesEnabled) {
                sessionIdenabled.disabled = true;
                sessionIdenabled.checked = false;
                return;
            }
            sessionIdenabled.disabled = false;
        },
    },
});
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/_variables.scss';
#cookie-bg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: #00000050;
    display: flex;
    justify-content: center;
    align-items: center;
    #cookie-fg {
        background: $color2;
        background: linear-gradient(45deg, $color1, $color2);
        box-shadow: 0 0 0 2px $color3, 0 0 30px 2px $color3;
        border-radius: 30px;
        padding: 2em;
        max-width: 800px;
        h1 {
            margin: 0;
            margin-bottom: 20px;
            color: $color3;
        }
        table {
            text-align: center;
            border-collapse: collapse;
            td,
            th {
                border: solid $color3 1px;
                padding: 10px;
                input {
                    transition: all 0.3s;
                }
            }
            .cookie-id {
                font-family: monospace;
            }
            .cookie-desc {
                text-align: justify;
            }
        }
        .confirm {
            display: flex;
            justify-content: space-between;
        }
        button {
            display: block;
            margin: 20px;
            padding: 10px;
            outline: none;
            font-size: 1em;
            border-radius: 100px;
            transition: all 0.3s;
            box-shadow: 0 0 10px 2px color.scale($color3, $alpha: -50%);
            &#acceptAll {
                background: $color3;
                color: $color2;
            }
            &:focus {
                box-shadow: 0 0 0px 0px color.scale($color3, $alpha: -50%);
            }
            color: $color3;
            border: none;
            background: #ddd;
            background: linear-gradient(0deg, white, $color2 200%);
            cursor: pointer;
            &:hover {
                box-shadow: 0 0 0px 0px color.scale($color3, $alpha: -50%),
                    0 0 0 2px inset $color3;
            }
        }
    }
}
</style>
<i18n>
{
    "fr":{
        "dialog":{
            "cookie":{
                "title":"Acceptez-vous les cookies?",
                "name":"Nom",
                "description":"Description",
                "accept":"Accepter",
                "acceptAll":"Accepter tout",
                "acceptSelected":"Accepter mes choix",
                "allowedCookies":"Les cookies que l'utilisateur a choisi d'accepter ou non",
                "sessionid":"Stocke un identifiant unique de la session (afin que l'utilisateur ne doive pas se reconnecter à chaque nouvelle visite de la page)"
            }
        }
    },
    "en":{
        "dialog":{
            "cookie":{
                "title":"Do you allow cookies?",
                "name":"Name",
                "description":"Description",
                "accept":"Allow",
                "acceptAll":"Allow all",
                "acceptSelected":"Allow my choices",
                "allowedCookies":"The cookies that the user chose to allow or not",
                "sessionid":"The unique identifier of the session (so that the user doesn't have to log in each time he visits the page)"
            }
        }
    },
    "de":{
        "dialog":{
            "cookie":{
                "title":"Lassen sie cookies zu?",
                "name":"Name",
                "description":"Beschreibung",
                "accept":"Zulassen",
                "acceptAll":"Alle zulassen",
                "acceptSelected":"Meine Auswahl zulassen",
                "allowedCookies":"Die cookies, die der Benutzer zugelassen hat",
                "sessionid":"Die Identifikationsnummer der Session (damit der Benutzer nicht seine Login-Daten bei jedem neuen Seitenbesuch eingeben muss)"
            }
        }
    }
}
</i18n>
