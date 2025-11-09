// File: pages/api/subscribe.js

/**
 * Next.js API route handler for the waitlist/subscribe form submission.
 * This runs as a Serverless Function on Vercel.
 */
export default async function handler(req, res) {
  // 1. Only allow POST requests for security
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // 2. Extract data from the request body
  const { email } = req.body;

  // 3. Basic validation
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    // Return a 400 Bad Request error
    return res.status(400).send('Invalid or missing email address.');
  }

  // 4. Implement your waitlist business logic here
  try {
    // 💡 Example: Log the data (appears in your Vercel logs)
    console.log(`Attempting to subscribe new user: ${email}`);

    // 💡 Real-world Action: Use an SDK or an HTTP request to connect to a service:
    //
    // // Example using a hypothetical Mailchimp API client:
    // await Mailchimp.addSubscriber(email, { listId: 'your_list_id' });
    //
    // // Example using a database connection (e.g., Prisma/Postgres):
    // // await db.waitlist.create({ data: { email, date: new Date() } });

    // Since this is a basic starter, we'll assume success after a small delay
    // await new Promise(resolve => setTimeout(resolve, 500)); 
    
    // --- End of business logic ---

    // 5. Send a success response back to the client
    // This returns the "Thanks — you are on the list!" message to the user.
    res.status(200).send('Successfully subscribed!');

  } catch (error) {
    // Log the server-side error for debugging
    console.error('API Subscribe Error:', error);

    // 6. Send an error response back to the client
    res.status(500).send('Subscription failed due to a server error.');
  }
}