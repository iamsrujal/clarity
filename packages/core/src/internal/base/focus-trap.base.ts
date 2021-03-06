/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement } from 'lit-element';
import { FocusTrap } from '../utils/focus-trap.js';
import { internalProperty, property } from '../decorators/property.js';

export class CdsBaseFocusTrap extends LitElement {
  protected focusTrap = new FocusTrap(this);

  /**
   * Its recommended to remove or add a focus trap element from the DOM
   * some SSR systems can have technical constraints where the item can
   * only be removed via CSS/hidden.
   */
  @property({ type: Boolean }) hidden = false;

  @internalProperty({ type: Boolean, reflect: true })
  protected __demoMode = false;

  connectedCallback() {
    super.connectedCallback();
    this.toggleFocusTrap();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.focusTrap.removeFocusTrap();
  }

  attributeChangedCallback(name: string, old: string, value: string) {
    super.attributeChangedCallback(name, old, value);

    if (name === 'hidden' && old !== value) {
      this.toggleFocusTrap();
    }
  }

  protected render() {
    return html`<slot></slot>`;
  }

  private toggleFocusTrap() {
    if (!this.__demoMode && !this.hasAttribute('hidden')) {
      this.focusTrap.enableFocusTrap();
    } else {
      this.focusTrap.removeFocusTrap();
    }
  }
}
