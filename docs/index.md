---
layout: home
title: Vue.js - 渐进式 JavaScript 框架
---

<script setup>
import { withBase } from 'vitepress'
</script>

<section id="hero">
    <h1 class="tagline">
        <span class="accent">渐进式</span><br />JavaScript 框架
    </h1>
    <p class="description">
        易学易用，性能出色，适用场景丰富的 Web 前端框架。
    </p>
    <p class="actions">
        <a class="get-started" :href='withBase("/guide/introduction")'>
            快速上手
            <svg class="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"></path></svg>
        </a>
        <a class="setup" :href='withBase("/guide/quick-start")'>安装</a>
    </p>
</section>

<style scoped>
section#hero {
	padding: 96px 12px;
	text-align: center;
}
.tagline {
	font-size: 36px;
	line-height: 1.25;
	font-weight: 900;
	letter-spacing: -1.5px;
	max-width: 960px;
	margin: 0 auto;
}
html:not(.dark) .accent,
.dark .tagline {
	background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.description {
	max-width: 960px;
	line-height: 1.5;
	color: var(--vt-c-text-2);
	transition: color 0.5s;
	font-size: 12px;
	margin: 24px auto 40px;
}
.actions a {
	font-size: 22px;
	display: inline-block;
	background-color: #f1f1f1;
	color: #476582;
	padding: 8px 18px;
	font-weight: 500;
	border-radius: 8px;
	transition: background-color 0.5s, color 0.5s;
}
.actions .get-started {
	font-size: 16px;
	display: inline-block;
	border-radius: 8px;
	transition: background-color 0.5s, color 0.5s;
	position: relative;
	font-weight: 600;
	background-color: #42b883;
	color: #fff;
	margin-right: 18px;
	padding: 8px 1em;
}
.actions .icon {
	display: inline;
	position: relative;
	top: -1px;
	margin-left: 2px;
	fill: currentColor;
	transition: transform 0.2s;
}
</style>
