// import { useFormContext } from 'react-hook-form';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { PickupFormData } from '@/types/PickupPage';

// interface Props {
//   pkgIndex: number;
// }

// export const PDetailsInput = ({ pkgIndex }: Props) => {
//   const { register } = useFormContext<PickupFormData>();

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//       <div>
//         <Label>Length (cm)</Label>
//         <Input type="number" step="any" {...register(`packages.${pkgIndex}.dimensions.length`)} />
//       </div>
//       <div>
//         <Label>Width (cm)</Label>
//         <Input type="number" step="any" {...register(`packages.${pkgIndex}.dimensions.width`)} />
//       </div>
//       <div>
//         <Label>Height (cm)</Label>
//         <Input type="number" step="any" {...register(`packages.${pkgIndex}.dimensions.height`)} />
//       </div>
//       <div>
//         <Label>Weight (kg)</Label>
//         <Input type="number" step="any" {...register(`packages.${pkgIndex}.weight`)} />
//       </div>
//       <div className="col-span-full">
//         <Label>Special Notes</Label>
//         <Input {...register(`packages.${pkgIndex}.specialNotes`)} />
//       </div>
//     </div>
//   );
// };


//*******************************11/6 */

'use client';
import { useState } from 'react';
import { Control } from 'react-hook-form';
import { PickupFormData } from '../types/PickupPage';
import { convertToMetric, convertFromMetric } from '../utils/unit-conversions';
import { FormField, FormControl, FormItem, FormLabel } from '../components/ui/form';
import { Input } from '../components/ui/input';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../components/ui/tooltip";
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';

interface PackageDetailsInputProps {
    control: Control<PickupFormData>;
    pkgIndex: number;
    disabled?: boolean;
    unitSystem: 'metric' | 'imperial';
}

export const PackageDetailsInput = ({
    control,
    pkgIndex,
    disabled,
    unitSystem
}: PackageDetailsInputProps) => {
    const [mobileTooltipOpen, setMobileTooltipOpen] = useState(false);

    // Detect touch devices
    const isTouchDevice = () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    return (
        <div className="space-y-4">
            {/* Weight Input (unchanged) */}
            <FormField
                control={control}
                name={`packages.${pkgIndex}.weight`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Weight ({unitSystem === 'metric' ? 'kg' : 'lb'})</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                min="0.1"
                                step="0.1"
                                value={unitSystem === 'imperial'
                                    ? convertFromMetric.weight(field.value ?? 0).toFixed(1)
                                    : (field.value ?? 0.1).toString()}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value) || 0;
                                    field.onChange(
                                        unitSystem === 'imperial'
                                            ? convertToMetric.weight(value)
                                            : value
                                    );
                                }}
                                disabled={disabled}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            {/* Dimensions */}
            <div className="space-y-2">
                <div className="flex items-center gap-1 mb-2">
                    <FormLabel>Dimensions ({unitSystem === 'metric' ? 'cm' : 'in'})</FormLabel>

                    {isTouchDevice() ? (
                        // Mobile-friendly dialog for touch devices
                        <Dialog.Root open={mobileTooltipOpen} onOpenChange={setMobileTooltipOpen}>
                            <Dialog.Trigger asChild>
                                <button
                                    type="button"
                                    className="text-xs bg-gray-100/70 hover:bg-gray-200 active:bg-gray-300 rounded-full p-0.5"
                                    aria-label="Package dimensions help"
                                >
                                    ?
                                </button>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
                                <Dialog.DialogTitle></Dialog.DialogTitle>
                                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-[90vw] w-[300px] z-50">
                                    <div className="flex flex-col items-center">
                                        <Image
                                            src="/package.ico"
                                            alt="Package dimensions example"
                                            width={96}
                                            height={96}
                                            className="w-24 h-24 mb-4"
                                            loading="lazy"
                                        />
                                        <p className="text-sm text-center mb-4">
                                            Enter the dimensions of your package in {unitSystem === 'metric' ? 'centimeters' : 'inches'}.
                                            Length × Width × Height
                                        </p>
                                        <Dialog.Close asChild>
                                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                                                Got it
                                            </button>
                                        </Dialog.Close>
                                    </div>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                    ) : (
                        // Regular tooltip for non-touch devices
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        className="rounded-full w-6 h-6 flex items-center justify-center text-xs bg-gray-100 hover:bg-gray-200 transition-colors"
                                        aria-label="Package dimensions help"
                                    >
                                        ?
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent
                                    className="max-w-[300px] p-4 bg-accent/90"
                                    sideOffset={5}
                                >
                                    <div className="flex flex-col items-center">
                                        <Image
                                            src="/package.ico"
                                            alt="Package dimensions example"
                                            width={96}
                                            height={96}
                                            className="w-16 h-16 md:w-24 md:h-24 mb-2"
                                            loading="lazy"
                                        />
                                        <p className="text-sm text-center">
                                            Enter the dimensions of your package in {unitSystem === 'metric' ? 'centimeters' : 'inches'}.
                                            Length × Width × Height
                                        </p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {(['length', 'width', 'height'] as const).map((dim) => (
                        <FormField
                            key={dim}
                            control={control}
                            name={`packages.${pkgIndex}.dimensions.${dim}`}
                            render={({ field }) => (
                                <FormControl>
                                    <Input
                                        placeholder={dim.charAt(0).toUpperCase()}
                                        type="number"
                                        min="1"
                                        value={
                                            unitSystem === 'imperial'
                                                ? convertFromMetric.length(field.value ?? 0).toFixed(1)
                                                : (field.value ?? 1).toString()
                                        }
                                        onChange={(e) => {
                                            const value = parseFloat(e.target.value) || 0;
                                            field.onChange(
                                                unitSystem === 'imperial'
                                                    ? convertToMetric.length(value)
                                                    : value
                                            );
                                        }}
                                        disabled={disabled}
                                    />
                                </FormControl>
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};