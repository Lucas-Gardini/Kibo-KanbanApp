<script setup>
import "../plugins/firebase";
import { register, login } from "../plugins/firebase/auth";
import Menubar from "primevue/menubar";
import Avatar from "primevue/avatar";

onMounted(async () => {
	register("lucasgardini.dias@hotmail.com", "30062004");
});

const items = ref([
	{
		label: "File",
		icon: "pi pi-fw pi-file",
		items: [
			{
				label: "New",
				icon: "pi pi-fw pi-plus",
				items: [
					{
						label: "Bookmark",
						icon: "pi pi-fw pi-bookmark",
					},
					{
						label: "Video",
						icon: "pi pi-fw pi-video",
					},
				],
			},
			{
				label: "Delete",
				icon: "pi pi-fw pi-trash",
			},
			{
				separator: true,
			},
			{
				label: "Export",
				icon: "pi pi-fw pi-external-link",
			},
		],
	},
	{
		label: "Edit",
		icon: "pi pi-fw pi-pencil",
		items: [
			{
				label: "Left",
				icon: "pi pi-fw pi-align-left",
			},
			{
				label: "Right",
				icon: "pi pi-fw pi-align-right",
			},
			{
				label: "Center",
				icon: "pi pi-fw pi-align-center",
			},
			{
				label: "Justify",
				icon: "pi pi-fw pi-align-justify",
			},
		],
	},
	{
		label: "Users",
		icon: "pi pi-fw pi-user",
		items: [
			{
				label: "New",
				icon: "pi pi-fw pi-user-plus",
			},
			{
				label: "Delete",
				icon: "pi pi-fw pi-user-minus",
			},
			{
				label: "Search",
				icon: "pi pi-fw pi-users",
				items: [
					{
						label: "Filter",
						icon: "pi pi-fw pi-filter",
						items: [
							{
								label: "Print",
								icon: "pi pi-fw pi-print",
							},
						],
					},
					{
						icon: "pi pi-fw pi-bars",
						label: "List",
					},
				],
			},
		],
	},
	{
		label: "Events",
		icon: "pi pi-fw pi-calendar",
		items: [
			{
				label: "Edit",
				icon: "pi pi-fw pi-pencil",
				items: [
					{
						label: "Save",
						icon: "pi pi-fw pi-calendar-plus",
					},
					{
						label: "Delete",
						icon: "pi pi-fw pi-calendar-minus",
					},
				],
			},
			{
				label: "Archieve",
				icon: "pi pi-fw pi-calendar-times",
				items: [
					{
						label: "Remove",
						icon: "pi pi-fw pi-calendar-minus",
					},
				],
			},
		],
	},
	{
		label: "Quit",
		icon: "pi pi-fw pi-power-off",
	},
]);
</script>

<template>
	<Menubar :model="items">
		<template #start> Before </template>

		<template #end> <Avatar image="user.png" /> </template>
	</Menubar>
</template>

<style>
.p-toolbar {
	border: none;
	background: #f8f9fa;
	border-radius: 0px;
	padding: 1rem;
}
</style>
