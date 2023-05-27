<template>
	<HelloWorld msg="Welcome to Your Vue.js App" />
	<HelloWorld msg="Welcome to Your Vue.js App" />
	<h1>test</h1>
	<router-link to="/home">Go to Foo</router-link>

	<router-view>
	</router-view>
</template>

<style>
margin-top: 60px;

@import "~bulma/bulma.sass";

body {
	width: 100vw;
	height: 100vh;
	margin: 0;
	padding: 0;
	font-family: "Nunito", sans-serif;
	overflow: hidden;
	scrollbar-width: none;
	-ms-overflow-style: -ms-autohiding-scrollbar;
}

body::-webkit-scrollbar {
	display: none;
}

.background {
	background-color: #435669;
	width: 100vw;
	height: 100%;
	overflow: hidden;
}
</style>