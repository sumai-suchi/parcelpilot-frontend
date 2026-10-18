"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useCreateCheckoutSession } from "@/hooks/payment.hook";
import { useCreateShipment, useGetMyAddresses } from "@/hooks/shipment.hook";
import type { CreatedShipmentData } from "@/types/shipment.interface";
import { DeliveryAddressStep } from "./create-shipment/delivery-address-step";
import { ParcelDetailsStep } from "./create-shipment/parcel-details-step";
import { PickupAddressStep } from "./create-shipment/pickup-address-step";
import { ShipmentCostSummary } from "./create-shipment/shipment-cost-summary";
import { ShipmentSuccessModal } from "./create-shipment/shipment-success-modal";

export function CreateShipmentForm() {
  // Saved address fetch
  const { data: addressesRes } = useGetMyAddresses();
  const savedAddresses = addressesRes?.data || [];

  // Form State
  const [pickupUseSaved, setPickupUseSaved] = useState(false);
  const [pickupSelectedId, setPickupSelectedId] = useState("");
  const [pickupLabel, setPickupLabel] = useState("");
  const [pickupAddressLine, setPickupAddressLine] = useState("");
  const [pickupCity, setPickupCity] = useState("Dhaka");
  const [pickupArea, setPickupArea] = useState("Banani");
  const [pickupPostalCode, setPickupPostalCode] = useState("1213");

  const [deliveryUseSaved, setDeliveryUseSaved] = useState(false);
  const [deliverySelectedId, setDeliverySelectedId] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [deliveryAddressLine, setDeliveryAddressLine] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("Dhaka");
  const [deliveryArea, setDeliveryArea] = useState("Gulshan");
  const [deliveryPostalCode, setDeliveryPostalCode] = useState("1212");

  const [parcelType, setParcelType] = useState("Electronics");
  const [weight, setWeight] = useState(1.5);
  const [deliveryType, setDeliveryType] = useState("STANDARD");
  const [description, setDescription] = useState("");

  // Result state
  const [createdShipment, setCreatedShipment] =
    useState<CreatedShipmentData | null>(null);

  const createShipmentMutation = useCreateShipment();
  const createCheckoutMutation = useCreateCheckoutSession();

  const handleSelectPickupSaved = (id: string) => {
    setPickupSelectedId(id);
    const found = savedAddresses.find((a) => a.id === id);
    if (found) {
      setPickupAddressLine(found.addressLine);
      setPickupCity(found.city);
      setPickupArea(found.area);
      setPickupPostalCode(found.postalCode || "");
    }
  };

  const handleSelectDeliverySaved = (id: string) => {
    setDeliverySelectedId(id);
    const found = savedAddresses.find((a) => a.id === id);
    if (found) {
      setDeliveryAddressLine(found.addressLine);
      setDeliveryCity(found.city);
      setDeliveryArea(found.area);
      setDeliveryPostalCode(found.postalCode || "");
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!pickupUseSaved && (!pickupAddressLine || !pickupCity || !pickupArea)) {
      toast.error("Please fill in complete pickup address details.");
      return;
    }
    if (!recipientName || !recipientPhone) {
      toast.error("Please enter recipient name and contact phone number.");
      return;
    }
    if (
      !deliveryUseSaved &&
      (!deliveryAddressLine || !deliveryCity || !deliveryArea)
    ) {
      toast.error("Please fill in complete delivery address details.");
      return;
    }

    const payload: any = {
      parcelType,
      weight,
      deliveryType,
      description: description || undefined,
      recipientName,
      recipientPhone,
    };

    if (pickupUseSaved && pickupSelectedId) {
      payload.pickupAddressId = pickupSelectedId;
    } else {
      payload.pickupAddress = {
        label: pickupLabel || "Pickup Address",
        addressLine: pickupAddressLine,
        city: pickupCity,
        area: pickupArea,
        postalCode: pickupPostalCode || undefined,
      };
    }

    if (deliveryUseSaved && deliverySelectedId) {
      payload.deliveryAddressId = deliverySelectedId;
    } else {
      payload.deliveryAddress = {
        label: "Delivery Address",
        addressLine: deliveryAddressLine,
        city: deliveryCity,
        area: deliveryArea,
        postalCode: deliveryPostalCode || undefined,
      };
    }

    try {
      const res = await createShipmentMutation.mutateAsync(payload);
      const data = res.data;
      setCreatedShipment(data);
      toast.success("Shipment registered successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to create shipment.");
    }
  };

  const handlePayWithStripe = async (shipmentId: string) => {
    try {
      toast.info("Connecting to Stripe...", {
        description: "Redirecting to Stripe secure hosted checkout",
      });
      const res = await createCheckoutMutation.mutateAsync({ shipmentId });
      if (res?.data?.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error("Stripe checkout URL was not returned by gateway.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to initiate Stripe checkout.");
    }
  };

  const handleReset = () => {
    setCreatedShipment(null);
    setPickupAddressLine("");
    setDeliveryAddressLine("");
    setRecipientName("");
    setRecipientPhone("");
    setDescription("");
  };

  if (createdShipment) {
    return (
      <ShipmentSuccessModal
        shipment={createdShipment}
        isRedirecting={createCheckoutMutation.isPending}
        onOpenPayment={() => handlePayWithStripe(createdShipment.id)}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-5">
        <PickupAddressStep
          savedAddresses={savedAddresses}
          useSaved={pickupUseSaved}
          selectedAddressId={pickupSelectedId}
          onSelectSaved={handleSelectPickupSaved}
          onToggleUseSaved={setPickupUseSaved}
          label={pickupLabel}
          addressLine={pickupAddressLine}
          city={pickupCity}
          area={pickupArea}
          postalCode={pickupPostalCode}
          onChangeField={(field, val) => {
            if (field === "label") setPickupLabel(val);
            if (field === "addressLine") setPickupAddressLine(val);
            if (field === "city") setPickupCity(val);
            if (field === "area") setPickupArea(val);
            if (field === "postalCode") setPickupPostalCode(val);
          }}
        />

        <DeliveryAddressStep
          savedAddresses={savedAddresses}
          useSaved={deliveryUseSaved}
          selectedAddressId={deliverySelectedId}
          onSelectSaved={handleSelectDeliverySaved}
          onToggleUseSaved={setDeliveryUseSaved}
          recipientName={recipientName}
          recipientPhone={recipientPhone}
          addressLine={deliveryAddressLine}
          city={deliveryCity}
          area={deliveryArea}
          postalCode={deliveryPostalCode}
          onChangeField={(field, val) => {
            if (field === "recipientName") setRecipientName(val);
            if (field === "recipientPhone") setRecipientPhone(val);
            if (field === "addressLine") setDeliveryAddressLine(val);
            if (field === "city") setDeliveryCity(val);
            if (field === "area") setDeliveryArea(val);
            if (field === "postalCode") setDeliveryPostalCode(val);
          }}
        />

        <ParcelDetailsStep
          parcelType={parcelType}
          weight={weight}
          deliveryType={deliveryType}
          description={description}
          onChangeField={(field, val) => {
            if (field === "parcelType") setParcelType(val);
            if (field === "weight") setWeight(val);
            if (field === "deliveryType") setDeliveryType(val);
            if (field === "description") setDescription(val);
          }}
        />
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <ShipmentCostSummary
            weight={weight}
            deliveryType={deliveryType}
            isSubmitting={createShipmentMutation.isPending}
            onProceedToPayment={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
