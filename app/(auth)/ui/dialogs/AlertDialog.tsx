import React from "react";
import { CheckCircle2, AlertTriangle, CircleX, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	AlertDialog as RadixAlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogFooter,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";

type Disclosure = {
	isOpen?: boolean;
	onClose?: () => void;
	onOpenChange?: (open: boolean) => void;
};

type RenderFooterArgs = { closeModal: () => void };

type AlertTypes = "success" | "warning" | "error" | "info";

type AlertDialogProps = {
	alertType?: AlertTypes;
	title: React.ReactNode;
	description: React.ReactNode;
	discloser: Disclosure;
	renderFooter?: (_: RenderFooterArgs) => React.ReactNode;
	renderIcon?: () => React.ReactNode;
	// Additional props applied to the shadcn AlertDialogContent
	modalProps?: Partial<React.ComponentProps<typeof AlertDialogContent>>;
};

const iconMapping: Record<AlertTypes, React.JSX.Element> = {
	success: <CheckCircle2 size={70} className="text-green-500 mb-2" />,
	warning: <AlertTriangle size={70} className="text-yellow-500 mb-2" />,
	error: <CircleX size={70} className="text-red-500 mb-2" />,
	info: <Info size={70} className="text-primary mb-2" />,
};

function AlertDialog({
	alertType = "warning",
	discloser,
	title,
	description,
	renderFooter,
	renderIcon,
	modalProps,
}: AlertDialogProps) {
	const handleOpenChange = (open: boolean) => {
		// Mirror open state changes to the provided discloser
		discloser?.onOpenChange?.(open);
		if (!open) discloser?.onClose?.();
	};

	return (
		<RadixAlertDialog
			open={Boolean(discloser?.isOpen)}
			onOpenChange={handleOpenChange}
		>
			<AlertDialogContent
				{...modalProps}
				className={`max-w-[20rem] pb-2 overflow-hidden rounded-2xl ${
					modalProps?.className ?? ""
				}`}
			>
				<AlertDialogHeader className="flex flex-col justify-center items-center pt-1 pb-1 mt-4 px-8">
					{renderIcon?.() ?? iconMapping[alertType]}
					{typeof title === "string" ? (
						<AlertDialogTitle className="text-xl text-center">
							{title}
						</AlertDialogTitle>
					) : (
						<AlertDialogTitle className="text-xl text-center">
							{title}
						</AlertDialogTitle>
					)}
				</AlertDialogHeader>

				{typeof description === "string" ? (
					<AlertDialogDescription className="mb-2 px-6 text-sm text-center text-zinc-700 dark:text-zinc-400">
						{description}
					</AlertDialogDescription>
				) : (
					<div className="px-6">{description}</div>
				)}

				<Separator className="my-4" />
				<AlertDialogFooter className="px-6 py-1 pb-2">
					{renderFooter?.({ closeModal: () => discloser?.onClose?.() })}
				</AlertDialogFooter>
			</AlertDialogContent>
		</RadixAlertDialog>
	);
}

export function AlertDialogButton(props: React.ComponentProps<typeof Button>) {
	const { className, ...rest } = props;
	return <Button className={`${className ?? ""} w-full`} {...rest} />;
}

export default AlertDialog;
