import React, { useState, useEffect } from "react";

function ItemState({ setMainPageState }) {
  return (
    <>
      <button
        onClick={() => {
          setMainPageState(1);
        }}
      >
        Back
      </button>
    </>
  );
}

export default ItemState;
