<template>
    <v-data-table :headers :items="applicants">
        <template #top>
            <v-toolbar density="compact">
                <v-toolbar-title>
                    <input type="file" ref="fileInput" style="display: none" @change="importApplicant">
                    <v-btn class="mr-2" variant="tonal" color="primary" @click="openFilePanel">
                        Import
                    </v-btn>
                    <v-btn variant="tonal" color="primary" @click="exportApplicant">
                        Export
                    </v-btn>
                </v-toolbar-title>
                <v-dialog v-model="dialog" max-width="700px">
                    <template #activator="{ props }">
                        <v-btn variant="tonal" color="primary" v-bind="props">
                            Create New Applicant
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-text>
                            <ApplicantForm :formTitle :editedItem :operation @save="save" />
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="700px">
                    <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template #item.actions="{ item }">
            <v-icon size="small" icon="mdi-pencil" @click="editItem(item)">
            </v-icon>
            <v-icon size="small" icon="mdi-delete" @click="deleteItem(item)">
            </v-icon>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useAxios } from '@/utils/axios';
import type { ApplicantType } from '@/types/types';
import ApplicantForm from '@/components/ApplicantForm.vue';

const dialog = ref(false);
const dialogDelete = ref(false);
const headers = ref([
    {
        title: 'Firstname',
        key: 'firstname',
    },
    {
        title: 'Lastname',
        key: 'lastname'
    },
    {
        title: 'Email',
        key: 'email'
    },
    {
        title: 'Address',
        key: 'address'
    },
    {
        title: 'Expected Salary',
        key: 'expected_salary',
    },
    {
        title: 'Actions',
        key: 'actions',
    },
]);
let applicants = ref<ApplicantType[]>([]);
let editedIndex = ref(-1);
let editedItem = ref<ApplicantType>({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    expected_salary: 0,
});
const defaultItem = ref<ApplicantType>({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    expected_salary: 0,
});
const axios = useAxios()
const operation = ref('create')
const fileInput = ref()

const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New' : 'Edit'
})

async function getApplicants() {
    applicants.value = await axios.get('applicant/')
}

function editItem(item: ApplicantType) {
    editedIndex.value = applicants.value.indexOf(item) + 1
    editedItem.value = Object.assign({}, item)
    dialog.value = true
    operation.value = 'edit'
}

function deleteItem(item: ApplicantType) {
    editedIndex.value = applicants.value.indexOf(item) + 1
    editedItem.value = Object.assign({}, item)
    dialogDelete.value = true
}

async function deleteItemConfirm() {
    await axios.remove('applicant', editedIndex.value)
    closeDelete()
    getApplicants()
}

function close() {
    dialog.value = false
    nextTick(() => {
        editedItem.value = Object.assign({}, defaultItem.value)
        editedIndex.value = -1
    })
}

function closeDelete() {
    dialogDelete.value = false
    nextTick(() => {
        editedItem.value = Object.assign({}, defaultItem.value)
        editedIndex.value = -1
    })
}

async function save() {
    if (editedIndex.value > -1) {
        await axios.update('applicant', editedIndex.value, editedItem.value)
    } else {
        await axios.create('applicant', editedItem.value)
    }
    getApplicants()
    close()
}

async function openFilePanel() {
    fileInput.value.click()
}

async function importApplicant(event: any) {
    const file = event.target.files[0];

    try {
        await axios.importFile('import', file)
    } catch (error) {
        console.log('Error fetching endpoint:', error);
    }

    getApplicants()
}

async function exportApplicant() {
    try {
        await axios.exportFile('export').then((data) => {
            const blob = new Blob([data], { type: 'text/csv' })
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'exported_data.csv'
            link.click()
            window.URL.revokeObjectURL(link.href)
        })
    } catch (error) {
        console.log(error)
    }
}

watch(dialog, (val) => {
    val || close()
})

watch(dialogDelete, (val) => {
    val || closeDelete()
})

onMounted(() => {
    getApplicants()
})

</script>