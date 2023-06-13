<script setup lang="ts"></script>

<template>
  <nav>
    <ul>
      <li v-for="(_item, index) in [...Array(3)]">
        {{ index + 1 }}
      </li>
    </ul>
  </nav>
</template>

<style scoped>
  nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #d9d9d925;
    border-radius: 10px;
    padding: 46px 92px;
  }

  ul {
    display: flex;
    gap: 8px;
  }

  li {
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    background-color: #fff;
    font-family: var(--montserrat);
    font-weight: 700;
    border-radius: 4px;
    border: 1px solid #dfe3e8;
    cursor: pointer;
  }
</style>
