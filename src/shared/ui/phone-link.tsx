import { PhoneIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface PhoneLinkProps {
  phone: { tel: string; display: string };
  className?: string;
  iconClassName?: string;
}

export function PhoneLink({ phone, className, iconClassName }: PhoneLinkProps) {
  return (
    <a
      href={`tel:${phone.tel}`}
      className={cn("flex items-center gap-1.5 tabular-nums transition-colors hover:text-safety", className)}
    >
      <PhoneIcon className={cn("size-3.5 shrink-0", iconClassName)} />
      {phone.display}
    </a>
  );
}
