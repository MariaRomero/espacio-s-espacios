import React, { useState } from "react";
import styles from "./styles.module.css";
import { Gallery, GalleryImage } from "react-gesture-gallery";

function Space({ updateForm, removeSpace, space }) {
  const [index, setIndex] = useState(0);

  return (
    <li className={styles.container} key={space.id}>
      <h3 className={styles.title}>{space.address}</h3>
      <div className={styles.images}>
        <Gallery
          index={index}
          onRequestChange={i => {
            setIndex(i);
          }}
        >
          {space.images.split(",").map(image => (
            <GalleryImage key={space.id} src={image} objectFit="cover" />
          ))}
        </Gallery>
      </div>
      <div className={styles.details}>
        <p className={styles.detail}>Postcode: {space.postcode}</p>
        <p className={styles.detail}>No. of Beds: {space.noBeds}</p>
        <p className={styles.detail}>Description: {space.description}</p>
        <p className={styles.detail}>Price: {space.price}</p>
        <p className={styles.detail}>Expires on: {space.expires}</p>
      </div>
      <div className={styles.actionGroup}>
        <button className={styles.action} onClick={() => removeSpace(space.id)}>
          Remove Space
        </button>
        <button
          className={styles.action}
          onClick={event => {
            updateForm(event, space);
          }}
        >
          Update Space
        </button>
      </div>
    </li>
  );
}

export default Space;
