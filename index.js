import { Hono } from "hono";
import { serve } from "@hono/node-server";
import axios from "axios";
import * as cheerio from "cheerio";

const app = new Hono();

app.get("/cek-resi/jne/:noresi", async (c) => {
  const noresi = c.req.param("noresi");

  if (!noresi || noresi.trim() === "") {
    return c.json({ error: 400, message: "Nomor resi tidak boleh kosong" });
  }

  try {
    const response = await axios({
      method: "get",
      url: `https://cekresi.jne.co.id/${noresi.trim()}`,
      maxRedirects: 0,
      headers: {
        Referer: "https://www.jne.co.id/",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(response.data);
    const valid =
      $(".panel-title").text().trim() !== "Airwaybill is not found";
    if (!valid) {
      return c.json({ status: 404, message: "Nomor resi tidak ditemukan" });
    }

    const data = {
      awb: $(".x_title").first().text().trim(),
      service: $(".tile_stats_count").find("h2").eq(0).text().trim(),
      origin: $(".tile_stats_count").find("h4").eq(0).text().trim(),
      destination: $(".tile_stats_count").find("h4").eq(1).text().trim(),
      estimation: $(".tile_stats_count").find("h3").eq(0).text().trim(),
      pod_date: $(".tile_stats_count").find("h4").eq(2).text().trim(),
      shipper: {
        name: $(".tile").find("h4").eq(4).text().trim(),
        city: $(".tile").find("h4").eq(5).text().trim(),
      },
      receiver: {
        name: $(".tile").find("h4").eq(6).text().trim(),
        city: $(".tile").find("h4").eq(7).text().trim(),
      },
      shipment: {
        date: $(".tile").find("h4").eq(0).text().trim(),
        koli: $(".tile").find("h4").eq(1).text().trim(),
        weight: $(".tile").find("h4").eq(2).text().trim(),
        good_desc: $(".tile").find("h4").eq(3).text().trim(),
      },
      received_by: $(".col-md-3.col-sm-3.col-xs-12").find("h2").text().trim()
        ? {
            name: $(".col-md-3.col-sm-3.col-xs-12").find("h2").text().trim(),
            title: $(".col-md-3.col-sm-3.col-xs-12").find("h4").text().trim(),
          }
        : null,
      history: [],
    };

    $(".timeline")
      .find("li")
      .each((i, el) => {
        const status = $(el).find("h2").text().trim();
        const date = $(el).find("span").text().trim();
        data.history.push({ status, date });
      });

      data.currentStatus = data.history[data.history.length - 1];

    return c.json({ status: 200, data });
  } catch (err) {
    console.error("Error saat scraping:", err.message);
    if (err.response && err.response.status === 302) {
      return c.json({
        status: 500,
        message: `Redirected to: ${err.response.headers.location}`,
      });
    }
    return c.json({ status: 500, message: "Terjadi kesalahan server" });
  }
});

app.get("/", (c) => {
    return c.json({ status: 200, author: 'Romi Muharom', message: "Selamat datang di API Cek Resi JNE, endpoint ada di /cek-resi/jne/:noresi" });
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({ fetch: app.fetch, port });
