import db from "../../../lib/prisma";
import { Badge } from "../../../components/ui/badge";

export default async function UsersTable() {
    const users = await db.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    if (users.length === 0) {
        return <p className="text-muted-foreground">No users found.</p>;
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-border">
            <table className="min-w-full text-sm">
                <thead className="bg-muted">
                    <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Role</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Joined</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-t">
                            <td className="px-4 py-2">{user.name || "—"}</td>
                            <td className="px-4 py-2">{user.email || "—"}</td>
                            <td className="px-4 py-2">
                                <Badge variant={user.role === "ADMIN" ? "destructive" : "secondary"}>
                                    {user.role}
                                </Badge>
                            </td>
                            <td className="px-4 py-2">
                                {user.createdAt.toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
