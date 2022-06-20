<script setup>
import { getUser, logout } from "../plugins/firebase/auth";
import Menubar from "primevue/menubar";
import Avatar from "primevue/avatar";
import Image from "primevue/image";
import itemsjson from "../assets/menubar.json";

const items = ref(itemsjson);
const user = ref(getUser());
const pfpUrl = ref(
	user.value.photoURL
		? user.photoURL
		: `https://avatars.dicebear.com/api/initials/${user.value.displayName ? user.value.displayName : user.value.email}.svg`
);

onMounted(async () => {
	await logout();
});
</script>

<template>
	<Menubar :model="items">
		<template #start>
			<Image src="logo/png/black_nobackground.png" alt="Image Text" imageStyle="height: 50px" />
		</template>

		<template #end>
			<Avatar :image="pfpUrl" />
		</template>
	</Menubar>
</template>

<style>
.p-toolbar {
	border: none;
	background: #f8f9fa;
	border-radius: 0px;
	padding: 1rem;
}

.p-menubar .p-menubar-start {
	margin-right: 15px;
	margin-left: 5px;
}

@media screen and (max-width: 960px) {
	.p-menubar .p-menubar-start {
		display: none !important;
	}
}
</style>
