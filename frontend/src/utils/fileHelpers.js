export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64 = typeof result === "string" ? result.split(",")[1] : "";
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

const SIGNATURES = [
  { mime: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47] },
  { mime: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  { mime: "image/gif", bytes: [0x47, 0x49, 0x46, 0x38] },
  { mime: "image/webp", bytes: [0x57, 0x45, 0x42, 0x50], offset: 8 },
  { mime: "video/webm", bytes: [0x1a, 0x45, 0xdf, 0xa3] },
  { mime: "video/mp4", bytes: [0x66, 0x74, 0x79, 0x70], offset: 4 },
  { mime: "video/ogg", bytes: [0x4f, 0x67, 0x67, 0x53] },
];

function decodeHeaderBytes(base64, length) {
  try {
    const binary = atob(base64.slice(0, Math.ceil((length / 3) * 4) + 4));
    const bytes = [];
    for (let i = 0; i < Math.min(binary.length, length); i += 1) {
      bytes.push(binary.charCodeAt(i));
    }
    return bytes;
  } catch {
    return [];
  }
}

export function detectMimeType(base64, fallback = "application/octet-stream") {
  if (!base64) {
    return fallback;
  }

  const headerBytes = decodeHeaderBytes(base64, 16);

  const match = SIGNATURES.find(({ bytes, offset = 0 }) =>
    bytes.every((byte, index) => headerBytes[offset + index] === byte)
  );

  return match ? match.mime : fallback;
}

export function toDataUrl(base64, category) {
  if (!base64) {
    return null;
  }
  const fallback = category === "video" ? "video/mp4" : "image/jpeg";
  const mime = detectMimeType(base64, fallback);
  return `data:${mime};base64,${base64}`;
}
