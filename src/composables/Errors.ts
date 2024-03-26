interface fieldError {
    [name: string]: string[]
}

interface validationResponse {
    globalErrors: string[]
    fieldErrors: fieldError
}

export interface ErrorResponse {
    message: string
    validationMessages: validationResponse | null
}

export class Error {
    error: ErrorResponse | null
    messages: string[]

    constructor(error: ErrorResponse | null = null) {
        this.messages = []
        this.error = error
    }

    hasErrors(): boolean {
        if (this.messages.length > 0) return true
        return this.error !== null
    }

    hasValidationError(): boolean {
        if (this.error === null) return false
        if (!this.error.validationMessages) return false
        if (this.error.validationMessages.globalErrors.length > 0) return true
        return Object.keys(this.error.validationMessages.fieldErrors).length > 0
    }

    addMessage(message: string) {
        this.messages.push(message)
    }

    errors(): string[] {
        const errorMessages = this.messages.concat(this.validationResults())
        if (errorMessages.length > 0) return errorMessages

        if (this.error === null) return []
        return [this.error.message]
    }

    validationResults(): string[] {
        if (this.error === null) return []
        if (!this.error.validationMessages) return []

        const globalErrors = this.error.validationMessages.globalErrors
        const fieldErrors: fieldError = this.error.validationMessages.fieldErrors

        let errorMessages = globalErrors

        const keys = Object.keys(fieldErrors)
        keys.forEach((key) => {
            errorMessages = errorMessages.concat(fieldErrors[key as string[]])
        })
        return errorMessages
    }

    hasFieldErrors(fields: string[]): boolean {
        if (this.error === null) return false
        if (!this.error.validationMessages) return false
        const fieldErrors = this.error.validationMessages.fieldErrors
        const keys = Object.keys(fieldErrors)
        const errors = keys.filter((key) => {
            return fields.includes(key)
        })
        return errors.length > 0
    }
}