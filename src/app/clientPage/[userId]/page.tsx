"use client";
import Navbar from "../../components/Navbar";
import ClientDashboard from "../../components/clientDashboard";
import { useState, useEffect } from "react";
import iClient from "../../../database/clientSchema";

// * why does this iClient import not work?

type IParams = {
  params: {
    userId: string;
  };
};

const emptyClient: iClient = {
  _id: {
    $oid: "66300541a7100c9f91c81f90",
  },
  firstName: "",
  lastName: "",
  birthDate: "",
  entryDates: [""],
  phoneNumber: "",
  email: "",
  address: "",
  authMem: [],
  householdMem: [],
  isFlagged: false,
  isChecked: false,
  notes: [],
};

export default function ClientPage({ params }: IParams) {
  // * defaults to an empty client to avoid errors
  const [clientInformation, setClientInformation] = useState(emptyClient);

  // takes the userId from the URL path
  const { userId } = params;

  useEffect(() => {
    const getSpecificClientFromDatabase = async () => {
      try {
        const response = await fetch(`/api/clients/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          console.log("Successfully fetched client data:", data);
          setClientInformation(data); // Set the client list if fetch is successful
        } else {
          console.error("Failed to fetch clients");
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    getSpecificClientFromDatabase();
  }, [userId]);

  return (
    <>
      <Navbar />
      <ClientDashboard client={clientInformation} />
    </>
  );
}
