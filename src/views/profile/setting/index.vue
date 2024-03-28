<script setup lang="ts">
import { reactive } from 'vue';
import {
    getAuth,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { useRouter } from 'vue-router';
import { CTextField, CButton } from '@luchta-io/cuv'
import { mdiEye, mdiEyeOff } from '@mdi/js'
import { useSessionStore } from '@/stores/session';
import { useMount } from '@/composables/Mount';

const auth = getAuth();
const router = useRouter()
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
        <!-- <CTextField
        v-model="data.認証.パスワード"
        label="パスワード"
        :type="data.パスワード表示 ? 'text' : 'password'"
        :append-inner-icon="data.パスワード表示 ? mdiEyeOff : mdiEye"
        @click:appendInner="data.パスワード表示 = !data.パスワード表示"
    /> -->
        <CButton @click="更新" type="submit" color="link">
            更新
        </CButton>
    </div>
</template>
