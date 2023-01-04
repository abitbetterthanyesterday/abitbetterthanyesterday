import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const tagName = "dark-light-mode-toggle-button";
type Mode = "dark" | "light";

@customElement("dark-light-mode-toggle-button")
export class DarkLightModeToggleButton extends LitElement {
  @property()
  mode: Mode = "dark";

  override render() {
    return html`<button @click="${this._toggleMode}">${this.mode}</button> `;
  }

  private _toggleMode() {
    this.mode = this.mode === "dark" ? "light" : "dark";
    console.log(this.mode);
  }
}
