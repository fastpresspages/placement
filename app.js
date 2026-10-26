// Placement Kit — mobile menu + suggestion form. Zero dependencies.
(function () {
  'use strict';

  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.hasAttribute('data-open');
      if (open) { menu.removeAttribute('data-open'); }
      else { menu.setAttribute('data-open', ''); }
      btn.setAttribute('aria-expanded', String(!open));
      btn.textContent = open ? 'Menu' : 'Close';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.hasAttribute('data-open')) {
        menu.removeAttribute('data-open'); btn.setAttribute('aria-expanded', 'false'); btn.textContent = 'Menu';
      }
    });
    document.addEventListener('click', function (e) {
      if (menu.hasAttribute('data-open') && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.removeAttribute('data-open'); btn.setAttribute('aria-expanded', 'false'); btn.textContent = 'Menu';
      }
    });
  }

  var form = document.querySelector('.lead-form');
  if (!form) return;
  var status = form.querySelector('.form-status');
  var submitBtn = form.querySelector('button[type="submit"]');

  function show(msg, ok) {
    if (!status) return;
    status.textContent = msg;
    status.classList.toggle('ok', !!ok);
    status.classList.toggle('err', !ok);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var honey = form.querySelector('input[name="_honey"]');
    if (honey && honey.value) return;

    var email = String((form.querySelector('#f-email') || {}).value || '').trim();
    var message = String((form.querySelector('#f-msg') || {}).value || '').trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { show('Please enter a valid email address.', false); return; }
    if (message.length < 10) { show('Give us a bit more detail — at least 10 characters.', false); return; }

    var payload = {
      email: email,
      message: message,
      request_type: 'Placement hub suggestion',
      page: form.getAttribute('data-page') || 'placement',
      date: new Date().toISOString(),
      _subject: '[Placement Kit] Suggestion or question',
      _template: 'table',
      _captcha: 'false'
    };

    if (location.protocol === 'file:') {
      show('Open this page over http(s) to send — or email meetcode99@gmail.com.', false);
      return;
    }

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
    show('Sending…', true);

    fetch('https://formsubmit.co/ajax/meetcode99@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (r) {
      return r.json().then(function (j) { return { ok: r.ok, j: j }; });
    }).then(function (res) {
      if (res.ok && String(res.j.success) === 'true') {
        show('Thanks — a human reads this within a day and adds it if it is honestly free.', true);
        form.reset();
      } else {
        show('Sending failed. Post in Discussions instead: github.com/fastpresspages/placement/discussions', false);
      }
    }).catch(function () {
      show('Network problem. Post in Discussions or email meetcode99@gmail.com.', false);
    }).finally(function () {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send'; }
    });
  });
})();
