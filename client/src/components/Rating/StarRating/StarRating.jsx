import React, {useState, createContext, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import StarRatingLabel from "../StarRatingLabel/StarRatingLabel";
import StarsList from "../StarList/StarList";
import {getUserRate, rateDevice} from "../../../http/deviceService";
import {Context} from "../../../index";
import {useParams} from "react-router-dom";

export const StarRatingContext = createContext();

export default function StarRating({
   defaultState,
   emptyColor,
   fillColor,
   height,
   labelText,
   maxValue,
   onChangeHover,
   onChangeValue,
   readOnly,
   width,
  }) {
  const [rating, setRating] = useState(defaultState);
  const [hover, setHover] = useState(null);
  const {user} = useContext(Context)
  const {id} = useParams()

  const setRatingFn = async (value) => {
    if (readOnly) return;

    setRating(value);
    onChangeValue(value);
    await rateDevice(user.user.id, id, value)
  }

  const setHoverFn = (value) => {
    if (readOnly) return;

    setHover(value);
    onChangeHover(value);
  }

  useEffect(() => {
    async function fetchData() {
      const userRate = await getUserRate(user.user.id, id)
      userRate && setRatingFn(userRate)
    }
    fetchData()
  }, []);

  return (
    <>
      <StarRatingContext.Provider
        value={{
          emptyColor,
          fillColor,
          height,
          hover,
          labelText,
          rating,
          setHover: setHoverFn,
          setRating: setRatingFn,
          width,
          maxValue,
        }}
      >
        <>
          {/*<StarRatingLabel/>*/}
          <StarsList/>
        </>
      </StarRatingContext.Provider>
    </>
  );
}

StarRating.propTypes = {
  defaultState: PropTypes.number,
  emptyColor: PropTypes.string,
  fillColor: PropTypes.string,
  height: PropTypes.number,
  labelText: PropTypes.func,
  maxValue: PropTypes.number,
  onChangeHover: PropTypes.func,
  onChangeValue: PropTypes.func,
  readOnly: PropTypes.bool,
  width: PropTypes.number,
};

StarRating.defaultProps = {
  defaultState: 0,
  emptyColor: "grey",
  fillColor: "#edaa10",
  height: 53,
  labelText: (value) => `${value}`,
  maxValue: 5,
  onChangeHover: () => {},
  onChangeValue: () => {},
  readOnly: false,
  width: 53,
};