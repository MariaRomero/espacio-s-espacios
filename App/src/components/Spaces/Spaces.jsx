import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import Form from "../Form/Form";
import Space from "../Space/Space";
import styles from "./styles.module.css";
import Popup from "reactjs-popup";

function Spaces() {
  const [spaces, setSpaces] = useState();
  const [updatingSpace, setUpdatingSpace] = useState(null);

  useEffect(() => {
    const spacesRef = firebase.database().ref("spaces");
    spacesRef.on("value", snapshot => {
      let spacesObj = snapshot.val();
      let newSpaces = [];

      for (let space in spacesObj) {
        newSpaces.push({
          id: space,
          address: spacesObj[space].address,
          postcode: spacesObj[space].postcode,
          noBeds: spacesObj[space].noBeds,
          description: spacesObj[space].description,
          price: spacesObj[space].price,
          images: spacesObj[space].images,
          expires: spacesObj[space].expires
        });
      }

      setSpaces(newSpaces);
    });
  }, []);

  const removeSpace = spaceId => {
    const spaceRef = firebase.database().ref(`/spaces/${spaceId}`);
    spaceRef
      .remove()
      .then(() => {
        alert("Space successfully deleted!");
      })
      .catch(error => {
        console.error("Error removing space: ", error);
      });
  };

  function updateForm(event, space) {
    setUpdatingSpace(space);
  }

  return (
    <section className={styles.container}>
      <div className="wrapper">
        <ul className={styles.list}>
          {typeof spaces === "undefined"
            ? "Loading..."
            : spaces.map(space => {
                return (
                  <Space
                    key={space.id}
                    space={space}
                    removeSpace={removeSpace}
                    updateForm={updateForm}
                  />
                );
              })}
        </ul>
        {updatingSpace && (
          <Popup
            onClose={() => setUpdatingSpace(false)}
            open={updatingSpace}
            position="right center"
          >
            <div className={styles.popupContent}>
              <button
                className={styles.cancelEditingAction}
                onClick={() => setUpdatingSpace(false)}
              >
                Cancel
              </button>
              <Form
                spaceSelected={updatingSpace}
                setUpdatingSpace={setUpdatingSpace}
              />
            </div>
          </Popup>
        )}
      </div>
    </section>
  );
}

export default Spaces;
