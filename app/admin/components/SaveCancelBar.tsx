"use client";

interface SaveCancelBarProps {
    isDirty: boolean;
    editedCount?: number;
    onSave: () => void;
    onCancel: () => void;
}

export default function SaveCancelBar({ isDirty, editedCount = 0, onSave, onCancel }: SaveCancelBarProps) {
    if (!isDirty) return null;

    return (
        <div className="flex gap-2">
            <button
                onClick={onCancel}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
                Cancel
            </button>
            <button
                onClick={onSave}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
            >
                Save {editedCount > 0 ? `(${editedCount})` : ""}
            </button>
        </div>
    );
}
