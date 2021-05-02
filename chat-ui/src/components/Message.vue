<template>
    <div class="message">
        <div class="username" :style="`color: ${color}`">
            {{ username }}
        </div>

        <div class="content">
            {{ content }}
        </div>
        <div class="date">
            {{ renderedDate }}
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
function daysBetween(first: Date, second: Date) {
    // Copy date parts of the timestamps, discarding the time parts.
    var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    var two = new Date(
        second.getFullYear(),
        second.getMonth(),
        second.getDate()
    );

    // Do the math.
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = two.getTime() - one.getTime();
    var days = millisBetween / millisecondsPerDay;

    // Round down.
    return Math.floor(days);
}

export default defineComponent({
    name: 'Message',
    setup() {
        const { t } = useI18n({
            inheritLocale: true,
            useScope: 'local',
        });
        return { t };
    },
    props: {
        username: String,
        content: String,
        date: String,
    },
    computed: {
        color(): string {
            var colors = [
                'black',
                'silver',
                'gray',
                'grey',
                'white',
                'maroon',
                'red',
                'purple',
                'fuchsia',
                'green',
                'lime',
                'olive',
                'yellow',
                'navy',
                'blue',
                'teal',
                'aqua',
                'darkblue',
                'mediumblue',
                'darkgreen',
                'darkcyan',
                'deepskyblue',
                'darkturquoise',
                'mediumspringgreen',
                'springgreen',
                'cyan',
                'midnightblue',
                'dodgerblue',
                'lightseagreen',
                'forestgreen',
                'seagreen',
                'darkslategray',
                'darkslategrey',
                'limegreen',
                'mediumseagreen',
                'turquoise',
                'royalblue',
                'steelblue',
                'darkslateblue',
                'mediumturquoise',
                'indigo',
                'darkolivegreen',
                'cadetblue',
                'cornflowerblue',
                'rebeccapurple',
                'mediumaquamarine',
                'dimgray',
                'dimgrey',
                'slateblue',
                'olivedrab',
                'slategray',
                'slategrey',
                'lightslategray',
                'lightslategrey',
                'mediumslateblue',
                'lawngreen',
                'chartreuse',
                'aquamarine',
                'skyblue',
                'lightskyblue',
                'blueviolet',
                'darkred',
                'darkmagenta',
                'saddlebrown',
                'darkseagreen',
                'lightgreen',
                'mediumpurple',
                'darkviolet',
                'palegreen',
                'darkorchid',
                'yellowgreen',
                'sienna',
                'brown',
                'darkgray',
                'darkgrey',
                'lightblue',
                'greenyellow',
                'paleturquoise',
                'lightsteelblue',
                'powderblue',
                'firebrick',
                'darkgoldenrod',
                'mediumorchid',
                'rosybrown',
                'darkkhaki',
                'mediumvioletred',
                'indianred',
                'peru',
                'chocolate',
                'tan',
                'lightgray',
                'lightgrey',
                'thistle',
                'orchid',
                'goldenrod',
                'palevioletred',
                'crimson',
                'gainsboro',
                'plum',
                'burlywood',
                'lightcyan',
                'lavender',
                'darksalmon',
                'violet',
                'palegoldenrod',
                'lightcoral',
                'khaki',
                'aliceblue',
                'honeydew',
                'azure',
                'sandybrown',
                'wheat',
                'beige',
                'whitesmoke',
                'mintcream',
                'ghostwhite',
                'salmon',
                'antiquewhite',
                'linen',
                'lightgoldenrodyellow',
                'oldlace',
                'magenta',
                'deeppink',
                'orangered',
                'tomato',
                'hotpink',
                'coral',
                'darkorange',
                'lightsalmon',
                'orange',
                'lightpink',
                'pink',
                'gold',
                'peachpuff',
                'navajowhite',
                'moccasin',
                'bisque',
                'mistyrose',
                'blanchedalmond',
                'papayawhip',
                'lavenderblush',
                'seashell',
                'cornsilk',
                'lemonchiffon',
                'floralwhite',
                'snow',
                'lightyellow',
                'ivory',
            ];
            var number = 0;
            if (this.username != undefined) {
                for (var i = 0; i < this.username.length; i++) {
                    number += this.username.charCodeAt(i);
                }
            }
            return colors[number % colors.length];
        },
        renderedDate(): string {
            if (this.date != undefined) {
                var date = new Date(this.date);
                var now = new Date();
                var day = '';
                var offset = daysBetween(date, now);
                if (offset == 0) {
                    day = this.t('today');
                } else if (offset == 1) {
                    day = this.t('yesterday');
                } else if (offset == 2) {
                    day = this.t('two-days-ago');
                } else if (offset == 3) {
                    day = this.t('three-days-ago');
                } else {
                    day = `${date.getDate()}.${date.getMonth()}.${
                        date.getFullYear() - 2000
                    }`;
                }
                return `${day} ${this.t(
                    'at'
                )} ${date.getHours()}:${date.getMinutes()}`;
            } else return '';
        },
    },
});
</script>
<style lang="scss" scoped>
@import '@/_variables';
.message {
    display: flex;
    align-items: center;
    .username {
        font-weight: bold;
        color: $color3;
        margin-right: 10px;
    }
    .date {
        font-size: 0.7em;
        color: $color4;
    }
    .content {
        flex: 1;
    }
}
</style>
<i18n>
{
    "fr":{
        "today": "Aujourd'hui",
        "yesterday": "Hier",
        "two-days-ago": "Avant-hier",
        "three-days-ago": "Il y a trois jours",
        "at": "à"
    },
    "en":{
        "today": "Today",
        "yesterday": "Yesterday",
        "two-days-ago": "Two days ago",
        "three-days-ago": "Three days ago",
        "at": "at"
    },
    "de":{
        "today": "Heute",
        "yesterday": "Gestern",
        "two-days-ago": "Vorgestern",
        "three-days-ago": "Vor drei Tagen",
        "at": "um"
    }
}
</i18n>
