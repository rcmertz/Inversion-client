<script setup lang="ts">
import { router } from '@/routes/routes';
import {
  getLocalOperationsByDate,
  getLocalOperationsByDateAndInvestment,
  getLocalOperationsByInvestment,
  getLocalOperationsByWallet,
  useOperation,
} from '@/stores/operation';
import { Icon } from '@iconify/vue';
import { computed, reactive, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const pages = computed(() => {
  return Array.from({ length: useOperation.totalPages }, (_item, index) => {
    return index;
  });
});

const route = useRoute();

const values = reactive({
  current: 1,
  prev: 0,
  next: 2,
  last: useOperation.totalPages,
});

watch(
  () => useOperation.page,
  (value) => {
    values.current = value + 1;
    values.prev = value;
    values.next = value + 2;
    values.last = useOperation.totalPages;
  }
);

function prevPage() {
  let newPage = useOperation.page - 1;
  if (newPage < 0) {
    newPage = pages.value.length - 1;
  }

  useOperation.page = newPage;
}

function nextPage() {
  let newPage = useOperation.page + 1;
  if (newPage >= pages.value.length) {
    newPage = 0;
  }

  useOperation.page = newPage;
}

router.beforeEach((_to) => {
  useOperation.investmentId = 0;
  useOperation.dates.start = '';
  useOperation.dates.end = '';
});

watchEffect(async () => {
  if (
    useOperation.investmentId > 0 &&
    useOperation.dates.start !== '' &&
    useOperation.dates.end !== ''
  ) {
    await getLocalOperationsByDateAndInvestment({
      size: 10,
      end: useOperation.dates.end,
      start: useOperation.dates.start,
      id: useOperation.investmentId,
    });
  } else if (useOperation.dates.start !== '' && useOperation.dates.end !== '') {
    await getLocalOperationsByDate({
      size: 10,
      end: useOperation.dates.end,
      start: useOperation.dates.start,
      carteira: Number(route.params.id),
    });
  } else if (
    useOperation.investmentId === 0 &&
    useOperation.dates.start !== '' &&
    useOperation.dates.end !== ''
  ) {
    await getLocalOperationsByDate({
      size: 10,
      end: useOperation.dates.end,
      start: useOperation.dates.start,
      carteira: Number(route.params.id),
    });
  } else if (useOperation.investmentId > 0) {
    if (useOperation.dates.start !== '' && useOperation.dates.end !== '') {
      await getLocalOperationsByDateAndInvestment({
        size: 10,
        end: useOperation.dates.end,
        start: useOperation.dates.start,
        id: useOperation.investmentId,
      });
    } else {
      await getLocalOperationsByInvestment({ size: 10, id: useOperation.investmentId });
    }
  } else {
    await getLocalOperationsByWallet({ size: 10, carteira: Number(route.params.id) });
  }
});
</script>

<template>
  <div class="btns-container" v-if="pages.length > 1">
    <button type="button" class="page-btn" @click="prevPage">
      <Icon icon="bxs:chevron-left" class="icon" />
    </button>
    <button type="button" class="page-btn" v-if="values.prev > 1 && values.prev - values.current + 1 === 0"
      @click="useOperation.page = 0">
      1
    </button>
    <button type="button" class="page-btn" v-if="values.prev > 2 && values.prev - values.current + 1 === 0" disabled>
      ...
    </button>
    <button type="button" class="page-btn" v-if="values.current > 1" @click="useOperation.page = values.prev - 1">
      {{ values.prev }}
    </button>
    <button type="button" :class="useOperation.page === values.current - 1 ? 'page-btn active' : 'page=btn'"
      @click="useOperation.page = values.current - 1">
      {{ values.current }}
    </button>
    <button type="button" class="page-btn" v-if="values.next < pages.length + 1"
      @click="useOperation.page = values.next - 1">
      {{ values.next }}
    </button>
    <button type="button" class="page-btn" v-if="values.next < pages.length && values.last - pages.length === 0" disabled>
      ...
    </button>
    <button type="button" class="page-btn" v-if="values.next < pages.length && values.last - pages.length === 0"
      @click="useOperation.page = values.last - 1">
      {{ values.last }}
    </button>
    <button type="button" class="page-btn" @click="nextPage">
      <Icon icon="bxs:chevron-right" class="icon" />
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
