import { openai } from "../openai.js";

const getData = async (req, res) => {
  const prompt = "a white cat eating icecream";

  console.log(response["data"]);

  res.status(200).send({
    message: "You are using AI",
  });
};

const postData = async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createImage({
      prompt: prompt,
      n: 10,
      size: "1024x1024",
    });

    res.status(200).send({
      images: response["data"].data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

export { getData, postData };
