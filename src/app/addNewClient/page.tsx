"use client";
import Navbar from "@components/Navbar";
import NewClientFields from "@components/NewClientFields";
import styles from "./addNewClient.module.css";
import { useEffect, useState, ChangeEvent } from "react";

interface Member {
  firstName: string;
  lastName: string;
  birthDate: string;
  isAdult: boolean;
  headHousehold: string;
}

interface AuthMem {
  firstName: string;
  lastName: string;
  birthDate: string;
  client: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  entryDates: Date[];
  authMem: string[];
  householdMem: string[];
  phoneNumber: string;
  email: string;
  address: string;
  isFlagged: boolean;
}

export default function AddNewClient() {
  const [selectedValue, setSelectedValue] = useState(false);
  const [numChildren, setNumChildren] = useState(0);
  const [numAdults, setNumAdults] = useState(1);
  const [householdMem, setHouseholdMem] = useState<Member[]>([]);
  const [authMem, setAuthMem] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    client: "",
  });

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    entryDates: [],
    authMem: [],
    householdMem: [],
    phoneNumber: "",
    email: "",
    address: "",
    isFlagged: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    console.log(formData);
  };

  const handleMemChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    isAdult: boolean
  ) => {
    const { name, value } = e.target;
    setHouseholdMem((prev) =>
      prev.map((mem, idx) => {
        if (mem.isAdult === isAdult && idx === index) {
          return { ...mem, [name]: value };
        }
        return mem;
      })
    );

    console.log(householdMem);
  };

  const handleAuthMem = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAuthMem({ ...authMem, [name]: value });
    console.log(authMem);
  };

  useEffect(() => {
    setHouseholdMem((prev) => {
      let children = prev.filter((mem) => !mem.isAdult).slice(0, numChildren);
      let adults = prev.filter((mem) => mem.isAdult).slice(0, numAdults - 1);

      while (children.length < numChildren) {
        children.push({
          firstName: "",
          lastName: "",
          birthDate: "",
          isAdult: false,
          headHousehold: "",
        });
      }
      while (adults.length < numAdults - 1) {
        adults.push({
          firstName: "",
          lastName: "",
          birthDate: "",
          isAdult: true,
          headHousehold: "",
        });
      }

      return [...children, ...adults];
    });
  }, [numChildren, numAdults]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let headClientId: string;
    e.preventDefault();
    // TODO: save client and retrieve client id
    fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        headClientId = data.message;
        console.log(headClientId);
      })
      .then(() => {
        fetchMembers(headClientId);
      })
      .catch((err) => console.log(err));
  };

  const fetchMembers = (headClientId: string) => {
    if (householdMem.length !== 0) {
      householdMem.map((mem) => (mem.headHousehold = headClientId));

      fetch("/api/householdMembers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ members: householdMem }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const mems: string[] = [];
          data.message.map((mem: any) => {
            console.log(mem._id);
            mems.push(mem._id);
          });

          updateClientHousehold(mems, headClientId);
          // setFormData((prevFormData) => ({
          //   ...prevFormData,
          //   householdMem: mems,
          // }));
        })
        .catch((err) => console.log(err));
    }
  };

  const updateClientHousehold = (mems: string[], clientId: string) => {
    fetch(`/api/clients/${clientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ householdMem: mems }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("updated client: ", data);
      })
      .catch((err) => console.log(err));
  };

  const handleRadioChange = () => {
    setSelectedValue(!selectedValue);
  };

  return (
    <>
      <Navbar />
      <form className={styles.container} onSubmit={handleSubmit}>
        <div>
          <h2 className={styles.header}>Add New Client</h2>
          <h3 className={styles.subheader}> Head of Household Information </h3>
          <NewClientFields isClient={true} onAction={handleChange} />
        </div>
        <div>
          <h3 className={styles.subheader}> Household Information </h3>
          <h4 className={styles.insideSubheader}> Household Size </h4>
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="numAdults">
                Number of Adults
              </label>
              <select
                id="numAdults"
                className={styles.inputBar}
                name="category"
                onChange={(e) => setNumAdults(parseInt(e.target.value))}
              >
                <option id="1">1</option>
                <option id="2">2</option>
                <option id="3">3</option>
                <option id="4">4</option>
                <option id="5">5</option>
                <option id="6">More than 5</option>{" "}
                {/* drop down menu for num of adults */}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="numChildren">
                Number of Children
              </label>
              <select
                className={styles.inputBar}
                id="numChildren"
                onChange={(e) => {
                  setNumChildren(parseInt(e.target.value));
                }}
              >
                <option id="0">0</option>
                <option id="1">1</option>
                <option id="2">2</option>
                <option id="3">3</option>
                <option id="4">4</option>
                <option id="5">5</option>
                <option id="6">More than 5</option>{" "}
                {/* drop down menu for num of children */}
              </select>
            </div>
          </div>
          {householdMem
            .filter((mem) => mem.isAdult)
            .map((member, index) => (
              <div key={"adult-" + index}>
                <h4>Adult {index + 2}</h4>
                <NewClientFields
                  isClient={false}
                  onAction={(e) => handleMemChange(e, index, true)}
                />
              </div>
            ))}

          {householdMem
            .filter((mem) => !mem.isAdult)
            .map((member, index) => (
              <div key={"child-" + index}>
                <h4>Child {index + 1}</h4>
                <NewClientFields
                  isClient={false}
                  onAction={(e) => handleMemChange(e, index, false)}
                />
              </div>
            ))}
        </div>
        <div>
          <h4 className={styles.subheader}> Additional Information </h4>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id="option1"
              value="option1"
              checked={selectedValue}
              onClick={handleRadioChange} // handle state with onClick (as opposed to onChange) so users can unclick if they change their minds
              onChange={() => {}} // no-op onChange field to keep react happy - react expects this when checked is controlled
            />

            <label htmlFor="option1" className={styles.radioLabel}>
              Authorize pick-up
            </label>
          </div>
          {selectedValue ? (
            <>
              <h4 className={styles.insideSubheader}> Authorized pick-up </h4>
              <NewClientFields isClient={false} onAction={handleAuthMem} />
            </>
          ) : (
            ""
          )}
        </div>
        <button type="submit" className={styles.addButton}>
          {" "}
          Add Client{" "}
        </button>
      </form>
    </>
  );
}
