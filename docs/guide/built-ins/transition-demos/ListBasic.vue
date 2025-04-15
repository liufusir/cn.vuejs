<script setup>
import { ref } from 'vue'
import { TransitionGroup } from 'vue'
const getInitialItems = () => [1, 2, 3, 4, 5]
const items = ref(getInitialItems())
let id = items.value.length + 1
//加入
function insert() {
    const i = Math.round(Math.random() * items.value.length)
    items.value.splice(i, 0, id++)
}
//随机删除一行
function removeRandom() {
    if (items.value.length > 0) {
        const i = Math.floor(Math.random() * items.value.length)
        items.value.splice(i, 1)
    }
    id = items.value.length + 1
}

</script>
<style>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
<template>
    <div class="demo">
        <button @click="insert">在任意位置添加一项</button>
        <button @click="removeRandom">移除任意位置上的一项</button>
        <TransitionGroup name="list" tag="ul">
            <li v-for="item in items" :key="item">
                {{ item }}
            </li>
        </TransitionGroup>
    </div>

</template>
