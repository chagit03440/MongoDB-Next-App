export const createUser = async (user: { username: string; email: string; password: string }) => {
    try {
      const response = await fetch('/api/mongoRoute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      
      if (!response.ok) {
        throw new Error(`Error creating user`);
      }
  
      const data = await response.json();
      console.log('User Created:', data);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; 
    }
  };

  export const signInUser = async (user: { username:string; email: string; password: string }) => {
    try {
      const response = await fetch('/api/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username:user.username, email: user.email, password: user.password }),
      });
      
      if (!response.ok) {
        throw new Error('Error signing in');
      }
  
      const data = await response.json();
      console.log('User Signed In:', data);
      return data; // Return data for further handling, e.g., storing a token
    } catch (error) {
      console.error('Error signing in:', error);
      throw error; 
    }
  };
  
  
  
  