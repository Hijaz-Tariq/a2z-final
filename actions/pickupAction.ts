// // // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // // // app/actions/pickupAction.ts
// // // // // import { z } from "zod";
// // // // import { pickupFormSchema } from "../types/PickupPage";

// // // // export async function pickupAction(
// // // //   prevState: { message: string; error?: string },
// // // //   formData: FormData
// // // // ): Promise<{ message: string; error?: string; pickupId?: string }> {
// // // //   try {
// // // //     const jsonData = formData.get("jsonData") as string;
// // // //     const parsedData = JSON.parse(jsonData);

// // // //     // Convert scheduledDate string back to Date
// // // //     if (parsedData.scheduledDate) {
// // // //       parsedData.scheduledDate = new Date(parsedData.scheduledDate);
// // // //     }

// // // //     // Validate with Zod
// // // //     const validatedData = pickupFormSchema.parse(parsedData);

// // // //     // Send data to the API endpoint
// // // //     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pickup`, {
// // // //       method: "POST",
// // // //       headers: {
// // // //         "Content-Type": "application/json",
// // // //       },
// // // //       body: JSON.stringify(validatedData),
// // // //     });

// // // //     if (!response.ok) {
// // // //       const errorData = await response.json();
// // // //       throw new Error(errorData.error || "Failed to create pickup");
// // // //     }

// // // //     const pickup = await response.json();
    
// // // //     return { 
// // // //       message: "Pickup scheduled successfully!",
// // // //       pickupId: pickup.id // Return the pickup ID for redirection
// // // //     };
// // // //   } catch (error: any) {
// // // //     console.error("🚨 Server Action Error:", error);
// // // //     return { 
// // // //       message: "Failed to schedule pickup", 
// // // //       error: error.message || "Invalid form data" 
// // // //     };
// // // //   }
// // // // }

// // // import { z } from "zod";
// // // import { pickupFormSchema } from "../types/PickupPage";

// // // export async function pickupAction(
// // //   prevState: { message: string; error?: string },
// // //   formData: FormData
// // // ): Promise<{ message: string; error?: string }> {
// // //   try {
// // //     const jsonData = formData.get("jsonData") as string;
// // //     const parsedData = JSON.parse(jsonData);

// // //     // Convert scheduledDate string back to Date
// // //     if (parsedData.scheduledDate) {
// // //       parsedData.scheduledDate = new Date(parsedData.scheduledDate);
// // //     }

// // //     // Validate with Zod
// // //     const validatedData = pickupFormSchema.parse(parsedData);

// // //     // Simulate saving to DB or API
// // //     console.log("✅ Validated Data:", validatedData);

// // //     return { message: "Pickup scheduled successfully!" };
// // //   } catch (error) {
// // //     console.error("🚨 Server Action Error:", error);
// // //     return { message: "Failed to schedule pickup", error: "Invalid form data" };
// // //   }
// // // }


// // // app/actions/pickupAction.ts
// // import { z } from "zod";
// // import { pickupFormSchema } from "../types/PickupPage";

// // export async function pickupAction(
// //   prevState: { message: string; error?: string },
// //   formData: FormData
// // ) {
// //   try {
// //     const jsonData = formData.get("jsonData") as string;
// //     const parsedData = JSON.parse(jsonData);

// //     // Convert scheduledDate string back to Date
// //     if (parsedData.scheduledDate) {
// //       parsedData.scheduledDate = new Date(parsedData.scheduledDate);
// //     }

// //     // Validate with Zod
// //     const validatedData = pickupFormSchema.parse(parsedData);

// //     // Use relative path - this is the key fix
// //     const response = await fetch('/api/pickup', {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(validatedData),
// //     });

// //     if (!response.ok) {
// //       const errorData = await response.json();
// //       throw new Error(errorData.error || "Failed to create pickup");
// //     }

// //     const pickup = await response.json();
    
// //     return { 
// //       message: "Pickup scheduled successfully!",
// //       pickupId: pickup.id
// //     };
// //   } catch (error: any) {
// //     console.error("🚨 Server Action Error:", error);
// //     return { 
// //       message: "Failed to schedule pickup", 
// //       error: error.message || "Invalid form data" 
// //     };
// //   }
// // }


// import { z } from "zod";
// import { pickupFormSchema } from "../types/PickupPage";

// export async function pickupAction(
//   prevState: { message: string; error?: string },
//   formData: FormData
// ): Promise<{ message: string; error?: string; pickupId?: string }> {
//   try {
//     const jsonData = formData.get("jsonData") as string;
//     const parsedData = JSON.parse(jsonData);

//     // Convert scheduledDate string back to Date
//     if (parsedData.scheduledDate) {
//       parsedData.scheduledDate = new Date(parsedData.scheduledDate);
//     }

//     // Validate with Zod
//     const validatedData = pickupFormSchema.parse(parsedData);

//     const apiUrl = `/api/pickup`;
//     console.log("Sending request to:", apiUrl); // Debugging
//     // Simulate saving to DB or API
//     console.log("✅ Validated Data:", validatedData);

//     // Send data to the API endpoint
//     const response = await fetch(
//       `/api/pickup`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(validatedData),
//       }
//     );

//     const contentType = response.headers.get("content-type");
//     if (contentType && contentType.includes("text/html")) {
//       const text = await response.text();
//       console.error("Received HTML response:", text.slice(0, 500)); // Log first 500 chars
//       throw new Error("Server returned an HTML error page");
//     }

//     if (!response.ok) {
//       // Try to parse error as JSON, fallback to text
//       let errorMessage = `HTTP error! status: ${response.status}`;
//       try {
//         const errorData = await response.json();
//         errorMessage =
//           errorData.error || errorData.message || JSON.stringify(errorData);
//       } catch (e) {
//         const text = await response.text();
//         errorMessage = text || errorMessage;
//       }
//       throw new Error(errorMessage);
//     }

//     const pickup = await response.json();

//     return {
//       message: "Pickup scheduled successfully!",
//       pickupId: pickup.id, // Return the pickup ID for redirection
//     };
//     return { message: "Pickup scheduled successfully!" };
//   } catch (error) {
//     console.error("🚨 Server Action Error:", error);
//     return { message: "Failed to schedule pickup", error: "Invalid form data" };
//   }
// }


// // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // // app/actions/pickupAction.ts
// // // // import { z } from "zod";
// // // import { pickupFormSchema } from "../types/PickupPage";

// // // export async function pickupAction(
// // //   prevState: { message: string; error?: string },
// // //   formData: FormData
// // // ): Promise<{ message: string; error?: string; pickupId?: string }> {
// // //   try {
// // //     const jsonData = formData.get("jsonData") as string;
// // //     const parsedData = JSON.parse(jsonData);

// // //     // Convert scheduledDate string back to Date
// // //     if (parsedData.scheduledDate) {
// // //       parsedData.scheduledDate = new Date(parsedData.scheduledDate);
// // //     }

// // //     // Validate with Zod
// // //     const validatedData = pickupFormSchema.parse(parsedData);

// // //     // Send data to the API endpoint
// // //     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pickup`, {
// // //       method: "POST",
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //       },
// // //       body: JSON.stringify(validatedData),
// // //     });

// // //     if (!response.ok) {
// // //       const errorData = await response.json();
// // //       throw new Error(errorData.error || "Failed to create pickup");
// // //     }

// // //     const pickup = await response.json();
    
// // //     return { 
// // //       message: "Pickup scheduled successfully!",
// // //       pickupId: pickup.id // Return the pickup ID for redirection
// // //     };
// // //   } catch (error: any) {
// // //     console.error("🚨 Server Action Error:", error);
// // //     return { 
// // //       message: "Failed to schedule pickup", 
// // //       error: error.message || "Invalid form data" 
// // //     };
// // //   }
// // // }

// // import { z } from "zod";
// // import { pickupFormSchema } from "../types/PickupPage";

// // export async function pickupAction(
// //   prevState: { message: string; error?: string },
// //   formData: FormData
// // ): Promise<{ message: string; error?: string }> {
// //   try {
// //     const jsonData = formData.get("jsonData") as string;
// //     const parsedData = JSON.parse(jsonData);

// //     // Convert scheduledDate string back to Date
// //     if (parsedData.scheduledDate) {
// //       parsedData.scheduledDate = new Date(parsedData.scheduledDate);
// //     }

// //     // Validate with Zod
// //     const validatedData = pickupFormSchema.parse(parsedData);

// //     // Simulate saving to DB or API
// //     console.log("✅ Validated Data:", validatedData);

// //     return { message: "Pickup scheduled successfully!" };
// //   } catch (error) {
// //     console.error("🚨 Server Action Error:", error);
// //     return { message: "Failed to schedule pickup", error: "Invalid form data" };
// //   }
// // }


// // app/actions/pickupAction.ts
// import { z } from "zod";
// import { pickupFormSchema } from "../types/PickupPage";

// export async function pickupAction(
//   prevState: { message: string; error?: string },
//   formData: FormData
// ) {
//   try {
//     const jsonData = formData.get("jsonData") as string;
//     const parsedData = JSON.parse(jsonData);

//     // Convert scheduledDate string back to Date
//     if (parsedData.scheduledDate) {
//       parsedData.scheduledDate = new Date(parsedData.scheduledDate);
//     }

//     // Validate with Zod
//     const validatedData = pickupFormSchema.parse(parsedData);

//     // Use relative path - this is the key fix
//     const response = await fetch('/api/pickup', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(validatedData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || "Failed to create pickup");
//     }

//     const pickup = await response.json();
    
//     return { 
//       message: "Pickup scheduled successfully!",
//       pickupId: pickup.id
//     };
//   } catch (error: any) {
//     console.error("🚨 Server Action Error:", error);
//     return { 
//       message: "Failed to schedule pickup", 
//       error: error.message || "Invalid form data" 
//     };
//   }
// }


// import { z } from "zod";
// import { pickupFormSchema } from "../types/PickupPage";
import { pickupFormSchema } from "../utils/shipping-calculations";
export async function pickupAction(
  prevState: { message: string; error?: string },
  formData: FormData
): Promise<{ message: string; error?: string; pickupId?: string }> {
// ): Promise<{ message: string; error?: string; pickupId?: string, paymentUrl?: string }> {
  try {
    const jsonData = formData.get("jsonData") as string;
    const parsedData = JSON.parse(jsonData);

    // Convert scheduledDate string back to Date
    if (parsedData.scheduledDate) {
      parsedData.scheduledDate = new Date(parsedData.scheduledDate);
    }

    // Validate with Zod
    const validatedData = pickupFormSchema.parse(parsedData);

    const apiUrl = `/api/pickup`;
    console.log("Sending request to:", apiUrl); // Debugging
    // Simulate saving to DB or API
    console.log("✅ Validated Data:", validatedData);

    // Send data to the API endpoint
    const response = await fetch(
      `/api/pickup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      }
    );

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      const text = await response.text();
      console.error("Received HTML response:", text.slice(0, 500)); // Log first 500 chars
      throw new Error("Server returned an HTML error page");
    }

    if (!response.ok) {
      // Try to parse error as JSON, fallback to text
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage =
          errorData.error || errorData.message || JSON.stringify(errorData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        const text = await response.text();
        errorMessage = text || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const pickup = await response.json();
 const paymentResponse = await fetch('/api/pickup/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pickupId: pickup.id }),
    });

    if (!paymentResponse.ok) {
      throw new Error('Failed to create payment session');
    }

    // const paymentData = await paymentResponse.json();
    
    return {
      message: "Pickup scheduled successfully!",
      // paymentUrl: paymentData.url // Stripe checkout URL
      pickupId: pickup.id, // Return the pickup ID for redirection
    };
    // return {
    //   message: "Pickup scheduled successfully!",
    //   pickupId: pickup.id, // Return the pickup ID for redirection
    // };
  
    
  } catch (error) {
    console.error("🚨 Server Action Error:", error);
    return { message: "Failed to schedule pickup", error: "Invalid form data" };
  }
}
