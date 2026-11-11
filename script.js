const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const message = String(data.get('message') || '').trim();
  const subject = encodeURIComponent('Website inquiry from ' + name);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  // Send inquiries to the Renegade Empire Tech support inbox.
  window.location.href = `mailto:support@renegadeempiretech.com?subject=${subject}&body=${body}`;
});
