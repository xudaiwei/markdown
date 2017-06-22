const { h, app } = hyperapp
const html = hyperx(h)

app({
 state: "Hi.",
 view: state => html`<h1>${state}</h1>`
})