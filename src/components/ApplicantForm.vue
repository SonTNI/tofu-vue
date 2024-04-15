<template>
    <div class="d-flex flex-column justify-center align-center ga-8 h-100">
        <span class="text-h4"> {{ formTitle }} Applicant Form</span>
        <v-form ref="formRef" class="d-flex justify-center align-center w-100">
            <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="form.firstname" :rules="$v.required" label="First name">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="form.lastname" :rules="$v.required" label="Last name">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="form.email" :rules="$v.email" label="E-mail">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="8">
                        <v-text-field v-model="form.address" :rules="$v.required" label="Address">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="form.expected_salary" :rules="$v.number" label="Expected Salary">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-btn class="mx-auto" color="secondary" @click="submit">
                        {{ buttonName }}
                    </v-btn>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import { useValidate } from '@/utils/validate';
import type { ApplicantType } from '@/types/types';
import { useAxios } from '@/utils/axios';

const form = ref<ApplicantType>({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    expected_salary: 0,
})
const $v = useValidate()
const axios = useAxios()
const formRef = ref<HTMLFormElement>()
const buttonName = ref('Register')

const props = defineProps({
    formTitle: {
        type: String,
        required: true,
    },
    editedItem: {
        type: Object as () => ApplicantType,
        default: () => { },
    },
    operation: {
        type: String,
        default: '',
    }
})

const emits = defineEmits(['save'])

async function submit() {
    if (formRef.value) {
        const { valid } = await formRef.value.validate()

        if (valid) {
            if (props.operation === 'create' || props.operation === 'edit') {
                emits('save')
            } else {
                await axios.create('applicant', form.value)
                formRef.value.reset()
            }
        }
    }
}

watch(() => props.editedItem, (formValue) => {
    if (formValue) {
        form.value = formValue
        buttonName.value = 'Save'
    }
}, { immediate: true })

</script>