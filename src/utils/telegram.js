const TELEGRAM_USERNAME = "SwayShopAdmin";

export const buildTelegramOrderUrl = (slug) => {
  const text = `Просто отправьте этот текст чтобы мы вам ответили. Slug: ${slug}`;

  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(text)}`;
};