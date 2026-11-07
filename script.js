const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isExpanded));
  menuButton.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isExpanded);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#booking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Henna inquiry: ${form.get('occasion')}`);
  const body = encodeURIComponent([
    `Name: ${form.get('name')}`,
    `Email: ${form.get('email')}`,
    `Occasion: ${form.get('occasion')}`,
    '',
    form.get('message') || 'No additional details provided.'
  ].join('\n'));
  window.location.href = `mailto:teyuteyba@gmail.com?subject=${subject}&body=${body}`;
});
