import { openai } from "../openai.js";

const getData = async (req, res) => {
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
      size: "256x256",
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
