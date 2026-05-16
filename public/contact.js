// Simple contact form helper using Formspree (or any REST endpoint).
// Set FORM_ENDPOINT in your environment or replace the URL here.

const FORM_ENDPOINT = (window.__FORM_ENDPOINT__ || '').trim(); // placeholder to be replaced at build time or set in global

async function submitContact(formEl) {
  const data = new FormData(formEl);
  const payload = {};
  data.forEach((v, k) => payload[k] = v);

  const endpoint = FORM_ENDPOINT || formEl.action || '/';
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      alert('Message sent — thank you!');
      formEl.reset();
    } else {
      const json = await res.json().catch(()=>null);
      throw new Error(json && json.error ? json.error : 'Send failed');
    }
  } catch (err) {
    console.error(err);
    alert('Sending failed — please try again later.');
  }
}

// Export for use in pages
window.submitContact = submitContact;
