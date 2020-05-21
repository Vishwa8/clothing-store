import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_CvYKmLfrZOW2dkHAlOY5ZNFD00h7Yv0Z1r'

    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='Pretty Fame Ltd.'
            billingAddress
            shippingAddress
            currency='LKR'
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is LKR{price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton;