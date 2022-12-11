export interface BranchModel {
    id: number,
    county: string
    city: string
    name: string
    address: string
    operations: string
    latitude: number
    longitude: number
    distance: number,
    hours?: string,
    phoneNumber: string
    phoneHours: string
}