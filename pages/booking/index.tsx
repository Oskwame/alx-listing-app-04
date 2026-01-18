import axios from "axios";
import { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  billingAddress: string;
};

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validate = (data: FormData) => {
    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.phoneNumber ||
      !data.cardNumber ||
      !data.expirationDate ||
      !data.cvv ||
      !data.billingAddress
    ) {
      return "All fields are required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return "Invalid email address";
    }
    const cardDigits = data.cardNumber.replace(/\s|-/g, "");
    if (!/^\d{12,19}$/.test(cardDigits)) {
      return "Invalid card number";
    }
    if (!/^\d{3,4}$/.test(data.cvv)) {
      return "Invalid CVV";
    }
    if (!/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/.test(data.expirationDate)) {
      return "Invalid expiration date format";
    }
    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const validationError = validate(formData);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
    try {
      await axios.post("/api/bookings", formData);
      setSuccess("Booking confirmed");
    } catch (err) {
      setError("Failed to submit booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-3">
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        className="w-full border p-2 rounded"
      />
      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full border p-2 rounded"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border p-2 rounded"
      />
      <input
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full border p-2 rounded"
      />
      <input
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleChange}
        placeholder="Card Number"
        className="w-full border p-2 rounded"
      />
      <input
        name="expirationDate"
        value={formData.expirationDate}
        onChange={handleChange}
        placeholder="MM/YY or MM/YYYY"
        className="w-full border p-2 rounded"
      />
      <input
        name="cvv"
        value={formData.cvv}
        onChange={handleChange}
        placeholder="CVV"
        className="w-full border p-2 rounded"
      />
      <textarea
        name="billingAddress"
        value={formData.billingAddress}
        onChange={handleChange}
        placeholder="Billing Address"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {loading ? "Processing..." : "Confirm & Pay"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
    </form>
  );
}
