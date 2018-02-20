export default class Animation {
  elementsRequiringFixedHeightForAnimation = [];

  async setFixedHeightsForAnimations() {
    for (const element of this.elementsRequiringFixedHeightForAnimation) {
      element.setAttribute('style', 'max-height: none !important;');
      element.setAttribute('style', `max-height: ${element.clientHeight}px;`);

      setTimeout(() => element.removeAttribute('style'), 500);
    }

    await new Promise(resolve => window.setTimeout(resolve, 0));
  }
}
