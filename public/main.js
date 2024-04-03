function showConfirmationModal(event) {
  // Pauses htmx requests until modal is closed
  event.preventDefault();
  console.log(event);
  const action = event.detail.elt.dataset.action;
  const confirmationModal = `
        <dialog class="modal">
            <div id="confirmation">
                <h2>Are you sure?</h2>
                <p>
                    Do you really want to ${action} this place?
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

  const noBtn = document.getElementById('action-no');
  noBtn.addEventListener('click', function () {
    dialog.remove();
  });

  const yesBtn = document.getElementById('action-yes');
  yesBtn.addEventListener('click', function () {
    event.detail.issueRequest();
    dialog.remove();
  });

  dialog.showModal();
}

// Add event listener to dcoument because htm:confirm on
// locations will bubble up to the document
document.addEventListener('htmx:confirm', showConfirmationModal);
