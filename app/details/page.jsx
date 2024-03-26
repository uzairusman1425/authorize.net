"use client";
import { useState } from "react";
import Input from "../(components)/Input";
import Nnavbar from "../(components)/Nnavbar";
import { toast } from "react-toastify";

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

  let data = {
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
    cardcode,
  };

  const Handlesubmit = async (e) => {
    e.preventDefault();
    try {
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
      } else if (cardnumber.length > 16) {
        toast.error("Credit Card Lenght is Greater Than 16");
      } else {
        let res = await fetch("/api/authorize", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        res = await res.json();
        if (res.status == 200) {
          if (res.message === undefined) {
            toast.error("Error");
          } else {
            toast.success(res.message);
          }
        } else {
          if (res.message === undefined) {
            toast.error("Error");
          } else {
            toast.error(res.message);
          }

          
        }
      }
      setAddress("")
      setAmount("")
      setCardcode("")
      setCardnumber("")
      setAmount("")
      setCity("")
      setCountry("")
      setDescription("")
      setExpiry("")
      setFirstname("")
      setInvoiceno("")
      setLastname("")
      setPhoneno("")
      setZipcode("")
      
    } catch (error) {
      console.error(error);
      toast.error("Error submitting order");
    }
  };

  return (
    <>
      <Nnavbar />

      <section
        className="w-full h-full flex justify-center items-center  mb-2  "
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <form
          onSubmit={Handlesubmit}
          className="w-[600px] h-full mt-20  bg-transparent shadow-xl bg-white border-2  justify-center items-center gap-10 flex flex-col pb-4 "
        >
          <h1 className="text-center text-3xl font-bold">DETAILS</h1>
          <div className="payment-info  w-full h-full text-center">
            <h1 className="font-bold text-2xl border-2 bg-gray-400 border-gray-400">
              Payment/Authorization Information
            </h1>
            <p className="text-lg mt-2">
              Accepted Payment Method Visa, MasterCard, American Express,
              Discover, JCB, eCheck
            </p>
            <Input
              type="number"
              name="cardnumber"
              id="cardnumber"
              placeholder="Enter Your Card Number"
              detail="Card  Number(enter without spaces) * "
              state={cardnumber}
              setstate={setCardnumber}
            />

            <Input
              type="text"
              name="expiry"
              id="expiry"
              detail="Expiry Date 
            (mmyy) * "
              placeholder="Enter Your Expiry Date"
              state={expiry}
              setstate={setExpiry}
            />
            <Input
              type="number"
              name="Amount"
              id="number"
              placeholder="Enter Your Amount"
              detail="Amount  (i.e.,10.00) * "
              state={amount}
              setstate={setAmount}
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
          </div>
          <div className="order-info  w-full h-full text-center">
            <h1 className="font-bold text-2xl border-2 bg-gray-400 border-gray-400">
              Order Information
            </h1>

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
              type="text"
              name="desc"
              id="desc"
              placeholder="Enter  Description"
              detail="Description"
              state={description}
              setstate={setDescription}
            />
          </div>

          <div className="Customer-info  w-full h-full text-center">
            <h1 className="font-bold text-2xl border-2 bg-gray-400 border-gray-400">
              Customer Billing Information
            </h1>
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
              type="text"
              name="address"
              id="address"
              placeholder="Enter Your Address"
              detail="Address"
              state={address}
              setstate={setAddress}
            />

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
          </div>

        

          <button className="w-[200px] py-2 border-2 font-bold bg-green-400 text-white rounded-lg">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default DetailsForm;
