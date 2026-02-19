"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

type AccordionItemProps = {
    id: string;
    title: string;
    children: ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    className?: string;
};

export function AccordionItem({
    id,
    title,
    children,
    isOpen,
    onToggle,
    className,
}: AccordionItemProps) {
    const shouldReduceMotion = useReducedMotion();
    const panelId = `panel-${id}`;

    return (
        <div className={cn("border-b border-line last:border-0", className)}>
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-expanded={isOpen}
                aria-controls={panelId}
            >
                <span className="text-lg font-bold leading-tight text-ink md:text-xl">{title}</span>
                <Magnetic strength={0.3}>
                    <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.5, ease: [0.87, 0, 0.13, 1] }}
                        className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center text-accent"
                    >
                        <Plus className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                </Magnetic>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={panelId}
                        initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={
                            shouldReduceMotion
                                ? { opacity: 1 }
                                : { height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }
                        }
                        exit={
                            shouldReduceMotion
                                ? { opacity: 0 }
                                : { height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
                        }
                        className="overflow-hidden"
                    >
                        <div className="pb-6 pr-12 text-muted leading-relaxed">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

type AccordionProps = {
    items: { id: string; title: string; content: ReactNode }[];
    className?: string;
};

export function Accordion({ items, className }: AccordionProps) {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <div className={cn("divide-y divide-line border-t border-line", className)}>
            {items.map((item) => (
                <AccordionItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    isOpen={openId === item.id}
                    onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                >
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    );
}
