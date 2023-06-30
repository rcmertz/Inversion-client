<script setup lang="ts">
  import { router } from '@/routes/routes';
  import { changePage, useOperation } from '@/stores/operation';
  import { Icon } from '@iconify/vue';
  import { reactive, watchEffect } from 'vue';

  interface Props {
    pages: number[];
  }

  const props = defineProps<Props>();

  const page = reactive({
    current: 1,
    prev: 0,
    next: 2,
  });

  function prevPage() {
    let newPage = useOperation.page - 1;
    if (newPage < 0) {
      newPage = props.pages.length - 1;
    }

    changePage(newPage);
  }

  function nextPage() {
    let newPage = useOperation.page + 1;
    if (newPage >= props.pages.length) {
      newPage = 0;
    }

    changePage(newPage);
  }

  // ao mudar de rota,
  // zera os valores de busca
  router.beforeEach((_to) => {
    useOperation.investmentId = 0;
    useOperation.dates.start = '';
    useOperation.dates.end = '';
  });

  // atualiza a paginação quando algum dos
  // valores dentro do callback mudar
  watchEffect(() => {
    page.current = useOperation.page + 1;
    page.prev = useOperation.page;
    page.next = useOperation.page + 2;
  });
</script>

<template>
  <div class="btns-container">
    <button type="button" class="page-btn" @click="useOperation.page = 0" v-if="pages.length > 5">
      <Icon icon="ci:chevron-left-duo" class="icon" />
    </button>
    <button type="button" class="page-btn" @click="prevPage">
      <Icon icon="ci:chevron-left" class="icon" />
    </button>
    <button
      type="button"
      v-for="item in pages"
      v-if="pages.length <= 5"
      :class="item === useOperation.page ? 'page-btn active' : 'page-btn'"
      @click="useOperation.page = item"
    >
      {{ item + 1 }}
    </button>
    <div class="btns-container" v-if="pages.length > 5">
      <button
        v-if="page.current === pages.length"
        type="button"
        class="page-btn"
        @click="useOperation.page = pages[page.prev - 2]"
      >
        {{ pages[page.prev] - 1 }}
      </button>
      <button
        v-if="page.current !== 1"
        type="button"
        class="page-btn"
        @click="useOperation.page = pages[page.prev - 1]"
      >
        {{ pages[page.prev] }}
      </button>
      <button
        type="button"
        v-if="page.current !== pages.length"
        :class="pages[page.current] - 1 === useOperation.page ? 'page-btn active' : 'page-btn'"
        @click="useOperation.page = pages[page.current - 1]"
      >
        {{ pages[page.current] }}
      </button>
      <button
        type="button"
        v-else
        class="page-btn active"
        @click="useOperation.page = pages.length - 1"
      >
        {{ pages.length }}
      </button>
      <button
        v-if="page.current + 1 < pages.length"
        type="button"
        class="page-btn"
        @click="useOperation.page = pages[page.next - 1]"
      >
        {{ pages[page.next] }}
      </button>
      <button
        v-if="page.next === pages.length"
        type="button"
        class="page-btn"
        @click="useOperation.page = pages[page.next - 1]"
      >
        {{ pages.length }}
      </button>
      <button
        v-if="page.current === 1"
        type="button"
        class="page-btn"
        @click="useOperation.page = pages[page.next]"
      >
        {{ pages[page.next] + 1 }}
      </button>
    </div>
    <button type="button" class="page-btn" @click="nextPage">
      <Icon icon="ci:chevron-right" class="icon" />
    </button>
    <button type="button" class="page-btn" @click="useOperation.page = pages.length - 1" v-if="pages.length > 5">
      <Icon icon="ci:chevron-right-duo" class="icon" />
    </button>
  </div>
</template>

<style scoped>
  .btns-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
  }

  .page-btn {
    background-color: #ffffff;
    color: var(--primary);
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    border-radius: 6px;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }

  .page-btn:hover {
    background-color: var(--primary);
    color: #fff;
  }

  .page-btn.active {
    background-color: var(--primary);
    color: #fff;
  }

  .page-btn:disabled {
    pointer-events: none;
    user-select: none;
  }

  .icon {
    font-size: 28px;
  }
</style>
