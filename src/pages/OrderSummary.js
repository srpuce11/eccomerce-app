import { useNavigate } from 'react-router-dom'

export const OrderSummary = (checkoutData) => {
  const navigate = useNavigate()

  return (
    <>
      <div>
        Your Order is confirmed by the Merchant and will be delivered soon.....! 
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    </>
  )
}
