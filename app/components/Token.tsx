import jwt_decode from 'jwt-decode';


export const decodedToken = (token: any) => {
   try {
      const decodedToken = jwt_decode(token);
      return decodedToken;
   } catch (error) {
      console.error('Error decoding token:', error);
      return null;
   }
};


