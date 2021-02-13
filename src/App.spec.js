import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { fetchMissions as mockFetchMissions } from './api/fetchMissions';
import App from './App';

jest.mock('./api/fetchMissions');

const data = [
  {
    mission_name: 'Orbcomm OG2',
    mission_id: 'CE91D46',
    manufacturers: ['Sierra Nevada Corporation'],
    payload_ids: ['Orbcomm-OG2', 'Orbcomm-OG2-M1', 'Orbcomm-OG2-M2'],
    wikipedia: 'https://en.wikipedia.org/wiki/Orbcomm_(satellite)#Orbcomm-OG2',
    website: 'https://www.orbcomm.com/',
    twitter: 'https://twitter.com/orbcomm_inc',
    description:
      'Orbcomm Generation 2 (OG2) second-generation satellites are intended to supplement and eventually replace the current first generation constellation. Eighteen satellites were ordered by 2008—nominally intended to be launched in three groups of six during 2010–2014—and by 2015 have all been launched, on three flights. Orbcomm has options for a further thirty OG2 spacecraft. The satellites were launched by SpaceX on the Falcon 9 launch system. Originally, they were to launch on the smaller Falcon 1e rocket.',
  },
  {
    mission_name: 'ABS',
    mission_id: '2CF444A',
    manufacturers: ['Boeing'],
    payload_ids: ['ABS-3A', 'ABS-3B'],
    wikipedia: 'https://en.wikipedia.org/wiki/ABS_(satellite_operator)',
    website: 'http://www.absatellite.com/',
    twitter: null,
    description:
      'ABS, formerly Asia Broadcast Satellite, is a global satellite operator based in Hong Kong and officially incorporated in Bermuda. Its services include direct-to-home and satellite-to-cable TV distribution, cellular services, and internet services. Operating 6 communication satellites, the satellite fleet currently covers 93% of the world’s population including the Americas, Africa, Asia Pacific, Europe, the Middle East, Russia and Commonwealth of Independent States.',
  },
  {
    mission_name: 'Eutelsat',
    mission_id: 'F7709F2',
    manufacturers: ['Boeing'],
    payload_ids: ['Eutelsat 115 West B', 'Eutelsat 117 West B'],
    wikipedia: 'https://en.wikipedia.org/wiki/Eutelsat',
    website: 'https://www.eutelsat.com/en/home.html#',
    twitter:
      'https://twitter.com/Eutelsat_SA?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
    description:
      "Eutelsat S.A. is a European satellite operator. Providing coverage over the entire European continent, the Middle East, Africa, Asia and the Americas, it is the world's third largest satellite operator in terms of revenues.",
  },
];

describe('<App />', () => {
  it('should fetch data on click and display them', async () => {
    mockFetchMissions.mockResolvedValue({ data });
    // AAA
    // arrange
    const { getByText, getByRole, getAllByTestId } = render(<App />);

    // accessibility
    // a11y syntax tree
    const button = getByRole('button', { name: /get data/i });

    fireEvent.click(button);
    expect(mockFetchMissions).toHaveBeenCalled();
    expect(mockFetchMissions).toHaveBeenCalledTimes(1);
    expect(mockFetchMissions).toHaveBeenCalledWith(123);

    const loadingElement = getByText(/we are fetching data.../i);
    expect(loadingElement).not.toBeNull()

    await waitFor(() => {
      expect(getAllByTestId('mission')).toHaveLength(data.length);
    });
  });
});
