import { createAll, initAll as govukInitAll } from '../src/govuk/all.mjs'

import { SdnHeader } from './custom/header/sdn-header.mjs'
import { SdnTimeline } from './custom/timeline/sdn-timeline.mjs'
import { SdnAppearLink } from './utilities/appear-link/sdn-appear-link.mjs'

export {
  version,
  Accordion,
  Button,
  CharacterCount,
  Checkboxes,
  ErrorSummary,
  ExitThisPage,
  FileUpload,
  NotificationBanner,
  PasswordInput,
  Radios,
  ServiceNavigation,
  SkipLink,
  Tabs,
  createAll,
  isSupported,
  Component,
  ConfigurableComponent
} from '../src/govuk/all.mjs'
export { SdnHeader, SdnTimeline, SdnAppearLink }

const accordionI18n = {
  hideAllSections: 'Zbaliť všetko',
  hideSection: 'Zbaliť',
  hideSectionAriaLabel: 'Zbaliť túto sekciu',
  showAllSections: 'Rozbaliť všetko',
  showSection: 'Rozbaliť',
  showSectionAriaLabel: 'Rozbaliť túto sekciu'
}

/**
 * Initialise all GOV.UK and SDN components with Slovak accordion texts
 *
 * @param {Config | Element | Document | null} [scopeOrConfig] - Config for GOV.UK components, or scope to search within
 */
export function initAll(scopeOrConfig = {}) {
  /** @type {Config} */
  const config =
    scopeOrConfig === null ||
    scopeOrConfig instanceof Element ||
    scopeOrConfig instanceof Document
      ? { scope: scopeOrConfig }
      : scopeOrConfig
  const accordion = config.accordion ?? {}

  govukInitAll(
    Object.assign({}, config, {
      accordion: Object.assign({}, accordion, {
        i18n: Object.assign({}, accordionI18n, accordion.i18n)
      })
    })
  )

  const options = {
    scope: config.scope === undefined ? document : config.scope,
    onError: config.onError
  }

  createAll(SdnHeader, undefined, options)
  createAll(SdnTimeline, undefined, options)
  createAll(SdnAppearLink, undefined, options)
}

/**
 * @typedef {import('../src/govuk/init.mjs').Config} Config
 */
