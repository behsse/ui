"use client"

import { useState, useId, forwardRef } from "react"
import { cn } from "@/lib/utils"
import Check from "@/ui/icons/Check"

interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  id?: string
  name?: string
  value?: string
  className?: string
  label?: string
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      id: providedId,
      name,
      value,
      className,
      label,
    },
    ref
  ) => {
    const generatedId = useId()
    const id = providedId ?? generatedId

    // Internal state for uncontrolled mode
    const [internalChecked, setInternalChecked] = useState(defaultChecked)

    // Determine if controlled or uncontrolled
    const isControlled = controlledChecked !== undefined
    const isChecked = isControlled ? controlledChecked : internalChecked

    const handleClick = () => {
      if (disabled) return

      const newChecked = !isChecked

      // Update internal state (for uncontrolled mode)
      if (!isControlled) {
        setInternalChecked(newChecked)
      }

      // Call onCheckedChange callback if provided
      onCheckedChange?.(newChecked)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        handleClick()
      }
    }

    return (
      <div className={cn("flex items-center gap-2", className)}>
        <button
          ref={ref}
          type="button"
          role="checkbox"
          aria-checked={isChecked}
          aria-disabled={disabled}
          id={id}
          data-state={isChecked ? "checked" : "unchecked"}
          data-disabled={disabled ? "" : undefined}
          disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-[3px] border border-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "transition-colors",
            isChecked && "bg-primary text-primary-foreground",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {isChecked && (
            <Check className="h-3.5 w-3.5 text-primary-foreground" />
          )}
        </button>
        {/* Hidden input for form submission */}
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={() => {}}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-sm font-medium leading-none cursor-pointer",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            )}
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
