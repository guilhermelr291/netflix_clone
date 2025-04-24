// server.ts
import app from './config/app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
