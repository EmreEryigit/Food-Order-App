import classes from "./Checkout.module.css";
import { useRef, useState } from "react";
const isEmpty = value => value.trim() === ""
const isFiveChars = value => value.trim().length === 5
const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city : true,
    postalCode: true
  })
  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const postalCodeRef = useRef();
  const streetInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostalCode = postalCodeRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode) && isFiveChars(enteredPostalCode);
    const enteredStreetIsValid = !isEmpty(enteredStreet);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid
    })
    const formIsValid = enteredCityIsValid && enteredNameIsValid && enteredPostalCodeIsValid && enteredStreetIsValid;

    if(!formIsValid){
      return 
    }
    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      postalCode: enteredPostalCode,
      street: enteredStreet
    })

  };

  const nameControl = `${classes.control} ${formInputValidity.name ? "" : classes.invalid}`;
  const streetControl = `${classes.control} ${formInputValidity.street ? "" : classes.invalid}`;
  const cityControl = `${classes.control} ${formInputValidity.city ? "" : classes.invalid}`;
  const postalCodeControl = `${classes.control} ${formInputValidity.postalCode ? "" : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControl}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <span>Please enter a valid name</span>}
      </div>
      <div className={streetControl}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <span>Please enter a valid street</span>}
      </div>
      <div className={postalCodeControl}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeRef} />
        {!formInputValidity.postalCode && <span>Please enter a valid postal code</span>}
      </div>
      <div className={cityControl}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <span>Please enter a valid city</span>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
