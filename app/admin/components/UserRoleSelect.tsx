//app/admin/components/UserRoleSelect.tsx
import { Role } from "@prisma/client";
import { useState, useTransition } from "react";

interface UserRoleSelectProps {
    userId: string;
    currentRole: Role | string; // can be Role enum or string
}

const roles = Object.values(Role);

export default function UserRoleSelect({ userId, currentRole }: UserRoleSelectProps) {
    const [role, setRole] = useState(currentRole);
    const [isPending, startTransition] = useTransition();

    async function onRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newRole = e.target.value as Role;
        setRole(newRole);

        startTransition(async () => {
            const res = await fetch("/api/admin/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, role: newRole }),
            });
            if (!res.ok) {
                alert("Failed to update role");
                setRole(currentRole); // revert on failure
            }
        });
    }

    return (
        <select value={role} onChange={onRoleChange} disabled={isPending} className="p-1 rounded border">
            {roles.map((r) => (
                <option key={r} value={r}>
                    {r}
                </option>
            ))}
        </select>
    );
}
