import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dataServe from './core/common.config'

import baseButton from '@/components/button.component'
import baseCheckBox from '@/components/checkBox.component'
import datePicker from '@/components/datePicker.component'
import baseInput from '@/components/input.component'
import baseSelect from '@/components/select.component'
import baseTable from '@/components/table.component'
import basePage from '@/components/page.component'

Vue.component('base-button', baseButton);
Vue.component('base-checkBox',baseCheckBox);
Vue.component('date-picker',datePicker);
Vue.component('base-input',baseInput);
Vue.component('base-select',baseSelect);
Vue.component('base-table',baseTable);
Vue.component('base-page',basePage);

Vue.config.productionTip = false;
Vue.prototype.DataServe = dataServe;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
