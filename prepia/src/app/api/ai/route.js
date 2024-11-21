const axios = require("axios");

export async function GET(req) {
  const question = req.nextUrl.searchParams.get("question");
  if (!question) {
    return new Response(
      JSON.stringify({ error: "No question provided" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const chatCompletion = {
    method: "POST",
    url: "https://api.sambanova.ai/v1/chat/completions",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.SAMBANOVA_API_KEY}`,
    },
    data: {
      stream: false, 
      model: "Meta-Llama-3.1-8B-Instruct", 
      messages: [
        {
          role: "system",
          content: `You are an expert in the engineering field, specializing in answering technical questions related to Mechanical, Electrical, Civil, Computer Science, and other engineering disciplines. Provide clear, concise, and engaging answers that are easy to understand for students. Ensure that each response does not exceed 200 words.`,
        },
        {
          role: "user",
          content: question, 
        },
      ],
      max_tokens: 500, 
      temperature: 0.7, 
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1, 
      stop: null, 
    },
  };

  try {
    const response = await axios.request(chatCompletion);

    console.log("Full API Response:", JSON.stringify(response.data, null, 2)); 
    if (
      response.data &&
      Array.isArray(response.data.choices) &&
      response.data.choices.length > 0
    ) {
    
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
