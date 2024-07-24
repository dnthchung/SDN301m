import JWT from "jsonwebtoken";

/**
 * @function generateToken
 * @param {object} userInformation
 * @param {string} secretSignature
 * @param {string} tokenLife
 */
const generateToken = async (userInformation, secretSignature, tokenLife) => {
  try {
    return JWT.sign(userInformation, secretSignature, { algorithm: "HS256", expiresIn: tokenLife });
  } catch (error) {
    console.error("Error in generateToken:", error); // Enhanced error logging
    throw new Error("Failed to generate token");
  }
};

/**
 * @function verifyToken
 * @param {string} token
 * @param {string} secretSignature
 */
const verifyToken = async (token, secretSignature) => {
  try {
    return JWT.verify(token, secretSignature);
  } catch (error) {
    console.error("Error in verifyToken:", error); // Enhanced error logging
    throw new Error("Failed to verify token");
  }
};

export const JwtProvider = {
  generateToken,
  verifyToken,
};
