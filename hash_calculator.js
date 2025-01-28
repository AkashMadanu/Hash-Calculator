// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const hashButton = document.getElementById('hashButton');
  const inputString = document.getElementById('inputString');

  async function generateHashes() {
      const text = inputString.value;
      if (!text) return;

      // MD5 (using SparkMD5)
      const md5Hash = SparkMD5.hash(text);
      document.getElementById('md5Output').textContent = md5Hash;

      // SHA-1
      const sha1Hash = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(text));
      document.getElementById('sha1Output').textContent = bufferToHex(sha1Hash);

      // SHA-256
      const sha256Hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      document.getElementById('sha256Output').textContent = bufferToHex(sha256Hash);

      // SHA-512
      const sha512Hash = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(text));
      document.getElementById('sha512Output').textContent = bufferToHex(sha512Hash);
  }

  // Helper function to convert buffer to hexadecimal
  function bufferToHex(buffer) {
      return Array.from(new Uint8Array(buffer))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
  }

  // Add click event listener to the button
  hashButton.addEventListener('click', generateHashes);

  // Add enter key event listener to the input
  inputString.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          generateHashes();
      }
  });
});