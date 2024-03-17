<script setup lang="ts">
import { reactive } from 'vue';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const data: {
    認証: {
        メールアドレス: string
        パスワード: string
    }
} = reactive({
    認証: {
        メールアドレス: '',
        パスワード: '',
    }
})

const アカウント作成 = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.認証.メールアドレス, data.認証.パスワード)
      .then((userCredential) => {
        // 成功時処理
        const user = userCredential.user;
        console.log(user);
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
    <input v-model="data.認証.メールアドレス" />
    <input v-model="data.認証.パスワード" />
    <button @click="アカウント作成">
        アカウント作成
    </button>
  </div>
</template>
