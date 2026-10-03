import { Component } from '../../../src/govuk/component.mjs'

/**
 * SDN appear link – shows one element and hides another on click
 *
 * @preserve
 */
export class SdnAppearLink extends Component {
  /**
   * @param {Element | null} $root - HTML element to use for appear link
   */
  constructor($root) {
    super($root)

    const $appear = document.getElementById(this.$root.dataset.appear ?? '')
    const $disappear = document.getElementById(
      this.$root.dataset.disappear ?? ''
    )

    this.$root.addEventListener('click', (event) => {
      event.preventDefault()
      $appear?.classList.remove('sdn-appear-link-hide')
      $disappear?.classList.add('sdn-appear-link-hide')
    })
  }

  /**
   * Name for the component used when initialising using data-module attributes.
   */
  static moduleName = 'sdn-appear-link'
}
