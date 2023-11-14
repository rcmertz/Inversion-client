<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { sidebar } from '@/data/sidebar';
import { isOpen, toggleSidebar } from '@/stores/sidebar';
import { useRouter } from 'vue-router';
import { localLogout, useUser } from '@/stores/user';

const router = useRouter();

// logout
async function handleLogout() {
  await localLogout();
  router.push('/login');
}
</script>

<template>
  <aside :class="isOpen ? 'sidebar open' : 'sidebar'" style="overflow-y: auto;">
    <div class="top">
      <div class="header">
        <h1 v-if="isOpen">Inversión</h1>
        <button type="button" @click="toggleSidebar">
          <Icon :icon="isOpen ? 'heroicons:arrow-left-20-solid' : 'heroicons:arrow-right-20-solid'"
            class="icon toggle-icon" />
        </button>
      </div>
      <div
        v-if="$route.path.includes('carteira') || $route.path.includes('operacao') || $route.path.includes('aprendamais')"
        class="current-user">
        <Icon icon="ooui:user-avatar" class="user-icon" />
        <p v-if="isOpen && useUser.user">{{ useUser.user.nome }}</p>
      </div>
      <div class="links-list">
        <RouterLink active-class="link active" :to="item.route" v-for="item in sidebar" :key="item.id"
          :class="isOpen ? 'link open' : 'link'">
          <Icon :icon="item.icon" class="icon link-icon" />
          <h6 v-if="isOpen">{{ item.name }}</h6>
        </RouterLink>
      </div>
    </div>
    <button type="button" class="logout" @click="handleLogout">
      <Icon icon="material-symbols:logout-rounded" class="icon logout-icon" />
    </button>
  </aside>
</template>

<style scoped>
.sidebar {
  background-color: var(--sidebar);
  height: 100vh;
  width: 102px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 35px 35px 72px;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  box-shadow: 0px 0px 16px -1px rgba(0, 0, 0, 0.25);
  transition: all 0.3s;
}

.sidebar.open {
  /* width: 17vw; */
  width: 378px;
}

.top {
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 77px;
  height: 38px;
}

h1 {
  color: #fff;
  border-left: 4px solid #435669;
  font-family: var(--poppins);
  font-weight: 600;
  font-size: 25px;
  padding-left: 19px;
  text-transform: uppercase;
  cursor: default;
  user-select: none;
}

.toggle-icon {
  color: #fff;
  cursor: pointer;
}

.sidebar .current-user {
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 8px 0px;
  background-color: var(--primary-alt);
  border-radius: 20px;
  margin: 0 auto;
  margin-bottom: 73px;
  transition: all 0.3s;
}

.sidebar.open .current-user {
  padding: 8px 16px;
}

.current-user>p {
  font-size: 17px;
  font-family: var(--montserrat);
  font-weight: 500;
}

.user-icon {
  font-size: 24px;
}

.links-list {
  display: flex;
  flex-direction: column;
  gap: 42px;
  overflow-y: auto;
}

.link {
  display: flex;
  align-items: center;
  padding-block: 22px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s;
}

.link.open {
  background-color: #fff;
  padding-inline: 27px;
  cursor: pointer;
}

.link.open:hover {
  background-color: var(--primary);
}

.link.open.active {
  background-color: var(--primary);
}

.link.active>.link-icon {
  color: var(--primary);
}

.link>h6 {
  text-align: center;
  margin: 0 auto;
  font-family: var(--montserrat);
  font-weight: 500;
  font-size: 14px;
  color: #000;
}

.link>.link-icon {
  color: #fff;
}

.link.open>.link-icon {
  color: #000;
}

.link-icon {
  transition: all 0.3s;
}

.link:hover>.link-icon {
  color: var(--primary);
}

.link.open:hover>.link-icon {
  color: #000;
}

.logout {
  align-self: center;
  width: 32px;
  height: 32px;
}

.icon {
  font-size: 32px;
  cursor: pointer;
}

.logout-icon {
  color: white;
  font-size: 32px;
  transition: all 0.3s;
}

.logout-icon:hover {
  color: var(--primary);
}

::-webkit-scrollbar {
  width: 12px;
  /* Set the width of the scrollbar */
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  /* Set the background color of the track */
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  /* Set the color of the thumb */
  border-radius: 6px;
  /* Round the corners of the thumb */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
  /* Change thumb color on hover */
}
</style>
