import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
const History = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (currentUser) {
      const unuser = onSnapshot(
        collection(db, `table-${currentUser.uid}`),
        (snapShot) => {
          let list = [];
          snapShot.docs?.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setData(list);
        },
        (error) => {
          console.log(error);
        },
      );

      return unuser;
    }
  }, [currentUser]);
  return (
    <div className="w-full h-full">
      <table className="flex flex-col justify-center">
        <thead>
          <tr className="flex flex-row items-center justify-around border border-1">
            <th>Date</th>
            <th>Current Weight</th>
            <th>Difference</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((detail) => (
              <tr
                className="flex flex-row items-center justify-around border border-1"
                key={detail.id}
              >
                <td>{detail.date}</td>
                <td>{detail.currentWeight}</td>
                <td>{detail.difference}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
