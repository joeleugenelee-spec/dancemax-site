// When DanceMax is live on the App Store, paste its link here and every button on the site updates.
// Example: 'https://apps.apple.com/app/id6834714977'
var APP_STORE_URL = '';

(function () {
  var apple = '<svg viewBox="0 0 384 512" width="15" height="18" aria-hidden="true"><path fill="currentColor" d="M318.7 268.7c-.2-36.700 16.400-64.400 50-84.800-18.800-26.900-47.200-41.700-84.700-44.600-35.500-2.800-74.300 20.700-88.500 20.700-15 0-49.400-19.700-76.400-19.700C63.300 141.200 4 184.800 4 273.500q0 39.300 14.400 81.200c12.800 36.700 59 126.700 107.200 125.200 25.200-.6 43-17.900 75.800-17.900 31.800 0 48.300 17.900 76.400 17.900 48.600-.7 90.400-82.500 102.600-119.300-65.200-30.700-61.700-90-61.700-91.900zm-56.600-164.200c27.300-32.400 24.800-61.900 24-72.500-24.100 1.400-52 16.400-67.900 34.900-17.500 19.800-27.800 44.300-25.600 71.900 26.100 2 49.900-11.400 69.500-34.300z"/></svg>';
  var slots = document.querySelectorAll('.cta-slot');
  for (var i = 0; i < slots.length; i++) {
    var size = slots[i].getAttribute('data-size');
    var el;
    if (APP_STORE_URL) {
      el = document.createElement('a');
      el.href = APP_STORE_URL;
      el.innerHTML = apple + '<span>' + (size === 'sm' ? 'Get the app' : 'Download on the App Store') + '</span>';
    } else {
      el = document.createElement('span');
      el.className = 'soon';
      el.innerHTML = apple + '<span>' + (size === 'sm' ? 'Coming soon' : 'Coming soon to the App Store') + '</span>';
    }
    el.className = 'btn ' + size + (el.className ? ' ' + el.className : '');
    slots[i].appendChild(el);
  }
})();
