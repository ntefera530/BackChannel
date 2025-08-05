import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
	try {
        const token = req.cookies.jwt; // Get token from cookies

        if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);
        

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;
