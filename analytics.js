window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

gtag('js', new Date());
gtag('config', 'G-J1JTTYF161');

document.addEventListener('click', function (event) {
  var link = event.target.closest('a[href]');
  if (!link) return;

  var href = link.getAttribute('href') || '';
  var eventName = '';

  if (href.indexOf('wa.me/') !== -1) {
    eventName = 'whatsapp_click';
  } else if (href.indexOf('tel:') === 0) {
    eventName = 'phone_call_click';
  } else if (href.indexOf('tally.so/r/QKOA01') !== -1) {
    eventName = 'parent_enquiry_click';
  } else if (href.indexOf('tally.so/r/D4Axvp') !== -1) {
    eventName = 'tutor_registration_click';
  }

  if (eventName) {
    gtag('event', eventName, {
      link_url: link.href,
      link_text: (link.textContent || '').trim(),
      page_path: window.location.pathname
    });
  }
});
