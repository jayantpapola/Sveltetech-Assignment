const KEY = 'redux-tailwind-key';

function toBytes(str){ return new TextEncoder().encode(str); }
function fromBytes(bytes){ return new TextDecoder().decode(bytes); }
function xor(data, key){
  const out = new Uint8Array(data.length);
  for(let i=0;i<data.length;i++) out[i] = data[i] ^ key[i % key.length];
  return out;
}
export function encrypt(str){
  const b = toBytes(str); const k = toBytes(KEY);
  const x = xor(b,k);
  return btoa(String.fromCharCode(...x));
}
export function decrypt(b64){
  try{
    const bin = atob(b64);
    const bytes = new Uint8Array([...bin].map(c => c.charCodeAt(0)));
    const k = toBytes(KEY);
    const x = xor(bytes,k);
    return fromBytes(x);
  }catch(e){ return null; }
}
