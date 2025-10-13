document.addEventListener('DOMContentLoaded', function(){
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  var avatarButton = document.getElementById('avatar-button');
  var avatarInput = document.getElementById('avatar-input');
  var avatarPreview = document.getElementById('avatar-preview');
  var heroAvatar = document.getElementById('hero-avatar');

  if(navToggle && mainNav){
    navToggle.addEventListener('click', function(){
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      var hidden = mainNav.getAttribute('aria-hidden') === 'true';
      mainNav.setAttribute('aria-hidden', String(!hidden));
    });
  }

  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      formStatus.textContent = 'Skickar meddelande...';
      setTimeout(function(){
        formStatus.textContent = 'Tack! Ditt meddelande har skickats (simulerat).';
        contactForm.reset();
      }, 900);
    });
  }

  if(avatarButton && avatarInput && avatarPreview){
    try{
      var saved = localStorage.getItem('avatarDataUrl');
      if(saved){
        avatarPreview.style.backgroundImage = 'url("' + saved + '")';
        avatarPreview.classList.add('has-image');
        if(heroAvatar){
          heroAvatar.style.backgroundImage = 'url("' + saved + '")';
          heroAvatar.classList.add('has-image');
        }
      }
    }catch(e){ /* ignore storage errors */ }

    avatarButton.addEventListener('click', function(){
      avatarInput.click();
    });

    avatarInput.addEventListener('change', function(e){
      var file = avatarInput.files && avatarInput.files[0];
      if(!file) return;
      if(!file.type.startsWith('image/')){
        alert('Vänligen välj en bildfil.');
        avatarInput.value = '';
        return;
      }
      if(file.size > 2.5 * 1024 * 1024){
        alert('Filen är för stor. Välj en bild under 2.5 MB.');
        avatarInput.value = '';
        return;
      }

      var reader = new FileReader();
      reader.onload = function(evt){
        var dataUrl = evt.target.result;
        avatarPreview.style.backgroundImage = 'url("' + dataUrl + '")';
        avatarPreview.classList.add('has-image');
        if(heroAvatar){
          heroAvatar.style.backgroundImage = 'url("' + dataUrl + '")';
          heroAvatar.classList.add('has-image');
        }
        try{
          localStorage.setItem('avatarDataUrl', dataUrl);
        }catch(e){ /* ignore storage quota */ }
      };
      reader.readAsDataURL(file);
    });

    avatarButton.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        avatarInput.click();
      }
    });
  }
});
