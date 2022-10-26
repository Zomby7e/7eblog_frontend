import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt, { Emitter } from 'mitt'

type Events = {
  foo: string;
  bar?: number;
};

const emitter: Emitter<Events> = mitt<Events>()
const app = createApp(App)
app.use(store).use(router)
app.config.globalProperties.$emitter = emitter
app.mount('#app')
