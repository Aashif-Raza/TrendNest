import React, { useState } from "react";
import Icon from "./Icon";

// Demo: valid coupon code is 'DEMO10' for 10% off
function validateCoupon(code) {
  return code === "DEMO10" ? 0.1 : 0;
}

function getCardType(number) {
  if (/^5[1-5]/.test(number)) return "mastercard";
  if (/^4/.test(number)) return "visa";
  if (/^3[47]/.test(number)) return "amex";
  return null;
}

const stepper = [
  { label: "Shipping", icon: "fa-truck" },
  { label: "Payment", icon: "fa-credit-card" },
  { label: "Review", icon: "fa-clipboard-check" },
];

export default function AdvancedCheckoutModal({
  open,
  cart,
  onClose,
  onPlaceOrder,
}) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [processing, setProcessing] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Form state
  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postal: "",
  });
  const [payment, setPayment] = useState({
    card: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = total * discount;
  const finalTotal = total - discountAmount;

  // Validation
  function validateShipping() {
    let err = {};
    if (!shipping.name.trim()) err.name = "Required";
    if (!shipping.email.match(/^[^@]+@[^@]+\.[^@]+$/))
      err.email = "Invalid email";
    if (!shipping.address.trim()) err.address = "Required";
    if (!shipping.city.trim()) err.city = "Required";
    if (!shipping.postal.trim()) err.postal = "Required";
    setErrors(err);
    return Object.keys(err).length === 0;
  }
  function validatePayment() {
    let err = {};
    if (!payment.card.match(/^\d{13,19}$/))
      err.card = "Invalid card number";
    if (!payment.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/))
      err.expiry = "MM/YY";
    if (!payment.cvv.match(/^\d{3,4}$/))
      err.cvv = "3 or 4 digits";
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  // Handlers
  function handleNext() {
    if (step === 1 && validateShipping()) setStep(2);
    else if (step === 2 && validatePayment()) setStep(3);
  }
  function handleBack() {
    if (step > 1) setStep(step - 1);
  }
  function handleApplyCoupon() {
    const disc = validateCoupon(coupon);
    setDiscount(disc);
    setCouponApplied(!!disc);
  }
  function handleOrder() {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onPlaceOrder();
    }, 1600);
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-0 md:p-0 overflow-hidden relative animate-fadeIn">
        {/* Close button */}
        <button
          className="absolute top-5 right-6 btn-icon text-[#5B3A29] hover:text-gray-700 focus:outline-none z-10"
          onClick={onClose}
          aria-label="Close"
        >
          <Icon name="close" size="large" />
        </button>
        {/* Stepper */}
        <div className="flex items-center justify-between px-8 pt-9 pb-2 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50">
          {stepper.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1">
              <div
                className={`flex flex-col items-center w-24`}
              >
                                  <span
                    className={`rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold border-2 ${
                      step > i
                        ? "bg-[#5B3A29] border-[#5B3A29] text-white"
                        : step === i + 1
                        ? "bg-white border-[#5B3A29] text-[#5B3A29]"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    } shadow`}
                  >
                    <Icon name={s.icon.replace('fa-', '')} size="small" />
                  </span>
                                  <span
                    className={`mt-2 text-xs font-semibold ${
                      step === i + 1
                        ? "text-[#5B3A29]"
                        : step > i
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
              </div>
              {i < stepper.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded ${
                    step > i + 1
                      ? "bg-[#5B3A29]"
                      : step === i + 1
                      ? "bg-[#5B3A29]/30"
                      : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="p-8">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={e=>e.preventDefault()}>
              <div>
                <label className="block font-semibold mb-1">Full Name</label>
                <input className={`w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 transition ${errors.name&&"border-red-400"}`} value={shipping.name} onChange={e=>setShipping(s=>({...s,name:e.target.value}))} />
                {errors.name && <div className="text-xs text-red-500">{errors.name}</div>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input className={`w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 transition ${errors.email&&"border-red-400"}`} value={shipping.email} onChange={e=>setShipping(s=>({...s,email:e.target.value}))} />
                {errors.email && <div className="text-xs text-red-500">{errors.email}</div>}
              </div>
              <div className="md:col-span-2">
                <label className="block font-semibold mb-1">Address</label>
                <input className={`w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 transition ${errors.address&&"border-red-400"}`} value={shipping.address} onChange={e=>setShipping(s=>({...s,address:e.target.value}))} />
                {errors.address && <div className="text-xs text-red-500">{errors.address}</div>}
              </div>
              <div>
                <label className="block font-semibold mb-1">City</label>
                <input className={`w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 transition ${errors.city&&"border-red-400"}`} value={shipping.city} onChange={e=>setShipping(s=>({...s,city:e.target.value}))} />
                {errors.city && <div className="text-xs text-red-500">{errors.city}</div>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Postal Code</label>
                <input className={`w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 transition ${errors.postal&&"border-red-400"}`} value={shipping.postal} onChange={e=>setShipping(s=>({...s,postal:e.target.value}))} />
                {errors.postal && <div className="text-xs text-red-500">{errors.postal}</div>}
              </div>
            </form>
          )}
          {/* Step 2: Payment */}
          {step === 2 && (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={e=>e.preventDefault()}>
              <div>
                <label className="block font-semibold mb-1">Card Number</label>
                <input
                  inputMode="numeric"
                  className={`w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 transition ${errors.card&&"border-red-400"}`}
                  value={payment.card}
                  onChange={e=>
                    setPayment(p=>({...p,card:e.target.value.replace(/\D/g,"").slice(0,19)}))
                  }
                  placeholder="•••• •••• •••• ••••"
                  maxLength={19}
                />
                {payment.card && (
                  <div className="text-xs text-gray-500">
                    Card Type: {getCardType(payment.card)||"Unknown"}
                  </div>
                )}
                {errors.card && <div className="text-xs text-red-500">{errors.card}</div>}
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block font-semibold mb-1">Expiry</label>
                  <input
                    className={`w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 transition ${errors.expiry&&"border-red-400"}`}
                    value={payment.expiry}
                    onChange={e=>
                      setPayment(p=>({...p,expiry:e.target.value.replace(/[^0-9/]/g,"").slice(0,5)}))
                    }
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {errors.expiry && <div className="text-xs text-red-500">{errors.expiry}</div>}
                </div>
                <div className="flex-1">
                  <label className="block font-semibold mb-1">CVV</label>
                  <input
                    inputMode="numeric"
                    className={`w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 transition ${errors.cvv&&"border-red-400"}`}
                    value={payment.cvv}
                    onChange={e=>
                      setPayment(p=>({...p,cvv:e.target.value.replace(/\D/g,"").slice(0,4)}))
                    }
                    placeholder="CVV"
                    maxLength={4}
                  />
                  {errors.cvv && <div className="text-xs text-red-500">{errors.cvv}</div>}
                </div>
              </div>
              {/* Coupon code */}
              <div className="md:col-span-2 mt-2">
                <label className="block font-semibold mb-1">Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    className="w-40 border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                    value={coupon}
                    onChange={e=>setCoupon(e.target.value)}
                    placeholder="Enter code"
                    disabled={couponApplied}
                  />
                  <button
                    className={`rounded px-4 py-2 font-semibold transition ${
                      couponApplied
                        ? "btn-accent"
                        : "btn-primary"
                    }`}
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponApplied}
                  >
                    {couponApplied ? "Applied" : "Apply"}
                  </button>
                  {couponApplied && <span className="text-green-600 font-semibold ml-2">10% off!</span>}
                </div>
                {coupon && !couponApplied && discount === 0 && (
                  <div className="text-xs text-red-500 mt-1">Invalid coupon</div>
                )}
              </div>
              {/* PayPal/Apple Pay (UI only) */}
              <div className="md:col-span-2 mt-2 flex gap-4">
                <button
                  type="button"
                  className="bg-yellow-400 text-black rounded px-6 py-2 font-bold flex items-center gap-2 shadow hover:bg-yellow-300"
                  disabled
                  title="Demo only"
                >
                  <i className="fa fa-cc-paypal text-xl"></i> PayPal (Demo)
                </button>
                <button
                  type="button"
                  className="bg-black text-white rounded px-6 py-2 font-bold flex items-center gap-2 shadow hover:bg-gray-900"
                  disabled
                  title="Demo only"
                >
                  <i className="fa fa-apple text-xl"></i> Apple Pay (Demo)
                </button>
              </div>
            </form>
          )}
          {/* Step 3: Review */}
          {step === 3 && (
            <div>
              <div className="rounded-lg border bg-blue-50 p-4 mb-4">
                <h4 className="font-semibold mb-2 text-blue-700">Order Summary</h4>
                <ul>
                  {cart.map((item) => (
                    <li
                      className="flex justify-between border-b py-1"
                      key={item.id}
                    >
                      <span>
                        {item.name} x{item.qty}
                      </span>
                      <span>${(item.price * item.qty).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between font-semibold text-green-600">
                    <span>Discount:</span>
                    <span>- ${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-xl mt-2 border-t pt-2">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
              {/* Shipping/Payment info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                <div className="rounded-lg border p-3 bg-white">
                  <div className="font-semibold mb-1 text-blue-700">Shipping Info</div>
                  <div>{shipping.name}</div>
                  <div>{shipping.email}</div>
                  <div>{shipping.address}</div>
                  <div>
                    {shipping.city}, {shipping.postal}
                  </div>
                </div>
                <div className="rounded-lg border p-3 bg-white">
                  <div className="font-semibold mb-1 text-blue-700">Payment</div>
                  <div>
                    Card ending in{" "}
                    {payment.card.slice(-4).padStart(payment.card.length, "*")}
                  </div>
                  <div>Expiry: {payment.expiry}</div>
                </div>
              </div>
            </div>
          )}
          {/* Navigation */}
          <div className="flex justify-between mt-10">
            {step > 1 && (
                          <button
              className="btn-secondary"
              onClick={handleBack}
              disabled={processing}
            >
              Back
            </button>
            )}
            <div className="flex-1"></div>
            {step < 3 && (
                          <button
              className="btn-primary"
              onClick={handleNext}
              disabled={processing}
            >
              Next
            </button>
            )}
            {step === 3 && (
                          <button
              className="btn-accent"
              onClick={handleOrder}
              disabled={processing}
            >
              {processing ? (
                <span>
                  <Icon name="check" size="small" className="inline mr-2 animate-spin" />
                  Placing Order...
                </span>
              ) : (
                "Place Order"
              )}
            </button>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .animate-fadeIn {
          animation: fadeIn .2s;
        }
        @keyframes fadeIn { from {opacity:0; transform:scale(.97);} to {opacity:1; transform:scale(1);} }
      `}</style>
    </div>
  );
}