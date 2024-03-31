<script setup lang="ts">
import { reactive } from 'vue';
import {
    getAuth,
    updateProfile
} from "firebase/auth";
import { CTextField, CButton } from '@luchta-io/cuv'
import { useSessionStore } from '@/stores/session';
import { useMount } from '@/composables/Mount';

const auth = getAuth();
const store = useSessionStore()
const { mounted, unMounted } = useMount()

const data: {
    氏名: string
} = reactive({
    氏名: '',
})

const 更新 = () => {
    updateProfile(auth.currentUser, {
        displayName: data.氏名,
        // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
        // Profile updated!
        // ...
        data.氏名 = store.getアカウント.アカウント名
    }).catch((error) => {
        // An error occurred
        // ...
    });

}

mounted(() => {
    data.氏名 = store.getアカウント.アカウント名
})

unMounted(() => { })
</script>

<template>
    <div>
        <CTextField v-model="data.氏名" label="氏名" placeholder="田中" />
        <CButton @click="更新" type="submit" color="link">
            更新
        </CButton>
    </div>
</template>
