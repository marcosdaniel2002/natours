import { showAlert } from './alerts';

export const bookTour = async function (tourId) {
  try {
    console.log('Stripe process...');
    const stripe = Stripe(
      'pk_test_51OqRsPBUu4tqmoJIlXXsfYOg5of8iL1ATtdZOGg4oe3kqysw2JGcYdXmpIHWxD96OQOL1tN7FXmBSlKwNkZVU0us001jeJgx7d'
    );
    // 1) Get checkout session from endpoint
    const res = await fetch(`/api/v1/bookings/checkout-session/${tourId}`);
    const data = await res.json();

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
