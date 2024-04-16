const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    // Define your JWT secret key (replace 'YOUR_SECRET_KEY' with your actual secret key)
    const secretKey = crypto.randomBytes(32).toString('hex');
    // Generate the JWT token
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    return token;
  };
// Hashing function for passwords
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };

// Initialize Firebase Admin SDK
const serviceAccount = {
    "type": "service_account",
    "project_id": "restapigraphql",
    "private_key_id": "7691b6a4a23b42b4715fc7f1ce393dd3f2cb2fa8",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDjL4JwZ4UHnpSd\nYafUQXP9Yo8DeFlA5X3QCkPJKXzM+JWPd5qzxpDpLGRlZ3+OTLZFntpJHl1LruvS\naNi1qI/9EzmpqLn9I8esQP47dwFiVioZ4hCgW2l4JkSkQB0rlqb4Ymv+FWKND7pl\nd3WUtqZ9yZLRFU6DgnKjSiWTi87tpTVFCZx+YDxdDy+X1PBohVyRUN7ykqSRxJlr\nrDjcjFDQX0dTe43KR4e9ONqnV7PBLqhti59zW3beAEoDarQDRsgKROjs7HkoJLSF\noyl0/UJkbDh4fhiIiOcF5HX5Bt6bzZUuOA+wW2OV7Qt4Yc8rXVcC2Jge5+5fQO7S\n19Y9fOA1AgMBAAECggEAKdER4ly7mMZwtnNGMASINAiTKGFblF1phgSNq5ZOWXAc\nH1c1i4euHq1EIYImcWvfVPtDVJgZNhgRYh5YXT+UmVGTmI3tBhIy65re8NUb1Rzl\nDPSWeN26kRoCInWGqQJG44tCM3d+N1bAyXJumxvvk1GqC4AvfndhYHsCZaEjSox4\nYoOFzHYrkja3CTGl5/s5ULCqRIpwd5hvCABpB+KpFe6XefNCEnNCwlrFpEI9m9DI\nh86U3U5LQMyGf7L8iAYtZu50/3Sdrwo0fq4McEPJBmDRsJ1CqWyOKzrgGhO623su\nRDNUh2yWsiJHYmgNLUvTLpSElJAUeQ+juMNu65+KgQKBgQD7EnbL2ldHOZKyHCjm\nGEiPok5mqoO9G4UlqEsZdjiWGMuVatrJYGxfA8F/KMYN6Y9kMh4lSN8tDJ+nPrnI\nDT6VMpK1RV5moYn1nT0wSdK4MnNLBHKUPgjEfaGYJrn9/JapOqJpzyHiy2smHA3a\nH4RGg5VraM4WoT7BkDC5/41/4QKBgQDnpQZ3w4H8SEH/TKwUopjVbJnz6n87Samn\nk/BkIZiIDDzuW8M1vqbdI+IE0s0dTJw5dckZZXqkdGixnnBcGPLBY0v/nsb8kYPQ\nkR9NQ7GnVFV/AVdxY5SJrOOobZsaUeGNH7anXtsa/tHprOX5DMKqSKS/56PejSyq\n7ZIg6Ni61QKBgEi3V0rBSQfq587IExxZKiLXikd32UHbB5wZeu6767WlJsl2sjki\nwSBfsRoIEByVaZ9GWK7JxUGB53eD1kDXfSmvBQiVN7sXzCIj0UX8C5inm/a9KgY/\nVUC7diLgDHxAPM50mfd1M0ZBTh4yf9yNxjy5/XunVhD90HQ1M7ebCTthAoGBAM6s\nRiEEpizYq0mEtuOSTpnc0170kZ/sERoavBgagWSgxpxD8t84wtf68+Upzyec+qWp\nmUq3Z7ziv6X5nnYNLEmutlfS6ebeTaUAVdUx2Idajw1JvSLFnflX76aOZBwPghXP\nfb/GueZUBCVgxa523BfhyFwP5/zgKEI4xG/oT7YhAoGAIPp1ih+5iLB8PR84oyzh\nwsI1+1PuOMRunLF2aWpXXtR2BXD28r55DYx1ttv0/udOkqbM2PRUVzUsF1ro2BO2\nYFiNjBbnxFYaFnEEibM54vBwvOEbZGRk7VnIqxKT1S5NhhmuKTsUEJerUW294221\nehgEVpD1MTtjPbxedgOWsM8=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-a91dr@restapigraphql.iam.gserviceaccount.com",
    "client_id": "108082055536063820724",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-a91dr%40restapigraphql.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://restapigraphql-default-rtdb.firebaseio.com'
});

const resolvers = {
  Query: {
    todos: async () => {
      const snapshot = await admin.firestore().collection('attendance').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    todo: async (_, { id }) => {
      const doc = await admin.firestore().collection('attendance').doc(id).get();
      if (!doc.exists) {
        throw new Error('Todo not found');
      }
      return { id: doc.id, ...doc.data() };
    }
  },
  Mutation: {
    registerEmployee: async (_, { name, emailid, password, mobileno,img, type }) => {
        // Check if email ID already exists
        const emailExists = await admin.firestore().collection('attendance').where('emailid', '==', emailid).get();
        if (!emailExists.empty) {
          throw new Error('Email ID already registered');
        }
        const hashedPassword = await hashPassword(password);

        // If email ID is unique, proceed with registration
        const docRef = await admin.firestore().collection('attendance').add({
          name,
          emailid,
          hashedPassword,
          mobileno,
          img,
          type
        });
  
        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() };
      },
      login: async (_, { emailOrMobile, password },{ req }) => {
        // Check if the provided email or mobile exists in the database
        const userSnapshot = await admin.firestore().collection('attendance').where('emailid', '==', emailOrMobile).get();
        let user;
        if (userSnapshot.empty) {
            // If email not found, check for mobile number
            const mobileSnapshot = await admin.firestore().collection('attendance').where('mobileno', '==', emailOrMobile).get();
            if (mobileSnapshot.empty) {
                throw new Error('User not found');
            }
            user = mobileSnapshot.docs[0].data();
        } else {
            user = userSnapshot.docs[0].data();
        }
    
        // Check if the provided password matches the hashed password in the database
        const validPassword = await bcrypt.compare(password, user.hashedPassword);
        if (!validPassword) {
            throw new Error('Invalid password');
        }
        
        // If credentials are valid, return a JWT token
        const token = generateToken(user.id); // You'll need to implement this function
        console.log(token);
        return { token };
    }
    ,
    updateEmployeeData: async (_, { id,name, emailid, password, mobileno,img, type}) => {
      const docRef = admin.firestore().collection('attendance').doc(id);
      await docRef.update({ name, emailid, password, mobileno,img, type });
      const doc = await docRef.get();
      return { id: doc.id, ...doc.data() };
    },
    deleteEmployeeData: async (_, { id }) => {
      const docRef = admin.firestore().collection('attendance').doc(id);
      const doc = await docRef.get();
      await docRef.delete();
      return { id: doc.id, ...doc.data() };
    }
  }
};

module.exports = resolvers;
