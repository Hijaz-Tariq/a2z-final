// lib/queries/getAllCustomers.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllCustomers() {
  // Fetch all contacts with their pickup/delivery relationships
  const contacts = await prisma.contact.findMany({
    include: {
      pickupContacts: {
        include: {
          customPickupAddress: true,
          //   createdAt: true,
        },
      },
      deliveryContacts: {
        include: {
          customDeliveryAddress: true,
          //   createdAt: true,
        },
      },
    },
  });

  // Process each contact
  return contacts.map((contact) => {
    // Combine all addresses (pickup + delivery)
    const allAddresses = [
      ...contact.pickupContacts
        .filter((p) => p.customPickupAddress)
        .map((p) => p.customPickupAddress!),
      ...contact.deliveryContacts
        .filter((p) => p.customDeliveryAddress)
        .map((p) => p.customDeliveryAddress!),
    ];

    // Deduplicate addresses by ID
    const uniqueAddresses = Array.from(
      new Map(allAddresses.map((addr) => [addr.id, addr])).values()
    );

    // Calculate stats
    const totalShipments =
      contact.pickupContacts.length + contact.deliveryContacts.length;
    const allPickups = [...contact.pickupContacts, ...contact.deliveryContacts];
    const lastShipmentDate = allPickups.length
      ? new Date(
          Math.max(...allPickups.map((p) => new Date(p.createdAt).getTime()))
        )
      : null;
    const pickupAddress =
      contact.pickupContacts.length > 0
        ? contact.pickupContacts[0].customPickupAddress
        : null;

    const deliveryAddress =
      contact.deliveryContacts.length > 0
        ? contact.deliveryContacts[0].customDeliveryAddress
        : null;
    // Extract unique countries
    const originCountries = Array.from(
      new Set(
        contact.pickupContacts
          .map((p) => p.customPickupAddress?.country)
          .filter(Boolean)
      )
    );
    const deliveryCountries = Array.from(
      new Set(
        contact.deliveryContacts
          .map((p) => p.customDeliveryAddress?.country)
          .filter(Boolean)
      )
    );

    return {
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      company: contact.company,
      addresses: uniqueAddresses,
      totalShipments,
      lastShipmentDate,
      originCountries,
      deliveryCountries,
      defaultPickupAddress: pickupAddress,
      defaultDeliveryAddress: deliveryAddress,
    };
  });
}

