export function isPaidOfferEnabled() {
  return process.env.NEXT_PUBLIC_PAID_OFFER_ENABLED === "true";
}
