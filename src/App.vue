<template style="height: 100%; width: 100%; overflow:hidden">
	<div class="columns is-12">
		<div class=" column is-2">
			<SidebarComponent></SidebarComponent>
		</div>
		<div class="column is-10">
			<RouterView></RouterView>
		</div>
	</div>
</template>

<script lang="ts">

import { RouterView } from 'vue-router';
import SidebarComponent from './components/SidebarComponent.vue'
import LoginPage from './views/LoginPage.vue';
export default {
	components: {
    SidebarComponent,
    RouterView,
}
}
</script>

<style lang="scss">
:root {
	--primary: #4ade80;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

body {
	background: var(--light);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;
	overflow: hidden;

	main {
		overflow: hidden;
		flex: 1 1 0;
		padding: 2rem;

		@media (max-width: 30vw) {
			padding-left: 6rem;
		}
	}
}
</style>
