import Navbar from "../components/Navbar";
import ClientDashboard from "../components/clientDashboard";
import { useState, useEffect } from "react";
import iClient from "../../database/clientSchema";

type IParams = {
  params: {
    userId: string;
  };
};

const emptyClient: iClient = {
  _id: new mongoose.Types.ObjectId(), // a new unique identifier
  firstName: "",
  lastName: "",
  birthDate: new Date(), // use current date as default or set a specific date
  entryDates: [],
  phoneNumber: "",
  email: "",
  address: "",
  authMem: [],
  householdMem: [],
  isFlagged: false,
  isChecked: false,
};

export default function ClientPage({ params }: IParams) {
  // * defaults to an empty client to avoid errors
  const [clientInformation, setClientInformation] =
    useState<iClient>(emptyClient);

  //takes the userId from the URL path
  const { userId } = params;

  useEffect(() => {
    // * makes a GET request for the specific client based on slug ID
    const getSpecificClientFromDatabase = async () => {
      try {
        const response = await fetch("/api/clients", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Fetched client:", data);
        if (response.ok) {
          setClientInformation(data); // Set the client list if fetch is successful
        } else {
          console.error("Failed to fetch clients");
          setClientInformation(iClient);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    getSpecificClientFromDatabase();
  }, []); // empty dependency array makes effect run once on mount

  return (
    <>
      <Navbar />
      <ClientDashboard client={clientInformation} />
    </>
  );
}
