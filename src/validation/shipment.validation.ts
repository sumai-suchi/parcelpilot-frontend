import { z } from "zod";

export const AddressSchema = z.object({
  label: z.string().max(50).optional(),
  addressLine: z
    .string()
    .trim()
    .min(3, "Address line must be at least 3 characters long"),
  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters long"),
  area: z
    .string()
    .trim()
    .min(2, "Area must be at least 2 characters long"),
  postalCode: z.string().max(20).optional(),
});

export const CreateShipmentSchema = z
  .object({
    pickupType: z.enum(["new", "saved"]).default("new"),
    pickupAddressId: z.string().optional(),
    pickupAddress: AddressSchema.optional(),

    recipientName: z
      .string()
      .trim()
      .min(2, "Recipient name must be at least 2 characters long")
      .max(100, "Recipient name cannot exceed 100 characters")
      .optional()
      .or(z.literal("")),
    recipientPhone: z
      .string()
      .trim()
      .regex(
        /^(?:\+?8801[3-9]\d{8}|01[3-9]\d{8}|\+?[1-9]\d{7,14})$/,
        "Invalid recipient phone format (e.g. 017XXXXXXXX or +8801XXXXXXXXX)",
      )
      .optional()
      .or(z.literal("")),

    deliveryAddress: AddressSchema,

    parcelType: z.string().trim().min(1, "Parcel type is required"),
    weight: z
      .number({ message: "Weight must be a valid number" })
      .gt(0, "Weight must be greater than zero")
      .min(0.05, "Minimum parcel weight is 0.05 kg (50g)")
      .max(500, "Maximum parcel weight allowed is 500 kg"),
    deliveryType: z.enum(["STANDARD", "EXPRESS", "SAME_DAY"]).default("STANDARD"),
    description: z.string().max(1000, "Description cannot exceed 1000 characters").optional(),
    scheduledPickupAt: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.pickupType === "saved") {
        return Boolean(data.pickupAddressId && data.pickupAddressId.length > 0);
      }
      return Boolean(
        data.pickupAddress?.addressLine &&
          data.pickupAddress?.city &&
          data.pickupAddress?.area,
      );
    },
    {
      message: "Please select a saved pickup address or fill in all pickup address fields.",
      path: ["pickupAddressId"],
    },
  );

export type CreateShipmentFormValues = z.infer<typeof CreateShipmentSchema>;
