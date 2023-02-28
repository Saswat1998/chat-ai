import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";
import './ChatBot.css';
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState([]);

  const sendRequest = async (text) => {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:
          text,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      return response.data.choices[0].text;
    } catch (error) {
      console.error(error);
      return "Error generating response.";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await sendRequest(input);
    console.log(response);
    setResponses([...responses, { user: input, bot: response}]);
    setInput("");
  };

  return (
    <div className="chat-background">
      <h1>YourBunny</h1>
      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        ></textarea>
        <button type="submit" className="btn-submit">Submit</button>
      </form>
      {responses.map((response, index) => (
        <div key={index}>
          <p><b>User: </b>{response.user}</p>
          <p><b>Bunny: </b>{response.bot}</p>
        </div>
      ))}
    </div>
  );
};

export default Chatbot;
