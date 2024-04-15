import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const icons = {
    defaultSet: 'mdi',
}

const vuetify = createVuetify({
    components,
    directives,
    icons,
})

export default vuetify