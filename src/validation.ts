export type ValidationError = {
    field: string
    message: string
}


const resolutions = ["P144","P240","P360","P480","P720","P1080","P1440","P2160"]

export const validateCreateVideo = (data: any): ValidationError[] => {
    const errors: ValidationError[] = []

    // title
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0 || data.title.trim().length > 40) {
        errors.push({ field: 'title', message: 'Title is required and max 40 chars' })
    }

    // author
    if (!data.author || typeof data.author !== 'string' || data.author.trim().length === 0 || data.author.trim().length > 20) {
        errors.push({ field: 'author', message: 'Author is required and max 20 chars' })
    }

    // availableResolutions
    if (!Array.isArray(data.availableResolutions) || data.availableResolutions.length === 0) {
        errors.push({ field: 'availableResolutions', message: 'At least one resolution required' })
    } else {
        data.availableResolutions.forEach((r: any, idx: number) => {
            if (typeof r !== 'string' || !resolutions.includes(r)) {
                errors.push({ field: 'availableResolutions', message: `Invalid resolution at position ${idx}` })
            }
        })
    }

    return errors
}

export const validateUpdateVideo = (data: any): ValidationError[] => {
    const errors: ValidationError[] = []

    // reuse some create validations
    errors.push(...validateCreateVideo(data))

    // canBeDownloaded
    if (typeof data.canBeDownloaded !== 'boolean') {
        errors.push({ field: 'canBeDownloaded', message: 'canBeDownloaded must be boolean' })
    }

    // minAgeRestriction
    if (data.minAgeRestriction !== null && (typeof data.minAgeRestriction !== 'number' || data.minAgeRestriction < 1 || data.minAgeRestriction > 18)) {
        errors.push({ field: 'minAgeRestriction', message: 'minAgeRestriction must be 1-18 or null' })
    }

    // publicationDate ISO
    if (!data.publicationDate || typeof data.publicationDate !== 'string' || new Date(data.publicationDate).toISOString() !== data.publicationDate) {
        errors.push({ field: 'publicationDate', message: 'publicationDate must be valid ISO string' })
    }

    return errors
}