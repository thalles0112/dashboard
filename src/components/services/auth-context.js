import { configureStore, createSlice } from "@reduxjs/toolkit";


function loadCookies(){
    let cookie = document.cookie
        let output = {}
        cookie.split(/\s*;\s*/).forEach(function(pair) {
            pair = pair.split(/\s*=\s*/);
            output[pair[0]] = pair.splice(1).join('=');
            });
        let json_cookie = JSON.stringify(output, null, 4);
        json_cookie = JSON.parse(json_cookie)
        
        return json_cookie
}

const cookies = loadCookies()
console.log(cookies)
export const userAuthSlice = createSlice({
    name: 'auth',
    value: false,
    initialState:{
        token: cookies.hnbdasht,
        username: cookies.hnbdashun,
        id: cookies.hnbdashuid,
        isLogged: cookies.hnbdasht?true:false,
    },
    
    reducers: {
      
        saveSelectedCategories:(state, action)=>{
            state.savedCategories = action.payload.categories
        },

        setTheme: state=>{
            state.dark = !state.dark
        },

        setUserData: (state, action) =>{
            state.token = action.payload.token
            state.username = action.payload.username
            state.id = action.payload.id
            state.isLogged = action.payload.isLogged
            const d = new Date()
            
            d.setTime(d.getTime() + (1*24*60*60*1000));

           
                document.cookie = `hnbdasht=${action.payload.token}`
                document.cookie = `hnbdashun=${action.payload.username}`
                document.cookie = `hnbdashid=${action.payload.id}`

            
           
            
        }
    }
   
    }

)

export const { setUserData, setTheme, saveSelectedCategories } = userAuthSlice.actions

const authReducer = userAuthSlice.reducer

export const UserAuthStore = configureStore({
    reducer:{
        auth: authReducer
    }
})