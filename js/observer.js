class TagObserver {
  constructor(attributes, callback) {
    this.attributes = attributes;
    this.callback = callback;
    this.observer = new MutationObserver(this.mutationCallback.bind(this));
  }

  startObserving() {
    this.scanExistingElements();
    this.observer.observe(document.body, { childList: true, subtree: true });
  }

  mutationCallback(mutationsList) {
    mutationsList.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            this.checkAttributes(node);
            node.querySelectorAll("*").forEach(el => this.checkAttributes(el));
          }
        });
      }
    });
  }

  scanExistingElements() {
    this.attributes.forEach(attr => {
      document.querySelectorAll(`[${attr}]`).forEach(el => this.callback(el, attr));
    });
  }

  checkAttributes(element) {
    this.attributes.forEach(attr => {
      if (element.hasAttribute(attr)) {
        this.callback(element, attr);
      }
    });
  }
}

window.TagObserver = TagObserver;
