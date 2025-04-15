// Çok sayfalı uygulamalarda bir sayfa birden çok eleman için ortak ise bu sayfa dinamik şekilde render edilir.Bunu yaparken ilk olarak url'e bir parametre geçilir.Sonrasında bu parametre url'den alınarak sayfa içeriğinin renderlanması sağlanır.

import fetchMenu from "./api.js";
import { elements, renderDetailPage, renderNotFoundPage } from "./ui.js";

// Javascript URLSearchParams classı sayesinde url'deki arama parametrelerini alıp kullanabiliriz.
const params = new URLSearchParams(window.location.search);

// UrlsearchParams ile url'deki id değerine eriş
const id = +params.get("id");

console.log(id);

document.addEventListener("DOMContentLoaded", async () => {
  // Api'dan menü elemanlarını al
  const data = await fetchMenu();

  // Detay sayfasında renderlanacak ürünü bul
  const product = data.find((item) => item.id === id);

  // Eğer ürün  varsa renderDetailPage fonksiyonunu çalıştır ama yoksa renderNotFoundPage fonksiyonunu çalıştır

  if (!product) {
    renderNotFoundPage(elements.detailPage);
  } else {
    renderDetailPage(product, elements.detailPage);
  }
});