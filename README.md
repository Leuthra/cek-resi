# API Cek Resi JNE

API sederhana untuk melacak nomor resi JNE menggunakan scraping dari halaman resmi JNE. Dibangun menggunakan **Hono.js** dan memanfaatkan **Axios** serta **Cheerio** untuk pengambilan dan parsing data.

## Fitur
- Melacak informasi detail pengiriman berdasarkan nomor resi.
- Mendapatkan riwayat perjalanan paket.
- Memberikan respons dalam format JSON yang mudah diintegrasikan.

---

## Instalasi

1. **Kloning repository**
   ```bash
   git clone https://github.com/username/cek-resi-jne.git
   cd cek-resi-jne
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
1. **GET `/cek-resi/jne/:noresi`**
   Melacak informasi nomor resi.

   **Contoh Request:**
   ```bash
   curl http://localhost:3000/cek-resi/jne/010190001491925
   ```

   **Contoh Respons Berhasil:**
   ```json
   {
     "status": 200,
     "data": {
       "awb": "012342342342",
       "service": "Reguler",
       "origin": "Jakarta",
       "destination": "Surabaya",
       "estimation": "19-01-2025",
       "pod_date": "19-01-2025",
       "shipper": {
         "name": "john@doe",
         "city": "Jakarta"
       },
       "receiver": {
         "name": "yuri",
         "city": "Surabaya"
       },
       "shipment": {
         "date": "17-01-2025",
         "koli": "1",
         "weight": "1 KG",
         "good_desc": "Paket Dokumen"
       },
       "received_by": {
         "name": "shinta",
         "title": "Penerima"
       },
       "history": [
         {
           "status": "SHIPMENT RECEIVED BY JNE COUNTER OFFICER",
           "date": "17-01-2025 16:26"
         },
         {
           "status": "RECEIVED AT SORTING CENTER",
           "date": "17-01-2025 23:15"
         },
         {
           "status": "DELIVERED TO [DIAH TTG SEBELAH]",
           "date": "19-01-2025 15:05"
         }
       ],
       "currentStatus": {
         "status": "DELIVERED",
         "date": "19-01-2025 15:05"
       }
     }
   }
   ```

   **Contoh Respons Gagal (Resi tidak ditemukan):**
   ```json
   {
     "status": 404,
     "message": "Nomor resi tidak ditemukan"
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
     "message": "Selamat datang di API Cek Resi JNE, endpoint ada di /cek-resi/jne/:noresi"
   }
   ```

---

## Dependensi

- [Hono.js](https://github.com/honojs/hono) - Framework minimalis untuk membangun API.
- [Axios](https://axios-http.com) - HTTP client untuk melakukan request.
- [Cheerio](https://cheerio.js.org) - Untuk parsing dan manipulasi data HTML.

---

## Catatan

- **Batasan:** API ini bergantung pada struktur HTML dari situs web JNE. Jika ada perubahan pada struktur HTML, scraper mungkin perlu diperbarui.
- **Penggunaan Pribadi:** API ini dirancang untuk keperluan pribadi atau pengembangan. Pastikan untuk mematuhi kebijakan penggunaan dari pihak JNE.

---

## Lisensi

Proyek ini dilisensikan di bawah **MIT License**.

---

Dikembangkan oleh **Romi Muharom**. 😊