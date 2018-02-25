<template>
  <cml-app>
    <div class="container pt">
      
      <div class="blobs">
        <cml-users class="blob-1-2 p border" />
        <cml-groups class="blob-1-2 p border" />
      </div>
      
      <div class="blobs">
        <cml-corpus class="blob-1-2 p border" />
        <cml-medias class="blob-1-2 p border" />
        <cml-layers class="blob-1-2 p border" />
        <cml-annotations class="blob-1-2 p border" />
      </div>


      
      <div class="blobs">
        <cml-annotations-buttons class="blob-1-2" />
        <cml-annotations-edit class="blob-1-2" />
      </div>

      <cml-annotations-timeline class="mb" />
      <cml-medias-controller class="mb" />
      <cml-medias-youtube class="mb"/>
      <cml-medias-videozoning class="mb" />

      <div class="blobs">
        <cml-corpus
          class="blob-1-2 p border" 
          uid="test-corpus" />
        <cml-medias
          class="blob-1-2 p border"
          corpus-uid="test-corpus"
          uid="test-media" />
        <cml-layers
          class="blob-1-2 p border" 
          corpus-uid="test-corpus"
          uid="test-layers" />
        <cml-annotations
          class="blob-1-2 p border" 
          media-uid="test-media"
          layers-uid="test-layers"
          uid="test-annotations" />
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
  cmlMediasYoutube,
  cmlMediasVideo,
  cmlMediasVideozoning,
  cmlMediasController,
  cmlAnnotationsButtons,
  cmlAnnotationsTimeline,
  cmlAnnotationsEdit
} from '~/app.js'

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
    cmlMediasYoutube,
    cmlMediasVideo,
    cmlMediasVideozoning,
    cmlMediasController,
    cmlAnnotationsButtons,
    cmlAnnotationsTimeline,
    cmlAnnotationsEdit
  }
}
</script>
