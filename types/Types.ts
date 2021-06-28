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

export type ProductDetail = {
  division: String
  supplier: String
  description: String
  model: String
  type: String
  specialization: String
  asnlNumber: String
  partNo: String
  serialNo: String
  reorderLevel: String
  unitCost: String
  totalCost: String
  quantity: String
  location: String
  referrer: String
}

export type CustomerDto = {
  name: String
  CAC: String
  TIN: String
  address: String
  contactPerson: String
  customerType: String
  cylinderHoldingTime: string
  email: String
  nickName: String
  phoneNumber: Number
  rcNumber: String
  territory: String
  unitPrice: String
  products: any
  modeOfService: String
}
