
export type AttributeList = Array<AttributeDetails> | []

export interface AttributeDetails {
    attributeId: number,
    attributeName: string,
    attributeIconUpload: null,
    attributeIcon: string,
    isActive: boolean
}

export interface deleteAttributeAction {
    statusCode: number,
    statusMessage: string
}