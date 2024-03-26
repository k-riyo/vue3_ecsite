<script setup lang="ts">
import { onMounted } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'
import { useSessionStore } from '@/stores/session';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const store = useSessionStore()

// onMounted(() => {
//   const auth = getAuth();
//   onAuthStateChanged(auth, (user) => {
//     if (user != null) {
//       console.log(user)
//     }
//   })
// })
        // this.currentUser = user;
      // } else {
      //   // this.currentUser = null;
      // }
  // });
</script>
<template>
<div>
  ホーム
  {{ store.getアカウント }}
</div>
</template>
