import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import CardComponent from './CardComponent';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeAll } from 'vitest';

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

const renderWithMantine = (ui: React.ReactElement) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

describe('CardComponent', () => {
  const missionName = 'Starlink-15';
  const rocketName = 'Falcon 9';
  const patch = 'https://example.com/patch.png';
  const details = 'This mission will launch the second batch of Starlink version 1.0 satellites, from SLC-40, Cape Canaveral AFS.'

  it('рендерит название миссии и ракеты', () => {
    renderWithMantine(
      <CardComponent
        missionName={missionName}
        rocketName={rocketName}
        patch={patch}
        details = {details}
      />,
    );

    expect(screen.getByText(missionName)).toBeInTheDocument();
    expect(screen.getByText(rocketName)).toBeInTheDocument();
  });

  it('рендерит картинку с правильным src и alt', () => {
    renderWithMantine(
      <CardComponent
        missionName={missionName}
        rocketName={rocketName}
        patch={patch}
        details={details}
      />,
    );

    const imgs = screen.getAllByAltText(missionName) as HTMLImageElement[];
    expect(imgs.length).toBeGreaterThan(0);
    expect(imgs[0]).toBeInTheDocument();
  expect(imgs[0]).toHaveAttribute('src', patch);
  expect(imgs[0]).toHaveAttribute('alt', missionName);
  });

  it('рендерит кнопку "See more"', () => {
     
    renderWithMantine(
      <CardComponent
        missionName={missionName}
        rocketName={rocketName}
        patch={patch}
        details = {details}
      />,
    );

     const buttons = screen.getAllByRole('button');
     expect(buttons[0]).toBeInTheDocument();
  });
});