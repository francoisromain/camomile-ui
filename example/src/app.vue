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

      <cml-corpus />
      <cml-medias />
      <cml-layers />
      <cml-annotations />
      
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
      <cml-annotations-zoning class="mb">
        <cml-medias-video />
      </cml-annotations-zoning>

      <div class="blobs">
        <cml-corpus
          uid="test-corpus" />
        <cml-medias
          corpus-uid="test-corpus"
          uid="test-media" />
        <cml-layers
          corpus-uid="test-corpus"
          uid="test-layers" />
        <cml-annotations
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
          uid="test-media" />
        <cml-layers-list
          class="blob-1-2 p bg-bg" 
          uid="test-layers" />
        <cml-annotations-list
          class="blob-1-2 p bg-bg" 
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
  cmlCorpusList,
  cmlMedias,
  cmlMediasList,
  cmlMediasYoutube,
  cmlMediasVideo,
  cmlMediasController,
  cmlLayers,
  cmlLayersList,
  cmlLayersAdd,
  cmlAnnotations,
  cmlAnnotationsList,
  cmlAnnotationsButtons,
  cmlAnnotationsTimeline,
  cmlAnnotationsEdit,
  cmlAnnotationsZoning
} from '~/app.js'

export default {
  name: 'MyApp',
  components: {
    cmlApp,
    cmlAdminUsers,
    cmlAdminGroups,
    cmlCorpus,
    cmlCorpusList,
    cmlMedias,
    cmlMediasList,
    cmlMediasYoutube,
    cmlMediasVideo,
    cmlMediasController,
    cmlLayers,
    cmlLayersList,
    cmlLayersAdd,
    cmlAnnotations,
    cmlAnnotationsList,
    cmlAnnotationsButtons,
    cmlAnnotationsTimeline,
    cmlAnnotationsEdit,
    cmlAnnotationsZoning
  }
}
</script>
