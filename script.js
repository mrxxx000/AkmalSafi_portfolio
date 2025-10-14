document.addEventListener('DOMContentLoaded', function(){
  var contactForm = document.getElementById('contact-form');
  var formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      formStatus.textContent = 'Skickar meddelande...';
      setTimeout(function(){
        formStatus.textContent = 'Tack! Ditt meddelande har skickats (simulerat).';
        contactForm.reset();
      }, 900);
    });
  }
});
