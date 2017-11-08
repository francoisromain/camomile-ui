<template>
  <div class="full-y flex flex-direction-column">
    <div class="bg-inverse color-bg header">
      <div class="container">
        <div class="blobs">
          <cml-title class="blob-1-4 mb-0" />
          <cml-infos class="blob-1-4 mb-0" />
          <cml-user-button  class="blob-icon mb-0 flex-right" />
        </div>
      </div>
    </div>
    
    <div class="relative content">
      <cml-user />
      <cml-messages />
      <div class="container pt">
        Content
      </div> 
    </div>
  </div>
</template>

<script>
import store from '../store'
import viewport from './components/viewport.vue'
import cmlTitle from './camomile/title.vue'
import cmlInfos from './camomile/infos.vue'
import cmlMessages from './camomile/messages.vue'
import cmlUser from './camomile/user.vue'
import cmlUserButton from './camomile/user-button.vue'

export default {
  store,
  name: 'camomile-ui',
  components: {
    viewport,
    cmlTitle,
    cmlInfos,
    cmlMessages,
    cmlUser,
    cmlUserButton,
  }
}
</script>

