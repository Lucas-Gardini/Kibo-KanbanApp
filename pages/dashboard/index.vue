<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Tooltip from "primevue/tooltip";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";

import { readDoc, deleteDoc, createDoc, updateDoc } from "~~/plugins/firebase/db";
import { getUser } from "~~/plugins/firebase/auth";
import { DateTime } from "luxon";

const docs = ref([]);
const user = ref(getUser());
const alert = ref(false);
const create = ref(false);
const deleting = ref({} as any);
const deleted = ref(false);
const editing = ref(null as any);
const errored = ref(false);
const error = ref("");
const creating = ref({ name: "", description: "" });

const vTooltip = Tooltip;

onMounted(async () => {
	await getAllProjects();
});

const getAllProjects = async () => {
	const project = (await readDoc("projects", ["owner", "==", user.value.email])) as any;
	docs.value = [...project.docs];

	docs.value = docs.value.map((doc) => {
		const id = doc.id;
		return { ...doc, ...doc.data(), id };
	});
};

const createProject = async ({ edit }: { edit?: boolean }) => {
	try {
		if (edit) {
			console.log(editing.value);
			create.value = false;
			await updateDoc("projects", editing.value.id, {
				name: editing.value.name,
				description: editing.value.description,
				createdAt: editing.value.createdAt,
				updatedAt: DateTime.now().toFormat("dd/MM/yyyy"),
				owner: user.value.email,
				tasks: editing.value.tasks,
			});
		} else {
			create.value = false;
			await createDoc("projects", {
				name: creating.value.name,
				description: creating.value.description,
				owner: user.value.email,
				tasks: [],
				createdAt: DateTime.now().toFormat("dd/MM/yyyy"),
			});
		}

		await getAllProjects();
	} catch (e) {
		errored.value = true;
		error.value = e.message;
	}
};

const deleteProject = async () => {
	try {
		alert.value = false;
		await deleteDoc("projects", deleting.value.id);
		deleted.value = true;

		await getAllProjects();
	} catch (e) {
		errored.value = true;
		error.value = e.message;
	}
};
</script>

<template>
	<div class="dashboard">
		<Toolbar style="background-color: white">
			<template #start> <h1>Projetos</h1> </template>

			<template #end>
				<Button icon="pi pi-plus" title="Adicionar projeto" class="p-button-primary mr-2" @click="create = true" />
			</template>
		</Toolbar>
		<DataTable v-if="docs.length > 0" :value="docs" sortable showFilterMenu showFilterOperator showClearButton showApplyButton>
			<Column header="Nome">
				<template #body="slotProps">
					<NuxtLink style="color: black; cursor: pointer; text-decoration: none" :to="`/dashboard/${slotProps.data.id}`">{{
						slotProps.data.name
					}}</NuxtLink>
				</template>
			</Column>
			<Column field="description" header="Descrição" class="description">
				<template #body="slotProps">
					<span>{{ slotProps.data.description.length > 0 ? slotProps.data.description.substring(0, 50) + "..." : "Sem descrição" }}</span>
				</template>
			</Column>
			<Column field="createdAt" header="Data de criação"></Column>
			<Column class="buttons">
				<template #body="slotProps">
					<Button
						type="button"
						icon="pi pi-trash"
						class="p-button-danger button"
						style="margin-right: 15px"
						v-tooltip.bottom="'Excluir projeto'"
						@click="(deleting = slotProps.data) && (alert = true)"
					></Button>
					<Button
						type="button"
						icon="pi pi-pencil"
						class="p-button-secondary button"
						style="margin-right: 15px"
						v-tooltip.bottom="'Editar projeto'"
						@click="(editing = slotProps.data) && (create = true)"
					></Button>
					<Button
						type="button"
						icon="pi pi-arrow-right"
						class="p-button-primary button"
						v-tooltip.bottom="'Acessar projeto'"
						@click="navigateTo(`/dashboard/${slotProps.data.id}`)"
					></Button>
				</template>
			</Column>
		</DataTable>

		<div v-else style="display: flex; flex-direction: column; margin-left: auto; margin-right: auto">
			<img src="~/assets/no_data.svg" alt="Imagem representando vazio" style="margin: auto; height: 250px" />
			<h2 style="margin: auto; margin-top: 25px">Sem Projetos</h2>
		</div>

		<Dialog header="Alerta" v-model:visible="deleted" :modal="true">
			Projeto <strong>{{ deleting.name }}</strong> excluído!
		</Dialog>

		<Dialog header="Alerta" v-model:visible="errored" :modal="true">
			Ocorreu um erro ao realizar a ação! <br />
			{{ error }}</Dialog
		>

		<Dialog
			header="Exclusão"
			v-model:visible="alert"
			:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
			:style="{ width: '350px' }"
			:modal="true"
		>
			<div class="confirmation-content">
				<span
					>Deseja excluir o projeto <strong>{{ deleting.name }}</strong
					>?</span
				>
			</div>
			<template #footer>
				<Button label="Não" icon="pi pi-times" @click="alert = false" class="p-button-text p-button-danger" />
				<Button label="Sim" icon="pi pi-check" @click="deleteProject" class="p-button-text p-button-primary" />
			</template>
		</Dialog>

		<Dialog
			:header="editing ? 'Edição' : 'Criação'"
			@hide="(editing = null), getAllProjects()"
			v-model:visible="create"
			:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
			:style="{ width: '350px' }"
			:modal="true"
		>
			<template #default>
				<span class="p-float-label" style="margin-top: 20px; margin-bottom: 40px">
					<InputText v-if="!editing" style="width: 100%" type="text" v-model="creating.name" />
					<InputText v-else style="width: 100%" type="text" v-model="editing.name" />
					<label>Nome do projeto</label>
				</span>
				<span class="p-float-label" style="margin-top: 20px; margin-bottom: 20px">
					<Textarea v-if="!editing" style="width: 100%" v-model="creating.description" :autoResize="true" rows="4" cols="30" />
					<Textarea v-else style="width: 100%" v-model="editing.description" :autoResize="true" rows="4" cols="30" />
					<label>Descrição do projeto</label>
				</span>
			</template>

			<template #footer>
				<Button
					label="Cancelar"
					icon="pi pi-times"
					@click="(create = false), (editing = null), getAllProjects()"
					class="p-button-text p-button-danger"
				/>
				<Button
					:label="editing ? 'Salvar' : 'Criar'"
					icon="pi pi-check"
					@click="
						() => {
							if (editing) {
								editing.name.length > 0 && createProject({ edit: true });
							} else {
								creating.name.length > 0 && createProject({});
							}
						}
					"
					class="p-button-text p-button-primary"
				/>
			</template>
		</Dialog>
	</div>
</template>

<style>
body {
	overflow: hidden;
}

.dashboard {
	display: flex;
	flex-direction: column;
	overflow: scroll;
	height: calc(100vh - 58px);
	max-height: calc(100vh - 58px);
	/* padding-top: 25px; */
	padding-left: 25px;
	padding-right: 25px;
}

.description {
	display: auto;
}

@media screen and (max-width: 960px) {
	.description {
		display: none !important;
		opacity: 0;
	}

	.buttons {
		display: flex !important;
		justify-content: space-between !important;
	}

	.button {
		margin: auto !important;
	}
}
</style>
