// import mongoose from 'mongoose';

// export default async function ConnectDB() {
//   try {
//     await mongoose.connect('mongodb://0.0.0.0:27017/Portfolio', {
//         useNewUrlParser: true, this was causing err's, but since im not using it, i wont fix
//         useUnifiedTopology: true, 
//         autoCreate: true,
//     });
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Failed to connect to MongoDB:', error);
//   }
// }