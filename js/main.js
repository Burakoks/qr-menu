import fetchMenu from "./api.js";
import { elements, renderCard } from "./ui.js";

// Sayfa yüklendiğinde api'a istek at ve gelen veriyi data'ya ata

document.addEventListener("DOMContentLoaded", async () => {
  // Apidan veri al
  const data = await fetchMenu();

  // Api'dan gelen veri ile arayüzü dinamik şekilde renderla
  renderCard(data);

  // Inputlara bir olay izleyicisi ekle ve değişen inputun categorisine erişip bu categorideki ürünleri render et

  elements.inputs.forEach((input) => {
    // querySelectorAll metodu ile elde edilen inputs bir HtmlCollection olduğundan buna direkt addEventListener ekleyemeyiz.Bu sebeple bu HtmlCollection'ı dönüp her bir elemanı ayırdık.
    input.addEventListener("change", () => {
      // Seçili input'ın id'sini al
      const selected = input.id;

      console.log(selected);

      // ! Eğer seçili kategori all ise tüm ürünleri ama bunun dışında bir kategori ise buna ait ürünleri renderla

      if (selected === "all") {
        renderCard(data);
      } else {
        // selected'ye menu elemanlarını dön ve seçili kategoriye sahip elemanları al
        const filtred = data.filter((item) => item.category == selected);

        // Filtrelenen elemanları render et
        renderCard(filtred);
      }
    });
  });
});