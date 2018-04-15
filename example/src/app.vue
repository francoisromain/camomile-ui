<template>
  <cml-app
    user-name="root"
    user-password="roO7p4s5wOrD"
    url="http://localhost:3000"
    title="Camomile UI">
      
    <div class="tablet-blobs">
      <cml-admin-users class="tablet-blob-1-2" />
      <cml-admin-groups class="tablet-blob-1-2" />
    </div>

    <cml-corpus />
    <cml-medias />
    <cml-layers />
    <cml-annotations />
    
    <div class="tablet-blobs">
      <cml-corpus-list class="tablet-blob-1-2" />
      <cml-medias-list class="tablet-blob-1-2" />
      <cml-layers-list class="tablet-blob-1-2" />
      <cml-annotations-list class="tablet-blob-1-2" />
    </div>

    <div class="tablet-blobs">
      <cml-layers-add class="tablet-blob-1-4" />
      <cml-annotations-buttons class="tablet-blob-1-2" />
      <cml-annotations-edit class="tablet-blob-1-4" />
    </div>

    <cml-annotations-timeline />
    <cml-medias-controller />
    <cml-annotations-zoning>
      <cml-medias-video />
    </cml-annotations-zoning>

    <div class="tablet-blobs">
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

    <div class="tablet-blobs">
      <cml-corpus-list
        class="tablet-blob-1-2" 
        uid="test-corpus" />
      <cml-medias-list
        class="tablet-blob-1-2"
        uid="test-media" />
      <cml-layers-list
        class="tablet-blob-1-2" 
        uid="test-layers" />
      <cml-annotations-list
        class="tablet-blob-1-2" 
        uid="test-annotations" />
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