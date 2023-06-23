<script setup lang="ts">
import { data as posts } from './blog.data'
</script>

<template>
  <ul>
    <li v-for="post of posts">
      {{post.date.string}} <a :href="post.url">{{ post.title }}</a>
    </li>
  </ul>
</template>

<style scoped>
a {
  margin-left: 3rem;
}
li {
  list-style-type: none;
}
</style>