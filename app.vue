<script setup lang="ts">
import { getUser } from "./plugins/firebase/auth";

const user = ref(null);

const route = useRoute();

const verifyUser = ref(null);

const startVerify = () => {
	verifyUser.value = setInterval(() => {
		if (getUser()) {
			if (route.path === "/dashboard/login") {
				navigateTo("/dashboard");
			}
			user.value = getUser();
			clearInterval(verifyUser);
		} else {
			user.value = null;
		}
	}, 100);
};

onMounted(() => {
	startVerify();
});
</script>

<template>
	<div>
		<Head>
			<Title>Kibo - Kanban</Title>
			<Meta name="description" content="Kibo - Kanban" />
		</Head>
		<div>
			<Header
				v-if="user && route.path !== '/'"
				@logout="
					() => {
						startVerify();
					}
				"
			/>

			<NuxtPage />
		</div>
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

.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}

.p-card .p-card-content {
	padding: 1.25rem 0 !important;
	display: flex !important;
	flex-direction: column !important;
}

/* .p-progress-spinner-circle {
	animation: p-progress-spinner-dash 1.5s ease-in-out infinite, p-progress-spinner-color 6s ease-in-out infinite;
	-webkit-animation: p-progress-spinner-dash 1.5s ease-in-out infinite, p-progress-spinner-color 6s ease-in-out infinite;
} */

@keyframes p-progress-spinner-color {
	100%,
	0% {
		stroke: #14b8a6;
	}
	40% {
		stroke: #14b8a6;
	}
	66% {
		stroke: white;
	}
	80%,
	90% {
		stroke: #14b8a6;
	}
}
</style>
