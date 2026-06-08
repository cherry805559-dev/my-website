const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const backToTop = document.querySelector("#backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 360);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

const orderForm = document.querySelector("#orderForm");
const backend = window.ORDER_BACKEND || {};
const hasSupabase = backend.supabaseUrl && backend.supabaseAnonKey && window.supabase;
const supabaseClient = hasSupabase
  ? window.supabase.createClient(backend.supabaseUrl, backend.supabaseAnonKey)
  : null;

document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    const productInput = document.querySelector("input[name='product']");

    if (productInput) {
      productInput.value = button.dataset.product || "";
    }
  });
});

if (orderForm) {
  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(orderForm);
    const product = formData.get("product") || "";
    const name = formData.get("name") || "";
    const phone = formData.get("phone") || "";
    const quantity = formData.get("quantity") || "";
    const date = formData.get("date") || "";
    const message = formData.get("message") || "";

    if (supabaseClient) {
      const { error } = await supabaseClient.from("orders").insert({
        product,
        customer_name: name,
        phone,
        quantity: Number(quantity),
        needed_date: date || null,
        note: message,
        status: "新訂單"
      });

      if (!error) {
        alert("已送出詢問，我們會盡快與您聯絡。");
        orderForm.reset();
        orderForm.product.value = product;
        return;
      }

      alert("送出失敗，請稍後再試或直接聯絡店家。");
      return;
    }

    const subject = `下單詢問：${product}`;
    const body = [
      `商品名稱：${product}`,
      `姓名：${name}`,
      `聯絡電話：${phone}`,
      `數量：${quantity}`,
      `需要日期：${date}`,
      "",
      "備註需求：",
      message
    ].join("\n");

    window.location.href = `mailto:hello@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
