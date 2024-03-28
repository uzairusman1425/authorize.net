import { NextResponse } from "next/server"
const ApiContracts = require("authorizenet").APIContracts
const ApiControllers = require("authorizenet").APIControllers

export async function POST(req) {
	let error = ""
	let errorText = ""
	try {
		// Extract data from the request body
		const {
			firstname,
			lastname,
			cardnumber,
			expiry,
			invoiceno,
			amount,
			address,
			description,
			city,
			state,
			zipcode,
			country,
			cardcode
		} = await req.json()

		console.log(
			process.env.NEXT_PUBLIC_API_LOGIN_ID,
			process.env.NEXT_PUBLIC_TRANSACTION_KEY
		)

		// Construct transaction request
		const merchantAuthenticationType =
			new ApiContracts.MerchantAuthenticationType()
		merchantAuthenticationType.setName(process.env.NEXT_PUBLIC_API_LOGIN_ID)
		merchantAuthenticationType.setTransactionKey(
			process.env.NEXT_PUBLIC_TRANSACTION_KEY
		)

		const creditCard = new ApiContracts.CreditCardType()
		creditCard.setCardNumber(cardnumber)
		creditCard.setExpirationDate(expiry)
		creditCard.setCardCode(cardcode)

		const paymentType = new ApiContracts.PaymentType()
		paymentType.setCreditCard(creditCard)

		const orderDetails = new ApiContracts.OrderType()
		orderDetails.setInvoiceNumber(invoiceno)
		orderDetails.setDescription(description)

		const tax = new ApiContracts.ExtendedAmountType()
		tax.setAmount("0")
		tax.setName("NA")
		tax.setDescription(description)

		const duty = new ApiContracts.ExtendedAmountType()
		duty.setAmount("0")
		duty.setName("NA")
		duty.setDescription(description)

		const shipping = new ApiContracts.ExtendedAmountType()
		shipping.setAmount("0")
		shipping.setName("NA")
		shipping.setDescription(description)

		const billTo = new ApiContracts.CustomerAddressType()
		billTo.setFirstName(firstname)
		billTo.setLastName(lastname)
		billTo.setCompany("Brainiacs Lab")
		billTo.setAddress(address)
		billTo.setCity(city)
		billTo.setState(state)
		billTo.setZip(zipcode)
		billTo.setCountry(country)

		const shipTo = new ApiContracts.CustomerAddressType()
		shipTo.setFirstName(firstname)
		shipTo.setLastName(lastname)
		shipTo.setCompany("Brainiacs Lab")
		shipTo.setAddress(address)
		shipTo.setCity(city)
		shipTo.setState(state)
		shipTo.setZip(zipcode)
		shipTo.setCountry(country)

		// Construct the transaction request
		const transactionRequestType = new ApiContracts.TransactionRequestType()
		transactionRequestType.setTransactionType(
			ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
		)
		transactionRequestType.setPayment(paymentType)
		transactionRequestType.setAmount(amount)
		transactionRequestType.setOrder(orderDetails)
		transactionRequestType.setTax(tax)
		transactionRequestType.setDuty(duty)
		transactionRequestType.setShipping(shipping)
		transactionRequestType.setBillTo(billTo)
		transactionRequestType.setShipTo(shipTo)

		const createRequest = new ApiContracts.CreateTransactionRequest()
		createRequest.setMerchantAuthentication(merchantAuthenticationType)
		createRequest.setTransactionRequest(transactionRequestType)

		// Create a promise to handle the Authorize.Net request
		const authorizeNetPromise = new Promise((resolve, reject) => {
			const ctrl = new ApiControllers.CreateTransactionController(
				createRequest.getJSON()
			)
			ctrl.execute(() => {
				const apiResponse = ctrl.getResponse()
				const response = new ApiContracts.CreateTransactionResponse(
					apiResponse
				)
				const message = response
					?.getTransactionResponse()
					?.getMessages()?.message[0]
				const messageText = message?.description
				console.log(response.messages.message[0])

				error = response?.getTransactionResponse()?.getErrors()
					?.error[0]
				errorText = error?.errorText
				console.log(error)

				// Handle the response from Authorize.Net
				if (
					response != null &&
					response.getMessages().getResultCode() ==
						ApiContracts.MessageTypeEnum.OK
				) {
					if (
						response.getTransactionResponse().getMessages() != null
					) {
						// Successful transaction
						resolve(
							NextResponse.json({
								message: messageText,
								status: 200
							})
						)
					} else {
						// Failed transaction
						if (
							response.getTransactionResponse().getErrors() !=
							null
						) {
							reject(
								NextResponse.json({
									message: errorText,
									status: 504
								})
							)
						} else {
							reject(
								NextResponse.json({
									message: errorText,
									status: 508
								})
							)
						}
					}
				} else {
					// Failed transaction
					if (
						response != null &&
						response.getTransactionResponse() != null &&
						response.getTransactionResponse().getErrors() != null
					) {
						reject(
							NextResponse.json({
								message: errorText,
								status: 505
							})
						)
					} else {
						reject(
							NextResponse.json({
								message: errorText,
								status: 506
							})
						)
					}
				}
			})
		})

		// Wait for the promise to resolve or reject
		const result = await authorizeNetPromise
		return result
	} catch (error) {
		// Handle errors
		return NextResponse.json({
			message: errorText,
			status: 504
		})
	}
}
