export type DeliveryZoneId = "jackson" | "texas" | "chicago" | "nationwide"

export type DeliveryEligibility =
  | {
      eligible: true
      zoneId: DeliveryZoneId
      zoneName: string
      deliveryFeeCents: number
      message: string
    }
  | {
      eligible: false
      zoneId: null
      zoneName: null
      deliveryFeeCents: null
      message: string
    }

export const DELIVERY_ZONES: Array<{
  id: Exclude<DeliveryZoneId, "nationwide">
  name: string
  cities: string[]
  deliveryFeeCents: number
  eta: string
  notes: string
}> = [
  {
    id: "jackson",
    name: "Jackson Area",
    cities: ["Jackson", "Ridgeland", "Madison"],
    deliveryFeeCents: 499,
    eta: "45-75 min",
    notes: "Local delivery within the greater Jackson area.",
  },
  {
    id: "texas",
    name: "Texas Metro Areas",
    cities: ["Houston", "Dallas", "Austin", "San Antonio"],
    deliveryFeeCents: 799,
    eta: "45-90 min",
    notes: "Local delivery within select Texas metro areas.",
  },
  {
    id: "chicago",
    name: "Chicago Area",
    cities: ["Chicago", "Evanston", "Oak Park"],
    deliveryFeeCents: 699,
    eta: "45-90 min",
    notes: "Local delivery within the Chicagoland area.",
  },
]

export const NATIONWIDE_SHIPPING_FEE_CENTS = 2499

function normalizeText(value: string) {
  return value.trim().toLowerCase()
}

export function determineDeliveryEligibility(input: {
  addressLine1?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
}): DeliveryEligibility {
  const country = normalizeText(input.country ?? "us")

  // If they’re not in the US, we currently say not eligible.
  // (User asked for "in the country" fallback pricing.)
  if (country !== "us" && country !== "usa" && country !== "united states" && country !== "united states of america") {
    return {
      eligible: false,
      zoneId: null,
      zoneName: null,
      deliveryFeeCents: null,
      message: "We currently only deliver within the United States.",
    }
  }

  const city = normalizeText(input.city ?? "")

  const matchedZone = DELIVERY_ZONES.find((z) => z.cities.some((c) => normalizeText(c) === city))

  if (matchedZone) {
    return {
      eligible: true,
      zoneId: matchedZone.id,
      zoneName: matchedZone.name,
      deliveryFeeCents: matchedZone.deliveryFeeCents,
      message: `Great news — we deliver to ${input.city ?? "your area"}!`,
    }
  }

  // Out of local zone but still in the US: allow nationwide pricing.
  return {
    eligible: true,
    zoneId: "nationwide",
    zoneName: "Nationwide Delivery",
    deliveryFeeCents: NATIONWIDE_SHIPPING_FEE_CENTS,
    message: "You’re outside our local zones, but we can still deliver with nationwide shipping.",
  }
}
