import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import inputSchema from "../../validation/validation";
import styles from "./styles.module.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function Form({ spaceSelected, setUpdatingSpace }) {
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [noBeds, setNoBeds] = useState("");
  const [description, setDescription] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [price, setPrice] = useState("");
  const [images, setImages] = useState("");

  const expirationDate = (day = 30) => {
    return new Date(
      Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * day
    ).toUTCString();
  };

  const [expires, setExpires] = useState(expirationDate());

  const notify = message => {
    // toast.success(message);
  };

  useEffect(() => {
    if (typeof spaceSelected !== "undefined") {
      const {
        id,
        address,
        postcode,
        noBeds,
        description,
        price,
        images,
        expires
      } = spaceSelected;
      id && setId(id);
      address && setAddress(address);
      postcode && setPostcode(postcode);
      noBeds && setNoBeds(noBeds);
      description && setDescription(description);
      price && setPrice(price);
      images && setImages(images);
      expires && setExpires(expires);
    }
  }, [spaceSelected]);

  const handleSubmit = async (event, id, expiresDate) => {
    event.preventDefault();

    if (id) {
      const spaceRef = firebase.database().ref(`/spaces/`);
      spaceRef.update({
        [id]: {
          address: address,
          postcode: postcode,
          noBeds: noBeds,
          description: description,
          price: price,
          images: images,
          expires: expiresDate || expires
        }
      });
    } else {
      const spacesRef = firebase.database().ref("spaces");

      const space = {
        address: address,
        postcode: postcode,
        noBeds: noBeds,
        description: description,
        price: price,
        images: images,
        expires: expires
      };

      const valid = await inputSchema.isValid(space);

      if (!valid) {
        inputSchema
          .validate(
            {
              address: address,
              postcode: postcode,
              noBeds: noBeds,
              description: description,
              price: price,
              images: images
            },
            { abortEarly: false }
          )
          .catch(function(err) {
            setFieldErrors(err.errors);
          });
        return;
      }

      try {
        await spacesRef.push(space);
        notify("Space succefully uploaded.");
        setAddress("");
        setPostcode("");
        setNoBeds("");
        setDescription("");
        setPrice("");
        setImages("");
        setExpires("");
        setFieldErrors();
      } catch (error) {
        notify("Error uploading space");
      }
    }

    if (typeof spaceSelected !== "undefined") setUpdatingSpace(null);
  };

  const displayErrors = () => {
    if (fieldErrors && fieldErrors[0]) {
      return fieldErrors.map((error, index) => {
        return (
          <p key={index} className={styles.formErrorMessage}>
            Error: {error}
          </p>
        );
      });
    }
  };

  const expireSpace = async event => {
    handleSubmit(event, id, expirationDate(-1));
  };

  return (
    <div className={styles.container}>
      {displayErrors()}
      <form
        onSubmit={event => {
          handleSubmit(event, id, expirationDate());
        }}
      >
        <div className={styles.fieldContainer}>
          <label className={styles.fieldLabel}>
            Address:
            <input
              className={styles.inputField}
              type="text"
              value={address}
              placeholder="Address"
              onChange={e => setAddress(e.target.value)}
            />
          </label>
        </div>

        <div className={styles.fieldContainer}>
          <label className={styles.fieldLabel}>
            Postcode:
            <input
              className={styles.inputField}
              type="text"
              value={postcode}
              placeholder="Postcode"
              onChange={e => setPostcode(e.target.value)}
            />
          </label>
        </div>

        <div className={styles.fieldContainer}>
          <label className={styles.fieldLabel}>
            No. of Beds:
            <input
              className={styles.inputField}
              type="text"
              value={noBeds}
              placeholder="No. of Beds"
              onChange={e => setNoBeds(e.target.value)}
            />
          </label>
        </div>

        <div className={styles.fieldContainer}>
          <label className={styles.fieldLabel}>
            Description:
            <input
              className={styles.inputField}
              type="text"
              value={description}
              placeholder="Description"
              onChange={e => setDescription(e.target.value)}
            />
          </label>
        </div>

        <div className={styles.fieldContainer}>
          <label className={styles.fieldLabel}>
            Asking Price:
            <input
              className={styles.inputField}
              type="text"
              value={price}
              placeholder="Asking Price"
              onChange={e => setPrice(e.target.value)}
            />
          </label>
        </div>

        <div className={styles.fieldContainer}>
          <label className={styles.fieldLabel}>
            Add Images Urls:
            <input
              className={styles.inputField}
              type="text"
              value={images}
              placeholder="Add Images Urls"
              onChange={e => setImages(e.target.value)}
            />
          </label>
        </div>

        <div className={styles.actionsContainer}>
          {typeof spaceSelected !== "undefined" && (
            <button
              className={styles.action}
              type="button"
              onClick={expireSpace}
            >
              Expire Space
            </button>
          )}
          <input className={styles.action} type="submit" value="Submit" />
        </div>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Form;
