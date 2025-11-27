import { useEffect, useReducer } from "react";
import CardComponent from "./CardComponent";
import { SimpleGrid } from "@mantine/core";

const DATA_URL = "https://api.spacexdata.com/v3/launches?launch_year=2020";

type Launch = {
  flight_number: number;
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
  links: {
    mission_patch_small: string;
    mission_patch: string;
  };
  details: string;
};

type State = {
  data: Launch[];
  isLoading: boolean;
  error: string | null;
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Launch[] }
  | { type: "FETCH_ERROR"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        data: action.payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

const initialState: State = {
  data: [],
  isLoading: true,
  error: null,
};

export default function CardList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const response = await fetch(DATA_URL);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result: Launch[] = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: result }); 
      } catch (err) {
        let message: string;
        if (err instanceof Error) {
          message = err.message;
        } else {
          message = "Unknown error";
        }
        dispatch({ type: "FETCH_ERROR", payload: message });
      }
    };

    fetchData();
  }, []);
  

  if (state.isLoading) {
    return <p>Loading...</p>;
  }

  if (state.error) {
    return <p>Error: {state.error}</p>;
  }

  return (
    <SimpleGrid mt={42} spacing={10} cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
      {state.data.map((launch) => (
        <CardComponent
          key={launch.flight_number}
          missionName={launch.mission_name}
          rocketName={launch.rocket.rocket_name}
          patch={launch.links.mission_patch || launch.links.mission_patch_small}
          details={launch.details}
        />
      ))}
    </SimpleGrid>
  );
}
