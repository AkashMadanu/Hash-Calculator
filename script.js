document.getElementById('hashButton').addEventListener('click', function () {
    const inputString = document.getElementById('inputString').value;
  
    if (inputString) {
      // Generate hashes using the built-in SubtleCrypto API for SHA hashes and an MD5 library
      generateHashes(inputString);
    } else {
      alert('Please enter a string to hash.');
    }
  });
  
  async function generateHashes(inputString) {
    // MD5 hash (requires a third-party library like SparkMD5)
    const md5 = SparkMD5.hash(inputString); // You need to include this library in your HTML.
  
    // SHA-1 hash
    const sha1 = await hashString('SHA-1', inputString);
    
    // SHA-256 hash
    const sha256 = await hashString('SHA-256', inputString);
  
    // SHA-512 hash
    const sha512 = await hashString('SHA-512', inputString);
  
    // Output the results
    document.getElementById('md5Output').textContent = md5;
    document.getElementById('sha1Output').textContent = sha1;
    document.getElementById('sha256Output').textContent = sha256;
    document.getElementById('sha512Output').textContent = sha512;
  }
  
  async function hashString(algorithm, inputString) {
    const textEncoder = new TextEncoder();
    const encodedData = textEncoder.encode(inputString);
    const hashBuffer = await crypto.subtle.digest(algorithm, encodedData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
  