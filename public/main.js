function showConfirmationModal() {
  console.log('showing modal...');
}

// Add event listener to dcoument because htm:beforeRequest on
// locations will bubble up to the document
document.addEventListener('htmx:beforeRequest', showConfirmationModal);
