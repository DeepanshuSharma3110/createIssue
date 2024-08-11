import UserRepository from '../model/modelRepository.js';


class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }


  // Render Sign In Page
  getSignin = async (req, res) => {
    try {
      res.status(200).render('pages/register/register', { title: 'Register', error: null, login:req.cookies.user });
    } catch (error) {
      console.error('Error rendering registration page:', error);
      res.status(500).send('An error occurred while rendering the registration page');
    }
  };

  // Render Login Page
  getLogin = async (req, res) => {
    try {
      res.status(200).render('pages/login/login', { title: 'Login', error: null, login:req.cookies.user });
    } catch (error) {
      console.error('Error rendering login page:', error);
      res.status(500).send('An error occurred while rendering the login page');
    }
  };


  getLogout = async(req,res)=>{
    try{
      res.clearCookie('Authorization');
      res.clearCookie('user')
      res.redirect('/');
    }catch(err){
      console.log(err);
      
    }
  }

  // Handle Login Form Submission
  postLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      
      const { token, user } = await this.userRepository.loginUser(email, password);
      console.log(user);
      
      if (token && user) {
             // Set a secure HTTP-only cookie with the token
        res.cookie('Authorization', token, { httpOnly: true, secure: true });
      
      // Optionally, set other cookies or headers
        res.cookie('user', user._id, { httpOnly: true, secure: true });

      //  res.setHeader('Authorization',`${token}`);
        //await res.set('user',user.email);
        console.log(token);
        res.redirect('/');
      } else {
        res.status(401).render('pages/login/login', { title: 'Login', error: 'Invalid credentials', login:req.cookies.user });
      }
    } catch (err) {
      console.error('Error logging in user:', err);
      res.status(500).render('pages/login/login', { title: 'Login', error: 'An error occurred during login', login:req.cookies.user });
    }
  };

  // Register a New User
  registerUser = async (req, res) => {
    const { name, email, password, gender } = req.body;
    
    try {
      const savedUser = await this.userRepository.addUser(name, email, password, gender);
      if (savedUser) {
        res.status(200).render('pages/login/login', { title: 'Login', error: null, login:req.cookies.user });
      }
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).render('pages/register/register', { title: 'Register', error: error.message, login:req.cookies.user });
    }
  };
}

export default UserController;
