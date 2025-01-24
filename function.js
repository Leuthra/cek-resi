import ManualJS from "./manual.js";
import axios from "axios";
import * as cheerio from "cheerio";

const encryptTimers = (number) =>
  new Promise((resolve, reject) => {
    const result = ManualJS.MDX.goinstring(
      number,
      ManualJS.jun.Des.parse("79540e250fdb16afac03e19c46dbdeb3"),
      { ii: ManualJS.jun.Des.parse("eb2bb9425e81ffa942522e4414e95bd0") }
    ).rabbittext.toString(ManualJS.jun.Text21);
    resolve(encodeURIComponent(result));
  });

const getCSRFData = async (number) => {
  const response = await axios.get(
    `https://cekresi.com/?noresi=${number}&e=JET`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    }
  );

  const $ = cheerio.load(response.data);
  const viewstate = $('input[name="viewstate"]').val();
  const secret_key = $('input[name="secret_key"]').val();
  return { viewstate, secret_key };
};

const scrapeResiData = (html) => {
  const $ = cheerio.load(html);
  const expedisi = $(".alert.alert-success strong").eq(1).text();
  const noResi = $(".alert.alert-success strong").eq(2).text();
  const pengirim = $('td:contains("Dikirim oleh")').next().next().text().trim();
  const tujuan = $('td:contains("Dikirim ke")')
    .next()
    .next()
    .text()
    .replace(/\s+/g, " ")
    .trim();
  const status = $("#status_resi").text().trim();
  const tanggalKirim = $('td:contains("Dikirim tanggal")')
    .next()
    .next()
    .text()
    .trim();
  const penerima = $("#last_position").text().trim();

  const perjalanan = [];
  $("#collapseTwo .table tr").each((i, row) => {
    const tanggal = $(row).find("td").eq(0).text().trim();
    const keterangan = $(row).find("td").eq(1).text().trim();
    if (tanggal && keterangan && tanggal !== "Tanggal") {
      perjalanan.push({ tanggal, keterangan });
    }
  });

  return {
    expedisi,
    noResi,
    pengirim,
    tujuan,
    status,
    tanggalKirim,
    penerima,
    perjalanan,
  };
};

const getResiTracking = (number, csrf, timers) =>
  new Promise(async (resolve, reject) => {
    try {
      const postData = `viewstate=${csrf.viewstate}&secret_key=${csrf.secret_key}&e=JET&noresi=${number}&timers=${timers}`;
      const getResponse = await axios.post(
        `https://apic.cekresi.com/cekresi/resi/initialize.php?ui=dad9643acec71f85853608db54345ada&p=1&w=chfj6h`,
        postData,
        {
          method: "POST",
          headers: {
            Host: "apic.cekresi.com",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:87.0) Gecko/20100101 Firefox/87.0",
            Accept: "*/*",
            "Accept-Language": "id,en-US;q=0.7,en;q=0.3",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Content-Length": "124",
            Origin: "https://cekresi.com",
            Referer: "https://cekresi.com/",
            "Cache-Control": "max-age=0",
          },
        }
      );
      const resiData = scrapeResiData(getResponse.data);

      if (resiData) {
        resolve({
          valid: true,
          data: resiData,
        });
      } else {
        resolve({
          valid: false,
          message: "Data tidak valid atau tidak ditemukan",
        });
      }
    } catch (err) {
      reject({ valid: false, error: err.message });
    }
  });

export { getCSRFData, encryptTimers, getResiTracking };
