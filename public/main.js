function showConfirmationModal(event) {
  event.preventDefault();
  console.log(event);
  const confirmationModal = `
        <dialog class="modal">
            <div id="confirmation">
                <h2>Are you sure?</h2>
                <p>
                    You can always add it back later.
                </p>
                <div id="confirmation-actions">
                    <button 
                        id="action-no"
                        className="button-text">
                            Cancel
                    </button>
                    <button 
                        id="action-yes"
                        className="button">
                            Yes
                    </button>
                <div>
            <div>
        </dialog>`;

  document.body.insertAdjacentHTML('beforeend', confirmationModal);
  //   Manually show modal
  const dialog = document.querySelector('dialog');
  dialog.showModal();
}

// Add event listener to dcoument because htm:beforeRequest on
// locations will bubble up to the document
document.addEventListener('htmx:beforeRequest', showConfirmationModal);
