import { faCode } from "@fortawesome/free-solid-svg-icons";
import { queryByTestId } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dbService } from "../fbase";

const Myjoinlist = ({ listObj }) => {
  const [name, setName] = useState("");
  const [exist, setExist] = useState(false);

  let navigate = useNavigate();
  let myObj;
  useEffect(() => {
    let dblists = dbService
      .collection("startlist")
      //.where("randomidx", "==",`${listObj.randomidx}` )
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().randomidx == `${listObj.randomidx}`) {
            myObj = {
              id: doc.id,
              ...doc.data(),
            };
            setExist(true);
            setName(myObj.name);
          }
        });
      });
  }, []);

  const onShowdetailClick = async () => {
    let dblists = await dbService
      .collection("startlist")
      //.where("randomidx", "==",`${listObj.randomidx}` )
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().randomidx == `${listObj.randomidx}`) {
            myObj = {
              id: doc.id,
              ...doc.data(),
            };
          }
        });
      });

    navigate("/selling/detail", {
      replace: false,
      state: { detailObj: myObj },
    });
  };

  const onShowbuyClick = () => {
    const detailObj = "init";
    navigate("/buying/detail", {
      replace: false,
      state: { detailObj: listObj },
    });
  };

  return (
    <>
      <div className="Itemclass">
        {exist ? (
          <>
            <div>
              <h4>픔목이름: {`${name}`}</h4>
            </div>

            <div>
              <button
                className="detaillist show Btn"
                onClick={onShowdetailClick}
              >
                해당 공구 자세히보기
              </button>
              <button className="detaillist show Btn" onClick={onShowbuyClick}>
                내 정보 자세히보기
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Myjoinlist;
