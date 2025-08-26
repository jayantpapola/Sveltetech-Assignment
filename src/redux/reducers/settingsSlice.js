import { createSlice } from '@reduxjs/toolkit'
import { encrypt, decrypt } from '@/utils/secureStorage'

const defaultState = {
  darkMode: false,
  notifications: { email: true, sms: false, push: true }
};

const saved = (function(){
  try{
    const raw = localStorage.getItem('settings');
    if(!raw) return null;
    const dec = decrypt(raw);
    return dec ? JSON.parse(dec) : null;
  }catch(e){ return null; }
})();

const slice = createSlice({
  name: 'settings',
  initialState: saved || defaultState,
  reducers: {
    setDarkMode(state, action){
      state.darkMode = action.payload;
      try{ localStorage.setItem('settings', encrypt(JSON.stringify(state))); }catch(e){}
    },
    setNotification(state, action){
      const { key, value } = action.payload;
      state.notifications[key] = value;
      try{ localStorage.setItem('settings', encrypt(JSON.stringify(state))); }catch(e){}
    }
  }
});

export const { setDarkMode, setNotification } = slice.actions;
export default slice.reducer;
