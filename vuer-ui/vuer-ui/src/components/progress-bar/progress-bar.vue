<template>
    <div class="skills">
        <h1>My Skills</h1>
        <li>
            <h3>html5</h3>
            <span class="bar">
                <span class="html"></span>
            </span>
        </li>


        <ul class="progressbar">
            <li class="active"> 新建 </li>
            <li class="active"> 已提交 </li>
            <li class="active"> 已发货 </li>
            <li> step 4 </li>
        </ul>



    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'vuer-progress-bar',
        props: {},
        setup() {

            return {}
        }
    })
</script>

<style lang="scss" scoped>
    .progressbar {
        counter-reset: step;

        li {
            list-style-type: none;
            float: left;
            width: 25%;
            position: relative;
            text-align: center;

            &.active {
                color: green;

                &::before {
                    border-color: green;
                }

                &+li::after {
                    background-color: green;
                }
            }

            &:first-child::after {
                content: none; // 去掉第一个前面的线
            }

            &::before {
                content: counter(step);
                counter-increment: step;
                width: 30px;
                height: 30px;
                line-height: 30px;
                border: 1px solid #ddd;
                display: block;
                text-align: center;
                margin: 0 auto 10px auto;
                border-radius: 50%;
                background-color: white;
            }

            &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 1px;
                background-color: #ddd;
                top: 15px;
                left: -50%;
                z-index: -1;
            }
        }
    }

    * {
        font-family: sans-serif;
        list-style: none;
        padding: 0;
    }

    .skills {
        width: 500px;
        margin: 60px auto;
        color: #eee;

        li {
            margin: 20px 0;

            .bar {
                background-color: #353b48;
                display: block;
                height: 2px;
                border: 1px solid rgba(0, 0, 0, 0.3);
                border-radius: 3px;
                box-shadow: 0 0 10px #2187e7;

                span {
                    display: block;
                    height: 2px;
                    float: left;
                    background-color: #2187e7;

                    &.html {
                        width: 90%;
                        animation: html 2s;
                    }
                }


            }
        }

        @keyframes html {
            0% {
                width: 0%;
            }

            100% {
                width: 90%;
            }
        }
    }
</style>