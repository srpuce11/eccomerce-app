import { useNavigate } from 'react-router-dom'
import { useAuth } from "../components/auth/auth";

export const OrderSummary = (checkoutData) => {
  const navigate = useNavigate()
  const { user } = useAuth();
  return (
    <>
      <div>
      {user ? (
        <div>
        Your Order is confirmed by the Merchant and will be delivered soon.....! 
        <button onClick={() => navigate(-1)}>Go back</button>
        </div>
      ) : (
        <p>Please Login to Order</p>
      )}
      </div>
    </>
  )
}
