<template>
  <cml-app
    user-name="root"
    user-password="roO7p4s5wOrD"
    url="http://localhost:3000"
    title="Camomile UI">
    <div class="container pt">
      
      <div class="blobs">
        <cml-admin-users class="blob-1-2 p bg-bg" />
        <cml-admin-groups class="blob-1-2 p bg-bg" />
      </div>

      <div class="blobs">
        <cml-corpus class="blob-1-2 p bg-bg" />
        <cml-medias class="blob-1-2 p bg-bg" />
        <cml-layers class="blob-1-2 p bg-bg" />
        <cml-annotations class="blob-1-2 p bg-bg" />
      </div>
      
      <div class="blobs">
        <cml-corpus-list class="blob-1-2 p bg-bg" />
        <cml-medias-list class="blob-1-2 p bg-bg" />
        <cml-layers-list class="blob-1-2 p bg-bg" />
        <cml-annotations-list class="blob-1-2 p bg-bg" />
      </div>

      <div class="blobs">
        <cml-layers-add class="blob-1-4 p bg-bg" />
        <cml-annotations-buttons class="blob-1-2 p bg-bg" />
        <cml-annotations-edit class="blob-1-4 p bg-bg" />
      </div>

      <cml-annotations-timeline class="mb" />
      <cml-medias-controller class="mb" />
      <cml-medias-youtube class="mb"/>
      <cml-medias-videozoning class="mb" />

      <div class="blobs">
        <cml-corpus
          class="blob-1-2 p bg-bg" 
          uid="test-corpus" />
        <cml-medias
          class="blob-1-2 p bg-bg"
          corpus-uid="test-corpus"
          uid="test-media" />
        <cml-layers
          class="blob-1-2 p bg-bg" 
          corpus-uid="test-corpus"
          uid="test-layers" />
        <cml-annotations
          class="blob-1-2 p bg-bg" 
          media-uid="test-media"
          layers-uid="test-layers"
          uid="test-annotations" />
      </div>

      <div class="blobs">
        <cml-corpus-list
          class="blob-1-2 p bg-bg" 
          uid="test-corpus" />
        <cml-medias-list
          class="blob-1-2 p bg-bg"
          corpus-uid="test-corpus"
          uid="test-media" />
        <cml-layers-list
          class="blob-1-2 p bg-bg" 
          corpus-uid="test-corpus"
          uid="test-layers" />
        <cml-annotations-list
          class="blob-1-2 p bg-bg" 
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
  cmlAdminUsers,
  cmlAdminGroups,
  cmlCorpus,
  cmlMedias,
  cmlLayers,
  cmlAnnotations,
  cmlCorpusList,
  cmlMediasList,
  cmlLayersList,
  cmlAnnotationsList,
  cmlMediasYoutube,
  cmlMediasVideo,
  cmlMediasVideozoning,
  cmlMediasController,
  cmlLayersAdd,
  cmlAnnotationsButtons,
  cmlAnnotationsTimeline,
  cmlAnnotationsEdit
} from '~/app.js'

export default {
  name: 'MyApp',
  components: {
    cmlApp,
    cmlAdminUsers,
    cmlAdminGroups,
    cmlCorpus,
    cmlMedias,
    cmlLayers,
    cmlAnnotations,
    cmlCorpusList,
    cmlMediasList,
    cmlLayersList,
    cmlAnnotationsList,
    cmlMediasYoutube,
    cmlMediasVideo,
    cmlMediasVideozoning,
    cmlMediasController,
    cmlLayersAdd,
    cmlAnnotationsButtons,
    cmlAnnotationsTimeline,
    cmlAnnotationsEdit
  }
}
</script>
