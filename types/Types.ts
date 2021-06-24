export type DriverDto = {
  name: String
  subrole: String
  phoneNumber: String
  location: String
}

export type SupplierDto = {
  name: String
  emailAddress: String
  phoneNumber: String
  location: String
}

export type ProductDto = {
  productNumber: String
  productName: String
  quantityRequested: String
  comment: String
}

export type DisbursalDto = {
  customer: String
  jobTag: String
  mrn: String
  comment: String
  products: Array<ProductDto>
}