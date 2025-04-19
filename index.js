import { exec } from 'child_process';

const folder = "C:\\Users\\Devin FS\\facebook"; // pakai double backslash di path Windows
const prompt = `"Berikan hanya satu baris perintah terminal untuk menjalankan file socket.js menggunakan Node.js. Tanpa penjelasan."`;
const prompt_2 = `Tulis path direktori berikut untuk digunakan di CMD, tanpa menggunakan perintah cd. Hanya tampilkan path mentah:\nC:\\Users\\Devin FS\\facebook`
const res = await fetch("http://localhost:11434/api/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "mistral",
    "prompt": `${prompt}`,
    "stream": false
  })
});

const res_2 = await fetch("http://localhost:11434/api/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "mistral",
    "prompt": `${prompt_2}`,
    "stream": false
  })
});

const data = await res.json();
const ai = data.response;
const clean = ai.replace(/^"|"$/g, '')  // hapus tanda petik awal/akhir
                .replace(/\\n/g, '')    // hapus newline literal \n
                .replace(/\n/g, '')     // hapus newline beneran
                .replace(/`/g, '')    
                .trim();

console.log(clean);

const data_2 = await res_2.json();
const ai_2 = data_2.response;
const clean_2 = ai_2.replace(/^"|"$/g, '')  // hapus tanda petik awal/akhir
                .replace(/\\n/g, '')    // hapus newline literal \n
                .replace(/\n/g, '')     // hapus newline beneran
                .replace(/`/g, '')    
                .trim();                // hapus spasi di awal/akhir

console.log(clean_2);

const command = `start cmd.exe /k "cd ${clean_2} && ${clean}"`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Terjadi error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

