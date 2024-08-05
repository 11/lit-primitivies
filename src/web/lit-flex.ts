import { LitElement, html, css } from 'lit'
import type { PropertyValueMap } from 'lit'

export default class WebFlex extends LitElement {
  gap: number = 1
  direction: string = 'column'
  justify: string = 'flex-start'
  align: string = 'center'
  padding: Record<string | symbol, string> = { top: '1rem', right: '1rem', bottom: '1rem', left: '1rem' }

  static properties = {
    gap: { type: Number },
    direction: { type: String },
    justify: { type: String },
    align: { type: String },
    padding: { type: Object },
  }

  static styles = css`
    :root {
      --flex-direction: column;
      --flex-justify: flex-start;
      --flex-align: center;
      --flex-gap: 1rem;
      --flex-padding: 1rem;
    }

    .flex {
      display: flex;
      flex-direction: var(--flex-direction, column);
      justify-content: var(--flex-justify, flex-start);
      align-items: var(--flex-align, flex-start);
      gap: var(--flex-gap, 1rem);
      padding: var(--flex-padding, 1rem);
    }
  `

  updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
    super.updated(changedProperties)

    if (changedProperties.has('direction')) {
      this.style.setProperty('--flex-direction', `${this.direction}`)
    }

    if (changedProperties.has('justify')) {
      this.style.setProperty('--flex-justify', `${this.justify}`)
    }

    if (changedProperties.has('align')) {
      this.style.setProperty('--flex-align', `${this.align}`)
    }

    if (changedProperties.has('gap')) {
      this.style.setProperty('--flex-gap', `${this.gap}`)
    }

    if (changedProperties.has('padding')) {
      const padding = [
        this.padding?.top ?? '0',
        this.padding?.right ?? '0',
        this.padding?.bottom ?? '0',
        this.padding?.left ?? '0',
      ].join('')

      this.style.setProperty('--flex-padding', padding)
    }
  }

  render() {
    return html`
      <div class='flex'><slot></div>
    `
  }
}

customElements.define('web-flex', WebFlex)
