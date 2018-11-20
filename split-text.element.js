// custom element without shadow dom

function createNewNode(c, options) {
    if (c === ' ') {
        return document.createTextNode(c)
    }
    const el = document.createElement('div')
    el.textContent = c
    if (options.childClass) {
        el.className = options.childClass
    }
    return el
}

function split(el, options) {
    const tasks = []
    for (const child of el.childNodes) {
        switch (child.nodeType) {
            case Node.TEXT_NODE:
                const text = child.nodeValue
                const nodes = Array.from(text).map(c => createNewNode(c, options))
                tasks.push({ el, child, nodes })
                break
            case Node.ELEMENT_NODE:
                split(child, options)
                break
        }
    }
    // split text nodes
    for (const {el, child, nodes} of tasks) {
        nodes.forEach(n => el.insertBefore(n, child))
        el.removeChild(child)
    }
}

class SplitText extends HTMLElement {
    constructor() {
        super();

        split(this, {
            childClass: this.getAttribute('child-class')
        })
    }
}

customElements.define('split-text', SplitText)