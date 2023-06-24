<script setup lang="ts">
import { data as posts } from './blog.data'
</script>

<template>
  <ul>
    <li v-for="post of posts" class="list-none">
      {{post.date.string}}
      <br class="sm:hidden"/>
      <a :href="post.url" class="ml-2 sm:ml-12">{{ post.title }}</a>
    </li>
  </ul>
</template>