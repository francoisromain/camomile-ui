<script>
import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      resize: 'viewport/set'
    })
  },
  mounted () {
    window.addEventListener('resize', this.resize)
    this.resize()
  }
}
</script>
<style scoped>
@import '../../css/settings.css';
@media (--viewport-mobile) {
  .home {
    color: var(--color-highlight);
  }
}
</style>
