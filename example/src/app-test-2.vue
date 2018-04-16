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


    <div class="tablet-blobs">
      <div class="blob-1-2">
        <h2>Référence</h2>
        <cml-layers-select uid="reference" />
        <cml-annotations-edit uid="reference" />
        <cml-annotations-timeline uid="reference" />
      </div>

      <div class="blob-1-2">
        <h2>Hypothèse</h2>
        <cml-layers-select uid="hypothese" />
        <cml-annotations-edit uid="hypothese" />
        <cml-annotations-timeline uid="hypothese" />
      </div>
    </div>

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
