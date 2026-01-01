"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { useRender } from "@base-ui/react/use-render"
import { mergeProps } from "@base-ui/react/merge-props"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({ 
  asChild,
  children,
  ...props 
}: TooltipPrimitive.Trigger.Props & { asChild?: boolean }) {
  // Filtrer asChild des props avant de les passer au composant primitif
  const { asChild: _, ...restProps } = props as typeof props & { asChild?: boolean }
  
  // Si asChild est vrai, utiliser TooltipPrimitive.Trigger comme render dans useRender
  // pour fusionner les props avec l'enfant sans créer de wrapper button
  if (asChild && React.isValidElement(children)) {
    const comp = useRender({
      defaultTagName: "button",
      props: mergeProps<"button">(
        {
          "data-slot": "tooltip-trigger",
        },
        restProps
      ),
      render: children as React.ReactElement,
      state: {
        slot: "tooltip-trigger",
      },
    })

    // Utiliser TooltipPrimitive.Trigger comme render dans useRender pour éviter le double button
    const triggerComp = useRender({
      defaultTagName: "button",
      props: {
        "data-slot": "tooltip-trigger-wrapper",
      },
      render: comp,
      state: {
        slot: "tooltip-trigger-wrapper",
      },
    })

    // Envelopper dans TooltipPrimitive.Trigger mais en utilisant le composant déjà rendu
    // pour éviter de créer un button supplémentaire
    return (
      <TooltipPrimitive.Trigger 
        data-slot="tooltip-trigger-wrapper"
        {...restProps}
      >
        {triggerComp}
      </TooltipPrimitive.Trigger>
    )
  }
  
  return (
    <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...restProps}>
      {children}
    </TooltipPrimitive.Trigger>
  )
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 rounded-md px-3 py-1.5 text-xs bg-foreground text-background z-50 w-fit max-w-xs origin-(--transform-origin)",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground z-50 data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
