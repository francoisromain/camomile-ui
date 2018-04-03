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
        <cml-corpus-select class="blob-1-2 p bg-bg" />
        <cml-medias-select class="blob-1-2 p bg-bg" />
        <cml-layers-list-simple class="blob-1-2 p bg-bg" />
      </div>

      <div class="blobs">
        <cml-layers-add class="blob-1-4 p bg-bg" />
        <cml-annotations-buttons class="blob-1-2 p bg-bg" />
        <cml-annotations-edit class="blob-1-4 p bg-bg" />
      </div>

      <cml-annotations-timeline class="mb" />
      <cml-medias-controller class="mb" />
      <cml-medias-video class="mb"/>

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
    cmlMediasSelect: camomileUi.MediasSelect,
    cmlMediasYoutube: camomileUi.MediasYoutube,
    cmlMediasVideo: camomileUi.MediasVideo,
    cmlMediasController: camomileUi.MediasController,
    cmlLayers: camomileUi.Layers,
    cmlLayersList: camomileUi.LayersList,
    cmlLayersListSimple: camomileUi.LayersListSimple,
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
