import postcssNormalize from 'postcss-normalize'
import postcssImport from 'postcss-import'
import postcssCustomProperties from 'postcss-custom-properties'
import postcssCalc from 'postcss-calc'
import postcssImageSetPolyfill from 'postcss-image-set-polyfill'
import postcssNesting from 'postcss-nesting'
import postcssCustomMedia from 'postcss-custom-media'
import postcssMediaMinmax from 'postcss-media-minmax'
import postcssCustomSelectors from 'postcss-custom-selectors'
import postcssAttributeCaseInsensitive from 'postcss-attribute-case-insensitive'
import postcssColorHwb from 'postcss-color-hwb'
import postcssColorHsl from 'postcss-color-hsl'
import postcssColorRgb from 'postcss-color-rgb'
import postcssColorGray from 'postcss-color-gray'
import postcssColorHexAlpha from 'postcss-color-hex-alpha'
import postcssColorFunction from 'postcss-color-function'
import postcssFontFamilySystemUi from 'postcss-font-family-system-ui'
import postcssFontVariant from 'postcss-font-variant'
import pleeeaseFilters from 'pleeease-filters'
import postcssInitial from 'postcss-initial'
import pixrem from 'pixrem'
import postcssPseudoelements from 'postcss-pseudoelements'
import postcssSelectorMatches from 'postcss-selector-matches'
import postcssSelectorNot from 'postcss-selector-not'
import postcssPseudoClassAnyLink from 'postcss-pseudo-class-any-link'
import postcssColorRgbaFallback from 'postcss-color-rgba-fallback'
import postcssReplaceOverflowWrap from 'postcss-replace-overflow-wrap'
import postcssTypescale from 'postcss-typescale'
import postcssGridSystem from 'postcss-grid-system'
import postcssGridFluid from 'postcss-grid-fluid'
import postcssButton from 'postcss-button'
import postcssInlineSvg from 'postcss-inline-svg'
import autoprefixer from 'autoprefixer'

export default [
  postcssNormalize(),
  postcssImport(),
  postcssCustomProperties(),
  postcssCalc(),
  postcssImageSetPolyfill(),
  postcssNesting(),
  postcssCustomMedia(),
  postcssMediaMinmax(),
  postcssCustomSelectors(),
  postcssAttributeCaseInsensitive(),
  postcssColorHwb(),
  postcssColorHsl(),
  postcssColorRgb(),
  postcssColorGray(),
  postcssColorHexAlpha(),
  postcssColorFunction(),
  postcssFontFamilySystemUi(),
  postcssFontVariant(),
  pleeeaseFilters(),
  postcssInitial(),
  pixrem(),
  postcssPseudoelements(),
  postcssSelectorMatches(),
  postcssSelectorNot(),
  postcssPseudoClassAnyLink(),
  postcssColorRgbaFallback(),
  postcssReplaceOverflowWrap(),
  postcssTypescale(),
  postcssGridSystem(),
  postcssGridFluid(),
  postcssButton(),
  postcssInlineSvg(),
  autoprefixer()
]
