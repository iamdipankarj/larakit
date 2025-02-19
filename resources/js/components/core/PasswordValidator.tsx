import { Check, X } from 'lucide-react'
import type React from 'react'
import { useEffect, useMemo } from 'react'

interface CustomIconComponents {
    ValidIcon: React.ReactNode
    InvalidIcon: React.ReactNode
}
interface PasswordProps {
    value: string
    valueAgain?: string
    minLength?: number
    maxLength?: number
    iconSize?: number
    validColor?: string
    invalidColor?: string
    validTextColor?: string
    invalidTextColor?: string
    onChange?: (isValid: boolean, failedRules: RuleNames[]) => any
    messages?: {
        [key in RuleNames]?: string
    }
    iconComponents?: CustomIconComponents
}
export type RuleNames =
    | 'minLength'
    | 'maxLength'
    | 'specialChar'
    | 'number'
    | 'capital'
    | 'match'
    | 'lowercase'
    | 'letter'
    | 'notEmpty'
    | 'capitalAndLowercase'
    | 'noSpaces'

export interface PasswordValidatorProps extends PasswordProps {
    className?: string
    style?: React.CSSProperties
    rules: Array<RuleNames>
    rtl?: boolean
    hideIcon?: boolean
    specialCharsRegex?: RegExp
    itemClassName?: string
}

const valueHasCapitalCharacters = (value: string) => {
    let i = 0
    if (value.length === 0) {
        return false
    }
    while (i < value.length) {
        const character = value.charAt(i)
        if (character === character.toLowerCase()) {
            // Character is lowercase, numeric, or a symbol
        } else if (character === character.toUpperCase()) {
            return true
        }
        i++
    }
    return false
}
const valueHasLowercaseCharacters = (value: string) => {
    let i = 0
    if (value.length === 0) {
        return false
    }
    while (i < value.length) {
        const character = value.charAt(i)
        if (character === character.toUpperCase()) {
            // Character is lowercase, numeric, or a symbol
        } else if (character === character.toLowerCase()) {
            return true
        }
        i++
    }
    return false
}

export const PasswordValidator: React.FC<PasswordValidatorProps> = ({
    className,
    style,
    rules,
    value,
    valueAgain,
    minLength,
    maxLength,
    rtl,
    onChange,
    specialCharsRegex = /[~`¿¡!#$%\^&*€£@+÷=\-\[\]\\';,/{}\(\)|\\":<>\?\.\_]/g,
    messages = {},
    ...remainingProps
}) => {
    const ruleDefinitions: {
        [key in RuleNames]: { valid: boolean; message: string }
    } = {
        minLength: {
            valid: value.length >= (minLength || 100),
            message:
                messages.minLength ||
                `Password has at least ${minLength} characters.`
        },
        specialChar: {
            valid: specialCharsRegex.test(value),
            message: messages.specialChar || 'Password has special characters.'
        },
        number: {
            valid: /\d/g.test(value),
            message: messages.number || 'Password has a number.'
        },
        match: {
            valid: value.length > 0 && value === valueAgain,
            message: messages.match || 'Passwords match.'
        },
        capital: {
            valid: valueHasCapitalCharacters(value),
            message: messages.capital || 'Password has a capital letter.'
        },
        lowercase: {
            valid: valueHasLowercaseCharacters(value),
            message: messages.lowercase || 'Password has a lowercase letter.'
        },
        capitalAndLowercase: {
            valid:
                valueHasCapitalCharacters(value) &&
                valueHasLowercaseCharacters(value),
            message:
                messages.capitalAndLowercase ||
                'Password contains at least one uppercase and lowercase characters.'
        },
        letter: {
            valid: /[a-zA-Z]/g.test(value),
            message: messages.letter || 'Password has a letter.'
        },
        maxLength: {
            valid: value.length <= (maxLength || 16),
            message:
                messages.maxLength ||
                `Password has no more than ${maxLength} characters.`
        },
        notEmpty: {
            valid: Boolean(
                value.length > 0 && valueAgain && valueAgain.length > 0
            ),
            message: messages.notEmpty || 'Password fields are not empty.'
        },
        noSpaces: {
            valid: Boolean(value.length > 0 && !/\s/.test(value)),
            message: messages.noSpaces || 'Password contains no spaces.'
        }
    }
    const enabledRules: RuleNames[] = useMemo(
        () => rules.filter((rule) => Boolean(ruleDefinitions[rule])),
        [rules]
    )
    const isValid: boolean = enabledRules.every(
        (rule) => ruleDefinitions[rule].valid
    )
    const failedRules: RuleNames[] = useMemo(
        () => enabledRules.filter((rule) => !ruleDefinitions[rule].valid),
        [value, valueAgain, enabledRules]
    )

    useEffect(() => {
        if (typeof onChange === 'function') {
            onChange(isValid, failedRules)
        }
    }, [isValid, failedRules])

    if (rtl) {
        className = className ? className + ' rtl' : 'rtl'
    }

    return (
        <ul className={className}>
            {enabledRules.map((rule) => {
                const { message, valid } = ruleDefinitions[rule]
                return (
                    <Rule
                        key={rule}
                        valid={valid}
                        iconSize={18}
                        validColor="#4BCA81"
                        invalidColor="#FF0033"
                        {...remainingProps}
                    >
                        {message}
                    </Rule>
                )
            })}
        </ul>
    )
}

interface RuleProps extends React.LiHTMLAttributes<HTMLLIElement> {
    valid: boolean
    validTextColor?: string
    invalidTextColor?: string
    children?: React.ReactNode
}
const Rule: React.FC<RuleProps> = ({
    valid,
    validTextColor,
    invalidTextColor,
    children
}) => {
    return (
        <li className="list-none flex items-center my-1 gap-1 text-sm">
            {valid ? (
                <Check className="w-5 h-5 text-primary" />
            ) : (
                <X className="w-5 h-5 text-destructive" />
            )}
            <span
                className="flex-1"
                style={{
                    opacity: valid ? 1 : !invalidTextColor ? 0.5 : undefined,
                    color: valid ? validTextColor : invalidTextColor
                }}
            >
                {children}
            </span>
        </li>
    )
}
