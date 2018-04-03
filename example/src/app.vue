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
        <cml-corpus-select class="blob-1-2 p bg-bg" />
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
import camomileUi from '~/app.js'
// } from '../../dist/camomile-ui.esm.js'

export default {
  name: 'MyApp',
  components: {
    cmlApp: camomileUi.App,
    cmlAdminUsers: camomileUi.AdminUsers,
    cmlAdminGroups: camomileUi.AdminGroups,
    cmlCorpus: camomileUi.Corpus,
    cmlCorpusList: camomileUi.CorpusList,
    cmlCorpusSelect: camomileUi.CorpusSelect,
    cmlMedias: camomileUi.Medias,
    cmlMediasList: camomileUi.MediasList,
    cmlMediasYoutube: camomileUi.MediasYoutube,
    cmlMediasVideo: camomileUi.MediasVideo,
    cmlMediasController: camomileUi.MediasController,
    cmlLayers: camomileUi.Layers,
    cmlLayersList: camomileUi.LayersList,
    cmlLayersAdd: camomileUi.LayersAdd,
    cmlAnnotations: camomileUi.Annotations,
    cmlAnnotationsList: camomileUi.AnnotationsList,
    cmlAnnotationsButtons: camomileUi.AnnotationsButtons,
    cmlAnnotationsTimeline: camomileUi.AnnotationsTimeline,
    cmlAnnotationsEdit: camomileUi.AnnotationsEdit,
    cmlAnnotationsZoning: camomileUi.AnnotationsZoning
  }
}
</script>
