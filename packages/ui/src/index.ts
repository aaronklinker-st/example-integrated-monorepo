import { App, createApp } from 'vue'
import AppVue from '@ui/components/App.vue'

export function createSharedApp(config: { message: string }): App {
  return createApp(AppVue).provide('message', config.message)
}
