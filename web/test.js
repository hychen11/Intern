// function MyButton() {
//     return (
//       <button>
//         I'm a button
//       </button>
//     );
//   }
  
//   export default function MyApp() {
//     return (
//       <div>
//         <h1>Welcome to my app</h1>
//         <MyButton />
//       </div>
//     );
//   }

const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://zjuchy1:qweasdzxC1@cluster0.zh00d14.mongodb.net/retryWrites=true&w=majority&appName=Cluster0";
// Connect to your Atlas cluster
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);