<script setup lang="ts">
import { reactive } from 'vue';
import { CTextField, CButton } from '@luchta-io/cuv';
import { useComments } from '@/composables/api/comments'
import { useMount } from '@/composables/Mount';
import { useProgress } from '@/composables/Progress';
import { Error } from '@/composables/Errors';
import HeaderFooter from '@/components/templates/HeaderFooter.vue'

const { mounted, unMounted } = useMount()
const { progress } = useProgress()
const { コメントを登録 } = useComments()

const data: {
    入力値: string
    エラー: Error
} = reactive({
    入力値: '',
    エラー: new Error()
})

const 登録 = progress(async () => {
    const postData = {
        fields: {
            comment: {
                stringValue: data.入力値
            }
        }
    }
    await コメントを登録(postData, new Map([
        [400, (error: any) => {
            data.エラー = error.response.data
        }]
    ]))
})

mounted(() => { })
unMounted(() => { })
</script>
<template>
    <HeaderFooter>
        <div>
            <CTextField v-model="data.入力値"></CTextField>
            <CButton @click="登録">登録</CButton>
        </div>
    </HeaderFooter>
</template>
