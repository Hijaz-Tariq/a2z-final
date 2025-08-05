// import { createContext, ReactNode, useContext } from "react";
// import {
//   useQuery,
//   useMutation,
//   UseMutationResult,
// } from "@tanstack/react-query";
// import { z } from "zod";
// import { apiRequest, queryClient } from "../lib/queryClient";
// import { useToast } from "@/hooks/use-toast";

// // Define the user type
// type User = {
//   id: string;
//   email: string;
//   role: string;
//   createdAt: string;
//   updatedAt: string;
// };

// type LoginCredentials = {
//   email: string;
//   password: string;
// };

// type RegisterCredentials = LoginCredentials & {
//   role?: string;
//   companyName?: string;
//   licenseNumber?: string;
//   phone?: string;
//   services?: string[];
// };

// type AuthContextType = {
//   user: User | null;
//   isLoading: boolean;
//   error: Error | null;
//   loginMutation: UseMutationResult<User, Error, LoginCredentials>;
//   logoutMutation: UseMutationResult<void, Error, void>;
//   registerMutation: UseMutationResult<User, Error, RegisterCredentials>;
// };

// export const AuthContext = createContext<AuthContextType | null>(null);

// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// const registerSchema = loginSchema.extend({
//   role: z.enum(["CUSTOMER", "AGENT", "BROKER"]).optional(),
//   companyName: z.string().optional(),
//   licenseNumber: z.string().optional(),
//   phone: z.string().optional(),
//   services: z.array(z.string()).optional(),
// });

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const { toast } = useToast();
  
//   const {
//     data: user,
//     error,
//     isLoading,
//   } = useQuery<User | null, Error>({
//     queryKey: ["/api/user"],
//     queryFn: async ({ queryKey }) => {
//       try {
//         const res = await fetch(queryKey[0] as string, {
//           credentials: "include",
//         });
        
//         if (res.status === 401) {
//           return null;
//         }
        
//         if (!res.ok) {
//           throw new Error(`${res.status}: ${res.statusText}`);
//         }
        
//         return await res.json();
//       } catch (err) {
//         // If it's a 401, we just return null instead of throwing
//         if (err instanceof Error && err.message.includes("401")) {
//           return null;
//         }
//         throw err;
//       }
//     },
//   });

//   const loginMutation = useMutation({
//     mutationFn: async (credentials: LoginCredentials) => {
//       try {
//         // Validate credentials
//         loginSchema.parse(credentials);
        
//         const res = await apiRequest("POST", "/api/login", credentials);
//         return await res.json();
//       } catch (err) {
//         if (err instanceof z.ZodError) {
//           throw new Error(err.errors[0].message);
//         }
//         throw err;
//       }
//     },
//     onSuccess: (userData: User) => {
//       queryClient.setQueryData(["/api/user"], userData);
//       toast({
//         title: "Login successful",
//         description: `Welcome back, ${userData.email}!`,
//       });
//     },
//     onError: (error: Error) => {
//       toast({
//         title: "Login failed",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   });

//   const registerMutation = useMutation({
//     mutationFn: async (credentials: RegisterCredentials) => {
//       try {
//         // Validate credentials
//         registerSchema.parse(credentials);
        
//         const res = await apiRequest("POST", "/api/register", credentials);
//         return await res.json();
//       } catch (err) {
//         if (err instanceof z.ZodError) {
//           throw new Error(err.errors[0].message);
//         }
//         throw err;
//       }
//     },
//     onSuccess: (userData: User) => {
//       queryClient.setQueryData(["/api/user"], userData);
//       toast({
//         title: "Registration successful",
//         description: "Your account has been created.",
//       });
//     },
//     onError: (error: Error) => {
//       toast({
//         title: "Registration failed",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   });

//   const logoutMutation = useMutation({
//     mutationFn: async () => {
//       await apiRequest("POST", "/api/logout");
//     },
//     onSuccess: () => {
//       queryClient.setQueryData(["/api/user"], null);
//       toast({
//         title: "Logged out",
//         description: "You have been successfully logged out.",
//       });
//     },
//     onError: (error: Error) => {
//       toast({
//         title: "Logout failed",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   });

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isLoading,
//         error,
//         loginMutation,
//         logoutMutation,
//         registerMutation,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
