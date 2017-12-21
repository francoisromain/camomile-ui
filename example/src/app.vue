<template>
  <cml-app>
    <div  class="container pt">
      <div class="blobs">
        <cml-users class="blob-1-2 p border"></cml-users>
        <cml-groups class="blob-1-2 p border"></cml-groups>
      </div>
      <div class="blobs">
        <cml-corpus class="blob-1-2 p border"></cml-corpus>
        <cml-medias class="blob-1-2 p border"></cml-medias>
        <cml-layers class="blob-1-2 p border"></cml-layers>
        <cml-annotations class="blob-1-2 p border"></cml-annotations>
      </div>

    </div>
  </cml-app>
</template>

<script>
import {
  cmlApp,
  cmlUsers,
  cmlGroups,
  cmlCorpus,
  cmlMedias,
  cmlLayers,
  cmlAnnotations,
  cmlMediaVideo,
  cmlMediaController}
  from '../../src/app.js'

export default {
  name: 'my-app',
  components: {
    cmlApp,
    cmlUsers,
    cmlGroups,
    cmlCorpus,
    cmlMedias,
    cmlLayers,
    cmlAnnotations,
    cmlMediaVideo,
    cmlMediaController
  }
}
</script>

