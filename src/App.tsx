import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import './App.css';
import CardList from './components/CardList';



export default function App() {
  return <MantineProvider>
    <CardList />
  </MantineProvider>;
}