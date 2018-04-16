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
    <cml-layers uid="reference" />
    <cml-layers uid="hypothese" />
    <cml-annotations
      uid="reference"
      layers-uid="reference" />
    <cml-annotations
      uid="hypothese"
      layers-uid="hypothese" />
    
    <div class="tablet-blobs">
      <cml-corpus-select class="tablet-blob-1-2" />
      <cml-medias-select class="tablet-blob-1-2" />
    </div>


    <h2>Reference</h2>

    <hr>

    <div class="tablet-blobs">
      <cml-layers-select
        class="tablet-blob-1-2"
        uid="reference" />
      <cml-annotations-edit
        class="tablet-blob-1-2"
        uid="reference" />
    </div>

    <cml-annotations-timeline uid="reference" />

    <h2>Hypothèse</h2>

    <hr>

    <div class="tablet-blobs">
      <cml-layers-select
        class="tablet-blob-1-2"
        uid="hypothese" />
      <cml-annotations-edit
        class="tablet-blob-1-2"
        uid="hypothese" />
    </div>

    <cml-annotations-timeline uid="hypothese" />

    <cml-medias-controller />
    <cml-medias-video />
  </cml-app>
</template>

<script>
import camomileUi from '~/app.js'

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
    cmlMediasSelect: camomileUi.MediasSelect,
    cmlMediasYoutube: camomileUi.MediasYoutube,
    cmlMediasVideo: camomileUi.MediasVideo,
    cmlMediasController: camomileUi.MediasController,
    cmlLayers: camomileUi.Layers,
    cmlLayersList: camomileUi.LayersList,
    cmlLayersListSimple: camomileUi.LayersListSimple,
    cmlLayersSelect: camomileUi.LayersSelect,
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
