const CONFIG = {
  name: "Adeh EduHub",
  tagline: "Your school paperwork, handled.",
  whatsapp: "09165924915",
  services: [
    {
      id: "waec",
      icon: "📝",
      title: "WAEC Result Checker",
      desc: "A result checker card with PIN, so you can view your WAEC result online.",
      price: "₦6,500",
    },
    {
      id: "neco",
      icon: "📄",
      title: "NECO Result Token",
      desc: "A NECO token for viewing your result on the official portal.",
      price: "₦3,000",
    },
    {
      id: "jamb",
      icon: "🖨️",
      title: "JAMB Result Printing",
      desc: "A printed copy of your JAMB result, ready for admission or screening.",
      price: "₦2,000",
    },
    {
      id: "letter",
      icon: "🎓",
      title: "Admission Letter Printing",
      desc: "A clean printout of your admission letter, ready to show your school.",
      price: "₦1,500",
    },
    {
      id: "acceptance",
      icon: "💳",
      title: "Acceptance Fee Payment",
      desc: "We pay your acceptance fee and hand over the receipt. Tell us your school for the exact price.",
      price: "Price depends on your school",
    },
    {
      id: "verification",
      icon: "✅",
      title: "Online O'Level Verification",
      desc: "Online verification for your school portal. The price follows the number of sittings you have.",
      price: "₦4,000 to ₦8,000, depending on number of sittings",
    },
  ],
};

function normalizeNumber(raw) {
  let digits = String(raw).replace(/\D/g, "");
  if (digits.startsWith("0")) digits = "234" + digits.slice(1);
  return digits;
}

const PHONE = normalizeNumber(CONFIG.whatsapp);

function waLink(message) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

function priceLabel(service) {
  return service.price ? service.price : "Chat for price";
}

const selected = new Set();

function setupBasics() {
  document.title = `${CONFIG.name} | WAEC, NECO and JAMB Services`;
  document.getElementById("brandName").textContent = CONFIG.name;
  document.getElementById("tagline").textContent = CONFIG.tagline;
  document.getElementById("footName").textContent = `© ${new Date().getFullYear()} ${CONFIG.name}. All rights reserved.`;

  const general = waLink(`Hello ${CONFIG.name}, I have a few questions about your services.`);
  ["headerWa", "heroWa", "ctaWa", "floatWa"].forEach((id) => {
    document.getElementById(id).href = general;
  });
}

function renderServices() {
  const grid = document.getElementById("serviceGrid");
  grid.innerHTML = "";

  CONFIG.services.forEach((service) => {
    const card = document.createElement("article");
    card.className = "card";
    card.id = `card-${service.id}`;

    const icon = document.createElement("div");
    icon.className = "icon";
    icon.textContent = service.icon;

    const title = document.createElement("h3");
    title.textContent = service.title;

    const desc = document.createElement("p");
    desc.textContent = service.desc;

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = priceLabel(service);

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const enquire = document.createElement("a");
    enquire.className = "btn btn-ask";
    enquire.target = "_blank";
    enquire.rel = "noopener";
    enquire.textContent = "Ask about this";
    enquire.href = waLink(`Hello! I am interested in ${service.title} from ${CONFIG.name}. Please send me the details.`);

    const add = document.createElement("button");
    add.type = "button";
    add.className = "btn btn-pick";
    add.textContent = "Select";
    add.addEventListener("click", () => toggleService(service.id));

    actions.append(enquire, add);
    card.append(icon, title, desc, price, actions);
    grid.append(card);
  });
}

function toggleService(id) {
  if (selected.has(id)) {
    selected.delete(id);
  } else {
    selected.add(id);
  }
  updateList();
}

function updateList() {
  CONFIG.services.forEach((service) => {
    const card = document.getElementById(`card-${service.id}`);
    const isSelected = selected.has(service.id);
    card.classList.toggle("selected", isSelected);
    card.querySelector(".btn-pick").textContent = isSelected ? "Selected ✓" : "Select";
  });

  const bar = document.getElementById("listBar");
  bar.hidden = selected.size === 0;
  document.getElementById("listCount").textContent = `Selected: ${selected.size}`;

  const chosen = CONFIG.services.filter((s) => selected.has(s.id));
  const lines = chosen.map((s, i) => `${i + 1}. ${s.title}`);
  const message = `Hello ${CONFIG.name}! I would like to order:\n${lines.join("\n")}\nPlease confirm the total.`;
  document.getElementById("listSend").href = waLink(message);
}

document.getElementById("listClear").addEventListener("click", () => {
  selected.clear();
  updateList();
});

setupBasics();
renderServices();
updateList();
