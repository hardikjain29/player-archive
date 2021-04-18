import React, { useState } from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import EmptyState from './components/EmptyState/EmptyState';
import PlayerCard from './components/PlayerCard/PlayerCard';
import { PlayerType, ProfileType } from './types';
import './App.css';

const App: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null | undefined>(undefined);

  const onSearch = async (id: string): Promise<void> => {
    try {
      const playerResponse = await fetch(`http://localhost:5000/player/${id}`);
      const playerDetails: PlayerType = await playerResponse.json();

      if (playerDetails.active) {
        const profileResponse = await fetch(`http://localhost:5000/profile/${playerDetails['profile-id']}`);
        const profileDetails: ProfileType = await profileResponse.json();

        setProfile(profileDetails);
      } else {
        setProfile(null); // Player Not Active
      }
    } catch {
      setProfile(null); // Player Not Found
    }
  } 

  return (
    <div className="wrapper">
      <SearchBox onSearch={onSearch} />
      <div className='results-wrapper'>
        {
          profile ? (
            <PlayerCard profile={profile} />
          ) : (
            <EmptyState emptyType={profile} />
          )
        }
      </div>
    </div>
  );
}

export default App;
