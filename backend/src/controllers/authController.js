

export const signup = async (req, res) => {
   console.log("Signup controller called");
   return res.status(200).json({ message: "sign up endpoint" });
};

export const login = async (req, res) => {
    console.log("Login controller called");
    return  res.status(200).json({ message: "login endpoint" });
};

export const logout = async (req, res) => {
    console.log("Logout controller called");
    return  res.status(200).json({ message: "logout endpoint" });
};