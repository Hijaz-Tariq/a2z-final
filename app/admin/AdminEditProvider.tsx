//app/admin/AdminEditProvider.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import SaveCancelBar from "./components/SaveCancelBar";

interface UserEditData {
    role?: string;
    // Add other editable user fields here
}

// interface AdminEditContextType {
//   editedUsers: Record<string, UserEditData>;
//   setEditedUsers: React.Dispatch<React.SetStateAction<Record<string, UserEditData>>>;
//   isDirty: boolean;
//   saveAll: () => Promise<void>;
//   cancelAll: () => void;
// }

interface AdminEditContextType {
    editedUsers: Record<string, UserEditData>;
    setEditedUsers: React.Dispatch<React.SetStateAction<Record<string, UserEditData>>>;
    isDirty: boolean;
    saveAll: () => Promise<void>;
    cancelAll: () => void;
    refreshUsers?: () => void;  // optional callback
}


const AdminEditContext = createContext<AdminEditContextType | undefined>(undefined);

export function useAdminEdit() {
    const ctx = useContext(AdminEditContext);
    if (!ctx) throw new Error("useAdminEdit must be used within AdminEditProvider");
    return ctx;
}

export default function AdminEditProvider({
    children,
    refreshUsers,
}: {
    children: React.ReactNode;
    refreshUsers?: () => void;
}) {
    const [editedUsers, setEditedUsers] = useState<Record<string, UserEditData>>({});

    const isDirty = Object.keys(editedUsers).length > 0;

    async function saveAll() {
        // TODO: Add your batch save logic here.
        // For example, call your API to update all edited users at once.

        // After successful save:
        setEditedUsers({});
        if (refreshUsers) refreshUsers();
    }

    function cancelAll() {
        setEditedUsers({});
    }

    return (
        <AdminEditContext.Provider value={{ editedUsers, setEditedUsers, isDirty, saveAll, cancelAll, refreshUsers }}>
            {children}
             {isDirty && <SaveCancelBar isDirty={isDirty} onSave={saveAll} onCancel={cancelAll} />}
            {/* {isDirty && (
                <div className="sticky top-[64px] z-40 bg-white p-3 border-b flex justify-center shadow-sm">
                     <div className="space-x-2">
                    <button onClick={saveAll} className="btn btn-primary mr-2">
                        Save
                    </button>
                    <button onClick={cancelAll} className="btn btn-secondary">
                        Cancel
                    </button>
                    </div>
                </div>
            )} */}
        </AdminEditContext.Provider>
    );
}
