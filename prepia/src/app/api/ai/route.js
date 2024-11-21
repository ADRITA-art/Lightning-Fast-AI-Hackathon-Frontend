const axios = require("axios");

export async function GET(req) {
  // Extract the 'question' parameter from the query string
  const question = req.nextUrl.searchParams.get("question");

  // Validate that a question was provided
  if (!question) {
    return new Response(
      JSON.stringify({ error: "No question provided" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Define the API request configuration
  const chatCompletion = {
    method: "POST",
    url: "https://api.sambanova.ai/v1/chat/completions",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.SAMBANOVA_API_KEY}`, // Ensure this environment variable is set
    },
    data: {
      stream: false, // Set to true if you want to handle streaming responses
      model: "Meta-Llama-3.1-8B-Instruct", // Ensure this is the correct model name
      messages: [
        {
          role: "system",
          content: `You are an expert in the engineering field, specializing in answering technical questions related to Mechanical, Electrical, Civil, Computer Science, and other engineering disciplines. Provide clear, concise, and engaging answers that are easy to understand for students. Ensure that each response does not exceed 200 words.`,
        },
        {
          role: "user",
          content: question, // The user's question
        },
      ],
      max_tokens: 500, // Adjust based on the token-to-word ratio of the model
      temperature: 0.7, // Adjust for creativity vs. precision
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1, // Number of responses to generate
      stop: null, // Define stop sequences if needed
      // Remove response_format if it's not required by Sambanova's API
    },
  };

  try {
    // Make the API request to Sambanova
    const response = await axios.request(chatCompletion);

    console.log("Full API Response:", JSON.stringify(response.data, null, 2)); // For debugging

    // Check if 'choices' array exists and has at least one element
    if (
      response.data &&
      Array.isArray(response.data.choices) &&
      response.data.choices.length > 0
    ) {
      // Adjust based on the actual response structure
      const content = response.data.choices[0].message?.content || response.data.choices[0].text;
      console.log("Extracted Content:", content);

      return new Response(JSON.stringify({ body: content }), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      console.error("Invalid response structure:", response.data);
      return new Response(
        JSON.stringify({ error: "Invalid response structure from API" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("API Request Error:", error);

    // If the error has a response (e.g., 4xx or 5xx), include its details
    if (error.response) {
      return new Response(
        JSON.stringify({ error: error.response.data }),
        {
          status: error.response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Error fetching answer" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
