<script lang="ts" setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import ContextMenu from "primevue/contextmenu";
import { readDoc, updateDoc } from "~~/plugins/firebase/db";
import { IColumn, IProject, ITask } from "~~/utils/types/firebase.types";
import { DateTime } from "luxon";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

const columnMenuItems = ref([
	{
		label: "Nova Tarefa",
		icon: "pi pi-fw pi-file",
		class: "menu-add menu-context",
		command: async () => {
			creatingNewTask.value = true;
		},
	},
	{
		separator: true,
	},
	{
		label: "Excluir",
		icon: "pi pi-fw pi-trash",
		class: "menu-delete menu-context",
		command: async () => {
			columns.value = columns.value.filter((column) => column.name !== columnContext.value);
			tasks.value = tasks.value.filter((task) => task.column !== columnContext.value);
			await saveEverything();
		},
	},
] as any);

const taskMenuItems = ref([
	{
		label: "Editar Tarefa",
		icon: "pi pi-fw pi-file",
		class: "menu-add menu-context",
		command: async () => {
			creatingNewTask.value = true;
		},
	},
	{
		separator: true,
	},
	{
		label: "Excluir Tarefa",
		icon: "pi pi-fw pi-trash",
		class: "menu-delete menu-context",
		command: async () => {
			tasks.value = tasks.value.filter((task) => task.column !== columnContext.value);
			await saveEverything();
		},
	},
] as any);

const route = useRoute();
const columnMenu = ref(null);
const taskMenu = ref(null);
const columnContext = ref(null);
const taskContext = ref(null);
const project = ref({} as IProject);
const columns = ref([] as IColumn[]);
const tasks = ref([] as ITask[]);
const editing = ref(null as any);
const create = ref(false);
const creating = ref({ name: "", color: "#ffffff" });
const creatingNewTask = ref(false);
const newTask = ref({ name: "", description: "", column: "" });
const editingTask = ref(false);
const canDragColumn = ref(true);

const getProject = async () => {
	project.value = (await readDoc("projects", ["id", "==", route.params.project.toString()])) as IProject;
	columns.value = project.value.columns;
	tasks.value = project.value.tasks;
	project.value.id = route.params.project.toString();
};

const saveColumn = async () => {
	if (editing.value) {
		if (editing.value.name.length > 0) {
			await getProject();
		}
	} else {
		if (creating.value.name.length > 0) {
			create.value = false;

			if (project.value.columns) {
				project.value.columns.push({
					name: creating.value.name,
					color: creating.value.color,
					updatedAt: DateTime.local().toJSDate(),
				});
			} else {
				project.value.columns = [
					{
						name: creating.value.name,
						color: creating.value.color,
						updatedAt: DateTime.local().toJSDate(),
					},
				];
			}

			const columns = [...project.value.columns];

			await updateDoc("projects", project.value.id, {
				name: project.value.name,
				description: project.value.description,
				createdAt: project.value.createdAt,
				updatedAt: DateTime.now().toFormat("dd/MM/yyyy"),
				owner: project.value.owner,
				columns,
				tasks: project.value.tasks,
			});

			// await getProject();
		}
	}
};

const saveTask = async () => {
	tasks.value.push({
		name: newTask.value.name,
		description: newTask.value.description,
		column: columnContext.value,
	});

	await updateDoc("projects", project.value.id, {
		name: project.value.name,
		description: project.value.description,
		createdAt: project.value.createdAt,
		updatedAt: DateTime.now().toFormat("dd/MM/yyyy"),
		owner: project.value.owner,
		columns: project.value.columns,
		tasks: tasks.value,
	});

	creatingNewTask.value = false;
	editingTask.value = false;
	newTask.value = { name: "", description: "", column: "" };

	await getProject();
};

const saveEverything = async () => {
	try {
		await updateDoc("projects", project.value.id, {
			name: project.value.name,
			description: project.value.description,
			createdAt: project.value.createdAt,
			updatedAt: DateTime.now().toFormat("dd/MM/yyyy"),
			owner: project.value.owner,
			columns: columns.value,
			tasks: project.value.tasks,
		});
	} catch (error) {}
	canDragColumn.value = true;
};

const dragColumn = (event) => {
	// console.log(event.relatedTarget);
	if (event.relatedTarget && event.relatedTarget.id && canDragColumn.value) {
		try {
			const indexOfFrom = columns.value.findIndex((column) => {
				return column ? column.name === event.relatedTarget.id : false;
			});
			const indexOfTo = columns.value.findIndex((column) => {
				return column ? column.name === event.srcElement.id : false;
			});

			if (indexOfFrom > -1 && indexOfTo > -1) {
				const temp = columns.value[indexOfFrom];
				columns.value[indexOfFrom] = columns.value[indexOfTo];
				columns.value[indexOfTo] = temp;
			}
		} catch (error) {}
	}
};

const dragTask = (event) => {
	canDragColumn.value = false;
	if (event.relatedTarget && event.relatedTarget.id && !canDragColumn.value) {
		console.log(event.relatedTarget.parentElement.parentElement.parentElement.id);
		console.log(event.srcElement.id);
		try {
			const indexOfTask = tasks.value.findIndex((task) => {
				return task ? task.name === event.relatedTarget.id : false;
			});

			// console.log(indexOfTask);
		} catch (error) {}
	}
};

const getOnlyColumnTasks = (column: IColumn) => {
	return tasks.value.filter((task) => task.column === column.name);
};

const onColumnContextMenu = (event) => {
	columnContext.value = event.target.id;
	columnMenu.value.show(event);
};

const onTaskContextMenu = (event) => {
	taskContext.value = event.target.id;
	taskMenu.value.show(event);
};

onMounted(async () => {
	await getProject();
});
</script>

<template>
	<div v-if="project.name">
		<div class="project">
			<Toolbar style="background-color: white">
				<template #start>
					<h1>{{ project.name }}</h1>
				</template>

				<template #end>
					<Button icon="pi pi-refresh" class="btn refresh-btn p-button-rounded p-button-text" @click="getProject" />
					<Button
						icon="pi pi-plus"
						title="Adicionar projeto"
						class="btn p-button-primary mr-2"
						style="margin-right: 5px"
						@click="create = true"
					/>
				</template>
			</Toolbar>

			<Dialog
				:header="editing ? 'Edição' : 'Criação'"
				@hide="(editing = null), getProject()"
				v-model:visible="create"
				:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
				:style="{ width: '350px' }"
				:modal="true"
			>
				<template #default>
					<span class="p-float-label" style="margin-top: 20px; margin-bottom: 40px">
						<InputText v-if="!editing" style="width: 100%" type="text" v-model="creating.name" />
						<InputText v-else style="width: 100%" type="text" v-model="editing.name" />
						<label>Coluna</label>
					</span>

					<label>Cor: &nbsp;</label>
					<!-- <ColorPicker v-if="!editing" v-model="creating.color" />
				<ColorPicker v-else v-model="editing.color" /> -->
					<input v-if="!editing" type="color" v-model="creating.color" />
					<input v-else type="color" v-model="editing.color" />
				</template>

				<template #footer>
					<Button
						label="Cancelar"
						icon="pi pi-times"
						@click="(create = false), (editing = null), getProject()"
						class="p-button-text p-button-danger"
					/>
					<Button :label="editing ? 'Salvar' : 'Criar'" icon="pi pi-check" @click="saveColumn" class="p-button-text p-button-primary" />
				</template>
			</Dialog>

			<Dialog
				:header="`Adicionando tarefa (${columnContext})`"
				@hide="(editingTask = false), getProject()"
				v-model:visible="creatingNewTask"
				:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
				:style="{ width: '350px' }"
				:modal="true"
			>
				<template #default>
					<span class="p-float-label" style="margin-top: 20px; margin-bottom: 40px">
						<InputText v-if="!editingTask" style="width: 100%" type="text" v-model="newTask.name" />
						<!-- <InputText v-else style="width: 100%" type="text" v-model="editing.name" /> -->
						<label>Tarefa</label>
					</span>

					<span class="p-float-label" style="margin-top: 20px; margin-bottom: 40px">
						<InputText v-if="!editingTask" style="width: 100%" type="text" v-model="newTask.description" />
						<!-- <InputText v-else style="width: 100%" type="text" v-model="editing.name" /> -->
						<label>Descrição</label>
					</span>
				</template>

				<template #footer>
					<Button
						label="Cancelar"
						icon="pi pi-times"
						@click="(creatingNewTask = false), (editingTask = false), getProject()"
						class="p-button-text p-button-danger"
					/>
					<Button :label="editingTask ? 'Salvar' : 'Criar'" icon="pi pi-check" @click="saveTask" class="p-button-text p-button-primary" />
				</template>
			</Dialog>
		</div>
		<div
			class="columns"
			:style="`
					display: grid;
					grid-template-columns: repeat(${columns ? columns.length : 0}, 250px);
					grid-template-rows: 100%;
					grid-column-gap: 0px;
					grid-row-gap: 0px;
					overflow-x: auto;
					${!canDragColumn ? 'z-index: 0' : 'z-index: 9999'}
					`"
			draggable="false"
		>
			<ContextMenu ref="columnMenu" :model="columnMenuItems" />
			<div
				v-for="(column, i) in columns"
				:key="i"
				:id="column.name"
				class="column"
				:style="`border-top: 10px groove ${column.color}`"
				:draggable="canDragColumn"
				@dragenter="dragColumn"
				@dragend="saveEverything"
				@contextmenu="onColumnContextMenu($event)"
			>
				<h3>{{ column.name }}</h3>
				<Accordion v-if="!canDragColumn">
					<AccordionTab>
						<template #header> Mover pra cá </template>
					</AccordionTab>
				</Accordion>
				<Accordion
					:style="!canDragColumn ? 'z-index: 0' : 'z-index: 9999'"
					draggable="true"
					v-for="(task, j) in getOnlyColumnTasks(column)"
					:id="task.name"
					@dragenter="dragTask"
					@dragend="saveEverything"
					@contextmenu="onTaskContextMenu($event)"
				>
					<ContextMenu ref="taskMenu" :model="taskMenuItems" />
					<AccordionTab>
						<template #header>
							{{ task.name }}
						</template>
						<template #default>
							{{ task.description }}
						</template>
					</AccordionTab>
				</Accordion>
			</div>
		</div>
	</div>
</template>

<style>
.btn {
	display: auto;
}

.project {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	height: calc(20vh);
	/* max-height: calc(100vh - 58px); */
	padding-top: 25px;
	padding-left: 25px;
	padding-right: 25px;
}

.columns {
	min-width: 100%;
	max-width: 100%;
	/* justify-content: space-between; */
	height: calc(100vh - 20vh - 100px);
	overflow-x: auto;
	padding-left: 5px;
	padding-right: 5px;
}

.column {
	border: 1px solid black;
	height: 100%;
	max-width: 250px;
	padding: 15px;
	/* margin-right: 12.5px; */
	/* margin-left: 12.5px; */
}

.menu-context *:hover {
	background: rgb(244, 243, 243) !important;
}

.menu-delete * {
	color: red !important;
}

.menu-add * {
	color: #14b8a6 !important;
}

@media (max-width: 500px) {
	body {
		overflow: scroll !important;
	}

	.project {
		height: calc(20vh);
	}

	.btn {
		display: none;
	}

	.columns {
		flex-direction: column;
		height: calc(100vh);
	}

	.column {
		min-width: 100%;
		margin: auto;
	}
}
</style>
