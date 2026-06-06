import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedSite, setSelectedSite] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [compareLeft, setCompareLeft] = useState(null);
  const [compareRight, setCompareRight] = useState(null);

  useEffect(() => { fetchUsers(); }, []);

  async function fetchUsers() {
    const { data } = await supabase.from('users').select('*');
    setUsers(data || []);
  }

  async function fetchPhotos(userId) {
    const { data } = await supabase.from('photos').select('*').eq('user_id', userId).order('uploaded_at', { ascending: true });
    setPhotos(data || []);
  }

  const sitePhotos = photos.filter(p => p.site_index === selectedSite);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>📸 Melasma Tracker Admin</h1>
      <select onChange={e => {
        const user = users.find(u => u.id == e.target.value);
        setSelectedUser(user);
        if (user) fetchPhotos(user.id);
        setCompareLeft(null); setCompareRight(null);
      }}>
        <option>Select client</option>
        {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
      </select>
      {selectedUser && (
        <>
          <div style={{ marginTop: 20 }}>
            {selectedUser.site_names.map((name, idx) => (
              <button key={idx} onClick={() => { setSelectedSite(idx); setCompareLeft(null); setCompareRight(null); }} style={{ margin: 5, padding: 8, background: idx === selectedSite ? '#007bff' : '#eee', color: idx === selectedSite ? 'white' : 'black' }}>
                {name}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', gap: 20, marginTop: 20 }}>
            {sitePhotos.map((p, idx) => (
              <div key={p.id} style={{ minWidth: 180, border: '1px solid #ccc', padding: 10, textAlign: 'center' }}>
                <img src={p.photo_url} alt="site" style={{ width: 150, height: 'auto' }} />
                <div>{new Date(p.uploaded_at).toLocaleDateString()}</div>
                <button onClick={() => setCompareLeft(idx)}>← Compare</button>
                <button onClick={() => setCompareRight(idx)}>Compare →</button>
              </div>
            ))}
          </div>
          {compareLeft !== null && compareRight !== null && (
            <div style={{ marginTop: 30, display: 'flex', gap: 40, alignItems: 'center' }}>
              <div><img src={sitePhotos[compareLeft].photo_url} width={250} /><div>Earlier</div></div>
              <div><img src={sitePhotos[compareRight].photo_url} width={250} /><div>Later</div></div>
              <input type="range" min={compareLeft+1} max={sitePhotos.length-1} value={compareRight} onChange={e => setCompareRight(parseInt(e.target.value))} style={{ width: 200 }} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default App;
