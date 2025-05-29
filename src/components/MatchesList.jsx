import React, { useEffect, useState } from 'react';
import './MatchesList.css';
import axios from 'axios';

const MatchesList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:5000/matches');
        setMatches(response.data); // Already a matches
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">⚽ Upcoming Champions League Matches</h2>
      {loading ? (
        <p className="text-center">Loading matches...</p>
      ) : matches.length === 0 ? (
        <p className="text-center">No upcoming matches found.</p>
      ) : (
        <div className="row">
          {matches.map((match) => (
            <div key={match.id} className="col-md-6 col-lg-4">
              <div className="match-card card shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title">
                    {match.homeTeam.name} <span className="vs">vs</span> {match.awayTeam.name}
                  </h5>
                  <p className="card-text">
                    📅 {new Date(match.utcDate).toLocaleString()}
                  </p>
                  <p className="text-muted">{match.competition.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchesList;
