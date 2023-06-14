<script lang="ts" setup>
import { inject } from 'vue'
import useLeaveMessage from '@ui/composables/useLeaveMessage'

const message = inject<string>('message')!

useLeaveMessage(message)
</script>

<template>
  <h1 class="text-2xl font-bold">Hello world</h1>
  <p>{{ message }}</p>
</template>
