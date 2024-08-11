import UserModel from "./userScheema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class UserRepository {
    
  //adding a new user
  addUser = async (name, email, password, gender) => {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new UserModel({
        name: name,
        email: email,
        password: hashedPassword,
        gender: gender
      });
      const savedUser = await newUser.save();
      return savedUser;
    } catch (err) {
      throw err;
    }
  };


  loginUser = async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error('EMAIL AND PASSWORD BOTH ARE REQUIRED');
      }

      // Find the user by email
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error('Invalid Login');
      }

      // Compare the provided password with the hashed password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error('Invalid Login');
      } else {
        // Generate a token
        const token = jwt.sign(
          {
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h'
          }
        );

        return { token, user };
      }
    } catch (err) {
      throw err;
    }
  };

}

export default UserRepository;
