<script setup lang="ts">
import { reactive } from 'vue';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from 'vue-router';
import { CTextField, CButton } from '@luchta-io/cuv'
import { mdiEye, mdiEyeOff } from '@mdi/js'
import { useSessionStore } from '@/stores/session';

const router = useRouter()
const store = useSessionStore()

const data: {
    認証: {
        メールアドレス: string
        パスワード: string
    },
    パスワード表示: boolean
} = reactive({
    認証: {
        メールアドレス: '',
        パスワード: '',
    },
    パスワード表示: false,
})

const ログイン = () => {
     if (data.認証.メールアドレス == "" || data.認証.パスワード == "") return;
     const auth = getAuth();
     signInWithEmailAndPassword(auth, data.認証.メールアドレス, data.認証.パスワード)
       .then((userCredential) => {
            // 成功時処理
            const user = userCredential.user;
            console.log(user);
            store.setアカウント({
              アカウントid: user.uid,
              アカウント名: user.displayName ? user.displayName : ''
            })
            router.push("/")
       })
       .catch((error) => {
            // 失敗時処理
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
       });
}
</script>

<template>
  <div>
    <CTextField
        v-model="data.認証.メールアドレス"
        label="メールアドレス"
        placeholder="email@address.com"
    />
    <CTextField
        v-model="data.認証.パスワード"
        label="パスワード"
        :type="data.パスワード表示 ? 'text' : 'password'"
        :append-inner-icon="data.パスワード表示 ? mdiEyeOff : mdiEye"
        @click:appendInner="data.パスワード表示 = !data.パスワード表示"
    />
    <CButton @click="ログイン">
        ログイン
    </CButton>
  </div>
</template>
