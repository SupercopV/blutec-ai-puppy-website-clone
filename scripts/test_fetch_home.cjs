async function main() {
  try {
    const res = await fetch('http://localhost:3000/');
    console.log('Status:', res.status, res.statusText);
    const html = await res.text();
    console.log('HTML length:', html.length);
    console.log('Contains root:', html.includes('id="root"'));
    console.log('Home check passed!');
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}
main();
