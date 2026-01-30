"use client"

import type { ReactNode, HTMLAttributes } from "react"
import { createContext, useContext, useState, useRef, useCallback, forwardRef } from "react"
import { cn } from "@/lib/utils"

// Context
type InputOTPContextType = {
  value: string
  maxLength: number
  disabled: boolean
  activeIndex: number
  isFocused: boolean
  focusInput: () => void
  placeholder?: string
}

const InputOTPContext = createContext<InputOTPContextType | undefined>(undefined)

function useInputOTP() {
  const context = useContext(InputOTPContext)
  if (!context) {
    throw new Error("InputOTP components must be used within an InputOTP")
  }
  return context
}

// Root
type InputOTPProps = {
  children: ReactNode
  maxLength: number
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  disabled?: boolean
  pattern?: string
  placeholder?: string
  className?: string
  name?: string
  autoFocus?: boolean
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange">

const InputOTP = forwardRef<HTMLInputElement, InputOTPProps>(
  (
    {
      children,
      maxLength,
      value: controlledValue,
      defaultValue = "",
      onChange,
      onComplete,
      disabled = false,
      pattern = "[0-9]",
      placeholder,
      className,
      name,
      autoFocus = false,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
        }
      },
      [ref]
    )

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const patternRegex = new RegExp(`^${pattern}$`)

    const activeIndex = value.length < maxLength ? value.length : maxLength - 1

    const focusInput = useCallback(() => {
      if (!disabled) {
        inputRef.current?.focus()
      }
    }, [disabled])

    const handleChange = useCallback(
      (newValue: string) => {
        const filtered = newValue
          .split("")
          .filter((char) => patternRegex.test(char))
          .join("")
          .slice(0, maxLength)

        if (!isControlled) {
          setInternalValue(filtered)
        }
        onChange?.(filtered)

        if (filtered.length === maxLength) {
          onComplete?.(filtered)
        }
      },
      [isControlled, maxLength, onChange, onComplete, patternRegex]
    )

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e.target.value)
      },
      [handleChange]
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
          e.key === "Backspace" ||
          e.key === "Delete" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === "Tab" ||
          e.ctrlKey ||
          e.metaKey
        ) {
          return
        }

        if (!patternRegex.test(e.key)) {
          e.preventDefault()
        }
      },
      [patternRegex]
    )

    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData("text")
        handleChange(pasted)
      },
      [handleChange]
    )

    const handleFocus = useCallback(() => {
      setIsFocused(true)
    }, [])

    const handleBlur = useCallback(() => {
      setIsFocused(false)
    }, [])

    return (
      <InputOTPContext.Provider
        value={{
          value,
          maxLength,
          disabled,
          activeIndex,
          isFocused,
          focusInput,
          placeholder,
        }}
      >
        <div
          className={cn("flex items-center gap-2", disabled && "opacity-50 cursor-not-allowed", className)}
          onClick={focusInput}
          data-disabled={disabled ? "" : undefined}
          {...props}
        >
          {children}
          <input
            ref={setRefs}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            name={name}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            maxLength={maxLength}
            autoFocus={autoFocus}
            className="sr-only"
            aria-label={`OTP input, ${maxLength} digits`}
            tabIndex={0}
          />
        </div>
      </InputOTPContext.Provider>
    )
  }
)
InputOTP.displayName = "InputOTP"

// Group
type InputOTPGroupProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

function InputOTPGroup({ children, className, ...props }: InputOTPGroupProps) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      {children}
    </div>
  )
}

// Slot
type InputOTPSlotProps = {
  index: number
  className?: string
} & HTMLAttributes<HTMLDivElement>

function InputOTPSlot({ index, className, ...props }: InputOTPSlotProps) {
  const { value, activeIndex, isFocused, disabled, focusInput, placeholder } = useInputOTP()

  const char = value[index] ?? ""
  const isActive = isFocused && index === activeIndex
  const isFilled = char !== ""

  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm font-medium transition-all",
        "first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring",
        disabled && "cursor-not-allowed",
        className
      )}
      data-active={isActive ? "" : undefined}
      data-filled={isFilled ? "" : undefined}
      onClick={focusInput}
      {...props}
    >
      {isFilled ? (
        char
      ) : placeholder ? (
        <span className="text-muted-foreground">{placeholder}</span>
      ) : null}
      {isActive && !isFilled && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="h-4 w-px animate-caret-blink bg-foreground" />
        </span>
      )}
    </div>
  )
}

// Separator
type InputOTPSeparatorProps = {
  children?: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

function InputOTPSeparator({ children, className, ...props }: InputOTPSeparatorProps) {
  return (
    <div
      role="separator"
      className={cn("flex items-center justify-center px-1 text-muted-foreground", className)}
      {...props}
    >
      {children ?? (
        <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
          <rect width="8" height="2" rx="1" fill="currentColor" />
        </svg>
      )}
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
