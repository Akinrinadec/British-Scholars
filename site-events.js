window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}

var staffModeKey = 'bs_analytics_staff_mode';
var analyticsMode = new URLSearchParams(window.location.search).get('analytics_mode');
var staffModeEnabled = analyticsMode === 'staff';

try {
  if (analyticsMode === 'staff') {
    localStorage.setItem(staffModeKey, '1');
  } else if (analyticsMode === 'public') {
    localStorage.removeItem(staffModeKey);
    staffModeEnabled = false;
  } else {
    staffModeEnabled = localStorage.getItem(staffModeKey) === '1';
  }
} catch (error) {
  // Storage can be unavailable in private browsing; the current page still works.
}

if (analyticsMode === 'staff' || analyticsMode === 'public') {
  var cleanUrl = new URL(window.location.href);
  cleanUrl.searchParams.delete('analytics_mode');
  window.history.replaceState({}, '', cleanUrl.pathname + cleanUrl.search + cleanUrl.hash);

  document.addEventListener('DOMContentLoaded', function () {
    var notice = document.createElement('div');
    notice.setAttribute('role', 'status');
    notice.textContent = analyticsMode === 'staff'
      ? 'Analytics staff mode is enabled on this browser.'
      : 'Analytics staff mode is disabled on this browser.';
    notice.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:9999;max-width:360px;padding:12px 16px;border-radius:8px;background:#142742;color:#fff;font:600 14px/1.4 Arial,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.2)';
    document.body.appendChild(notice);
    window.setTimeout(function () { notice.remove(); }, 5000);
  });
}

gtag('js', new Date());

if (staffModeEnabled) {
  gtag('set', { traffic_type: 'internal' });
}

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
  } else if (href.indexOf('tutor-safeguarding-checklist-uae.pdf') !== -1) {
    eventName = 'parent_checklist_download';
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
