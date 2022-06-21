<script setup lang="ts">
import { getUser, logout } from "../plugins/firebase/auth";
import Menubar from "primevue/menubar";
import Avatar from "primevue/avatar";
import Image from "primevue/image";
import itemsjson from "../assets/menubar.json";
import Menu from "primevue/menu";

const emit = defineEmits(["logout"]);

const items = ref(itemsjson as any);
const user = ref(null as unknown as ReturnType<typeof getUser>);
const pfpUrl = ref(null);
const menu = ref(null);

onMounted(() => {
	user.value = getUser();
	console.log(user.value.photoURL);
	pfpUrl.value = user.value.photoURL
		? user.value.photoURL
		: `https://avatars.dicebear.com/api/initials/${user.value.displayName ? user.value.displayName : user.value.email}.svg`;
});

const toggle = (event) => {
	menu.value.toggle(event);
};

const userMenu = [
	{
		label: "Account",
		items: [
			{ label: "Configurações", icon: "pi pi-fw pi-cog", to: "/configuracoes" },
			{ label: "Sair", icon: "pi pi-fw pi-power-off", command: () => logout() && emit("logout") },
		],
	},
];
</script>

<template>
	<Menubar :model="items">
		<template #start>
			<Image src="logo/png/black_nobackground.png" alt="Image Text" imageStyle="height: 50px" />
		</template>

		<template #end>
			<Avatar :image="pfpUrl" style="cursor: pointer" @click="toggle" shape="circle" />
			<Menu ref="menu" :model="userMenu" :popup="true" />
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
