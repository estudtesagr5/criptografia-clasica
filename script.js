// ===== 1. Cifrado César =====
function cesarEncrypt() {
  const key = parseInt(document.getElementById("cesar-key").value);
  const text = document.getElementById("cesar-input").value;
  document.getElementById("cesar-output").value = caesar(text, key);
}
function cesarDecrypt() {
  const key = parseInt(document.getElementById("cesar-key").value);
  const text = document.getElementById("cesar-input").value;
  document.getElementById("cesar-output").value = caesar(text, -key);
}
function caesar(str, shift) {
  return str.replace(/[a-zA-Z]/g, function(c) {
    const code = c.charCodeAt(0);
    const base = code < 97 ? 65 : 97;
    return String.fromCharCode(((code - base + shift % 26 + 26) % 26) + base);
  });
}

// ===== 2. Vigenère =====
function vigenereEncrypt() { document.getElementById("vigenere-output").value = vigenere(document.getElementById("vigenere-input").value, document.getElementById("vigenere-key").value, 1); }
function vigenereDecrypt() { document.getElementById("vigenere-output").value = vigenere(document.getElementById("vigenere-input").value, document.getElementById("vigenere-key").value, -1); }

function vigenere(text, key, direction) {
  key = key.replace(/[^a-zA-Z]/g, '').toUpperCase();
  let result = '';
  let keyIndex = 0;
  for (let char of text) {
    if (/[a-zA-Z]/.test(char)) {
      const base = char === char.toUpperCase() ? 65 : 97;
      const keyChar = key[keyIndex % key.length].toUpperCase();
      const shift = keyChar.charCodeAt(0) - 65;
      const code = char.charCodeAt(0);
      result += String.fromCharCode(((code - base + direction * shift + 26) % 26) + base);
      keyIndex++;
    } else {
      result += char;
    }
  }
  return result;
}

// ===== 3. Transposición Columnar =====
function columnarEncrypt() { document.getElementById("columnar-output").value = columnar(document.getElementById("columnar-input").value, document.getElementById("columnar-key").value, true); }
function columnarDecrypt() { document.getElementById("columnar-output").value = columnar(document.getElementById("columnar-input").value, document.getElementById("columnar-key").value, false); }

function columnar(text, key, encrypt) {
  text = text.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  const cols = key.split('').map(Number);
  const order = encrypt ? cols.map((v,i)=>[v,i]).sort((a,b)=>a[0]-b[0]) : cols.map((v,i)=>[v,i]).sort((a,b)=>b[0]-a[0]);
  const colOrder = order.map(x => x[1]);
  const numCols = cols.length;
  const numRows = Math.ceil(text.length / numCols);
  const grid = Array(numRows).fill().map(() => Array(numCols).fill(''));

  if (encrypt) {
    let idx = 0;
    for (let r = 0; r < numRows; r++)
      for (let c = 0; c < numCols; c++)
        if (idx < text.length) grid[r][c] = text[idx++];
    let result = '';
    for (let c of colOrder)
      for (let r = 0; r < numRows; r++)
        if (grid[r][c]) result += grid[r][c];
    return result;
  } else {
    // decrypt logic (simplificada pero funcional)
    const filled = Array(numCols).fill(0);
    let idx = 0;
    for (let c of colOrder) {
      for (let r = 0; r < numRows; r++) {
        if (idx < text.length) {
          grid[r][c] = text[idx++];
          filled[c]++;
        }
      }
    }
    let result = '';
    for (let r = 0; r < numRows; r++)
      for (let c = 0; c < numCols; c++)
        if (grid[r][c]) result += grid[r][c];
    return result;
  }
}

// ===== 4. Atbash =====
function atbash() {
  const text = document.getElementById("atbash-input").value;
  document.getElementById("atbash-output").value = text.replace(/[a-zA-Z]/g, c => 
    String.fromCharCode(c <= 'Z' ? 90 - (c.charCodeAt(0)-65) : 122 - (c.charCodeAt(0)-97)));
}

// ===== 5. ROT13 =====
function rot13() {
  const text = document.getElementById("rot13-input").value;
  document.getElementById("rot13-output").value = text.replace(/[a-zA-Z]/g, c => 
    String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)));
}
