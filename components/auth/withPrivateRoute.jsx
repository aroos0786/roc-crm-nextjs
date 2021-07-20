import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Dashboard from '../../pages/dashboard' 
const AuthContext = createContext()

function  AuthProvider({ children }) {
  const { pathname, events  }  = useRouter()
  const router = useRouter()
  const [user, setUser] = useState()

  async function getUser() {
    try {
      // const response = await fetch('/api/me')
      // const profile = await response.json()
      const token = Cookies.get('token')
      // const userData = localStorage.getItem('user')
      if (token === undefined) {
        setUser(null)
      } else {
        setUser(token)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUser()
  }, [pathname])

  useEffect(() => {
    // Check that a new route is OK
    const handleRouteChange = url => {
     
    //  console.log('path at handle change', url)
      if (url !== '/' && url!== '/forgot'  && !user) {
        router.push('/')  
      }
    //    if ((url === '/login' || url === '/') && user) {
    //  router.push(pathname)  
    // }
      
    }

    // Check that initial route is OK
    if (pathname !== '/' && pathname !== '/forgot'  && user === null) {
      router.push('/')  
      
    }
    // Check that initial route is OK
    // if ((pathname === '/login' || pathname === '/') && user !== null) {
    //  router.push(pathname)  
    // }

    
  // // on developement
   // Check that a new route is OK
  //  const handleRouteChange = url => {
  //   if (url !== 'http://kundol-dev.vector-coder.com/admin/login' && !user) {
  //     window.location.href = 'http://kundol-dev.vector-coder.com/admin/login'
  //   }
    
  // }

  // // Check that initial route is OK
  // if (pathname !== 'http://kundol-dev.vector-coder.com/admin/' && user === null) {
  //   window.location.href = 'http://kundol-dev.vector-coder.com/admin/login'
  // }


    // Monitor routes
    events.on('routeChangeStart', handleRouteChange)
    return () => {
      events.off('routeChangeStart', handleRouteChange)
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }




// import React, { createContext, useState, useContext, useEffect } from 'react'
// import Cookies from 'js-cookie'
// import Router, { useRouter } from 'next/router'
// import LOGIN from '../../pages/login';
// //api here is an axios instance which has the baseURL set according to the env.
// // import api from '../services/Api';


// // const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const router = useRouter()
//     const [user, setUser] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [isAuthenticated, setIsAuthenticated] = useState(false)

//     useEffect(() => {
//         async function loadUserFromCookies() {
//             const token = Cookies.get('token')
//             const userData = localStorage.getItem('user')
//             console.log('get cookies', token)
//             if (token) {
//                 console.log("Got a token in the cookies, let's see if it is valid")
//                 // api.defaults.headers.Authorization = `Bearer ${token}`
//                 // const { data: user } = await api.get('users/me')
//                 setUser(userData);
//                 setIsAuthenticated(true)
//             }else{
//               router.push('/login')
//             }
//             setLoading(false)
//         }
//         loadUserFromCookies()
//     }, [])
 
 

//     return (
//         <>
//             {children}
//         </>
//     )
// }





// // export const useAuth = () => useContext(AuthContext)



// // export const ProtectRoute = ({ children }) => {
// //   const router = useRouter()
// //   const { isAuthenticated, isLoading } = useAuth();
// //   console.log("isAuthenticate",isAuthenticated )
// //   useEffect(() => {
// //     console.log('useeffect', isAuthenticated)
// //     if (!isAuthenticated) {
// //       router.push('/login')
// //     }
// //   }, [])

// //   if (!isAuthenticated){
// //     return <LOGIN/>; 
// //   }
// //   return children;
// // };

