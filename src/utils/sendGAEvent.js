

import Cookies from "js-cookie";

export const sendGAEvent = (eventName, eventParams = {}) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  let user = null;

  try {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      user = JSON.parse(userCookie);
    }
  } catch (err) {
    console.error("Cookie parse error", err);
  }

  const finalParams = {
    ...eventParams,
    user_id: user?.user_id || null,
    user_email: user?.email || null,
    user_name: user?.name || null
  };

  window.gtag("event", eventName, finalParams);
};


// sendGAEvent("add_to_cart", {
//   product_id: "123",
//   price: 499,
// });



// view_product
// product_click
// product_impression
// view_category
// view_brand
// view_cart
// add_to_cart
// remove_from_cart
// wishlist_add
// wishlist_remove
// compare_product
// start_checkout
// add_payment_info
// add_shipping_info
// payment_success
// payment_failed
// purchase
// apply_coupon
// remove_coupon
// view_offers
// login_success
// login_failed
// logout
// signup_start
// signup_success
// otp_sent
// otp_verified
// profile_update
// address_add
// address_delete
// password_change
// account_delete
// search
// search_no_results
// filter_apply
// filter_remove
// sort_apply
// cta_click
// form_submit
// newsletter_subscribe
// scroll_depth
// session_start
// share
// product_share
// order_created
// order_cancelled
// order_refund_requested
// order_refunded
// track_order
// reorder
// review_submit
// review_edit
// review_delete
// review_like
// review_report
// page_view_custom
