import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import CardList from './CardList';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

beforeEach(() => {
  vi.resetAllMocks();
});

 const renderWithMantine = (ui: React.ReactElement) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

describe('CardList', () => {
  const missionName = 'Starlink-15';
  const rocketName = 'Falcon 9';
  const patch = 'https://example.com/patch.png';
  const details = 'This mission will launch the second batch of Starlink version 1.0 satellites, from SLC-40, Cape Canaveral AFS.'
  const url = "https://api.spacexdata.com/v3/launches?launch_year=2020";

  const mockLaunches = [
    {
      flight_number: 1,
      mission_name: missionName,
      rocket: { rocket_name: rocketName },
      links: {
        mission_patch_small: patch,
        mission_patch: patch,
      },
      details,
    },
  ];


   it('рендерит карточки после успешного фетча', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockLaunches,
    } as unknown as Response);

    renderWithMantine(<CardList />);

    // сначала есть Loading...
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // ждём, пока появится название миссии из мок-данных
    const missionTitle = await screen.findByText(missionName);
    expect(missionTitle).toBeInTheDocument();

    // и название ракеты
    expect(screen.getByText(rocketName)).toBeInTheDocument();
  });

  it('вызывает fetch с правильным URL', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({
        ok: true,
        json: async () => mockLaunches,
      } as unknown as Response);

    renderWithMantine(<CardList />);

    // ждём, чтобы эффект успел дернуть fetch
    await screen.findByText(missionName);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(url);
  });

});