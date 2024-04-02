export default function renderLocation(location, isAvaiableLocation = true) {
  let attributes;

  if (isAvaiableLocation) {
    attributes = `
      hx-post="/places" 
      hx-vals='{"locationId": "${location.id}"}'
      hx-target="#interesting-locations"
      hx-swap="beforeend show:#int-locations-section:top"
      hx-on::before-request="showConfirmationModal()"
    `;
  } else {
    attributes = `
      hx-delete="/places/${location.id}"
      hx-target="closest li"
      hx-swap="outerHTML"
      hx-on::before-request="showConfirmationModal()"
    `;
  }

  return `
    <li class="location-item">
      <button ${attributes}>
        <img 
          src="${`/images/${location.image.src}`}" 
          alt="${location.image.alt}" />
        <h3>${location.title}</h3>
      </button>
    </li>
  `;
}
