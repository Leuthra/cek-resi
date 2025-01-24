# API Cek Resi Indonesia

API sederhana untuk melacak nomor resi dari berbagai jasa pengiriman di Indonesia. Dibangun menggunakan **Hono.js** dan memanfaatkan **Axios** serta **Cheerio** untuk pengambilan dan parsing data.

## Fitur

- Mendukung pelacakan untuk berbagai ekspedisi di Indonesia, seperti JNE, J&T, SiCepat, POS Indonesia, dan lainnya.
- Mengembalikan informasi detail pengiriman, termasuk riwayat perjalanan paket.
- Memberikan respons dalam format JSON yang mudah diintegrasikan.

---

## Instalasi

1. **Kloning repository**

   ```bash
   git clone https://github.com/Leuthra/cek-resi.git
   cd cek-resi
   ```

2. **Pasang dependensi**
   Pastikan Anda memiliki **Node.js** terinstal, kemudian jalankan:

   ```bash
   npm install
   ```

3. **Menjalankan server**
   Jalankan server lokal menggunakan:
   ```bash
   node index.js
   ```
   Server akan berjalan di `http://localhost:3000`.

---

## Penggunaan

### **Endpoint**

1. **GET `/cek-resi/:noresi`**
   Melacak informasi nomor resi secara otomatis

   **Parameter:**

   - `noresi`: Nomor resi pengiriman.

   **Contoh Request:**

   ```bash
   curl http://localhost:3000/cek-resi/023423949234324
   ```

   **Contoh Respons Berhasil:**

   ```json
   {
     "status": 200,
     "data": {
       "valid": true,
       "data": {
         "expedisi": "JNE Express",
         "noResi": "43534534545345",
         "pengirim": "John Doe",
         "tujuan": "Ohio",
         "status": "Delivered",
         "tanggalKirim": "2025-01-17",
         "penerima": "DELIVERED TO [Yuu | 19-01-2025 15:05 | Jakarta ] (Delivered)",
         "perjalanan": [
           {
             "tanggal": "17-01-2025 16:26",
             "keterangan": "SHIPMENT RECEIVED BY JNE COUNTER OFFICER AT [JAKARTA]"
           },
           {
             "tanggal": "17-01-2025 23:15",
             "keterangan": "RECEIVED AT SORTING CENTER [JAKARTA]"
           },
           {
             "tanggal": "17-01-2025 23:32",
             "keterangan": "DEPARTED FROM TRANSIT [GATEWAY, MEGAHUB]"
           },
           {
             "tanggal": "17-01-2025 23:49",
             "keterangan": "PROCESSED AT SORTING CENTER [JAKARTA, MEGAHUB MACHINE-2]"
           },
           {
             "tanggal": "18-01-2025 01:19",
             "keterangan": "RECEIVED AT ORIGIN GATEWAY  [GATEWAY JAKARTA]"
           },
           {
             "tanggal": "19-01-2025 00:51",
             "keterangan": "RECEIVED AT WAREHOUSE [SUB, TEBEL INBOUND]"
           },
           {
             "tanggal": "19-01-2025 09:36",
             "keterangan": "WITH DELIVERY COURIER  [Jakarta, OPR SELATAN]"
           },
           {
             "tanggal": "19-01-2025 15:05",
             "keterangan": "DELIVERED TO [Yuu | 19-01-2025 15:05 | Jakarta ]"
           }
         ]
       }
     }
   }
   ```

2. **GET `/`**
   Endpoint untuk pengecekan awal.

   **Contoh Request:**

   ```bash
   curl http://localhost:3000/
   ```

   **Contoh Respons:**

   ```json
   {
     "status": 200,
     "author": "Romi Muharom",
     "message": "Selamat datang di API Cek Resi Indonesia. Gunakan endpoint /cek-resi/:noresi untuk melacak pengiriman."
   }
   ```

---

## Ekspedisi yang Didukung

- **JNE**
- **J&T**
- **ID Express**
- **POS Indonesia**
- **Ninja Xpress**
- **Anteraja**
- **Lion Parcel**
- **Paxel**
- **SAP Express**
- **Lazada Express**
- **Lazada Logistics**
- **JDL Express**
- **JX/J-Express**
- **Kerry Express**
- **SF Express**
- Dan lainnya (dapat ditambahkan sesuai kebutuhan).

---

## Dependensi

- [Hono.js](https://github.com/honojs/hono) - Framework minimalis untuk membangun API.
- [Axios](https://axios-http.com) - HTTP client untuk melakukan request.
- [Cheerio](https://cheerio.js.org) - Untuk parsing dan manipulasi data HTML.

---

## Catatan

- **Batasan:** API ini bergantung pada struktur HTML dari situs web jasa pengiriman. Jika ada perubahan pada struktur HTML, scraper mungkin perlu diperbarui.
- **Penggunaan Pribadi:** API ini dirancang untuk keperluan pribadi atau pengembangan. Pastikan untuk mematuhi kebijakan penggunaan dari setiap ekspedisi.

---

## Lisensi

Proyek ini dilisensikan di bawah **MIT License**.

---

Dikembangkan oleh **Romi Muharom**.