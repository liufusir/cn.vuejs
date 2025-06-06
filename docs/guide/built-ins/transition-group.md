<script setup>
import ListBasic from './transition-demos/ListBasic.vue'
import ListMove from './transition-demos/ListMove.vue' 
import ListStagger from './transition-demos/ListStagger.vue'
</script>


# TransitionGroup​{#transition-group}
`<TransitionGroup>` 是一个内置组件，用于对 `v-for` 列表中的元素或组件的插入、移除和顺序改变添加动画效果。

## 和 `<Transition>` 的区别 {#and-transition}

`<TransitionGroup>` 支持和 `<Transition>` 基本相同的 props、CSS 过渡 class 和 JavaScript 钩子监听器，但有以下几点区别：

- 默认情况下，它不会渲染一个容器元素。但你可以通过传入 `tag` prop 来指定一个元素作为容器元素来渲染。

- [过渡模式](/guide/built-ins/transition.html#transition-modes)在这里不可用，因为我们不再是在互斥的元素之间进行切换。

- 列表中的每个元素都**必须**有一个独一无二的 `key` attribute。

- CSS 过渡 class 会被应用在列表内的元素上，**而不是**容器元素上。

::: tip TIP

当在 [DOM 内模板](/guide/essentials/component-basics.html#in-dom-template-parsing-caveats)中使用时，组件名需要写为 `<transition-group>`。
:::

## 进入 / 离开动画 {#enter-leave-transitions}

这里是 `<TransitionGroup>` 对一个 `v-for` 列表添加进入 / 离开动画的示例：

```template
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
css
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

<ListBasic />


[在演练场中尝试一下](https://play.vuejs.org/#eNqNVM1u00AQfpWRL6TUtRvSXqK04kcVKhI/Kr1hVBl7nWyz3rV216YoisShSKgC9UzVQyuB4MSVQtS3SVr6FozXdnBLWpFLdme+mfnm2xkPrHtJ4mQpsdpWRwWSJhoU0Wmy6nEaJ0JqGIDqpVHECPgKtqrzECIpYrjFROir3gJRt2oBkkR2IOIk1SScIrEIYjweCK40dIle51RTn61rEitYgcYcrKzCi6YNd2xo2bBkw/LLCk5LEGZuXAltzM15nBHEhAgwQCfzWUocRnhX92Aemh533cne0eTdF49HKQ80FRwoV0RqLDvwOEBZB1M89nXPkSLlYaM4+jwUMeJuz8iOteGSWSWMBqRBbVi0kdL8PCKGef2Lg/2zw1+T90cXnz6PT97+Pv5Q4yJJLDKyUVUyjGgEjRntrMJiCfiHdMSEkP9L+jraTeNFygi4SVFEdNxiZHBY8IK4hPma4A2gE9IMAuYrteJZIXbnWcaOnlep1tjy3QAr9tFbvAP6J4ffxqPR2e7++PTj+en3sx8jfDOU6uL4Z8ctoq7LUdcPM51/HeUq15KNT/bOD3ZnJ9tEsRQOlOAP8dkT4H5MMCejClmB9rt4Sdm0ARPDKGQLkZA5f2wch6kQCgPaffKmNF+KyX+DgYHB0Ohb5nIZrai4V7igveOilOa/JrBlW8W2LcR+4mwrwXGBzVBgYeNAJu1qTLCXak1zq2f1tE5U23VTnvS7Dq6qWwOUzz/EGlrhhEW0e6VCvtuUEfk0yYleruQzJl4/MjYtU2JX9qBHgv4M+7baKTg9kwTnICOeNfVpX+KyF+6150/IDp6nzliEKUP0Dc4NogRLc44F7D7uNNKu4QzbdSMY5d1NtbajCepfNpUTNWoYvGfhJ+zBDa3/pdtylmoqbmVE5jlRwJaz7DRb1vAPvRztyw==)

## 移动动画 ​{#move-transitions}

上面的示例有一些明显的缺陷：当某一项被插入或移除时，它周围的元素会立即发生“跳跃”而不是平稳地移动。我们可以通过添加一些额外的 CSS 规则来解决这个问题：

```css
.demo .list-move, /* 对移动中的元素应用的过渡 */
.demo .list-enter-active,
.demo .list-leave-active {
  transition: all 0.5s ease;
}

.demo .list-enter-from,
.demo .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.demo.list-leave-active {
  position: absolute;
}
```

现在它看起来好多了，甚至对整个列表执行洗牌的动画也都非常流畅：
<ListMove/>
[完整的示例](https://cn.vuejs.org/examples/#list-transition)

## 自定义过渡组 class​{#custom-transition-group-classes}

你还可以通过向 `<TransitionGroup`> 传递 moveClass prop 为移动元素指定自定义过渡 class，类似于[自定义过渡 class](/guide/built-ins/transition.html#custom-transition-classes)。

## 渐进延迟列表动画 ​{#progressive-list-animation}

通过在 JavaScript 钩子中读取元素的 data attribute，我们可以实现带渐进延迟的列表动画。首先，我们把每一个元素的索引渲染为该元素上的一个 data attribute：

```template
<TransitionGroup
  tag="ul"
  :css="false"
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @leave="onLeave"
>
  <li
    v-for="(item, index) in computedList"
    :key="item.msg"
    :data-index="index"
  >
    {{ item.msg }}
  </li>
</TransitionGroup>
```

接着，在 JavaScript 钩子中，我们基于当前元素的 data attribute 对该元素的进场动画添加一个延迟。以下是一个基于 [GSAP library](https://gsap.com/) 的动画示例：

```js
function onEnter(el, done) {
gsap.to(el, {
opacity: 1,
height: '1.6em',
delay: el.dataset.index \* 0.15,
onComplete: done
})
}
```
<ListStagger/>
[在演练场中查看完整示例](https://play.vuejs.org/#eNqlVMuu0zAQ/ZVRNklRm7QLWETtBW4FSFCxYkdYmGSSmjp28KNQVfl3xk7SFyvEponPGc+cOTPNOXrbdenRYZRHa1Nq3lkwaF33VEjedkpbOIPGeg6lajtnsYIeaq1aiOlSfAlqDOtG3L8SUchSSWNBcPrZwNdCAqVqTZND/KxdibBDjKGf3xIfWXngCNs9k4/Udu/KA3xWWnPz1zW0sOOP6CcnG3jv9ImIQn67SvrpUJ9IE/WVxPHsSkw97gbN0zFJZrB5grNPrskcLUNXac2FRZ0k3GIbIvxLSsVTq3bqF+otM5jMUi5L4So0SSicHplwOKOyfShdO1lariQo+Yy10vhO+qwoZkNFFKmxJ4Gp6ljJrRe+vMP3yJu910swNXqXcco1h0pJHDP6CZHEAAcAYMydwypYCDAkJRdX6Sts4xGtUDAKotIVs9Scpd4q/A0vYJmuXo5BSm7JOIEW81DVo77VR207ZEf8F23LB23T+X9VrbNh82nn6UAz7ASzSCeANZe0AnBctIqqbIoojLCIIBvoL5pJw31DH7Ry3VDKsoYinSii4ZyXxhBQM2Fwwt58D7NeoB8QkXfDvwRd2XtceOsCHkwc8KCINAk+vADJppQUFjZ0DsGVGT3uFn1KSjoPeKLoaYtvCO/rIlz3vH9O5FiU/nXny/pDT6YGKZngg0/Zg1GErrMbp6N5NHxJFi3N/4dRkj5IYf5ULxCmiPJpI4rIr4kHimhvbWfyLHOyOzQpNZZ57jXNy4nRGFLTR/0fWBqe7w==)
  