import { ref } from 'vue';

export const isOpen = ref(false);

// alterna valor da sidebar 
export function toggleSidebar() {
  isOpen.value = !isOpen.value;
}
