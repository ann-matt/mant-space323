import { Card, Image, Text, Button, Center, Stack } from "@mantine/core";
import { useReducer } from "react";
import ModalCard from "./ModalCard";

type Props = {
  missionName: string;
  rocketName: string;
  patch: string;
  details: string;
};
type State = {
    isOpen: boolean;
}

type Action =
  | { type: 'OPEN' }
  | { type: 'CLOSE' };

function reducer(state: State, action: Action): State {
    switch(action.type) {
        case 'OPEN':
            return {isOpen: true};
        case 'CLOSE':
            return {isOpen: false};
        default:
            return state;
    }
}
function CardComponent({ missionName, rocketName, patch, details }: Props) {


  const [state, dispatch] = useReducer(reducer, {isOpen: false});
  const handleOpen = () => dispatch({type: 'OPEN'})

const handleClose = () => dispatch({type: 'CLOSE'})


  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section pt="xl">
        <Center>
          <Image src={patch} alt={missionName} w={120} h={120} fit="contain" />
        </Center>
      </Card.Section>

      <Stack gap={4} align="center" mt="sm" mb="md">
        <Text fw={600} ta="center">
          {missionName}
        </Text>
        <Text fw={500} ta="center" c="gray" variant="light">
          {rocketName}
        </Text>
      </Stack>

      <Button color="blue" fullWidth mt="auto" radius="md" onClick={handleOpen}>
        See more
      </Button>

      {state.isOpen && (
        <ModalCard onClose={handleClose}>
          <h2>{missionName}</h2>
          <Center>
            <Image
              src={patch}
              alt={missionName}
              w={200}
              h={200}
              fit="contain"
            />
          </Center>
          <Text fw={600}>Mission name:</Text>
          <Text c="dimmed" mb="sm">
            {missionName}
          </Text>

          <Text fw={600}>Rocket name:</Text>
          <Text c="dimmed" mb="sm">
            {rocketName}
          </Text>

          <Text fw={600}>Details:</Text>
          <Text c="dimmed">{details || "No details provided"}</Text>
        </ModalCard>
      )}
    </Card>
  );
}

export default CardComponent;