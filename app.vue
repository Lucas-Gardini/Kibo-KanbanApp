<script setup>
import { getUser } from "./plugins/firebase/auth";
const user = ref(null);

const verifyUser = setInterval(() => {
	if (getUser()) {
		user.value = getUser();
		clearInterval(verifyUser);
	}
}, 100);
</script>

<template>
	<div>
		<Head>
			<Title>Kibo - Kanban</Title>
			<Meta name="description" content="Kibo - Kanban" />
		</Head>
		<Header v-if="user" />

		<NuxtPage />
	</div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=swap");

html,
body {
	margin: 0;
	padding: 0;
	font-family: "Nunito", sans-serif;
}

.p-card .p-card-content {
	padding: 1.25rem 0 !important;
	display: flex !important;
	flex-direction: column !important;
}
</style>
