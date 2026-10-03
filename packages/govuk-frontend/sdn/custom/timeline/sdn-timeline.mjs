import { Component } from '../../../src/govuk/component.mjs'

const activeClass = 'sdn-timeline__step--dropdown-active'

/**
 * SDN timeline component
 *
 * @preserve
 */
export class SdnTimeline extends Component {
  /**
   * @param {Element | null} $root - HTML element to use for timeline
   */
  constructor($root) {
    super($root)

    if (this.$root.classList.contains('snd-timeline--readonly')) {
      return
    }

    document.addEventListener('click', (event) => this.handleClick(event))
  }

  /**
   * Open dropdown on bullet click, close it on click elsewhere
   *
   * @private
   * @param {MouseEvent} event - Click event
   */
  handleClick(event) {
    const $target = event.target
    if (!($target instanceof HTMLElement)) {
      return
    }

    const $bullet = $target.closest('.js-sdn-timeline__bullet')
    if ($bullet instanceof HTMLElement && $bullet.parentElement) {
      event.preventDefault()
      this.closeMenu()
      $bullet.parentElement.classList.add(activeClass)
      $bullet.setAttribute('tabindex', '0')
      $bullet.focus()
      return
    }

    if (
      $target.closest('.sdn-timeline-dropdown__option') ||
      (!$target.classList.contains('sdn-timeline-dropdown__bullet') &&
        !$target.classList.contains('sdn-timeline-dropdown__additional-info'))
    ) {
      this.closeMenu()
    }
  }

  /**
   * Close all open dropdowns
   *
   * @private
   */
  closeMenu() {
    document
      .querySelectorAll(`.${activeClass}`)
      .forEach(($item) => $item.classList.remove(activeClass))
  }

  /**
   * Name for the component used when initialising using data-module attributes.
   */
  static moduleName = 'sdn-timeline'
}
