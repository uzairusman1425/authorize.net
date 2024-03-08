"use client";
import { useState } from "react";
import Input from "../(components)/Input";
import Nnavbar from "../(components)/Nnavbar";
import { toast } from "react-toastify";
import { parseString } from "xml2js";

function DetailsForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [cardnumber, setCardnumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [invoiceno, setInvoiceno] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [cardcode, setCardcode] = useState("");
  const [error, setError] = useState("");

  let Transaction_Key = process.env.NEXT_PUBLIC_TRANSACTION_KEY;
  let Api_Login = process.env.NEXT_PUBLIC_NAME;
  let data = `<createTransactionRequest xmlns="AnetApi/xml/v1/schema/AnetApiSchema.xsd">
<merchantAuthentication>
    <name>${Api_Login}</name>
    <transactionKey>${Transaction_Key}</transactionKey>
</merchantAuthentication>
<transactionRequest>
  <transactionType>authCaptureTransaction</transactionType>
    <amount>${amount}</amount>
    <payment>
        <creditCard>
            <cardNumber>${cardnumber}</cardNumber>
            <expirationDate>${expiry}</expirationDate>
            <cardCode>${cardcode}</cardCode>
        </creditCard>
    </payment>
    <order>
        <invoiceNumber>${invoiceno}</invoiceNumber>
        <description>${description}</description>
    </order> 
    <poNumber>${phoneno}</poNumber>
    <billTo>
        <firstName>${firstname}</firstName>
        <lastName>${lastname}</lastName>
        <address>${address}</address>
        <city>${city}</city>
        <state>${state}</state>
        <zip>${zipcode}</zip>
        <country>${country}</country>
    </billTo>
    <shipTo>
        <firstName>${firstname}</firstName>
        <lastName>${lastname}</lastName>
        <address>${address}</address>
        <city>${city}</city>
        <state>${state}</state>
        <zip>${zipcode}</zip>
        <country>${country}</country>
    </shipTo>      
</transactionRequest>
</createTransactionRequest>`;

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (
      !firstname ||
      !lastname ||
      !cardnumber ||
      !expiry ||
      !invoiceno ||
      !amount ||
      !address ||
      !description ||
      !city ||
      !state ||
      !zipcode ||
      !country ||
      !phoneno
    ) {
      toast.info("All Fields Are Required");
    } else {
      try {
        let res = await fetch(
          "https://apitest.authorize.net/xml/v1/request.api",
          {
            method: "POST",
            body: data,
            headers: { "Content-Type": "application/xml" },
          }
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        if (res.ok) {
          const xmlData = await res.text();
          console.log("XML", xmlData);
          parseString(xmlData, (err, parsedResult) => {
            if (err) {
              throw new Error("Error parsing XML:", err);
            }
            const valid =
              parsedResult?.createTransactionResponse.messages[0].resultCode[0];
            console.log(valid);

            if (valid == "Error") {
              setError(valid);
              toast.error(error);
            } else {
              toast.success("Order Submitted");
            }
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Error Entering Details");
      }
    }
  };

  return (
    <>
      <Nnavbar />
      <section
        className="w-full h-full flex justify-center items-center  mb-10 bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <form
          onSubmit={HandleSubmit}
          className="w-[600px] h-full  bg-transparent shadow-xl border-2 mt-20 justify-center items-center gap-10 flex flex-col pb-4 "
        >
          <h1 className="text-center text-3xl text-white font-bold">DETAILS</h1>
          <Input
            type="text"
            name="first name"
            id="fname"
            placeholder="Enter First Name"
            detail="First Name"
            state={firstname}
            setstate={setFirstname}
          />
          <Input
            type="text"
            name="last name"
            id="lname"
            placeholder="Enter Last Name"
            detail="Last Name"
            state={lastname}
            setstate={setLastname}
          />

          <Input
            type="number"
            name="cardnumber"
            id="cardnumber"
            placeholder="Enter Your Card Number"
            detail="Card Holder Number"
            state={cardnumber}
            setstate={setCardnumber}
          />
          <Input
            type="number"
            name="cardcode"
            id="cardcode"
            placeholder="Enter Your Card Code"
            detail="Card Code"
            state={cardcode}
            setstate={setCardcode}
          />
          <Input
            type="text"
            name="expiry"
            id="expiry"
            detail="Expiry Date"
            placeholder="Enter Your Expiry Date"
            state={expiry}
            setstate={setExpiry}
          />

          <Input
            type="text"
            name="invoice"
            id="invoice"
            placeholder="Enter Your Invoice Number"
            detail="Invoice Number"
            state={invoiceno}
            setstate={setInvoiceno}
          />

          <Input
            type="number"
            name="Amount"
            id="number"
            placeholder="Enter Your Amount"
            detail="Amount"
            state={amount}
            setstate={setAmount}
          />

          <div className="input1 ml-4">
            <p className="text-xl font-semibold text-white">Address</p>
            <textarea
              name="address"
              id="address"
              cols="30"
              rows="10"
              placeholder="Enter Your Address"
              className="border-2 px-2  rounded-md border-white text-white resize-none w-[400px] bg-transparent "
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          <div className="input1 ml-4">
            <p className="text-xl font-semibold text-white">Description</p>
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="10"
              placeholder="Enter Description"
              className="border-2  px-2 rounded-md border-white text-white resize-none w-[400px] bg-transparent "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <Input
            type="text"
            name="city"
            id="city"
            placeholder="Enter Your City"
            detail="City"
            state={city}
            setstate={setCity}
          />

          <Input
            type="text"
            name="state"
            id="state"
            placeholder="Enter Your State"
            detail="State"
            state={state}
            setstate={setState}
          />
          <Input
            type="number"
            name="zipcode"
            id="zipcode"
            placeholder="Enter Your Zip Code"
            detail="Zip Code"
            state={zipcode}
            setstate={setZipcode}
          />

          <Input
            type="number"
            name="phone"
            id="phone"
            placeholder="Enter Your Phone No"
            detail="Phone Number"
            state={phoneno}
            setstate={setPhoneno}
          />

          <Input
            type="text"
            name="country"
            id="country"
            placeholder="Enter Your Country"
            detail="Country"
            state={country}
            setstate={setCountry}
          />

          <button className="w-[200px] py-2 border-2 font-bold bg-green-400 text-white rounded-lg">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default DetailsForm;
