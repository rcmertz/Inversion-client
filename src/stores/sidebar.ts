import { ref } from 'vue';

export const isOpen = ref(false);

export function toggleSidebar() {
  isOpen.value = !isOpen.value;
}
