const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const orderForm = document.querySelector("#orderForm");

if (orderForm) {
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(orderForm);
    const product = formData.get("product") || "";
    const name = formData.get("name") || "";
    const phone = formData.get("phone") || "";
    const quantity = formData.get("quantity") || "";
    const date = formData.get("date") || "";
    const message = formData.get("message") || "";

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
