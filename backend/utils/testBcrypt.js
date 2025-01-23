const bcrypt = require('bcryptjs');

const testPassword = async () => {
  const hashedPassword = await bcrypt.hash("password123", 10);
  console.log("Hashed Password:", hashedPassword);
  
  const isMatch = await bcrypt.compare("password123", hashedPassword);
  console.log("Password Match:", isMatch);
};

testPassword();
